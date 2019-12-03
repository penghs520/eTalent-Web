// 页面接口配置
import request from './http';

// 系统参数接口
    // 根据字典类型查询字典列表
    const sys_api1 = (data, callback) => {request('form', `api/masterdata/sysDict/searchSysDictListByDictType`, data, callback)};


// 登录
const login_api1 = (data, callback) => {request('form', `api/masterdata/userLogin/loginByAccountAndPassword`, data, callback)};
const login_api2 = (data, callback) => {request('form', `api/masterdata/userLogin/loadMenuTreeByCurrentLoginUser`, data, callback)};
const login_api3 = (data, callback) => {request('form', `api/masterdata/userLogin/sendCodeByPhone`, data, callback)};
const login_api4 = (data, callback) => {request('form', `api/masterdata/userLogin/loginByPhoneAndCode`, data, callback)};
const login_api5 = (data, callback) => {request('form', `api/masterdata/userLogin/logout`, data, callback)};

// 员工管理
    // 公用接口
        // 根据档案显示对应权限下的单位
        const staff_api1     = (data, callback) => {request('form', `api/masterdata/staffarc/getCompany`, data, callback)};
        // 根据档案id显示对应权限下的子集部门
        const staff_api2     = (data, callback) => {request('form', `api/masterdata/staffarc/getOrgIdByCompanyId`, data, callback)};
        // 显示部门下的岗位
        const staff_api3     = (data, callback) => {request('form', `api/masterdata/staffarc/getPostByOrgId`, data, callback)};


    // 入职管理
    const entry_api1     = (data, callback) => {request('form', `api/masterdata/staffpre/selectPreEmployment`, data, callback)};
    const entry_api2     = (data, callback) => {request('post', `api/masterdata/staffpre/insertPreEmployment`, data, callback)};
    const entry_api3     = (data, callback) => {request('post', `api/masterdata/staffpre/sendMail`, data, callback)};
    const entry_api4     = (data, callback) => {request('post', `api/masterdata/staffpre/confirmPreemployment`, data, callback)};
    const entry_api5     = (data, callback) => {request('post', `api/masterdata/staffpre/deletePreEmployment`, data, callback)};
    const entry_api6     = (data, callback) => {request('post', `api/masterdata/staffpre/updatePreEmploymentChange`, data, callback)};
    const entry_api7     = (data, callback) => {request('post', `api/masterdata/staffarc/importPreFile`, data, callback)};      // 导入
    const entry_api8     = (data, callback) => {request('form', `api/masterdata/staffarc/getPostByOrgId`, data, callback)};
    const entry_api9     = (data, callback) => {request('post', `api/masterdata/staffarc/sendMessage`, data, callback)};
    const entry_api10     = (data, callback) => {request('post', `api/masterdata/staffarc/exportPreFile`, data, callback, 'blob')};
    const entry_api11     = (data, callback) => {request('post', `api/masterdata/staffpre/updatePreEmploymentField`, data, callback)};
    const entry_api12     = (data, callback) => {request('post', `api/masterdata/staffpre/updatePreEmployment`, data, callback)};

    // 参数设置
        //合同参数
        const params_api1     = (data, callback) => {request('form', `api/masterdata/number/insertContractParam`, data, callback)};
        //工号规则
        const params_api2     = (data, callback) => {request('form', `api/masterdata/number/insertEmployNumber`, data, callback)};
    
    
    // 档案管理
        //信息维护
        const archives_api1     = (data, callback) => {request('form', `api/masterdata/staffarc/selectArchivebatch`, data, callback)};



