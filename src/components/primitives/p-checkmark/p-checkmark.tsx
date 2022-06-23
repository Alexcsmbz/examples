import {memo as ReactMemo} from 'react';
import {PCheckmarkProps} from './p-checkmark.types';
import {container, checkmark} from './p-checkmark.styles';
import {PTypo} from '../p-typo';
import {cx} from '@emotion/css';
import {Path} from 'react-hook-form';

const PCheckmark = <FormValues extends Record<string, unknown>>({
  type,
  id,
  label,
  required,
  className,
  register,
  name,
  ...props
}: PCheckmarkProps<FormValues>) => (
  <label className={cx(container({type}), className)} htmlFor={id}>
    <input {...(register && register(name as Path<FormValues>))} type={type} id={id} {...props} />
    <span className={checkmark({type})} />
    <PTypo>{label}</PTypo>
  </label>
);

const memo: <T>(component: T) => T = ReactMemo;

export const PCheckmarkMemoized = memo(PCheckmark);
