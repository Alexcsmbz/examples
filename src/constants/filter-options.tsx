import {TransactionStatus, TransactionType} from 'types/api';
import {SelectOption} from 'types/custom';

export const eventOptions: SelectOption[] = [
  {
    label: 'All events',
    value: null,
  },
  {
    label: 'Mint',
    value: TransactionType.Mint,
  },
  {
    label: 'Buy',
    value: TransactionType.MarketItemClosed,
  },
  {
    label: 'Transfer',
    value: TransactionType.Transfer,
  },
  {
    label: 'Put on sale',
    value: TransactionType.MarketItemCreated,
  },
  {
    label: 'Remove from sale',
    value: TransactionType.MarketItemClosed,
  },
  {
    label: 'Price changed',
    value: TransactionType.PriceChanged,
  },
  {
    label: 'Sell',
    value: TransactionType.MarketItemSold,
  },
];

export const statusOptions: SelectOption[] = [
  {
    label: 'All statuses',
    value: null,
  },
  {
    label: TransactionStatus.Done,
    value: TransactionStatus.Done,
  },
  {
    label: TransactionStatus.Error,
    value: TransactionStatus.Error,
  },
  {
    label: TransactionStatus.Pending,
    value: TransactionStatus.Pending,
  },
];
