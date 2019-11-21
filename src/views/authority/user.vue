<style scoped lang="scss">
#authority_user,
.mian,
.tree,
.cont,
.isPowering,
.mainCont {
    height: 100%;
    background-color: #fff;
}
.mian .mainCont {
    display: flex;
}
.tree {
    width: 216px;
    background-color: #fff;
}
.tree nav {
    padding: 13px 20px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #f1f2f2;
}
.cont {
    width: calc(100% - 216px);
    border: 10px solid #f0f0f0;
    box-sizing: border-box;
    background-color: #fff;
    box-sizing: border-box;
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
.qinjeeDialogBigCont {
    display: flex;
    .addAuthorityTree {
        width: 216px;
        overflow-x: hidden;
        box-sizing: border-box;
        .addAuthorityInput {
            margin-bottom: 20px;
        }
    }
    .addAuthorityTable {
        width: 600px;
        height: 470px;
        margin-left: 64px;
        overflow: auto;
    }
}
.checkbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .el-checkbox{
        width: 100%;
    }
    .text{
        width: calc(100% - 60px);
        font-size: 14px;
        color: #767A7CFF;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
    .company{
        width: 60px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #D0D0D0FF;
    };
}
.isPowering{
    text-align: left;
}

</style>
<style>
.authority_user_searchResult .el-checkbox{
    width: 100%;
}
.authority_user_searchResult .el-checkbox__label{
    width: calc(100% - 24px);
}
</style>
<template>
    <div id="authority_user">
        <div class="mian">
            <div class="mainCont" v-show="!isPowering">
                <div class="tree">
                    <nav>用户授权</nav>
                    <tree :treeData="treeData"></tree>
                </div>
                <div class="cont">
                    <div class="title" v-if="roleNode">{{roleNode.roleGroupName}}</div>
                    <commonTable v-show="roleNode" :table="table"></commonTable>
                    <el-dialog
                        :visible.sync="addAuthority"
                        class="qinjeeDialogBig"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">人员选择</span>
                        <div class="qinjeeDialogBigCont">
                            <div class="addAuthorityTree">
                                <el-input
                                    class="addAuthorityInput"
                                    v-model="searchVal"
                                    placeholder="请输入工号或姓名"
                                    size="small"
                                    clearable=""
                                    @keyup.enter.native="searchUser"
                                ></el-input>
                                <tree :treeData="addAuthorityTree" v-if="searchVal== ''"></tree>
                                <div class="searchResult authority_user_searchResult" v-if="showSearchResult">
                                    <el-checkbox-group v-model="checkedList" @change="changeResult">
                                        <div v-for="item in resultList" :key="item.archiveId">
                                            <el-checkbox :label="item">
                                                <div class="checkbox">
                                                    <span class="text">{{item.userName}} ({{item.employeeNumber}})</span>
                                                    <span class="company">{{item.deptFullName}}</span>
                                                </div>
                                            </el-checkbox>
                                        </div>
                                    </el-checkbox-group>
                                </div>
                                <!-- <commonTable :table="searchResultTable" v-if="showSearchResult"></commonTable> -->
                            </div>
                            <!-- 新增人员选择列表 -->
                            <div class="addAuthorityTable">
                                <el-table
                                    :data="addAuthorityTable"
                                    style="width: 100%"
                                    max-height="470"
                                >
                                    <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
                                    <el-table-column prop="employeeNumber" label="工号" width="120"></el-table-column>
                                    <el-table-column prop="orgFullName" label="机构全称" width="120"></el-table-column>
                                    <el-table-column prop="postName" label="岗位" width="120"></el-table-column>
                                    <el-table-column fixed="right" label="删除" width="120">
                                        <template slot-scope="scope">
                                            <el-button
                                                @click.native.prevent="deleteRow(scope.$index, addAuthorityTable)"
                                                type="text"
                                                size="small"
                                            >移除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="addAuthority = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="addAuthorityClick">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
            <div v-show="isPowering" class="isPowering">
                <el-button type="text" @click="isPowering = false" style="margin-left: 24px;" >返回</el-button>
                <powerCommon :data="powerData" ></powerCommon>
            </div>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import commonTable from "../../components/table/commonTable";
import tree from "../../components/tree/tree";
import powerCommon from '../../components/powerCommon/powerCommon';
import {
    user_api1,
    user_api2,
    user_api3,
    user_api4,
    user_api5,
    user_api6,
    user_api7,
    user_api8
} from "../../request/api";

export default {
    name: "user" /* 用户授权 */,
    components: { tree, commonTable, powerCommon },
    data() {
        return {
            treeData: {
                data: [
                    {
                        childRoleGroupList: [],
                        roleGroupName: "角色分类",
                        roleType: "ROLE_GROUP",
                        roleGroupId: "top"
                    }
                ] /* 必须，树形结构数据 */,
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childRoleGroupList" /* 必须，子集key */,
                    label:
                        "roleGroupName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key:
                            "roleType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "ROLE_GROUP" /* 必须，key对应的值 */,
                        icon: "qj-wenjianjia" /* 必须，图标类名 */
                    },
                    {
                        key:
                            "roleType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "ROLE" /* 必须，key对应的值 */,
                        icon: "qj-nav_client" /* 必须，图标类名 */
                    }
                ],
                showDefaultIcon: false /* 非必须，是否显示默认图标 */,
                nodeClick: this
                    .roleNodeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            },
            roleNode: null /* 当前角色节点 */,
            table: {
                head: [
                    { name: "姓名", key: "userName", isShow: true },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    {
                        name: "机构名称",
                        key: "businessUnitName",
                        isShow: true,
                        width: "200px"
                    },
                    {
                        name: "部门",
                        key: "deptName",
                        isShow: true,
                        width: "400px"
                    },
                    { name: "岗位", key: "postName", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        method: this
                            .add /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType: "plain" /* 非必须，element-ui提供的按钮样式 */,
                        method: this
                            .delet /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    }
                ],
                perColumn: [
                    /* 非必须，表格前置列配置，数组格式，数组中的每个元素就是一列 */
                    {
                        name: "操作" /* 必须，该列的表头名称 */,
                        width: "60px" /* 非必须，该列的宽度 */,
                        list: [
                            /* 必须，该列中要渲染的按钮，数组格式，数组中每个元素就是一个按钮 */
                            {
                                type:
                                    "primary" /* 非必须，按钮的样式，element-ui提供的按钮样式 */,
                                text: "授权" /* 必须，按钮上显示的文字 */,
                                method: this
                                    .power /* 必须，按钮点击时的回调，该函数接收1个参数：该行的数据 */
                            }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this
                    .selectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                loading: false,
                pageResize: false,
                pageSizeChange: this
                    .pageSizeChange /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */,
                pageChange: this
                    .pageChange /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            currentPage: 1,
            pageSize: 10,
            delList: [],
            addAuthority: false,
            searchVal: "",
            addAuthorityTree: {
                data: [] /* 必须，树形结构数据 */,
                // nodeKey: "orgCode" /* 必须, 节点数据中某个字段,一般是id字段 */,
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childOrgList" /* 必须，子集key */,
                    label:
                        "orgFullName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "GROUP" /* 必须，key对应的值 */,
                        icon: "qj-wenjianjia" /* 必须，图标类名 */
                    }
                ],
                showCheckbox: true /* 非必须，是否显示多选框 */,
                checkClick: this
                    .checkClick /* 非必须，点击多选框事件,接收两个参数,当前选中的节点数据,树中选中的所有节点*/,
                showDefaultIcon: true /* 非必须，是否显示默认图标 */,
                showAllNode: false /* 非必须，是否展开所有的子节点*/
                // nodeClick: this.nodeClick,   /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            },
            addAuthorityTable: [],
            showSearchResult: false,
            roleGroupId: "",
            resultList: [],
            checkedList: [],

            isPowering: false,
            powerData: {
                showTab: ['管理范围权限'],          /* 必须，要显示的tab */
                tabActive: '管理范围权限',                                      /* 非必须，默认显示哪个tab */
                loading: false,                                           /* 非必须，加载动画 */
                roleTreeRoleId: 1,

                // 管理范围权限
                rangeData: [],
                rangeProps:{
                    children: 'childOrganizationList',
                    label: 'orgName'
                },
                rangeCheck: this.rangeCheck
            },
            rowArchiveId: undefined,
        };
    },
    mounted() {
        this.getRoleTree();
    },
    methods: {
        // 弹出框 确定添加角色
        addAuthorityClick() {
            console.log("弹出层确定添加角色");

            this.addAuthority = false;
            let addAuthorityList = this.addAuthorityTable.map(
                item => item.archiveId
            );
            let send = {
                archiveIdList: addAuthorityList,
                roleId: this.roleGroupId
            };
            user_api6(send, res => {
                base.log("s", "确定添加角色", send);
                let d = res.data;
                this.table.loading = false;
                base.log("r", "确定添加角色", d);
                if (d.success) {
                    base.success(d);
                } else {
                    base.error(d);
                }
            });
        },
        changeResult(val) {
            console.log(val);
            val.forEach(sec => {
                let judge = true;
                this.addAuthorityTable.forEach(item => {
                    if (sec.archiveId == item.archiveId) {
                        judge = false;
                    }
                });
                if (judge) {
                    this.addAuthorityTable.push(sec);
                }
            });
        },
        //弹出框树形点击多选框添加人员
        checkClick(val, data) {
            console.log(val);
            console.log(data);

            let userList = data.checkedNodes.filter(item => item.archiveId);
            userList.forEach(sec => {
                let judge = true;
                this.addAuthorityTable.forEach(item => {
                    if (sec.archiveId == item.archiveId) {
                        judge = false;
                    }
                });
                if (judge) {
                    this.addAuthorityTable.push(sec);
                }
            });
            // this.addAuthorityTable = userList
        },
        //弹出框点击搜索
        searchUser() {
            if (this.searchVal.length == 0) {
                this.$message.error("请输入搜索内容");
                return;
            }
            this.searchPersonList();
            this.showSearchResult = true;
        },
        //弹出框根据工号和姓名点击搜索
        searchPersonList() {
            let send = {
                userName: this.searchVal,
                currentPage: 1,
                pageSize: 10
            };
            user_api5(send, res => {
                base.log("s", "查询用户列表", send);
                let d = res.data;
                base.log("r", "查询用户列表", d);
                if (d.success) {
                    this.resultList = d.result.list;
                } else {
                    base.error(d);
                }
            });
        },
        //弹出框移除新增人员表格列
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        // 获取角色树
        getRoleTree() {
            user_api1(null, res => {
                let d = res.data;
                base.log("r", "获取角色树", d);
                if (d.success) {
                    this.treeData.data[0].childRoleGroupList = d.result;
                } else {
                    base.error(d);
                }
            });
        },

        // 角色树节点被点击
        roleNodeClick(node) {
            console.log(node);
            this.roleGroupId = node.roleGroupId;
            if (node.roleType === "ROLE") {
                this.roleNode = node;
                this.getUserTable(node.roleGroupId);
            }
        },

        // 根据角色id查询用户列表
        getUserTable(id) {
            let send = {
                roleId: id,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            };
            this.table.loading = true;
            base.log("s", "查询用户列表", send);
            user_api2(send, res => {
                let d = res.data;
                this.table.loading = false;
                base.log("r", "查询用户列表", d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                } else {
                    base.error(d);
                }
            });
        },

        // 获取新增角色的树形
        add() {
            // this.table.pageResize = true;
            this.addAuthorityTable = [];
            this.addAuthority = true;
            user_api4(null, res => {
                let d = res.data;
                base.log("r", "获取机构档案树", d);
                if (d.success) {
                    let newTreeData = JSON.parse(JSON.stringify(d.result));
                    this.getTreeData(newTreeData);
                    this.addAuthorityTree.data = newTreeData;
                } else {
                    base.error(d);
                }
            });
        },

        //获取新的树形结构方法
        getTreeData(newTreeData) {
            for (let i = 0; i < newTreeData.length; i++) {
                let temp = newTreeData[i];
                if (temp.childOrgList) {
                    this.getTreeData(temp.childOrgList);
                    if (temp.childArchiveList) {
                        temp.childArchiveList.forEach(item => {
                            item.orgFullName = item.userName;
                        });
                        temp.childOrgList.push(...temp.childArchiveList);
                    }
                } else if (!temp.childOrgList && temp.childArchiveList) {
                    temp.childArchiveList.forEach(item => {
                        item.orgFullName = item.userName;
                    });
                    temp.childOrgList = temp.childArchiveList;
                }
            }
        },

        // 删除
        delet() {
            // this.table.pageResize = false;
            let archiveIdList = this.delList.map(item => item.archiveId);
            let send = {
                archiveIdList,
                roleId: this.roleNode.roleGroupId
            };
            this.table.loading = true;
            base.log("s", "删除用户列表", send);
            user_api3(send, res => {
                let d = res.data;
                this.table.loading = false;
                base.log("r", "删除用户列表", d);
                if (d.success) {
                    this.table.data = this.table.data.filter(
                        item => !archiveIdList.includes(item.archiveId)
                    );
                } else {
                    base.error(d);
                }
            });
        },

        // 授权
        power(row) {
            console.log(row);
            this.rowArchiveId = row.archiveId;
            // let send = {
            //     "roleId": this.roleGroupId,
            //     "archiveId": row.archiveId
            // };
            let send = {
                "roleId": 1,
                "archiveId": 1
            };
            base.log('s', '获取机构树', send);
            this.powerData.loading = true;
            user_api7(send, res => {
                this.powerData.loading = false;
                let d = res.data;
                base.log('r', '获取机构树', d);
                if (d.success) {
                    this.powerData.rangeData = d.result;
                    this.isPowering = true;
                }else{
                    base.error(d);
                }
            })
        },

        // 授权提交
        rangeCheck(list) {
            let idList = list.map(item => item.orgId);
            let send = {
                "orgIdList": idList,
                "roleId": this.roleGroupId,
                "archiveId": this.rowArchiveId
            };
            base.log('s', '修改机构权限', send);
            this.powerData.loading = true;
            user_api8(send, res => {
                let d = res.data;
                base.log('r', '修改机构权限', d);
                this.powerData.loading = false;
                if (!d.success) {
                    base.error(d);
                }
            })
        },

        // 页码
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getUserTable(this.roleNode.roleGroupId);
        },
        pageChange(index) {
            this.currentPage = index;
            this.getUserTable(this.roleNode.parentRoleGroupId);
        },
        //多选删除
        selectChange(val) {
            this.delList = val;
        }
    },
    watch: {
        searchVal(newVal) {
            if (newVal.length == 0) {
                this.showSearchResult = false;
            }
        }
    }
};
</script>