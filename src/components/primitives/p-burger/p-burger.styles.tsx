import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const burgerActive = css({
  div: {
    '&:nth-child(1)': {
      transform: 'rotate(45deg) translate(5px, 5px)',
    },
    ' &:nth-child(2)': {
      opacity: '0',
    },
    '&:nth-child(3)': {
      transform: 'rotate(-45deg) translate(5px, -5px)',
    },
  },
});

export const bar = css({
  width: '24px',
  height: '2px',
  backgroundColor: theme.pallete.light.common.black,
  transition: '0.4s',
});
