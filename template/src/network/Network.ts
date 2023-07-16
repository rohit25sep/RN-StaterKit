import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { IApiResponse } from 'controller/IApiResponse';
import APIConstants from 'core/ApiConstants';

const token = () => {
  return '';
};
const instance: AxiosInstance= axios.create({
  baseURL: APIConstants.BaseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});
interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 5000,
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;
    
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    config.retry -= 1
    const delayRetryRequest = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("retry the request", config.url);
        resolve();
      }, config.retryDelay)
    })
    return delayRetryRequest.then(() => instance(config));
  }
);
export function sendGetRequest<T>(url: string) {
  instance.defaults.headers.common.Authorization = token();
  return instance
    .get(url,globalConfig)
    .then((response: any) => {
      return handleResponse<T>(response.data);
    })
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error('something went wrong');
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
      // hide loader
      // dispatch(toggleLoader());
    });
}

export function sendPostRequest<T>(url: any, body: any): any {
  return instance
    .post(url, body,globalConfig)
    .then((response: any) => {
      return handleResponse<T>(response.data);
    })
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error('something went wrong');
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
     
    });
}

export function sendPutRequest<T>(url: any, body: any): any {
  instance.defaults.headers.common.Authorization = token();
  return instance
    .put(url, body,globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error('something went wrong');
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
     
    });
}

export function sendPatchRequest<T>(url: any): any {
  instance.defaults.headers.common.Authorization = token();
  return instance
    .patch(url,globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error('something went wrong');
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
     
    });
}

export function deleteRequest<T>(url: any, body: any): any {
  return instance
    .delete(url,globalConfig)
    .then((response: any) => handleResponse<T>(response.data))
    .catch((err: any) => {
      if (err.response === undefined) {
        throw new Error('something went wrong');
      }
      return handleError<T>(err.response.data);
    })
    .finally(() => {
     
    });
}

function handleResponse<T>(data: any) {
  let res: IApiResponse<T> = {
    isSuccess: true,
    errors: undefined,
    data: data as T,
  };
  return res;
}

function handleError<T>(data: any) {
  let res: IApiResponse<T> = {
    isSuccess: false,
    errors: data,
    data: undefined,
  };
  return res;
}