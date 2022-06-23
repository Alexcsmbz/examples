import {useNavigate, useParams} from 'react-router-dom';
import {Blockchain} from 'types/custom';
import {useCurrentDevice} from 'hooks';
import {SectionTokenTypeD, SectionTokenTypeM, SectionTokenTypeT} from './components/section-token-type';

export const PageChooseTokenType = () => {
  const navigate = useNavigate();
  const {chainId} = useParams<{chainId: Blockchain['chainId']}>();
  const {mobile, tablet, desktop} = useCurrentDevice();

  return (
    <main>
      {mobile ? (
        <SectionTokenTypeM chainId={chainId} navigate={navigate} />
      ) : tablet ? (
        <SectionTokenTypeT chainId={chainId} navigate={navigate} />
      ) : desktop ? (
        <SectionTokenTypeD chainId={chainId} navigate={navigate} />
      ) : null}
    </main>
  );
};
