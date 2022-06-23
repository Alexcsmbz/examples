import {PBox} from 'components/primitives/p-box';
import {PSelect} from 'components/primitives/p-select';
import {eventOptions, statusOptions} from 'constants/filter-options';
import {memo} from 'react';
import {FormFilterFields} from '../../page-my-history';

const MyHistoryFilter = ({
  control,
  onFilterClose,
  onFilter,
}: {
  control?: any;
  onFilterClose?: () => void;
  onFilter?: () => void;
}) => {
  return (
    <>
      <PBox position="relative" zIndex={4}>
        <PSelect<FormFilterFields>
          control={control}
          name="events"
          options={eventOptions}
          placeholder="Filter by event..."
          onChange={() => {
            onFilter && onFilter();
            onFilterClose && onFilterClose();
          }}
        />
      </PBox>
      <PBox position="relative" zIndex={3}>
        <PSelect<FormFilterFields>
          control={control}
          name="status"
          options={statusOptions}
          placeholder="Filter by status..."
          onChange={() => {
            onFilter && onFilter();
            onFilterClose && onFilterClose();
          }}
        />
      </PBox>
    </>
  );
};

export const MyHistoryFilterMemoized = memo(MyHistoryFilter);
