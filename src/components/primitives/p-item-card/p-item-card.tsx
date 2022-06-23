import {memo} from 'react';
import {PItemCardProps} from './p-item-card.types';
import {listCard, listCardImage, itemCardTitle, textNowrap} from './p-item-card.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Icon} from 'assets/icons';
import {cx} from '@emotion/css';
import {PImage} from '../p-image';
import {PAvatar} from '../p-avatar';
import {theme} from 'constants/theme';
import {shortenAddress} from 'utils/shorten-address';
import {ItemCollection, MarketItem, NftToken, TokenType} from 'types/api';
import Web3 from 'web3';
import {Image} from 'assets/images';
import {CDropdown} from 'components/containers/c-dropdown';
import {Network} from 'constants/network';

const PItemCard = ({
  href,
  className,
  actions,
  navigate,
  onHeartClick,
  itemEntity,
  imageSize,
  disabled,
  address,
}: PItemCardProps) => {
  return (
    <div onClick={() => navigate && href && navigate(href)} className={cx('list-card', listCard, className)}>
      <PBox display="flex" alignItems="center" padding="8px 8px 8px" minHeight="56px">
        {((itemEntity as NftToken).nftTokenDetail?.authorAddress ||
          (itemEntity as MarketItem).nftToken?.nftTokenDetail?.authorAddress) && (
          <PBox display="grid" alignItems="center" gridAutoFlow="column" justifyContent="start" gap="7px" width="100%">
            <PAvatar
              src={
                (itemEntity as NftToken).nftTokenDetail?.author?.profile?.avatarUrl ||
                (itemEntity as MarketItem).nftToken?.nftTokenDetail?.author?.profile?.avatarUrl ||
                Image.star
              }
              size="40px"
            />
            <PTypo className={textNowrap} variant="body1">
              {shortenAddress(
                (itemEntity as NftToken).nftTokenDetail?.authorAddress ||
                  (itemEntity as MarketItem).nftToken?.nftTokenDetail?.authorAddress
              )}
            </PTypo>
          </PBox>
        )}
        {actions && actions?.length > 0 && !disabled ? (
          <PBox flex="1 0 auto" display="grid" justifyContent="end">
            <CDropdown
              content={actions?.map(({icon, name, anchor, onClick}) => (
                <a
                  href={anchor || '!#'}
                  onClick={e => {
                    e.preventDefault();
                    onClick && onClick();
                  }}
                >
                  <PBox
                    key={name}
                    className="menu-link"
                    display="grid"
                    gridTemplateColumns="auto 1fr"
                    alignItems="center"
                    gap="8px"
                    padding="12px 8px"
                  >
                    <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                      {icon}
                    </PBox>
                    <PBox>
                      <PTypo variant="body1">{name}</PTypo>
                    </PBox>
                  </PBox>
                </a>
              ))}
              title={<Icon.MoreOptions cursor="pointer" />}
            />
          </PBox>
        ) : disabled ? (
          <Icon.MoreOptions opacity={0.6} cursor="not-allowed" />
        ) : null}
      </PBox>
      <PBox minHeight="180px" flex="0 0 auto" padding="0 8px">
        <PBox className={listCardImage} position="relative" height="100%">
          <PImage
            disabled={disabled}
            image={
              (itemEntity as NftToken)?.nftTokenDetail?.imageUri ||
              (itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.imageUri ||
              ((itemEntity as any)?.nftTokenDetails && (itemEntity as any)?.nftTokenDetails[0]?.imageUri) ||
              (itemEntity as ItemCollection).creator?.profile?.backgroundUrl
            }
            height={imageSize}
          >
            {(itemEntity as ItemCollection)?.nftTokenDetails?.length === 0 && (
              <PAvatar
                offset="8px"
                size="100px"
                src={(itemEntity as ItemCollection).creator?.profile?.avatarUrl || Image.star}
              />
            )}
          </PImage>
        </PBox>
      </PBox>
      <PBox display="grid" gridTemplateRows="1fr" gap="8px" padding="15px 8px 20px" flex="1 0 auto">
        <PBox
          flex="1 0 auto"
          display="grid"
          alignContent="start"
          gap="8px"
          minHeight={(itemEntity as NftToken | MarketItem)?.tokenType === TokenType.ERC721 ? '60px' : undefined}
        >
          <PTypo variant="h2" className={itemCardTitle}>
            {(itemEntity as NftToken).nftTokenDetail?.name ||
              (itemEntity as MarketItem).nftToken?.nftTokenDetail?.name ||
              (itemEntity as ItemCollection)?.name}
          </PTypo>
        </PBox>
        {(itemEntity as NftToken | MarketItem)?.tokenType === TokenType.ERC1155 && (
          <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="4px" justifyContent="start">
            <Icon.CopiesStack />
            {(itemEntity as MarketItem)?.quantity ? (
              <PTypo>{`${(itemEntity as MarketItem)?.quantity}/${(itemEntity as MarketItem)?.totalQuantity}`}</PTypo>
            ) : (
              <PTypo>
                {
                  (itemEntity as NftToken)?.nftTokenDetail?.nftTokenDetailOwners?.find(
                    o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                  )?.quantity
                }
              </PTypo>
            )}
          </PBox>
        )}
        <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="end" gap="5px">
          <PBox display="grid" gridAutoFlow="column" alignItems="end" gap="14px">
            {(itemEntity as MarketItem).price && (
              <div
                className={textNowrap}
                title={`${Web3.utils.fromWei((itemEntity as MarketItem).price!, 'ether')} ${
                  Network[(itemEntity as MarketItem)?.nftToken?.nftTokenDetail?.chainId!]?.currency.name
                }`}
              >
                <PBox display="inline-block" marginRight="7px">
                  <PTypo variant="h2" color={theme.pallete.light.primary.main}>
                    {Web3.utils.fromWei((itemEntity as MarketItem).price!, 'ether')}
                  </PTypo>
                </PBox>
                <PBox display="grid" gridAutoFlow="column" alignItems="end" gap="4px">
                  <PTypo bold>
                    {Network[(itemEntity as MarketItem).nftToken?.nftTokenDetail?.chainId!].currency.name}
                  </PTypo>
                  {Network[(itemEntity as MarketItem).nftToken?.nftTokenDetail?.chainId!].currency.icon}
                </PBox>
              </div>
            )}
            <PBox display="grid" gridAutoFlow="column" alignItems="end" gap="4px">
              <PTypo bold>{Network[(itemEntity as NftToken)?.nftTokenDetail?.chainId!]?.name}</PTypo>
              {Network[(itemEntity as NftToken)?.nftTokenDetail?.chainId!]?.currency.icon}
            </PBox>
          </PBox>
          {(itemEntity as MarketItem).seller && (
            <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="6px" minHeight="28px">
              {onHeartClick &&
                (((itemEntity as NftToken)?.inFavorites &&
                  (itemEntity as NftToken)?.inFavorites?.find(a => a.toLowerCase() === address?.toLowerCase())) ||
                ((itemEntity as MarketItem).nftToken?.inFavorites &&
                  (itemEntity as MarketItem).nftToken?.inFavorites?.find(
                    a => a.toLowerCase() === address?.toLowerCase()
                  )) ? (
                  <Icon.HeartFilled
                    onClick={e => {
                      if (!disabled) {
                        e.stopPropagation();
                        onHeartClick(itemEntity as NftToken | MarketItem);
                      }
                    }}
                    cursor={disabled ? 'not-allowed' : 'pointer'}
                  />
                ) : (
                  <Icon.HeartStroke
                    onClick={e => {
                      if (!disabled) {
                        e.stopPropagation();
                        onHeartClick(itemEntity as NftToken | MarketItem);
                      }
                    }}
                    cursor={disabled ? 'not-allowed' : 'pointer'}
                  />
                ))}
              {(((itemEntity as NftToken)?.inFavorites && (itemEntity as NftToken)?.inFavorites?.length !== 0) ||
                ((itemEntity as MarketItem).nftToken?.inFavorites &&
                  (itemEntity as MarketItem).nftToken?.inFavorites?.length !== 0)) && (
                <PTypo>
                  {(itemEntity as NftToken)?.inFavorites?.length ||
                    (itemEntity as MarketItem).nftToken?.inFavorites?.length}
                </PTypo>
              )}
            </PBox>
          )}
        </PBox>
      </PBox>
    </div>
  );
};

export const PItemCardMemoized = memo(PItemCard);
