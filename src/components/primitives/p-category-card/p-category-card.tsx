import {memo} from 'react';
import {PCategoryCardProps} from './p-category-card.types';
import {root, imageWrapper, titleWrapper} from './p-category-card.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Link} from 'react-router-dom';
import {PImage} from '../p-image';
import {PAvatar} from '../p-avatar';

const PCategoryCard = ({href, imageSize, category}: PCategoryCardProps) => (
  <Link to={href!} className={root}>
    <PBox height={imageSize} flex="0 0 auto" padding="0 8px">
      <PBox className={imageWrapper} position="relative" height="100%">
        <PImage image={category?.previewImageLink}>
          {!category?.previewImageLink && <PAvatar offset="8px" size="100px" mock={category?.name} />}
        </PImage>
      </PBox>
    </PBox>
    <PBox display="grid" gridTemplateRows="1fr" gap="8px" padding="15px 8px 10px" flex="1 0 auto">
      <PBox flex="1 0 auto" display="grid" alignContent="start" gap="8px" minHeight="60px">
        <PTypo variant="h2" className={titleWrapper}>
          {category?.name}
        </PTypo>

        <PBox>
          <PBox
            display="grid"
            gridAutoFlow="column"
            justifyContent="start"
            alignItems="center"
            gap="8px"
            marginBottom="3px"
          >
            <PTypo bold>Authors: </PTypo>
            <PTypo variant="h3">{category?.authorsCount}</PTypo>
          </PBox>
          <PBox
            display="grid"
            gridAutoFlow="column"
            justifyContent="start"
            alignItems="center"
            gap="8px"
            marginBottom="3px"
          >
            <PTypo bold>Items: </PTypo>
            <PTypo variant="h3">{category?.itemsCount}</PTypo>
          </PBox>
        </PBox>
      </PBox>
    </PBox>
  </Link>
);

export const PCategoryCardMemoized = memo(PCategoryCard);
