import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {FormProfile} from 'components/forms/profile';

export const SectionMainD = () => {
  return (
    <CAdaptiveBox className="fade-in" maxWidth="1230px" padding="16px 15px">
      <PBox marginBottom="89px">
        <PBox marginBottom="16px">
          <PBox display="grid" gridAutoFlow="column" justifyContent="start" alignItems="baseline" gap="24px">
            <PTypo variant="h1">My profile</PTypo>
          </PBox>
        </PBox>

        <FormProfile />
      </PBox>
    </CAdaptiveBox>
  );
};
