import {useNavigate} from 'react-router-dom';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export const PageFallback = ({
  error,
  errorCode,
  resetErrorBoundary,
}: {
  error?: Error;
  errorCode?: '404' | '500';
  resetErrorBoundary?: () => void;
}) => {
  const navigate = useNavigate();
  const {mobile, tablet, desktop} = useCurrentDevice();

  return (
    <main>
      {mobile ? (
        <SectionMainM error={error} errorCode={errorCode} resetErrorBoundary={resetErrorBoundary} navigate={navigate} />
      ) : tablet ? (
        <SectionMainT error={error} errorCode={errorCode} resetErrorBoundary={resetErrorBoundary} navigate={navigate} />
      ) : desktop ? (
        <SectionMainD error={error} errorCode={errorCode} resetErrorBoundary={resetErrorBoundary} navigate={navigate} />
      ) : null}
    </main>
  );
};
