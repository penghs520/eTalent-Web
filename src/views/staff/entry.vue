<style scoped>
#staffEntry{
    height: 100%;
}
</style>

<template>
    <div id="staffEntry" class="commonRightCont">
        <commonTable :table="table" ref="commonTable" ></commonTable>

        <!-- 大弹窗 -->
        <el-dialog
            :visible.sync="addDialog"
            class="qinjeeDialogBig"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <div class="qinjeeDialogBigCont">
                <el-form :model="addForm" size="small" status-icon :rules="addRules" ref="addForm" label-width="100px" >
                    <!-- 个人信息 -->
                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="sex">
                                <el-radio v-model="addForm.sex" label="1">男</el-radio>
                                <el-radio v-model="addForm.sex" label="2">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model="addForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="个人邮箱" prop="email">
                                <el-input v-model="addForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="证件类型" prop="idType" >
                                <el-select v-model="addForm.idType" style="width:100%" >
                                    <el-option value="身份证" ></el-option>
                                    <el-option value="护照" ></el-option>
                                    <el-option value="港澳台通行证" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码" prop="idNum">
                                <el-input v-model="addForm.idNum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="年龄" prop="age">
                                <el-input type="number" v-model="addForm.age" class="removeNumberInput" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="参加工作时间" prop="startWorkDate">
                                <el-date-picker
                                    style="width:100%;"
                                    v-model="addForm.startWorkDate"
                                    :editable="false"
                                    size="small"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="应聘岗位" prop="post">
                                <el-input v-model="addForm.post" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="婚姻状况" prop="maritalStatus">
                                <el-input v-model="addForm.maritalStatus"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="最高学历" prop="degree">
                                <el-input v-model="addForm.degree" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="毕业学校" prop="school">
                                <el-input v-model="addForm.school"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="毕业专业" prop="major">
                                <el-input v-model="addForm.major" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最近工作单位" prop="lastCompany">
                                <el-input v-model="addForm.lastCompany"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- 入职信息 -->
                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="计划入职日期" prop="joinDate">
                                <el-date-picker
                                    style="width:100%;"
                                    v-model="addForm.joinDate"
                                    :editable="false"
                                    size="small"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="试用期" prop="testDate">
                                <el-input v-model="addForm.testDate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="入职部门" prop="joinDepartment">
                                <el-input v-model="addForm.joinDepartment" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入职岗位" prop="joinPost">
                                <el-input v-model="addForm.joinPost"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-form-item label="备注" prop="backup">
                            <el-input v-model="addForm.backup" type="textarea" :autosize="{minRows: 4}" ></el-input>
                        </el-form-item>
                    </el-row>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addSure('addForm')" :loading="addLoading" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import {entry_api1, entry_api2} from "../../request/api";

