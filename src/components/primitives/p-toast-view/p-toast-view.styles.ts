import {css} from '@emotion/css';
import {theme} from 'constants/theme';
import {Device} from 'types/custom';
import {rotate} from '../p-loader/p-loader.styles';

export const pending = css({
  animation: `${rotate} 2.2s linear infinite`,
});

export const body = css({
  '&.Toastify__toast-body': {
    padding: '0',
    display: 'grid',
    gap: '16px',
    gridAutoFlow: 'column',
    alignItems: 'center',
  },

  '& .Toastify__toast-icon': {
    width: 'auto',
    marginInlineEnd: '0',
  },
});

export const root = ({device}: {device?: Device}) =>
  css({
    '&.Toastify__toast': {
      padding: device === 'mobile' ? '11px 20px 12px' : '16px 24px',
      borderRadius: device === 'mobile' ? '0' : theme.radius.main,
      boxShadow: theme.shadow[2],
      display: 'grid',
      justifyContent: 'space-between',
      gap: '16px',
      alignItems: 'center',
      gridAutoFlow: 'column',
    },
  });

export const container = ({width}: {width?: string}) =>
  css({
    '&.Toastify__toast-container': {
      width,
      padding: '0',
    },
  });

export const progress = css({
  '&.Toastify__progress-bar--success': {
    background: theme.pallete.light.success.main,
  },

  '&.Toastify__progress-bar--error': {
    background: theme.pallete.light.error.main,
  },
});
