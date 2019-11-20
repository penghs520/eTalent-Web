<style scoped lang="scss">
#authority_search {
    display: flex;
    height: 100%;
    // box-sizing: border-box;
    // text-align: left;
    .sideTree {
        width: 216px;
        height: 100%;
        background-color: #fff;
    }
    .wrap {
        flex: 1;
        height: 100%;
        padding: 16px 15px 0px 16px;
        box-sizing: border-box;
        background-color: #f0f0f0ff;
        .content {
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            overflow: auto;
            background-color: #fff;
        }
    }
}
</style>
<template>
    <div id="authority_search">
        <div class="sideTree">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <tree :treeData="treeData"></tree>
        </div>
        <div class="wrap">
            <div class="content">
                <commonTable :table="table"></commonTable>
                <el-dialog
                    :visible.sync="showUserList"
                    class="qinjeeDialogSmall"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center
                >
                    <span slot="title">新增</span>
                    <commonTable :table="addtable"></commonTable>
                    <div class="qinjeeDialogSmallCont"></div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="showUserList = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="showUserList = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import base from "../../assets/js/base";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import {
    userCheck_api1,
    userCheck_api2,
    userCheck_api3,
    userCheck_api4
} from "../../request/api";

export default {
    name: "search" /* 角色反查 */,
    components: {
        commonTable,
        tree
    },
    data() {
        return {
            table: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "姓名" /* 必须，表格头所显示的文字 */,
                        key:
                            "userName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */,
                        width: "200px" /* 非必须，该列的默认宽度 */
                    },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    { name: "单位", key: "businessUnitName", isShow: true },
                    { name: "部门", key: "deptName", isShow: true },
                    { name: "岗位名称", key: "postName", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                perColumn: [
                    /* 非必须，表格前置列配置，数组格式，数组中的每个元素就是一列 */
                    {
                        name: "角色" /* 必须，该列的表头名称 */,
                        width: "200px" /* 非必须，该列的宽度 */,
                        list: [
                            /* 必须，该列中要渲染的按钮，数组格式，数组中每个元素就是一个按钮 */
                            {
                                type:
                                    "primary" /* 非必须，按钮的样式，element-ui提供的按钮样式 */,
                                text: "角色" /* 必须，按钮上显示的文字 */,
                                method: this
                                    .columnBtn /* 必须，按钮点击时的回调，该函数接收1个参数：该行的数据 */
                            }
                        ]
                    }
                ],
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "input" /* 输入框 */,
                        placeholder:
                            "请输入工号或姓名" /* 非必须，输入框提示语 */,
                        key: "name" /* 必须，输入框绑定的变量字符串 */,
                        defaultVal: "" /* 非必须，默认值 */,
                        enter: this
                            .search /* 非必须，回车键的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "确定" /* 必须，按钮名称 */,
                        btnType:
                            "primary" /* 非必须，element-ui提供的按钮样式 */,
                        method: this
                            .search /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    }
                ],
                selectChange: this
                    .selectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [4, 8, 12] /* 非必须，页码可选的每页数量 */,
                    pageSize: 4 /* 非必须，默认每页显示的数量 */
                },
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this
                    .pageSizeChange /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */,
                pageChange: this
                    .pageChange /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
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
            currentPage: "1",
            pageSize: 4,
            searchVal: "",
            orgId: "35",
            showUserList: false,
            addtable: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "角色列表" /* 必须，表格头所显示的文字 */,
                        key:
                            "roleName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */,
                        width: "200px" /* 非必须，该列的默认宽度 */
                    }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [] /* 非必须，表格上面的操作栏配置 */,
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this
                    .selectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                pageHide: true
            },
            archiveId: "",
            value:"",
        };
    },
    mounted() {
        //获取组织结构
        this.getTree(1);
        this.eidtUser();
    },
    methods: {
        //修改用户角色
        eidtUser() {
            let send = {
                archiveId: 1,
                roleIdList: [1]
            };
            userCheck_api4(send, res => {
                base.log("s", "修改用户角色", roleIdList);
                let d = res.data;
                base.log("r", "修改用户角色", d);
                if (d.success) {
                } else {
                    base.error(d);
                }
            });
        },
        // 显示用户角色列表
        columnBtn(node) {
            this.archiveId = node.archiveId;
            this.getUserList(this.archiveId);
            this.showUserList = true;
        },
        //获取角色列表
        getUserList(archiveId) {
            let send = {
                archiveId
            };
            userCheck_api3(send, res => {
                base.log("s", "查询角色列表", send);
                let d = res.data;
                base.log("r", "查询角色列表", d);
                if (d.success) {
                    this.addtable.data = d.result;
                } else {
                    base.error(d);
                }
            });
        },
        // 获取树形结构
        getTree(isEnable) {
            let send = {
                isEnable
            };
            userCheck_api2(send, res => {
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result.list;
                    // this.orgId = d.result.list[0].orgId;
                } else {
                    base.error(d);
                }
            });
        },
        //点击节点获取数据
        nodeClick(node) {
            // this.orgId = node.orgId;
        },
        // 获取表格数据
        getTable() {
            let send = {
                currentPage: this.currentPage,
                orgId: this.orgId,
                pageSize: this.pageSize,
                userName: this.userName
            };
            base.log("s", "查询表格数据", send);
            userCheck_api1(send, res => {
                let d = res.data;
                base.log("r", "查询表格数据", d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                } else {
                    base.error(d);
                }
            });
        },
        // 根据用户名和工号查询
        search(val) {
            this.searchVal = val.name;
            this.currentPage = 1;
            this.getTable();
        },
        //页码改变
        pageChange(page) {
            this.currentPage = page;
            this.getTable();
        },
        // //页容量改变
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.currentPage = 1;
            this.getTable();
        }
    }
};
</script>