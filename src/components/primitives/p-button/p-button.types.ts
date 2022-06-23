import {ReactNode} from 'react';

export type PButtonProps = {
  justifyContent?: JustifyContent;
  variant: Variant;
  size?: Size;
  form?: Form;
  shape?: Shape;
  defaultWidth?: string;
  onClick?: (e: any) => void;
  children?: ReactNode;
  type?: 'submit' | 'button';
  name?: string;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  loading?: boolean;
  shadow?: boolean;
};

export type PButtonStyles = {
  justifyContent?: JustifyContent;
  variant: Variant;
  size?: Size;
  form?: Form;
  shape?: Shape;
  defaultWidth?: string;
  fullWidth?: boolean;
  loading?: boolean;
  shadow?: boolean;
};

export type Variant = 'primary' | 'secondary' | 'apply' | 'apply-secondary';
type Form = 'square' | 'round';
type Shape = 'square' | 'round';
type Size = 'small' | 'medium' | 'large';
type JustifyContent = 'start' | 'end' | 'center' | 'stretch';
