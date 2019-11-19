<style scoped>
#authority_power{
    padding: 16px;
}
.operateBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 24px 32px;
    background-color: #fff;
}
.operateBar .btn{
    margin-left: 16px;
}
.operateBar .ipt{
    width: 306px;
    margin-left: 16px;
    margin-right: 24px;
}
</style>
<template>
    <div id="authority_power">
        <div class="operateBar">
            <el-row type="flex" align="middle">
                <el-col :span=".5">交接人：</el-col>
                <el-col :span=".5">
                    <el-input class="ipt" v-model="handoverPerson" size="small" placeholder="请输入姓名和工号"></el-input>
                </el-col>
                <el-col :span=".5">待交接权限：</el-col>
                <el-col :span=".5">
                    <el-select class="ipt" v-model="acceptRole" size="small" @change="acceptRoleChange" placeholder="请选择要交接的角色">
                        <el-option
                            v-for="item in roleList"
                            :key="item.tableId"
                            :label="item.tableName"
                            :value="item.tableId">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle">
                <el-col :span=".5" class="btn">
                    <el-button size="small" type="primary">托管</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small">移交</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small">回收</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {role_api1} from '../../request/api';

export default {
    name: 'power',             /* 权限移交 */
    data() {
        return {
            handoverPerson: undefined,          /* 交接人 */
            acceptRole: undefined,              /* 要交接的角色 */
            roleList: [],                       /* 要交接的角色供选值 */
        };
    },
    mounted() {},
    methods: {
        // 要交接的角色改变
        acceptRoleChange(role) {},
    }
}
</script>