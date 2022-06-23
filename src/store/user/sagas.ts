import {takeEvery, all, call, put} from 'redux-saga/effects';
import {getProfileAction} from './actions';
import {getProfileService} from 'services/user';
import {setErrors, setProfile} from './slice-user';
import {UserProfile} from 'types/api';
import {initialProfile} from 'constants/common';
// import {setLoading} from 'store/user/slice-user';

const getProfileSaga = function* ({payload}: {payload: {wallet: string}} & {type: string}) {
  // yield put(setLoading(true));
  try {
    const response: {data: {data: UserProfile}} = yield call(getProfileService, payload);
    if (response.data.data === null) {
      //FIXME: Fix this peace of shit
      yield put(setProfile(initialProfile));
    } else {
      yield put(setProfile(response.data.data));
    }
  } catch (e) {
    yield put(setErrors(e as string));
  } finally {
    // yield put(setLoading(false));
  }
};

export const userSaga = function* () {
  yield all([takeEvery(getProfileAction().type, getProfileSaga)]);
};
