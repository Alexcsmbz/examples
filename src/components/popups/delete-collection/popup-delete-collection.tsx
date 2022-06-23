import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {memo} from 'react';
import {deleteCollectionService} from 'services/app';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {
  getCollectionsAction,
  getDraftNftTokensAction,
  getMarketItemsAction,
  getNftTokensAction,
} from 'store/app/actions';
import {Image} from 'assets/images';
import {ItemCollection, MarketItemStatus, NftTokenDetailStateEnum} from 'types/api';
import {PTypo} from 'components/primitives/p-typo';
import {useToast} from 'hooks';

const PopupDeleteCollection = ({onClose, collection}: {onClose: () => void; collection: ItemCollection}) => {
  const {address} = useSelector(userAccountSelector);
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();

  const remove = async () => {
    onClose();
    showPending();

    try {
      await deleteCollectionService({id: collection?.id});
      dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
      dispatch(
        getMarketItemsAction({
          seller: address,
          status: MarketItemStatus.Open,
          getEmptyItemCollectionIdOnly: true,
          take: 200,
        })
      );
      dispatch(getNftTokensAction({ownerAddress: address, take: 200}));
      dispatch(getDraftNftTokensAction({ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200}));
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  };

  return (
    <PopupBase
      imageSrc={Image.deleteCollection}
      title="Delete collection"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
          onClick: remove,
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox textAlign="center">
        <PTypo variant="h3">You are about to delete {collection.name} collection. Are you sure?</PTypo>
        <PTypo>
          Deleting a collection does not remove items - all of the assets remain in your account and simply get
          transferred to an unsorted catalog.
        </PTypo>
      </PBox>
    </PopupBase>
  );
};

export const PopupDeleteCollectionMemoized = memo(PopupDeleteCollection);
