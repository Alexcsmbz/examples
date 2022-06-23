import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from './types';

const sliceApp = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    errors: [],
    categories: [],
    authors: [],
    totalAuthors: 0,
    collections: [],
    itemEntity: undefined,
    marketItems: [],
    nftTokens: [],
    totalMarketItems: 0,
    totalNftTokens: 0,
    totalCollections: 0,
    searchResult: {},
    totalSearchResults: 0,
    draftNftTokens: [],
    favoritesNftTokens: [],
    transactions: [],
  },
  reducers: {
    setErrors(state: AppState, {payload}: PayloadAction<string>) {
      state.errors = [...state.errors, payload];
    },
    setLoading(state: AppState, {payload}: PayloadAction<AppState['loading']>) {
      state.loading = payload;
    },
    setCategories(state: AppState, {payload}: PayloadAction<AppState['categories']>) {
      state.categories = payload;
    },
    setAuthors(state: AppState, {payload}: PayloadAction<AppState['authors']>) {
      state.authors = payload;
    },
    setTotalAuthors(state: AppState, {payload}: PayloadAction<AppState['totalAuthors']>) {
      state.totalAuthors = payload;
    },
    setCollections(state: AppState, {payload}: PayloadAction<AppState['collections']>) {
      state.collections = payload;
    },
    setMarketItems(state: AppState, {payload}: PayloadAction<AppState['marketItems']>) {
      state.marketItems = payload;
    },
    setNftTokens(state: AppState, {payload}: PayloadAction<AppState['nftTokens']>) {
      state.nftTokens = payload;
    },
    setItemEntity(state: AppState, {payload}: PayloadAction<AppState['itemEntity']>) {
      state.itemEntity = payload;
    },
    setTotalMarketItems(state: AppState, {payload}: PayloadAction<AppState['totalMarketItems']>) {
      state.totalMarketItems = payload;
    },
    setTotalNftTokens(state: AppState, {payload}: PayloadAction<AppState['totalNftTokens']>) {
      state.totalNftTokens = payload;
    },
    setTotalCollections(state: AppState, {payload}: PayloadAction<AppState['totalCollections']>) {
      state.totalCollections = payload;
    },
    setSearchResult(state: AppState, {payload}: PayloadAction<AppState['searchResult']>) {
      state.searchResult = payload;
    },
    setTotalSearchResults(state: AppState, {payload}: PayloadAction<AppState['totalSearchResults']>) {
      state.totalSearchResults = payload;
    },
    setDraftNftTokens(state: AppState, {payload}: PayloadAction<AppState['draftNftTokens']>) {
      state.draftNftTokens = payload;
    },
    setFavoritesNftTokens(state: AppState, {payload}: PayloadAction<AppState['favoritesNftTokens']>) {
      state.favoritesNftTokens = payload;
    },
    setTransactions(state: AppState, {payload}: PayloadAction<AppState['transactions']>) {
      state.transactions = payload;
    },
  },
});

export const {
  setErrors,
  setCategories,
  setAuthors,
  setTotalAuthors,
  setCollections,
  setLoading,
  setMarketItems,
  setNftTokens,
  setItemEntity,
  setTotalMarketItems,
  setTotalNftTokens,
  setTotalCollections,
  setSearchResult,
  setTotalSearchResults,
  setDraftNftTokens,
  setFavoritesNftTokens,
  setTransactions,
} = sliceApp.actions;

export const appReducer = sliceApp.reducer;
