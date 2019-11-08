// 页面接口配置
import request from './http';

// 登录
const login_api1 = (data, callback) => {request('get', `dev/api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};

export {
    login_api1,
}