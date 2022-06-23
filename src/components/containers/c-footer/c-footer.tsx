import {PFooterD, PFooterM, PFooterT} from 'components/primitives/p-footer';
import {useCurrentDevice} from 'hooks';

export const CFooter = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();

  return mobile ? <PFooterM /> : tablet ? <PFooterT /> : desktop ? <PFooterD /> : null;
};
