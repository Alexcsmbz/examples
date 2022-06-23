import {web3Modal} from 'constants/web3-modal';

export const connectToWallet = async (setProvider: (provider: any) => void) => {
  try {
    const provider = await web3Modal.connect();
    setProvider(provider);
  } catch (e) {
    console.error(e);
  }
};
