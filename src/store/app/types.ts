import {
  Author,
  Category,
  ItemCollection,
  SearchResult,
  MarketItem,
  NftToken,
  MarketItemStatus,
  NftTokenDetailStateEnum,
  Transaction,
} from 'types/api';

export type AppState = {
  loading: boolean;
  errors: string[];
  categories: Category[];
  authors: Author[];
  totalAuthors: number;
  collections: ItemCollection[];
  marketItems: MarketItem[];
  itemEntity: MarketItem | NftToken | null | undefined;
  nftTokens: NftToken[];
  totalMarketItems: number;
  totalNftTokens: number;
  totalCollections: number;
  searchResult: SearchResult;
  totalSearchResults: number;
  draftNftTokens: NftToken[];
  favoritesNftTokens: NftToken[];
  transactions: Transaction[];
};

export type GetNftTokensActionParams = {
  itemCollectionId?: string;
  take?: number;
  ownerAddress?: string | null;
  categoryId?: string;
  withoutLoading?: boolean;
  inFavorites?: string | null;
  state?: NftTokenDetailStateEnum;
};

export type GetMarketItemsActionParams = {
  itemCollectionId?: string;
  take?: number;
  seller?: string | null;
  categoryId?: string;
  priceStart?: string | null;
  priceEnd?: string | null;
  status?: MarketItemStatus;
  withoutLoading?: boolean;
  inFavorites?: string | null;
  getEmptyItemCollectionIdOnly?: boolean;
  nftTokenIds?: string[];
};
