import {theme} from 'constants/theme';
import {css} from '@emotion/css';

export const suffix = css({
  position: 'absolute',
  top: '50%',
  right: '20px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',

  path: {
    transition: 'all 0.2s ease',
  },
});

export const container = css({
  position: 'relative',

  label: {
    width: '100%',
  },

  [`.react-datepicker__tab-loop ~ .${suffix}`]: {
    path: {
      fill: theme.pallete.light.primary.light,
      stroke: theme.pallete.light.primary.light,
    },
  },

  '.react-datepicker__triangle': {
    display: 'none',
  },

  '.react-datepicker-popper[data-placement^=bottom]': {
    paddingTop: '0',
    zIndex: 2,
  },

  '.react-datepicker': {
    borderRadius: theme.radius.main,
    boxShadow: theme.shadow[1],
    border: 0,
    color: theme.pallete.light.grey[900],
    fontSize: '16px',
    padding: '31px 9px 28px',
  },

  '.react-datepicker__header': {
    background: 'inherit',
    border: 0,
    padding: 0,
  },

  '.react-datepicker__current-month': {
    fontWeight: 'normal',
    color: theme.pallete.light.primary.main,
    fontSize: 'inherit',
    marginBottom: '6px',
  },

  '.react-datepicker__day-name': {
    fontSize: '12px',
  },

  [`
  .react-datepicker__day-name, 
  .react-datepicker__day, 
  .react-datepicker__time-name`]: {
    color: 'inherit',
    width: '32px',
  },

  [`
  .react-datepicker__day, 
  .react-datepicker__month-text, 
  .react-datepicker__quarter-text, 
  .react-datepicker__year-text`]: {
    '&:hover': {
      backgroundColor: theme.pallete.light.primary.main,
      borderRadius: theme.radius.round,
      color: theme.pallete.light.common.white,
    },
  },

  '.react-datepicker__day': {
    width: '32px',
    lineHeight: '32px',
    margin: '2px 3px',
  },

  '.react-datepicker__day--outside-month': {
    opacity: 0,
    pointerEvents: 'none',
  },

  [`
  .react-datepicker__day--keyboard-selected, 
  .react-datepicker__month-text--keyboard-selected, 
  .react-datepicker__quarter-text--keyboard-selected, 
  .react-datepicker__year-text--keyboard-selected`]: {
    backgroundColor: theme.pallete.light.warning.light,
    borderRadius: theme.radius.round,
    color: theme.pallete.light.common.white,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: theme.pallete.light.primary.main,
      borderRadius: theme.radius.round,
    },
  },

  [`
  .react-datepicker__day--selected, 
  .react-datepicker__day--in-selecting-range, 
  .react-datepicker__month-text--selected, 
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range, 
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected, 
  .react-datepicker__year-text--in-selecting-range, 
  .react-datepicker__year-text--in-range`]: {
    backgroundColor: theme.pallete.light.primary.main,
    borderRadius: theme.radius.round,
    color: theme.pallete.light.common.white,
  },

  [`
  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, 
    .react-datepicker__month-text--in-range, 
    .react-datepicker__quarter-text--in-range,
     .react-datepicker__year-text--in-range)
  `]: {
    backgroundColor: `${theme.pallete.light.primary.light}20`,
    color: theme.pallete.light.grey[900],
  },

  '.react-datepicker__day--in-range': {
    borderRadius: theme.radius.round,

    '&:not(.react-datepicker__day--keyboard-selected)': {
      backgroundColor: `${theme.pallete.light.primary.light}20`,
      color: theme.pallete.light.grey[900],
    },

    '&:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end):hover': {
      backgroundColor: `${theme.pallete.light.primary.light}20`,
      color: theme.pallete.light.grey[900],
    },

    '&.react-datepicker__day--range-start, &.react-datepicker__day--range-end': {
      backgroundColor: theme.pallete.light.primary.light,
      color: theme.pallete.light.common.white,
    },

    '&.react-datepicker__day--today': {
      color: theme.pallete.light.primary.main,
    },
  },

  '.react-datepicker__navigation': {
    top: '26px',

    '&--previous': {
      left: '17px',
    },

    '&--next': {
      right: '17px',
    },
  },
});

export const root = css({
  backgroundColor: theme.pallete.light.common.white,
  borderRadius: theme.radius.main,
  border: `1px solid ${theme.pallete.light.grey[900]}`,
  width: '100%',
  height: '48px',
  padding: '0 58px 0 16px',
  fontSize: '16px',
  color: theme.pallete.light.grey[900],
  transition: 'border 0.2s ease',

  '&:not(:disabled):hover, &:focus': {
    border: `1px solid ${theme.pallete.light.primary.light}`,
  },

  '&:disabled': {
    opacity: '0.4',
    cursor: 'not-allowed',
  },
});
