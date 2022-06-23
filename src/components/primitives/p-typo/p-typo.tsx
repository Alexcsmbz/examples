import {FontWeight, PTypoProps} from './p-typo.types';
import {memo} from 'react';
import {styles} from './p-typo.styles';
import {cx} from '@emotion/css';
import {theme} from 'constants/theme';

const PTypo = ({
  children,
  variant = 'body1',
  onClick,
  className,
  color = theme.pallete.light.common.black,
  ...stylesProps
}: PTypoProps & FontWeight) => (
  <p onClick={onClick} className={cx(styles({variant, color, ...stylesProps}), className)}>
    {children}
  </p>
);

export const PTypoMemoized = memo(PTypo);
