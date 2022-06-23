import {ReactNode} from 'react';

export type PTooltipProps = {
  className?: string;
  title?: string | ReactNode;
  desc?: string | ReactNode;
  type?: string;
  place?: string | null;
};
