// 组织管理
const organization_jobDescription    = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/jobDescription.vue');
const organization_jobMaintain       = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/jobMaintain.vue');

const organization_repair    = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/repair.vue');
const organization_position  = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/position.vue');
const organization_register  = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/register.vue');
const organization_userInfo  = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/userInfo.vue');

// 员工管理
    // 入职管理
    const staff_jobEntry                = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/entry.vue');

    // 档案管理
    const staff_archives_info           = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_info.vue');
    const staff_archives_ledger         = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_ledger.vue');
    const staff_archives_import         = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_import.vue');
    const staff_archives_file           = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_file.vue');
    const staff_archives_blacklist      = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_blacklist.vue');

    // 劳动合同
    const staff_notContract      = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/contract_not.vue');
    const staff_hasContract      = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/contract_has.vue');
    const staff_contractBack      = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/contract_back.vue');
    const staff_contractInfo      = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/contract_info.vue');


    // 参数设置
    const staff_jobNumber               = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/jobNumber.vue');
    const staff_contract_params         = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/contract_params.vue');
    const staff_entry_template          = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/entry_template.vue');

// 权限管理
const authority_role         = () => import(/* webpackChunkName: "group-authority" */ '../views/authority/role.vue');
const authority_user         = () => import(/* webpackChunkName: "group-authority" */ '../views/authority/user.vue');
const authority_search       = () => import(/* webpackChunkName: "group-authority" */ '../views/authority/search.vue');
const authority_power        = () => import(/* webpackChunkName: "group-authority" */ '../views/authority/power.vue');

let path = {
    // 组织中台
        // 岗位管理
        organization_jobDescription,
        organization_jobMaintain,
        
        organization_repair,
        organization_position,
        organization_register,
        organization_userInfo,

    // 员工管理
        // 入职管理
        staff_jobEntry,

        // 档案管理
        staff_archives_info,
        staff_archives_ledger,
        staff_archives_import,
        staff_archives_file,
        staff_archives_blacklist,

        // 劳动合同
        staff_notContract,
        staff_hasContract,
        staff_contractBack,
        staff_contractInfo,

        //参数设置
        staff_jobNumber,
        staff_contract_params,
        staff_entry_template,

    // 权限管理
    authority_role,
    authority_user,
    authority_search,
    authority_power
};

export default path;