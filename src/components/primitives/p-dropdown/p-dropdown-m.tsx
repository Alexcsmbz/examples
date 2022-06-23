import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {PDropdownMProps} from './p-dropdown.types';
import {PBackground} from '../p-background';
import {root, title as titleStyles, titleActive, rootActive} from './p-dropdown.styles';
import {theme} from 'constants/theme';
import {PBox} from '../p-box';
import {POverlay} from '../p-overlay';

const PDropdownM = ({
  title,
  content,
  dropdownClassName,
  dropdownOpen,
  onDropdownOpen,
  onDropdownClose,
}: PDropdownMProps) => (
  <PBox
    className={cx(root, dropdownOpen && rootActive)}
    width="100%"
    height="100%"
    display="grid"
    alignItems="center"
    justifyContent="center"
  >
    <PBox
      className={cx(titleStyles, dropdownOpen && titleActive, 'dropdown-title')}
      height="100%"
      display="grid"
      alignItems="center"
      onClick={e => {
        e.stopPropagation();
        onDropdownOpen && onDropdownOpen();
      }}
    >
      {title}
    </PBox>
    <PBox
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      top="0"
      zIndex={11}
      transition="all 0.3s"
      overflow="auto"
      opacity={dropdownOpen ? 1 : 0}
      visibility={dropdownOpen ? 'visible' : 'hidden'}
      onClick={e => {
        e.stopPropagation();
        onDropdownClose && onDropdownClose();
      }}
    >
      <POverlay
        className={css({
          display: 'grid',
          alignItems: 'end',
          overflow: 'auto',
        })}
      >
        <PBackground
          className={cx('dropdown-menu', dropdownClassName)}
          backgroundColor={theme.pallete.light.common.white}
          borderRadius={`${theme.radius.main} ${theme.radius.main} 0 0`}
          boxShadow={theme.shadow[1]}
          transition="0.2s all 0.1s"
          transform={`translateY(${dropdownOpen ? 0 : '100%'})`}
        >
          <PBackground borderRadius={theme.radius.main} backgroundColor="#ffffff">
            {Array.isArray(content) ? (
              <ul>
                {(content as any[]).map((item, i) => (
                  <li key={`${item?.type}-${i}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <PBox>{content}</PBox>
            )}
          </PBackground>
        </PBackground>
      </POverlay>
    </PBox>
  </PBox>
);

export const PDropdownMMemoized = memo(PDropdownM);
