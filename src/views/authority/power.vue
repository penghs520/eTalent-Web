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
.moveDialogIpt{
    width: 100%;
}
</style>
<template>
    <div id="authority_power">
        <div class="operateBar">
            <el-row type="flex" align="middle">
                <el-col :span=".5">交接人：</el-col>
                <el-col :span=".5">
                    <el-select
                        class="ipt"
                        v-model="handoverPerson"
                        filterable
                        remote
                        size="small"
                        reserve-keyword
                        @change="personChange($event,true)"
                        placeholder="请输入姓名和或工号"
                        :remote-method="remoteMethod"
                        :loading="personLoading">
                        <el-option
                            v-for="item in personList"
                            :key="item.archiveId"
                            :label="`${item.userName} (${item.employeeNumber})`"
                            :value="item.archiveId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span=".5">待交接权限：</el-col>
                <el-col :span=".5">
                    <el-select class="ipt" v-model="acceptRole" size="small" @change="acceptRoleChange" placeholder="请选择要交接的角色">
                        <el-option
                            v-for="item in roleList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle">
                <el-col :span=".5" class="btn">
                    <el-button size="small" type="primary">托管</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small" @click="move" :disabled="!acceptRole" >移交</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small">回收</el-button>
                </el-col>
            </el-row>
        </div>

        <powerCommon :data="powerData" ></powerCommon>

        <!-- 权限移交 -->
        <el-dialog
            :visible.sync="moveDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >权限移交</span>
            <div class="qinjeeDialogSmallCont">
                <el-row type="flex" align="middle">
                    <el-col :span="3" >目标人：</el-col>
                    <el-col :span="21" >
                        <el-select
                            class="ipt moveDialogIpt"
                            v-model="movePerson"
                            filterable
                            remote
                            size="small"
                            reserve-keyword
                            @change="personChange($event,false)"
                            placeholder="请输入姓名和或工号"
                            :remote-method="remoteMethod"
                            :loading="personLoading">
                            <el-option
                                v-for="item in personList"
                                :key="item.archiveId"
                                :disabled="handoverPerson === item.archiveId"
                                :label="`${item.userName} (${item.employeeNumber})`"
                                :value="item.archiveId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="moveDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="moveSure" :disabled="!movePerson" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {power_api1, power_api2, power_api3, power_api4} from '../../request/api';
import powerCommon from '../../components/powerCommon/powerCommon';

export default {
    name: 'power',             /* 权限移交 */
    components: {powerCommon},
    data() {
        return {
            handoverPerson: undefined,          /* 交接人 */
            personLoading: false,
            personList: [],
            acceptRole: '',              /* 要交接的角色 */
            roleList: [],                       /* 要交接的角色供选值 */

            powerData: {
                showTab: ['功能权限', '管理范围权限'],          /* 必须，要显示的tab */
                tabActive: '功能权限',                                      /* 非必须，默认显示哪个tab */
                loading: false,                                           /* 非必须，加载动画 */
                roleTreeRoleId: undefined,

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
                fieldTableData: [],
            },
            requestOverNum: 0,

            moveDialog: false,
            movePerson: '',
        };
    },
    mounted() {
        this.getPersionList();
    },
    methods: {
        // 人员输入框远程请求方法
        remoteMethod(v) {
            if (v.length !== 1) {
                this.personLoading = true;
                this.getPersionList(v);
            }
        },
        // 请求人员列表
        getPersionList(personString='') {
            let send = {
                "userName": personString,
                "currentPage": 1,
                "pageSize": 99999999
            };
            base.log('s', '请求人员列表', send);
            power_api1(send, res => {
                this.personLoading = false;
                let d = res.data;
                base.log('r', '请求人员列表', d);
                if (d.success) {
                    this.personList = d.result.list;
                }else{
                    base.error(d);
                }
            })
        },
        // 交接人选择改变的时候
        personChange(v,clear) {
            if (clear) {
                this.roleList = [];
                this.acceptRole = '';
            }
            let send = {
                "archiveId": v
            };
            base.log('s', '查询角色列表', send);
            power_api2(send, res => {
                let d = res.data;
                base.log('r', '查询角色列表', d);
                if (d.success) {
                    this.roleList = d.result;
                }else{
                    base.error(d);
                }
            })
        },
        // 要交接的角色改变
        acceptRoleChange(role) {
            this.powerData.roleTreeRoleId = role;
            console.log(role);
            this.requestOverNum = 0;
            this.powerData.loading = true;
            this.getServerTree(role);
            this.getRange(role);
        },

        // 查询功能权限树
        getServerTree(roleId) {
            let send = {"roleId": roleId};
            base.log('s', '查询功能权限树', send);
            power_api3(send, res => {
                this.requestOverNum ++;
                if (this.requestOverNum === 2) {
                    this.powerData.loading = false;
                }
                let d = res.data;
                base.log('r', '查询功能权限树', d);
                if (d.success) {
                    this.powerData.serverData = d.result;
                }else{
                    base.error(d);
                }
            })
        },
        // 查询管理范围权限
        getRange(roleId) {
            let send = {"roleId": roleId};
            base.log('s', '查询管理范围权限', send);
            power_api4(send, res => {
                this.requestOverNum ++;
                if (this.requestOverNum === 2) {
                    this.powerData.loading = false;
                }
                let d = res.data;
                base.log('r', '查询管理范围权限', d);
                if (d.success) {
                    this.powerData.rangeData = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 移交
        move() {
            this.movePerson = '';
            this.moveDialog = true;
        },

        // 移交--确定
        moveSure() {}
    }
}
</script>