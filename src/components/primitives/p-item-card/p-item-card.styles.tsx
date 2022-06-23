import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const listCard = css({
  WebkitTapHighlightColor: 'transparent',
  boxShadow: theme.shadow[2],
  backgroundColor: theme.pallete.light.common.white,
  borderRadius: theme.radius.main,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'box-shadow 0.2s ease',
  cursor: 'pointer',
});

export const listCardImage = css({
  backgroundColor: theme.pallete.light.grey[100],
  borderRadius: theme.radius.main,
  display: 'flex',
});

export const itemCardTitle = css({
  color: theme.pallete.light.primary.main,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const listCardTimer = css({
  borderRadius: `0 0 ${theme.radius.main} ${theme.radius.main}`,
  background: theme.pallete.light.primary.light,
  position: 'absolute',
  bottom: '0',
  left: '0',

  p: {
    color: 'white',
  },
});

export const authorAvatar = css({
  backgroundColor: theme.pallete.light.grey[300],
  borderRadius: theme.radius.round,
});

export const textNowrap = css({
  display: 'grid',
  gridAutoFlow: 'column',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
