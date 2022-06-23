import {ReactNode} from 'react';

export type PBackgroundProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
} & StylesProps;

export type StylesProps = {
  backgroundRepeat?: string;
  backgroundPosition?: string;
  backgroundPositionY?: string;
  backgroundPositionX?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderRight?: string;
  borderLeft?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'sticky';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  boxShadow?: string;
  transform?: string;
  flex?: string;
  overflow?: 'hidden' | 'visible' | 'auto';
  filter?: string;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
  transition?: string;
  zIndex?: number;
};
