export const ApiUrl = {
  nonce: 'v1/auth/nonce',
  login: 'v1/auth/login',
  refresh: 'v1/auth/refresh',
  token: 'v1/auth/token',
  categories: 'v1/category/list',
  authors: 'v1/author',
  collectionsList: 'v1/itemCollection/list',
  collections: 'v1/itemCollection',
  nftToken: 'v1/NftToken',
  marketItems: 'v1/MarketItems/list',
  marketItemById: (id?: string) => `v1/MarketItems/${id}`,
  nftTokens: 'v1/NftToken/list',
  nftTokenById: (id?: string) => `v1/NftToken/${id}`,
  nftTokenCollection: 'v1/NftToken/collectionId',
  nftTokenCategory: 'v1/NftToken/categoryId',
  search: 'v1/search',
  profile: (wallet?: string) => `v1/Profile/${wallet}`,
  profileAvatar: (wallet?: string) => `v1/Profile/${wallet}/avatar`,
  profileAvatarFile: (wallet?: string) => `v1/Profile/${wallet}/avatar/file`,
  profileAvatarUrl: (wallet?: string) => `v1/Profile/${wallet}/avatar/url`,
  profileBackground: (wallet?: string) => `v1/Profile/${wallet}/background`,
  profileBackgroundFile: (wallet?: string) => `v1/Profile/${wallet}/background/file`,
  profileBackgroundUrl: (wallet?: string) => `v1/Profile/${wallet}/background/url`,
  nftTokenPending: 'v1/NftToken/state/pending',
  favorites: (wallet?: string) => `v1/favorites/tokens/${wallet}`,
  history: (wallet?: string) => `v1/History/${wallet}`,
};