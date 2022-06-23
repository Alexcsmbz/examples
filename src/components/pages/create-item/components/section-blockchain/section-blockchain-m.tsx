import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {theme} from 'constants/theme';
import {blockchains} from '../../constants';
import {PButton} from 'components/primitives/p-button';
import {SectionBlockchainProps} from './section-blockchain.types';

export const SectionBlockchainM = ({chooseBlockchain}: SectionBlockchainProps) => {
  return (
    <CAdaptiveBox className="fade-in" padding="15px 20px 40px">
      <PBox marginBottom="24px" textAlign="center">
        <PTypo variant="h2">Create new item </PTypo>
        <PTypo>Choose Blockchain</PTypo>
      </PBox>
      <PBox display="grid" justifyContent="center" gridTemplateColumns="repeat(auto-fit, 200px)" margin="0 -8px">
        {blockchains.map(b => (
          <PBox padding="0 8px" key={b.name}>
            <PBox
              display="grid"
              gridTemplateRows="auto 1fr auto"
              textAlign="center"
              overflow="hidden"
              padding="59px 30px 38px"
              height="calc(100% - 22px)"
              marginBottom="22px"
              boxShadow={theme.shadow[1]}
              borderRadius={theme.radius.main}
            >
              <PBox marginBottom="14px">
                <img src={b.image} alt={b.name} width="80px" height="80px" />
              </PBox>
              <PBox marginBottom="23px">
                <PTypo variant="h2">{b.name}</PTypo>
              </PBox>
              <PButton
                variant={b.enable ? 'primary' : 'secondary'}
                disabled={!b.enable}
                fullWidth
                onClick={() => chooseBlockchain && chooseBlockchain({blockchain: b})}
              >
                {b.enable ? 'Choose' : 'Coming soon'}
              </PButton>
            </PBox>
          </PBox>
        ))}
      </PBox>
    </CAdaptiveBox>
  );
};
