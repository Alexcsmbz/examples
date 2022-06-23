import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const socialButton = css({
  backgroundColor: theme.pallete.light.grey[800],
  borderRadius: theme.radius.round,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  transition: 'all 0.2s ease',

  '&:not(:last-child)': {
    marginRight: '14px',
  },

  'svg path': {
    fill: theme.pallete.light.common.white,
  },

  '&:hover': {
    backgroundColor: theme.pallete.light.grey[500],
  },
});
