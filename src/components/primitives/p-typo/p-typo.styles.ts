import {css} from '@emotion/css';
import {FontWeight, StylesProps, getTypography, Variant} from './p-typo.types';

export const styles = ({variant, bold, regular, ...props}: StylesProps & FontWeight) =>
  css({...(getTypography({bold, regular})[variant as Variant] as any), ...props});
