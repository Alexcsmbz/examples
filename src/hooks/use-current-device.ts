import {useContext} from 'react';
import {DeviceContext} from 'constants/contexts';

export const useCurrentDevice = () => useContext(DeviceContext);
