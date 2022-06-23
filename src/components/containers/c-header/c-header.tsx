import {PHeaderD, PHeaderM, PHeaderT} from 'components/primitives/p-header';
import {useCurrentDevice} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {userAccountSelector, userProfileSelector} from 'store/user/selectors';
import {useProvider} from 'hooks';
import Web3 from 'web3';
import {connectToWallet} from 'utils/conneсt-to-wallet';
import {useEffect, useState} from 'react';
import {getProfileAction} from 'store/user/actions';

export const CHeader = () => {
  const dispatch = useDispatch();
  const {mobile, tablet, desktop} = useCurrentDevice();
  const [burgerActive, setBurgerActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const account = useSelector(userAccountSelector);
  const profile = useSelector(userProfileSelector);
  const {pathname} = useLocation();
  const {setProvider, provider} = useProvider();

  useEffect(() => {
    if (account.address) dispatch(getProfileAction({wallet: account.address!}));
  }, [account.address]);

  return mobile ? (
    <PHeaderM
      account={account}
      profile={profile}
      path={pathname}
      onConnectWalletClick={() => connectToWallet(setProvider)}
      onLogoutClick={async () => {
        try {
          const web3 = new Web3(provider);
          if (web3 && web3.currentProvider && (web3?.currentProvider as any)?.close) {
            await (web3.currentProvider as any).close();
          }
        } catch (e) {
          console.error(e);
        }
      }}
      burgerActive={burgerActive}
      onBurgerClick={() => setBurgerActive(!burgerActive)}
      onCloseBurgerMenu={() => setBurgerActive(false)}
      searchActive={searchActive}
      onSearchOpen={() => setSearchActive(!searchActive)}
      onSearchClose={() => setSearchActive(false)}
    />
  ) : tablet ? (
    <PHeaderT
      account={account}
      profile={profile}
      path={pathname}
      onConnectWalletClick={() => connectToWallet(setProvider)}
      onLogoutClick={async () => {
        try {
          const web3 = new Web3(provider);
          if (web3 && web3.currentProvider && (web3?.currentProvider as any)?.close) {
            await (web3.currentProvider as any).close();
          }
        } catch (e) {
          console.error(e);
        }
      }}
      burgerActive={burgerActive}
      onBurgerClick={() => setBurgerActive(!burgerActive)}
      onCloseBurgerMenu={() => setBurgerActive(false)}
      searchActive={searchActive}
      onSearchOpen={() => setSearchActive(!searchActive)}
      onSearchClose={() => setSearchActive(false)}
    />
  ) : desktop ? (
    <PHeaderD
      account={account}
      profile={profile}
      path={pathname}
      onConnectWalletClick={() => connectToWallet(setProvider)}
      onLogoutClick={async () => {
        try {
          const web3 = new Web3(provider);
          if (web3 && web3.currentProvider && (web3?.currentProvider as any)?.close) {
            await (web3.currentProvider as any).close();
          }
        } catch (e) {
          console.error(e);
        }
      }}
    />
  ) : null;
};
