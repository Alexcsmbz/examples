import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo, useEffect, useState} from 'react';
import {PLoader} from 'components/primitives/p-loader';
import Cookies from 'js-cookie';
import {loginWithSignedNonce} from 'utils/login-with-signed-nonce';
import {useSelector} from 'react-redux';
import {userAccountSelector} from 'store/user/selectors';
import {usePopup} from 'hooks';
import {Signer} from 'types/custom';

const PopupSignIn = ({onClose, signer, provider}: {onClose: () => void; signer: Signer; provider: any}) => {
  const {address} = useSelector(userAccountSelector);
  const {close: closePopupSignIn} = usePopup();
  const [hasToken, setHasToken] = useState(Cookies.get('token'));

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<Error>();

  const onSignInClick = async ({
    address,
    signer,
    provider,
  }: {
    address?: string | null;
    signer: Signer;
    provider: any;
  }) => {
    if (!hasToken) {
      setError(undefined);
      setLoading(true);
      const token = await loginWithSignedNonce({address, signer, provider}, e => setError(e));
      setLoading(false);
      setHasToken(token);
      Cookies.set('token', token as string, {path: ''});
    }
  };

  useEffect(() => {
    if (hasToken) closePopupSignIn();
  }, [hasToken]);

  return (
    <PopupBase
      onCrossClick={onClose}
      open
      withoutImage
      title="Sign in"
      buttons={{
        confirm: {name: 'Sign in', onClick: () => onSignInClick({signer, provider, address}), type: 'button'},
        reject: {name: 'Cancel', onClick: closePopupSignIn},
      }}
    >
      <PBox display="grid" gap="16px" textAlign="center">
        <div>
          <PTypo>Press “Sign in” for subscribe.</PTypo>
          <PTypo bold>If you do not subscribe - the market will work with limited functionality!</PTypo>
        </div>
        <PBox display="grid" gridAutoFlow="column" justifyContent="center" alignItems="center" gap="16px" height="48px">
          {loading && (
            <>
              <PTypo>Signing...</PTypo>
              <PLoader />
            </>
          )}
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupSignInMemoized = memo(PopupSignIn);
