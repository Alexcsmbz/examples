import {ReactNode} from 'react';
import {PButtonStyles} from '../p-button/p-button.types';

export type PLinkProps = {
  external?: boolean;
  to: string;
  target?: string;
  children?: ReactNode;
  asButton?: boolean;
  variant: PButtonStyles['variant'];
  form?: PButtonStyles['form'];
  shape?: PButtonStyles['shape'];
  size?: PButtonStyles['size'];
  shadow?: PButtonStyles['shadow'];
  defaultWidth?: string;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
};

export type PLinkStyles = {
  asButton?: PLinkProps['asButton'];
} & PButtonStyles;
