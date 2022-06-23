import {PBox} from 'components/primitives/p-box';
import {PLoader} from 'components/primitives/p-loader';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getCategoriesAction} from 'store/app/actions';
import {appCategoriesSelector, appLoadingSelector} from 'store/app/selectors';
import {State} from 'store/types';
import {Category} from 'types/api';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainT, SectionMainM} from './components/section-main';

export const PageCategories = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const dispatch = useDispatch();
  const categories = useSelector(appCategoriesSelector);
  const counts = useSelector((state: State) =>
    (state.app.categories as Category[]).reduce(
      (c, it) => ({
        authors: Number(c?.authors) + Number(it?.authorsCount),
        items: Number(c?.items) + Number(it?.itemsCount),
      }),
      {authors: 0, items: 0}
    )
  );
  const loading = useSelector(appLoadingSelector);

  useEffect(() => {
    dispatch(getCategoriesAction({}));
  }, []);

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM categories={categories} counts={counts} />
      ) : tablet ? (
        <SectionMainT categories={categories} counts={counts} />
      ) : desktop ? (
        <SectionMainD categories={categories} counts={counts} />
      ) : null}
    </main>
  );
};
