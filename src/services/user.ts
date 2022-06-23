import {UserProfile} from 'types/api';
import {ServerResponse} from 'types/custom';
import {Fetcher} from 'utils/fetcher';
import {ApiUrl} from './constants';

const fetcher = new Fetcher({baseURL: `${process.env.REACT_APP_API_URL}`});

export const getProfileService = ({wallet}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    url: ApiUrl.profile(wallet),
  });

export const postProfileService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.profile(wallet),
    data,
  });

export const putProfileService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'PUT',
    url: ApiUrl.profile(wallet),
    data,
  });

export const deleteProfileService = ({wallet}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'DELETE',
    url: ApiUrl.profile(wallet),
    params: {wallet},
  });

export const postProfileAvatarFileService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.profileAvatarFile(wallet),
    data,
  });

export const postProfileAvatarUrlService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.profileAvatarUrl(wallet),
    data,
  });

export const deleteProfileAvatarService = ({wallet}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'DELETE',
    url: ApiUrl.profileAvatar(wallet),
  });

export const postProfileBackgroundFileService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.profileBackgroundFile(wallet),
    data,
  });

export const postProfileBackgroundUrlService = ({wallet, data}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.profileBackgroundUrl(wallet),
    data,
  });

export const deleteProfileBackgroundService = ({wallet}: any): Promise<ServerResponse<UserProfile>> =>
  fetcher.request({
    method: 'DELETE',
    url: ApiUrl.profileBackground(wallet),
  });
