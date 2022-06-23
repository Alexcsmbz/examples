import {css} from '@emotion/css';
import {theme} from 'constants/theme';

export const styles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 11,
  backgroundColor: `${theme.pallete.light.grey[900]}80`,
  overflow: 'auto',
});
