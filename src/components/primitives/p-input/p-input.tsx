import {memo as ReactMemo} from 'react';
import {PInputProps} from './p-input.types';
import {
  labelRequired,
  inputRoot,
  labelRoot,
  error as errorStyles,
  slotRight as slotRightStyles,
} from './p-input.styles';
import {PTypo} from '../p-typo';
import {cx} from '@emotion/css';
import {PBox} from '../p-box';
import NumberFormat from 'react-number-format';
import {Controller} from 'react-hook-form';

const PInput = <FormValues extends Record<string, unknown>>({
  required,
  type = 'text',
  numeric,
  label,
  tooltip,
  errors,
  info,
  slotRight,
  className,
  size,
  register,
  onChange,
  onValueChange,
  control,
  ...props
}: PInputProps<FormValues>) => (
  <label className={cx(labelRoot(type), !!(errors && errors[props.name]) && errorStyles, className || '')}>
    {label && (
      <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="center" gap="16px">
        <PTypo>
          {label}
          <span className={labelRequired}>{required && '*'}</span>
        </PTypo>
        {tooltip && tooltip}
      </PBox>
    )}

    <PBox position="relative">
      {numeric ? (
        <Controller
          control={control}
          name={props.name}
          rules={props.rules}
          render={({field}) => (
            <NumberFormat
              {...field}
              {...props}
              className={inputRoot({slotRight, size})}
              thousandSeparator={true}
              allowNegative={false}
              onValueChange={onValueChange}
            />
          )}
        />
      ) : (
        <input
          {...props}
          {...(register && register(props.name, props.rules))}
          className={inputRoot({slotRight, size})}
          type={type}
          onChange={e => {
            register && register(props.name).onChange(e);
            onChange && onChange(e);
          }}
        />
      )}
      <span className={slotRightStyles}>{slotRight}</span>
    </PBox>

    {!!(errors && errors[props.name]?.message) && <PTypo variant="body2">{errors[props.name]?.message}</PTypo>}
    {info && <PTypo variant="body2">{info}</PTypo>}
  </label>
);

const memo: <T>(component: T) => T = ReactMemo;

export const PInputMemoized = memo(PInput);
