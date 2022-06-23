import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {FormCreateItem} from 'components/forms/create-item';
import {CBackButton} from 'components/containers/c-back-button';
import {Icon} from 'assets/icons';
import {Blockchain} from 'types/custom';

export const SectionOptionsM = ({tokenType, chainId}: {tokenType?: string; chainId: Blockchain['chainId']}) => {
  return (
    <CAdaptiveBox className="fade-in" padding="15px 20px 40px" position="relative">
      <PBox
        display="grid"
        gridAutoFlow="column"
        justifyContent="start"
        alignItems="baseline"
        gap="20px"
        marginBottom="33px"
      >
        <CBackButton inline>
          <Icon.ChevronLeft cursor="pointer" />
        </CBackButton>
        <PTypo variant="h2">Create {tokenType} item</PTypo>
      </PBox>
      <FormCreateItem chainId={chainId} />
    </CAdaptiveBox>
  );
};
