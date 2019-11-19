<style scoped>
#authority_role,.mian,.tree,.cont{
    height: 100%;
}
.mian{
    display: flex;
}
.tree{
    width: 216px;
}
.cont{
    width: calc(100% - 216px);
    background-color: #F0F0F0;
    padding: 10px;
    box-sizing: border-box;
}
.cont>div{
    background-color: #fff;
    height: 100%;
}
.tree nav{
    padding: 13px 20px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #F1F2F2;
}
.tree .btnBar{
    padding: 16px 0 10px 0;
}
.is-focusable{
    color: orange;
}
.roleTreeIcon{
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
.roleTreeNode{
    font-size: 14px;
    color: #676B6D;
}

.tab{
    padding: 0 24px;
    border-bottom: 2px solid #F1F2F2;
}
.tabCont{
    height: calc(100% - 54px);
}
.tabCont li{
    overflow: auto;
    height: 100%;
}
.serverTree{
    /* padding: 0 24px; */
    background: linear-gradient(#fff 50%, #FAFAFA 50%);
    background-size: 100% 108px;
}
.serverIcon{
    margin-left: 6px;
    margin-right: 12px;
}

.rangeTreeHeader{
    position: relative;
    text-align: left;
    background-color: #F8F8F8;
}
.rangeTreeHeader span{
    font-size: 14px;
    line-height: 54px;
    font-weight: 600;
}
.rangeTreeHeader span:first-child{
    margin-left: 54px;
}
.rangeTreeHeader span:last-child{
    position: absolute;
    left: calc(300px + 20%);
}

.fieldSelect{
    padding: 18px 24px;
    font-size: 14px;
}
.fieldTableHeader{
    font-weight: 600;
}
</style>
<style>
    #authority_role .serverTree .el-tree-node__content{
        height: 54px;
    }
    #authority_role .leftTree .el-tree-node__content{
        height: 40px;
    }
    #authority_role .serverTree .el-tree-node__expand-icon{
        margin-right: 6px;
        margin-left: 24px;
    }
    /* #authority_role .el-tabs__header{
        margin-bottom: 0;
    }
    #authority_role .el-tabs__item{
        height: 64px;
        line-height: 64px;
        font-size: 16px;
    }
    #authority_role .el-tabs__item:not(.is-active){
        color: #676B6D;
    }
    #authority_role .el-tabs__nav-wrap::after{
        background-color: rgba(0, 0, 0, 0);
    } */

    #authority_role .el-tree-node__content{
        position: relative;
    }
    #authority_role .rangeTree .el-checkbox{
        position: absolute;
        left: calc(300px + 20%);
    }
    #authority_role .fieldTableHeader th{
        background-color: #FAFAFA;
    }
    #authority_role .fieldTableRow{
        height: 54px;
    }

</style>

