import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const socialButton = css({
  backgroundColor: theme.pallete.light.primary.light,
  borderRadius: theme.radius.round,
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  transition: 'all 0.2s ease',

  'svg path': {
    fill: theme.pallete.light.common.white,
  },

  '&:hover': {
    backgroundColor: theme.pallete.light.primary.main,
  },
});
