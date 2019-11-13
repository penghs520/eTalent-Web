<template>
    <div>
        <!-- 中等弹窗 -->
        <el-dialog
            :visible.sync="roleTreeAddDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <span>需要注意的是内容是默认不居中的</span>
            <div class="qinjeeDialogSmallCont"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="roleTreeAddsure = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 小弹窗 -->
        <el-dialog
            :visible.sync="roleTreeDeleteDialog"
            v-if="roleTreeDeleteDialog"
            class="qinjeeDialogMini"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >确认删除</span>
            <div class="qinjeeDialogMiniCont">
                <i class="el-icon-warning warning icon" ></i>
                <i class="el-icon-warning danger icon" ></i>
                <i class="el-icon-warning success icon" ></i>
                <span>确定删除：{{roleTreeNode.roleGroupName}}？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeDeleteDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeDeletesure('editForm')" :loading="editRoleLoading" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>