// 系统管理
    // 权限管理
        // 角色授权
        const role_api1     = (data, callback) => {request('form', `api/masterdata/roleAuth/searchRoleTree`, data, callback)};
        const role_api2     = (data, callback) => {request('form', `api/masterdata/roleAuth/addRole`, data, callback)};
        const role_api3     = (data, callback) => {request('form', `api/masterdata/roleAuth/addRoleGroup`, data, callback)};
        const role_api4     = (data, callback) => {request('form', `api/masterdata/roleAuth/updateRole`, data, callback)};
        const role_api5     = (data, callback) => {request('form', `api/masterdata/roleAuth/updateRoleGroup`, data, callback)};
        const role_api6     = (data, callback) => {request('form', `api/masterdata/roleAuth/delRole`, data, callback)};
        const role_api7     = (data, callback) => {request('form', `api/masterdata/roleAuth/delRoleGroup`, data, callback)};
        const role_api8     = (data, callback) => {request('form', `api/masterdata/roleAuth/searchRoleAuthTree`, data, callback)};
        const role_api9     = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleMenuAuth`, data, callback)};
        const role_api10    = (data, callback) => {request('form', `api/masterdata/roleAuth/searchOrgAuthTree`, data, callback)};
        const role_api11    = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleOrgAuth`, data, callback)};
        const role_api12    = (data, callback) => {request('form', `api/masterdata/roleAuth/searchCustomArchiveTableList`, data, callback)};
        const role_api13    = (data, callback) => {request('form', `api/masterdata/roleAuth/searchCustomArchiveTableFieldListByTableId`, data, callback)};
        const role_api14    = (data, callback) => {request('post', `api/masterdata/roleAuth/updateRoleCustomArchiveTableFieldAuth`, data, callback)};

        // 用户授权
        const user_api1    = (data, callback) => {request('form', `api/masterdata/archiveAuth/searchRoleTree`, data, callback)};
        const user_api2    = (data, callback) => {request('post', `api/masterdata/archiveAuth/searchArchiveListByRoleId`, data, callback)};
        const user_api3    = (data, callback) => {request('post', `api/masterdata/archiveAuth/delArchiveRole`, data, callback)};
        const user_api4    = (data, callback) => {request('form', `api/masterdata/archiveAuth/getOrganizationArchiveTree`, data, callback)};
        const user_api5    = (data, callback) => {request('post', `api/masterdata/archiveAuth/searchArchiveListByUserNameOrJobNumber`, data, callback)};
        const user_api6    = (data, callback) => {request('post', `api/masterdata/archiveAuth/addArchiveRole`, data, callback)};
        const user_api7    = (data, callback) => {request('form', `api/masterdata/archiveAuth/searchOrgAuthTreeByArchiveIdAndRoleId`, data, callback)};
        const user_api8    = (data, callback) => {request('post', `api/masterdata/archiveAuth/updateArchiveOrgAuth`, data, callback)};
       
        // 角色反查
        const userCheck_api1    = (data, callback) => {request('post', `api/masterdata/roleSearch/searchArchiveListByUserName`, data, callback)};
        const userCheck_api2    = (data, callback) => {request('get', `api/masterdata/roleSearch/getOrganizationTree`, data, callback)};
        const userCheck_api3    = (data, callback) => {request('form', `api/masterdata/roleSearch/searchRoleTreeByArchiveId`, data, callback)};
        const userCheck_api4    = (data, callback) => {request('post', `api/masterdata/roleSearch/updateArchiveRole`, data, callback)};

        // 权限移交
        const power_api1    = (data, callback) => {request('post', `api/masterdata/authHandover/searchArchiveListByUserNameOrJobNumber`, data, callback)};
        const power_api2    = (data, callback) => {request('form', `api/masterdata/authHandover/searchRoleListByArchiveId`, data, callback)};
        const power_api3    = (data, callback) => {request('form', `api/masterdata/authHandover/searchRoleAuthTree`, data, callback)};
        const power_api4    = (data, callback) => {request('form', `api/masterdata/authHandover/searchOrgAuthTree`, data, callback)};
        const power_api5    = (data, callback) => {request('post', `api/masterdata/authHandover/roleHandoverByArchiveId`, data, callback)};
        const power_api6    = (data, callback) => {request('post', `api/masterdata/authHandover/roleTrusteeshipByArchiveId`, data, callback)};
        const power_api7    = (data, callback) => {request('post', `api/masterdata/authHandover/roleRecoveryByArchiveId`, data, callback)};
        const power_api8    = (data, callback) => {request('post', `api/masterdata/authHandover/searchCustomArchiveTableList`, data, callback)};
        const power_api9    = (data, callback) => {request('form', `api/masterdata/authHandover/searchCustomArchiveTableFieldListByTableId`, data, callback)};




