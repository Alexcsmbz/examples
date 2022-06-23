import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {ABI_1155, ABI_721} from 'constants/abis';
import {Network} from 'constants/network';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {useContract, useToast} from 'hooks';
import {memo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {postNftTokenService} from 'services/app';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';
import {parse} from 'utils/parse-from-numeric-input';
import {PopupBase} from '../base';
import {CreatedItem} from './popup-create-item.types';

const PopupCreateItem = ({
  onClose,
  createdItem,
  clearForm,
}: {
  onClose: () => void;
  createdItem: CreatedItem;
  clearForm: () => void;
}) => {
  const contract721 = useContract(Network[createdItem.chainId].address721, ABI_721);
  const contract1155 = useContract(Network[createdItem.chainId].address1155, ABI_1155);
  // const contractMarket = useContract(Network[createdItem.chainId].marketAddress, ABI_MARKET);
  const [tokenId, setTokenId] = useState<string>();
  const {showPending, showError, showSuccess} = useToast();
  const navigate = useNavigate();

  const mint = async ({createdItem}: {createdItem: CreatedItem}) => {
    const formData = new FormData();
    formData.append('categoryId', createdItem?.category?.value!);
    formData.append('name', createdItem?.name!);
    formData.append('nftSource', createdItem?.file);
    formData.append('royalty', createdItem.royalty?.toString() || '0');
    formData.append('chainId', createdItem.chainId);
    createdItem.collection?.value && formData.append('itemCollectionId', createdItem.collection?.value!);
    createdItem?.description && formData.append('description', createdItem?.description);
    createdItem?.quantity && formData.append('quantity', parse(createdItem?.quantity as string).toString());

    const res = await postNftTokenService(formData);

    if (createdItem.tokenType === 'single') {
      const args = [(res.data as any).data.fileUri, (createdItem?.royalty && `${createdItem?.royalty}00`) || '0'];

      const estimatedGasLimit = await contract721?.estimateGas['mint'](...args);

      await contract721?.mint(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    if (createdItem.tokenType === 'multiple') {
      const args = [
        (res.data as any).data.fileUri,
        (createdItem?.royalty && `${createdItem?.royalty}00`) || '0',
        parse(createdItem.quantity?.toString()!),
      ];

      const estimatedGasLimit = await contract1155?.estimateGas['mint'](...args);

      await contract1155?.mint(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    navigate(Route.myCollections.path);

    setTokenId(
      await new Promise(resolve => {
        if (createdItem.tokenType === 'single')
          contract721?.on('Minted', tokenId => {
            resolve(parseInt(tokenId).toString());
          });

        if (createdItem.tokenType === 'multiple')
          contract1155?.on('SingleMinted', tokenId => {
            resolve(parseInt(tokenId).toString());
          });
      })
    );
  };

  // const putOnMarketplace = async ({
  //   tokenId,
  //   createdItem,
  // }: {
  //   tokenId?: string;
  //   createdItem: {file: File; tokenType: ViewTokenType} & FormCreateItemFields;
  // }) => {
  //   if (createdItem.tokenType === 'single') {
  //     await contractMarket?.createMarketItem721(
  //       process.env.REACT_APP_ADDRESS_721,
  //       tokenId,
  //       Web3.utils.toWei(createdItem.price.toString(), 'ether')
  //     );
  //   }

  //   if (createdItem.tokenType === 'multiple') {
  //     await contractMarket?.createMarketItem1155(
  //       process.env.REACT_APP_ADDRESS_1155,
  //       tokenId,
  //       Web3.utils.toWei(createdItem.price.toString(), 'ether'),
  //       createdItem.quantity?.toString()
  //     );
  //   }
  // };

  const create = async ({createdItem, tokenId}: {createdItem: CreatedItem; tokenId?: string}) => {
    clearForm();
    onClose();
    showPending(toastMessage.pending.mint);

    try {
      await Promise.all([
        mint({createdItem}),
        // createdItem.putOnMarketplace && putOnMarketplace({tokenId, createdItem}),
      ]);
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  };

  return (
    <PopupBase
      imageSrc={createdItem?.file && URL.createObjectURL(createdItem?.file)}
      title="Create item"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
          onClick: () => create({createdItem, tokenId}),
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox textAlign="center">
        <PTypo variant="h3">Do you want mint</PTypo>
        <PTypo variant="h3">the {createdItem?.name} token?</PTypo>
      </PBox>
    </PopupBase>
  );
};

export const PopupCreateItemMemoized = memo(PopupCreateItem);
