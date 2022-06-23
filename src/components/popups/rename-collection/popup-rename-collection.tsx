import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {putCollectionService} from 'services/app';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {getCollectionsAction} from 'store/app/actions';
import {PInput} from 'components/primitives/p-input';
import {Image} from 'assets/images';
import {ItemCollection} from 'types/api';
import {useToast} from 'hooks';

type FormRenameCollectionFields = {
  name: string;
};

const PopupRenameCollection = ({onClose, collection}: {onClose: () => void; collection: ItemCollection}) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<FormRenameCollectionFields>({
    defaultValues: {
      name: collection?.name!,
    },
  });
  const {address} = useSelector(userAccountSelector);
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();

  const rename = async (data: FormRenameCollectionFields) => {
    const formData = new FormData();
    formData.append('id', collection?.id!);
    formData.append('name', data.name);

    await putCollectionService(formData);
    dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending();

    try {
      await rename(data);
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  });

  return (
    <PopupBase
      onSubmit={onSubmit}
      imageSrc={Image.createCollection}
      title="Rename collection"
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
            <PInput<FormRenameCollectionFields>
              register={register}
              errors={errors}
              name="name"
              label="New collection name"
              required
              rules={{
                required: 'Fill in required fields',
                validate: {
                  equal: v => v !== collection?.name || 'Collection names should not be equal',
                },
              }}
            />
          </PBox>
        </>
      </PBox>
    </PopupBase>
  );
};

export const PopupRenameCollectionMemoized = memo(PopupRenameCollection);
