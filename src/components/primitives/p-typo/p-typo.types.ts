import {theme} from 'constants/theme';
import {ReactNode} from 'react';

export type PTypoProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
} & StylesProps;

export type StylesProps = {
  color?: string;
  variant?: Variant;
  textTransform?: 'uppercase';
  textDecoration?: 'underline';
  cursor?: 'pointer';
  fontWeight?: string;
  wordBreak?: 'break-word';
};

export type FontWeight = {
  bold?: boolean;
  regular?: boolean;
};

export type Variant = keyof ReturnType<typeof getTypography>;

export const getTypography = ({bold, regular}: FontWeight) => ({
  h1: {
    fontSize: '32px',
    lineHeight: '40px',
    fontFamily: regular ? theme.typography.font.openSansRegular : theme.typography.font.openSansSemiBold,
  },
  h2: {
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: regular ? theme.typography.font.openSansRegular : theme.typography.font.openSansSemiBold,
  },
  h3: {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: regular ? theme.typography.font.openSansRegular : theme.typography.font.openSansSemiBold,
  },
  body1: {
    // default
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: bold ? theme.typography.font.robotoSemiBold : theme.typography.font.robotoRegular,
  },
  body2: {
    fontSize: '14px',
    lineHeight: '24px',
    fontFamily: bold ? theme.typography.font.robotoSemiBold : theme.typography.font.robotoRegular,
  },
  body3: {
    fontSize: '12px',
    lineHeight: '16px',
    fontFamily: bold ? theme.typography.font.robotoSemiBold : theme.typography.font.robotoRegular,
  },
});