// 组织中台
    // 职位管理
        // 职位族设置
        const positionGroup_api1    = (data, callback) => {request('get', `api/masterdata/positionGroup/getAllPositionGroupTree`, data, callback)};
        const positionGroup_api2    = (data, callback) => {request('get', `api/masterdata/positionGroup/addPositionGroup`, data, callback)};
        const positionGroup_api3    = (data, callback) => {request('post', `api/masterdata/positionGroup/deletePositionGroup`, data, callback)};
        const positionGroup_api4    = (data, callback) => {request('get', `api/masterdata/positionGroup/getAllPositionGroupTree`, data, callback)};
        const positionGroup_api5    = (data, callback) => {request('post', `api/masterdata/positionGroup/editPositionGroup`, data, callback)};
        const positionGroup_api6    = (data, callback) => {request('get', `api/masterdata/positionGroup/sortPositionGroup`, data, callback)};
        const positionGroup_api7    = (data, callback) => {request('get', `api/masterdata/positionGroup/downloadExcel`, data, callback, 'blob')};

        // 职位设置
        const position_api1    = (data, callback) => {request('post', `api/masterdata/position/getPositionPage`, data, callback)};
        const position_api2    = (data, callback) => {request('form', `api/masterdata/position/addPosition`, data, callback)};
        const position_api3    = (data, callback) => {request('form', `api/masterdata/position/editPosition`, data, callback)};
        const position_api4    = (data, callback) => {request('post', `api/masterdata/position/deletePosition`, data, callback)};
        const position_api5    = (data, callback) => {request('get', `api/masterdata/position/sortPositionGroup`, data, callback)};
        const position_api6    = (data, callback) => {request('get', `api/masterdata/position/downloadExcel`, data, callback, 'blob')};
        
        // 职级设置
        const positionLevel_api1    = (data, callback) => {request('get', `api/masterdata/positionLevel/getPositionLevelList`, data, callback)};

        //职等设置
        const positionGrade_api1    = (data, callback) => {request('get', `api/masterdata/positionGrade/getPositionGradeList`, data, callback)};

    
    
    // 组织机构
        //机构维护
        const orgRepair_api1     = (data, callback) => {request('get', `api/masterdata/organization/getAllOrganizationTree`, data, callback)};
        const orgRepair_api2     = (data, callback) => {request('post', `api/masterdata/organization/getOrganizationPageList`, data, callback)};
        const orgRepair_api3     = (data, callback) => {request('form', `api/masterdata/sysDict/searchSysDictListByDictType`, data, callback)};
        const orgRepair_api4     = (data, callback) => {request('get', `api/masterdata/organization/addOrganization`, data, callback)};
        const orgRepair_api5     = (data, callback) => {request('post', `api/masterdata/organization/deleteOrganizationById`, data, callback)};
        const orgRepair_api6     = (data, callback) => {request('get', `api/masterdata/organization/editOrganization`, data, callback)};
        const orgRepair_api7     = (data, callback) => {request('post', `api/masterdata/organization/lockOrganizationByIds`, data, callback)};
        const orgRepair_api8     = (data, callback) => {request('post', `api/masterdata/organization/unlockOrganizationByIds`, data, callback)};
        const orgRepair_api9     = (data, callback) => {request('post', `api/masterdata/organization/mergeOrganization`, data, callback)};
        const orgRepair_api10    = (data, callback) => {request('post', `api/masterdata/organization/transferOrganization2`, data, callback)};
        const orgRepair_api11    = (data, callback) => {request('get', `api/masterdata/organization/getOrganizationGraphics`, data, callback)};
        const orgRepair_api12    = (data, callback) => {request('post', `api/masterdata/organization/getDirectOrganizationPageList`, data, callback)};
        const orgRepair_api13    = (data, callback) => {request('post', `api/masterdata/organization/sortOrganization`, data, callback)};
        const orgRepair_api14    = (data, callback) => {request('post', `api/masterdata/organization/exportOrganization`, data, callback, 'blob')};
        const orgRepair_api15    = (data, callback) => {request('post', `api/masterdata/organization/uploadAndCheck`, data, callback)};
        const orgRepair_api16    = (data, callback) => {request('get', `api/masterdata/organization/importToDatabase`, data, callback)};
        const orgRepair_api17    = (data, callback) => {request('get', `api/masterdata/organization/exportError2Txt`, data, callback,'blob')};
    
    //用户管理
        //用户信息
        const org_userInfo_api1     = (data, callback) => {request('get', `api/masterdata/organization/getAllOrganizationTree`, data, callback)};
        const org_userInfo_api2     = (data, callback) => {request('post', `api/masterdata/userArchive/getUserArchiveList`, data, callback)};
        
    // 岗位管理
        // 岗位维护
        const postRepair_api1    = (data, callback) => {request('get', `api/masterdata/organization/getOrganizationPostTree`, data, callback)};
        const postRepair_api2    = (data, callback) => {request('post', `api/masterdata/post/getPostList`, data, callback)};
        const postRepair_api3    = (data, callback) => {request('post', `api/masterdata/position/getPositionPage`, data, callback)};
        const postRepair_api4    = (data, callback) => {request('post', `api/masterdata/post/addPost`, data, callback)};
        const postRepair_api5    = (data, callback) => {request('form', `api/masterdata/post/editPost`, data, callback)};
        const postRepair_api6    = (data, callback) => {request('post', `api/masterdata/post/deletePost`, data, callback)};
        const postRepair_api7    = (data, callback) => {request('post', `api/masterdata/post/lockPostByIds`, data, callback)};
        const postRepair_api8    = (data, callback) => {request('post', `api/masterdata/post/unlockPostByIds`, data, callback)};
        const postRepair_api9    = (data, callback) => {request('post', `api/masterdata/post/copyPost`, data, callback)};
        const postRepair_api10    = (data, callback) => {request('get', `api/masterdata/post/getPostSuccessive`, data, callback)};
        const postRepair_api11    = (data, callback) => {request('get', `api/masterdata/post/getPostGraphics`, data, callback)};
        const postRepair_api12    = (data, callback) => {request('post', `api/masterdata/post/getDirectPostPageList`, data, callback)};
        const postRepair_api13    = (data, callback) => {request('post', `api/masterdata/post/sortPorts`, data, callback)};
        const postRepair_api14    = (data, callback) => {request('post', `api/masterdata/post/exportPost`, data, callback,'blob')};
       

