import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {postCollectionService} from 'services/app';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {getCollectionsAction} from 'store/app/actions';
import {PInput} from 'components/primitives/p-input';
import {Image} from 'assets/images';
import {useToast} from 'hooks';

type FormCreateCollectionFields = {
  name: string;
};

const PopupCreateCollection = ({onClose}: {onClose: () => void}) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<FormCreateCollectionFields>({
    defaultValues: {
      name: '',
    },
  });
  const {address} = useSelector(userAccountSelector);
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();

  const create = async (data: FormCreateCollectionFields) => {
    const formData = new FormData();
    formData.append('name', data.name);

    await postCollectionService(formData);
    dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending();

    try {
      await create(data);
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
      title="Create new collection"
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
            <PInput<FormCreateCollectionFields>
              register={register}
              errors={errors}
              name="name"
              label="Collection name"
              required
              rules={{
                required: 'Fill in required fields',
              }}
            />
          </PBox>
        </>
      </PBox>
    </PopupBase>
  );
};

export const PopupCreateCollectionMemoized = memo(PopupCreateCollection);
