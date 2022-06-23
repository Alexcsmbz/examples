import {cx} from '@emotion/css';
import {memo} from 'react';
import {styles, animation} from './p-button.styles';
import {PButtonProps} from './p-button.types';
import {PBox} from '../p-box';

const PButton = ({children, onClick, className, name, type, disabled, ...stylesProps}: PButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    name={name}
    className={cx(styles(stylesProps), animation, className)}
    type={type}
  >
    {stylesProps.loading ? <PBox>...</PBox> : children}
  </button>
);

export const PButtonMemoized = memo(PButton);
