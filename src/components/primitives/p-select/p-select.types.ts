import {Dispatch, SetStateAction} from 'react';
import {Control, DeepMap, FieldError, Path, RegisterOptions, UseFormRegister} from 'react-hook-form';
import {MultiValue} from 'react-select';
import {SelectOption} from 'types/custom';

export type State = {
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
};

export type Styles = {
  [key: string]: (styles: any, state: State) => CSSStyleDeclaration;
};

export type BaseSelectProps = {
  name: string;
  options?: any;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isSearchable?: boolean;
};

export type PSelectProps<FormValues> = {
  name: Path<FormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
  control?: Control<FormValues | any>;
  register?: UseFormRegister<FormValues>;
  onChange?: () => void;
} & Omit<BaseSelectProps, 'name'>;

export type PSelectAsyncProps<FormValues> = {
  name: Path<FormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
  control?: Control<FormValues | any>;

  loadOptions?: {
    preloadedOptions?: SelectOption[];
    service: any;
    labels: string;
    values: string;
  };
} & Omit<BaseSelectProps, 'name'>;

export type PSelectMultiProps = {
  selectedValues?: MultiValue<SelectOption>;
  setSelectedValues?: Dispatch<SetStateAction<MultiValue<SelectOption> | undefined>>;
} & BaseSelectProps;
