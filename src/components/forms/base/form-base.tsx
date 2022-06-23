import {FormBaseProps} from './form-base.types';
import {useForm} from 'react-hook-form';
import {memo as ReactMemo} from 'react';

const FormBase = <FormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  defaultValues,
}: FormBaseProps<FormValues>) => {
  const methods = useForm<FormValues>({defaultValues});

  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>;
};

const memo: <T>(component: T) => T = ReactMemo;

export const FormBaseMemoized = memo(FormBase);
