import {Icon} from 'assets/icons';
import {Image} from 'assets/images';
import {PAvatar} from 'components/primitives/p-avatar';
import {PBackground} from 'components/primitives/p-background';
import {PBox} from 'components/primitives/p-box';
import {PInput} from 'components/primitives/p-input';
import {theme} from 'constants/theme';
import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {postProfileBackgroundUrlService} from 'services/user';
import {getProfileAction} from 'store/user/actions';
import {userAccountSelector, userProfileBannerSelector, userProfileSelector} from 'store/user/selectors';
import {PopupBase} from '../base';

export type FormEditAvatarFields = {
  pictureExternalLink: string;
};

const PopupAddWebLinkBanner = ({onClose}: {onClose: () => void}) => {
  const dispatch = useDispatch();
  const profile = useSelector(userProfileSelector);
  const {address} = useSelector(userAccountSelector);
  const profileBanner = useSelector(userProfileBannerSelector);
  const {
    register,
    formState: {errors},
    watch,
    reset,
    handleSubmit,
  } = useForm<FormEditAvatarFields>({
    defaultValues: {
      pictureExternalLink: '',
    },
  });

  const edit = handleSubmit(async data => {
    try {
      await postProfileBackgroundUrlService({wallet: address!, data});
      dispatch(getProfileAction({wallet: address!}));
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <PopupBase
      withoutImage
      title="Edit banner"
      onSubmit={edit}
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Apply',
          onClick: edit,
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox marginBottom="15px" display="grid" justifyContent="center">
        <PBox position="relative">
          <PAvatar
            size="120px"
            backgroundColor={profileBanner.background}
            mockImage={<img src={Image.picture} alt="" />}
            src={watch('pictureExternalLink') || profile.backgroundUrl}
          />
          {watch('pictureExternalLink') && (
            <PBackground
              width="40px"
              height="40px"
              borderRadius={theme.radius.round}
              backgroundColor={theme.pallete.light.common.white}
              position="absolute"
              bottom="0"
              right="0"
              onClick={() => reset()}
            >
              <PBox
                display="grid"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
                cursor="pointer"
              >
                <Icon.Delete />
              </PBox>
            </PBackground>
          )}
        </PBox>
      </PBox>
      <PInput<FormEditAvatarFields>
        register={register}
        name="pictureExternalLink"
        errors={errors}
        label="Add web link"
        placeholder="Not specified"
        info="Only JPG, PNG, GIF, SVG files.
        At least  2000x2000 pixels. Max file size: 10 MB."
      />
    </PopupBase>
  );
};

export const PopupAddWebLinkBannerMemoized = memo(PopupAddWebLinkBanner);
