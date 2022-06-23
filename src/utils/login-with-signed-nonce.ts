import {getNonceService, postLoginService} from 'services/auth';
import {keccak256, toUtf8Bytes} from 'ethers/lib/utils';
import {Signer} from 'types/custom';

export const loginWithSignedNonce = async (
  {
    address,
    signer,
    provider,
  }: {
    address?: string | null;
    signer?: Signer;
    provider?: any;
  },
  onError?: (e: Error) => void
) => {
  try {
    const {
      data: {nonce},
    } = await getNonceService({walletAddress: address});
    let signedNonce: string | undefined;

    if (provider.isMetaMask) {
      signedNonce = signer && (await signer.signMessage(nonce as string));
    }

    if (!provider.isMetaMask) {
      const length = new Blob([nonce as string]).size;
      const message = toUtf8Bytes('\x19Ethereum Signed Message:\n' + length + nonce);
      const hashedMessage = keccak256(message);

      signedNonce = await provider.connector.signMessage([address, hashedMessage]);
    }

    const {
      data: {bearer},
    } = await postLoginService({
      walletAddress: address,
      signedNonce,
    });

    return bearer as string;
  } catch (e) {
    console.error(e);
    onError && onError(e as Error);
  }
};
