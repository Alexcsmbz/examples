import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const accordionTitle = css({
  borderTop: `1px solid ${theme.pallete.light.grey[500]}`,
  color: '#A3A3A3',
  cursor: 'pointer',

  'svg, p': {
    transition: 'all 0.2s ease',
  },

  '&.active': {
    svg: {
      transform: 'rotate(180deg)',
    },
  },

  '&:hover': {
    p: {color: theme.pallete.light.primary.light},
  },
});

export const accordionContent = css({
  maxHeight: '0',
  transition: '0.3s max-height 0.1s',
  overflow: 'hidden',

  '&.active': {
    transition: '0.6s max-height 0.1s',
    maxHeight: '2000px',
  },

  a: {
    color: theme.pallete.light.info.main,
  },

  'b, strong': {
    color: theme.pallete.light.common.black,
  },
});

export const root = css({
  '&:last-child': {
    borderBottom: `1px solid ${theme.pallete.light.grey[500]}`,
  },
});
