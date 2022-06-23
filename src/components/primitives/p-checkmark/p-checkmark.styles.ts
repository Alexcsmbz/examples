import {PCheckmarkProps} from './p-checkmark.types';
import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const checkmark = ({type}: PCheckmarkProps) =>
  css({
    backgroundColor: theme.pallete.light.common.white,
    border: `2px solid ${theme.pallete.light.grey[900]}`,
    transition: '.4s',
    borderRadius: type === 'checkbox' ? '2px' : type === 'radio' ? '50px' : '',
    width: '20px',
    height: '20px',
    display: 'block',
    position: 'relative',
    marginRight: '7px',
    cursor: 'pointer',

    '&:after': {
      content: '""',
      position: 'absolute',
      display: type === 'checkbox' ? 'none' : '',
      left: type === 'checkbox' ? '4px' : '50%',
      top: type === 'checkbox' ? '1px' : '50%',
      width: type === 'checkbox' ? '7px' : '6px',
      height: type === 'checkbox' ? '12px' : '6px',
      border: type === 'checkbox' ? 'solid white' : '',
      borderWidth: type === 'checkbox' ? '0 3px 3px 0' : '',
      transform: type === 'checkbox' ? 'rotate(45deg)' : 'translate(-50%, -50%) scale(0)',
      borderRadius: type === 'radio' ? '50px' : '',
      backgroundColor: type === 'radio' ? theme.pallete.light.common.white : '',
      transition: 'all 0.2s ease',
    },
  });

export const container = ({type}: PCheckmarkProps) =>
  css({
    position: 'relative',
    display: 'inline-flex',
    cursor: 'default',

    input: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,

      [`&:checked + .${checkmark({type})}`]: {
        backgroundColor: theme.pallete.light.primary.main,
        borderColor: theme.pallete.light.primary.main,

        '&:after': {
          display: type === 'checkbox' ? 'block' : '',
          transform: type === 'radio' ? 'translate(-50%, -50%) scale(1)' : '',
        },
      },

      [`&:disabled ~ .${checkmark({type})}`]: {
        backgroundColor: theme.pallete.light.grey['300'],
        borderColor: theme.pallete.light.grey['500'],
        cursor: 'not-allowed',
      },

      [`&:checked:disabled ~ .${checkmark({type})}`]: {
        backgroundColor: theme.pallete.light.grey['500'],
        borderColor: theme.pallete.light.grey['500'],

        '+ p': {
          cursor: 'default',
        },
      },
    },
  });
