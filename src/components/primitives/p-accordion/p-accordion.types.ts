import {ReactNode} from 'react';

export type PAccordionProps = {
  className?: string;
  open?: boolean;
  title?: string | ReactNode;
  content?: string | ReactNode;
  onClick?: () => void;
};
