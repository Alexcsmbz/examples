import {UserProfile} from 'types/api';
import {Account} from 'types/custom';

export type PHeaderProps = {
  account: Account;
  profile: UserProfile;
  onLogoutClick?: () => void;
  onConnectWalletClick?: () => void;
  path?: string;
};

export type PHeaderMProps = {
  onBurgerClick?: () => void;
  onCloseBurgerMenu?: () => void;
  burgerActive?: boolean;
  searchActive?: boolean;
  onSearchOpen?: () => void;
  onSearchClose?: () => void;
} & PHeaderProps;
