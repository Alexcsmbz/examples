import {memo} from 'react';
import {PBox} from '../p-box';
import {PHeaderProps} from './p-header.types';
import {Image} from 'assets/images';
import {Link, NavLink} from 'react-router-dom';
import {navLinks, userLinks} from './constants';
import {PButton} from '../p-button';
import {PTypo} from '../p-typo';
import {dropdownButton, link} from './p-header.styles';
import {Icon} from 'assets/icons';
import {cx} from '@emotion/css';
import {Route} from 'constants/routes';
import {PLink} from '../p-link';
import {CSearch} from 'components/containers/c-search';
import {PAvatar} from '../p-avatar';
import {CDropdown} from 'components/containers/c-dropdown';

const PHeaderD = ({
  onLogoutClick,
  path,
  account: {walletConnected, connectedWith},
  profile,
  onConnectWalletClick,
}: PHeaderProps) => (
  <header>
    <PBox padding="16px 16px 16px">
      <PBox
        display="grid"
        gridTemplateColumns="auto auto"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="9px"
      >
        <PBox display="grid" gridAutoFlow="column" alignItems="center">
          <PBox marginRight="24px">
            {path === Route.home.path ? (
              <div>
                <img src={Image.starsArtLogo} width={140} height={23} alt="NFT Stars logo" />
              </div>
            ) : (
              <Link to={Route.home.path}>
                <img src={Image.starsArtLogo} width={140} height={23} alt="NFT Stars logo" />
              </Link>
            )}
          </PBox>
          <PBox width="350px">
            <CSearch />
          </PBox>
        </PBox>

        <PBox display="grid" gridAutoFlow="column" alignItems="center">
          <PBox display="grid" gridAutoFlow="column" gap="30px">
            {navLinks.map(item => (
              <NavLink key={`nav-link-${item.title}`} to={item.href} className={link}>
                <PTypo>{item.title}</PTypo>
              </NavLink>
            ))}
          </PBox>

          <PBox display="grid" gridAutoFlow="column" gap="16px" marginLeft="27px">
            <PLink asButton variant="secondary" defaultWidth="150px" to={Route.chooseBlockchain.path}>
              + Create Item
            </PLink>

            {walletConnected ? (
              <CDropdown
                title={
                  <PBox display="grid" gridAutoFlow="column" alignItems="center" gap="10px" cursor="pointer">
                    <PBox
                      className={cx(dropdownButton, 'dropdown-button')}
                      display="grid"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {profile.avatarUrl ? <PAvatar size="48px" src={profile.avatarUrl} /> : <Icon.User />}
                    </PBox>
                    <PBox className="arrow">
                      <Icon.ChevronDown />
                    </PBox>
                  </PBox>
                }
                content={[
                  ...userLinks.map(item => (
                    <Link to={item.href}>
                      <PBox
                        className="menu-link"
                        display="grid"
                        gridTemplateColumns="auto 1fr"
                        alignItems="center"
                        gap="8px"
                        padding="12px 8px"
                      >
                        <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                          {item.icon}
                        </PBox>
                        <PBox>
                          <PTypo variant="body1">{item.title}</PTypo>
                        </PBox>
                      </PBox>
                    </Link>
                  )),
                  connectedWith === 'WalletConnect' ? (
                    <PBox
                      className="menu-link"
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                      gap="8px"
                      padding="12px 8px"
                      onClick={onLogoutClick}
                    >
                      <PBox width="32px" display="grid" gridAutoFlow="column" justifyContent="center">
                        <Icon.SignOut />
                      </PBox>
                      <PBox>
                        <PTypo variant="body1">Sign out</PTypo>
                      </PBox>
                    </PBox>
                  ) : null,
                ]}
              />
            ) : (
              <PButton onClick={onConnectWalletClick} variant="primary">
                Connect Wallet
              </PButton>
            )}
          </PBox>
        </PBox>
      </PBox>
    </PBox>
  </header>
);

export const PHeaderDMemoized = memo(PHeaderD);
