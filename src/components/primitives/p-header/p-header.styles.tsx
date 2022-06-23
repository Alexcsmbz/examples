import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const link = css({
  p: {
    transition: 'all 0.2s ease',
  },

  '&:hover p': {
    color: theme.pallete.light.info.main,
  },
});

export const dropdownButton = css({
  backgroundColor: theme.pallete.light.grey[500],
  borderRadius: theme.radius.round,
  width: '48px',
  height: '48px',
  transition: 'all 0.2s ease',

  '+ .arrow': {
    transition: 'all 0.2s ease',
  },
});

export const stickyHeader = css({
  backgroundColor: theme.pallete.light.common.white,
  boxShadow: theme.shadow[0],
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 11,
});

export const burgerNavLink = css({
  '&.active': {
    '> div': {
      backgroundColor: theme.pallete.light.grey[100],

      '> div svg': {
        circle: {
          stroke: theme.pallete.light.primary.main,
        },

        path: {
          fill: theme.pallete.light.primary.main,
        },
      },
    },

    p: {
      color: theme.pallete.light.primary.main,
    },
  },
});

export const searchBar = css({
  backgroundColor: theme.pallete.light.common.white,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 11,
  visibility: 'hidden',
  opacity: 0,
  transition: 'all 0.2s ease',
});

export const searchBarActive = css({
  visibility: 'visible',
  opacity: 1,
});
