import {ChangeEvent, FocusEvent, ReactNode} from 'react';
import {Control, DeepMap, FieldError, Path, RegisterOptions, UseFormRegister} from 'react-hook-form';
import {NumberFormatValues, SourceInfo} from 'react-number-format';

export type Type = 'text' | 'email' | 'number' | 'url' | 'radio';

type BaseInputProps = {
  disabled?: boolean;
  type?: Type;
  numeric?: boolean;
  name: string;
  id?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
  slotRight?: ReactNode;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  info?: string;
  className?: string;
  size?: string;
};

export type PInputProps<FormValues> = {
  name: Path<FormValues>;
  autoComplete?: 'off';
  rules?: RegisterOptions;
  register?: UseFormRegister<FormValues>;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
  control?: Control<FormValues | any>;
  maxLength?: number;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  onFocus?: (e?: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
  onClick?: () => void;
} & Omit<BaseInputProps, 'name'>;
