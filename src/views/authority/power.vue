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
.commonPower{
    margin-top: 16px;
}
.trusteeshipDatePickerBox{
    margin-top: 24px;
}
.trusteeshipTitle{
    text-align: right;
}
.trusteeshipDatePicker{
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
                        @change="personChange"
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
                    <el-button size="small" @click="trusteeship" type="primary" :disabled="!acceptRole">托管</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small" @click="move" :disabled="!acceptRole" plain="" >移交</el-button>
                </el-col>
                <el-col :span=".5" class="btn">
                    <el-button size="small" @click="recovery" :disabled="!acceptRole" plain="">回收</el-button>
                </el-col>
            </el-row>
        </div>

        <powerCommon class="commonPower" :data="powerData" ></powerCommon>

        <!-- 权限托管 -->
        <el-dialog
            :visible.sync="trusteeshipDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >权限托管</span>
            <div class="qinjeeDialogSmallCont">
                <el-row type="flex" align="middle">
                    <el-col :span="4" class="trusteeshipTitle">目标人：</el-col>
                    <el-col :span="20" >
                        <el-select
                            class="ipt moveDialogIpt"
                            v-model="trusteeshipPerson"
                            filterable
                            remote
                            size="small"
                            reserve-keyword
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
                <el-row type="flex" align="middle" class="trusteeshipDatePickerBox">
                    <el-col :span="4" class="trusteeshipTitle">托管时间：</el-col>
                    <el-col :span="20" >
                        <el-date-picker
                            v-model="trusteeshipTime"
                            class="trusteeshipDatePicker"
                            type="daterange"
                            :editable="false"
                            size="small"
                            value-format="yyyy-MM-dd"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间">
                        </el-date-picker>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="trusteeshipDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="trusteeshipSure" :disabled="!trusteeshipPerson || !trusteeshipTime" :loading="trusteeshipLoading" >确 定</el-button>
            </span>
        </el-dialog>

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
                <el-button size="small" type="primary" @click="moveSure" :disabled="!movePerson" :loading="moveLoading" >确 定</el-button>
            </span>
        </el-dialog>

        <!-- 回收 -->
        <el-dialog
            :visible.sync="recoveryDialog"
            v-if="recoveryDialog"
            class="qinjeeDialogMini"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >权限回收</span>
            <div class="qinjeeDialogMiniCont">
                <i class="el-icon-warning warning icon" ></i>
                <span>确定回收 {{personName}} 的 {{roleName}} 权限？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="recoveryDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="recoverySure" :loading="recoveryLoading" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {power_api1, power_api2, power_api3, power_api4, power_api5, power_api6, power_api7, power_api8, power_api9} from '../../request/api';
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
                showTab: ['功能权限', '管理范围权限', '字段权限'],          /* 必须，要显示的tab */
                tabActive: '功能权限',                                      /* 非必须，默认显示哪个tab */
                loading: false,                                           /* 非必须，加载动画 */
                roleTreeRoleId: undefined,
                disabled: true,

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
                fieldSelectChange: this.fieldSelectChange
            },
            requestOverNum: 0,
            roleId: undefined,

            // 托管
            trusteeshipDialog: false,
            trusteeshipPerson: '',
            trusteeshipLoading: false,
            trusteeshipTime: '',

            // 移交
            moveDialog: false,
            movePerson: '',
            moveLoading: false,

            // 回收
            recoveryDialog: false,
            recoveryLoading: false,
        };
    },
    computed: {
        personName() {
            let result = '';
            if (this.handoverPerson) {
                let list = this.personList.filter(item => {
                    return item.archiveId === this.handoverPerson;
                });
                result = `${list[0].userName}(${list[0].employeeNumber})`;
            };
            return result;
        },
        roleName() {
            let result = '';
            if (this.acceptRole) {
                let list = this.roleList.filter(item => {
                    return item.roleId === this.acceptRole;
                });
                result = `${list[0].roleName}`;
            };
            return result;
        },
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
        personChange(id) {
            this.roleList = [];
            this.acceptRole = '';
            let send = {
                "archiveId": id
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
            this.roleId = role;
            this.powerData.roleTreeRoleId = role;
            this.requestOverNum = 0;
            this.powerData.loading = true;
            this.getServerTree(role);
            this.getRange(role);
            this.getTableList();
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
            let send = {
                "archiveId": this.handoverPerson,
                "roleId": roleId
            };
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
        // 查询自定义表列表
        getTableList() {
            power_api8(null, res => {
                let d = res.data;
                base.log('r', '自定义表列表', d);
                if (d.success) {
                    this.powerData.tableList = d.result;
                }else{
                    base.error(d);
                }
            })
        },
        fieldSelectChange(v) {
            let send = {
                "roleId": this.roleId,
                "tableId": v
            };
            base.log('s', '查询自定义表', send);
            this.powerData.loading = true;
            power_api9(send, res => {
                this.powerData.loading = false;
                let d = res.data;
                base.log('r', '查询自定义表', d);
                if (d.success) {
                    this.powerData.fieldTableData = d.result;
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
        moveSure() {
            let send = {
                "handoverArchiveId": this.handoverPerson,
                "acceptArchiveId": this.movePerson,
                "roleIdList": [this.acceptRole],
            };
            base.log('s', '移交', send);
            this.moveLoading = true;
            power_api5(send, res => {
                this.moveLoading = false;
                let d = res.data;
                base.log('r', '移交', d);
                if (d.success) {
                    base.success(d);
                    this.moveDialog = false;

                    // 刷新所选人的角色下拉框数据
                    this.personChange(this.handoverPerson);
                    // 清空权限数据
                    this.powerData.serverData = [];
                    this.powerData.rangeData = [];
                }else{
                    base.error(d);
                }
            })
        },

        // 托管
        trusteeship() {
            this.trusteeshipPerson = '';
            this.trusteeshipDialog = true;
        },

        // 托管--确定
        trusteeshipSure() {
            let send = {
                "trusteeshipArchiveId": this.handoverPerson,
                "acceptArchiveId": this.trusteeshipPerson,
                "roleIdList": [this.acceptRole],
                "trusteeshipBeginTime": this.trusteeshipTime[0],
                "trusteeshipEndTime": this.trusteeshipTime[1]
            };
            base.log('s', '托管', send);
            this.trusteeshipLoading = true;
            power_api6(send, res => {
                this.trusteeshipLoading = false;
                let d = res.data;
                base.log('r', '托管', d);
                if (d.success) {
                    base.success(d);
                    this.trusteeshipDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 回收
        recovery() {
            this.recoveryDialog = true;
        },

        // 回收--确定
        recoverySure() {
            let send = {
                "archiveId": this.handoverPerson,
                "roleIdList": [this.acceptRole],
            };
            base.log('s', '回收', send);
            this.recoveryLoading = true;
            power_api7(send, res => {
                this.recoveryLoading = false;
                let d = res.data;
                base.log('s', '回收', d);
                if (d.success) {
                    base.success(d);
                    this.recoveryDialog = false;

                    // 刷新所选人的角色下拉框数据
                    this.personChange(this.handoverPerson);
                    // 清空权限数据
                    this.powerData.serverData = [];
                    this.powerData.rangeData = [];
                }else{
                    base.error(d);
                }
            })
        },
    }
}
</script>