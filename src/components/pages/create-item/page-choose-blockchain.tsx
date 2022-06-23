import {useNavigate} from 'react-router-dom';
import {useCurrentDevice, usePopup, useProvider} from 'hooks';
import {SectionBlockchainM, SectionBlockchainT, SectionBlockchainD} from './components/section-blockchain';
import {PopupSwitchNetwork} from 'components/popups/switch-network';
import {SectionBlockchainProps} from './components/section-blockchain/section-blockchain.types';

export const PageChooseBlockchain = () => {
  const navigate = useNavigate();
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {provider} = useProvider();
  const {show} = usePopup();

  const chooseBlockchain: SectionBlockchainProps['chooseBlockchain'] = ({blockchain}) => {
    if (
      blockchain.name === 'Ethereum' &&
      process.env.REACT_APP_STAGE !== 'production' &&
      Number(provider?.chainId) !== 3
    ) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: 3,
        onSwitch: () => navigate && navigate(`/create-item/${blockchain.chainId}`),
      });

      return;
    } else if (
      blockchain.name === 'Ethereum' &&
      process.env.REACT_APP_STAGE === 'production' &&
      Number(provider?.chainId) !== 1
    ) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: 1,
        onSwitch: () => navigate && navigate(`/create-item/${blockchain.chainId}`),
      });

      return;
    }

    if (blockchain.name === 'Polygon' && Number(provider?.chainId) !== 137) {
      show(PopupSwitchNetwork, {
        provider,
        chainId: 137,
        onSwitch: () => navigate && navigate(`/create-item/${blockchain.chainId}`),
      });

      return;
    }

    navigate && navigate(`/create-item/${blockchain.chainId}`);
  };

  return (
    <main>
      {mobile ? (
        <SectionBlockchainM chooseBlockchain={chooseBlockchain} />
      ) : tablet ? (
        <SectionBlockchainT chooseBlockchain={chooseBlockchain} />
      ) : desktop ? (
        <SectionBlockchainD chooseBlockchain={chooseBlockchain} />
      ) : null}
    </main>
  );
};
