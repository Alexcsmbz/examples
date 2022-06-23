/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddAvatarByUrlCommand {
  pictureExternalLink?: string | null;
}

export interface AddBackgroundByUrlCommand {
  pictureExternalLink?: string | null;
}

export interface AddCollectionFavoriteCommand {
  /** @format uuid */
  nftCollectionId?: string;
}

export interface AddTokenFavoriteCommand {
  /** @format uuid */
  nftTokenId?: string;
}

export interface Author {
  /** @format uuid */
  id?: string;
  name?: string | null;
  walletAddress?: string | null;

  /** @format int32 */
  itemsCount?: number;
  profile?: UserProfile;
}

export interface AuthorPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: Author[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface Category {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string | null;
  name?: string | null;

  /** @format int32 */
  sort?: number | null;

  /** @format int32 */
  itemsCount?: number | null;

  /** @format int32 */
  authorsCount?: number | null;
  previewImageLink?: string | null;
}

export interface CategoryModel {
  /** @format uuid */
  id?: string;
  name?: string | null;

  /** @format int32 */
  sort?: number;

  /** @format int32 */
  itemsCount?: number | null;

  /** @format int32 */
  authorsCount?: number | null;
}

export interface CategoryPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: Category[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface CreateTransactionCommand {
  hash?: string | null;
  type?: TransactionType;
  fromAddress?: string | null;
  toAddress?: string | null;
}

export interface CreateUserProfileCommand {
  nickname?: string | null;
  website?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  telegramChannel?: string | null;
  discordServer?: string | null;
  aboutMe?: string | null;
  avatarUrl?: string | null;
  backgroundUrl?: string | null;
}

export interface EditUserProfileCommand {
  nickname?: string | null;
  website?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  telegramChannel?: string | null;
  discordServer?: string | null;
  aboutMe?: string | null;
}

export enum EventType {
  Undefined = 'Undefined',
  Mint = 'Mint',
  MarketItemCreated = 'MarketItemCreated',
  MarketItemClosed = 'MarketItemClosed',
  PriceChanged = 'PriceChanged',
  Transfer = 'Transfer',
  Rebate = 'Rebate',
  BlockUser = 'BlockUser',
  UnblockUser = 'UnblockUser',
  MarketItemSold = 'MarketItemSold',
  TransferSingle = 'TransferSingle',
}

export interface FavoriteCollection {
  /** @format uuid */
  userId?: string;
  user?: User;

  /** @format uuid */
  itemCollectionId?: string;
  itemCollection?: ItemCollection;

  /** @format date-time */
  created?: string;
}

export interface FavoriteCollectionPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: FavoriteCollection[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface HealthCheckResponseModel {
  databaseConnectionState?: string | null;
  databaseName?: string | null;
  lastMigration?: string | null;
  apiVersion?: string | null;
}

export interface ItemCollection {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string | null;
  name?: string | null;
  description?: string | null;

  /** @format uuid */
  creatorId?: string | null;
  creator?: User;
  nftTokenDetails?: NftTokenDetail[] | null;
}

export interface ItemCollectionModel {
  /** @format uuid */
  id?: string;
  name?: string | null;
  description?: string | null;

  /** @format uuid */
  creatorId?: string;
  categoriesIds?: string[] | null;
  nftTokenDetails?: NftTokenDetail[] | null;
}

export interface ItemCollectionModelServiceResponse {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: ItemCollectionModel;
}

export interface ItemCollectionPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: ItemCollection[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface ItemCollectionResult {
  data?: ItemCollection;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export interface LanguageModel {
  id?: string | null;
  name?: string | null;
}

export interface LoginModel {
  walletAddress?: string | null;
  signedNonce?: string | null;
}

export interface LoginResponseModel {
  bearer?: string | null;
}

export interface MarketItem {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string;

  /** @format uuid */
  nftTokenId?: string | null;
  nftToken?: NftToken;
  itemId?: string | null;
  nftContract?: string | null;
  tokenId?: string | null;
  sellerWallet?: string | null;
  seller?: User;
  price?: string | null;
  quantity?: string | null;
  tokenType?: TokenType;
  status?: MarketItemStatus;

  /** @format int32 */
  totalQuantity?: number | null;
}

export interface MarketItemPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: MarketItem[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface MarketItemResult {
  data?: MarketItem;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export enum MarketItemStatus {
  Open = 'Open',
  Close = 'Close',
}

export interface NftToken {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string;

  /** @format int32 */
  chainId?: number | null;
  contractAddress?: string | null;
  tokenId?: string | null;
  tokenType?: TokenType;
  tokenName?: string | null;
  uri?: string | null;
  symbol?: string | null;
  nftTokenDetail?: NftTokenDetail;
  inFavorites?: string[] | null;
  marketItems?: MarketItem[] | null;
}

export interface NftTokenDetail {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string;

  /** @format uuid */
  nftTokenId?: string | null;
  nftToken?: NftToken;

  /** @format int32 */
  chainId?: number | null;
  authorAddress?: string | null;
  author?: User;
  name?: string | null;
  description?: string | null;
  fileUri?: string | null;
  imageUri?: string | null;
  fileName?: string | null;
  fileHash?: string | null;
  state?: NftTokenDetailStateEnum;
  transactionHash?: string | null;
  nftTokenDetailOwners?: NftTokenDetailOwner[] | null;
}

export interface NftTokenDetailOwner {
  /** @format uuid */
  nftTokenDetailId?: string;
  ownerAddress?: string | null;
  owner?: User;
  quantity?: string;

  /** @format uuid */
  itemCollectionId?: string | null;

  /** @format uuid */
  categoryId?: string | null;
  nftTokenDetail?: NftTokenDetail;
  category?: Category;
  itemCollection?: ItemCollection;
}

export enum NftTokenDetailStateEnum {
  Draft = 'Draft',
  Active = 'Active',
  Pending = 'Pending',
  ReadyToSync = 'ReadyToSync',
}

export interface NftTokenPagedResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  count?: number;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  total?: number;
  data?: NftToken[] | null;

  /** @format int32 */
  statusCode?: number;
}

export interface NftTokenResult {
  data?: NftToken;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export interface NonceResponseModel {
  nonce?: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface RemoveCollectionFavoriteCommand {
  /** @format uuid */
  nftCollectionId?: string;
}

export interface RemoveTokenFavoriteCommand {
  /** @format uuid */
  nftTokenId?: string;
}

export interface Result {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export interface SearchResult {
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
  marketItems?: MarketItem[] | null;
  users?: User[] | null;
  itemCollections?: ItemCollection[] | null;

  /** @format int32 */
  marketItemsTotalCount?: number;

  /** @format int32 */
  usersTotalCount?: number;

  /** @format int32 */
  itemCollectionsTotalCount?: number;
}

export interface StarMarketItemModel {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  nftTokenId?: string;
  itemId?: string;
  nftContract?: string | null;
  tokenId?: string;
  seller?: string | null;
  owner?: string | null;
  price?: string;
  quantity?: string;
  tokenType?: TokenType;
  status?: MarketItemStatus;

  /** @format int32 */
  chainId?: number;
  contractAddress?: string | null;
  name?: string | null;
  symbol?: string | null;

  /** @format uuid */
  categoryId?: string;

  /** @format uuid */
  itemCollectionId?: string | null;
  authorAddress?: string | null;
  description?: string | null;
  fileUri?: string | null;
  fileName?: string | null;
  fileHash?: string | null;
  state?: NftTokenDetailStateEnum;
  inFavorites?: string[] | null;
}

export interface StarMarketItemModelServiceResponse {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: StarMarketItemModel;
}

export interface StarMarketItemModelServiceResponseEnumerable {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: StarMarketItemModel[] | null;

  /** @format int32 */
  totalCount?: number;

  /** @format int32 */
  count?: number;
}

export interface StarNftTokenModel {
  /** @format uuid */
  id?: string;

  /** @format int32 */
  chainId?: number;
  contractAddress?: string | null;
  tokenId?: string;
  tokenType?: TokenType;
  name?: string | null;
  symbol?: string | null;
  ownerAddress?: string | null;

  /** @format uuid */
  nftTokenDetailId?: string;

  /** @format uuid */
  categoryId?: string;

  /** @format uuid */
  itemCollectionId?: string | null;
  authorAddress?: string | null;
  description?: string | null;
  fileUri?: string | null;
  fileName?: string | null;
  fileHash?: string | null;
  state?: NftTokenDetailStateEnum;
  inFavorites?: string[] | null;
}

export interface StarNftTokenModelServiceResponse {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: StarNftTokenModel;
}

export interface StarNftTokenModelServiceResponseEnumerable {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: StarNftTokenModel[] | null;

  /** @format int32 */
  totalCount?: number;

  /** @format int32 */
  count?: number;
}

export interface StartupDataModel {
  languages?: LanguageModel[] | null;
  categories?: CategoryModel[] | null;
}

export interface StartupDataModelServiceResponseEnumerable {
  timeStamp?: string | null;

  /** @format double */
  elapsed?: number;

  /** @format int32 */
  errorCode?: number;
  errorMessage?: string | null;
  data?: StartupDataModel[] | null;

  /** @format int32 */
  totalCount?: number;

  /** @format int32 */
  count?: number;
}

export enum TokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface Transaction {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  nftTokenId?: string | null;
  nftToken?: NftToken;

  /** @format date-time */
  created?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  description?: string | null;
  errorType?: TransactionErrorType;
  fromAddress?: string | null;
  toAddress?: string | null;
  amount?: string;
  fee?: string;
  gasPrice?: string;

  /** @format int32 */
  blockNumber?: number | null;
  hash?: string | null;

  /** @format int32 */
  chainId?: number;
  events?: UserEvent[] | null;
}

export enum TransactionErrorType {
  Success = 'Success',
  Error = 'Error',
}

export interface TransactionResult {
  data?: Transaction;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export interface TransactionResultList {
  data?: Transaction[] | null;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export enum TransactionStatus {
  Undefined = 'Undefined',
  Pending = 'Pending',
  Done = 'Done',
  Error = 'Error',
}

export interface TransactionTotalEnumerable {
  /** @format int32 */
  totalCount?: number;
  results?: Transaction[] | null;
}

export enum TransactionType {
  Undefined = 'Undefined',
  Rebate = 'Rebate',
  Transfer = 'Transfer',
  MarketItemCreated = 'MarketItemCreated',
  MarketItemClosed = 'MarketItemClosed',
  PriceChanged = 'PriceChanged',
  Mint = 'Mint',
  MarketItemSold = 'MarketItemSold',
}

export interface User {
  isDeleted?: boolean | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;

  /** @format uuid */
  id?: string | null;
  name?: string | null;
  email?: string | null;
  emailConfirmed?: boolean | null;
  blocked?: boolean | null;
  walletAddress?: string | null;
  profile?: UserProfile;
}

export interface UserEvent {
  /** @format int32 */
  id?: number | null;
  transactionHash?: string | null;
  contractAddress?: string | null;

  /** @format uuid */
  transactionId?: string | null;
  transaction?: Transaction;
  type?: EventType;
  tokenId?: string | null;
  itemId?: string | null;

  /** @format uuid */
  nftTokenId?: string | null;
  nftToken?: NftToken;
  address?: string | null;

  /** @format uuid */
  userId?: string | null;
  user?: UserInfo;
  fromAddress?: string | null;

  /** @format uuid */
  userFromId?: string | null;
  userFrom?: UserInfo;
  toAddress?: string | null;

  /** @format uuid */
  userToId?: string | null;
  userTo?: UserInfo;
  price?: string | null;
  description?: string | null;

  /** @format date-time */
  created?: string;
  blockHash?: string | null;

  /** @format int32 */
  blockNumber?: number | null;

  /** @format int32 */
  quantity?: number | null;

  /** @format int32 */
  chainId?: number;
}

export interface UserEventTotalEnumerable {
  /** @format int32 */
  totalCount?: number;
  results?: UserEvent[] | null;
}

export interface UserEventTotalEnumerableResult {
  data?: UserEventTotalEnumerable;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export interface UserInfo {
  /** @format uuid */
  id?: string | null;
  wallet?: string | null;
}

export interface UserProfile {
  /** @format uuid */
  id?: string | null;
  nickname?: string | null;
  website?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  telegramChannel?: string | null;
  discordServer?: string | null;
  aboutMe?: string | null;
  avatarUrl?: string | null;
  backgroundUrl?: string | null;

  /** @format date-time */
  created?: string | null;

  /** @format date-time */
  modified?: string | null;
  isDeleted?: boolean | null;
}

export interface UserProfileResult {
  data?: UserProfile;
  success?: boolean;
  message?: string | null;

  /** @format int32 */
  statusCode?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key]);
    return keys
      .map(key => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? {'Content-Type': type} : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Vrm.NFT.Stars.FrontApi
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthNonceList
     * @summary Get Nonce
     * @request GET:/api/v1/auth/nonce
     * @secure
     */
    v1AuthNonceList: (query?: {WalletAddress?: string}, params: RequestParams = {}) =>
      this.request<NonceResponseModel, any>({
        path: `/api/v1/auth/nonce`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use this to get authorization token. To be able to use the API.
     *
     * @tags Auth
     * @name V1AuthLoginCreate
     * @summary Login method.
     * @request POST:/api/v1/auth/login
     * @secure
     */
    v1AuthLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
      this.request<LoginResponseModel, ProblemDetails>({
        path: `/api/v1/auth/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use this to refresh token.
     *
     * @tags Auth
     * @name V1AuthRefreshCreate
     * @summary RefreshToken method.
     * @request POST:/api/v1/auth/refresh
     * @secure
     */
    v1AuthRefreshCreate: (params: RequestParams = {}) =>
      this.request<LoginResponseModel, ProblemDetails>({
        path: `/api/v1/auth/refresh`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name V1AuthTokenList
     * @summary GetToken. For internal use
     * @request GET:/api/v1/auth/token
     * @secure
     */
    v1AuthTokenList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/token`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name V1AuthorList
     * @summary Returns category list
     * @request GET:/api/v1/author
     * @secure
     */
    v1AuthorList: (
      query?: {
        Name?: string;
        CategoryId?: string;
        CategoryName?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AuthorPagedResult, any>({
        path: `/api/v1/author`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Category
     * @name V1CategoryListList
     * @summary Returns category list
     * @request GET:/api/v1/category/list
     * @secure
     */
    v1CategoryListList: (
      query?: {
        CreatedStart?: string;
        CreatedEnd?: string;
        ModifiedStart?: string;
        ModifiedEnd?: string;
        Ids?: string[];
        LanguageId?: string;
        Name?: string;
        IncludeStatistics?: boolean;
        ShowDeleted?: boolean;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<CategoryPagedResult, any>({
        path: `/api/v1/category/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CollectionsFavorites
     * @name V1FavoritesCollectionsCreate
     * @request POST:/api/v1/favorites/collections/{wallet}
     * @secure
     */
    v1FavoritesCollectionsCreate: (wallet: string, data: AddCollectionFavoriteCommand, params: RequestParams = {}) =>
      this.request<Result, any>({
        path: `/api/v1/favorites/collections/${wallet}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CollectionsFavorites
     * @name V1FavoritesCollectionsDetail
     * @request GET:/api/v1/favorites/collections/{wallet}
     * @secure
     */
    v1FavoritesCollectionsDetail: (
      wallet: string,
      query?: {
        WalletAddress?: string;
        UserId?: string;
        CreatedDateStart?: string;
        CreatedDateEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<FavoriteCollectionPagedResult, any>({
        path: `/api/v1/favorites/collections/${wallet}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CollectionsFavorites
     * @name V1FavoritesCollectionsDelete
     * @request DELETE:/api/v1/favorites/collections/{wallet}
     * @secure
     */
    v1FavoritesCollectionsDelete: (wallet: string, data: RemoveCollectionFavoriteCommand, params: RequestParams = {}) =>
      this.request<Result, any>({
        path: `/api/v1/favorites/collections/${wallet}`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Common
     * @name V1CommonStartupDetail
     * @summary Returns startup data
     * @request GET:/api/v1/common/startup/{languageId}
     * @secure
     */
    v1CommonStartupDetail: (languageId: string, params: RequestParams = {}) =>
      this.request<StartupDataModelServiceResponseEnumerable, any>({
        path: `/api/v1/common/startup/${languageId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Just for internal use.
     *
     * @tags HealthCheck
     * @name V1HealthCheckList
     * @summary This indicates that db is available.
     * @request GET:/api/v1/healthCheck
     * @secure
     */
    v1HealthCheckList: (params: RequestParams = {}) =>
      this.request<HealthCheckResponseModel, any>({
        path: `/api/v1/healthCheck`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags History
     * @name V1HistoryDetail
     * @summary Returns transactions list.
     * @request GET:/api/v1/History/{walletAddress}
     * @secure
     */
    v1HistoryDetail: (walletAddress: string, params: RequestParams = {}) =>
      this.request<TransactionResultList, any>({
        path: `/api/v1/History/${walletAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags HttpClient
     * @name V1GeturlList
     * @summary Get Url
     * @request GET:/api/v1/geturl
     * @secure
     */
    v1GeturlList: (query?: {url?: string}, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/v1/geturl`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItemCollection
     * @name V1ItemCollectionListList
     * @request GET:/api/v1/itemCollection/list
     * @secure
     */
    v1ItemCollectionListList: (
      query?: {
        Ids?: string[];
        Name?: string;
        Description?: string;
        CreatorAddress?: string;
        CreatorId?: string;
        CategoryId?: string;
        IncludeWithEmptyTokenDetails?: boolean;
        ShowEmptyCollections?: boolean;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ItemCollectionPagedResult, any>({
        path: `/api/v1/itemCollection/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItemCollection
     * @name V1ItemCollectionDetail
     * @summary Returns ItemCollection by id.
     * @request GET:/api/v1/itemCollection/{id}
     * @secure
     */
    v1ItemCollectionDetail: (id: string, params: RequestParams = {}) =>
      this.request<ItemCollectionResult, any>({
        path: `/api/v1/itemCollection/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItemCollection
     * @name V1ItemCollectionCreate
     * @summary Creates ItemCollection.
     * @request POST:/api/v1/itemCollection
     * @secure
     */
    v1ItemCollectionCreate: (data: {Name?: string; Description?: string; Image?: File}, params: RequestParams = {}) =>
      this.request<ItemCollectionModelServiceResponse, any>({
        path: `/api/v1/itemCollection`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItemCollection
     * @name V1ItemCollectionUpdate
     * @summary Updates ItemCollection.
     * @request PUT:/api/v1/itemCollection
     * @secure
     */
    v1ItemCollectionUpdate: (
      data: {Id?: string; Name?: string; Description?: string; Image?: File},
      params: RequestParams = {}
    ) =>
      this.request<ItemCollectionModelServiceResponse, any>({
        path: `/api/v1/itemCollection`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ItemCollection
     * @name V1ItemCollectionDelete
     * @summary Deletes ItemCollection.
     * @request DELETE:/api/v1/itemCollection
     * @secure
     */
    v1ItemCollectionDelete: (query?: {id?: string}, params: RequestParams = {}) =>
      this.request<ItemCollectionModelServiceResponse, any>({
        path: `/api/v1/itemCollection`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags MarketItems
     * @name V1MarketItemsListList
     * @request GET:/api/v1/MarketItems/list
     * @secure
     */
    v1MarketItemsListList: (
      query?: {
        Ids?: string[];
        NftTokenIds?: string[];
        ItemId?: string;
        NftContract?: string;
        TokenId?: string;
        Seller?: string;
        Owner?: string;
        PriceStart?: string;
        PriceEnd?: string;
        TokenType?: TokenType;
        Status?: MarketItemStatus;
        ChainId?: number;
        ContractAddress?: string;
        Name?: string;
        Symbol?: string;
        CategoryId?: string;
        ItemCollectionId?: string;
        AuthorAddress?: string;
        Description?: string;
        FileUri?: string;
        InFavorites?: string;
        GetEmptyItemCollectionIdOnly?: boolean;
        CreatedStart?: string;
        CreatedEnd?: string;
        ModifiedStart?: string;
        ModifiedEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketItemPagedResult, any>({
        path: `/api/v1/MarketItems/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags MarketItems
     * @name V1MarketItemsDetail
     * @request GET:/api/v1/MarketItems/{id}
     * @secure
     */
    v1MarketItemsDetail: (id: string, params: RequestParams = {}) =>
      this.request<MarketItemResult, any>({
        path: `/api/v1/MarketItems/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags MarketItems
     * @name V1MarketItemsItemDetail
     * @request GET:/api/v1/MarketItems/item/{id}
     * @secure
     */
    v1MarketItemsItemDetail: (id: number, params: RequestParams = {}) =>
      this.request<MarketItemResult, any>({
        path: `/api/v1/MarketItems/item/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenCreate
     * @summary CreateNftToken
     * @request POST:/api/v1/NftToken
     * @secure
     */
    v1NftTokenCreate: (
      data: {
        CategoryId?: string;
        ItemCollectionId?: string;
        Name?: string;
        Description?: string;
        NftSource?: File;
        Royalty?: string;
        Quantity?: number;
        ChainId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/v1/NftToken`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenCollectionIdCreate
     * @summary UpdateNftTokenCollectionId
     * @request POST:/api/v1/NftToken/collectionId
     * @secure
     */
    v1NftTokenCollectionIdCreate: (
      data: {NftTokenId?: string; ItemCollectionId?: string},
      params: RequestParams = {}
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/v1/NftToken/collectionId`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenCategoryIdCreate
     * @summary UpdateNftCategoryId
     * @request POST:/api/v1/NftToken/categoryId
     * @secure
     */
    v1NftTokenCategoryIdCreate: (data: {NftTokenId?: string; CategoryId?: string}, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/v1/NftToken/categoryId`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenStatePendingCreate
     * @summary UpdateNftTokenState
     * @request POST:/api/v1/NftToken/state/pending
     * @secure
     */
    v1NftTokenStatePendingCreate: (data: {NftTokenId?: string; TransactionHash?: string}, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/v1/NftToken/state/pending`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenListList
     * @request GET:/api/v1/NftToken/list
     * @secure
     */
    v1NftTokenListList: (
      query?: {
        Ids?: string[];
        ChainId?: number;
        ContractAddress?: string;
        TokenId?: number;
        Name?: string;
        Symbol?: string;
        OwnerAddress?: string;
        State?: NftTokenDetailStateEnum;
        NftTokenDetailId?: string;
        CategoryId?: string;
        ItemCollectionId?: string;
        AuthorAddress?: string;
        Description?: string;
        FileUri?: string;
        FileName?: string;
        FileHash?: string;
        InFavorites?: string;
        IsDeleted?: boolean;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<NftTokenPagedResult, any>({
        path: `/api/v1/NftToken/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags NftToken
     * @name V1NftTokenDetail
     * @request GET:/api/v1/NftToken/{id}
     * @secure
     */
    v1NftTokenDetail: (id: string, params: RequestParams = {}) =>
      this.request<NftTokenResult, any>({
        path: `/api/v1/NftToken/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileDetail
     * @request GET:/api/v1/Profile/{wallet}
     * @secure
     */
    v1ProfileDetail: (wallet: string, query?: {showDeleted?: boolean}, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileUpdate
     * @summary Edit user profile
     * @request PUT:/api/v1/Profile/{wallet}
     * @secure
     */
    v1ProfileUpdate: (wallet: string, data: EditUserProfileCommand, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileCreate
     * @summary Create or enable user profile
     * @request POST:/api/v1/Profile/{wallet}
     * @secure
     */
    v1ProfileCreate: (wallet: string, data: CreateUserProfileCommand, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileDelete
     * @summary Disable and clean user profile
     * @request DELETE:/api/v1/Profile/{wallet}
     * @secure
     */
    v1ProfileDelete: (wallet: string, params: RequestParams = {}) =>
      this.request<Result, any>({
        path: `/api/v1/Profile/${wallet}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileAvatarFileCreate
     * @request POST:/api/v1/Profile/{wallet}/avatar/file
     * @secure
     */
    v1ProfileAvatarFileCreate: (
      wallet: string,
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/avatar/file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileAvatarUrlCreate
     * @request POST:/api/v1/Profile/{wallet}/avatar/url
     * @secure
     */
    v1ProfileAvatarUrlCreate: (wallet: string, data: AddAvatarByUrlCommand, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/avatar/url`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileAvatarDelete
     * @request DELETE:/api/v1/Profile/{wallet}/avatar
     * @secure
     */
    v1ProfileAvatarDelete: (wallet: string, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/avatar`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileBackgroundFileCreate
     * @request POST:/api/v1/Profile/{wallet}/background/file
     * @secure
     */
    v1ProfileBackgroundFileCreate: (
      wallet: string,
      data: {
        ContentType?: string;
        ContentDisposition?: string;
        Headers?: Record<string, string[]>;
        Length?: number;
        Name?: string;
        FileName?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/background/file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileBackgroundUrlCreate
     * @request POST:/api/v1/Profile/{wallet}/background/url
     * @secure
     */
    v1ProfileBackgroundUrlCreate: (wallet: string, data: AddBackgroundByUrlCommand, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/background/url`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name V1ProfileBackgroundDelete
     * @request DELETE:/api/v1/Profile/{wallet}/background
     * @secure
     */
    v1ProfileBackgroundDelete: (wallet: string, params: RequestParams = {}) =>
      this.request<UserProfileResult, any>({
        path: `/api/v1/Profile/${wallet}/background`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name V1SearchList
     * @summary Searches passed string
     * @request GET:/api/v1/search
     * @secure
     */
    v1SearchList: (
      query?: {SearchString?: string; Take?: number; Skip?: number; SortBy?: string},
      params: RequestParams = {}
    ) =>
      this.request<SearchResult, any>({
        path: `/api/v1/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags StarMarketItem
     * @name V1StarMarketItemListList
     * @summary Returns StarMarketItem list.
     * @request GET:/api/v1/starMarketItem/list
     * @deprecated
     * @secure
     */
    v1StarMarketItemListList: (
      query?: {
        NftTokenId?: string;
        ItemId?: string;
        NftContract?: string;
        TokenId?: string;
        Seller?: string;
        Owner?: string;
        PriceStart?: string;
        PriceEnd?: string;
        TokenType?: TokenType;
        Status?: MarketItemStatus;
        ChainId?: number;
        ContractAddress?: string;
        Name?: string;
        Symbol?: string;
        CategoryId?: string;
        ItemCollectionId?: string;
        AuthorAddress?: string;
        Description?: string;
        FileUri?: string;
        InFavorites?: string;
        GetEmptyItemCollectionIdOnly?: boolean;
        CreatedStart?: string;
        CreatedEnd?: string;
        ModifiedStart?: string;
        ModifiedEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<StarMarketItemModelServiceResponseEnumerable, any>({
        path: `/api/v1/starMarketItem/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags StarMarketItem
     * @name V1StarMarketItemDetail
     * @summary Returns StarMarketItem by Id.
     * @request GET:/api/v1/starMarketItem/{id}
     * @deprecated
     * @secure
     */
    v1StarMarketItemDetail: (id: string, params: RequestParams = {}) =>
      this.request<StarMarketItemModelServiceResponse, any>({
        path: `/api/v1/starMarketItem/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags StarNftToken
     * @name V1StarNftTokenListList
     * @summary Returns StarNftTokens list.
     * @request GET:/api/v1/starNftToken/list
     * @deprecated
     * @secure
     */
    v1StarNftTokenListList: (
      query?: {
        ChainId?: number;
        ContractAddress?: string;
        TokenId?: string;
        Name?: string;
        Symbol?: string;
        OwnerAddress?: string;
        NftTokenDetailId?: string;
        CategoryId?: string;
        ItemCollectionId?: string;
        AuthorAddress?: string;
        Description?: string;
        FileUri?: string;
        FileName?: string;
        FileHash?: string;
        InFavorites?: string;
        CreatedStart?: string;
        CreatedEnd?: string;
        ModifiedStart?: string;
        ModifiedEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<StarNftTokenModelServiceResponseEnumerable, any>({
        path: `/api/v1/starNftToken/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags StarNftToken
     * @name V1StarNftTokenDetail
     * @summary Returns StarMarketItem by Id.
     * @request GET:/api/v1/starNftToken/{id}
     * @deprecated
     * @secure
     */
    v1StarNftTokenDetail: (id: string, params: RequestParams = {}) =>
      this.request<StarNftTokenModelServiceResponse, any>({
        path: `/api/v1/starNftToken/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags StarNftToken
     * @name V1StarNftTokenDraftList
     * @summary Returns StarNftTokens list.
     * @request GET:/api/v1/starNftToken/draft
     * @deprecated
     * @secure
     */
    v1StarNftTokenDraftList: (
      query?: {
        ChainId?: number;
        ContractAddress?: string;
        TokenId?: string;
        Name?: string;
        Symbol?: string;
        OwnerAddress?: string;
        NftTokenDetailId?: string;
        CategoryId?: string;
        ItemCollectionId?: string;
        AuthorAddress?: string;
        Description?: string;
        FileUri?: string;
        FileName?: string;
        FileHash?: string;
        InFavorites?: string;
        CreatedStart?: string;
        CreatedEnd?: string;
        ModifiedStart?: string;
        ModifiedEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<StarNftTokenModelServiceResponseEnumerable, any>({
        path: `/api/v1/starNftToken/draft`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TokensFavorites
     * @name V1FavoritesTokensCreate
     * @request POST:/api/v1/favorites/tokens/{wallet}
     * @secure
     */
    v1FavoritesTokensCreate: (wallet: string, data: AddTokenFavoriteCommand, params: RequestParams = {}) =>
      this.request<Result, any>({
        path: `/api/v1/favorites/tokens/${wallet}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TokensFavorites
     * @name V1FavoritesTokensDetail
     * @request GET:/api/v1/favorites/tokens/{wallet}
     * @secure
     */
    v1FavoritesTokensDetail: (
      wallet: string,
      query?: {
        WalletAddress?: string;
        UserId?: string;
        CreatedDateStart?: string;
        CreatedDateEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<NftTokenPagedResult, any>({
        path: `/api/v1/favorites/tokens/${wallet}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TokensFavorites
     * @name V1FavoritesTokensDelete
     * @request DELETE:/api/v1/favorites/tokens/{wallet}
     * @secure
     */
    v1FavoritesTokensDelete: (wallet: string, data: RemoveTokenFavoriteCommand, params: RequestParams = {}) =>
      this.request<Result, any>({
        path: `/api/v1/favorites/tokens/${wallet}`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name V1TransactionsListList
     * @summary Returns transactions list.
     * @request GET:/api/v1/Transactions/list
     * @secure
     */
    v1TransactionsListList: (
      query?: {
        UserId?: string;
        Address?: string;
        NftTokenId?: string;
        Type?: TransactionType;
        Status?: TransactionStatus;
        ErrorType?: TransactionErrorType;
        FromAddress?: string;
        ToAddress?: string;
        CreatedDateStart?: string;
        CreatedDateEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransactionTotalEnumerable, any>({
        path: `/api/v1/Transactions/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name V1TransactionsDetail
     * @summary Get transaction.
     * @request GET:/api/v1/Transactions/{id}
     * @secure
     */
    v1TransactionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<TransactionResult, any>({
        path: `/api/v1/Transactions/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name V1TransactionsCreate
     * @summary Create transaction.
     * @request POST:/api/v1/Transactions
     * @secure
     */
    v1TransactionsCreate: (data: CreateTransactionCommand, params: RequestParams = {}) =>
      this.request<TransactionResult, any>({
        path: `/api/v1/Transactions`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserEvents
     * @name V1EventsListList
     * @summary Returns events list.
     * @request GET:/api/v1/events/list
     * @secure
     */
    v1EventsListList: (
      query?: {
        Type?: EventType;
        UserId?: string;
        UserWalletAddress?: string;
        ContractAddress?: string;
        CreatedDateStart?: string;
        CreatedDateEnd?: string;
        Take?: number;
        Skip?: number;
        SortBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserEventTotalEnumerableResult, any>({
        path: `/api/v1/events/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
