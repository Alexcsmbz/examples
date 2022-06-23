import {Icon} from 'assets/icons';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';
import {SelectOption} from 'types/custom';
import {PBackground} from 'components/primitives/p-background';
import {memo} from 'react';

const MultiValue = ({value, onCrossClick}: {value: SelectOption; onCrossClick: (value: SelectOption) => void}) => (
  <PBox width="fit-content" borderRadius={theme.radius.main} overflow="hidden">
    <PBackground backgroundColor={theme.pallete.light.primary.main}>
      <PBox
        padding="4px 12px"
        display="grid"
        gridAutoFlow="column"
        justifyContent="start"
        alignItems="center"
        gap="24px"
      >
        <PTypo variant="body3" color={theme.pallete.light.common.white}>
          {value.label}
        </PTypo>
        <Icon.Cross
          onClick={() => onCrossClick(value)}
          width={8}
          height={8}
          fill={theme.pallete.light.common.white}
          cursor="pointer"
        />
      </PBox>
    </PBackground>
  </PBox>
);

export const MultiValueMemoized = memo(MultiValue);
