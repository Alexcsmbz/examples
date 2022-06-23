import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {Network} from 'constants/network';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: Network[1].rpcURL,
        137: Network[137].rpcURL,
      },
    },
  },
};

export const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});
