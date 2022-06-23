import {PBackground} from 'components/primitives/p-background';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {theme} from 'constants/theme';

export const HeadRow = () => (
  <PBox display="grid" gridAutoFlow="column" gridTemplateColumns="194px 194px 156px 156px 200px 206px 177px">
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>Event</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>Hash</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>Date</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>Price</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>From</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>To</PTypo>
      </PBox>
    </PBackground>
    <PBackground borderTop={`1px solid ${theme.pallete.light.grey[500]}`}>
      <PBox padding="12px">
        <PTypo>Status</PTypo>
      </PBox>
    </PBackground>
  </PBox>
);
