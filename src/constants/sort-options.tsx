import {SelectOption} from 'types/custom';

export const MARKET_ITEM_SORT_LABEL = 'name';
export const NFT_TOKEN_SORT_LABEL = 'name';

export const sortOptions: SelectOption[] = [
  {
    label: 'A-Z',
    value: 'name',
  },
  {
    label: 'Z-A',
    value: '-name',
  },
  {
    label: 'High to Low Price',
    value: '-price',
  },
  {
    label: 'Low to High Price',
    value: 'price',
  },
];

export const sorByNameOptions: SelectOption[] = [
  {
    label: 'A-Z',
    value: 'name',
  },
  {
    label: 'Z-A',
    value: '-name',
  },
];
