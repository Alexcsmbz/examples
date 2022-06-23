import {Contract, ethers, providers} from 'ethers';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {useProvider} from './use-wallet';

export const useContract = (contractAddress: string, ABI: any) => {
  const {address} = useSelector(userAccountSelector);
  const {provider} = useProvider();
  const web3provider = provider && new providers.Web3Provider(provider);
  const signer = web3provider && web3provider.getSigner();

  return useMemo(() => {
    const defaultProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    if (!contractAddress || !ABI) return null;
    if (!signer) return new Contract(contractAddress, ABI, defaultProvider);
    try {
      return new Contract(contractAddress, ABI, signer);
    } catch (error) {
      console.error('Failed to use-contract: ', error);
      return null;
    }
  }, [contractAddress, ABI, address, provider]);
};
