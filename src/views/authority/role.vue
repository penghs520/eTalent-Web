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
}
.tree nav{
    padding: 13px 20px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #F1F2F2;
}
.tree .btnBar{
    padding: 16px 0;
}
.is-focusable{
    color: orange;
}
.roleTreeIcon{
    margin-right: 12px;
    color: #676B6D;
    font-size: 14px;
}
.roleTreeNode{
    font-size: 14px;
    color: #676B6D;
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
                <el-tree :data="roleTree" :props="roleTreeProps" @node-click="roleTreeNodeClick" :highlight-current="true" icon-class="aa" >
                    <span slot-scope="{ node, data }">
                        <span v-show="data.roleType === 'ROLE_GROUP'" class="qj-wenjianjia roleTreeIcon"></span>
                        <span v-show="data.roleType === 'ROLE'" class="qj-nav_client roleTreeIcon"></span>
                        <span class="roleTreeNode">{{node.label}}</span>
                    </span>
                </el-tree>
            </div>
            <div class="cont"></div>
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
import {role_api1, role_api2, role_api3, role_api4, role_api5, role_api6, role_api7} from '../../request/api';

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
        };
    },
    mounted() {
        console.clear();
        this.getRoleTree();
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
        roleTreeNodeClick(node) {
            this.roleTreeNode = node;
            this.roleTreeNodeGroupId = node.roleType === 'ROLE_GROUP' ? node.roleGroupId : undefined;
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
            console.log(this.roleTreeNode)
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

    }
}
</script>