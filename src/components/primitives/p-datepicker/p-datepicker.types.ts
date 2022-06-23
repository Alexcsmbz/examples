import {Dispatch, SetStateAction, ReactNode} from 'react';

export type SingleDate = Date | null;

export type PDatepickerDefaultProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  tooltip?: ReactNode;
};

export type PDatepickerProps = {
  startDate?: Date | null;
  handleDatePicker?: Dispatch<SetStateAction<SingleDate>>;
} & PDatepickerDefaultProps;

export type PRangepickerProps = {
  startDate?: Date | null;
  endDate?: Date | null;
  handleRangePicker?: Dispatch<SetStateAction<SingleDate[]>>;
} & PDatepickerDefaultProps;
