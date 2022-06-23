import {PBox} from 'components/primitives/p-box';
import {useNavigate, useParams} from 'react-router-dom';
import {PLoader} from 'components/primitives/p-loader';
import {MARKET_ITEM_SORT_LABEL, NFT_TOKEN_SORT_LABEL} from 'constants/sort-options';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCollectionsAction,
  getDraftNftTokensAction,
  getMarketItemsAction,
  getNftTokensAction,
} from 'store/app/actions';
import {
  appCollectionsSelector,
  appNftTokensSelector,
  appLoadingSelector,
  appDraftNftTokensSelector,
} from 'store/app/selectors';
import {State} from 'store/types';
import {ItemCollection, NftTokenDetailStateEnum, MarketItem, MarketItemStatus} from 'types/api';
import {userAccountSelector} from 'store/user/selectors';
import Web3 from 'web3';
import {useForm} from 'react-hook-form';
import {SelectOption} from 'types/custom';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {setNftTokens} from 'store/app/slice-app';
import {differenceBy, intersectionBy} from 'lodash';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export type FormItemsFilterFields = {
  categories: SelectOption | null;
  priceFrom: string | null;
  priceTo: string | null;
  currency: string;
};

export const PageMyItems = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const {itemCollectionId} = useParams<{itemCollectionId: string}>();
  const dispatch = useDispatch();
  const marketItems: MarketItem[] = useSelector((state: State) =>
    state.app.marketItems.filter((mI: MarketItem) => mI.status === 'Open')
  );
  const nftTokens = useSelector(appNftTokensSelector);
  const loading = useSelector(appLoadingSelector);
  const collections = useSelector(appCollectionsSelector);
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
  const [filterOpen, setFilterOpen] = useState(false);

  const nftTokensWithoutOpenMarketItems = useMemo(
    () =>
      differenceBy(
        nftTokens,
        intersectionBy(
          marketItems.map(mI => ({...mI, id: mI.nftTokenId})),
          nftTokens.map(nT => ({...nT, id: nT.id})),
          'id'
        ).filter(i => i.status === 'Open'),
        'id'
      ),
    [marketItems, nftTokens]
  );
  const draftNftTokens = useSelector(appDraftNftTokensSelector);

  useEffect(() => {
    dispatch(getMarketItemsAction({itemCollectionId, status: MarketItemStatus.Open, seller: address, take: 200}));
    dispatch(getNftTokensAction({itemCollectionId, ownerAddress: address, take: 200}));
    dispatch(
      getDraftNftTokensAction({
        itemCollectionId,
        ownerAddress: address,
        state: NftTokenDetailStateEnum.Draft,
        take: 200,
      })
    );
    dispatch(getCollectionsAction({}));
  }, [itemCollectionId]);

  const handleItemsFilter = handleSubmit(data => {
    const priceStart = data.priceFrom ? Web3.utils.toWei(data.priceFrom.replace(/,/g, ''), 'ether') : null;
    const priceEnd = data.priceTo ? Web3.utils.toWei(data.priceTo.replace(/,/g, ''), 'ether') : null;

    setPriceStart(priceStart);
    setPriceEnd(priceEnd);

    if (priceStart || priceEnd) {
      dispatch(setNftTokens([]));
    } else {
      dispatch(
        getNftTokensAction({itemCollectionId, categoryId: data.categories?.value!, ownerAddress: address, take: 200})
      );
    }

    dispatch(
      getMarketItemsAction({
        status: MarketItemStatus.Open,
        seller: address,
        itemCollectionId,
        categoryId: data.categories?.value!,
        priceStart,
        priceEnd,
        take: 200,
      })
    );
  });

  const handleClearItemsFilter = () => {
    dispatch(getMarketItemsAction({itemCollectionId, status: MarketItemStatus.Open, seller: address, take: 200}));
    dispatch(getNftTokensAction({itemCollectionId, ownerAddress: address, take: 200}));
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
          marketItems={marketItems}
          draftNftTokens={draftNftTokens}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setFilterOpen(false);
          }}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
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
                status: MarketItemStatus.Open,
                itemCollectionId,
                seller: address,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take: 200,
              },
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {
                itemCollectionId,
                ownerAddress: address,
                categoryId: getValues('categories')?.value,
                take: 200,
              },
            },
          ]}
        />
      ) : tablet ? (
        <SectionMainT
          itemCollectionId={itemCollectionId}
          selectedCollection={selectedCollection}
          marketItems={marketItems}
          draftNftTokens={draftNftTokens}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
            setFilterOpen(false);
          }}
          onSorting={() => {
            setFilterOpen(false);
          }}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
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
                status: MarketItemStatus.Open,
                itemCollectionId,
                seller: address,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take: 200,
              },
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {
                itemCollectionId,
                ownerAddress: address,
                categoryId: getValues('categories')?.value,
                take: 200,
              },
            },
          ]}
        />
      ) : desktop ? (
        <SectionMainD
          itemCollectionId={itemCollectionId}
          selectedCollection={selectedCollection}
          marketItems={marketItems}
          draftNftTokens={draftNftTokens}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          onItemsFilter={handleItemsFilter}
          onClearItemsFilter={handleClearItemsFilter}
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
                status: MarketItemStatus.Open,
                itemCollectionId,
                seller: address,
                categoryId: getValues('categories')?.value,
                priceStart,
                priceEnd,
                take: 200,
              },
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {
                itemCollectionId,
                ownerAddress: address,
                categoryId: getValues('categories')?.value,
                take: 200,
              },
            },
          ]}
        />
      ) : null}
    </main>
  );
};
