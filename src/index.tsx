import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as StoreProvider} from 'react-redux';
import {store} from 'store';
import {CApp} from 'components/containers/c-app/c-app';
import {PopupProvider, WalletProvider} from 'hooks';
import {Helmet} from 'react-helmet';
import {theme} from 'constants/theme';

//TODO: Add all document in react app via react-helmet

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <>
    {process.env.REACT_APP_STAGE === 'production' && (
      <Helmet>
        <script>
          {`
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-N6LJL8H');
          `}
        </script>

        <script>
          {`
            (function(m, e, t, r, i, k, a) {
              m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
              };

              m[i].l = 1 * new Date();
              k = e.createElement(t), 
              a = e.getElementsByTagName(t)[0], 
              k.async = 1, 
              k.src = r, 
              a.parentNode.insertBefore(k, a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(87099455, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `}
        </script>
      </Helmet>
    )}
    <Helmet>
      <meta name="theme-color" content={theme.pallete.light.common.white} />
    </Helmet>
    <BrowserRouter>
      <WalletProvider>
        <PopupProvider>
          <StoreProvider store={store}>
            <CApp />
          </StoreProvider>
        </PopupProvider>
      </WalletProvider>
    </BrowserRouter>
  </>
);
