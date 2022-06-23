import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const root = css({
  transition: 'background-color 0.2s',

  '.desc': {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    overflow: 'hidden',
    maxWidth: '420px',
  },
});

export const applyHover = css({
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.pallete.light.grey[100],
  },
});
