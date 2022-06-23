import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const slider = css({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.pallete.light.grey[900],
  transition: '.4s',
  borderRadius: '34px',

  '&:before': {
    position: 'absolute',
    content: '""',
    height: '20px',
    width: '20px',
    left: '2px',
    bottom: '2px',
    backgroundColor: theme.pallete.light.common.white,
    borderRadius: '50%',
    transition: '.4s',
  },
});

export const switcher = css({
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '24px',

  input: {
    opacity: 0,
    width: 0,
    height: 0,

    [`&:checked + .${slider}`]: {
      backgroundColor: theme.pallete.light.primary.main,

      '&:before': {
        transform: 'translateX(16px)',
      },
    },

    [`&:disabled ~ .${slider}`]: {
      backgroundColor: theme.pallete.light.grey['A400'],
      cursor: 'not-allowed',
    },

    [`&:disabled:checked ~ .${slider}`]: {
      backgroundColor: theme.pallete.light.primary.light,
    },
  },
});
