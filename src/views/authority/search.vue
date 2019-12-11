<style scoped lang="scss">
#authority_search {
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
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        background-color: #fff;
        .el-dialog__wrapper {
            .el-dialog__body {
                padding: 0px !important;
                border: 1px soild #ccc !important;
            }
        }
        .title {
            padding: 20px 24px;
            font-size: 16px;
            line-height: 16px;
            text-align: left;
            color: #676b6d;
            border-bottom: 1px solid #f1f2f2;
            margin-bottom: 16px;
        }
    }
}
</style>
<template>
    <div id="authority_search">
        <!-- 机构树 -->
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

        <!-- 角色列表 -->
        <div class="content">
            <div class="title">角色反查</div>
            <commonTable ref="commonTable" :table="table"></commonTable>
            <!-- 角色列表弹窗 -->
            <el-dialog
                :visible.sync="showUserList"
                v-if="showUserList"
                class="qinjeeDialogSmall"
                :append-to-body="true"
                :close-on-click-modal="false"
                center
            >
                <span slot="title">角色列表</span>
                <div class="qinjeeDialogSmallCont">
                    <tree :treeData="addUserTree"></tree>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="showUserList = false">取 消</el-button>
                    <el-button
                        size="small"
                        type="primary"
                        @click="showUserList = false;eidtUser()"
                    >确 定</el-button>
                </span>
            </el-dialog>
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
import { log } from 'util';

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
                        placeholder:"请输入工号或姓名" /* 非必须，输入框提示语 */,
                        key: "name" /* 必须，输入框绑定的变量字符串 */,
                        defaultVal: "",
                        enter: this.search
                    },
                    {
                        type: "button",
                        text: "查询",
                        btnType: "primary",
                        method: this.search
                    }
                ],
                selectChange: this.selectChange,
                loading: false,
                pageResize: false,
                pageHide: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange
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
                nodeClick: this.nodeClick
            },
            currentPage: 1,
            pageSize: 10,
            searchVal: "",
            orgId: "",
            showUserList: false,
            archiveId: "", //人员id
            value: false,
            addUserTree: {
                data: [] /* 必须，树形结构数据 */,
                nodeKey: "searchPageId",
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childRoleGroupList" /* 必须，子集key */,
                    label:"roleGroupName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                showDefaultIcon: true /* 非必须，是否显示默认图标 */,
                showCheckbox: true,
                checkClick: this.checkClick,
                showAllNode: false,
                nodeClick: this
                    .addNodeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */,
                defaultChecked: {
                    /* 非必须,默认勾选配置 */
                    nodeTypeKey:
                        "roleType" /* 必须,根据此字段来筛选我们想要的节点 */,
                    nodeTypeVal:
                        "ROLE" /* 必须,与 nodeTypeKey 对应的值,如果节点中nodeTypeKey的值与该值相等,该节点就是我们想要的节点 */,
                    childKey: "childRoleGroupList" /* 必须,子集字段 */,
                    hasKey:
                        "hasRole" /* 必须,如果节点中该字段的值经过 Boolean() 格式化后为true,就默认勾选 */
                }
            },
            editRoleIdList: []
        };
    },
    mounted() {
        //获取组织结构
        this.getTree();
    },
    methods: {
        //多选用户角色
        checkClick(val, data) {
            let editRoleIdList = data.checkedNodes.filter(
                item => item.roleType == "ROLE"
            );
            editRoleIdList = editRoleIdList.map(item => item.roleGroupId);
            this.editRoleIdList = editRoleIdList;
            console.log(data);
            console.log(this.editRoleIdList);
        },
        // 树形 封存开关
        switchChange() {
            this.getTree();
        },
        //修改用户角色
        eidtUser() {
            let send = {
                archiveId: this.archiveId,
                roleIdList: this.editRoleIdList
            };
            userCheck_api4(send, res => {
                base.log("s", "修改用户角色", send);
                let d = res.data;
                base.log("r", "修改用户角色", d);
                if (d.success) {
                    base.success(d);
                } else {
                    base.error(d);
                }
            });
        },
        // 点击角色显示用户角色列表窗口
        columnBtn(node) {
            this.archiveId = node.archiveId;
            this.getUserList(this.archiveId);
            this.showUserList = true;
        },
        //获取用户角色列表
        getUserList(archiveId) {
            let send = {
                archiveId
            };
            userCheck_api3(send, res => {
                base.log("s", "查询角色列表", send);
                let d = res.data;
                base.log("r", "查询角色列表", d);
                if (d.success) {
                    // 给节点加Id
                    let list = JSON.parse(JSON.stringify(d.result));
                    this.addId(list);
                    this.addUserTree.data = list;
                } else {
                    base.error(d);
                }
            });
        },
        addId(list, startIndex = 0, result) {
            let n = startIndex;
            for (let i = 0; i < list.length; i++) {
                n++;
                const item = list[i];
                if (
                    item.hasOwnProperty("childRoleGroupList") &&
                    item.childRoleGroupList &&
                    item.childRoleGroupList.length > 0
                ) {
                    item.searchPageId = n;
                    this.addId(item.childRoleGroupList, n);
                } else {
                    item.searchPageId = n;
                }
            }
        },
        // 获取树形结构
        getTree() {
            let send = {
                isEnable: this.value ? 0 : 1
            };
            userCheck_api2(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result;
                } else {
                    base.error(d);
                }
            });
        },
        //点击树形节点获取数据
        nodeClick(node) {
            this.orgId = node.orgId;
            console.log(node);
            
            // 重置表格操作栏
            this.$refs.commonTable.resizeOperationBar();
            this.search({ name: "" });
        },
        // 获取表格数据
        getTable() {
            this.table.loading = true;
            let send = {
                currentPage: this.currentPage,
                orgId: this.orgId,
                pageSize: this.pageSize,
                userName: this.searchVal
            };
            base.log("s", "查询表格数据", send);
            userCheck_api1(send, res => {
                let d = res.data;
                base.log("r", "查询表格数据", d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                    this.table.loading = false;
                } else {
                    base.error(d);
                }
            });
        },
        // 根据用户名和工号查询用户列表
        search(val) {
            this.searchVal = val.name;
            this.currentPage = 1;
            this.pageSize = 10;
            this.table.pageResize = true;
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
            this.table.pageResize = true;
            this.getTable();
        }
    }
};
</script>