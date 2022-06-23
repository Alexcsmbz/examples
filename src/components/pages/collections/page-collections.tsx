import {PBox} from 'components/primitives/p-box';
import {useNavigate, useParams} from 'react-router-dom';
import {PLoader} from 'components/primitives/p-loader';
import {MARKET_ITEM_SORT_LABEL} from 'constants/sort-options';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthorsAction, getCollectionsAction, getMarketItemsAction} from 'store/app/actions';
import {
  appAuthorsSelector,
  appCollectionsSelector,
  appLoadingSelector,
  appTotalMarketItemsSelector,
} from 'store/app/selectors';
import {Author, NftTokenDetailStateEnum, MarketItem, MarketItemStatus, UserProfile} from 'types/api';
import {State} from 'store/types';
import {userAccountSelector, userProfileBannerSelector} from 'store/user/selectors';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {TAKE_COUNT} from 'constants/common';
import {getProfileService} from 'services/user';
import {SelectOption, ServerResponse} from 'types/custom';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {useForm} from 'react-hook-form';
import Web3 from 'web3';
import {parse} from 'utils/parse-from-numeric-input';

export type FormAuthorCollectionFilterFields = {
  categories: SelectOption | null;
  priceFrom: string | null;
  priceTo: string | null;
  currency?: string;
};

export const PageCollections = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const {creatorAddress, categoryId} = useParams<{creatorAddress: string; categoryId: string}>();
  const dispatch = useDispatch();
  const collections = useSelector(appCollectionsSelector);
  const loading = useSelector(appLoadingSelector);
  const authors = useSelector(appAuthorsSelector);
  const [take, setTake] = useState(TAKE_COUNT);
  const [withoutLoading, setWithoutLoading] = useState(false);
  const totalMarketItems = useSelector(appTotalMarketItemsSelector);
  const {address} = useSelector(userAccountSelector);
  const marketItems: MarketItem[] = useSelector((state: State) =>
    state.app.marketItems.filter(
      (mI: MarketItem) =>
        !(
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.Pending ||
          mI.nftToken?.nftTokenDetail?.state === NftTokenDetailStateEnum.ReadyToSync
        ) &&
        mI.nftToken?.nftTokenDetail?.nftTokenDetailOwners?.find(
          o => o.ownerAddress?.toLowerCase() === mI.seller?.walletAddress?.toLowerCase()
        )?.itemCollectionId === null
    )
  );
  const selectedAuthor: Author[] = useSelector((state: State) =>
    state.app.authors.filter((a: Author) => a.walletAddress?.toLowerCase() === creatorAddress?.toLowerCase())
  );
  const showedItemEntities = useMemo(() => marketItems.length, [marketItems]);
  const navigate = useNavigate();
  const {show} = usePopup();
  const defaultBanner = useSelector(userProfileBannerSelector);
  const [authorProfile, setAutorProfile] = useState<UserProfile>({});
  const {setProvider} = useProvider();
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    control,
    register,
    reset,
    formState: {isDirty},
    handleSubmit,
  } = useForm<FormAuthorCollectionFilterFields>({
    defaultValues: {
      categories: null,
      priceFrom: '',
      priceTo: '',
      currency: 'eth',
    },
  });

  useEffect(() => {
    if (categoryId !== 'all') {
      dispatch(
        getCollectionsAction({
          creatorAddress,
          categoryId,
          includeWithEmptyTokenDetails: false,
          withoutLoading,
        })
      );
      dispatch(
        getMarketItemsAction({seller: creatorAddress, status: MarketItemStatus.Open, categoryId, take, withoutLoading})
      );
    } else {
      dispatch(
        getCollectionsAction({
          creatorAddress,
          includeWithEmptyTokenDetails: false,
          withoutLoading,
        })
      );
      dispatch(getMarketItemsAction({seller: creatorAddress, status: MarketItemStatus.Open, take, withoutLoading}));
    }

    if (authors.length === 0) dispatch(getAuthorsAction({}));
  }, [creatorAddress, take, setTake]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfileService({wallet: creatorAddress});
        setAutorProfile((res.data as ServerResponse<UserProfile>).data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [creatorAddress]);

  const handleItemsFilter = handleSubmit(data => {
    const priceStart = data.priceFrom ? Web3.utils.toWei(parse(data.priceFrom).toString(), 'ether') : null;
    const priceEnd = data.priceTo ? Web3.utils.toWei(parse(data.priceTo).toString(), 'ether') : null;

    dispatch(
      getMarketItemsAction({
        categoryId: data.categories?.value!,
        status: MarketItemStatus.Open,
        seller: creatorAddress,
        priceStart,
        priceEnd,
        take,
      })
    );
  });

  const handleClearItemsFilter = () => {
    if (categoryId !== 'all') {
      dispatch(
        getCollectionsAction({
          creatorAddress,
          categoryId,
          includeWithEmptyTokenDetails: false,
          withoutLoading,
        })
      );
      dispatch(
        getMarketItemsAction({seller: creatorAddress, status: MarketItemStatus.Open, categoryId, take, withoutLoading})
      );
    } else {
      dispatch(
        getCollectionsAction({
          creatorAddress,
          includeWithEmptyTokenDetails: false,
          withoutLoading,
        })
      );
      dispatch(getMarketItemsAction({seller: creatorAddress, status: MarketItemStatus.Open, take, withoutLoading}));
    }

    if (authors.length === 0) dispatch(getAuthorsAction({}));

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
          authorProfile={authorProfile}
          defaultBanner={defaultBanner}
          selectedAuthor={selectedAuthor}
          categoryId={categoryId}
          collections={collections}
          creatorAddress={creatorAddress}
          marketItems={marketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          setProvider={setProvider}
          dispatch={dispatch}
          show={show}
          take={take}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
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
              params: {seller: creatorAddress, status: MarketItemStatus.Open, take},
            },
          ]}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
        />
      ) : tablet ? (
        <SectionMainT
          authorProfile={authorProfile}
          defaultBanner={defaultBanner}
          selectedAuthor={selectedAuthor}
          categoryId={categoryId}
          collections={collections}
          creatorAddress={creatorAddress}
          marketItems={marketItems}
          address={address!}
          navigate={navigate}
          provider={provider}
          setProvider={setProvider}
          dispatch={dispatch}
          show={show}
          take={take}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(!filterOpen)}
          onFilterClose={() => setFilterOpen(false)}
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          formControl={control}
          formRegister={register}
          formIsDirty={isDirty}
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
              params: {seller: creatorAddress, status: MarketItemStatus.Open, take},
            },
          ]}
          onShowMoreClick={() => {
            setTake(take + TAKE_COUNT);
            setWithoutLoading(true);
          }}
        />
      ) : desktop ? (
        <SectionMainD
          authorProfile={authorProfile}
          defaultBanner={defaultBanner}
          selectedAuthor={selectedAuthor}
          categoryId={categoryId}
          collections={collections}
          creatorAddress={creatorAddress}
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
          showedItemEntities={showedItemEntities}
          totalMarketItems={totalMarketItems}
          onSorting={() => setWithoutLoading(true)}
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
              params: {seller: creatorAddress, status: MarketItemStatus.Open, take},
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
