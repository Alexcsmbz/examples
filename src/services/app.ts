import {Category, Author, ItemCollection, MarketItem, ProblemDetails, NftToken, SearchResult} from 'types/api';
import {ServerResponse} from 'types/custom';
import {Fetcher} from 'utils/fetcher';
import {ApiUrl} from './constants';
import qs from 'qs';

const fetcher = new Fetcher({baseURL: `${process.env.REACT_APP_API_URL}`});

export const getItemImage = (url: string, params?: any): Promise<any> =>
  fetcher.request({
    url,
    params,
  });

export const getCategoriesService = (params?: any): Promise<ServerResponse<Category[]>> =>
  fetcher.request({
    url: ApiUrl.categories,
    params,
  });

export const getAuthorsService = (params?: any): Promise<ServerResponse<Author[]>> =>
  fetcher.request({
    url: ApiUrl.authors,
    params,
  });

export const getCollectionsService = (params?: any): Promise<ServerResponse<ItemCollection[]>> =>
  fetcher.request({
    url: ApiUrl.collectionsList,
    params,
  });

export const postCollectionService = (data?: any): Promise<ServerResponse<ItemCollection[]>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.collections,
    data,
  });

export const putCollectionService = (data?: any): Promise<ServerResponse<ItemCollection[]>> =>
  fetcher.request({
    method: 'PUT',
    url: ApiUrl.collections,
    data,
  });

export const deleteCollectionService = (params?: any): Promise<ServerResponse<ItemCollection[]>> =>
  fetcher.request({
    method: 'DELETE',
    url: ApiUrl.collections,
    params,
  });

export const postNftTokenService = (data?: any): Promise<ServerResponse<ProblemDetails>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.nftToken,
    data,
  });

export const getMarketItemsService = (params?: any): Promise<ServerResponse<{data: MarketItem[]; count?: number}>> =>
  fetcher.request(
    params.nftTokenIds
      ? {
          url: ApiUrl.marketItems,
          params,
          paramsSerializer: params => qs.stringify(params),
        }
      : {
          url: ApiUrl.marketItems,
          params,
        }
  );

export const getMarketItemByIdService = ({id, ...params}: any): Promise<ServerResponse<MarketItem>> =>
  fetcher.request({
    url: ApiUrl.marketItemById(id),
    params: {id, ...params},
  });

export const getNftTokensService = (params: any): Promise<ServerResponse<{data: NftToken[]; count?: number}>> =>
  fetcher.request({
    url: ApiUrl.nftTokens,
    params,
  });

export const getNftTokenByIdService = ({id, ...params}: any): Promise<ServerResponse<NftToken>> =>
  fetcher.request({
    url: ApiUrl.nftTokenById(id),
    params: {id, ...params},
  });

export const postNftTokenCollectionIdService = (data?: any): Promise<ServerResponse<NftToken | MarketItem>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.nftTokenCollection,
    data,
  });

export const postNftTokenCategoryIdService = (data?: any): Promise<ServerResponse<NftToken | MarketItem>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.nftTokenCategory,
    data,
  });

export const getSearchService = (params?: any): Promise<ServerResponse<SearchResult>> =>
  fetcher.request({
    url: ApiUrl.search,
    params,
  });

export const postNftTokenPendingService = (data?: any): Promise<ServerResponse<NftToken | MarketItem>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.nftTokenPending,
    data,
  });

export const postFavoriteService = ({wallet, nftTokenId}: any) =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.favorites(wallet),
    data: {nftTokenId},
  });

export const deleteFavoriteService = ({wallet, nftTokenId}: any) =>
  fetcher.request({
    method: 'DELETE',
    url: ApiUrl.favorites(wallet),
    data: {nftTokenId},
  });

export const getFavoritesService = (params?: {wallet: string}) =>
  fetcher.request({url: ApiUrl.favorites(params?.wallet), params});

export const getHistoryService = (params?: {walletAddress: string}) =>
  fetcher.request({url: ApiUrl.history(params?.walletAddress), params});
