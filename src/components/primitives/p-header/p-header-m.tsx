import {memo} from 'react';
import {PBox} from '../p-box';
import {PHeaderMProps} from './p-header.types';
import {Image} from 'assets/images';
import {Link, NavLink} from 'react-router-dom';
import {navLinks, userLinks} from './constants';
import {PTypo} from '../p-typo';
import {burgerNavLink, searchBar, searchBarActive, stickyHeader} from './p-header.styles';
import {Icon} from 'assets/icons';
import {Route} from 'constants/routes';
import {CSearch} from 'components/containers/c-search';
import {PBurger} from '../p-burger';
import {PSidenav} from '../p-sidenav';
import {PButton} from '../p-button';
import {PLink} from '../p-link';
import {theme} from 'constants/theme';
import {cx} from '@emotion/css';

const PHeaderM = ({
  onLogoutClick,
  path,
  account: {walletConnected, connectedWith},
  onConnectWalletClick,
  burgerActive,
  onBurgerClick,
  onCloseBurgerMenu,
  searchActive,
  onSearchOpen,
  onSearchClose,
}: PHeaderMProps) => (
  <header>
    <PBox paddingTop="54px" />
    <PBox padding="0 20px" height="55px" className={stickyHeader}>
      <PBox
        display="grid"
        height="100%"
        gridAutoFlow="column"
        justifyContent="space-between"
        gap="15px"
        alignItems="center"
      >
        <PBox marginRight="24px">
          {path === Route.home.path ? (
            <PBox display="flex" onClick={onCloseBurgerMenu}>
              <img src={Image.starsArtLogo} width={140} height={23} alt="NFT Stars logo" />
            </PBox>
          ) : (
            <Link to={Route.home.path} onClick={onCloseBurgerMenu}>
              <PBox display="flex">
                <img src={Image.starsArtLogo} width={140} height={23} alt="NFT Stars logo" />
              </PBox>
            </Link>
          )}
        </PBox>

        <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="18px">
          <PBox display="flex" onClick={onSearchOpen}>
            <Icon.Observe width={20} />
          </PBox>
          <PBurger active={burgerActive} onClick={onBurgerClick} />
        </PBox>
      </PBox>

      <PBox
        width="100%"
        height="55px"
        display="grid"
        alignItems="center"
        className={cx(searchBar, searchActive && searchBarActive)}
      >
        <CSearch onSearchClose={onSearchClose} />
      </PBox>

      <PSidenav active={burgerActive}>
        <PBox display="grid" gridTemplateRows="1fr auto" gap="16px" height="100%">
          <PBox>
            {navLinks.map(item => (
              <NavLink
                key={`nav-link-${item.title}`}
                to={item.href}
                className={burgerNavLink}
                onClick={onCloseBurgerMenu}
              >
                <PBox
                  display="grid"
                  gridAutoFlow="column"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="8px"
                  padding="12px 20px 12px 9px"
                  height="60px"
                  borderBottom={`1px solid ${theme.pallete.light.grey[400]}`}
                >
                  <PBox display="grid" gridTemplateColumns="auto 1fr" alignItems="center" gap="2px">
                    <PBox width="48px" display="grid" gridAutoFlow="column" justifyContent="center">
                      {item.icon}
                    </PBox>
                    <PBox>
                      <PTypo variant="h3" regular>
                        {item.title}
                      </PTypo>
                    </PBox>
                  </PBox>

                  <Icon.ChevronRight width={12} height={21} />
                </PBox>
              </NavLink>
            ))}
            {walletConnected &&
              userLinks.map(item => (
                <NavLink
                  key={`nav-link-${item.title}`}
                  to={item.href}
                  className={burgerNavLink}
                  onClick={onCloseBurgerMenu}
                >
                  <PBox
                    display="grid"
                    gridAutoFlow="column"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="8px"
                    padding="12px 20px 12px 9px"
                    height="60px"
                    borderBottom={`1px solid ${theme.pallete.light.grey[400]}`}
                  >
                    <PBox display="grid" gridTemplateColumns="auto 1fr" alignItems="center" gap="2px">
                      <PBox width="48px" display="grid" gridAutoFlow="column" justifyContent="center">
                        {item.icon}
                      </PBox>
                      <PBox>
                        <PTypo variant="h3" regular>
                          {item.title}
                        </PTypo>
                      </PBox>
                    </PBox>
                    <Icon.ChevronRight width={12} height={21} />
                  </PBox>
                </NavLink>
              ))}
          </PBox>

          <PBox padding="0 20px" display="grid" gap="15px">
            <PBox onClick={onCloseBurgerMenu}>
              <PLink variant="secondary" asButton fullWidth to={Route.chooseBlockchain.path}>
                <Icon.AddItem />
                Create Item
              </PLink>
            </PBox>

            {walletConnected ? (
              <PButton
                variant="secondary"
                fullWidth
                onClick={() => {
                  onLogoutClick && onLogoutClick();
                  onCloseBurgerMenu && onCloseBurgerMenu();
                }}
              >
                <Icon.Wallet stroke={theme.pallete.light.primary.main} />
                Disconnect wallet
              </PButton>
            ) : (
              <PButton
                variant="primary"
                fullWidth
                onClick={() => {
                  onConnectWalletClick && onConnectWalletClick();
                  onCloseBurgerMenu && onCloseBurgerMenu();
                }}
              >
                <Icon.Wallet />
                Connect wallet
              </PButton>
            )}
          </PBox>
        </PBox>
      </PSidenav>
    </PBox>
  </header>
);

export const PHeaderMMemoized = memo(PHeaderM);
