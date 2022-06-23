import {memo} from 'react';
import {PBurgerProps} from './p-burger.types';
import {burgerActive, bar} from './p-burger.styles';
import {PBox} from '../p-box';

const PBurger = ({active, onClick}: PBurgerProps) => (
  <PBox display="grid" gridAutoFlow="row" gap="5px" className={active ? burgerActive : ''} onClick={onClick}>
    <div className={bar} />
    <div className={bar} />
    <div className={bar} />
  </PBox>
);

export const PBurgerMemoized = memo(PBurger);
