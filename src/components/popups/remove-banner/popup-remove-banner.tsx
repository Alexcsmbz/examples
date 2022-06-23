import {Image} from 'assets/images';
import {PAvatar} from 'components/primitives/p-avatar';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProfileBackgroundService} from 'services/user';
import {getProfileAction} from 'store/user/actions';
import {userAccountSelector, userProfileBannerSelector, userProfileSelector} from 'store/user/selectors';
import {PopupBase} from '../base';

const PopupRemoveBanner = ({onClose}: {onClose: () => void}) => {
  const dispatch = useDispatch();
  const profile = useSelector(userProfileSelector);
  const {address} = useSelector(userAccountSelector);
  const profileBanner = useSelector(userProfileBannerSelector);

  const remove = async () => {
    try {
      await deleteProfileBackgroundService({wallet: address!});
      dispatch(getProfileAction({wallet: address!}));
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PopupBase
      withoutImage
      title="Remove banner"
      onCrossClick={onClose}
      onSubmit={remove}
      open
      buttons={{
        confirm: {
          name: 'Apply',
          type: 'button',
          onClick: remove,
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox display="grid" justifyContent="center">
        <PBox position="relative" marginBottom="35px">
          <PAvatar
            size="120px"
            backgroundColor={profileBanner.background}
            mockImage={<img src={Image.picture} alt="" />}
            src={profile.backgroundUrl}
          />
        </PBox>

        <PBox textAlign="center">
          <PTypo variant="h3" color={theme.pallete.light.primary.main}>
            Are you sure you want to remove the banner?
          </PTypo>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupRemoveBannerMemoized = memo(PopupRemoveBanner);
