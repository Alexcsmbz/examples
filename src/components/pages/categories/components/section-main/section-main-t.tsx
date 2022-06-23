import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {sorByNameOptions} from 'constants/sort-options';
import {getCategoriesAction} from 'store/app/actions';
import {PCategoryCard} from 'components/primitives/p-category-card';
import {Category} from 'types/api';
import {CSorting} from 'components/containers/c-sorting';
import {IMAGE_LINK_FOR_ALL_CATEGORY} from 'constants/common';

export const SectionMainT = ({
  categories,
  counts: {items, authors},
}: {
  categories?: Category[];
  counts: {items?: number; authors?: number};
}) => (
  <CAdaptiveBox className="fade-in" maxWidth="1260px" width="100%" padding="0 30px">
    <PBox marginBottom="89px" marginTop="19px">
      <PBox
        display="grid"
        gridTemplateColumns="auto 282px"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <PTypo variant="h1">Categories</PTypo>
        <CSorting options={sorByNameOptions} actions={[{action: getCategoriesAction}]} />
      </PBox>
      <PBox
        display="grid"
        alignContent="start"
        gridTemplateColumns="repeat(auto-fill, minmax(224px, 1fr))"
        margin="0 -12px"
      >
        <PBox padding="0 12px" marginBottom="24px" key="all">
          <PCategoryCard
            category={{
              name: 'All',
              previewImageLink: IMAGE_LINK_FOR_ALL_CATEGORY,
              authorsCount: authors,
              itemsCount: items,
            }}
            imageSize="222px"
            href="/categories/all/authors"
          />
        </PBox>
        {categories?.map(c => (
          <PBox padding="0 12px" marginBottom="24px" key={c.name}>
            <PCategoryCard category={c} imageSize="222px" href={`/categories/${c.id}/authors`} />
          </PBox>
        ))}
      </PBox>
    </PBox>
  </CAdaptiveBox>
);
