import {css} from '@emotion/css';
import {Image} from 'assets/images';
import {theme} from 'constants/theme';

export const inputFilled = css({
  '& input': {
    backgroundColor: theme.pallete.light.common.white,
    border: `1px solid ${theme.pallete.light.primary.light}`,
    zIndex: 3,

    '&:focus': {
      border: `1px solid ${theme.pallete.light.primary.light}`,
    },
  },

  '& span': {
    zIndex: 3,
  },
});

export const successPopupLayer = css({
  background: `url(${Image.reflections}) top 18px center/auto no-repeat`,
  paddingLeft: '40px',
  paddingRight: '40px',

  img: {
    borderRadius: theme.radius.main,
  },
});

export const verifyPoint = css({
  'svg path': {
    stroke: 'inherit',
  },
});
