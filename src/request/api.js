// 页面接口配置
import request from './http';

// 登录
const login_api1 = (data, callback) => {request('get', `api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};
const login_api2 = (data, callback) => {request('get', `api/masterdata/userLogin/loadMenuTreeByCurrentLoginUser`, data, callback)};
const login_api_sendCode = (data, callback) => {request('get', `api/masterdata/userLogin/sendCodeByPhone`, data, callback)};
const login_api_phoneLogin = (data, callback) => {request('get', `api/masterdata/userLogin/loginByPhoneAndCode`, data, callback)};

// 系统管理
    // 权限管理
        // 角色授权
        const role_api1 = (data, callback) => {request('get', `api/masterdata/roleAuth/searchRoleTree`, data, callback)};
        const role_api2 = (data, callback) => {request('get', `api/masterdata/roleAuth/addRole`, data, callback)};
        const role_api3 = (data, callback) => {request('get', `api/masterdata/roleAuth/addRoleGroup`, data, callback)};
        const role_api4 = (data, callback) => {request('get', `api/masterdata/roleAuth/updateRole`, data, callback)};
        const role_api5 = (data, callback) => {request('get', `api/masterdata/roleAuth/updateRoleGroup`, data, callback)};
        const role_api6 = (data, callback) => {request('get', `api/masterdata/roleAuth/delRole`, data, callback)};
        const role_api7 = (data, callback) => {request('get', `api/masterdata/roleAuth/delRoleGroup`, data, callback)};
        const role_api8 = (data, callback) => {request('get', `api/masterdata/roleAuth/searchRoleAuthTree`, data, callback)};
        const role_api9 = (data, callback) => {request('get', `api/masterdata/roleAuth/updateRoleMenuAuth`, data, callback)};


export {
    // 登录
    login_api1, login_api2,login_api_sendCode,login_api_phoneLogin,

    // 系统管理
        // 权限管理
            // 角色授权
            role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7, role_api8, role_api9
}