import {memo as ReactMemo} from 'react';
import {PTypo} from '../p-typo';
import {PTextareaProps} from './p-textarea.types';
import {textareaRoot} from './p-textarea.styles';
import {labelRequired, labelRoot, error as errorStyles} from '../p-input/p-input.styles';
import {cx} from '@emotion/css';
import {PBox} from '../p-box';

const PTextarea = <FormValues extends Record<string, unknown>>({
  required,
  label,
  errors,
  register,
  info,
  counter,
  ...props
}: PTextareaProps<FormValues>) => (
  <label className={cx(labelRoot(), !!(errors && errors[props.name]) && errorStyles)}>
    <PTypo>
      {label}
      <b>
        <span className={labelRequired}>{required && '*'}</span>
      </b>
    </PTypo>
    <PBox position="relative">
      <textarea {...(register && register(props.name, props.rules))} className={textareaRoot} {...props} />
      {counter}
    </PBox>

    {!!(errors && errors[props.name]?.message) && <PTypo variant="body2">{errors[props.name]?.message}</PTypo>}
    {info && <PTypo variant="body2">{info}</PTypo>}
  </label>
);

const memo: <T>(component: T) => T = ReactMemo;

export const PTextareaMemoized = memo(PTextarea);
