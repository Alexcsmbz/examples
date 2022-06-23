import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const wrapper = css({
  borderRadius: theme.radius.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '.lazyload-wrapper': {
    width: '100%',
    height: '100%',
  },

  img: {
    width: '100%',
    objectFit: 'contain',
  },
});

export const imageWrapper = (height?: string) =>
  css({
    img: {
      maxHeight: height,
    },
  });
