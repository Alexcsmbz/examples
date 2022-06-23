import {memo} from 'react';
import {PSidenavProps} from './p-sidenav.types';
import {PBackground} from '../p-background';
import {theme} from 'constants/theme';

const PSidenav = ({active, children}: PSidenavProps) => (
  <aside>
    <PBackground
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      top="55px"
      zIndex={9}
      transform={`translateX(${active ? 0 : '100%'})`}
      transition="all 0.3s"
      overflow="auto"
      backgroundColor={theme.pallete.light.common.white}
      height="calc(100% - 55px)"
      padding="0 0 20px"
    >
      {children}
    </PBackground>
  </aside>
);

export const PSidenavMemoized = memo(PSidenav);
