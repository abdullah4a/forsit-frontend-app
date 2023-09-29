import {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import { localStorageKeys } from "@/utils/enum/localStorageKeys.enum";
import { generalStorage } from '@/storages/generalStorage';

export const interceptRequest = (requestConfig: InternalAxiosRequestConfig) => {
    const token = generalStorage.getLocalItem(localStorageKeys.TOKEN);
    if (token) {
        requestConfig.headers.Authorization = `bearer ${token}`;
    }
    return requestConfig;
};

export const interceptRequestError = (error: any) => {
    return Promise.reject(error);
};

export const interceptResponse = (response: AxiosResponse) => {
    return response;
};

export const interceptResponseError = (error: any) => {
    const res = error.response;
    if (res.status >= 500) {
        if (!res.config.headers['x-silent-status']?.includes(res.status)) {
            alert(res.data.message || res.data.error || 'Server Error\nPlease Refresh page and try again');
        }
    }
    if (res.status === 401) {
        alert(res.data.message || res.data.error || 'Auth Error\nPlease Refresh page and try again');
    } else if (res.status >= 400 && res.status < 500) {
        alert(res.data.message || res.data.error || 'Request Error\nPlease, try again');
    }
    return Promise.reject(error);
};
