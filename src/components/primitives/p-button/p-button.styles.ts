import {theme} from 'constants/theme';
import {css} from '@emotion/css';
import {PButtonStyles} from './p-button.types';

export const animation = css({
  transition: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
});

export const styles = ({
  variant,
  fullWidth,
  defaultWidth,
  loading,
  size,
  form,
  shape,
  shadow,
  justifyContent,
}: PButtonStyles) =>
  css({
    background:
      variant === 'primary'
        ? theme.pallete.light.primary.main
        : variant === 'secondary'
        ? theme.pallete.light.common.white
        : variant === 'apply'
        ? theme.pallete.light.success.main
        : variant === 'apply-secondary'
        ? theme.pallete.light.common.white
        : '',
    color:
      variant === 'primary'
        ? theme.pallete.light.common.white
        : variant === 'secondary'
        ? theme.pallete.light.primary.main
        : variant === 'apply'
        ? theme.pallete.light.common.white
        : variant === 'apply-secondary'
        ? theme.pallete.light.success.main
        : '',
    border:
      variant === 'primary'
        ? `0`
        : variant === 'secondary'
        ? `1px solid ${theme.pallete.light.primary.main}`
        : variant === 'apply'
        ? '0'
        : variant === 'apply-secondary'
        ? `1px solid ${theme.pallete.light.success.main}`
        : '0',
    borderRadius: form === 'round' ? theme.radius.round : theme.radius.main,
    boxShadow: shadow ? theme.shadow[1] : 'none',
    minWidth: defaultWidth,
    width: fullWidth
      ? '100%'
      : size === 'large' && shape === 'round'
      ? '60px'
      : size === 'medium' && shape === 'round'
      ? '48px'
      : '',
    height:
      size === 'small' ? '40px' : size === 'large' ? '60px' : size === 'medium' && shape === 'round' ? '48px' : '48px',
    padding: shape === 'round' ? '' : '5px 21px',
    pointerEvents: loading ? 'none' : 'all',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: justifyContent ?? 'center',
    cursor: 'pointer',
    fontFamily: 'Roboto SemiBold',
    fontSize: '16px',
    transition: '0.1s all 0.3s',
    '&:hover': {
      background:
        variant === 'primary'
          ? theme.pallete.light.primary.dark
          : variant === 'secondary'
          ? theme.pallete.light.secondary.dark
          : variant === 'apply'
          ? theme.pallete.light.success.light
          : variant === 'apply-secondary'
          ? theme.pallete.light.grey[50]
          : '',
      color: variant === 'apply-secondary' ? theme.pallete.light.success.main : '',
    },
    '&:focus': {
      background:
        variant === 'primary'
          ? theme.pallete.light.primary.dark
          : variant === 'secondary'
          ? theme.pallete.light.secondary.dark
          : variant === 'apply'
          ? theme.pallete.light.success.light
          : variant === 'apply-secondary'
          ? theme.pallete.light.common.white
          : '',
      color: variant === 'apply-secondary' ? theme.pallete.light.success.main : '',
    },
    '&:disabled': {
      background:
        variant === 'primary'
          ? theme.pallete.light.grey[500]
          : variant === 'secondary'
          ? theme.pallete.light.common.white
          : variant === 'apply'
          ? theme.pallete.light.grey[500]
          : variant === 'apply-secondary'
          ? theme.pallete.light.common.white
          : '',
      color:
        variant === 'primary'
          ? theme.pallete.light.common.white
          : variant === 'secondary'
          ? theme.pallete.light.grey[500]
          : variant === 'apply-secondary'
          ? theme.pallete.light.grey[500]
          : '',
      borderColor:
        variant === 'primary'
          ? ``
          : variant === 'secondary'
          ? theme.pallete.light.grey[500]
          : variant === 'apply-secondary'
          ? theme.pallete.light.grey[500]
          : '',
      boxShadow: 'none',
      cursor: 'not-allowed',
      userSelect: 'none',
    },

    '.prefix': {
      marginRight: '10px',
    },
  });
