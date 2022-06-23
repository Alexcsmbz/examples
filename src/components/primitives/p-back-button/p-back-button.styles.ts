import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const root = css({
  borderRadius: theme.radius.round,
  cursor: 'pointer',

  svg: {
    width: '100%',
    height: '100%',
    maxWidth: '40px',

    path: {
      transition: 'all 0.2s ease',
      fill: theme.pallete.light.grey[800],
    },
  },

  '&:hover': {
    'svg path': {
      fill: theme.pallete.light.grey[600],
    },
  },
});

export const pined = css({
  position: 'absolute',
  top: '0',
  left: '15px',
});
