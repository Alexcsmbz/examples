import {PToastView} from 'components/primitives/p-toast-view';
import {useCurrentDevice} from 'hooks';

export const CToastView = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();

  return mobile ? (
    <PToastView position="bottom-center" width="100%" device="mobile" />
  ) : tablet ? (
    <PToastView position="bottom-right" width="400px" />
  ) : desktop ? (
    <PToastView position="bottom-right" width="400px" />
  ) : null;
};
