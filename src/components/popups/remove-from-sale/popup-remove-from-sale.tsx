import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {ABI_MARKET} from 'constants/abis';
import {Network} from 'constants/network';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {useContract, useToast} from 'hooks';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {postNftTokenPendingService} from 'services/app';
import {getMarketItemsAction} from 'store/app/actions';
import {userAccountSelector} from 'store/user/selectors';
import {MarketItem, MarketItemStatus} from 'types/api';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';
import {PopupBase} from '../base';

const PopupRemoveFromSale = ({onClose, itemEntity}: {onClose: () => void; itemEntity: MarketItem}) => {
  const contractMarket = useContract(Network[itemEntity.nftToken?.nftTokenDetail?.chainId!].marketAddress, ABI_MARKET);
  const {showPending, showError, showSuccess} = useToast();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {address} = useSelector(userAccountSelector);

  const remove = async ({itemEntity}: {itemEntity: MarketItem}) => {
    onClose();
    showPending(toastMessage.pending.removeFromSale);

    const formData = new FormData();
    formData.append('nftTokenId', itemEntity?.nftTokenId!);

    try {
      const estimatedGasLimit = await contractMarket?.estimateGas['closeMarketItem'](itemEntity.itemId);
      const tx = await contractMarket?.closeMarketItem(itemEntity.itemId, {
        gasLimit: add10PercentsToGas(estimatedGasLimit!),
      });

      formData.append('transactionHash', tx?.hash);

      await postNftTokenPendingService(formData);

      if (pathname.includes(Route.myCollections.path)) {
        //TODO: provide filters from page-my-collections else this dispatch reset them
        dispatch(
          getMarketItemsAction(
            itemEntity?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
              o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
            )?.itemCollectionId
              ? {
                  seller: address,
                  status: MarketItemStatus.Open,
                  itemCollectionId: itemEntity?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
                    o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                  )?.itemCollectionId!,
                  getEmptyItemCollectionIdOnly: true,
                }
              : {
                  seller: address,
                  status: MarketItemStatus.Open,
                  getEmptyItemCollectionIdOnly: true,
                }
          )
        );
      } else {
        navigate(Route.myCollections.path);
      }

      await new Promise(resolve => {
        contractMarket?.on('MarketItemClosed', itemId => {
          resolve(parseInt(itemId).toString());
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
      imageSrc={itemEntity?.nftToken?.nftTokenDetail?.imageUri!}
      title="Remove from sale"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
          onClick: () => remove({itemEntity}),
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox textAlign="center">
        <PTypo variant="h3">Do you want remove from sale a token {itemEntity?.nftToken?.nftTokenDetail?.name}?</PTypo>
      </PBox>
    </PopupBase>
  );
};

export const PopupRemoveFromSaleMemoized = memo(PopupRemoveFromSale);