export {
    // 系统参数
    sys_api1,
    
    // 登录
    login_api1, login_api2,login_api3,login_api4,login_api5,

    // 员工管理
        // 公用接口
        staff_api1, staff_api2, staff_api3,
        // 入职管理
        entry_api1, entry_api2, entry_api3, entry_api4, entry_api5, entry_api6, entry_api7, entry_api8, entry_api9, entry_api10,
        entry_api11, entry_api12,

        // 档案管理
            // 信息维护
            archives_api1,

        // 参数设置
            // 合同参数
            params_api1,params_api2,

    // 系统管理
        // 权限管理
            // 角色授权
            role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7, role_api8, role_api9, role_api10, role_api11,
            role_api12, role_api13, role_api14,

            // 用户授权
            user_api1, user_api2,user_api3,user_api4,user_api5,user_api6, user_api7, user_api8,

            //角色反查
            userCheck_api1,userCheck_api2,userCheck_api3,userCheck_api4,

            // 权限移交
            power_api1, power_api2, power_api3, power_api4, power_api5, power_api6, power_api7, power_api8, power_api9,

    // 组织中台
        // 职位管理
            // 职位族设置
            positionGroup_api1,positionGroup_api2,positionGroup_api3,positionGroup_api4,positionGroup_api5, positionGroup_api6,
            positionGroup_api7,
            
            //职位设置
            position_api1,position_api2,position_api3,position_api4, position_api5,position_api6,
            
            //职级设置
            positionLevel_api1,

            //职等设置
            positionGrade_api1,
        
        // 组织机构
            //机构维护
            orgRepair_api1,orgRepair_api2,orgRepair_api3,orgRepair_api4,orgRepair_api5,orgRepair_api6,orgRepair_api7,orgRepair_api8,
            orgRepair_api9,orgRepair_api10, orgRepair_api11,orgRepair_api12,orgRepair_api13, orgRepair_api14,orgRepair_api15,orgRepair_api16,
            orgRepair_api17,

        // 岗位管理
            // 岗位维护
            postRepair_api1,postRepair_api2,postRepair_api3,postRepair_api4,postRepair_api5,postRepair_api6,postRepair_api7,
            postRepair_api8,postRepair_api9,postRepair_api10,postRepair_api11,postRepair_api12,postRepair_api13,postRepair_api14,

        //用户管理
            //用户信息
            org_userInfo_api1,org_userInfo_api2,

}