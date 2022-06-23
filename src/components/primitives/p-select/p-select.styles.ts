import {css} from '@emotion/css';
import {theme} from 'constants/theme';
import {Styles} from './p-select.types';

export const labelRequired = css({
  color: '#FD5189',
});

export const labelRoot = css({
  display: 'grid',
});

export const selectRoot = css({
  borderBottom: '1px solid #000000',
});

export const selectError = css({
  '& .stars__control': {
    borderColor: theme.pallete.light.error.main,
  },

  '&:hover .stars__control': {
    borderColor: theme.pallete.light.error.main,
  },
});

export const selectStyles: Styles = {
  control: (styles, {isDisabled, isSelected, isFocused}) => ({
    ...styles,
    borderColor: theme.pallete.light.grey[isDisabled ? 500 : 900],
    boxShadow: 'none',
    zIndex: 3,
    height: '48px',
    borderRadius: theme.radius.main,
    borderBottomLeftRadius: isSelected ? 0 : theme.radius.main,
    borderBottomRightRadius: isSelected ? 0 : theme.radius.main,
    cursor: 'pointer',
    backgroundColor: theme.pallete.light.common.white,

    '&:hover': {
      borderColor: isFocused ? theme.pallete.light.grey[900] : theme.pallete.light.primary.main,
    },
  }),
  dropdownIndicator: (styles, {isFocused, isDisabled}) => ({
    ...styles,
    color: theme.pallete.light.grey[isDisabled ? 500 : 900],
    transition: 'all 70ms linear',
    transform: isFocused ? 'rotate(0.5turn)' : '',

    '&:hover': {
      color: theme.pallete.light.grey[900],
    },
  }),
  menu: styles => ({
    ...styles,
    position: 'absolute',
    top: '-8px',
    zIndex: 2,
    paddingTop: '48px',
    borderRadius: theme.radius.main,
    boxShadow: theme.shadow[1],
  }),
  option: (styles, {isFocused}) => ({
    ...styles,
    backgroundColor: isFocused ? theme.pallete.light.grey[100] : undefined,
    cursor: 'pointer',

    ':active': {
      ...styles[':active'],
      backgroundColor: theme.pallete.light.grey[100],
    },
  }),
};
