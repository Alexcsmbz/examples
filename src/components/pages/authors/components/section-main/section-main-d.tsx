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

export const SectionMainD = ({
  selectedCategory,
  authors,
  formControl,
  formIsDirty,
  sortActions,
  categoryId,
  showedAuthors,
  totalAutors,
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
  onAuthorFilter?: () => void;
  onClearAuthorFilter?: () => void;
  onSorting?: () => void;
  onShowMoreClick?: () => void;
}) => {
  return (
    <CAdaptiveBox marginLeft="0" width="100%" padding="16px 13.5% 0 0">
      <PBox display="grid" gridTemplateColumns="333px 1fr" className="fade-in">
        <PBox padding="0 16px" marginBottom="89px">
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
              <PBox display="grid" gridTemplateColumns="1fr 1fr" gap="16px" justifyContent="center" alignItems="center">
                <PButton variant="apply" fullWidth disabled={!formIsDirty}>
                  Apply
                </PButton>
                <PButton variant="secondary" fullWidth disabled={!formIsDirty} onClick={onClearAuthorFilter}>
                  Clear
                </PButton>
              </PBox>
            </PBox>
          </form>
        </PBox>
        <PBox marginBottom="89px">
          <PBox
            display="grid"
            gridTemplateColumns="auto 310px"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
              <CBackButton inline>
                <Icon.ChevronLeft cursor="pointer" />
              </CBackButton>
              <PTypo variant="h1">{selectedCategory[0]?.name || 'All'} authors</PTypo>
            </PBox>
            <CSorting options={sorByNameOptions} actions={sortActions} onSorting={onSorting} />
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
      </PBox>
    </CAdaptiveBox>
  );
};
