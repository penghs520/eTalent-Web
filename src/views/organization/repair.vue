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
        padding-left: 24px;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
        .org_table {
            margin-top: 30px;
        }
        .qj-form,
        .qj-map {
            margin-right: 5px;
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
            <el-tabs v-if="orgParentId" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="orgForm">
                    <span slot="label">
                        <i class="qj-form"></i>机构表
                    </span>
                    <commonTable :table="orgTable" class="org_table"></commonTable>
                </el-tab-pane>
                <el-tab-pane name="orgPic">
                    <span slot="label">
                        <i class="qj-map"></i>机构图
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import { orgRepair_api1, orgRepair_api2 } from "../../request/api";
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
            activeName: "orgForm",
            orgTable: {
                head: [
                    {
                        name: "机构名称",
                        key: "orgName",
                        isShow: true,
                        width: "200px"
                    },
                    { name: "封存", key: "isEnable", isShow: true },
                    { name: "机构编码", key: "orgCode", isShow: true },
                    { name: "机构类型", key: "orgType", isShow: true },
                    { name: "上级机构", key: "orgParentName", isShow: true },
                    { name: "部门负责人", key: "orgManagerName", isShow: true },
                    { name: "机构全称", key: "orgFullName", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button",
                        text: "新增",
                        btnType: "primary",
                        method: this.addOrg
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delOrg
                    },
                    {
                        type: "buttons",
                        text: "更多操作",
                        btnType: "plain",
                        icon: "",
                        defaultIconHide: false,
                        list: [
                            { text: "封存", method: this.btn1 },
                            { text: "解封", method: this.btn2 },
                            { text: "合并", method: this.btn2 },
                            { text: "划转", method: this.btn2 },
                            { text: "排序", method: this.btn2 },
                            { text: "模板下载", method: this.btn2 },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn2 },
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.orgSelectChange,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageResize: false,
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this.orgPageSizeChange,
                pageChange: this.orgPageChange,
                formatter: this.formatter,
            },
            orgParentId: ""
        };
    },
    components: {
        tree,
        commonTable
    },
    mounted() {
        this.getTreeReq();
    },
    methods: {
        //页码改变
        orgPageChange() {},
        //页容量改变
        orgPageSizeChange() {},
        //格式化列表数据
        formatter(key, val) {
            if (key == "isEnable") {
                val = val == 1 ? "是" : "否";
                return val;
            } else if (key == "orgType") {
                if (val == "GROUP") {
                    return "集团";
                } else if (val == "UNIT") {
                    return "单位";
                } else if (val == "DEPT") {
                    return "部门";
                }
            } else {
                return val;
            }
        },
        //获取机构表
        getOrgTable() {
            console.log("有父级id的节点被点击了");

            let send = {
                currentPage: 1,
                isEnable: this.value ? 1 : 0,
                orgParentId: 28,
                pageSize: 10
            };
            orgRepair_api2(send, res => {
                base.log("s", "机构表", send);
                base.log("r", "机构表", res.data);
                if (res.data.success) {
                    this.orgTable.data = res.data.result.list;
                    this.orgTable.total = res.data.result.total;
                } else {
                    base.error(res.data);
                }
            });
        },
        //tab栏点击
        handleClick(tab) {
            if (tab.name == "orgForm") {
                console.log("机构表");
            } else if (tab.name == "orgPic") {
                console.log("机构图");
            }
        },
        //树形节点点击
        nodeClick(node) {
            if (node.orgParentId) {
                this.orgParentId = node.orgParentId;
                this.getOrgTable();
            }
        },

        //树形封存
        switchChange() {
            console.log("封存状态");
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