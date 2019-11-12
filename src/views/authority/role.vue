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
                    <el-button size="mini" plain @click="add" >新增</el-button>
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
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeAddsure = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {role_api1} from '../../request/api';

export default {
    name: 'role',             /* 角色授权 */
    data() {
        return {
            roleTree: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [{label: '三级 1-1-1'}]
                        }
                    ]
                }],
            roleTreeProps:{
                children: 'childRoleGroupList',
                label: 'roleGroupName'
            },

            roleTreeAddDialog: false,
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
        roleTreeNodeClick(a,b,c) {
            console.log('-------');
            console.log(a);
            console.log(b);
            console.log(c);
        },
        add () {
            this.roleTreeAddDialog = true;
        },
        edit () {},
        delet () {},
    }
}
</script>