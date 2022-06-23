import {memo} from 'react';
import {PAccordionProps} from './p-accordion.types';
import {root, accordionTitle, accordionContent} from './p-accordion.styles';
import {PBox} from '../p-box';
import {cx} from '@emotion/css';
import {PBackground} from '../p-background';
import {theme} from 'constants/theme';
import {PTypo} from '../p-typo';
import {Icon} from 'assets/icons';

const PAccordion = ({title, content, className, open, onClick}: PAccordionProps) => (
  <PBox className={cx(root, className)} position="relative">
    <PBackground
      className={cx(accordionTitle, open && 'active')}
      backgroundColor={open ? `${theme.pallete.light.grey[500]}20` : ''}
      padding="10px 16px 11px"
      onClick={onClick}
    >
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="center">
        <PTypo variant="h3" color={open ? theme.pallete.light.primary.light : theme.pallete.light.grey[800]}>
          {title}
        </PTypo>

        <Icon.ChevronDown width={21} height={12} stroke={theme.pallete.light.grey[900]} />
      </PBox>
    </PBackground>
    <PBackground className={cx(accordionContent, open && 'active')} width="100%">
      <PBox padding="16px 16px" borderTop={`1px solid ${theme.pallete.light.grey[500]}`} paddingRight="10%">
        {content}
      </PBox>
    </PBackground>
  </PBox>
);

export const PAccordionMemoized = memo(PAccordion);
