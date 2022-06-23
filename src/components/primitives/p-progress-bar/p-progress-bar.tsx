import {memo} from 'react';
import {progressCircle, roundPerRotation, linear} from './p-progress-bar.styles';
import {PBox} from '../p-box';
import {cx} from '@emotion/css';
import {PTypo} from '../p-typo';
import {PProgressBarProps} from './p-progress-bar.types';

const PProgressBar = ({className, size, progress, type}: PProgressBarProps) =>
  type === 'linear' ? (
    <PBox className={className} display="grid" gridAutoFlow="column" alignItems="center" gap="24px">
      <PBox className={linear(progress)} position="relative" />
      <PTypo>{progress}%</PTypo>
    </PBox>
  ) : (
    <PBox
      className={cx(progressCircle, roundPerRotation(progress), className)}
      width={`${size}px`}
      height={`${size}px`}
    >
      <PTypo variant="body2">{progress}%</PTypo>
    </PBox>
  );

export const PProgressBarMemoized = memo(PProgressBar);
