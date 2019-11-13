// 页面接口配置
import request from './http';

// 登录
const login_api1 = (data, callback) => {request('get', `dev/api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};
const login_api2 = (data, callback) => {request('get', `dev/api/masterdata/userLogin/loadMenuTreeByCurrentLoginUser`, data, callback)};

// 系统管理
    // 权限管理
        // 角色授权
        const role_api1 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/searchRoleTree`, data, callback)};
        const role_api2 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/addRole`, data, callback)};
        const role_api3 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/addRoleGroup`, data, callback)};
        const role_api4 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/updateRole`, data, callback)};
        const role_api5 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/updateRoleGroup`, data, callback)};
        const role_api6 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/delRole`, data, callback)};
        const role_api7 = (data, callback) => {request('get', `dev/api/masterdata/roleAuth/delRoleGroup`, data, callback)};


export {
    // 登录
    login_api1, login_api2,

    // 系统管理
        // 权限管理
            // 角色授权
            role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7
}