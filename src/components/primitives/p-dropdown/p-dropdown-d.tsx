import {cx} from '@emotion/css';
import {memo} from 'react';
import {PDropdownProps} from './p-dropdown.types';
import {PBackground} from '../p-background';
import {root, dropdownMenu, title as titleStyles, rootApplyHover, titleApplyHover} from './p-dropdown.styles';
import {theme} from 'constants/theme';
import {PBox} from '../p-box';

const PDropdownD = ({title, content, dropdownClassName}: PDropdownProps) => (
  <PBox
    className={cx(root, rootApplyHover)}
    width="100%"
    height="100%"
    display="grid"
    alignItems="center"
    justifyContent="center"
  >
    <PBox
      className={cx(titleStyles, titleApplyHover, 'dropdown-title')}
      height="100%"
      display="grid"
      alignItems="center"
      onClick={e => e.stopPropagation()}
    >
      {title}
    </PBox>
    <PBox className={cx('dropdown-menu', dropdownClassName, dropdownMenu)}>
      <PBackground borderRadius={theme.radius.main} backgroundColor="#ffffff">
        {Array.isArray(content) ? (
          <ul>
            {(content as any[]).map((item, i) => (
              <li
                key={`${item?.type}-${i}`}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <PBox>{content}</PBox>
        )}
      </PBackground>
    </PBox>
  </PBox>
);

export const PDropdownDMemoized = memo(PDropdownD);
