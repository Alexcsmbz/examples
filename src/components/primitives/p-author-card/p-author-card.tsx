import {memo} from 'react';
import {PAuthorCardProps} from './p-author-card.types';
import {imageWrapper, titleWrapper} from './p-author-card.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Link} from 'react-router-dom';
import {PImage} from '../p-image';
import {PAvatar} from '../p-avatar';
import {shortenAddress} from 'utils/shorten-address';
import {theme} from 'constants/theme';
import {Image} from 'assets/images';

const PAuthorCard = ({href, author, cover, avatar}: PAuthorCardProps) => (
  <PBox boxShadow={theme.shadow[1]} borderRadius={theme.radius.main}>
    <Link to={href || '/'}>
      <PBox minHeight="266px" flex="0 0 auto" padding="16px 8px">
        <PBox minHeight="266px" className={imageWrapper} position="relative" height="100%">
          <PImage backgroundImage={cover}>
            <PAvatar src={avatar || Image.star} offset="8px" size="100px" />
          </PImage>
        </PBox>
      </PBox>
      <PBox display="grid" gridTemplateRows="1fr" gap="8px" padding="15px 8px 20px" flex="1 0 auto">
        <PBox flex="1 0 auto" display="grid" alignContent="start" gap="8px" minHeight="60px">
          <PTypo variant="h2" className={titleWrapper}>
            {shortenAddress(author?.walletAddress)}
          </PTypo>
          <PBox
            display="grid"
            gridAutoFlow="column"
            justifyContent="start"
            alignItems="center"
            gap="8px"
            marginBottom="3px"
          >
            <PTypo bold>Items: </PTypo>
            <PTypo variant="h3">{author?.itemsCount}</PTypo>
          </PBox>
        </PBox>
      </PBox>
    </Link>
  </PBox>
);

export const PAuthorCardMemoized = memo(PAuthorCard);
