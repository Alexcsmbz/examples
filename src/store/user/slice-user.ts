import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {banners} from 'constants/banners';
import {initialProfile} from 'constants/common';
import {Account} from 'types/custom';
import {UserState} from './types';

const sliceUser = createSlice({
  name: 'user',
  initialState: {
    account: {
      address: null,
      walletConnected: false,
      balance: null,
      currency: null,
      connectedWith: null,
    },
    profile: initialProfile,
    profileBanner: {
      background: banners[Math.floor(Math.random() * banners.length)].background,
      avatar: banners[Math.floor(Math.random() * banners.length)].avatar,
    },
    loading: false,
    errors: [],
  },
  reducers: {
    setErrors(state: UserState, {payload}: PayloadAction<string>) {
      state.errors = [...state.errors, payload];
    },
    setLoading(state: UserState, {payload}: PayloadAction<UserState['loading']>) {
      state.loading = payload;
    },
    setAccount(state: UserState, {payload}: PayloadAction<{[x in keyof Account]?: any}>) {
      state.account = {...state.account, ...payload};
    },
    setProfile(state: UserState, {payload}: PayloadAction<UserState['profile']>) {
      state.profile = {...state.profile, ...payload};
    },
    setProfileBanner(state: UserState, {payload}: PayloadAction<UserState['profileBanner']>) {
      state.profileBanner = payload;
    },
  },
});

export const {setErrors, setLoading, setAccount, setProfile, setProfileBanner} = sliceUser.actions;

export const userReducer = sliceUser.reducer;
