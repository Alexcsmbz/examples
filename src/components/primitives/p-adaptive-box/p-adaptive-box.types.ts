import {ReactNode} from 'react';
import {StylesProps} from '../p-box/p-box.types';

export type PAdaptiveBoxProps = {
  children?: ReactNode;
  className?: string;
} & StylesProps;
