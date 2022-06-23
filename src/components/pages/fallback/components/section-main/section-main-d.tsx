import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PBox} from 'components/primitives/p-box';
import {Image} from 'assets/images';
import {PTypo} from 'components/primitives/p-typo';
import {PButton} from 'components/primitives/p-button';
import {Route} from 'constants/routes';
import {theme} from 'constants/theme';
import {errorCodeTitle} from '../../page-pallback.styles';

export const SectionMainD = ({
  error,
  errorCode,
  navigate,
  resetErrorBoundary,
}: {
  error?: Error;
  errorCode?: '404' | '500';
  navigate?: any;
  resetErrorBoundary?: () => void;
}) => {
  return (
    <CAdaptiveBox maxWidth="1260px" marginTop="48px" marginBottom="89px" padding="0 30px" className="fade-in">
      <PBox display="grid" justifyItems="center" gap="24px">
        <PBox display="grid" justifyItems="center" gap="16px">
          <img src={Image.rocket} width={237} height={136} alt="fallback rocket" />
          <PBox textAlign="center">
            {errorCode && (
              <PBox marginBottom="15px">
                <PTypo
                  variant="h1"
                  color={theme.pallete.light.primary.light}
                  regular
                  className={errorCodeTitle('80px')}
                >
                  {errorCode}
                </PTypo>
              </PBox>
            )}

            <PTypo variant="h3">Ouch!!!</PTypo>
            <PTypo>
              Something went wrong... <br /> Maybe it's a flash on the moon. <br /> We're already fixing it. Soon
              everything will work!
            </PTypo>
          </PBox>
        </PBox>
        <PButton
          variant="secondary"
          onClick={() => {
            resetErrorBoundary && resetErrorBoundary();
            console.error(`Error from boundary: ${error?.message}`);
            console.error(error);
            navigate(Route.home.path);
          }}
        >
          Go to home
        </PButton>
      </PBox>
    </CAdaptiveBox>
  );
};
