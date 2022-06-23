import {useCurrentDevice} from 'hooks';
import {useEffect, useRef, useState} from 'react';

export const useSmoothScrollTo = (id: any) => {
  const ref = useRef<null | HTMLElement>(null);
  const {desktop} = useCurrentDevice();
  const [additionalOffset, setAdditionalOffset] = useState(0);

  useEffect(() => {
    desktop ? setAdditionalOffset(0) : setAdditionalOffset(60);

    if (ref.current && ref.current.getAttribute('id') === id) {
      setTimeout(() => {
        window.scrollTo({
          top: ref?.current?.offsetTop! + additionalOffset,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, []);

  return {
    id,
    ref,
  };
};

export const handleSmoothScrollTo = (id: any) => {
  window.scrollTo({
    top: document?.getElementById(id)?.offsetTop,
    behavior: 'smooth',
  });
};