<template>
    <div id="authority_role">
        <div class="mian">
            <div class="tree">
                <nav>角色授权</nav>
                <div class="btnBar">
                    <el-button size="mini" plain @click="add" :disabled="roleTreeNodeGroupId === undefined" >新增</el-button>
                    <el-button size="mini" plain @click="edit" :disabled="!roleTreeNode || roleTreeNodeGroupId === 'top'" >编辑</el-button>
                    <el-button size="mini" plain @click="delet" :disabled="!roleTreeNode || roleTreeNodeGroupId === 'top'" >删除</el-button>
                </div>
                <el-tree class="leftTree" key="leftTree" :data="roleTree" :props="roleTreeProps" @node-click="roleTreeNodeClick" :highlight-current="true" icon-class="aa" >
                    <span slot-scope="{ node, data }">
                        <span v-show="data.roleType === 'ROLE_GROUP'" class="qj-wenjianjia roleTreeIcon"></span>
                        <span v-show="data.roleType === 'ROLE'" class="qj-nav_client roleTreeIcon"></span>
                        <span class="roleTreeNode">{{node.label}}</span>
                    </span>
                </el-tree>
            </div>
            <div v-show="roleTreeRoleId" class="cont">
                <div>
                    <el-tabs class="tab" v-model="tabActive" @tab-click="tabClick" >
                        <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
                    </el-tabs>
                    <ul class="tabCont">
                        <!-- 功能权限 -->
                        <li 
                            v-if="tabActive === 'server'" 
                            v-loading='contLoading' 
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.5)" 
                            >
                            <el-tree class="serverTree" key="serverTree" :data="serverData" :props="serverProps" ref="serverTree" node-key="menuId" show-checkbox @check="serverCheck" :highlight-current="true" >
                                <span slot-scope="{ node, data }">
                                    <span v-show="data.funcType !== 'NODE'" class="qj-wenjianjia roleTreeIcon serverIcon"></span>
                                    <span v-show="data.funcType === 'NODE'" class="qj-detail roleTreeIcon serverIcon"></span>
                                    <span class="roleTreeNode">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </li>

                        <!-- 管理范围权限 -->
                        <li 
                            v-if="tabActive === 'range'"
                            v-loading='contLoading' 
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.5)"
                            >
                            <div class="rangeTreeHeader">
                                <span>机构范围</span>
                                <span>授权</span>
                            </div>
                            <el-tree class="serverTree rangeTree" key="rangeTree" :data="rangeData" :props="rangeProps" ref="rangeTree" node-key="orgId" show-checkbox @check="rangeCheck" :highlight-current="true" >
                                <span slot-scope="{ node}">
                                    <span class="roleTreeNode">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </li>
                        
                        <!-- 字段权限 -->
                        <li 
                            v-if="tabActive === 'field'"
                            v-loading='contLoading' 
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.5)"
                            >
                            <el-row class="fieldSelect" type="flex" align="middle" >
                                <el-col :span=".5">自定义表：</el-col>
                                <el-col :span=".5" style="margin-left: 10px;" >
                                    <el-select v-model="tableChecked" size="small" @change="fieldSelectChange" placeholder="请选择自定义表">
                                        <el-option
                                            v-for="item in tableList"
                                            :key="item.tableId"
                                            :label="item.tableName"
                                            :value="item.tableId">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-table
                                ref="multipleTable"
                                :data="fieldTableData"
                                stripe
                                :border="false"
                                header-row-class-name="fieldTableHeader"
                                row-class-name="fieldTableRow"
                                tooltip-effect="dark"
                                style="width: 100%">
                                <!-- <el-table-column label="名称" width="120">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column> -->
                                <el-table-column prop="fieldName" label="名称" class="fieldTableFirstLine" width="120"></el-table-column>
                                <el-table-column prop="name" label="可读" width="120">
                                    <template slot-scope="scope">
                                        <!-- <el-checkbox v-model="scope.row.readWriteCode"  >备选项</el-checkbox> -->
                                        <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateRead" v-model="scope.row.isRead" :checked="scope.row.isRead" @change="fieldChangeAll($event,'read')" ></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.isRead" :checked="scope.row.isRead" @change="fieldChangeSingle($event,'read',scope.row)" ></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="新增可写" width="120">
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateAddWrite" v-model="scope.row.isAddWrite" @change="fieldChangeAll($event,'addWrite')" ></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.isAddWrite" @change="fieldChangeSingle($event,'addWrite',scope.row) "></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="address" label="可写">
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateWrite" v-model="scope.row.isWrite" @change="fieldChangeAll($event,'write')" ></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.isWrite" @change="fieldChangeSingle($event,'write',scope.row)" ></el-checkbox>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 角色树--新增弹窗 -->
        <el-dialog
            :visible.sync="roleTreeAddDialog"
            v-if="roleTreeAddDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <div>
                <el-form :model="addForm" ref="addForm" :rules="addRules" size="small" class="addForm" label-position="left" label-width="100px" status-icon >
                    <el-form-item v-if="roleTreeNodeGroupId === 'top'" label="新增类型：" prop="type">
                        <el-select v-model="addForm.type" style="width:100%;" placeholder="请选择新增类型" @change="addFormTypeChange" >
                            <el-option value="新增分组"></el-option>
                            <el-option value="新增角色"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="addForm.type === '新增分组'" >
                        <el-form-item label="分组名称：" prop="groupName">
                            <el-input v-model="addForm.groupName" placeholder="请输入分组名称" ></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="addForm.type === '新增角色' || roleTreeNodeGroupId !== 'top'" >
                        <el-form-item label="角色名称：" prop="roleName">
                            <el-input v-model="addForm.roleName" placeholder="请输入角色名称" ></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeAddsure('addForm')" :loading="addRoleLoading" >确 定</el-button>
            </span>
        </el-dialog>

        <!-- 角色树--编辑弹窗 -->
        <el-dialog
            :visible.sync="roleTreeEditDialog"
            v-if="roleTreeEditDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >编辑</span>
            <div>
                <el-form :model="editForm" ref="editForm" :rules="editRules" size="small" class="addForm" label-position="left" label-width="100px" status-icon >
                    <template v-if="editRoleType === 'ROLE_GROUP'" >
                        <el-form-item label="分组名称：" prop="groupName">
                            <el-input v-model="editForm.groupName" placeholder="请输入分组名称" clearable="" ></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="editRoleType === 'ROLE'" >
                        <el-form-item label="角色名称：" prop="roleName">
                            <el-input v-model="editForm.roleName" placeholder="请输入角色名称" clearable="" ></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeEditDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeEditsure('editForm')" :loading="editRoleLoading" >确 定</el-button>
            </span>
        </el-dialog>

        <!-- 角色树--删除弹窗 -->
        <el-dialog
            :visible.sync="roleTreeDeleteDialog"
            v-if="roleTreeDeleteDialog"
            class="qinjeeDialogMini"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >确认删除</span>
            <div class="qinjeeDialogMiniCont">
                <i class="el-icon-warning danger icon" ></i>
                <span>确定删除：{{roleTreeNode.roleGroupName}}？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeDeleteDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeDeleteSure" :loading="deleteRoleLoading" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7, role_api8, role_api9, role_api10, role_api11,
        role_api12, role_api13, role_api14} from '../../request/api';

