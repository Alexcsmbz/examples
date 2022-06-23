import {Transaction} from 'types/api';

export type PageMyHistoryProps = {
  transactions?: Transaction[];
  formControl?: any;
  onFilter?: () => void;
};

export type PageMyHistoryMProps = {
  filterOpen?: boolean;
  onFilterOpen?: () => void;
  onFilterClose?: () => void;
} & PageMyHistoryProps;
