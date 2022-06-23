import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const root = css({
  boxShadow: theme.shadow[2],
  backgroundColor: theme.pallete.light.common.white,
  borderRadius: theme.radius.main,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'box-shadow 0.2s ease',
  paddingTop: '16px',
});

export const imageWrapper = css({
  backgroundColor: theme.pallete.light.grey[100],
  borderRadius: theme.radius.main,
  display: 'flex',

  img: {
    borderRadius: theme.radius.main,
  },
});

export const titleWrapper = css({
  color: theme.pallete.light.primary.main,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
