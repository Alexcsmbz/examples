import Cookies from 'js-cookie';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {THREE_MINUTES} from 'constants/common';

export class Fetcher {
  #instance: AxiosInstance;

  constructor({baseURL, timeout = THREE_MINUTES, responseType}: AxiosRequestConfig) {
    this.#instance = axios.create({baseURL, timeout, responseType});

    this.#instance.interceptors.request.use(config =>
      !Cookies.get('token')
        ? config
        : {...config, headers: {'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}`}}
    );
  }

  request = ({method = 'GET', ...props}: AxiosRequestConfig) => this.#instance.request({method, ...props});
}
