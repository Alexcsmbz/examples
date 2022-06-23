import {memo as ReactMemo} from 'react';
import {PSwitcherProps} from './p-switcher.types';
import {switcher, slider} from './p-switcher.styles';
import {Controller} from 'react-hook-form';

const PSwitcher = <FormValues extends Record<string, unknown>>({
  id,
  name,
  control,
  rules,
  errors,
  ...props
}: PSwitcherProps<FormValues>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({field}) => (
      <label className={switcher} htmlFor={id}>
        <input type="checkbox" {...field} checked={field['value'] ?? false} id={id} {...props} />
        <span className={slider} />
      </label>
    )}
  />
);

const memo: <T>(component: T) => T = ReactMemo;

export const PSwitcherMemoized = memo(PSwitcher);
