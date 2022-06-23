import {PInput} from 'components/primitives/p-input';
import {PButton} from 'components/primitives/p-button';
import {PBox} from 'components/primitives/p-box';
import {useDispatch, useSelector} from 'react-redux';
import {MAX_LENGTH_NICKNAME, MAX_LENGTH_TOKEN_DESCRIPTION} from 'constants/common';
import {userAccountSelector, userProfileBannerSelector} from 'store/user/selectors';
import {useForm} from 'react-hook-form';
import {useCurrentDevice, usePopup} from 'hooks';
import {PTooltip} from 'components/primitives/p-tooltip';
import {Icon} from 'assets/icons';
import {PAvatar} from 'components/primitives/p-avatar';
import {PBackground} from 'components/primitives/p-background';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {useEffect, useState} from 'react';
import {userProfileSelector} from 'store/user/selectors';
import {PopupAddWebLinkAvatar} from 'components/popups/edit-avatar';
import {PopupAddWebLinkBanner} from 'components/popups/edit-banner';
import {PopupShare} from 'components/popups/share';
import {getProfileAction} from 'store/user/actions';
import {postProfileAvatarFileService, postProfileBackgroundFileService, postProfileService} from 'services/user';
import {PLoader} from 'components/primitives/p-loader';
import {PopupRemoveAvatar} from 'components/popups/remove-avatar';
import {PopupRemoveBanner} from 'components/popups/remove-banner';
import {shortenAddress} from 'utils/shorten-address';
import {CTextarea} from 'components/containers/c-textarea';
import {CDropdown} from 'components/containers/c-dropdown';
import {aboutMe, facebook, instagram, nickname, twitter, website} from 'constants/regexp-patterns';

export type FormProfileFields = {
  account: string;
  nickname: string;
  website: string;
  twitter: string;
  instagram: string;
  facebook: string;
  aboutMe: string;
  avatarUrl: string;
  backgroundUrl: string;
};

