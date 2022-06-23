import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Link} from 'react-router-dom';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {Route} from 'constants/routes';
import {PCategoryTile} from 'components/primitives/p-category-tile';
import {Category} from 'types/api';
import {IMAGE_LINK_FOR_ALL_CATEGORY} from 'constants/common';

export const SectionMainD = ({categories}: {categories?: Category[]}) => (
  <CAdaptiveBox maxWidth="1260px" padding="0 30px" className="fade-in">
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
      <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="35% 65%" marginLeft="-24px">
        <PBox padding="0 24px">
          <PCategoryTile
            href="/categories/all/authors"
            category={{
              name: 'All',
              previewImageLink: IMAGE_LINK_FOR_ALL_CATEGORY,
            }}
          />
        </PBox>
        <PBox display="grid" alignContent="start" gridTemplateColumns="repeat(auto-fill, 25%)" margin="0 -12px">
          {categories?.map(c => (
            <PBox padding="0 12px" key={c.name}>
              <PCategoryTile category={c} href={`/categories/${c.id}/authors`} />
            </PBox>
          ))}
        </PBox>
      </PBox>
    </PBox>
  </CAdaptiveBox>
);
