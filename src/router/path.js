// 组织管理
const organization_jobDescription    = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/jobDescription.vue');
const organization_jobMaintain       = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/jobMaintain.vue');

const organization_repair    = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/repair.vue');
const organization_position  = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/position.vue');
// const organization_user      = () => import(/* webpackChunkName: "group-organization" */ '@/src/views/organization/organizationUser.vue');

// 员工管理
    // 入职管理
    const staff_jobEntry                = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/entry.vue');

    // 档案管理
    const staff_archives_info           = () => import(/* webpackChunkName: "group-staff" */ '../views/staff/archives_info.vue');

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
    // organization_user,

    // 员工管理
        // 入职管理
        staff_jobEntry,

        // 档案管理
        staff_archives_info,

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