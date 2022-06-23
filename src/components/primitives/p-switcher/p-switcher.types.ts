import {Control, DeepMap, FieldError, Path, RegisterOptions} from 'react-hook-form';

type BaseSwitcherProps = {
  disabled?: boolean;
  name: string;
  id?: string;
  required?: boolean;
};

export type PSwitcherProps<FormValues> = {
  name: Path<FormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
  control?: Control<FormValues | any>;
} & Omit<BaseSwitcherProps, 'name'>;
