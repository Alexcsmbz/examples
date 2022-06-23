import {LoginModel, LoginResponseModel, NonceResponseModel} from 'types/api';
import {ServerResponse} from 'types/custom';
import {Fetcher} from 'utils/fetcher';
import {ApiUrl} from './constants';

const fetcher = new Fetcher({baseURL: `${process.env.REACT_APP_API_URL}`});

export const getNonceService = (params: LoginModel): Promise<ServerResponse<NonceResponseModel>> =>
  fetcher.request({
    url: ApiUrl.nonce,
    params,
  });

export const postLoginService = (params: LoginModel): Promise<ServerResponse<LoginResponseModel>> =>
  fetcher.request({
    method: 'POST',
    url: ApiUrl.login,
    data: params,
  });
