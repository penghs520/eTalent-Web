// 页面接口配置
import request from './http';

// 登录
const login_api1 = (data, callback) => {request('get', `dev/api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};
const login_api2 = (data, callback) => {request('get', `dev/api/masterdata/userLogin/loadMenuTreeByCurrentLoginUser`, data, callback)};

// 系统管理
    // 权限管理
        // 角色授权
        const role_api1 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/searchRoleTree`, data, callback)};


export {
    // 登录
    login_api1, login_api2,

    // 系统管理
        // 权限管理
            // 角色授权
            role_api1,
}