import {ReactNode} from 'react';

export type PImageProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  image?: string | null;
  children?: ReactNode;
  disabled?: boolean;
};
