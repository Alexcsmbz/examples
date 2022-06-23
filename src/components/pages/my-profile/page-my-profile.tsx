import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export const PageMyProfile = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();

  return <main>{mobile ? <SectionMainM /> : tablet ? <SectionMainT /> : desktop ? <SectionMainD /> : null}</main>;
};
