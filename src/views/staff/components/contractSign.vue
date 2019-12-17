<style scoped lang="scss">
.add{
    background-color: #fff;
    .button{
        margin-top: 40px;
    }
}
.person{
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: 18px;
    li{
        width: 48%;
    }
    .left{
        margin-right: 2%;
        display: flex;
        align-items: center;
        .label{
            width: 130px;
            text-align: right;
            font-size: 14px;
            color: #606266;
            padding-right: 12px;
            box-sizing: border-box;
        }
        .btn{
            margin-left: 16px;
        }
    }
    .right{
        margin-left: 2%;
    }
    .value{
        font-size: 14px;
    }
}
</style>

<template>
    <div id="contractSign">
        <commonTitle :name="title" ></commonTitle>
        <!-- 业务对象 -->
        <ul class="person" >
            <li class="left">
                <span class="label">业务对象：</span>
                <span class="value">
                    <span>{{addName}}</span>
                    <el-button type="text" size="small" class="btn" @click="addTableShow = !addTableShow" >展开详情</el-button>
                </span>
            </li>
        </ul>
        <!-- 表格 -->
        <commonTable v-show="addTableShow" :table="addTable" ref="addCommonTable" ></commonTable>
        <!-- 表单 -->
        <el-form :model="addForm" size="small" style="max-width:1000px;" status-icon :rules="addRules" ref="addForm" label-width="140px" >
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="合同编号：" prop="num">
                        <el-input v-model="addForm.num"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同期限类型：" prop="type">
                        <el-select v-model="addForm.type" style="width:100%" @change="typeChange" >
                            <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" v-if="userLength === 1">
                    <el-form-item label="合同起始日期：" prop="startDate">
                        <el-date-picker
                            style="width:100%;"
                            disabled=""
                            v-model="addForm.startDate"
                            :editable="false"
                            size="small"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-else>
                    <el-form-item label="合同起始日期：" prop="startDateText">
                        <el-input disabled="" v-model="addForm.startDateText"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同期限（月）：" prop="range">
                        <el-input v-model.number="addForm.range" :disabled="rangeDisabled" type="number" @change="rangeChange" class="removeNumberInput" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" v-if="isEndDate && userLength === 1">
                    <el-form-item label="合同终止日期：" prop="endDate">
                        <el-date-picker
                            style="width:100%;"
                            v-model="addForm.endDate"
                            @change="endDateChange"
                            :editable="false"
                            size="small"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-else>
                    <el-form-item label="合同终止日期：" prop="endDateText">
                        <el-input disabled="" v-model="addForm.endDateText"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同签订日期：" prop="writeDate">
                        <el-date-picker
                            style="width:100%;"
                            v-model="addForm.writeDate"
                            :editable="false"
                            size="small"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="合同主体：" prop="theme">
                        <el-input v-model="addForm.theme"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签订次数：" prop="times">
                        <el-input v-model.number="addForm.times" :disabled="true" class="inputRemove"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="备注：" prop="note"> 
                    <el-input v-model="addForm.note" type="textarea" :rows="2"></el-input>
                </el-form-item>
            </el-row>
        </el-form>

        <!-- <el-row :gutter="20" class="button" type="flex" justify="center" align="middle" >
            <el-col :span=".5">
                <el-button size="small" plain="" @click="addCancel" >取消</el-button>
            </el-col>
            <el-col :span=".5">
                <el-button size="small" type="primary" @click="addSure('addForm')" >提交</el-button>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import base from '../../../assets/js/base';
import commonTable from '../../../components/table/commonTable';
import commonTitle from '../../../components/title';
import {sys_api2} from '../../../request/api';