export const FormProfile = () => {
  const {desktop} = useCurrentDevice();
  const dispatch = useDispatch();
  const profile = useSelector(userProfileSelector);
  const profileBanner = useSelector(userProfileBannerSelector);
  const {address} = useSelector(userAccountSelector);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const {show} = usePopup();
  const {
    register,
    formState: {errors},
    setValue,
    handleSubmit,
  } = useForm<FormProfileFields>({
    defaultValues: {
      account: address || '',
      nickname: profile.nickname || '',
      website: profile.website || '',
      twitter: profile.twitter || '',
      instagram: profile.instagram || '',
      facebook: profile.facebook || '',
      aboutMe: profile.aboutMe || '',
      avatarUrl: profile.avatarUrl!,
      backgroundUrl: profile.backgroundUrl!,
    },
  });

  const onSubmit = handleSubmit(async data => {
    setSubmitLoading(true);
    try {
      await postProfileService({wallet: address!, data});
      dispatch(getProfileAction({wallet: address!}));
      setTimeout(() => setUpdated(true), 500);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setSubmitLoading(false), 500);
      setTimeout(() => setUpdated(false), 1500);
    }
  });

  const onUploadFile = async (e: any, type: string) => {
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);

    try {
      type === 'avatar' && (await postProfileAvatarFileService({wallet: address!, data: formData}));
      type === 'background' && (await postProfileBackgroundFileService({wallet: address!, data: formData}));

      dispatch(getProfileAction({wallet: address!}));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setValue('account', address!);
    setValue('nickname', profile.nickname!);
    setValue('website', profile.website!);
    setValue('twitter', profile.twitter!);
    setValue('instagram', profile.instagram!);
    setValue('facebook', profile.facebook!);
    setValue('avatarUrl', profile.avatarUrl!);
    setValue('backgroundUrl', profile.backgroundUrl!);
    setValue('aboutMe', profile.aboutMe!);
  }, [profile, address]);

  return (
    <PBox display="grid" gap="34px">
      <form onSubmit={onSubmit}>
        <PBox minHeight={desktop ? '350px' : '220px'} margin="0 0 24px" position="relative">
          <PBackground
            borderRadius={theme.radius.main}
            backgroundImage={`url(${profile?.backgroundUrl!})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundColor={profileBanner?.background!}
            minHeight="inherit"
          >
            <PBox
              display="grid"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              gap="15px"
              minHeight="inherit"
            >
              <PBox position="relative" justifySelf="center">
                <PAvatar
                  size={desktop ? '120px' : '100px'}
                  offset={desktop ? '10px' : '5px'}
                  backgroundColor={profileBanner?.avatar!}
                  mockImage={<Icon.Star fill="white" width={desktop ? 60 : 45} height={desktop ? 60 : 45} />}
                  src={profile?.avatarUrl!}
                />

                <PBackground
                  width="40px"
                  height="40px"
                  borderRadius={theme.radius.round}
                  backgroundColor={theme.pallete.light.common.white}
                  position="absolute"
                  bottom="0"
                  right="0"
                >
                  <CDropdown
                    content={
                      <>
                        <PBox
                          onClick={() => show(PopupAddWebLinkAvatar)}
                          className="menu-link"
                          display="grid"
                          gridTemplateColumns="auto 1fr"
                          alignItems="center"
                          gap="8px"
                          padding="12px 8px"
                        >
                          <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                            <Icon.InsertLink />
                          </PBox>
                          <PBox>
                            <PTypo variant="body1">Add web link</PTypo>
                          </PBox>
                        </PBox>
                        <label htmlFor="uploadAvatar">
                          <PBox
                            className="menu-link"
                            display="grid"
                            gridTemplateColumns="auto 1fr"
                            alignItems="center"
                            gap="8px"
                            padding="12px 8px"
                          >
                            <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                              <Icon.Picture />
                            </PBox>
                            <PBox>
                              <PTypo variant="body1">Upload photo</PTypo>
                            </PBox>
                          </PBox>
                          <input
                            type="file"
                            id="uploadAvatar"
                            style={{display: 'none'}}
                            onChange={e => onUploadFile(e, 'avatar')}
                          />
                        </label>
                        {profile.avatarUrl && (
                          <PBox
                            onClick={() => show(PopupRemoveAvatar)}
                            className="menu-link"
                            display="grid"
                            gridTemplateColumns="auto 1fr"
                            alignItems="center"
                            gap="8px"
                            padding="12px 8px"
                          >
                            <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                              <Icon.Delete />
                            </PBox>
                            <PBox>
                              <PTypo variant="body1">Remove</PTypo>
                            </PBox>
                          </PBox>
                        )}
                      </>
                    }
                    title={
                      profile.avatarUrl ? (
                        <Icon.MoreOptions className="more" />
                      ) : (
                        <Icon.Photo className="dropdown-icon" />
                      )
                    }
                  />
                </PBackground>
              </PBox>
              <PBackground
                textAlign="center"
                padding="7px 24px 9px"
                backgroundColor={`${theme.pallete.light.common.black}90`}
                borderRadius={theme.radius.strong}
              >
                <PTypo variant={desktop ? 'h2' : 'h3'} regular color={theme.pallete.light.common.white}>
                  {profile.nickname || shortenAddress(address)}
                </PTypo>
              </PBackground>
            </PBox>
          </PBackground>
          <PBackground
            width="40px"
            height="40px"
            borderRadius={theme.radius.round}
            backgroundColor={theme.pallete.light.common.white}
            position="absolute"
            top="16px"
            right="16px"
          >
            <CDropdown
              content={
                <>
                  <PBox
                    onClick={() => show(PopupAddWebLinkBanner)}
                    className="menu-link"
                    display="grid"
                    gridTemplateColumns="auto 1fr"
                    alignItems="center"
                    gap="8px"
                    padding="12px 8px"
                  >
                    <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                      <Icon.InsertLink />
                    </PBox>
                    <PBox>
                      <PTypo variant="body1">Add web link</PTypo>
                    </PBox>
                  </PBox>
                  <label htmlFor="uploadBackground">
                    <PBox
                      className="menu-link"
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                      gap="8px"
                      padding="12px 8px"
                    >
                      <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                        <Icon.Picture />
                      </PBox>
                      <PBox>
                        <PTypo variant="body1">Upload photo</PTypo>
                      </PBox>
                    </PBox>
                    <input
                      type="file"
                      id="uploadBackground"
                      style={{display: 'none'}}
                      onChange={e => onUploadFile(e, 'background')}
                    />
                  </label>
                  {profile.backgroundUrl && (
                    <PBox
                      onClick={() => show(PopupRemoveBanner)}
                      className="menu-link"
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                      gap="8px"
                      padding="12px 8px"
                    >
                      <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                        <Icon.Delete />
                      </PBox>
                      <PBox>
                        <PTypo variant="body1">Remove</PTypo>
                      </PBox>
                    </PBox>
                  )}
                </>
              }
              title={
                profile.backgroundUrl ? <Icon.MoreOptions className="more" /> : <Icon.Photo className="dropdown-icon" />
              }
            />
          </PBackground>
        </PBox>
        <PBox display="grid" gap="24px" maxWidth={desktop ? '584px' : ''}>
          <PBox position="relative" display="grid" gridTemplateColumns="1fr auto" alignItems="center">
            <PInput<FormProfileFields>
              register={register}
              readOnly
              name="account"
              errors={errors}
              label="My account"
              placeholder="Not specified"
            />
            <PBox
              position={desktop ? 'absolute' : 'relative'}
              top={desktop ? '35px' : '13px'}
              right={desktop ? '-59px' : ''}
              paddingLeft={desktop ? '' : '12px'}
            >
              <PTooltip
                title={
                  <Icon.Share
                    width={29}
                    height={30}
                    onClick={() => show(PopupShare, {title: 'Share account', account: {walletAddress: address!}})}
                  />
                }
                desc={desktop && 'Share my account link'}
                place="left"
              />
            </PBox>
          </PBox>
          <PBox>
            <PInput<FormProfileFields>
              register={register}
              name="nickname"
              errors={errors}
              label="Nickname"
              placeholder="Not specified"
              maxLength={MAX_LENGTH_NICKNAME}
              rules={{
                validate: {
                  correctNickname: value =>
                    nickname.test(value) ||
                    'Invalid nickname. Only latin letters, numbers, and special characters are allowed',
                },
              }}
            />
          </PBox>
          <PInput<FormProfileFields>
            type="url"
            register={register}
            name="website"
            errors={errors}
            label="Website"
            placeholder="Not specified"
            rules={{
              validate: {
                correctWebsite: value =>
                  website.test(value) ||
                  'Invalid website link. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />
          <PInput<FormProfileFields>
            type="url"
            register={register}
            name="twitter"
            errors={errors}
            label="Twitter"
            placeholder="Not specified"
            rules={{
              validate: {
                correctTwitter: value =>
                  twitter.test(value) ||
                  'Invalid Twiiter link. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />
          <PInput<FormProfileFields>
            type="url"
            register={register}
            name="instagram"
            errors={errors}
            label="Instagram"
            placeholder="Not specified"
            rules={{
              validate: {
                correctInstagram: value =>
                  instagram.test(value) ||
                  'Invalid Instagram link. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />
          <PInput<FormProfileFields>
            type="url"
            register={register}
            name="facebook"
            errors={errors}
            label="Facebook"
            placeholder="Not specified"
            rules={{
              validate: {
                correctFacebook: value =>
                  facebook.test(value) ||
                  'Invalid Facebook link. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />
          <CTextarea<FormProfileFields>
            name="aboutMe"
            register={register}
            errors={errors}
            placeholder="Add a text"
            label="About me"
            rows={7}
            maxLength={MAX_LENGTH_TOKEN_DESCRIPTION}
            defaultValue={profile?.aboutMe!}
            rules={{
              validate: {
                correctAbout: value =>
                  aboutMe.test(value) ||
                  'Invalid bio text. Only latin letters, numbers, and special characters are allowed',
              },
            }}
          />
          <PBox marginTop="16px">
            <PButton variant="apply" fullWidth={!desktop} disabled={submitLoading || updated}>
              Update info
              {submitLoading && <PLoader bgColor="transparent" stroke={theme.pallete.light.common.white} size={19} />}
              {updated && <Icon.Checked stroke={theme.pallete.light.common.white} />}
            </PButton>
          </PBox>
        </PBox>
      </form>
    </PBox>
  );
};
