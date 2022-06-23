import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const categoryCard = css({
  backgroundColor: theme.pallete.light.common.white,
  boxShadow: theme.shadow[1],
  borderRadius: theme.radius.main,
  overflow: 'hidden',
  display: 'block',
  marginBottom: '22px',
  height: 'calc(100% - 22px)',
});

export const categoryCardLayer = css({
  '&:before': {
    content: '""',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6) 95%) no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.2s ease',
    visibility: 'hidden',
    opacity: 0,
  },

  '&:hover': {
    '&:before': {
      visibility: 'visible',
      opacity: 1,
    },
  },
});

export const categoryCardImage = css({
  backgroundColor: theme.pallete.light.grey[200],
  borderRadius: theme.radius.main,
  overflow: 'hidden',
  display: 'flex',
  height: '100%',

  img: {
    objectFit: 'cover',
    height: '100%',
  },
});
