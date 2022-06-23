import {PBox} from 'components/primitives/p-box';
import {PLoader} from 'components/primitives/p-loader';
import {PTypo} from 'components/primitives/p-typo';
import {usePopup} from 'hooks';
import {memo, useEffect, useState} from 'react';
import {PopupBase} from '../base';

const PopupSwitchNetwork = ({
  onClose,
  provider,
  chainId,
  onSwitch,
}: {
  onClose: () => void;
  provider?: any;
  chainId?: number;
  onSwitch?: () => void;
}) => {
  const {close: closePopupSwitchNetwork} = usePopup();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<Error>();

  const onSwitchClick = async ({provider, chainId}: {provider?: any; chainId?: number}) => {
    setError(undefined);
    setLoading(true);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: `0x${chainId?.toString(16)}`}],
      });

      closePopupSwitchNetwork();
      onSwitch && onSwitch();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Number(provider?.chainId) === chainId) closePopupSwitchNetwork();
  }, [provider]);

  return (
    <PopupBase
      onCrossClick={onClose}
      open
      withoutImage
      title="Switch network"
      buttons={{
        confirm: {name: 'Switch', onClick: () => onSwitchClick({provider, chainId}), type: 'button'},
        reject: {name: 'Cancel', onClick: closePopupSwitchNetwork},
      }}
    >
      <PBox display="grid" gap="16px" textAlign="center">
        <div>
          <PTypo>Press “Switch” for changing network.</PTypo>
          <PTypo bold>If you do not change network - the market will work with limited functionality!</PTypo>
        </div>
        <PBox display="grid" gridAutoFlow="column" justifyContent="center" alignItems="center" gap="16px" height="48px">
          {loading && (
            <>
              <PTypo>Switching...</PTypo>
              <PLoader />
            </>
          )}
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupSwitchNetworkMemoized = memo(PopupSwitchNetwork);
