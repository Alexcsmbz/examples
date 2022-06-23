import {Icon} from 'assets/icons';
import {PTypo} from 'components/primitives/p-typo';
import {Transaction, TransactionType} from 'types/api';

export const getTransactionNameWithIcon = ({type, amount}: Transaction) =>
  type === TransactionType.Mint ? (
    <>
      <Icon.MintCircle />
      <PTypo>Mint</PTypo>
    </>
  ) : type === TransactionType.Transfer ? (
    <>
      <Icon.Transfer />
      <PTypo>Transfer</PTypo>
    </>
  ) : type === TransactionType.MarketItemClosed && Number(amount) > 0 ? (
    <>
      <Icon.Buy />
      <PTypo>Buy</PTypo>
    </>
  ) : type === TransactionType.MarketItemClosed ? (
    <>
      <Icon.Remove />
      <PTypo>Remove from sale</PTypo>
    </>
  ) : type === TransactionType.PriceChanged ? (
    <>
      <Icon.Edit />
      <PTypo>Price changed</PTypo>
    </>
  ) : type === TransactionType.MarketItemCreated ? (
    <>
      <Icon.Ethereum />
      <PTypo>Put on sale</PTypo>
    </>
  ) : type === TransactionType.MarketItemSold ? (
    <>
      <Icon.Sell />
      <PTypo>Sell</PTypo>
    </>
  ) : null;
