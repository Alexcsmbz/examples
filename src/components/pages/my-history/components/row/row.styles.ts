import {css} from '@emotion/css';

export const ellipsis = css({
  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const sideFlag = (color?: string) =>
  css({
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '8px',
      height: '100%',
      borderRadius: '8px 0px 0px 8px',
      backgroundColor: color,
    },
  });
