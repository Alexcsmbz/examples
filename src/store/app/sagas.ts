import {takeEvery, all, call, put} from 'redux-saga/effects';
import {
  getAuthorsAction,
  getCategoriesAction,
  getCollectionsAction,
  getDraftNftTokensAction,
  getFavoritesNftTokensAction,
  getHistoryAction,
  getMarketItemByIdAction,
  getMarketItemsAction,
  getNftTokenByIdAction,
  getNftTokensAction,
  getSearchResultAction,
} from './actions';
import {
  getAuthorsService,
  getCategoriesService,
  getCollectionsService,
  getFavoritesService,
  getHistoryService,
  getMarketItemByIdService,
  getMarketItemsService,
  getNftTokenByIdService,
  getNftTokensService,
} from 'services/app';
import {
  setErrors,
  setCategories,
  setAuthors,
  setCollections,
  setLoading,
  setItemEntity,
  setMarketItems,
  setNftTokens,
  setTotalNftTokens,
  setTotalMarketItems,
  setTotalCollections,
  setSearchResult,
  setTotalSearchResults,
  setDraftNftTokens,
  setTotalAuthors,
  setFavoritesNftTokens,
  setTransactions,
} from './slice-app';
import {Author, Category, ItemCollection, MarketItem, NftToken, SearchResult, Transaction} from 'types/api';

const getSearchResultSaga = function* ({payload}: {payload: SearchResult} & {type: string}) {
  yield put(setLoading(true));
  try {
    yield put(setSearchResult(payload));
    yield put(
      setTotalSearchResults(
        payload?.itemCollectionsTotalCount! + payload?.marketItemsTotalCount! + payload?.usersTotalCount! || 0
      )
    );
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield put(setLoading(false));
  }
};

const getCategoriesSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));

  try {
    const response: {data: {data: Category[]}} = yield call(getCategoriesService, payload);
    yield put(setCategories(response.data.data));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getAuthorsSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {categoryId: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: Author[]; totalCount?: number}} = yield call(getAuthorsService, payload);
    yield put(setAuthors(response.data.data));
    yield put(setTotalAuthors(response.data.totalCount!));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getCollectionsSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {creatorId: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: ItemCollection[]; total?: number}} = yield call(getCollectionsService, payload);
    yield put(setCollections(response.data.data));
    yield put(setTotalCollections(response.data.total!));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getMarketItemsSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {itemCollectionId: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: MarketItem[]; total?: number}} = yield call(getMarketItemsService, payload);
    yield put(setMarketItems(response.data.data));
    yield put(setTotalMarketItems(response.data.total!));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getMarketItemByIdSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {id: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: MarketItem}} = yield call(getMarketItemByIdService, payload);
    yield put(setItemEntity(response.data.data));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getNftTokensSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {itemCollectionId: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: NftToken[]; totalCount?: number}} = yield call(getNftTokensService, payload);
    yield put(setNftTokens(response.data.data));
    yield put(setTotalNftTokens(response.data.totalCount!));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getNftTokenByIdSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {id: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: NftToken}} = yield call(getNftTokenByIdService, payload);
    yield put(setItemEntity(response.data.data));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getDraftNftTokensSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {itemCollectionId: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: NftToken[]; count?: number}} = yield call(getNftTokensService, payload);
    yield put(setDraftNftTokens(response.data.data));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getFavoritesNftTokensSaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {wallet: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: NftToken[]; total?: number}} = yield call(getFavoritesService, payload);
    yield put(setFavoritesNftTokens(response.data.data));
    yield put(setTotalNftTokens(response.data.total!));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

const getHistorySaga = function* ({
  payload: {withoutLoading, ...payload},
}: {payload: {walletAddress: string; withoutLoading?: boolean}} & {type: string}) {
  yield !withoutLoading && put(setLoading(true));
  try {
    const response: {data: {data: Transaction[]; count?: number}} = yield call(getHistoryService, payload);
    yield put(setTransactions(response.data.data));
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    yield !withoutLoading && put(setLoading(false));
  }
};

export const appSaga = function* () {
  yield all([
    takeEvery(getCategoriesAction().type, getCategoriesSaga),
    takeEvery(getAuthorsAction().type, getAuthorsSaga),
    takeEvery(getCollectionsAction().type, getCollectionsSaga),
    takeEvery(getMarketItemsAction().type, getMarketItemsSaga),
    takeEvery(getNftTokensAction().type, getNftTokensSaga),
    takeEvery(getMarketItemByIdAction().type, getMarketItemByIdSaga),
    takeEvery(getNftTokenByIdAction().type, getNftTokenByIdSaga),
    takeEvery(getSearchResultAction().type, getSearchResultSaga),
    takeEvery(getDraftNftTokensAction().type, getDraftNftTokensSaga),
    takeEvery(getFavoritesNftTokensAction().type, getFavoritesNftTokensSaga),
    takeEvery(getHistoryAction().type, getHistorySaga),
  ]);
};
