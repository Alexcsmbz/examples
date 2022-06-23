import {memo} from 'react';
import {PSlickArrowProps} from './p-slick-arrow.types';
import {Icon} from 'assets/icons';
import {PBox} from '../p-box';
import {center, next} from './p-slick-arrow.styles';
import {cx} from '@emotion/css';

const PSlickArrow = ({type, position, disabled, onClick}: PSlickArrowProps) => (
  <PBox
    cursor={disabled ? 'default' : 'pointer'}
    className={cx(
      position === 'center' && center,
      type === 'next' && next,
      disabled && 'disabled',
      type === 'next' ? 'slick-arrow arrow-next' : 'slick-arrow arrow-prev'
    )}
    onClick={onClick}
    opacity={disabled ? 0.5 : 1}
  >
    {type === 'next' ? <Icon.ArrowRight /> : <Icon.ArrowLeft />}
  </PBox>
);

export const PSlickArrowMemoized = memo(PSlickArrow);
