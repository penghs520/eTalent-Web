<style scoped lang="scss" >
#staffEntry{
    height: 100%;
    overflow: auto;
}

.sendEntryApply .title{
    display: flex;
    align-items: center;
    padding: 24px;
    .icon{
        width: 4px;
        height: 16px;
        background-color: #FF8C58;
    };
    .text{
        font-size: 16px;
        line-height: 22px;
        margin-left: 16px;
    };
}
.sendEntryApply{
    .row{
        margin-top: 24px;
    }
    .label{
        text-align: right;
        font-size: 14px;
        color: #000;
        margin-right: 32px;
    };
    .value{
        text-align: left;
        font-size: 14px;
        color: #676B6D;
    }
    .entryTemplate{
        width: 214px;
        height: 96px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 8px 12px;
        font-size: 0;
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.15);
        .img{
            width: 96px;
            height: 96px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            width: 98px;
            margin-left: 12px;
            text-align: left;
        }
        h6{
            font-size: 16px;
            text-align: center;
            color: #343535;
            line-height: 22px;
        };
        p{
            font-size: 14px;
            color: #676B6D;
            line-height: 20px;
        }
    }
    .nameList{
        display: flex;
        align-items: center;
        .name{
            margin-right: 16px;
        }
    }
    .btns{
        margin-top: 32px;
        text-align: center;
        .send{
            margin-left: 16px;
        }
    }
}
</style>

