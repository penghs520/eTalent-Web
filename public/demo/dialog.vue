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
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="roleTreeAddsure = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>