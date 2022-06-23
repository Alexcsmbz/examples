import {createSelector} from '@reduxjs/toolkit';
import {State} from 'store/types';
import {UserState} from './types';

const getState = (state: State): UserState => state.user;

export const userAccountSelector = createSelector(getState, state => state.account);
export const userLoadingSelector = createSelector(getState, state => state.loading);
export const userProfileSelector = createSelector(getState, state => state.profile);
export const userProfileBannerSelector = createSelector(getState, state => state.profileBanner);