export default {
    name: 'role',             /* 角色授权 */
    data() {
        return {
            roleTree: [
                {
                    childRoleGroupList: [],
                    roleGroupName: '角色分类',
                    roleType: 'ROLE_GROUP',
                    roleGroupId: 'top'
                }
            ],
            roleTreeProps:{
                children: 'childRoleGroupList',
                label: 'roleGroupName'
            },
            roleTreeNodeGroupId: undefined,     /* 角色树被点击的分组的id */
            roleTreeNodeIsTop: false,           /* 角色树被点击的节点是否是顶部节点 */
            roleTreeNode: null,                 /* 角色树被点击的节点 */

            // 角色树--新增
            roleTreeAddDialog: false,
            addForm: {
                type: '',
                groupName: '',
                roleName: '',
            },
            addRules: {
                type: [{ required: true, message: '请选择新增类型', trigger: 'change' }],
                groupName: [{ required: true, message: '请输入分组名称', trigger: 'change' }],
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
            },
            addRoleLoading: false,

            // 角色树--编辑
            roleTreeEditDialog: false,
            editForm: {
                groupName: '',
                roleName: '',
            },
            editRules: {
                groupName: [{ required: true, message: '请输入分组名称', trigger: 'change' }],
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
            },
            editRoleLoading: false,
            editRoleType: '',

            // 角色树--删除
            roleTreeDeleteDialog: false,
            deleteRoleLoading: false,

            // tab标签
            tabs: [
                {label: '功能权限', name: 'server'},
                {label: '管理范围权限', name: 'range'},
                {label: '字段权限', name: 'field'},
            ],
            tabActive: 'server',
            contLoading: false,         /* 内容区加载动画 */
            currentTab: '功能权限',             /* 当前tab的名称 */

            roleTreeRoleId: undefined,  /* 角色树被点击的角色id */

            // 功能权限
            serverData: [],
            serverProps:{
                children: 'childMenuList',
                label: 'menuName'
            },

            // 管理范围权限
            rangeData: [],
            rangeProps:{
                children: 'childOrganizationList',
                label: 'orgName'
            },

            // 自定义字段表
            tableList: [],
            tableChecked: '',
            fieldTableData: [],
        };
    },
    mounted() {
        console.clear();
        this.getRoleTree();
        this.getTable();
    },
    methods: {
        // 角色树查询
        getRoleTree() {
            role_api1(null, res => {
                let d = res.data;
                base.log('r', '角色树查询', d);
                if (d.success) {
                    this.roleTree[0].childRoleGroupList = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 角色树节点被点击
        roleTreeNodeClick(node) {
            this.roleTreeNode = node;
            this.roleTreeNodeGroupId = node.roleType === 'ROLE_GROUP' ? node.roleGroupId : undefined;

            if (node.roleType === 'ROLE') {
                if (this.roleTreeRoleId !== node.roleGroupId) {
                    this.roleTreeRoleId = node.roleGroupId;
                    this.getCont(node.roleGroupId);
                };
            };
        },

        // 新增角色（组）
        add () {
            this.addForm = {
                type: '',
                groupName: '',
                roleName: '',
            };
            this.roleTreeAddDialog = true;
        },
        addFormTypeChange() {
            // 清空校验
            this.$refs.addForm.clearValidate();
        },
        roleTreeAddsure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addForm.type === '新增角色'|| this.roleTreeNodeGroupId !== 'top' ? this.addRoleSubmit() : this.addRoleGroupSubmit();
                }
            });
        },
        // 新增角色组--提交
        addRoleGroupSubmit() {
            let send = {
                "roleGroupName": this.addForm.groupName
            };
            this.addRoleLoading = true;
            base.log('s', '新增角色组', send);
            role_api3(send, res => {
                this.addRoleLoading = false;
                let d = res.data;
                base.log('r', '新增角色组', d);
                if (d.success) {
                    this.roleTreeAddDialog = false;
                    this.getRoleTree();
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },
        // 新增角色--提交
        addRoleSubmit() {
            let send = {
                "roleGroupId": this.roleTreeNodeGroupId,
                "roleName": this.addForm.roleName
            };
            this.addRoleLoading = true;
            base.log('s', '新增角色', send);
            role_api2(send, res => {
                this.addRoleLoading = false;
                let d = res.data;
                base.log('r', '新增角色', d);
                if (d.success) {
                    this.roleTreeAddDialog = false;
                    this.getRoleTree();
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 编辑角色（组）
        edit () {
            this.editRoleType = this.roleTreeNode.roleType;
            this.editForm = {
                groupName: this.roleTreeNode.roleGroupName,
                roleName: this.roleTreeNode.roleGroupName,
            };
            this.roleTreeEditDialog = true;
        },
        // 编辑确定
        roleTreeEditsure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editRoleType === 'ROLE' ? this.editRoleSubmit() : this.editRoleGroupSubmit();
                }
            });
        },
        // 编辑角色--提交
        editRoleSubmit() {
            let send = {
                "roleGroupId": this.roleTreeNode.parentRoleGroupId,
                "roleId": this.roleTreeNode.roleGroupId,
                "roleName": this.editForm.roleName
            };
            this.editRoleLoading = true;
            base.log('s', '编辑角色', send);
            role_api4(send, res => {
                this.editRoleLoading = false;
                let d = res.data;
                base.log('r', '编辑角色', d);
                if (d.success) {
                    this.getRoleTree();
                    base.success(d);
                    this.roleTreeEditDialog = false;
                }else{
                    base.error(d);
                }
            })
        },
        // 编辑角色组--提交
        editRoleGroupSubmit() {
            let send = {
                "roleGroupId": this.roleTreeNode.roleGroupId,
                "roleGroupName": this.editForm.groupName
            };
            this.editRoleLoading = true;
            base.log('s', '编辑角色组', send);
            role_api5(send, res => {
                this.editRoleLoading = false;
                let d = res.data;
                base.log('r', '编辑角色组', d);
                if (d.success) {
                    this.getRoleTree();
                    base.success(d);
                    this.roleTreeEditDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 删除角色（组）
        delet () {
            this.roleTreeDeleteDialog = true;
        },
        // 删除确定
        roleTreeDeleteSure() {
            this.roleTreeNode.roleType === 'ROLE' ? this.deleteRoleSubmit() : this.deleteRoleGroupSubmit();
        },
        // 删除角色
        deleteRoleSubmit() {
            let send = {"roleId": this.roleTreeNode.roleGroupId};
            this.deleteRoleLoading = true;
            base.log('s', '删除角色', send);
            role_api6(send, res => {
                this.deleteRoleLoading = false;
                let d = res.data;
                base.log('r', '删除角色', d);
                if (d.success) {
                    this.getRoleTree();
                    this.roleTreeDeleteDialog = false;
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },
        // 删除角色组
        deleteRoleGroupSubmit() {
            let send = {"roleGroupId": this.roleTreeNode.roleGroupId};
            this.deleteRoleLoading = true;
            base.log('s', '删除角色组', send);
            role_api7(send, res => {
                this.deleteRoleLoading = false;
                let d = res.data;
                base.log('r', '删除角色组', d);
                if (d.success) {
                    this.getRoleTree();
                    this.roleTreeDeleteDialog = false;
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 点击角色树的时候查询内容
        getCont(id) {
            switch (this.tabActive) {
                case 'server':
                    // 功能权限
                    this.getServer(id);
                    break;
                
                case 'range':
                    // 管理范围权限
                    this.getRange(id);
                    break;
                
                case 'field':
                    // 字段权限
                    if (this.tableChecked || this.tableChecked === 0) {
                        this.getTableCont(this.tableChecked);
                    }
                    break;
            
                default:
                    break;
            }
        },

        // tab被点击
        tabClick(tab) {
            if (this.currentTab === tab.label) {
                return false;
            };
            this.currentTab = tab.label;

            if (!this.roleTreeRoleId) {
                return false;
            };
            switch (tab.label) {
                case '功能权限':
                    this.getServer(this.roleTreeRoleId);
                    break;
                
                case '管理范围权限':
                    this.getRange(this.roleTreeRoleId);
                    break;
                
                case '字段权限':
                    if (this.tableChecked || this.tableChecked === 0) {
                        this.getTableCont(this.tableChecked);
                    }
                    break;
            
                default:
                    break;
            }
        },

        // 根据角色id查询角色功能权限树
        getServer(id) {
            let send = {"roleId": id};
            base.log('s', '角色功能权限树', send);
            this.contLoading = true;
            role_api8(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '角色功能权限树', d);
                if (d.success) {
                    // 赋值
                    this.serverData = d.result;
                    // 设置选中状态
                    let checkedNodeList = this.getHasMenu(d.result, 'funcType', 'NODE', 'childMenuList', 'hasMenu');
                    console.log(checkedNodeList)
                    this.$refs.serverTree.setCheckedKeys(checkedNodeList.map(item => {return item.menuId}));
                }else{
                    base.error(d);
                }
            })
        },

        // 获取已有权限的节点
        getHasMenu(list, nodeTypeKey, nodeTypeVal, childKey, hasKey) {
            let nodeList = new Array();
            this.getNode(list, nodeList, nodeTypeKey, nodeTypeVal, childKey);
            let result = nodeList.filter(item => {
                return item[hasKey];
            });
            return result;
        },

        // 获取权限node节点
        getNode(list,resultList, nodeTypeKey, nodeTypeVal, childKey) {
            list.forEach(item => {
                if (item[nodeTypeKey] === nodeTypeVal) {
                    resultList.push(item);
                }else{
                    this.getNode(item[childKey],resultList);
                }
            });
        },

        // 功能权限树选中值改变
        serverCheck() {
            let list = this.$refs.serverTree.getCheckedNodes(false,true);
            console.log(list)
            let send = {
                "roleId": this.roleTreeNode.roleGroupId,
                "menuIdList": list.map(item => {return item.menuId}),
            };
            base.log('s', '功能权限更新', send);
            this.contLoading = true;
            role_api9(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '功能权限更新', d);
                if (d.success) {
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 根据角色id查询管理范围权限树
        getRange(id) {
            let send = {"roleId": id};
            base.log('s', '角色管理范围权限树', send);
            this.contLoading = true;
            role_api10(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '角色管理范围权限树', d);
                if (d.success) {
                    // 赋值
                    this.rangeData = d.result;
                    // 设置选中状态
                    let checkedNodeList = this.getHasMenu(d.result, 'orgType', 'DETP', 'childOrganizationList', 'hasOrg');
                    this.$refs.rangeTree.setCheckedKeys(checkedNodeList.map(item => {return item.orgId}));
                }else{
                    base.error(d);
                }
            })
        },

        // 管理范围权限树选中值改变
        rangeCheck() {
            let list = this.$refs.rangeTree.getCheckedNodes(false,true);
            let send = {
                "roleId": this.roleTreeNode.roleGroupId,
                "orgIdList": list.map(item => {return item.orgId}),
            };
            base.log('s', '管理范围权限更新', send);
            this.contLoading = true;
            role_api11(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '管理范围权限更新', d);
                if (d.success) {
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 根据企业id查询字段表
        getTable() {
            role_api12(null, res => {
                let d = res.data;
                base.log('r', '根据企业id查询字段表', d);
                if (d.success) {
                    this.tableList = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // select change
        fieldSelectChange(v) {
            this.getTableCont(v);
        },

        // 查询自定义表字段列表
        getTableCont(tableId) {
            let send = {
                "roleId": this.roleTreeRoleId,
                "tableId": tableId
            };
            this.contLoading = true;
            base.log('s', '查询自定义表字段列表', send);
            role_api13(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '查询自定义表字段列表', d);
                if (d.success) {
                    // 添加权限字段
                    let list = this.addFieldKeys(d.result);
                    // 添加全选行
                    this.fieldTableData = this.addCheckAllRow(list);
                }else{
                    base.error(d);
                }
            })
        },

        // 数据处理，添加权限字段
        addFieldKeys(list) {
            let result = list.map(item => {
                item.isRead = false;
                item.isAddWrite = false;
                item.isWrite = false;
                switch (item.readWriteCode) {
                    case 'READ':
                        item.isRead = true;
                        break;

                    case 'ADDWRITE':
                        item.isRead = true;
                        item.isAddWrite = true;
                        break;
                        
                    case 'WRITE':
                        item.isRead = true;
                        item.isAddWrite = true;
                        item.isWrite = true;
                        break;
                
                    default:
                        break;
                }
                return item;
            });
            return result;
        },

        // 添加全选行
        addCheckAllRow(list) {
            // this.tableList
            // tableChecked
            let select = this.tableList.filter(item => {
                return item.tableId === this.tableChecked;
            });

            // 获取全选状态值
            let status = this.checkAllStatusVal(list);
            let row = {
                fieldName               : select[0]['tableName'],
                isRead                  : status.read[0],
                isAddWrite              : status.addWrite[0],
                isWrite                 : status.write[0],
                isIndeterminateRead     : status.read[1],
                isIndeterminateAddWrite : status.addWrite[1],
                isIndeterminateWrite    : status.write[1],
            };
            list.unshift(row);
            return list;
        },

        // 获取全选状态值
        checkAllStatusVal(list) {
            let read        = list.map(item => {return item.isRead});
            let addWrite    = list.map(item => {return item.isAddWrite});
            let write       = list.map(item => {return item.isWrite});
            // includes(true)
            let result = {
                read    : this.checkAllStatus(read),
                addWrite: this.checkAllStatus(addWrite),
                write   : this.checkAllStatus(write),
            };
            return result;
        },

        // 判断全选状态
        checkAllStatus(list) {
            let result = [false,false];
            if (!list.includes(true)) {
                result = [false,false];
            }else if (!list.includes(false)) {
                result = [true,false];
            }else{
                result = [false,true];
            };
            return result;
        },

        // 权限改变处理方法
        /**
         * @param {Boolean} 当前字段的权限： true/false
         * @param {String}  权限类型：read/addWrite/write
         * @param {Object}  当前行数据
         */
        fieldChange(v,type,row) {
            switch (type) {
                case 'read':
                    // 可读
                    if (v) {
                        row.isRead = true;
                    }else{
                        row.isRead = false;
                        row.isWrite = false;
                        row.isAddWrite = false;
                    }
                    break;
                
                case 'addWrite':
                    // 新增可写
                    if (v) {
                        row.isRead = true;
                        row.isAddWrite = true;
                    }else{
                        row.isAddWrite = false;
                        row.isWrite = false;
                    }
                    break;
                
                case 'write':
                    // 可写
                    if (v) {
                        row.isRead = true;
                        row.isAddWrite = true;
                        row.isWrite = true;
                    }else{
                        row.isWrite = false;
                    }
                    break;
            
                default:
                    break;
            };
            // 判断全选状态
            let list = this.fieldTableData.slice(1);
            let status = this.checkAllStatusVal(list);
            this.fieldTableData[0].isRead                  = status.read[0];
            this.fieldTableData[0].isAddWrite              = status.addWrite[0];
            this.fieldTableData[0].isWrite                 = status.write[0];
            this.fieldTableData[0].isIndeterminateRead     = status.read[1];
            this.fieldTableData[0].isIndeterminateAddWrite = status.addWrite[1];
            this.fieldTableData[0].isIndeterminateWrite    = status.write[1];
        },

        // 单个权限改变
        fieldChangeSingle(v,type,row) {
            this.fieldChange(v,type,row);
            let send = this.getSubmitData(row);
            this.fieldSubmit();
        },

        // 全选改变
        fieldChangeAll(v,type) {
            this.fieldTableData.map(item => {
                this.fieldChange(v,type,item);
            });
            this.fieldSubmit();
        },

        // 处理数据，获取可提交数据
        getSubmitData(data) {
            let result = {
                "roleId": this.roleTreeRoleId,
                "fieldId": data.fieldId,
                "readWriteCode": data.isWrite ? 'WRITE' : data.isAddWrite ? 'ADDWRITE' : data.isRead ? 'READ' : ''
            };
            return result;
        },

        // 权限提交
        fieldSubmit() {
            let send = this.fieldTableData.map(item => {
                return this.getSubmitData(item);
            });
            send.shift();
            base.log('s', '字段权限改变', send);
            this.contLoading = true;
            role_api14(send, res => {
                let d = res.data;
                base.log('s', '字段权限改变', d);
                this.contLoading = false;
                if (!d.success) {
                    base.error(d);
                }
            })
        },
    }
}
</script>