import {ItemCollection, MarketItem, UserProfile} from 'types/api';
import {Banner, SortAction} from 'types/custom';

export type PageCollectionsProps = {
  authorProfile?: UserProfile;
  defaultBanner?: Banner;
  selectedAuthor?: any;
  collections?: ItemCollection[];
  creatorAddress?: string;
  marketItems?: MarketItem[];
  address?: string;
  navigate?: any;
  provider?: any;
  setProvider?: any;
  dispatch?: any;
  show?: any;
  formControl?: any;
  formIsDirty?: any;
  formRegister?: any;
  sortActions?: SortAction[];
  categoryId?: string;
  take?: number;
  showedItemEntities?: number;
  totalMarketItems?: number;
  onSorting?: () => void;
  onShowMoreClick?: () => void;
  onItemsFilter?: () => void;
  onClearItemsFilter?: () => void;
};

export type PageCollectionsMProps = {
  filterOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
} & PageCollectionsProps;
