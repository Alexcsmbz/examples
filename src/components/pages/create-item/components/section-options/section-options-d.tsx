import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {FormCreateItem} from 'components/forms/create-item';
import {CBackButton} from 'components/containers/c-back-button';
import {Icon} from 'assets/icons';
import {Blockchain} from 'types/custom';

export const SectionOptionsD = ({tokenType, chainId}: {tokenType?: string; chainId: Blockchain['chainId']}) => {
  return (
    <CAdaptiveBox className="fade-in" maxWidth="1260px" width="100%" padding="0 30px" position="relative">
      <PBox marginBottom="89px" marginTop="7px">
        <PBox
          display="grid"
          gridAutoFlow="column"
          justifyContent="start"
          alignItems="baseline"
          gap="24px"
          marginBottom="33px"
        >
          <CBackButton inline>
            <Icon.ChevronLeft cursor="pointer" />
          </CBackButton>
          <PTypo variant="h1">Create {tokenType} item</PTypo>
        </PBox>
        <FormCreateItem chainId={chainId} />
      </PBox>
    </CAdaptiveBox>
  );
};
