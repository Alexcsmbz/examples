import {memo} from 'react';
import {applyHover, root} from './p-search-card.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Link} from 'react-router-dom';
import {PAvatar} from '../p-avatar';
import {ItemCollection, MarketItem, User} from 'types/api';
import {theme} from 'constants/theme';
import {shortenAddress} from 'utils/shorten-address';
import {Image} from 'assets/images';
import {cx} from '@emotion/css';
import {Device} from 'types/custom';

const PSearchCard = ({
  entity,
  url,
  size,
  device,
  onClick,
}: {
  entity?: ItemCollection | (MarketItem & {image: string}) | (User & {image: string});
  url?: string;
  size?: 'large';
  device?: Device;
  onClick?: () => void;
}) => {
  return (
    <Link to={url || '/'}>
      <PBox
        className={cx(root, device === 'desktop' && applyHover)}
        padding={(device === 'tablet' || device === 'mobile') && size === 'large' ? '8px 0' : '8px 16px'}
        display="grid"
        gridAutoFlow="column"
        justifyContent="start"
        alignItems="center"
        gap="16px"
        borderRadius={size === 'large' ? theme.radius.main : '0'}
        onClick={onClick}
      >
        <PAvatar
          mock={
            (entity as MarketItem)?.nftToken?.tokenName ||
            (entity as User).profile?.nickname ||
            (entity as User).walletAddress ||
            'C'
          }
          src={
            (entity as ItemCollection).creatorId
              ? null
              : (entity as MarketItem & {image: string}).image || (entity as User).profile?.avatarUrl || Image.star
          }
          size={size === 'large' ? '80px' : '48px'}
        />
        <PBox display="grid" gap="4px">
          <PTypo variant={size === 'large' ? 'h3' : 'body1'}>
            {(entity as ItemCollection)?.name ||
              (entity as MarketItem)?.nftToken?.tokenName ||
              shortenAddress((entity as User).walletAddress)}
          </PTypo>
          <PTypo variant={size === 'large' ? 'body1' : 'body2'} className="desc">
            {(entity as ItemCollection)?.description}
          </PTypo>
        </PBox>
      </PBox>
    </Link>
  );
};

export const PSearchCardMemoized = memo(PSearchCard);
