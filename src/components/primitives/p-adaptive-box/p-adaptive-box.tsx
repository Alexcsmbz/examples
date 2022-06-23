import {memo} from 'react';
import {PBox} from '../p-box';
import {PAdaptiveBoxProps} from './p-adaptive-box.types';

const PAdaptiveBox = ({children, ...stylesProps}: PAdaptiveBoxProps) => (
  <PBox margin="0 auto" {...stylesProps}>
    {children}
  </PBox>
);

export const PAdaptiveBoxMemoized = memo(PAdaptiveBox);
