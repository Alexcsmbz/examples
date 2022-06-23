import {memo} from 'react';
import {PBackgroundProps} from './p-background.types';
import {styles} from './p-background.styles';
import {cx} from '@emotion/css';

const PBackground = ({children, className, onClick, ...stylesProps}: PBackgroundProps) => (
  <div onClick={onClick} className={cx(styles(stylesProps), className)}>
    {children}
  </div>
);

export const PBackgroundMemoized = memo(PBackground);
