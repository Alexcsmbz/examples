import {Routes, Route as ReactRoute, Navigate} from 'react-router-dom';
import {Route, routes} from 'constants/routes';
import {CPrivateRoute} from 'components/containers/c-private-route';
import {ErrorBoundary} from 'react-error-boundary';
import {PageFallback} from 'components/pages/fallback';

export const Router = () => (
  <ErrorBoundary FallbackComponent={PageFallback}>
    <Routes>
      {routes.map(({element, path, privateEntity}) => {
        if (!privateEntity) {
          return <ReactRoute path={path} key={path} element={element} />;
        }

        if (privateEntity) {
          return <ReactRoute path={path} key={path} element={<CPrivateRoute>{element}</CPrivateRoute>}></ReactRoute>;
        }

        return <ReactRoute path="*" element={Route.notFound.element} />;
      })}
      <ReactRoute path="*" element={<Navigate to={Route.notFound.path} />} />;
    </Routes>
  </ErrorBoundary>
);
