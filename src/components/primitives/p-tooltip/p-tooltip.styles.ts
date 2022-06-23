import {PTooltipProps} from './p-tooltip.types';
import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const tooltipTitle = css({
  svg: {
    path: {
      transition: 'all 0.2s ease',
      fill: theme.pallete.light.grey[900],
    },

    circle: {
      transition: 'all 0.2s ease',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: theme.pallete.light.primary.main,
      },

      circle: {
        stroke: theme.pallete.light.primary.main,
      },
    },
  },
});

export const tooltip = ({place}: PTooltipProps) =>
  css({
    top: place === 'left' ? '50%' : '',
    left: place === 'left' ? '100%' : '',
    right: place === 'left' ? '0' : '',
    bottom: place === 'left' ? '' : '',
    transform: `translateY(${place === 'left' && '-50%'})`,
    visibility: 'hidden',
    opacity: 0,
    transition: 'all 0.2s ease',
    zIndex: 4,
  });

export const root = css({
  '&:hover': {
    '.tooltip-desc': {
      visibility: 'visible',
      opacity: 1,
    },

    [`.${tooltipTitle}`]: {
      svg: {
        path: {
          fill: theme.pallete.light.primary.main,
        },
      },
    },
  },
});
