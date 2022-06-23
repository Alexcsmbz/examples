import {memo} from 'react';
import {PBackButtonProps} from './p-back-button.types';
import {root, pined} from './p-back-button.styles';
import {PBox} from '../p-box';
import {Icon} from 'assets/icons';
import {cx} from '@emotion/css';

const PBackButton = ({className, children, inline, onClick}: PBackButtonProps) => (
  <PBox
    className={cx(root, !inline && pined, className)}
    display="grid"
    alignItems="center"
    justifyContent="center"
    onClick={onClick}
    width="12px"
    height="16px"
  >
    {children || <Icon.ArrowLeft />}
  </PBox>
);

export const PBackButtonMemoized = memo(PBackButton);
