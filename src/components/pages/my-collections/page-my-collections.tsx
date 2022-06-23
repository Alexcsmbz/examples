import {PBox} from 'components/primitives/p-box';

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
  appDraftNftTokensSelector,
  appLoadingSelector,
  appMarketItemsSelector,
  appTotalCollectionsSelector,
} from 'store/app/selectors';
import {userAccountSelector} from 'store/user/selectors';
import Web3 from 'web3';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {differenceBy, intersectionBy} from 'lodash';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {SelectOption} from 'types/custom';
import {parse} from 'utils/parse-from-numeric-input';
import {setDraftNftTokens, setMarketItems, setNftTokens} from 'store/app/slice-app';
import {NftTokenDetailStateEnum, MarketItemStatus, NftToken} from 'types/api';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {State} from 'store/types';

export type FormMyCollectionsFilterFields = {
  categories: SelectOption | null;
  priceFrom: string | null;
  priceTo: string | null;
  currency?: string;
};

export const PageMyCollections = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const dispatch = useDispatch();
  const collections = useSelector(appCollectionsSelector);
  const loading = useSelector(appLoadingSelector);
  const marketItems = useSelector(appMarketItemsSelector);
  const totalCollections = useSelector(appTotalCollectionsSelector);
  const {address} = useSelector(userAccountSelector);
  const nftTokens: NftToken[] = useSelector((state: State) =>
    state.app.nftTokens?.filter(
      (t: NftToken) =>
        t.nftTokenDetail?.nftTokenDetailOwners?.find(
          o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
        )?.itemCollectionId === null
    )
  );
  const [filterOpen, setFilterOpen] = useState(false);

  const {show} = usePopup();
  const navigate = useNavigate();
  const {
    control,
    register,
    reset,
    formState: {isDirty},
    handleSubmit,
    getValues,
  } = useForm<FormMyCollectionsFilterFields>({
    defaultValues: {
      categories: null,
      priceFrom: '',
      priceTo: '',
      currency: 'eth',
    },
  });

  const nftTokensWithoutOpenMarketItems = useMemo(
    () =>
      differenceBy(
        nftTokens,
        intersectionBy(
          marketItems.map(mI => ({...mI, id: mI.nftTokenId})),
          nftTokens.map(nT => ({...nT, id: nT.id})),
          'id'
        ).filter(i => i.status === MarketItemStatus.Open),
        'id'
      ).filter(
        nT =>
          nT.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId === null
      ),
    [marketItems, nftTokens]
  );
  const draftNftTokens = useSelector(appDraftNftTokensSelector);

  const draftNftTokensInRoot = useMemo(
    () =>
      draftNftTokens.filter(
        nT =>
          nT.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId === null
      ),
    [draftNftTokens]
  );

  useEffect(() => {
    if (address) {
      dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
      dispatch(
        getMarketItemsAction({
          seller: address,
          status: MarketItemStatus.Open,
          getEmptyItemCollectionIdOnly: true,
          take: 200,
        })
      );
      dispatch(getNftTokensAction({ownerAddress: address, take: 200}));
      dispatch(getDraftNftTokensAction({ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200}));
    }
  }, [address]);

  useEffect(
    () => () => {
      dispatch(setMarketItems([]));
    },
    []
  );

  const handleItemsFilter = handleSubmit(data => {
    const priceStart = data.priceFrom ? Web3.utils.toWei(parse(data.priceFrom).toString(), 'ether') : null;
    const priceEnd = data.priceTo ? Web3.utils.toWei(parse(data.priceTo).toString(), 'ether') : null;

    if (priceStart || priceEnd) {
      dispatch(setNftTokens([]));
      dispatch(setDraftNftTokens([]));
    } else {
      dispatch(getNftTokensAction({categoryId: data.categories?.value!, ownerAddress: address, take: 200}));
      dispatch(
        getDraftNftTokensAction({
          categoryId: data.categories?.value!,
          ownerAddress: address,
          state: NftTokenDetailStateEnum.Draft,
          take: 200,
        })
      );
    }

    dispatch(
      getMarketItemsAction({
        categoryId: data.categories?.value!,
        status: MarketItemStatus.Open,
        seller: address,
        priceStart,
        priceEnd,
        getEmptyItemCollectionIdOnly: true,
        take: 200,
      })
    );
  });

  const handleClearItemsFilter = () => {
    if (address) {
      dispatch(getCollectionsAction({creatorAddress: address!, showEmptyCollections: true}));
      dispatch(
        getMarketItemsAction({
          seller: address,
          status: MarketItemStatus.Open,
          getEmptyItemCollectionIdOnly: true,
          take: 200,
        })
      );
      dispatch(getNftTokensAction({ownerAddress: address, take: 200}));
      dispatch(getDraftNftTokensAction({ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200}));
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
          collections={collections}
          marketItems={marketItems}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          draftNftTokensInRoot={draftNftTokensInRoot}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          totalCollections={totalCollections}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onSorting={() => {
            setFilterOpen(false);
          }}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
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
              params: {seller: address, status: MarketItemStatus.Open, getEmptyItemCollectionIdOnly: true, take: 200},
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, take: 200},
            },
            {
              action: getDraftNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200},
            },
          ]}
        />
      ) : tablet ? (
        <SectionMainT
          collections={collections}
          marketItems={marketItems}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          draftNftTokensInRoot={draftNftTokensInRoot}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          totalCollections={totalCollections}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          onSorting={() => {
            setFilterOpen(false);
          }}
          onItemsFilter={() => {
            handleItemsFilter();
            setFilterOpen(false);
          }}
          onClearItemsFilter={() => {
            handleClearItemsFilter();
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
              params: {seller: address, status: MarketItemStatus.Open, getEmptyItemCollectionIdOnly: true, take: 200},
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, take: 200},
            },
            {
              action: getDraftNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200},
            },
          ]}
        />
      ) : desktop ? (
        <SectionMainD
          collections={collections}
          marketItems={marketItems}
          nftTokensWithoutOpenMarketItems={nftTokensWithoutOpenMarketItems}
          draftNftTokensInRoot={draftNftTokensInRoot}
          address={address!}
          navigate={navigate}
          provider={provider}
          dispatch={dispatch}
          show={show}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
          getValues={getValues}
          totalCollections={totalCollections}
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
              params: {seller: address, status: MarketItemStatus.Open, getEmptyItemCollectionIdOnly: true, take: 200},
            },
            {
              action: getNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, take: 200},
            },
            {
              action: getDraftNftTokensAction,
              sortVariants: {
                name: NFT_TOKEN_SORT_LABEL,
                '-name': `-${NFT_TOKEN_SORT_LABEL}`,
              },
              params: {ownerAddress: address, state: NftTokenDetailStateEnum.Draft, take: 200},
            },
          ]}
        />
      ) : null}
    </main>
  );
};
