import {PSelectMulti} from 'components/primitives/p-select';
import {PSelectMultiProps} from 'components/primitives/p-select/p-select.types';
import {memo, useState} from 'react';
import {MultiValue} from 'react-select';
import {SelectOption} from 'types/custom';

const CSelectMulti = ({...props}: PSelectMultiProps) => {
  const [selectedValues, setSelectedValues] = useState<MultiValue<SelectOption>>();

  return <PSelectMulti {...props} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />;
};

export const CSelectMultiMemoized = memo(CSelectMulti);
