import {forwardRef, memo} from 'react';
import {PBoxProps} from './p-box.types';
import {styles} from './p-box.styles';
import {cx} from '@emotion/css';

const PBox = forwardRef(({children, className, onClick, ...stylesProps}: PBoxProps, ref: any) => (
  <div onClick={onClick} className={cx(styles(stylesProps), className)} ref={ref}>
    {children}
  </div>
));

export const PBoxMemoized = memo(PBox);