export default {
    name: 'contractSign',               /* 合同签订组件 */
    components: {commonTable, commonTitle},
    props: {
        signData: Object
    },
    data() {
        return {
            title: '',
            addTableShow: false,
            addName: '',
            userLength: 0,
            addRows: [],
            addTable: {
                head: [
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'employeeNumber', isShow: true},
                    {name: '单位', key: 'businessUnitName', isShow: true},
                    {name: '部门', key: 'orgName', isShow: true},
                    {name: '岗位', key: 'postName', isShow: true},
                    {name: '试用开始日期', key: 'probationDueDate', isShow: true},
                    {name: '试用结束日期', key: 'probationEndDate', isShow: true},
                    {name: '试用期限（月）', key: 'contractPeriodMonth', isShow: true}
                ],
                data: [],
                selected: {                             /* 非必须, 默认勾选的行 */
                    key: 'und',
                    value: undefined
                },
                pageHide: true,
            },
            typeList: ['固定期限','无固定期限','以完成一定工作任务'],
            rangeDisabled: false,
            isEndDate: true,
            addForm: {
                num: '',                    /* 合同编号 */
                type: '固定期限',           /* 合同类型 */
                writeDate: '',              /* 合同签订日期 */
                startDate: '',              /* 合同起始日期 */
                startDateText: '员工入职日期',
                range: '',                  /* 合同期限 */
                endDate: '',                /* 合同终止日期 */
                endDateText: '根据合同期限(月)自动计算',            /* 合同终止日期文字描述 */
                theme: '',                  /* 合同主体 */
                times: 1,                  /* 签订次数 */
                note: '',                   /* 备注 */
            },
            addRules: {
                type: [{required: true, message: '必选', trigger: 'change'}],
                writeDate: [{required: true, message: '必选', trigger: 'change'}],
                startDate: [{required: true, message: '必选', trigger: 'change'}],
                endDate: [{required: true, message: '必选', trigger: 'change'}],
            },
        };
    },
    created() {
    },
    watch: {
        signData: {
            handler(val) {
                this.init();
            },
            deep: true
        }
    },
    methods: {
        // 获取表单数据
        getData() {
            return this.addSure('addForm');
        },
        init() {
            this.getContractNum(1);
            this.title          = this.signData.title;
            this.userLength     = this.signData.list.length;
            this.addRows        = this.signData.list;
            this.addTable.data  = this.signData.list;
            // 计算一些默认值
            this.userLength     = this.signData.list.length;
            let userList        = this.signData.list.filter((item,index) => index < 3);
            let userNameList    = userList.map(item => item.userName);
            this.addName        = userNameList.join('、');
            this.addForm.writeDate = new Date();
            if (this.signData.list.length === 1) {
                this.addForm.startDate = this.signData.list[0].hireDate;
            }
        },

        // 获取合同编号
        getContractNum(id) {
            let send = {ruleId: id};
            base.log('s', '获取合同编号', send);
            sys_api2(send, res => {
                let d = res.data;
                base.log('r', '获取合同编号', d);
                if (d.success) {
                    this.addForm.num = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        /**
         * 计算合同终止日期
         * @param {string} v 合同期限月
         */
        rangeChange(v) {
            v = Number(v);
            let start = this.addForm.startDate;
            if (!start || !v) {
                return false;
            }
            let startDate = new Date(start);
            let y = startDate.getFullYear(),
                m = startDate.getMonth() + 1,
                d = startDate.getDate();

            let ey,em,ed;
            em = m + Number(v);
            if (d === 1) {
                em = m + v - 1;
                if (em <= 12) {
                    ey = y;
                    ed = this.getD(ey,em);
                }else{
                    let n = Math.floor(em/12);
                    ey = y + n;
                    em = em - 12 * n;
                    ed = this.getD(ey,em);
                }
            }else{
                em = m + v;
                if (em <= 12) {
                    ey = y;
                    ed = d - 1;
                }else{
                    let n = Math.floor(em/12);
                    ey = y + n;
                    em = em - 12 * n;
                    ed = d - 1;
                }
            };
            em = em < 10 ? `0${em}` : em;
            ed = ed < 10 ? `0${ed}` : ed;
            let result = `${ey}-${em}-${ed}`;
            this.addForm.endDate = result;
        },

        // 获取日期
        getD(y,m) {
            let ed;
            let list = [1,3,5,7,8,10,12];
            if (list.includes(m)) {
                ed = 31;
            }else if(m === 2) {
                if (y%4 === 0) {
                    ed = 29;
                }else{
                    ed = 28;
                }
            }else{
                ed = 30;
            }
            return ed;
        },

        // 合同终止日期变的时候
        endDateChange(v) {
            this.addForm.range = '';
        },

        // 合同期限类型改变
        typeChange(v) {
            this.rangeDisabled = v !== '固定期限';
            this.isEndDate = v === '固定期限';
            this.addForm.endDateText = v === '固定期限' ? '合同终止日期' : v;
            if (v !== '固定期限') {
                this.addForm.range = '';
                this.addForm.endDate = '';
            }
        },

        // 新签--确定
        addSure(formName) {
            let r = null;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    r = this.addForm;
                }else{
                    r = false;
                }
            });
            return r;
        },
    }
}
</script>