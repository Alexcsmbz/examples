import {memo} from 'react';
import {PCategoryTileProps} from './p-category-tile.types';
import {categoryCard, categoryCardLayer, categoryCardImage} from './p-category-tile.styles';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const PCategoryTile = ({category, href}: PCategoryTileProps) => (
  <Link to={href!} className={categoryCard}>
    <PBox position="relative" className={categoryCardLayer} height="100%">
      <PBox position="absolute" top="12px" left="20px" zIndex={1}>
        <PTypo variant="h3" color="white">
          {category?.name}
        </PTypo>
      </PBox>
      <LazyLoad className={categoryCardImage} once>
        <img src={category?.previewImageLink!} alt={category?.name!} width="100%" />
      </LazyLoad>
    </PBox>
  </Link>
);

export const PCategoryTileMemoized = memo(PCategoryTile);
