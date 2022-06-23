import {useEffect, useState} from 'react';
import {useResizeDetector} from 'react-resize-detector';
import {theme} from 'constants/theme';

const getCurrentWidth = (width: number) => ({
  mobile: width < theme.breakpoints.mobile,
  tablet: width >= theme.breakpoints.mobile && width < theme.breakpoints.desktop,
  desktop: width >= theme.breakpoints.desktop,
});

export const useDeviceDetector = () => {
  const {width, ref} = useResizeDetector();
  const [device, setDevice] = useState(getCurrentWidth(width as number));

  useEffect(() => {
    setDevice(getCurrentWidth(width as number));
  }, [width]);

  return {ref, device};
};
