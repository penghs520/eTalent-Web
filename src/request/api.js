// 页面接口配置
import request from './http';

// 登录
const login_api1 = (data, callback) => {request('post', `api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};
const login_api2 = (data, callback) => {request('post', `api/masterdata/userLogin/loadMenuTreeByCurrentLoginUser`, data, callback)};
const login_api3 = (data, callback) => {request('post', `api/masterdata/userLogin/sendCodeByPhone`, data, callback)};
const login_api4 = (data, callback) => {request('post', `api/masterdata/userLogin/loginByPhoneAndCode`, data, callback)};
const login_api5 = (data, callback) => {request('post', `api/masterdata/userLogin/logout`, data, callback)};

// 系统管理
    // 权限管理
        // 角色授权
        const role_api1     = (data, callback) => {request('post', `api/masterdata/roleAuth/searchRoleTree`, data, callback)};
        const role_api2     = (data, callback) => {request('post', `api/masterdata/roleAuth/addRole`, data, callback)};
        const role_api3     = (data, callback) => {request('post', `api/masterdata/roleAuth/addRoleGroup`, data, callback)};
        const role_api4     = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRole`, data, callback)};
        const role_api5     = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleGroup`, data, callback)};
        const role_api6     = (data, callback) => {request('post', `api/masterdata/roleAuth/delRole`, data, callback)};
        const role_api7     = (data, callback) => {request('post', `api/masterdata/roleAuth/delRoleGroup`, data, callback)};
        const role_api8     = (data, callback) => {request('post', `api/masterdata/roleAuth/searchRoleAuthTree`, data, callback)};
        const role_api9     = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleMenuAuth`, data, callback)};
        const role_api10    = (data, callback) => {request('post', `api/masterdata/roleAuth/searchOrgAuthTree`, data, callback)};
        const role_api11    = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleOrgAuth`, data, callback)};
        const role_api12    = (data, callback) => {request('post', `api/masterdata/roleAuth/searchCustomArchiveTableList`, data, callback)};
        const role_api13    = (data, callback) => {request('post', `api/masterdata/roleAuth/searchCustomArchiveTableFieldListByTableId`, data, callback)};

        // 用户授权
        const user_api1    = (data, callback) => {request('post', `api/masterdata/archiveAuth/searchArchiveListByRoleId`, data, callback)};


export {
    // 登录
    login_api1, login_api2,login_api3,login_api4,login_api5,

    // 系统管理
        // 权限管理
            // 角色授权
            role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7, role_api8, role_api9, role_api10, role_api11,
            role_api12, role_api13,

            // 用户授权
            user_api1,
}