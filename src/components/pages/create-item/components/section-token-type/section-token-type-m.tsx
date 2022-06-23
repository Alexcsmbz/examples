import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {CBackButton} from 'components/containers/c-back-button';
import {theme} from 'constants/theme';
import {NavigateFunction} from 'react-router-dom';
import {tokenTypes} from '../../constants';
import {Icon} from 'assets/icons';
import {Blockchain} from 'types/custom';

export const SectionTokenTypeM = ({
  navigate,
  chainId,
}: {
  navigate?: NavigateFunction;
  chainId?: Blockchain['chainId'];
}) => {
  return (
    <CAdaptiveBox className="fade-in" padding="15px 20px 40px" position="relative">
      <PBox position="absolute" top="15px" left="25px" paddingTop="10px">
        <CBackButton inline>
          <Icon.ChevronLeft cursor="pointer" />
        </CBackButton>
      </PBox>
      <PBox marginBottom="24px" textAlign="center">
        <PTypo variant="h2">Create new item </PTypo>
        <PTypo>Choose item type</PTypo>
      </PBox>
      <PBox display="grid" justifyContent="center" gridTemplateColumns="repeat(auto-fit, 200px)" margin="0 -20px">
        {tokenTypes.map(({name, image, type, contract}) => (
          <PBox padding="0 10px" minHeight="299px" key={name}>
            <PBox
              display="grid"
              gridTemplateRows="auto auto 1fr"
              textAlign="center"
              overflow="hidden"
              padding="59px 10px 52px"
              height="calc(100% - 22px)"
              marginBottom="22px"
              cursor="pointer"
              boxShadow={theme.shadow[1]}
              borderRadius={theme.radius.main}
              onClick={() => navigate && navigate(`/create-item/${chainId}/${name.toLowerCase()}/choose-options`)}
            >
              <PBox marginBottom="14px">
                <img src={image} alt="" width="80px" height="80px" />
              </PBox>
              <PBox marginBottom="10px">
                <PTypo variant="h2">{name}</PTypo>
              </PBox>
              <PBox>
                <PTypo>{type}</PTypo>
                <PTypo bold>{contract}</PTypo>
              </PBox>
            </PBox>
          </PBox>
        ))}
      </PBox>
    </CAdaptiveBox>
  );
};
