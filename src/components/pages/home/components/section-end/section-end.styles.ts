import {css} from '@emotion/css';
import {Device} from 'types/custom';

export const slickSliderWrapper = ({device}: {device?: Device}) =>
  css({
    width:
      device === 'desktop'
        ? 'calc(100% + 50px)'
        : device === 'mobile'
        ? 'calc(100% + 20px)'
        : device === 'tablet'
        ? 'calc(100% + 20px)'
        : '',
    marginLeft: device === 'desktop' ? '-25px' : device === 'mobile' ? '-10px' : device === 'tablet' ? '-10px' : '',
    padding: device === 'desktop' ? '25px 15px' : device === 'mobile' ? '25px 0' : device === 'tablet' ? '25px 0' : '',
    marginTop: '-25px',
    marginBottom: '-25px',
    overflow: 'hidden',

    '.slick-list': {
      overflow: 'visible',
    },
  });

export const listingSlider = css({
  position: 'relative',

  '.slick-list': {},

  '.slick-track': {
    display: 'flex',
    minWidth: '100%',
  },

  '.slick-slide': {
    height: 'inherit',

    '> div': {
      height: '100%',
    },
  },

  '.slick-slide:not(.slick-active)': {
    '.list-card': {
      boxShadow: '0 0 0',
    },
  },
});
