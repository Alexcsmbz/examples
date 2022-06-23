import {createContext, NamedExoticComponent} from 'react';
import {CurrentDevice} from 'types/custom';

export const DeviceContext = createContext<CurrentDevice>({
  mobile: false,
  tablet: false,
  desktop: true,
});

export const PopupContext = createContext<{
  Component: any;
  props: any;
  show: <T extends {[x in keyof T1]?: T1[x]}, T1 extends {}>(Component: NamedExoticComponent<T1>, props?: T) => void;
  close: () => void;
}>({
  Component: null,
  props: {},
  show: () => {},
  close: () => {},
});

export const WalletContext = createContext<{provider: any; setProvider: (prodiver: any) => void}>({
  provider: null,
  setProvider: () => {},
});
