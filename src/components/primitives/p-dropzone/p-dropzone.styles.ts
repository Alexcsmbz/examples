import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const root = css({
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23A3A3A3FF' stroke-width='2' stroke-dasharray='9' stroke-dashoffset='4' stroke-linecap='square'/%3e%3c/svg%3e")`,
  borderRadius: '17px',
  cursor: 'grab',
});

export const grabbing = css({
  backgroundColor: theme.pallete.light.grey[200],
});
