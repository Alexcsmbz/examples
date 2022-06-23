import {Blockchain, ViewTokenType} from 'types/custom';
import {useParams} from 'react-router-dom';
import {useCurrentDevice} from 'hooks';
import {SectionOptionsD, SectionOptionsM, SectionOptionsT} from './components/section-options';

export const PageChooseOptions = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const {tokenType, chainId} = useParams<{tokenType: ViewTokenType; chainId: Blockchain['chainId']}>();

  return (
    <main>
      {mobile ? (
        <SectionOptionsM chainId={chainId!} tokenType={tokenType} />
      ) : tablet ? (
        <SectionOptionsT chainId={chainId!} tokenType={tokenType} />
      ) : desktop ? (
        <SectionOptionsD chainId={chainId!} tokenType={tokenType} />
      ) : null}
    </main>
  );
};
