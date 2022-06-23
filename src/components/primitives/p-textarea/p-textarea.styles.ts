import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const labelRequired = css({
  color: theme.pallete.light.primary.main,
  marginLeft: '3px',
});

export const textareaRoot = css({
  color: theme.pallete.light.common.black,
  border: `1px solid ${theme.pallete.light.grey[900]}`,
  borderRadius: theme.radius.main,
  padding: '12px 16px 20px',
  outline: 0,
  width: '100%',
  fontSize: '16px',

  '&::placeholder': {
    color: theme.pallete.light.grey[500],
  },

  '&:focus': {
    border: `1px solid ${theme.pallete.light.primary.light}`,
  },
});

export const error = css({
  p: {
    color: theme.pallete.light.error.main,
  },

  textarea: {
    border: `1px solid ${theme.pallete.light.error.main}`,

    '&:focus': {
      border: `1px solid ${theme.pallete.light.error.main}`,
    },
  },
});
