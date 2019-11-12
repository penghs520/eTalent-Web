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
</style>
<style>
    .el-tree-node.is-current{
        color: orangered;
    }
</style>
<template>
    <div id="authority_role">
        <div class="mian">
            <div class="tree">
                <nav>角色授权</nav>
                <div class="btnBar">
                    <el-button size="mini" plain @click="add" :disabled="roleTreeNodeGroupId === undefined" >新增</el-button>
                    <el-button size="mini" plain @click="edit" >编辑</el-button>
                    <el-button size="mini" plain @click="delet" >删除</el-button>
                </div>
                <el-tree :data="roleTree" :props="roleTreeProps" @node-click="roleTreeNodeClick" :highlight-current="true" ></el-tree>
            </div>
            <div class="cont"></div>
        </div>

        <!-- 新增弹窗 -->
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
                    <el-form-item label="新增类型：" prop="type">
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
                    <template v-if="addForm.type === '新增角色'" >
                        <el-form-item label="角色名称：" prop="roleName">
                            <el-input v-model="addForm.roleName" placeholder="请输入角色名称" ></el-input>
                        </el-form-item>
                        <el-form-item label="角色性质：" prop="roleNature">
                            <el-select v-model="addForm.roleNature" style="width:100%;" placeholder="请选择角色性质">
                                <el-option value="普通用户"></el-option>
                                <el-option value="管理员"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeAddsure('addForm')" :loading="addRoleLoading" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {role_api1, role_api2, role_api3} from '../../request/api';

export default {
    name: 'role',             /* 角色授权 */
    data() {
        return {
            roleTree: [],
            roleTreeProps:{
                children: 'childRoleGroupList',
                label: 'roleGroupName'
            },
            roleTreeNodeGroupId: undefined,     /* 角色树被点击的分组的id */

            roleTreeAddDialog: false,
            addForm: {
                type: '',
                groupName: '',
                roleName: '',
                roleNature: '',
            },
            addRules: {
                type: [{ required: true, message: '请选择新增类型', trigger: 'change' }],
                groupName: [{ required: true, message: '请输入分组名称', trigger: 'change' }],
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
                roleNature: [{ required: false, message: '请选择角色性质', trigger: 'change' }],
            },
            addRoleLoading: false,
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
                    this.roleTree = d.result;
                }else{
                    base.error(d);
                }
            })
        },
        roleTreeNodeClick(node) {
            this.roleTreeNodeGroupId = node.roleType === 'ROLE_GROUP' ? node.roleGroupId : undefined;
        },
        add () {
            this.addForm = {
                type: '',
                groupName: '',
                roleName: '',
                roleNature: '',
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
                    console.log('成功');
                    console.log(this.addForm.type)
                    this.addForm.type === '新增角色' ? this.addRoleSubmit() : this.addRoleGroupSubmit();
                }
            });
        },
        addRoleGroupSubmit() {
            let send = {
                "parentRoleGroupId": this.roleTreeNodeGroupId,
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
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },
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
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },
        edit () {},
        delet () {},
    }
}
</script>