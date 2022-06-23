import {PAdaptiveBox} from 'components/primitives/p-adaptive-box';
import {PAdaptiveBoxProps} from 'components/primitives/p-adaptive-box/p-adaptive-box.types';
import {useCurrentDevice} from 'hooks';
import {memo} from 'react';

const CAdaptiveBox = ({children, className, ...stylesProps}: PAdaptiveBoxProps) => {
  const {mobile, tablet, desktop} = useCurrentDevice();

  return (
    <PAdaptiveBox className={className} padding={`0 ${mobile ? 20 : tablet || desktop ? 120 : 5}px`} {...stylesProps}>
      {children}
    </PAdaptiveBox>
  );
};

export const CAdaptiveBoxMemoized = memo(CAdaptiveBox);
