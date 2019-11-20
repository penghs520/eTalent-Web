<template>
    <div id="demo">
        <powerCommon :data="powerData" ></powerCommon>
    </div>
</template>

<script>
import powerCommon from './powerCommon'

export default {
    name: 'demo',
    components: {powerCommon},
    data() {
        return {
            powerData: {
                showTab: ['功能权限', '管理范围权限', '字段权限'],          /* 必须，要显示的tab */
                tabActive: '功能权限',                                      /* 非必须，默认显示哪个tab */
                roleTreeRoleId: String/Number,                              /* 必须,角色id */
                loading: Boolean,                                           /* 非必须，加载动画 */

                disabled: Boolean,                                          /* 非必须，是否禁止勾选，true-禁止勾选 */

                // 功能权限
                serverData: [],
                serverProps:{
                    children: 'childMenuList',
                    label: 'menuName'
                },
                serverCheck: Function,                                    /* 非必须，选中改变时的回调，接收一个参数，选中值组成的数组 */

                // 管理范围权限
                rangeData: [],
                rangeProps:{
                    children: 'childOrganizationList',
                    label: 'orgName'
                },
                rangeCheck: Function,                                   /* 非必须，选中改变时的回调，接收一个参数，选中值组成的数组 */

                // 自定义字段表
                tableList: [],
                fieldTableData: [],
                fieldSelectChange: Function,                            /* 非必须，下拉框选中改变时，接收一个参数，选中值 */
                fieldSubmit: Function,                                       /* 非必须，提交方法，接收一个参数，send */
            },
        }
    },
}
</script>