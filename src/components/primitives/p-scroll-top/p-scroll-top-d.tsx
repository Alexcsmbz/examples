import {memo} from 'react';
import {PScrollTopProps} from './p-scroll-top.types';
import {applyHover, root, showButton} from './p-scroll-top.styles';
import {PBox} from '../p-box';
import {Icon} from 'assets/icons';
import {cx} from '@emotion/css';

const PScrollTopD = ({show, className, onClick}: PScrollTopProps) => (
  <PBox
    className={cx(root, applyHover, show && showButton, className)}
    display="grid"
    alignItems="center"
    justifyContent="center"
    onClick={onClick}
    bottom="45px"
    right="26px"
  >
    <Icon.ChevronUp />
  </PBox>
);

export const PScrollTopDMemoized = memo(PScrollTopD);
