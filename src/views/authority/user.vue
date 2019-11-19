<style scoped>

</style>
<template>
    <div id="authority_user">
        <h1>用户授权</h1>
        <!-- 大弹窗 -->
        <el-dialog
            :visible.sync="roleTreeAddDialog"
            class="qinjeeDialogBig"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <div class="qinjeeDialogBigCont"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="roleTreeAddDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="roleTreeAddsure = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import {user_api1} from '../../request/api';

export default {
    name: 'user',             /* 用户授权 */
    data() {
        return {
            roleTreeAddDialog: true,
        };
    },
    mounted() {
    },
    methods: {

    }
}
</script>