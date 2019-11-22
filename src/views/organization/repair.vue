<style scoped lang="scss">
#organization_repair {
    display: flex;
    height: 100%;
    .side_tree {
        width: 216px;
        height: 100%;
        box-sizing: border-box;
        padding: 16px 10px 0px 20px;
        background-color: #fff;
        text-align: left;
        .switch_title {
            display: inline-block;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 20px;
        }
    }
    .content {
        flex: 1;
        height: 100%;
        border: 10px solid #f0f0f0;
        padding-left:24px;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
        .org_table{
            margin-top: 30px;
        }
    }
}
</style>

<template>
    <div id="organization_repair">
        <div class="side_tree">
            <span class="switch_title">显示封存:</span>
            <el-switch
                v-model="value"
                active-color="#19ADE6"
                inactive-color="#ccc"
                @change="switchChange"
            ></el-switch>
            <tree :treeData="treeData"></tree>
        </div>
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="机构表" name="orgForm">
                    <commonTable :table="orgTable" class="org_table"></commonTable>
                </el-tab-pane>
                <el-tab-pane label="机构图" name="orgPic">
                    机构图
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import { orgRepair_api1 } from "../../request/api";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";

export default {
    name: "repair" /* 机构维护 */,
    data() {
        return {
            value: "true",
            treeData: {
                data: [] /* 必须，树形结构数据 */,
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childList" /* 必须，子集key */,
                    label: "orgName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "GROUP" /* 必须，key对应的值 */,
                        icon: "qj-jituan" /* 必须，图标类名 */
                    },
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "UNIT" /* 必须，key对应的值 */,
                        icon: "qj-danwei" /* 必须，图标类名 */
                    },
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "DEPT" /* 必须，key对应的值 */,
                        icon: "qj-nav_client" /* 必须，图标类名 */
                    }
                ],
                showDefaultIcon: false /* 非必须，是否显示默认图标 */,
                nodeClick: this
                    .nodeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            },
            activeName:"orgForm",
            orgTable:  {
                head: [                                 /* 必须，表格头配置 */
                    {
                        name: '姓名',                   /* 必须，表格头所显示的文字 */
                        key: 'userName',                /* 必须，该列要显示的数据所对应的变量的字符串格式 */
                        isShow: true,                   /* 必须，表格是否默认显示该列 */
                        width: '200px'                  /* 非必须，该列的默认宽度 */
                    },
                    {name: '工号', key: 'employeeNumber', isShow: true}
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [                                  /* 非必须，表格上面的操作栏配置 */
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '新增',                   /* 必须，按钮名称 */
                        btnType: 'primary',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.addOrg             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '删除',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.delOrg             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多操作',
                        btnType: 'plain',
                        icon: '',
                        defaultIconHide: false,         /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */
                        list: [                         /* 必须，更多按钮的数据组成的数组 */
                            {
                                text: '按钮1',          /* 必须，按钮名称 */
                                method: this.btn1,      /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                            },
                            {text: '按钮2', method: this.btn2}
                        ]
                    }
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.orgSelectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                loading: false,                       /* 非必须，加载动画 */
                pageResize: false,                    /* 非必须，页码重置 */
                page: {                                 /* 非必须，页码配置 */
                    pageSizes: [1,2,3],                 /* 非必须，页码可选的每页数量 */
                    pageSize: 2                         /* 非必须，默认每页显示的数量 */
                },
                pageResize: false,
                pageHide: false,                        /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.orgPageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.orgPageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
        };
    },
    components: {
        tree,
        commonTable,
    },
    mounted() {
        this.getTreeReq();
    },
    methods: {
        //tab栏点击
        handleClick(){
            console.log('123456');           
        },
        //树形节点点击
        nodeClick() {
            console.log("节点被点击");
        },
        //树形封存
        switchChange() {
            console.log("123456");

            this.getTreeReq();
        },
        //获取树形
        getTreeReq() {
            let send = {
                isEnable: this.value ? 1 : 0
            };
            orgRepair_api1(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result;
                    // this.orgId = d.result.list[0].orgId;
                } else {
                    base.error(d);
                }
            });
        }
    }
};
</script>