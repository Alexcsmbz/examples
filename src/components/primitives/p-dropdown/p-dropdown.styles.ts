import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const title = css({
  cursor: 'pointer',

  '.more': {
    rect: {
      transition: 'all 0.2s ease',
    },
  },

  '.dropdown-icon': {
    rect: {
      transition: 'all 0.2s ease',
    },
  },
});

export const titleApplyHover = css({
  cursor: 'pointer',

  '.more': {
    '&:hover': {
      rect: {
        fill: '#EEEEEE',
      },
    },
  },

  '.dropdown-icon': {
    '&:hover': {
      rect: {
        fill: '#EEEEEE',
      },
    },
  },
});

export const titleActive = css({
  '.more': {
    rect: {
      fill: '#EEEEEE',
    },
  },

  '.dropdown-icon': {
    rect: {
      fill: '#EEEEEE',
    },
  },
});

export const dropdownMenu = css({
  backgroundColor: theme.pallete.light.common.white,
  borderRadius: theme.radius.main,
  boxShadow: theme.shadow[1],
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 6,
  transform: 'translateY(5px)',
  visibility: 'hidden',
  opacity: 0,
  minWidth: '191px',

  '&:hover': {
    transform: 'translateY(0px)',
    visibility: 'visible',
    opacity: 1,
  },

  '&::before': {
    content: `''`,
    zIndex: -1,
    display: 'block',
    cursor: 'pointer',
    position: 'absolute',
    width: 'calc(100% + 30px)',
    height: 'calc(100% + 30px)',
    top: '-15px',
    left: '-15px',
  },
});

export const listItem = css({
  paddingBottom: '14px',
  paddingLeft: '14px',
  paddingRight: '14px',

  '&:first-child': {
    paddingTop: '14px',
  },

  '&:last-child': {
    paddingBottom: '14px',
  },
});

export const root = css({
  position: 'relative',

  '.menu-link': {
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
});

export const rootActive = css({
  '.dropdown-button': {
    backgroundColor: theme.pallete.light.primary.light,
  },

  '.arrow': {
    transform: 'rotate(180deg)',
  },

  '.dropdown-menu': {
    transform: 'translateY(0)',
    visibility: 'visible',
    opacity: 1,
  },

  '.more': {
    rect: {
      fill: '#EEEEEE',
    },
  },
});

export const rootApplyHover = css({
  '&:hover': {
    '.dropdown-button': {
      backgroundColor: theme.pallete.light.primary.light,
    },

    '.arrow': {
      transform: 'rotate(180deg)',
    },

    '.dropdown-menu': {
      transform: 'translateY(0)',
      visibility: 'visible',
      opacity: 1,
    },

    '.more': {
      rect: {
        fill: '#EEEEEE',
      },
    },
  },

  '.menu-link': {
    '&:hover': {
      backgroundColor: theme.pallete.light.grey[100],
    },
  },
});
