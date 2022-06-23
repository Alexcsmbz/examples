import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo} from 'react';
import {PSelectAsync} from 'components/primitives/p-select';
import {MarketItem, NftToken, MarketItemStatus} from 'types/api';
import {SelectOption} from 'types/custom';
import {useForm} from 'react-hook-form';
import {getCollectionsService, postNftTokenCollectionIdService} from 'services/app';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {getCollectionsAction, getMarketItemsAction, getNftTokensAction} from 'store/app/actions';
import {useToast} from 'hooks';

type FormMoveToCollectionFields = {
  collection: SelectOption | null;
};

const PopupMoveToCollection = ({itemEntity, onClose}: {onClose: () => void; itemEntity?: MarketItem | NftToken}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<FormMoveToCollectionFields>({
    defaultValues: {
      collection: null,
    },
  });
  const {address} = useSelector(userAccountSelector);
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();

  const move = async (data: FormMoveToCollectionFields) => {
    const formData = new FormData();

    formData.append('nftTokenId', (itemEntity as MarketItem)?.nftTokenId || itemEntity?.id!);
    data.collection?.value !== 'root' && formData.append('itemCollectionId', data.collection?.value!);

    await postNftTokenCollectionIdService(formData);

    dispatch(
      getMarketItemsAction(
        data.collection?.value === 'root'
          ? {
              itemCollectionId: (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
              )?.itemCollectionId!,
              status: MarketItemStatus.Open,
              seller: address,
              take: 200,
            }
          : {status: MarketItemStatus.Open, seller: address, getEmptyItemCollectionIdOnly: true, take: 200}
      )
    );

    dispatch(
      getNftTokensAction(
        data.collection?.value === 'root'
          ? {
              itemCollectionId: (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
              )?.itemCollectionId!,
              ownerAddress: address,
              take: 200,
            }
          : {ownerAddress: address, take: 200}
      )
    );
    dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending();

    try {
      await move(data);
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  });

  return (
    <PopupBase
      onSubmit={onSubmit}
      imageSrc={
        (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
        (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri!
      }
      title="Move to collection"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox display="grid" gap="16px">
        <>
          <PBox display="grid" gap="24px">
            <PSelectAsync<FormMoveToCollectionFields>
              rules={{required: 'Fill in required fields'}}
              errors={errors}
              control={control}
              name="collection"
              label="Choose collection or root"
              required
              loadOptions={{
                labels: 'name',
                values: 'id',
                service: () => getCollectionsService({creatorAddress: address, showEmptyCollections: true}),
                preloadedOptions:
                  (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                    o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                  )?.itemCollectionId !== null &&
                  (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
                    o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                  )?.itemCollectionId !== null
                    ? [{label: 'Root', value: 'root'}]
                    : [],
              }}
              placeholder="Select a collection"
            />
          </PBox>
        </>
        <PBox textAlign="center">
          <PTypo variant="h3">
            Do you want move token{' '}
            {(itemEntity as NftToken).nftTokenDetail?.name || (itemEntity as MarketItem).nftToken?.nftTokenDetail?.name}{' '}
            to other collection?
          </PTypo>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupMoveToCollectionMemoized = memo(PopupMoveToCollection);
