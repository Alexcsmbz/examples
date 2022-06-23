import {useGlobalStyles, useDeviceDetector, usePopup} from 'hooks';
import {CHeader} from '../c-header';
import {Router} from 'router';
import {CFooter} from '../c-footer';
import {useEffect} from 'react';
import {PBox} from 'components/primitives/p-box';
import {useLocation} from 'react-router-dom';
import {PopupView, useWallet} from 'hooks';
import {useDispatch} from 'react-redux';
import {setAccount, setProfile} from 'store/user/slice-user';
import {CScrollTop} from '../c-scroll-top';
import {PopupSignIn} from 'components/popups/sign-in';
import Cookies from 'js-cookie';
import {web3Modal} from 'constants/web3-modal';
import {DeviceContext} from 'constants/contexts';
import {initialProfile} from 'constants/common';
import {CToastView} from '../c-toast-view';

export const CApp = () => {
  const {ref, device} = useDeviceDetector();
  const {pathname} = useLocation();
  const {show} = usePopup();
  const dispatch = useDispatch();

  useGlobalStyles();

  useWallet({
    onConnect: ({address, connectedWith, signer, provider}) => {
      dispatch(setAccount({address, walletConnected: true, connectedWith}));

      if (!Cookies.get('token')) {
        show(PopupSignIn, {signer, provider});
      }
    },
    onDisconnect: () => {
      Cookies.remove('token', {path: ''});
      web3Modal.clearCachedProvider();
      dispatch(setAccount({address: null, walletConnected: false, connectedWith: null}));
      dispatch(setProfile(initialProfile));
    },
  });

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <DeviceContext.Provider value={device}>
      <PBox display="grid" gridTemplateRows={`auto 1fr ${device.mobile ? 0 : 'auto'}`} height="100%" ref={ref}>
        <CHeader />
        <Router />
        <CFooter />
      </PBox>
      <CScrollTop />
      <PopupView />
      <CToastView />
    </DeviceContext.Provider>
  );
};
