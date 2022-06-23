import {PageItems} from 'components/pages/items';
import {PageCategories} from 'components/pages/categories';
import {PageAuthors} from 'components/pages/authors';
import {PageChooseBlockchain, PageChooseTokenType, PageChooseOptions} from 'components/pages/create-item';
import {PageHome} from 'components/pages/home';
import {PageItem} from 'components/pages/item';
import {PageCollections} from 'components/pages/collections';
import {PageMyCollections} from 'components/pages/my-collections';
import {PageMyHistory} from 'components/pages/my-history/page-my-history';
import {PageSearchResults} from 'components/pages/search-results';
import {PageMyFavorites} from 'components/pages/my-favorites';
import {PageMyItems} from 'components/pages/my-items';
import {PageMyProfile} from 'components/pages/my-profile';
import {PageFaq} from 'components/pages/faq';
import {PageContact} from 'components/pages/contact';
import {PageFallback} from 'components/pages/fallback';

export const Route = {
  home: {
    path: '/',
    element: <PageHome />,
  },
  categories: {
    path: '/categories',
    element: <PageCategories />,
  },
  authors: {
    path: '/categories/:categoryId/authors',
    element: <PageAuthors />,
  },
  сollections: {
    path: '/categories/:categoryId/authors/:creatorAddress/collections',
    element: <PageCollections />,
  },
  items: {
    path: '/categories/:categoryId/authors/:creatorAddress/collections/:itemCollectionId/items',
    element: <PageItems />,
  },
  chooseBlockchain: {
    path: '/create-item',
    element: <PageChooseBlockchain />,
  },
  chooseTokenType: {
    path: '/create-item/:chainId',
    element: <PageChooseTokenType />,
  },
  chooseOptions: {
    path: '/create-item/:chainId/:tokenType/choose-options',
    element: <PageChooseOptions />,
  },
  itemEntity: {
    path: '/items/:mode/:id/:seller',
    element: <PageItem />,
  },
  myCollections: {
    path: '/my-collections',
    element: <PageMyCollections />,
    privateEntity: true,
  },
  myHistory: {
    path: '/my-history',
    element: <PageMyHistory />,
    privateEntity: true,
  },
  searchResults: {
    path: '/search-results',
    element: <PageSearchResults />,
  },
  myFavorites: {
    path: '/my-favorites',
    element: <PageMyFavorites />,
    privateEntity: true,
  },
  myItems: {
    path: '/my-collections/:itemCollectionId/items',
    element: <PageMyItems />,
    privateEntity: true,
  },
  myProfile: {
    path: '/my-profile',
    element: <PageMyProfile />,
    privateEntity: true,
  },
  faq: {
    path: '/faq',
    element: <PageFaq />,
  },
  searchedCollections: {
    path: '/search-result/authors/:creatorAddress/collections',
    element: <PageCollections />,
  },
  searchedCollection: {
    path: '/search-result/collections/:itemCollectionId/items',
    element: <PageItems />,
  },
  searchedMarketItem: {
    path: '/search-result/items/:mode/:id/:seller',
    element: <PageItem />,
  },
  contact: {
    path: '/contact',
    element: <PageContact />,
  },

  // this entity must be at the end of the object!
  notFound: {
    path: '/not-found',
    element: <PageFallback errorCode="404" />,
  },
};

export const routes = Object.values(Route).map(({path, element, ...other}) => ({
  path,
  element,
  privateEntity: (other as {privateEntity: boolean}).privateEntity,
}));
