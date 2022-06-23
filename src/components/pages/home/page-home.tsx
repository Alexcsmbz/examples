import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {PBox} from 'components/primitives/p-box';
import {useEffect} from 'react';
import {getCategoriesAction, getMarketItemsAction} from 'store/app/actions';
import {useDispatch, useSelector} from 'react-redux';
import {appCategoriesSelector, appLoadingSelector} from 'store/app/selectors';
import {PLoader} from 'components/primitives/p-loader';
import {NftTokenDetailStateEnum, MarketItem, MarketItemStatus} from 'types/api';
import {State} from 'store/types';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {SectionEndD, SectionEndM, SectionEndT} from './components/section-end';

export const PageHome = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const dispatch = useDispatch();
  const categories = useSelector(appCategoriesSelector);
  const loading = useSelector(appLoadingSelector);
  const marketItems: MarketItem[] = useSelector((state: State) =>
    state.app.marketItems.filter(
      (mI: MarketItem) =>
        mI.status === MarketItemStatus.Open &&
        !(
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
        )
    )
  );

  useEffect(() => {
    dispatch(getCategoriesAction({}));
    dispatch(getMarketItemsAction({take: 10, status: MarketItemStatus.Open}));
  }, []);

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : (
        <>
          {mobile ? (
            <SectionMainM categories={categories} />
          ) : tablet ? (
            <SectionMainT categories={categories} />
          ) : desktop ? (
            <SectionMainD categories={categories} />
          ) : null}

          {mobile ? (
            <SectionEndM marketItems={marketItems} />
          ) : tablet ? (
            <SectionEndT marketItems={marketItems} />
          ) : desktop ? (
            <SectionEndD marketItems={marketItems} />
          ) : null}
        </>
      )}
    </main>
  );
};
