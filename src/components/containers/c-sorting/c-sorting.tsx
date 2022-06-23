import {PSelect} from 'components/primitives/p-select';
import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {SelectOption, SortAction} from 'types/custom';

export type FormSortingFields = {
  sorting: SelectOption | null;
};

const CSorting = ({
  options,
  actions,
  onSorting,
}: {
  options?: SelectOption[];
  actions?: SortAction[];
  onSorting?: () => void;
}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm<FormSortingFields>({
    defaultValues: {
      sorting: null,
    },
  });

  const handleSorting = handleSubmit(data => {
    onSorting && onSorting();

    actions?.map(({action, sortVariants, params}: SortAction) => {
      sortVariants
        ? Object.keys(sortVariants)?.map(v => {
            v === data.sorting?.value &&
              action &&
              dispatch(action({...params, sortBy: sortVariants[v], withoutLoading: true}));

            return v;
          })
        : action && dispatch(action({...params, sortBy: data.sorting?.value, withoutLoading: true}));

      return action;
    });
  });

  return (
    <form onSubmit={handleSorting}>
      <PSelect<FormSortingFields>
        control={control}
        name="sorting"
        options={options}
        placeholder="Sort by..."
        onChange={handleSorting}
      />
    </form>
  );
};

export const CSortingMemoized = memo(CSorting);