<template>
    <div id="staffEntry" class="commonRightCont">
        <!-- 主页 -->
        <commonTable v-show="!sendEntryApply" :table="table" ref="commonTable" ></commonTable>

        <!-- 发送入职申请 -->
        <div class="sendEntryApply" v-show="sendEntryApply" >
            <div class="title">
                <span class="icon"></span>
                <span class="text">发送入职登记邀请</span>
            </div>
            <el-row type="flex" align="middle" class="row">
                <el-col :span="6" class="label" >发送名单：</el-col>
                <el-col :span="18" class="value nameList">
                    <span v-for="(name,index) in checkedNames" class="name" :key="index" >{{name}}</span>
                    <el-button type="text" @click="detailIsShow = !detailIsShow" >
                        展开详情
                        <i :class="{'el-icon-caret-right': !detailIsShow, 'el-icon-caret-bottom': detailIsShow,}"></i>
                    </el-button>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row" v-show="detailIsShow">
                <el-col :span="6"></el-col>
                <el-col :span="18">
                    <commonTable class="row" :table="tableChecked" ref="tableChecked" ></commonTable>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row">
                <el-col :span="6" class="label">通知方式：</el-col>
                <el-col :span="18" class="value">
                    <el-checkbox-group v-model="noticeType">
                        <el-checkbox label="邮件通知"></el-checkbox>
                        <el-checkbox label="短信通知"></el-checkbox>
                        <el-checkbox label="现场通知"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row type="flex" class="row" >
                <el-col :span="6" class="label">入职登记表：</el-col>
                <el-col :span="18" class="value">
                    <div class="entryTemplate">
                        <div class="img">
                            <img src="../../assets/img/staff_template.png" alt="">
                        </div>
                        <div class="text">
                            <h6>入职登记模板</h6>
                            <p>邀请待入职人员填写入职登记</p>
                            <el-button style="padding:0;margin-top:4px;" type="text">预览</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <div class="btns">
                <el-button plain="" size="small" @click="sendEntryApply = false" >返回</el-button>
                <el-button class="send" type="primary" size="small" @click="sendEntryApplySure" :disabled="entryApplySureBtn()" :loading="entryApplyLoadingEmail || entryApplyLoadingPhone" >发送</el-button>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog
            :visible.sync="addDialog"
            class="qinjeeDialogBig"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <div class="qinjeeDialogBigCont">
                <el-form :model="addForm" size="small" status-icon :rules="addRules" ref="addForm" label-width="110px" >
                    <!-- 个人信息 -->
                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="sex">
                                <el-radio v-model="addForm.sex" label="男">男</el-radio>
                                <el-radio v-model="addForm.sex" label="女">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="手机号码" prop="phone">
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
                                <el-select v-model="addForm.idType" style="width:100%" @change="idTypeChange" >
                                    <el-option v-for="(item,index) in cardTyptList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码" prop="idNum">
                                <el-input v-model="addForm.idNum" @blur="idNumberBlur" ></el-input>
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
                                <el-select v-model="addForm.maritalStatus" style="width:100%" >
                                    <el-option v-for="(item,index) in marryStatusList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="最高学历" prop="degree">
                                <el-select v-model="addForm.degree" style="width:100%" >
                                    <el-option v-for="(item,index) in degreeList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
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
                                <el-select v-model="addForm.testDate" style="width:100%" >
                                    <el-option v-for="(item,index) in testList" :key="index" :label="item.label" :value="item.value" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="入职部门" prop="joinDepartment">
                                <el-select v-model="addForm.joinDepartment" ref="selectTree" popper-class="base_treeSelect" style="width:100%" >
                                    <el-option  :label="addForm.joinDepartment" :value="addForm.joinDepartment" >
                                        <tree :treeData="treeData"></tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入职岗位" prop="joinPost">
                                <el-select v-model="addForm.joinPost" style="width:100%" @change="joinPostChange" >
                                    <el-option v-for="(item,index) in postList" :key="index" :label="item.post_name" :value="item.post_id" ></el-option>
                                </el-select>
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

        <!-- 删除 -->
        <el-dialog
            :visible.sync="entryDeleteDialog"
            v-if="entryDeleteDialog"
            class="qinjeeDialogMini"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >删除预入职</span>
            <div class="qinjeeDialogMiniCont">
                <i class="el-icon-warning warning icon" ></i>
                <span>{{entryDeleteInfo}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="entryDeleteDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="deleteSure" :loading="deleteSureLoading" >确 定</el-button>
            </span>
        </el-dialog>

        <!-- 延期入职 -->
        <el-dialog
            :visible.sync="delayDialog"
            v-if="delayDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >延期入职</span>
            <div class="qinjeeDialogSmallCont">
                <el-form :model="delayForm" size="small" status-icon :rules="delayRules" ref="delayForm" label-width="120px" >
                    <el-form-item label="延期入职时间" prop="date">
                        <el-date-picker
                            style="width:100%;"
                            v-model="delayForm.date"
                            :editable="false"
                            size="small"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="延期入职原因" prop="reason">
                        <el-input v-model="delayForm.reason" type="textarea" :autosize="{minRows: 4}" ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delayDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="delaySure('delayForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 放弃入职 -->
        <el-dialog
            :visible.sync="giveUpDialog"
            v-if="giveUpDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >放弃入职</span>
            <div class="qinjeeDialogSmallCont">
                <el-form :model="giveUpForm" size="small" status-icon :rules="giveUpRules" ref="giveUpForm" label-width="120px" >
                    <el-form-item label="放弃入职原因" prop="reason">
                        <el-select v-model="giveUpForm.reason" style="width:100%" >
                            <el-option v-for="(item,index) in giveUpReasonList" :key="index" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="note">
                        <el-input v-model="giveUpForm.note" type="textarea" :autosize="{minRows: 4}" ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="giveUpDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="giveUpSure('giveUpForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 加入黑名单 -->
        <el-dialog
            :visible.sync="blackDialog"
            v-if="blackDialog"
            class="qinjeeDialogSmall"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >加入黑名单</span>
            <div class="qinjeeDialogSmallCont">
                <el-form :model="blackForm" size="small" status-icon :rules="blackRules" ref="blackForm" label-width="130px" >
                    <el-form-item label="加入黑名单原因" prop="reason">
                        <el-input v-model="blackForm.reason" type="textarea" :autosize="{minRows: 4}" ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="blackDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="blackSure('blackForm')">确 定</el-button>
            </span>
        </el-dialog>

        <commonUpload :data="uploadData" :uploadShow="uploadShow" :active="0"></commonUpload>

        <userInfo v-show='userInfoShow' :userInfo="userInfoData"></userInfo>

    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import commonUpload from '../../components/upload/upload';
import tree from '../../components/tree/tree';
import userInfo from './components/userInfo';
import {sys_api1, entry_api1, entry_api2, entry_api3, staff_api1, staff_api2, staff_api3, entry_api4, entry_api5,
        entry_api6, entry_api7, entry_api8, entry_api9, entry_api10} from "../../request/api";

export default {
    name: 'entry',              /* 入职管理 */
    components: {commonTable, commonUpload, tree, userInfo},
    data() {
        return {
            cardTyptList: [],               // 证件类型
            marryStatusList: [],            // 婚姻状况
            degreeList: [],                 // 学历

            // 主页面表格
            table: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '性别', key: 'gender', isShow: true},
                    {name: '联系电话', key: 'phone', isShow: true},
                    {name: '状态', key: 'employmentState', isShow: true},
                    {name: '个人邮箱', key: 'email', isShow: true},
                    {name: '应聘岗位', key: 'applicationPosition', isShow: true},
                    {name: '入职部门', key: 'orgName', isShow: true},
                    {name: '入职岗位', key: 'postName', isShow: true},
                    {name: '计划入职日期', key: 'hireDate', isShow: true},
                    {name: '延期入职日期', key: 'delayDate', isShow: true},
                    {name: '延期原因', key: 'delayReson', isShow: true},
                    {name: '放弃原因', key: 'abandonReason', isShow: true},
                    {name: '拉黑原因', key: 'blockReson', isShow: true},
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
                activeColumn: ['姓名'],
                cellClick: this.tableCellClick,
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                loading: false,                       /* 非必须，加载动画 */
                pageResize: false,                    /* 非必须，页码重置 */
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
                testDate: 1,        /* 试用期 */
                joinDepartment: '', /* 入职部门名称 */
                joinDepartmentId: '',   /* 入职部门id */
                joinPost: '',       /* 入职岗位 */
                joinPostId: '',     /* 入职岗位id */
                backup: ''          /* 备注 */
            },
            addRules: {
                name: [{required: true, message: '请输入姓名', trigger: 'change'}],
                phone: [{required: true, message: '请输入手机号码', trigger: 'change'},
                        {pattern: /^1[3,4,5,6,7,8,9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change'}],
                email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}],
                joinDate: [{required: true, message: '请选择计划入职日期', trigger: 'change'}],
            },
            testList: [             /* 试用期 */
                {label: '无试用期', value: 0},
                {label: '1个月', value: 1},
                {label: '2个月', value: 2},
                {label: '3个月', value: 3},
                {label: '4个月', value: 4},
                {label: '5个月', value: 5},
                {label: '6个月', value: 6}
            ],
            departmentList: [],     /* 入职部门 */
            postList: [],           /* 入职岗位 */
            treeData: {
                data: [],
                nodeKey: 'org_id',
                props: {
                    children: 'list',
                    label: 'org_name'
                },
                showDefaultIcon: true,
                nodeClick: this.selectTreeNodeClick,
                defaultIconExpandNode: true,
            },

            // 发送入职登记邀请
            sendEntryApply: false,
            checkedNames: ['牛郎', '老王', '织女'],
            detailIsShow: false,
            noticeType: [],
            tableChecked: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '联系电话', key: 'phone', isShow: true},
                    {name: '个人邮箱', key: 'email', isShow: true},
                    {name: '计划入职日期', key: 'hireDate', isShow: true},
                    {name: '延期入职日期', key: 'preEmploymentChange.delayDate', isShow: true}
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.entryApplyChange,
                selected: {                             /* 非必须, 默认勾选的行 */
                    key: 'checkedAll',
                    value: undefined
                },
                pageHide: true,
                formatter: this.formatter,
            },
            entryChecked: null,                     /* 发送入职申请内页勾选改变后的值 */
            entryApplyLoadingEmail: false,
            entryApplyLoadingPhone: false,

            // 删除预入职
            entryDeleteInfo: '',
            entryDeleteDialog: false,
            deleteSureLoading: false,
            deleteIdList: null,

            // 操作的预入职id
            operateIdList: null,

            // 延期入职
            delayDialog: false,
            delayForm: {
                date: '',
                reason: ''
            },
            delayRules: {
                date: [{required: true, message: '请选择延期入职时间', trigger: 'blur'}],
                reason: [{required: true, message: '请填写延期入职原因', trigger: 'change'}],
            },

            // 放弃入职
            giveUpForm: {
                reason: '',
                note: '',
            },
            giveUpRules: {
                reason: [{required: true, message: '请选择放弃入职原因', trigger: 'blur'}]
            },
            giveUpDialog: false,
            giveUpReasonList: ['个人原因', '接受其他offer', '工作不感兴趣', '原单位留任', '薪资不满意', '工作地点不满意', '其他'],

            // 加入黑名单
            blackForm: {
                reason: '',
            },
            blackRules: {
                reason: [{required: true, message: '请填写加入黑名单原因', trigger: 'change'}]
            },
            blackDialog: false,

            // 导入
            uploadShow: false,
            uploadData: {
                title: '导入机构',                  // 非必须，弹窗标题
                download: this.upload_download,                 // 非必须，下载模板方法
                fileFormatDescription: '仅支持扩展名：.xls .xles，大小不能超过5M',      // 非必须，文件格式说明
                uploadDescription: '这句话的内容还需要和产品沟通',                      // 非必须，导入说明
                uploadUrl: '',                  // 必须，上传地址
                cancel: this.upload_cancel,                   // 必须，取消操作
                check: this.upload_check,                    // 必须，校验操作
                finish: this.upload_finish,                   // 必须，完成操作
                cancelLoading: false,             // 必须，取消loading
                checkLoading: false,              // 必须，校验loading
                finishLoading: false,             // 必须，完成loading
            },

            userInfoShow: false,                /* 用户详细信息是否显示 */
            userInfoData: null,
        };
    },
    mounted() {
        this.initGetData();
        this.getTable();
    },
    methods: {
        /**
         *  春花秋月何时了？往事知多少。小楼昨夜又东风，故国不堪回首月明中。
         *  雕栏玉砌应犹在，只是朱颜改。问君能有几多愁？恰似一江春水向东流。
         */
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
            if (key === 'hireDate' || key === 'delayDate') {
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

        // 请求需要的数据
        initGetData() {
            // 请求证件类型
            this.initGetDataSubmit('CARD_TYPE', '证件类型', 'cardTyptList');

            // 请求婚姻状况
            this.initGetDataSubmit('MARITAL_STATUS', '婚姻状况', 'marryStatusList');

            // 请求学历
            this.initGetDataSubmit('DEGREE', '学历', 'degreeList');

            // 请求入职部门
            this.getCompany();
        },

        // 请求需要的数据--请求方式
        initGetDataSubmit(operation, log, key) {
            let send = {"dictType": operation};
            base.log('s', log, send);
            sys_api1(send, res => {
                let d = res.data;
                base.log('r', log, d);
                if (d.success) {
                    this[key] = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 获取单位
        getCompany() {
            staff_api1(null, res => {
                let d = res.data;
                base.log('r', '获取单位', d);
                if (d.success) {
                    this.getDepartment(d.result);
                }else{
                    base.error(d);
                }
            })
        },

        // 根据单位id获取部门
        getDepartment(id) {
            let send = {"companyId": id};
            base.log('s', '获取部门', send);
            staff_api2(send, res => {
                let d = res.data;
                base.log('r', '获取部门', d);
                if (d.success) {
                    // this.departmentList.push(d.result);
                    this.treeData.data.push(d.result);
                }else{
                    base.error(d);
                }
            })
        },

        // 部门下拉框节点被点击
        selectTreeNodeClick(node) {
            this.addForm.joinDepartment = node.org_name;
            this.addForm.joinDepartmentId = node.org_id;
            this.$refs.selectTree.blur();
            this.getPost(node.org_id);
            this.addForm.joinPost = '';
            this.addForm.joinPostId = '';
        },

        // 获取入职岗位
        getPost(departmentId) {
            let send = {"orgId": departmentId};
            base.log('s', '获取入职岗位', send);
            entry_api8(send, res => {
                let d = res.data;
                base.log('r', '获取入职岗位', d);
                if (d.success) {
                    this.postList = JSON.parse(d.result);
                }else{
                    base.error(d);
                }
            })
        },

        // 入职岗位改变
        joinPostChange(v) {
            this.addForm.joinPostId = v;
        },

        // 证件类型改变
        idTypeChange(v) {
            if (v === 'ID_CARD') {
                if (this.addForm.idNum.length === 18) {
                    this.addForm.age = base.getAgeFromIdNumber(this.addForm.idNum);
                }
            }
        },

        // 证件号码输入框失去焦点--如果是身份证号码，计算年龄
        idNumberBlur() {
            if (this.addForm.idType === 'ID_CARD' && this.addForm.idNum.length === 18) {
                this.addForm.age = base.getAgeFromIdNumber(this.addForm.idNum);
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
            let send = {
                "abandonReason":        "",                                         /* 放弃入职原因 */
                "age":                  Number(this.addForm.age),                   /* 年龄 */
                "applicationPosition":  this.addForm.post,                          /* 应聘岗位 */
                "birthDate":            "",                                         /* 出生日期 */
                "birthplace":           "",                                         /* 出生地 */
                "blockReson":           "",                                         /* 拉黑原因 */
                "bloodType":            "",                                         /* 血型 */
                "dataSource":           "",                                         /* 数据来源 */
                "delayDate":            "",                                         /* 延期日期 */
                "delayReson":           "",                                         /* 延期原因 */
                "description":          this.addForm.backup,                        /* 描述 */
                "email":                this.addForm.email,                         /* 邮箱 */
                "employmentId":         0,                                          /* 预入职ID */
                "employmentRegister":   "",                                         /* 入职登记 */
                "employmentState":      "",                                         /* 入职状态 */
                "englishName":          "",                                         /* 英文名 */
                "firstWorkDate":        this.addForm.startWorkDate,                 /* 参加工作时间 */
                "gender":               this.addForm.sex,                           /* 性别 */
                "graduatedSchool":      this.addForm.school,                        /* 毕业院校 */
                "graduatedSpeciality":  this.addForm.major,                         /* 毕业专业 */
                "height":               0,                                          /* 身高 */
                "highestDegree":        this.addForm.degree,                        /* 最高学历 */
                "hireDate":             this.addForm.joinDate,                      /* 入职日期 */
                "idNumber":             this.addForm.idNum,                         /* 证件号码 */
                "idType":               this.addForm.idType,                        /* 证件类型 */
                "isGiveBirth":          0,                                          /* 是否已育 */
                "lastWorkCompany":      this.addForm.lastCompany,                   /* 最近工作单位 */
                "maritalStatus":        this.addForm.maritalStatus,                 /* 婚姻状况 */
                "nationality":          0,                                          /* 民族 */
                "orgId":                Number(this.addForm.joinDepartmentId),      /* 入职部门id */
                "orgName":              this.addForm.joinDepartment,                /* 入职部门 */
                "phone":                this.addForm.phone,                         /* 手机号 */
                "politicalStatus":      0,                                          /* 政治面貌 */
                "postId":               Number(this.addForm.joinPostId),            /* 入职岗位id */
                "postName":             this.addForm.joinPost,                      /* 入职岗位 */
                "probationPeriod":      Number(this.addForm.testDate),              /* 试用期 */
                "residentCharacter":    "",                                         /* 户口性质 */              
                "userName":             this.addForm.name                           /* 用户名 */
            };
            base.log('s', '新增预入职', send);
            this.addLoading = true;
            entry_api2(send, res => {
                this.addLoading = false;
                let d = res.data;
                base.log('r', '新增预入职', d);
                if (d.success) {
                    base.success(d);
                    this.currentPage = 1;
                    this.pageSize = 10;
                    this.table.pageResize = true;
                    this.getTable();
                    this.addDialog = false;
                }else{
                    base.error(d);
                }
            })

        },

        // 发送入职登记
        sendEntryNote(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                })
                return false;
            }
            this.tableChecked.data = checkboxData;
            let nameList;
            if (checkboxData.length > 3) {
                nameList = checkboxData.slice(0,3);
            }else{
                nameList = checkboxData;
            };
            this.checkedNames = nameList.map(item => {return item.userName});
            this.detailIsShow = false;
            this.entryChecked = null;
            this.sendEntryApply = true;
        },

        // 发送入职登记--select改变时
        entryApplyChange(list) {
            console.log(list)
            this.entryChecked = list;
        },

        // 发送入职登记--按钮能否被点击
        entryApplySureBtn() {
            if (this.entryChecked !== null && this.entryChecked.length === 0) {
                return true;
            };
            if (this.noticeType.length === 0) {
                return true;
            };
            return false;
        },

        // 发送入职登记--确定
        sendEntryApplySure() {
            let personIdList = [];
            if (this.entryChecked === null) {
                // 取传入的值
                personIdList = this.tableChecked.data.map(item => {return item.employmentId});
            }else{
                personIdList = this.entryChecked.map(item => {return item.employmentId});
            };

            if (this.noticeType.includes('邮件通知')) {
                this.entryAppltEmail(personIdList);
            };
            if (this.noticeType.includes('短信通知')) {
                this.entryApplyMessage(personIdList);
            };
        },

        // 发送入职登记--邮件
        entryAppltEmail(idList) {
            let send = {
                "conList": [0],
                "content": "你好a",
                "filepath": [],
                "prelist": [1],
                "subject": "预入职"
            };
            base.log('s', '邮件发送预入职登记', send);
            this.entryApplyLoadingEmail = true;
            entry_api3(send, res => {
                this.entryApplyLoadingEmail = false;
                let d = res.data;
                base.log('r', '邮件发送预入职登记', d);
                if (d.success) {
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 发送入职登记--短信
        entryApplyMessage(idList) {
            let send = {
                "list": idList
            };
            base.log('s', '短信发送预入职登记', send);
            this.entryApplyLoadingPhone = true;
            entry_api9(send, res => {
                this.entryApplyLoadingPhone = false;
                let d = res.data;
                base.log('r', '短信发送预入职登记', d);
                if (d.success) {
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 确认入职
        entry(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            }
            // 检测状态
            let statusPass = checkboxData.every(item => {
                return ['未入职', '已延期'].includes(item.employmentState);
            });
            if (!statusPass) {
                this.$message({
                    message: '只能勾选状态是 “未入职”、“已延期” 的人员',
                    type: 'warning'
                });
                // return false;
            };

            // 检测信息完整性
            let infoLoseList = checkboxData.filter(item => {
                return !item.orgName || !item.postName;
            });
            if (infoLoseList.length !== 0) {
                let nameList = infoLoseList.map(item => {
                    return item.userName;
                });
                this.$message({
                    message: `请完善 ${nameList.join('、')} 的【入职部门】、【入职岗位】信息后再操作`,
                    type: 'warning'
                });
                // return false;
            };

            // 提交数据
            this.entrySubmit(checkboxData);
        },

        // 确认入职--数据提交
        entrySubmit(userList) {
            let send = userList.map(item => {return item.employmentId});
            base.log('s', '确认入职', send);
            entry_api4(send, res => {
                let d = res.data;
                base.log('r', '确认入职', d);
                if (d.success) {
                    base.success(d);
                    this.getTable();
                }else{
                    base.error(d);
                }
            })
        },

        // 删除
        delet(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            };
            let userNameList = checkboxData.map(item => {return item.userName});
            this.entryDeleteInfo = `确定删除 ${userNameList.join('、')} 的预入职信息吗？`;
            this.deleteIdList = checkboxData.map(item => {return item.employmentId});
            this.entryDeleteDialog = true;
        },

        // 删除--确定
        deleteSure() {
            let send = this.deleteIdList;
            base.log('s', '删除预入职', send);
            this.deleteSureLoading = true;
            entry_api5(send, res => {
                this.deleteSureLoading = false;
                let d = res.data;
                base.log('r', '删除预入职', d);
                if (d.success) {
                    base.success(d);
                    this.currentPage = 1;
                    this.pageSize = 10;
                    this.table.pageResize = true;
                    this.getTable();
                    this.entryDeleteDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 延期入职
        delay(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            };
            this.operateIdList = checkboxData.map(item => {return item.employmentId});

            this.delayForm = {
                date: '',
                reason: ''
            };
            this.delayDialog = true;
        },

        // 延期入职--确定
        delaySure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.delaySubmit();
                }
            });
        },

        // 延期入职--提交
        delaySubmit() {
            let send = {
                "abandonReason": "",
                "changeRemark": this.delayForm.reason,
                "changeState": "已延期",            /* 已延期、黑名单、放弃入职、已入职 */
                "delayTime": this.delayForm.date,
                "preEmploymentList": this.operateIdList
            };
            base.log('s', '延期入职', send);
            entry_api6(send, res => {
                let d = res.data;
                base.log('r', '延期入职', d);
                if (d.success) {
                    this.getTable();
                    base.success(d);
                    this.delayDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 放弃入职
        giveUp(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            };
            this.operateIdList = checkboxData.map(item => {return item.employmentId});

            this.giveUpForm = {
                reason: '',
                note: '',
            };
            this.giveUpDialog = true;
        },

        // 放弃入职--确定
        giveUpSure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.giveUpSubmit();
                }
            });
        },

        // 放弃入职--提交
        giveUpSubmit() {
            let send = {
                "abandonReason": this.giveUpForm.reason,
                "changeRemark": this.giveUpForm.note,
                "changeState": "放弃入职",            /* 已延期、黑名单、放弃入职、已入职 */
                "delayTime": "",
                "preEmploymentList": this.operateIdList
            };
            base.log('s', '放弃入职', send);
            entry_api6(send, res => {
                let d = res.data;
                base.log('r', '放弃入职', d);
                if (d.success) {
                    this.getTable();
                    base.success(d);
                    this.giveUpDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 加入黑名单
        blackList(searchData,radioData,checkboxData) {
            if (!checkboxData || checkboxData.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            };
            this.operateIdList = checkboxData.map(item => {return item.employmentId});

            this.blackForm = {
                reason: '',
            };
            this.blackDialog = true;
        },

        // 加入黑名单--确定
        blackSure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.blackSubmit();
                }
            });
        },

        // 加入黑名单--提交
        blackSubmit() {
            let send = {
                "abandonReason": "",
                "changeRemark": this.blackForm.reason,
                "changeState": "黑名单",            /* 已延期、黑名单、放弃入职、已入职 */
                "delayTime": "",
                "preEmploymentList": this.operateIdList
            };
            base.log('s', '加入黑名单', send);
            entry_api6(send, res => {
                let d = res.data;
                base.log('r', '加入黑名单', d);
                if (d.success) {
                    this.getTable();
                    base.success(d);
                    this.blackDialog = false;
                }else{
                    base.error(d);
                }
            })
        },

        // 导入
        upload() {
            this.uploadShow = true;
        },

        // 导入--下载模板
        upload_download() {},

        // 导入--取消
        upload_cancel() {
            this.uploadShow = false;
        },

        // 导入--校验
        upload_check() {},

        // 导入--完成
        upload_finish() {},

        // 打印登记表
        print(searchData,radioData,checkboxData) {
            // 暂时不做，还没打印模板
        },


        // 导出
        download(searchData,radioData,checkboxData) {
            let send = {
                "list": !checkboxData || checkboxData.length === 0 ? null : checkboxData.map(item => {return item.employmentId}),
                "title": "预入职"
            };
            base.log('s', '导出', send);
            entry_api10(send, res => {
                console.log(res)
                let blob = new Blob([res.data]);
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = "预入职.xls";
                a.click();
                // 释放这个临时的对象url
                window.URL.revokeObjectURL(url);
            })
        },

        // 改变页容量
        pageSizeChange(size) {
            this.currentPage = 1;
            this.pageSize = size;
            this.table.pageResize = true;
            this.getTable();
        },

        // 翻页
        pageChange(index) {
            this.this.currentPage = index;
            this.getTable();
        },

        // 表格单元格被点击
        tableCellClick(key,row,text) {
            if (key === 'userName') {
                console.log(row);
                this.userInfoData = row;
                this.userInfoShow = true;
            }
        },
    }
}
</script>