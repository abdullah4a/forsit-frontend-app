import axios from 'axios';
import baseConfig from './base.config';
import * as baseInterceptor from './base.interceptor';

const API = axios.create(baseConfig);

API.interceptors.request.use(baseInterceptor.interceptRequest, baseInterceptor.interceptRequestError);
API.interceptors.response.use(baseInterceptor.interceptResponse, baseInterceptor.interceptResponseError);

export default API;
