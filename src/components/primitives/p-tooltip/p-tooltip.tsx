import {memo} from 'react';
import {PTooltipProps} from './p-tooltip.types';
import {tooltip, root, tooltipTitle} from './p-tooltip.styles';
import {PBox} from '../p-box';
import {cx} from '@emotion/css';
import {PBackground} from '../p-background';
import {theme} from 'constants/theme';
import {PTypo} from '../p-typo';

const PTooltip = ({title, desc, type = theme.pallete.light.grey[900], place, className}: PTooltipProps) => (
  <PBox display="grid" alignContent="start" alignItems="center" justifyContent="start">
    <PBox className={cx(root, className)} position="relative">
      <PBox className={tooltipTitle} cursor="pointer" margin="0 16px 0 0" display="grid" alignItems="center">
        {title}
      </PBox>
      {desc && (
        <PBackground
          backgroundColor={type}
          borderRadius={theme.radius.main}
          position="absolute"
          padding="8px"
          minWidth="134px"
          maxWidth="314px"
          width="100%"
          className={cx(tooltip({place}), 'tooltip-desc')}
        >
          <PTypo variant="body3" color={theme.pallete.light.common.white}>
            {desc}
          </PTypo>
        </PBackground>
      )}
    </PBox>
  </PBox>
);

export const PTooltipMemoized = memo(PTooltip);
