// 组织管理
const organization_repair    = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/repair.vue');
const organization_position  = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/position.vue');
const organization_station   = () => import(/* webpackChunkName: "group-organization" */ '../views/organization/station.vue');
// const organization_user      = () => import(/* webpackChunkName: "group-organization" */ '@/src/views/organization/organizationUser.vue');

// 员工管理
// const staff_info             = () => import(/* webpackChunkName: "group-staff" */ '@/src/views/staff/staffInfo.vue');
// const staff_ledger           = () => import(/* webpackChunkName: "group-staff" */ '@/src/views/staff/staffLedger.vue');
// const staff_annex            = () => import(/* webpackChunkName: "group-staff" */ '@/src/views/staff/staffAnnex.vue');

// 权限管理
// const authority_role         = () => import(/* webpackChunkName: "group-authority" */ '@/src/views/authority/authorityRole.vue');
// const authority_user         = () => import(/* webpackChunkName: "group-authority" */ '@/src/views/authority/authorityUser.vue');
// const authority_search       = () => import(/* webpackChunkName: "group-authority" */ '@/src/views/authority/authoritySearch.vue');
// const authority_power        = () => import(/* webpackChunkName: "group-authority" */ '@/src/views/authority/authorityPower.vue');
let path = {
    // 组织管理
    organization_repair,
    organization_position,
    organization_station,
    // organization_user,

    // 员工管理
    // staff_info, staff_ledger, staff_annex,

    // 权限管理
    // authority_role,
    // authority_user,
    // authority_search,
    // authority_power
};

export default path;