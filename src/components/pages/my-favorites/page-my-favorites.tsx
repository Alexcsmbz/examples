import {PBox} from 'components/primitives/p-box';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {useNavigate} from 'react-router-dom';
import {getFavoritesNftTokensAction, getMarketItemsAction} from 'store/app/actions';
import {
  appFavoritesNftTokensSelector,
  appLoadingSelector,
  appMarketItemsSelector,
  appTotalNftTokensSelector,
} from 'store/app/selectors';
import {MarketItemStatus} from 'types/api';
import {useEffect, useMemo, useState} from 'react';
import {PLoader} from 'components/primitives/p-loader';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {setMarketItems} from 'store/app/slice-app';
import {TAKE_COUNT} from 'constants/common';

export const PageMyFavorites = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const dispatch = useDispatch();
  const {show} = usePopup();
  const navigate = useNavigate();
  const [take, setTake] = useState(TAKE_COUNT);
  const [withoutLoading, setWithoutLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const totalNftTokens = useSelector(appTotalNftTokensSelector);
  const loading = useSelector(appLoadingSelector);
  const {address} = useSelector(userAccountSelector);
  const favoritesMarketItems = useSelector(appMarketItemsSelector);
  const favoritesNftTokens = useSelector(appFavoritesNftTokensSelector);
  const showedItemEntities = useMemo(() => favoritesMarketItems.length, [favoritesMarketItems]);
  const favoritesNftTokensIds = useMemo(
    () => favoritesNftTokens.map(f => f.nftTokenDetail?.nftTokenId),
    [favoritesNftTokens]
  );

  useEffect(() => {
    if (address) {
      dispatch(getFavoritesNftTokensAction({wallet: address, take, withoutLoading}));
    }
  }, [address, take]);

  useEffect(() => {
    if (favoritesNftTokensIds.length !== 0) {
      dispatch(
        getMarketItemsAction({
          nftTokenIds: favoritesNftTokensIds as string[],
          status: MarketItemStatus.Open,
          take: 200,
          withoutLoading,
        })
      );
    } else {
      dispatch(setMarketItems([]));
    }
  }, [favoritesNftTokensIds]);

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM
          dispatch={dispatch}
          show={show}
          address={address!}
          navigate={navigate}
          provider={provider}
          favoritesMarketItems={favoritesMarketItems}
          take={take}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
          totalNftTokens={totalNftTokens}
          showedItemEntities={showedItemEntities}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: 'name',
                '-name': `-name`,
              },
              params: {
                nftTokenIds: favoritesNftTokensIds as string[],
                status: MarketItemStatus.Open,
                take,
                withoutLoading,
              },
            },
          ]}
        />
      ) : tablet ? (
        <SectionMainT
          dispatch={dispatch}
          show={show}
          address={address!}
          navigate={navigate}
          provider={provider}
          favoritesMarketItems={favoritesMarketItems}
          take={take}
          onShowMoreClick={() => {
            setTake(take => take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
          totalNftTokens={totalNftTokens}
          showedItemEntities={showedItemEntities}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: 'name',
                '-name': `-name`,
              },
              params: {
                nftTokenIds: favoritesNftTokensIds as string[],
                status: MarketItemStatus.Open,
                take,
                withoutLoading,
              },
            },
          ]}
        />
      ) : desktop ? (
        <SectionMainD
          dispatch={dispatch}
          show={show}
          address={address!}
          navigate={navigate}
          provider={provider}
          favoritesMarketItems={favoritesMarketItems}
          take={take}
          onShowMoreClick={() => {
            setTake(take => take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
          totalNftTokens={totalNftTokens}
          showedItemEntities={showedItemEntities}
          onSorting={() => {
            setWithoutLoading(true);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: 'name',
                '-name': `-name`,
              },
              params: {
                nftTokenIds: favoritesNftTokensIds as string[],
                status: MarketItemStatus.Open,
                take,
                withoutLoading,
              },
            },
          ]}
        />
      ) : null}
    </main>
  );
};
