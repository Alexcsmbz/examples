import {PScrollTopD, PScrollTopM, PScrollTopT} from 'components/primitives/p-scroll-top';
import {useCurrentDevice} from 'hooks';
import {useEffect, useState} from 'react';

export const CScrollTop = () => {
  const [showButton, setShowButton] = useState(false);
  const {mobile, tablet, desktop} = useCurrentDevice();

  const toggleButton = () => {
    if (window.pageYOffset > window.innerHeight / 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleButton);

    return () => {
      window.removeEventListener('scroll', toggleButton);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return mobile ? (
    <PScrollTopM show={showButton} onClick={handleScrollTop} />
  ) : tablet ? (
    <PScrollTopT show={showButton} onClick={handleScrollTop} />
  ) : desktop ? (
    <PScrollTopD show={showButton} onClick={handleScrollTop} />
  ) : null;
};
