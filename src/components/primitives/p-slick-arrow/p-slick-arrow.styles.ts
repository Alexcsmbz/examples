import {css} from '@emotion/css';

export const center = css({
  position: 'absolute',
  top: '40%',
  left: '25px',
  transform: 'translateY(-50%)',
  zIndex: 1,
  opacity: '0.7',
  transition: 'all 0.2s ease',

  '&:not(.disabled):hover': {
    opacity: '1',
  },
});

export const next = css({
  left: 'auto',
  right: '25px',
});
