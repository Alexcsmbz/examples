import {createSelector} from '@reduxjs/toolkit';
import {State} from 'store/types';
import {AppState} from './types';

const getState = (state: State): AppState => state.app;

export const appLoadingSelector = createSelector(getState, state => state.loading);
export const appCategoriesSelector = createSelector(getState, state => state.categories);
export const appAuthorsSelector = createSelector(getState, state => state.authors);
export const appTotalsAuthorsSelector = createSelector(getState, state => state.totalAuthors);
export const appCollectionsSelector = createSelector(getState, state => state.collections);
export const appMarketItemsSelector = createSelector(getState, state => state.marketItems);
export const appTotalMarketItemsSelector = createSelector(getState, state => state.totalMarketItems);
export const appTotalItemEntities = createSelector(getState, state => state.totalMarketItems + state.totalNftTokens);
export const appNftTokensSelector = createSelector(getState, state => state.nftTokens);
export const appTotalNftTokensSelector = createSelector(getState, state => state.totalNftTokens);
export const appItemEntitySelector = createSelector(getState, state => state.itemEntity);
export const appTotalCollectionsSelector = createSelector(getState, state => state.totalCollections);
export const appSearchResultSelector = createSelector(getState, state => state.searchResult);
export const appTotalSearchResultsSelector = createSelector(getState, state => state.totalSearchResults);
export const appDraftNftTokensSelector = createSelector(getState, state => state.draftNftTokens);
export const appFavoritesNftTokensSelector = createSelector(getState, state => state.favoritesNftTokens);
export const appTransactionsSelector = createSelector(getState, state => state.transactions);
