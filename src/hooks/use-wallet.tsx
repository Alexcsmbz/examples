import {ReactNode, useContext, useEffect, useState} from 'react';
import {Signer, Wallet} from 'types/custom';
import {providers} from 'ethers';
import {web3Modal} from 'constants/web3-modal';
import {WalletContext} from 'constants/contexts';
import Cookies from 'js-cookie';

export const useWallet = ({
  onConnect,
  onDisconnect,
}: {
  onConnect?: ({provider}: {provider: any; address: string; connectedWith: Wallet; signer: Signer}) => void;
  onDisconnect?: () => void;
}) => {
  const {provider, setProvider} = useContext(WalletContext);

  useEffect(() => {
    const web3provider = provider && new providers.Web3Provider(provider);
    const signer = web3provider && web3provider.getSigner();

    if (provider) {
      onConnect &&
        onConnect({
          provider,
          address: provider.isMetaMask ? provider.selectedAddress : provider.accounts[0],
          signer,
          connectedWith: provider.isMetaMask ? 'MetaMask' : 'WalletConnect',
        });
    }

    provider?.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) {
        onDisconnect && onDisconnect();
      } else {
        Cookies.remove('token', {path: ''});

        onConnect &&
          onConnect({
            provider,
            address: provider.isMetaMask ? provider.selectedAddress : provider.accounts[0],
            signer,
            connectedWith: provider.isMetaMask ? 'MetaMask' : 'WalletConnect',
          });
      }
    });

    provider?.on('disconnect', () => {
      onDisconnect && onDisconnect();
    });
  }, [provider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      (async () => {
        const provider = await web3Modal.connect();
        setProvider(provider);
      })();
    }
  }, []);
};

export const useProvider = () => useContext(WalletContext);

export const WalletProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState({provider: null, setProvider: (provider: any) => setState({...state, provider})});

  return <WalletContext.Provider value={state}>{children}</WalletContext.Provider>;
};
