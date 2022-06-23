import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const root = css({
  borderRadius: theme.radius.round,
  position: 'fixed',
  cursor: 'pointer',
  width: '56px',
  height: '56px',
  transition: 'all 0.2s ease',
  visibility: 'hidden',
  opacity: 0,
  zIndex: 9,
});

export const applyHover = css({
  '&:hover': {
    backgroundColor: theme.pallete.light.grey[300],
  },
});

export const showButton = css({
  visibility: 'visible',
  opacity: 1,
});
