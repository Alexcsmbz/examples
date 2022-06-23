import {memo} from 'react';
import {theme} from 'constants/theme';
import {PBackground} from '../p-background';
import {PBox} from '../p-box';
import {PTypo} from '../p-typo';
import {socialLinks} from './constants';
import {socialButton} from './p-footer.styles';
import {PFooterSubscribe} from '../p-footer-subscribe/p-footer-subscribe';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';

const PFooterT = () => (
  <footer>
    <PBackground padding="45px 0 55px" backgroundColor={theme.pallete.light.grey[100]}>
      <CAdaptiveBox padding="0 20px">
        <PBox
          // maxWidth="1052px"
          // padding="0 30px"
          // margin="0 auto"
          display="grid"
          gridTemplateColumns="40% auto"
          gridAutoFlow="column"
          justifyContent="space-between"
        >
          <PBox>
            <PBox marginBottom="14px">
              <PTypo bold>Stars Art</PTypo>
            </PBox>
            <PBox>
              <PTypo variant="body2">
                <b>Make your Art deserve the Stars.</b> <br />
                Digital marketplace for crypto collectibles and NFTs. Buy, sell, and discover exclusive digital items.
              </PTypo>
            </PBox>
          </PBox>

          <PBox>
            <PBox marginBottom="43px">
              <PBox marginBottom="16px" display="grid">
                <PTypo bold>Join Stars Art Community</PTypo>
              </PBox>

              <PBox display="grid" gridAutoFlow="column">
                {socialLinks.map(item => (
                  <a
                    key={`sb-${item.title}`}
                    target="_blank"
                    href={item.href}
                    rel="noreferrer noopener"
                    className={socialButton}
                  >
                    {item.icon}
                  </a>
                ))}
              </PBox>
            </PBox>

            <PBox>
              <PBox marginBottom="14px" display="grid">
                <PTypo bold>Get the latest updates</PTypo>
              </PBox>

              <PFooterSubscribe />
            </PBox>
          </PBox>
        </PBox>
      </CAdaptiveBox>
    </PBackground>
  </footer>
);

export const PFooterTMemoized = memo(PFooterT);
