import {memo} from 'react';
import {PScrollTopProps} from './p-scroll-top.types';
import {root, showButton} from './p-scroll-top.styles';
import {PBox} from '../p-box';
import {Icon} from 'assets/icons';
import {cx} from '@emotion/css';
import {PBackground} from '../p-background';
import {theme} from 'constants/theme';

const PScrollTopM = ({show, className, onClick}: PScrollTopProps) => (
  <PBackground
    className={cx(root, show && showButton, className)}
    onClick={onClick}
    backgroundColor={theme.pallete.light.grey[300]}
    bottom=" 95px"
    right="25px"
  >
    <PBox width="100%" height="100%" display="grid" alignItems="center" justifyContent="center">
      <Icon.ChevronUp />
    </PBox>
  </PBackground>
);

export const PScrollTopMMemoized = memo(PScrollTopM);
