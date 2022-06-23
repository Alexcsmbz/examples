import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const inputFilled = css({
  '& input': {
    backgroundColor: theme.pallete.light.common.white,
    border: `1px solid ${theme.pallete.light.primary.light}`,
    zIndex: 3,

    '&:focus': {
      border: `1px solid ${theme.pallete.light.primary.light}`,
    },
  },

  '& span': {
    zIndex: 3,
  },
});
