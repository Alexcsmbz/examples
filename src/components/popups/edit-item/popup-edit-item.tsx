import {FormEditItemFields} from 'components/forms/edit-item/form-edit-item';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {ABI_MARKET} from 'constants/abis';
import {Network} from 'constants/network';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {useContract, useToast} from 'hooks';
import {memo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {postNftTokenCategoryIdService, postNftTokenPendingService} from 'services/app';
import {getMarketItemByIdAction, getNftTokenByIdAction} from 'store/app/actions';
import {MarketItem, NftToken} from 'types/api';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';
import Web3 from 'web3';
import {PopupBase} from '../base';

const PopupEditItem = ({
  onClose,
  itemEntity,
  clearForm,
}: {
  onClose: () => void;
  itemEntity: (MarketItem | NftToken) & FormEditItemFields;
  clearForm: () => void;
}) => {
  const contractMarket = useContract(
    Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.marketAddress,
    ABI_MARKET
  );
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();
  const navigate = useNavigate();

  const edit = async () => {
    clearForm();
    onClose();

    const formData = new FormData();
    formData.append('nftTokenId', (itemEntity as MarketItem)?.nftTokenId!);

    let tx: any;

    if ((itemEntity as MarketItem)?.seller && itemEntity.price !== '' && itemEntity.categories?.value) {
      const args = [
        (itemEntity as MarketItem)?.itemId,
        Web3.utils.toWei((itemEntity.price as unknown as string).replace(/,/g, ''), 'ether'),
      ];

      try {
        showPending(toastMessage.pending.editItem);

        const categoryFormData = new FormData();
        categoryFormData.append('nftTokenId', (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id!);
        categoryFormData.append('categoryId', itemEntity.categories?.value!);

        await postNftTokenCategoryIdService(categoryFormData);

        dispatch(
          (itemEntity as MarketItem)?.seller
            ? getMarketItemByIdAction({id: itemEntity?.id})
            : getNftTokenByIdAction({id: itemEntity?.id})
        );
        navigate(`/items/view/${itemEntity?.id}/${(itemEntity as MarketItem)?.seller?.walletAddress || 0}`);
        showSuccess();
      } catch (e) {
        console.error(e);
        showError();
      }

      try {
        showPending(toastMessage.pending.editItem);

        const estimatedGasLimit = await contractMarket?.estimateGas['editMarketItem'](...args);
        tx = await contractMarket?.editMarketItem(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});

        formData.append('transactionHash', tx?.hash);

        await postNftTokenPendingService(formData);

        navigate(Route.myCollections.path);

        await new Promise(resolve => {
          contractMarket?.on('PriceChanged', () => {
            resolve(null);
          });
        });

        showSuccess();
        return;
      } catch (e) {
        console.error(e);
        showError();

        return;
      }
    }

    if ((itemEntity as MarketItem)?.seller && itemEntity.price !== '') {
      const args = [
        (itemEntity as MarketItem)?.itemId,
        Web3.utils.toWei((itemEntity.price as unknown as string).replace(/,/g, ''), 'ether'),
      ];

      try {
        showPending(toastMessage.pending.editItem);

        const estimatedGasLimit = await contractMarket?.estimateGas['editMarketItem'](...args);
        tx = await contractMarket?.editMarketItem(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});

        formData.append('transactionHash', tx?.hash);

        await postNftTokenPendingService(formData);

        navigate(Route.myCollections.path);

        await new Promise(resolve => {
          contractMarket?.on('PriceChanged', () => {
            resolve(null);
          });
        });

        showSuccess();
        return;
      } catch (e) {
        console.error(e);
        showError();

        return;
      }
    }

    if (itemEntity.categories?.value) {
      try {
        showPending();

        const categoryFormData = new FormData();
        categoryFormData.append('nftTokenId', (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id!);
        categoryFormData.append('categoryId', itemEntity.categories?.value!);

        await postNftTokenCategoryIdService(categoryFormData);

        dispatch(
          (itemEntity as MarketItem)?.seller
            ? getMarketItemByIdAction({id: itemEntity?.id})
            : getNftTokenByIdAction({id: itemEntity?.id})
        );
        navigate(`/items/view/${itemEntity?.id}/${(itemEntity as MarketItem)?.seller?.walletAddress || 0}`);
        showSuccess();
      } catch (e) {
        console.error(e);
        showError();
      }
    }
  };

  return (
    <PopupBase
      imageSrc={
        (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
        (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri!
      }
      title="Edit item"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
          onClick: edit,
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox textAlign="center">
        <PTypo variant="h3">Do you want set</PTypo>
        <PTypo variant="h3">
          {itemEntity.price &&
            `the price ${itemEntity.price} ${
              Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.currency.name
            } ${
              !itemEntity.categories?.label
                ? `for ${
                    (itemEntity as NftToken).nftTokenDetail?.name ||
                    (itemEntity as MarketItem).nftToken?.nftTokenDetail?.name
                  } token`
                : ''
            }`}
          {itemEntity.price && itemEntity.categories?.label && ' and '}
          {itemEntity.categories?.label &&
            `the category ${itemEntity.categories?.label!} for ${
              (itemEntity as NftToken).nftTokenDetail?.name || (itemEntity as MarketItem).nftToken?.nftTokenDetail?.name
            } token`}
          ?
        </PTypo>
      </PBox>
    </PopupBase>
  );
};

export const PopupEditItemMemoized = memo(PopupEditItem);
