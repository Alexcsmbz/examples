import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo, useEffect, useMemo, useState} from 'react';
import {MarketItem, NftToken} from 'types/api';
import {FacebookShareButton, TelegramShareButton, TwitterShareButton} from 'react-share';
import {Icon} from 'assets/icons';
import {PBackground} from 'components/primitives/p-background';
import {theme} from 'constants/theme';
import {Image} from 'assets/images';

const PopupShare = ({
  title,
  itemEntity,
  account,
  onClose,
}: {
  onClose: () => void;
  title?: string;
  itemEntity?: MarketItem | NftToken;
  account?: {walletAddress: string};
}) => {
  const [copied, setCopied] = useState(false);

  const link = useMemo(
    () =>
      `${window.location.origin}/items/view/${itemEntity?.id}/${
        (itemEntity as MarketItem)?.seller?.walletAddress || 0
      }`,
    [itemEntity, window]
  );

  const profileLink = useMemo(
    () => `${window.location.origin}/categories/all/authors/${account?.walletAddress}/collections`,
    [account, window]
  );

  useEffect(() => {
    copied && setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  return (
    <PopupBase
      imageSrc={
        itemEntity
          ? (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
            (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri!
          : Image.shareProfile
      }
      title={title || 'Share'}
      onCrossClick={onClose}
      open
    >
      <PBox display="grid" gap="16px" marginBottom="40px">
        <PBox textAlign="center">
          <PTypo variant="h3">
            To share {account && 'account address'} {itemEntity && 'the token'}{' '}
            {(itemEntity as NftToken)?.nftTokenDetail?.name! ||
              (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.name!}{' '}
            please copy the link or select a social network
          </PTypo>
        </PBox>
        <PBox display="grid" gridAutoFlow="column" justifyContent="center" gap="12px">
          <PBox
            width="48px"
            height="48px"
            borderRadius={theme.radius.round}
            overflow="hidden"
            cursor="pointer"
            onClick={() => {
              navigator.clipboard.writeText(itemEntity ? link : profileLink);
              setCopied(true);
            }}
          >
            <PBackground backgroundColor="#EF5DA8">
              <PBox width="48px" height="48px" display="grid" alignItems="center" justifyContent="center">
                {copied ? (
                  <Icon.Checked stroke={theme.pallete.light.common.white} />
                ) : (
                  <Icon.Copy fill={theme.pallete.light.common.white} />
                )}
              </PBox>
            </PBackground>
          </PBox>
          <FacebookShareButton url={itemEntity ? link : profileLink}>
            <Icon.FacebookCircle />
          </FacebookShareButton>
          <TwitterShareButton url={itemEntity ? link : profileLink}>
            <Icon.TwitterCircle />
          </TwitterShareButton>
          <TelegramShareButton url={itemEntity ? link : profileLink}>
            <Icon.TelegramCircle />
          </TelegramShareButton>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupShareMemoized = memo(PopupShare);
