import {PBox} from 'components/primitives/p-box';
import {useParams} from 'react-router-dom';
import {PLoader} from 'components/primitives/p-loader';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorsAction} from 'store/app/actions';
import {appAuthorsSelector, appLoadingSelector, appTotalsAuthorsSelector} from 'store/app/selectors';
import {State} from 'store/types';
import {Category} from 'types/api';
import {useForm} from 'react-hook-form';
import {SelectOption} from 'types/custom';
import {TAKE_COUNT} from 'constants/common';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {useCurrentDevice} from 'hooks';

export type FormAuthorFilterFields = {
  categories: SelectOption | null;
  authors: SelectOption | null;
};

export const PageAuthors = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {categoryId} = useParams<{categoryId: string}>();
  const dispatch = useDispatch();
  const authors = useSelector(appAuthorsSelector);
  const totalAutors = useSelector(appTotalsAuthorsSelector);
  const loading = useSelector(appLoadingSelector);
  const [take, setTake] = useState(TAKE_COUNT);
  const [withoutLoading, setWithoutLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const showedAuthors = useMemo(() => authors.length, [authors]);
  const selectedCategory: Category[] = useSelector((state: State) =>
    state.app.categories.filter((c: Category) => c.id === categoryId)
  );
  const {
    control,
    reset,
    getValues,
    formState: {isDirty},
    handleSubmit,
  } = useForm<FormAuthorFilterFields>({
    defaultValues: {
      categories: null,
      authors: null,
    },
  });

  useEffect(() => {
    if (categoryId === 'all') {
      dispatch(getAuthorsAction({take, withoutLoading}));
    } else {
      dispatch(getAuthorsAction({categoryId, take, withoutLoading}));
    }
  }, [categoryId, take, setTake]);

  const handleAuthorFilter = handleSubmit(data => {
    if (categoryId === 'all') {
      dispatch(getAuthorsAction({name: data.authors?.value!, categoryName: data.categories?.value!, take}));
    } else {
      dispatch(getAuthorsAction({name: data.authors?.value!, categoryId, take}));
    }
  });

  const handleClearAuthorFilter = () => {
    if (categoryId === 'all') {
      dispatch(getAuthorsAction({take}));
    } else {
      dispatch(getAuthorsAction({categoryId, take}));
    }
    reset();
  };

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM
          authors={authors}
          selectedCategory={selectedCategory}
          categoryId={categoryId}
          formControl={control}
          formIsDirty={isDirty}
          showedAuthors={showedAuthors}
          totalAutors={totalAutors}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onAuthorFilter={() => {
            handleAuthorFilter();
            setFilterOpen(false);
          }}
          onClearAuthorFilter={() => {
            handleClearAuthorFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getAuthorsAction,
              params: {
                name: getValues('authors')?.value,
                categoryName: getValues('categories')?.value,
                categoryId: categoryId !== 'all' ? categoryId : '',
                take,
                withoutLoading,
              },
            },
          ]}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
        />
      ) : tablet ? (
        <SectionMainT
          authors={authors}
          selectedCategory={selectedCategory}
          categoryId={categoryId}
          formControl={control}
          formIsDirty={isDirty}
          showedAuthors={showedAuthors}
          totalAutors={totalAutors}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onAuthorFilter={() => {
            handleAuthorFilter();
            setFilterOpen(false);
          }}
          onClearAuthorFilter={() => {
            handleClearAuthorFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getAuthorsAction,
              params: {
                name: getValues('authors')?.value,
                categoryName: getValues('categories')?.value,
                categoryId: categoryId !== 'all' ? categoryId : '',
                take,
                withoutLoading,
              },
            },
          ]}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
        />
      ) : desktop ? (
        <SectionMainD
          authors={authors}
          selectedCategory={selectedCategory}
          categoryId={categoryId}
          formControl={control}
          formIsDirty={isDirty}
          showedAuthors={showedAuthors}
          totalAutors={totalAutors}
          onAuthorFilter={handleAuthorFilter}
          onClearAuthorFilter={handleClearAuthorFilter}
          onSorting={() => setWithoutLoading(true)}
          sortActions={[
            {
              action: getAuthorsAction,
              params: {
                name: getValues('authors')?.value,
                categoryName: getValues('categories')?.value,
                categoryId: categoryId !== 'all' ? categoryId : '',
                take,
                withoutLoading,
              },
            },
          ]}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
        />
      ) : null}
    </main>
  );
};
