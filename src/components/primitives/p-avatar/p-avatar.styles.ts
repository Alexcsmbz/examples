import {PAvatarProps} from './p-avatar.types';
import {css} from '@emotion/css';

export const mockShort = (props: PAvatarProps) =>
  css({
    backgroundColor: props.backgroundColor,

    p: {
      fontSize: Number(props.size?.replace(/\D/g, '')) <= 50 ? '24px' : '64px',
    },
  });

export const mockImageWrapper = css({
  display: 'flex',
  'svg path': {
    fill: 'inherit',
  },
});
