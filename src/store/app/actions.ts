import {GetMarketItemsActionParams, GetNftTokensActionParams} from './types';

//TODO: remove payloads types from this file to types.ts
export const getCategoriesAction = (payload?: {sortBy?: string; withoutLoading?: boolean}) => ({
  type: 'app/getCategoriesAction',
  payload,
});

export const getAuthorsAction = (payload?: {
  name?: string;
  categoryId?: string;
  categoryName?: string;
  sortBy?: string;
  take?: number;
  withoutLoading?: boolean;
}) => ({
  type: 'app/getAuthorsAction',
  payload,
});

export const getCollectionsAction = (payload?: {
  showEmptyCollections?: boolean;
  creatorId?: string;
  categoryId?: string;
  creatorAddress?: string;
  includeWithEmptyTokenDetails?: boolean;
  sortBy?: string;
  take?: number;
  withoutLoading?: boolean;
}) => ({
  type: 'app/getCollectionsAction',
  payload,
});

export const getMarketItemsAction = (payload?: GetMarketItemsActionParams) => ({
  type: 'app/getMarketItemsAction',
  payload,
});

export const getMarketItemByIdAction = (payload?: {id?: string; withoutLoading?: boolean}) => ({
  type: 'app/getMarketItemByIdAction',
  payload,
});

export const getNftTokensAction = (payload?: GetNftTokensActionParams) => ({
  type: 'app/getNftTokensAction',
  payload,
});

export const getNftTokenByIdAction = (payload?: {id?: string; withoutLoading?: boolean}) => ({
  type: 'app/getNftTokenByIdAction',
  payload,
});

export const getSearchResultAction = (payload?: {}) => ({
  type: 'app/getSearchResultAction',
  payload,
});

export const getDraftNftTokensAction = (payload?: GetNftTokensActionParams) => ({
  type: 'app/getDraftNftTokensAction',
  payload,
});

export const getFavoritesNftTokensAction = (payload?: {wallet: string; take: number; withoutLoading?: boolean}) => ({
  type: 'app/getFavoritesNftTokensAction',
  payload,
});

export const getHistoryAction = (payload?: {walletAddress: string}) => ({
  type: 'app/getHistoryAction',
  payload,
});
