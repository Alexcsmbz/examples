import {cx} from '@emotion/css';
import {memo} from 'react';
import {styles} from './p-overlay.styles';
import {POverlayProps} from './p-overlay.types';

const POverlay = ({children, className}: POverlayProps) => (
  <div className={cx(styles, 'overlay', className)}>{children}</div>
);

export const POverlayMemoized = memo(POverlay);
