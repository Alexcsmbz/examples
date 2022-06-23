import {PBox} from 'components/primitives/p-box';
import {PLoader} from 'components/primitives/p-loader';
import {useDispatch, useSelector} from 'react-redux';
import {appLoadingSelector, appTransactionsSelector} from 'store/app/selectors';
import {useEffect, useState} from 'react';
import {getHistoryAction} from 'store/app/actions';
import {userAccountSelector} from 'store/user/selectors';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';
import {useForm} from 'react-hook-form';
import {SelectOption} from 'types/custom';
import {Transaction, TransactionType} from 'types/api';

export type FormFilterFields = {
  events: SelectOption | null;
  status: SelectOption | null;
};

export const PageMyHistory = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const transactions = useSelector(appTransactionsSelector);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const loading = useSelector(appLoadingSelector);
  const dispatch = useDispatch();
  const {address} = useSelector(userAccountSelector);
  const {control, getValues} = useForm<FormFilterFields>({
    defaultValues: {
      events: null,
      status: null,
    },
  });

  useEffect(() => {
    if (address) dispatch(getHistoryAction({walletAddress: address!}));
  }, [address]);

  const handleStatusFilter = (tx: any) => tx.status === getValues('status')?.value!;

  const handleEventsFilter = (tx: any) =>
    getValues('events')?.label === 'Buy'
      ? tx.type === TransactionType.MarketItemClosed && Number(tx.amount) > 0
      : getValues('events')?.label === 'Remove from sale'
      ? tx.type === TransactionType.MarketItemClosed && Number(tx.amount) <= 0
      : tx.type === getValues('events')?.value!;

  const handleFilter = () => {
    setFilteredTransactions(
      transactions.filter((tx: Transaction) =>
        getValues('events') && !getValues('status')?.value
          ? handleEventsFilter(tx)
          : getValues('status') && !getValues('events')?.value
          ? handleStatusFilter(tx)
          : handleEventsFilter(tx) && handleStatusFilter(tx)
      )
    );
  };

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM
          transactions={getValues('events')?.value || getValues('status')?.value ? filteredTransactions : transactions}
          formControl={control}
          filterOpen={filterOpen}
          onFilterOpen={() => setFilterOpen(true)}
          onFilterClose={() => setFilterOpen(false)}
          onFilter={handleFilter}
        />
      ) : tablet ? (
        <SectionMainT
          transactions={getValues('events')?.value || getValues('status')?.value ? filteredTransactions : transactions}
          formControl={control}
          onFilter={handleFilter}
        />
      ) : desktop ? (
        <SectionMainD
          transactions={getValues('events')?.value || getValues('status')?.value ? filteredTransactions : transactions}
          formControl={control}
          onFilter={handleFilter}
        />
      ) : null}
    </main>
  );
};
