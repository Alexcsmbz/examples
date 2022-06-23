import {ChangeEvent, ReactNode} from 'react';
import {DeepMap, FieldError, Path, RegisterOptions, UseFormRegister} from 'react-hook-form';

type BaseTextareaProps = {
  defaultValue?: string;
  rows?: number;
  columns?: number;
  name?: string;
  id?: string;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  info?: string;
  maxLength?: number;
  counter?: ReactNode;
  onChange?: (e?: ChangeEvent<HTMLTextAreaElement>) => void;
};

export type PTextareaProps<FormValues> = {
  name: Path<FormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<FormValues>;
  errors?: Partial<DeepMap<FormValues, FieldError>>;
} & Omit<BaseTextareaProps, 'name'>;
