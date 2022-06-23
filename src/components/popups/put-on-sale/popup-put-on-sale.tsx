import {FormPutOnSaleFields} from 'components/forms/put-on-sale/form-put-on-sale';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {ABI_1155, ABI_721, ABI_MARKET} from 'constants/abis';
import {Network} from 'constants/network';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {useContract, useToast} from 'hooks';
import {memo, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getMarketItemsService, postNftTokenPendingService} from 'services/app';
import {userAccountSelector} from 'store/user/selectors';
import {NftToken, TokenType} from 'types/api';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';
import {parse} from 'utils/parse-from-numeric-input';
import Web3 from 'web3';
import {PopupBase} from '../base';

const PopupPutOnSale = ({
  onClose,
  itemEntity,
  clearForm,
}: {
  onClose: () => void;
  itemEntity: NftToken | FormPutOnSaleFields;
  clearForm: () => void;
}) => {
  const contract721 = useContract((itemEntity as NftToken)?.contractAddress!, ABI_721);
  const contract1155 = useContract((itemEntity as NftToken)?.contractAddress!, ABI_1155);
  const contractMarket = useContract(
    Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress,
    ABI_MARKET
  );
  const {address} = useSelector(userAccountSelector);
  const {showPending, showError, showSuccess} = useToast();
  const navigate = useNavigate();
  const [alreadyForSale1155, setAlreadyForSale1155] = useState(false);

  useEffect(() => {
    if ((itemEntity as NftToken).tokenType === TokenType.ERC1155)
      (async () => {
        const res = await getMarketItemsService({nftTokenIds: [(itemEntity as NftToken).id]});

        setAlreadyForSale1155(
          !!(
            res.data.data[0]?.seller?.walletAddress?.toLowerCase() === address &&
            (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
              o =>
                o.ownerAddress?.toLowerCase() ===
                Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress?.toLowerCase()
            )
          )
        );
      })();
  }, []);

  const marketOwner = useMemo(
    () =>
      (itemEntity as NftToken).nftTokenDetail?.nftTokenDetailOwners?.find(
        o =>
          o.ownerAddress?.toLowerCase() ===
          Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress?.toLowerCase()
      ),
    [itemEntity]
  );

  const putOnSale = async () => {
    clearForm();
    onClose();
    showPending(toastMessage.pending.putOnSale);

    const formData = new FormData();
    formData.append('nftTokenId', (itemEntity as NftToken)?.id!);

    try {
      let tx: any;

      if ((itemEntity as NftToken)?.tokenType === TokenType.ERC721) {
        const approved = await contract721?.isApprovedForAll(
          address,
          Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress
        );
        if (!approved) {
          const args = [Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress, true];
          const estimatedGasLimit = await contract721?.estimateGas['setApprovalForAll'](...args);

          await contract721?.setApprovalForAll(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});

          await new Promise(resolve => {
            contract721?.on('ApprovalForAll', () => {
              resolve(null);
            });
          });
        }

        const args = [
          (itemEntity as NftToken)?.contractAddress,
          (itemEntity as any).tokenId,
          Web3.utils.toWei((itemEntity as FormPutOnSaleFields).price.toString(), 'ether'),
        ];

        const estimatedGasLimit = await contractMarket?.estimateGas['createMarketItem721'](...args);

        tx = await contractMarket?.createMarketItem721(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
      }

      if ((itemEntity as NftToken)?.tokenType === TokenType.ERC1155) {
        const approved = await contract1155?.isApprovedForAll(
          address,
          Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress
        );
        if (!approved) {
          const args = [Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].marketAddress, true];
          const estimatedGasLimit = await contract1155?.estimateGas['setApprovalForAll'](...args);

          await contract1155?.setApprovalForAll(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});

          await new Promise(resolve => {
            contract1155?.on('ApprovalForAll', () => {
              resolve(null);
            });
          });
        }

        const args = [
          (itemEntity as NftToken).contractAddress,
          (itemEntity as any).tokenId,
          Web3.utils.toWei((itemEntity as FormPutOnSaleFields).price.toString(), 'ether'),
          parse((itemEntity as FormPutOnSaleFields).quantity?.toString()!),
        ];

        const estimatedGasLimit = await contractMarket?.estimateGas['createMarketItem1155'](...args);

        tx = await contractMarket?.createMarketItem1155(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
      }

      formData.append('transactionHash', tx?.hash);

      await postNftTokenPendingService(formData);

      navigate(Route.myCollections.path);

      await new Promise(resolve => {
        contractMarket?.on('MarketItemCreated', () => {
          resolve(null);
        });
      });

      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  };

  return (
    <PopupBase
      imageSrc={(itemEntity as NftToken)?.nftTokenDetail?.imageUri!}
      title="Put on sale item"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: alreadyForSale1155 ? {name: 'Close', onClick: onClose} : {name: 'Continue', onClick: putOnSale},
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox textAlign="center">
        {alreadyForSale1155 ? (
          <>
            <PTypo variant="h3">
              You need to withdraw {marketOwner?.quantity} parts {(itemEntity as NftToken)?.nftTokenDetail?.name} token
              from the market
            </PTypo>
          </>
        ) : (
          <>
            <PTypo variant="h3">Do you want sell</PTypo>
            <PTypo variant="h3">
              {`${(itemEntity as FormPutOnSaleFields).quantity} the ${
                (itemEntity as NftToken)?.nftTokenDetail?.name
              } token${(itemEntity as FormPutOnSaleFields).quantity! > 1 ? 's' : ''} at price ${
                (itemEntity as FormPutOnSaleFields).price
              } ${Network[(itemEntity as NftToken).nftTokenDetail?.chainId!].currency.name}?`}
            </PTypo>
          </>
        )}
      </PBox>
    </PopupBase>
  );
};

export const PopupPutOnSaleMemoized = memo(PopupPutOnSale);
