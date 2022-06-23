import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PButton} from 'components/primitives/p-button';
import {sorByNameOptions} from 'constants/sort-options';
import {PSelectAsync} from 'components/primitives/p-select';
import {Author} from 'types/api';
import {CBackButton} from 'components/containers/c-back-button';
import {SortAction} from 'types/custom';
import {getAuthorsService, getCategoriesService} from 'services/app';
import {CSorting} from 'components/containers/c-sorting';
import {CAuthorCard} from 'components/containers/c-author-card';
import {FormAuthorFilterFields} from '../../page-authors';
import {PSidenav} from 'components/primitives/p-sidenav';
import {theme} from 'constants/theme';

export const SectionMainM = ({
  selectedCategory,
  authors,
  formControl,
  formIsDirty,
  sortActions,
  categoryId,
  showedAuthors,
  totalAutors,
  filterOpen,
  onFilterOpen,
  onFilterClose,
  onAuthorFilter,
  onClearAuthorFilter,
  onSorting,
  onShowMoreClick,
}: {
  selectedCategory?: any;
  authors?: Author[];
  formControl?: any;
  formIsDirty?: any;
  sortActions?: SortAction[];
  categoryId?: string;
  showedAuthors?: number;
  totalAutors?: number;
  filterOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
  onAuthorFilter?: () => void;
  onClearAuthorFilter?: () => void;
  onSorting?: () => void;
  onShowMoreClick?: () => void;
}) => {
  return (
    <CAdaptiveBox className="fade-in" padding="16px 20px 40px">
      <PBox>
        <PBox
          marginBottom="16px"
          display="grid"
          gridAutoFlow="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
            <CBackButton inline>
              <Icon.ChevronLeft cursor="pointer" />
            </CBackButton>
            <PTypo variant="h2">{selectedCategory[0]?.name || 'All'} authors</PTypo>
          </PBox>
          <PBox onClick={onFilterOpen}>
            <Icon.Filter />
          </PBox>
        </PBox>
        <PBox
          display="grid"
          alignContent="start"
          gridTemplateColumns="repeat(auto-fill, minmax(282px, 1fr))"
          margin="0 -12px"
        >
          {authors?.map(a => (
            <PBox padding="0 12px" marginBottom="24px" key={a.id}>
              <CAuthorCard href={`/categories/${categoryId}/authors/${a.walletAddress}/collections`} author={a} />
            </PBox>
          ))}
        </PBox>

        {authors?.length === 0 && (
          <PBox padding="0 12px">
            <PTypo variant="h1" bold>
              No authors yet
            </PTypo>
          </PBox>
        )}

        {showedAuthors! < totalAutors! && (
          <PBox display="flex" justifyContent="center" marginTop="36px">
            <PButton variant="apply-secondary" defaultWidth="34%" onClick={onShowMoreClick}>
              + Show more
            </PButton>
          </PBox>
        )}
      </PBox>
      <PSidenav active={filterOpen}>
        <PBox
          display="grid"
          gridTemplateRows="1fr auto"
          gap="25px 0"
          padding="15px 16px"
          position="relative"
          height="100%"
        >
          <PBox display="grid" alignContent="start" gap="25px 0">
            <PBox position="absolute" top="20px" right="20px" onClick={onFilterClose}>
              <Icon.Cross fill={theme.pallete.light.grey[900]} />
            </PBox>
            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Sort</PTypo>
              </PBox>
              <CSorting options={sorByNameOptions} actions={sortActions} onSorting={onSorting} />
            </PBox>

            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Filters</PTypo>
              </PBox>
              <form onSubmit={onAuthorFilter}>
                <PBox display="grid" gap="40px">
                  <PBox display="grid" gap="18px">
                    <PBox position="relative" zIndex={4}>
                      {!selectedCategory[0]?.name && (
                        <PSelectAsync<FormAuthorFilterFields>
                          control={formControl}
                          name="categories"
                          label="Categories"
                          placeholder="All categories"
                          loadOptions={{labels: 'name', values: 'name', service: getCategoriesService}}
                        />
                      )}
                    </PBox>
                    <PSelectAsync<FormAuthorFilterFields>
                      control={formControl}
                      name="authors"
                      label="Authors"
                      placeholder="All authors"
                      loadOptions={{labels: 'name', values: 'name', service: getAuthorsService}}
                    />
                  </PBox>
                </PBox>
              </form>
            </PBox>
          </PBox>

          <PBox display="grid" gridTemplateColumns="1fr 1fr" gap="16px" justifyContent="center" alignItems="center">
            <PButton variant="apply" fullWidth disabled={!formIsDirty} onClick={onAuthorFilter}>
              Apply
            </PButton>
            <PButton variant="secondary" fullWidth disabled={!formIsDirty} onClick={onClearAuthorFilter}>
              Clear
            </PButton>
          </PBox>
        </PBox>
      </PSidenav>
    </CAdaptiveBox>
  );
};
