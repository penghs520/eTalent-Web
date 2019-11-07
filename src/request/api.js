// 页面接口配置
import request from './http';
import base from './base';

const page_api1 = (data, callback) => {request('post', `${base.kt}/url`, data, callback)};

export {
    page_api1
}