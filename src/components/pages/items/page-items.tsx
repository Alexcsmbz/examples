import {PBox} from 'components/primitives/p-box';
import {useNavigate, useParams} from 'react-router-dom';
import {PLoader} from 'components/primitives/p-loader';
import {MARKET_ITEM_SORT_LABEL} from 'constants/sort-options';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCollectionsAction, getMarketItemsAction} from 'store/app/actions';
import {appCollectionsSelector, appLoadingSelector, appTotalMarketItemsSelector} from 'store/app/selectors';
import {State} from 'store/types';
import {ItemCollection, NftTokenDetailStateEnum, MarketItem, MarketItemStatus} from 'types/api';
import {userAccountSelector} from 'store/user/selectors';
import Web3 from 'web3';
import {useForm} from 'react-hook-form';
import {SelectOption} from 'types/custom';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {TAKE_COUNT} from 'constants/common';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export type FormItemsFilterFields = {
  categories: SelectOption | null;
  priceFrom: string | null;
  priceTo: string | null;
  currency: string;
};

export const PageItems = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const {itemCollectionId, categoryId, creatorAddress} =
    useParams<{itemCollectionId: string; categoryId: string; creatorAddress: string}>();
  const dispatch = useDispatch();
  const marketItems: MarketItem[] = useSelector((state: State) =>
    state.app.marketItems.filter(
      (mI: MarketItem) =>
        !(
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
        )
    )
  );
  const loading = useSelector(appLoadingSelector);
  const collections = useSelector(appCollectionsSelector);
  const [take, setTake] = useState(TAKE_COUNT);
  const [withoutLoading, setWithoutLoading] = useState(false);
  const totalMarketItems = useSelector(appTotalMarketItemsSelector);
  const showedItemEntities = useMemo(() => marketItems.length, [marketItems]);
  const [priceStart, setPriceStart] = useState<string | null>();
  const [priceEnd, setPriceEnd] = useState<string | null>();
  const selectedCollection: ItemCollection[] = useSelector((state: State) =>
    state.app.collections.filter((c: ItemCollection) => c.id === itemCollectionId)
  );
  const {address} = useSelector(userAccountSelector);
  const navigate = useNavigate();
  const {show} = usePopup();
  const {
    control,
    register,
    reset,
    getValues,
    formState: {isDirty},
    handleSubmit,
  } = useForm<FormItemsFilterFields>({
    defaultValues: {
      categories: null,
      priceFrom: '',
      priceTo: '',
      currency: 'eth',
    },
  });
  const {setProvider} = useProvider();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryId !== 'all') {
      dispatch(
        getMarketItemsAction({
          itemCollectionId,
          categoryId,
          status: MarketItemStatus.Open,
          take,
          withoutLoading,
          seller: creatorAddress,
        })
      );
    } else {
      dispatch(
        getMarketItemsAction({
          itemCollectionId,
          status: MarketItemStatus.Open,
          take,
          withoutLoading,
          seller: creatorAddress,
        })
      );
    }

    if (collections.length === 0) dispatch(getCollectionsAction({}));
  }, [itemCollectionId, take, setTake]);

  const handleItemsFilter = handleSubmit(data => {
    const priceStart = data.priceFrom ? Web3.utils.toWei(data.priceFrom.replace(/,/g, ''), 'ether') : null;
    const priceEnd = data.priceTo ? Web3.utils.toWei(data.priceTo.replace(/,/g, ''), 'ether') : null;

    setPriceStart(priceStart);
    setPriceEnd(priceEnd);

    dispatch(
      getMarketItemsAction({
        status: MarketItemStatus.Open,
        itemCollectionId,
        categoryId: data.categories?.value!,
        priceStart,
        priceEnd,
        seller: creatorAddress,
      })
    );
  });

  const handleClearItemsFilter = () => {
    if (categoryId !== 'all') {
      dispatch(
        getMarketItemsAction({
          itemCollectionId,
          categoryId,
          status: MarketItemStatus.Open,
          take,
          seller: creatorAddress,
        })
      );
    } else {
      dispatch(getMarketItemsAction({itemCollectionId, status: MarketItemStatus.Open, take, seller: creatorAddress}));
    }

    if (collections.length === 0) dispatch(getCollectionsAction({}));
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
          itemCollectionId={itemCollectionId}
          selectedCollection={selectedCollection}
          categoryId={categoryId}
          marketItems={marketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          setProvider={setProvider}
          dispatch={dispatch}
          show={show}
          take={take}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: MARKET_ITEM_SORT_LABEL,
                '-name': `-${MARKET_ITEM_SORT_LABEL}`,
                price: 'price',
                '-price': '-price',
              },
              params: {
                itemCollectionId,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take,
                status: MarketItemStatus.Open,
                seller: creatorAddress,
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
          itemCollectionId={itemCollectionId}
          selectedCollection={selectedCollection}
          categoryId={categoryId}
          marketItems={marketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          setProvider={setProvider}
          dispatch={dispatch}
          show={show}
          take={take}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setWithoutLoading(true);
            setFilterOpen(false);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: MARKET_ITEM_SORT_LABEL,
                '-name': `-${MARKET_ITEM_SORT_LABEL}`,
                price: 'price',
                '-price': '-price',
              },
              params: {
                itemCollectionId,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take,
                status: MarketItemStatus.Open,
                seller: creatorAddress,
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
          itemCollectionId={itemCollectionId}
          selectedCollection={selectedCollection}
          categoryId={categoryId}
          marketItems={marketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          setProvider={setProvider}
          dispatch={dispatch}
          show={show}
          take={take}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          onItemsFilter={handleItemsFilter}
          onClearItemsFilter={handleClearItemsFilter}
          onSorting={() => {
            setWithoutLoading(true);
          }}
          sortActions={[
            {
              action: getMarketItemsAction,
              sortVariants: {
                name: MARKET_ITEM_SORT_LABEL,
                '-name': `-${MARKET_ITEM_SORT_LABEL}`,
                price: 'price',
                '-price': '-price',
              },
              params: {
                itemCollectionId,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take,
                status: MarketItemStatus.Open,
                seller: creatorAddress,
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
