import {circular, path, root} from './p-loader.styles';
import {PBox} from '../p-box';
import {theme} from 'constants/theme';

export const PLoader = ({size = 32, stroke, bgColor}: {size?: number; stroke?: string; bgColor?: string}) => (
  <PBox className={root(bgColor!)} width={`${size}px`} height={`${size}px`} position="relative">
    <svg className={circular} viewBox="25 25 50 50">
      <circle
        className={path}
        cx="50"
        cy="50"
        r="22"
        fill="none"
        stroke={stroke || theme.pallete.light.primary.main}
        strokeWidth="4"
        strokeMiterlimit="10"
      />
    </svg>
  </PBox>
);
