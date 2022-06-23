import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PCategoryCard} from 'components/primitives/p-category-card';
import {Category} from 'types/api';
import {IMAGE_LINK_FOR_ALL_CATEGORY} from 'constants/common';

export const SectionMainM = ({
  categories,
  counts: {authors, items},
}: {
  categories?: Category[];
  counts: {items?: number; authors?: number};
}) => (
  <CAdaptiveBox className="fade-in" maxWidth="100vw" padding="0 20px">
    <PBox marginBottom="89px" marginTop="19px">
      <PBox
        display="grid"
        gridTemplateColumns="auto 282px"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10px"
      >
        <PTypo variant="h2">Categories</PTypo>
      </PBox>
      <PBox
        display="grid"
        alignContent="start"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
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
            imageSize="200px"
            href="/categories/all/authors"
          />
        </PBox>
        {categories?.map(c => (
          <PBox padding="0 12px" marginBottom="24px" key={c.name}>
            <PCategoryCard category={c} imageSize="200px" href={`/categories/${c.id}/authors`} />
          </PBox>
        ))}
      </PBox>
    </PBox>
  </CAdaptiveBox>
);
