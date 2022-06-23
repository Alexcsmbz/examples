import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {userAccountSelector} from 'store/user/selectors';
import {Route} from 'constants/routes';
import {ReactElement, useEffect, useState} from 'react';
import {web3Modal} from 'constants/web3-modal';

export const CPrivateRoute = ({children}: {children: ReactElement<any, any>}) => {
  const {walletConnected, connectedWith} = useSelector(userAccountSelector);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      setAuthorized(!!web3Modal.cachedProvider);
      setLoading(false);
    })();
  }, [walletConnected, connectedWith]);

  return !authorized && !loading ? <Navigate to={Route.home.path} state={{from: location}} replace /> : children;
};
