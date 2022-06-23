import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {all} from 'redux-saga/effects';
import {userReducer} from './user';
import {appReducer} from './app';
import {appSaga} from './app/sagas';
import {userSaga} from './user/sagas';

const sagas = [appSaga, userSaga];

const reducers = {
  user: userReducer,
  app: appReducer,
};

const saga = function* () {
  yield all(sagas.map(saga => saga()));
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const reducer = combineReducers(reducers);
const store = configureStore({reducer, middleware});

sagaMiddleware.run(saga);

export {store};
