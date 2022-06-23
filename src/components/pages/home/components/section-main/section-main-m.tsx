import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Link} from 'react-router-dom';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {Route} from 'constants/routes';
import {PCategoryTile} from 'components/primitives/p-category-tile';
import {Category} from 'types/api';
import Slider from 'react-slick';
import {getListingCarouselSettings} from '../../constants';
import {centerArrows} from './section-main.styles';
import {IMAGE_LINK_FOR_ALL_CATEGORY} from 'constants/common';

export const SectionMainM = ({categories}: {categories?: Category[]}) => (
  <CAdaptiveBox maxWidth="100vw" padding="0 20px" className="fade-in">
    <PBox margin="33px 0 33px">
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="center" marginBottom="16px">
        <PBox>
          <PTypo variant="h2">Categories</PTypo>
        </PBox>
        <Link to={Route.categories.path}>
          <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="8px">
            <Icon.Plus />
            <PTypo variant="h3">View all</PTypo>
          </PBox>
        </Link>
      </PBox>
      <PBox>
        <PCategoryTile
          href="/categories/all/authors"
          category={{
            name: 'All',
            previewImageLink: IMAGE_LINK_FOR_ALL_CATEGORY,
          }}
        />
        <PBox display="grid" alignContent="start" gridTemplateColumns="repeat(auto-fill, 100%)" margin="0 -12px">
          <Slider {...getListingCarouselSettings({slidesToShow: 2})} className={centerArrows}>
            {categories?.map(c => (
              <PBox padding="0 12px" key={`category-${c.id}-${c.name}`}>
                <PCategoryTile category={c} href={`/categories/${c.id}/authors`} />
              </PBox>
            ))}
          </Slider>
        </PBox>
      </PBox>
    </PBox>
  </CAdaptiveBox>
);
