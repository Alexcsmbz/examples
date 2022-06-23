import {PopupContext} from 'constants/contexts';
import {ReactNode, useContext, useState} from 'react';

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState({
    Component: null,
    props: {},
    show: (Component: any, props = {}) => setState({...state, Component, props}),
    close: () => setState({...state, Component: null, props: {}}),
  });

  return <PopupContext.Provider value={state}>{children}</PopupContext.Provider>;
};

export const PopupConsumer = PopupContext.Consumer;

export const PopupView = () => (
  <PopupConsumer>{({Component, props, close}) => Component && <Component {...props} onClose={close} />}</PopupConsumer>
);