export default {
    name: 'entry',              /* 入职管理 */
    components: {commonTable},
    data() {
        return {
            table: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '性别', key: 'gender', isShow: true},
                    {name: '联系电话', key: 'phone', isShow: true},
                    {name: '状态', key: 'employmentState', isShow: true},
                    {name: '个人邮箱', key: 'email', isShow: true},
                    {name: '应聘岗位', key: 'applicationPosition', isShow: true},
                    {name: '入职部门', key: 'orgId', isShow: true},
                    {name: '入职岗位', key: 'postId', isShow: true},
                    {name: '计划入职日期', key: 'hireDate', isShow: true},
                    {name: '延期入职日期', key: 'preEmploymentChange.delayDate', isShow: true},
                    {name: '延期原因', key: 'preEmploymentChange.changeRemark', isShow: true},
                    {name: '放弃原因', key: 'preEmploymentChange.changeRemark', isShow: true},
                    {name: '拉黑原因', key: 'preEmploymentChange.abandonReason', isShow: true},
                    {name: '入职登记', key: 'employmentRegister', isShow: true}
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [                                  /* 非必须，表格上面的操作栏配置 */
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '新增',                   /* 必须，按钮名称 */
                        method: this.add             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',
                        text: '发送入职登记',
                        method: this.sendEntryNote
                    },
                    {
                        type: 'button',
                        text: '确认入职',
                        method: this.entry
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多操作',
                        btnType: 'primary',
                        list: [                         /* 必须，更多按钮的数据组成的数组 */
                            {text: '删除', method: this.delet},
                            {text: '延期入职', method: this.delay},
                            {text: '放弃入职', method: this.giveUp},
                            {text: '加入黑名单', method: this.blackList},
                            {text: '打印登记表', method: this.print},
                            {text: '导入', method: this.upload},
                            {text: '导出', method: this.download}
                        ]
                    }
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                loading: false,                       /* 非必须，加载动画 */
                pageResize: false,                    /* 非必须，页码重置 */
                pageResize: false,
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
                formatter: this.formatter,
            },
            currentPage: 1,                             /* 页面要用到的页码变量 */
            pageSize: 10,

            // 新增
            addDialog: false,
            addLoading: false,
            addForm: {
                name: '',           /* 姓名 */
                sex: '',            /* 性别 */
                phone: '',          /* 联系电话 */
                email: '',          /* 邮箱 */
                idType: '',         /* 证件类型 */
                idNum: '',          /* 证件号码 */
                age: '',            /* 年龄 */
                startWorkDate: '',  /* 参加工作时间 */
                post: '',           /* 应聘岗位 */
                maritalStatus: '',  /* 婚姻状况 */
                degree: '',         /* 最高学历 */
                school: '',         /* 毕业学校 */
                major: '',          /* 毕业专业 */
                lastCompany: '',    /* 最近工作单位 */

                joinDate: '',       /* 计划入职日期 */
                testDate: '',       /* 试用期 */
                joinDepartment: '', /* 入职部门 */
                joinPost: '',       /* 入职岗位 */
            },
            addRules: {
                name: [{required: true, message: '请输入姓名', trigger: 'change'}],
                phone: [{required: true, message: '请输入联系电话', trigger: 'change'}],
                email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}]
            },
        };
    },
    mounted() {
        this.getTable();
    },
    methods: {
        // 查询表格
        getTable() {
            let send = {
                "currentPage": this.currentPage,
                "pageSize": this.pageSize,
            };
            // send = 
            base.log('s', '查询表格', send);
            entry_api1(send, res => {
                let d = res.data;
                base.log('r', '查询表格', d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                }else{
                    base.error(d);
                }
            })
        }, 

        // 单元格格式化
        formatter(key,val) {
            if (key === 'hireDate' || key === 'preEmploymentChange.delayDate') {
                if (val) {
                    let r = val.split('T');
                    return r[0];
                }else{
                    return '--';
                }
            }else{
                return val;
            }
        },

        // 新增
        add() {
            this.addDialog = true;
        },

        // 新增--确定
        addSure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addSubmit();
                }
            });
        },

        // 新增提交
        addSubmit() {
            // name: '',           /* 姓名 */
            // sex: '',            /* 性别 */
            // phone: '',          /* 联系电话 */
            // email: '',          /* 邮箱 */
            // idType: '',         /* 证件类型 */
            // idNum: '',          /* 证件号码 */
            // age: '',            /* 年龄 */
            // startWorkDate: '',  /* 参加工作时间 */
            // post: '',           /* 应聘岗位 */
            // maritalStatus: '',  /* 婚姻状况 */
            // degree: '',         /* 最高学历 */
            // school: '',         /* 毕业学校 */
            // major: '',          /* 毕业专业 */
            // lastCompany: '',    /* 最近工作单位 */

            // joinDate: '',       /* 计划入职日期 */
            // testDate: '',       /* 试用期 */
            // joinDepartment: '', /* 入职部门 */
            // joinPost: '',       /* 入职岗位 */
            let send = {};
            base.log('s', '新增预入职', send);
            this.addLoading = true;
            entry_api2(send, res => {
                this.addLoading = false;
                let d = res.data;
                base.log('r', '新增预入职', d);
                if (d.success) {
                    base.success(d);
                    this.getTable();
                }else{
                    base.error(d);
                }
            })

        },

        // 发送入职登记
        sendEntryNote(searchData,radioData,checkboxData) {},

        // 确认入职
        entry(searchData,radioData,checkboxData) {},

        // 删除
        delet() {},

        // 延期入职
        delay() {},

        // 放弃入职
        giveUp() {},

        // 加入黑名单
        blackList() {},

        // 打印登记表
        print() {},

        // 导入
        upload() {},

        // 导出
        download() {},

        // 改变页容量
        pageSizeChange(size) {},

        // 翻页
        pageChange(index) {},
    }
}
</script>