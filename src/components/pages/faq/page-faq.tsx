import {PBox} from 'components/primitives/p-box';
import {PLoader} from 'components/primitives/p-loader';
import {useEffect, useState} from 'react';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export const PageFaq = () => {
  const [loading, setLoading] = useState(true);
  const {desktop, tablet, mobile} = useCurrentDevice();

  useEffect(() => {
    setTimeout(() => setLoading(false), 250);
  });

  return (
    <main>
      {loading ? (
        <PBox display="grid" alignContent="center" justifyItems="center" height="100%">
          <PLoader size={50} />
        </PBox>
      ) : mobile ? (
        <SectionMainM />
      ) : tablet ? (
        <SectionMainT />
      ) : desktop ? (
        <SectionMainD />
      ) : null}
    </main>
  );
};
