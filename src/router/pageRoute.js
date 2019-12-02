let pageRoute = {
    // 组织中台 organization
        // 岗位管理
        '岗位说明书':   'organization_jobDescription',
        '岗位维护':     'organization_jobMaintain',

        '机构维护': 'organization_repair',
        '职位体系': 'organization_position',

        '注册用户': 'organization_register',
        '用户信息': 'organization_userInfo',

    // 员工管理 staff
        // 入职管理
        '入职管理': 'staff_jobEntry',

        // 档案管理
        '信息维护': 'staff_archives_info',

        // 参数设置
        '工号规则':     'staff_jobNumber',
        '合同参数':     'staff_contract_params',
        '入职登记模板': 'staff_entry_template',

    // 系统管理 authority
        // 权限管理
        '角色授权': 'authority_role',
        '用户授权': 'authority_user',
        '角色反查': 'authority_search',
        '权限移交': 'authority_power',
};
export default pageRoute;