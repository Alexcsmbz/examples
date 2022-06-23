import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const searchInput = css({
  '& input': {
    backgroundColor: theme.pallete.light.common.white,
    border: '1px solid transparent',
    zIndex: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    '&:focus': {
      border: '1px solid transparent',
    },
  },

  '& span': {
    zIndex: 3,
  },
});

export const searchRoot = css({
  borderRadius: theme.radius.main,
  backgroundColor: theme.pallete.light.common.white,
});

export const searchDirect = css({
  cursor: 'pointer',

  '&:hover': {
    svg: {
      'line, circle': {
        stroke: theme.pallete.light.primary.main,
      },
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

export const inputOffset = css({
  input: {
    paddingRight: '70px',
  },
});
