import {theme} from 'constants/theme';
import {css} from '@emotion/css';
import {Type} from './p-input.types';
import {ReactNode} from 'react';

export const labelRequired = css({
  color: theme.pallete.light.primary.main,
  marginLeft: '3px',
});

export const inputRoot = ({slotRight, size}: {slotRight?: ReactNode; size?: string}) =>
  css({
    color: theme.pallete.light.common.black,
    border: `1px solid ${theme.pallete.light.grey[900]}`,
    borderRadius: theme.radius.main,
    height: size === 'small' ? '40px' : '48px',
    padding: '0 16px',
    paddingRight: slotRight ? '36px' : '16px',
    outline: 0,
    width: '100%',
    fontSize: '16px',

    '&::placeholder': {
      color: theme.pallete.light.grey[500],
    },

    '&:focus': {
      border: `1px solid ${theme.pallete.light.primary.light}`,
    },

    '&:disabled': {
      opacity: 0.6,
    },
  });

export const labelRoot = (type?: Type) =>
  css({
    cursor: 'default',
    position: 'relative',
    display: 'grid',
    gap: '4px',
    gridAutoFlow: type === 'radio' ? 'column' : 'row',
    justifyContent: type === 'radio' ? 'start' : '',
    alignItems: 'center',
  });

export const error = css({
  p: {
    color: theme.pallete.light.error.main,
  },

  input: {
    border: `1px solid ${theme.pallete.light.error.main}`,

    '&:focus': {
      border: `1px solid ${theme.pallete.light.error.main}`,
    },
  },
});

export const slotRight = css({
  position: 'absolute',
  right: 18,
  top: 'calc(50% - 8px)',
});
