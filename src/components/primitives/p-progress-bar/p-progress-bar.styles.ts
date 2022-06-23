import {theme} from 'constants/theme';
import {css, keyframes} from '@emotion/css';

const colorload = keyframes({
  '0%': {opacity: 0, transform: ' rotate(0deg)'},

  '100%': {opacity: 0, transform: ' rotate(360deg)'},
});

export const progressCircle = css({
  position: 'relative',
  display: 'inline-block',
  borderRadius: '50%',
  backgroundColor: theme.pallete.light.grey[100],

  '&:after': {
    content: "''",
    display: 'inline-block',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    animation: `${colorload} 2s`,
  },

  p: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
    textAlign: 'center',
    borderRadius: '50%',
    background: theme.pallete.light.grey[100],
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const roundPerRotation = (rotateDegree: any) =>
  css({
    '&:after': {
      backgroundImage: `linear-gradient(${rotateDegree >= 51 ? rotateDegree * 3.6 - 270 : 90}deg, ${
        rotateDegree >= 51 ? theme.pallete.light.primary.main : theme.pallete.light.grey[100]
      } 50%, transparent 50%, transparent), linear-gradient(${rotateDegree >= 51 ? 270 : rotateDegree * 3.6 + 90}deg, ${
        theme.pallete.light.primary.main
      } 50%, ${theme.pallete.light.grey[100]} 50%, ${theme.pallete.light.grey[100]})`,
    },
  });

export const linear = (progress: any) =>
  css({
    width: '100%',

    '&:before': {
      content: '""',
      width: '100%',
      height: '2px',
      backgroundColor: theme.pallete.light.grey[100],
      position: 'absolute',
      top: '0',
      left: '0',
      borderRadius: '2px',
    },

    '&:after': {
      content: '""',
      width: `${progress}%`,
      height: '4px',
      backgroundColor: theme.pallete.light.primary.main,
      position: 'absolute',
      top: '-1px',
      left: '0',
      borderRadius: '4px',
    },
  });
