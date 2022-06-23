import {Icon} from 'assets/icons';
import {PAvatar} from 'components/primitives/p-avatar';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProfileAvatarService} from 'services/user';
import {getProfileAction} from 'store/user/actions';
import {userAccountSelector, userProfileBannerSelector, userProfileSelector} from 'store/user/selectors';
import {PopupBase} from '../base';

const PopupRemoveAvatar = ({onClose}: {onClose: () => void}) => {
  const dispatch = useDispatch();
  const profile = useSelector(userProfileSelector);
  const {address} = useSelector(userAccountSelector);
  const profileBanner = useSelector(userProfileBannerSelector);

  const remove = async () => {
    try {
      await deleteProfileAvatarService({wallet: address!});
      dispatch(getProfileAction({wallet: address!}));
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PopupBase
      withoutImage
      title="Remove avatar"
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
            backgroundColor={profileBanner.avatar}
            mockImage={<Icon.Star fill="white" width={60} height={60} />}
            src={profile.avatarUrl}
          />
        </PBox>

        <PBox textAlign="center">
          <PTypo variant="h3" color={theme.pallete.light.primary.main}>
            Are you sure you want to remove the avatar?
          </PTypo>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupRemoveAvatarMemoized = memo(PopupRemoveAvatar);
