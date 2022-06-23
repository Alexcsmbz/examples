import {NavigateFunction} from 'react-router-dom';
import {MarketItem} from 'types/api';
import {SortAction} from 'types/custom';

export type SectionMainProps = {
  take?: number;
  onShowMoreClick?: () => void;
  favoritesMarketItems?: MarketItem[];
  address?: string;
  navigate?: NavigateFunction;
  provider?: any;
  dispatch?: any;
  show?: any;
  showedItemEntities?: number;
  totalNftTokens?: number;
  onSorting?: () => void;
  sortActions?: SortAction[];
  filterOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
};
