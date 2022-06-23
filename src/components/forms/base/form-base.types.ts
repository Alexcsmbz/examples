import {ReactNode} from 'react';
import {UseFormReturn, SubmitHandler, UseFormProps} from 'react-hook-form';

export type FormBaseProps<FormValues> = {
  onSubmit: SubmitHandler<FormValues>;
  children: (methods: UseFormReturn<FormValues>) => ReactNode;
} & UseFormProps<FormValues>;
