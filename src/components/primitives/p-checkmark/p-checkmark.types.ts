import {Path, UseFormRegister} from 'react-hook-form';

type BaseCheckmarkProps = {
  type?: 'checkbox' | 'radio';
  disabled?: boolean;
  name?: string;
  label?: string;
  id?: string;
  required?: boolean;
  className?: string;
  value?: string;
};

export type PCheckmarkProps<FormValues = any> = {
  name?: Path<FormValues>;
  register?: UseFormRegister<FormValues>;
} & Omit<BaseCheckmarkProps, 'name'>;
