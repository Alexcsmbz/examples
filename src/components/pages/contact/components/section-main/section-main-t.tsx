import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {FormContact} from 'components/forms/contact';

export const SectionMainT = () => {
  return (
    <CAdaptiveBox className="fade-in" padding="16px 20px 40px">
      <PBox marginBottom="16px">
        <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
          <PTypo variant="h2">Submit a request</PTypo>
        </PBox>
      </PBox>

      <FormContact />
    </CAdaptiveBox>
  );
};
