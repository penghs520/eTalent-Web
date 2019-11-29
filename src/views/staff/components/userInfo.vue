<style lang="scss" scoped>
.userInfo{
    padding: 24px;
    border-bottom: 1px dashed #ECECEC;
    margin-bottom: 100px;
}
.userInfo:hover{
    background-color: #FAFAFA;
    .btn{
        display: inline-block;
    }

}
.title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    .label{
        display: flex;
        align-items: center;
    }
    .icon{
        display: inline-block;
        height: 16px;
        width: 4px;
        background-color: #FF8C58;
        margin-right: 16px;
    }
    .btn{
        display: none;
        cursor: pointer;
        color: #FF8C58;
        margin-right: 54px;
        i{
            margin-right: 8px;
        }
    }
}
.show{
    .row{
        padding: 12px 0;
    }
    .label{
        text-align: right;
        font-size: 14px;
        color: #000;
        line-height: 20px;
    }
    .value{
        text-align: left;
        font-size: 14px;
        color: #676B6D;
        line-height: 20px;
        border: 1px solid rgba($color: #000000, $alpha: 0)
    }
}

</style>
<style>
#staff_components_userInfo .el-form-item__label{
    color: #000;
    font-size: 14px;
}
</style>

<template>
    <div id="staff_components_userInfo">
        <!-- 个人信息 -->
        <div class="userInfo">
            <div class="title">
                <div class="label">
                    <span class="icon"></span>
                    <span>个人信息</span>
                </div>
                <div class="btn" v-show="!userInfoEditShow" @click="userInfoEdit">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                </div>
            </div>

            <!-- 显示 -->
            <div class="show" v-if="!userInfoEditShow" >
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">姓名：</el-col>
                    <el-col class="value" :span="8">{{addForm.name}}</el-col>
                    <el-col class="label" :span="4">性别：</el-col>
                    <el-col class="value" :span="8">{{addForm.sex}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">联系电话：</el-col>
                    <el-col class="value" :span="8">{{addForm.phone}}</el-col>
                    <el-col class="label" :span="4">个人邮箱：</el-col>
                    <el-col class="value" :span="8">{{addForm.email}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">证件类型：</el-col>
                    <el-col class="value" :span="8">{{selectData.idType}}</el-col>
                    <el-col class="label" :span="4">证件号码：</el-col>
                    <el-col class="value" :span="8">{{addForm.idNum}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">年龄：</el-col>
                    <el-col class="value" :span="8">{{addForm.age}}</el-col>
                    <el-col class="label" :span="4">参加工作时间：</el-col>
                    <el-col class="value" :span="8">{{addForm.startWorkDate}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">岗位：</el-col>
                    <el-col class="value" :span="8">{{addForm.post}}</el-col>
                    <el-col class="label" :span="4">婚姻状况：</el-col>
                    <el-col class="value" :span="8">{{selectData.maritalStatus}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">学历：</el-col>
                    <el-col class="value" :span="8">{{selectData.degree}}</el-col>
                    <el-col class="label" :span="4">毕业院校：</el-col>
                    <el-col class="value" :span="8">{{addForm.school}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">毕业专业：</el-col>
                    <el-col class="value" :span="8">{{addForm.major}}</el-col>
                    <el-col class="label" :span="4">最近工作单位：</el-col>
                    <el-col class="value" :span="8">{{addForm.lastCompany}}</el-col>
                </el-row>
            </div>

            <!-- 编辑 -->
            <div class="edit" v-if="userInfoEditShow">
                <el-form :model="addForm" size="small" status-icon :rules="addRules" ref="addForm" label-width="110px" >
                    <!-- 个人信息 -->
                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="姓名：" prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别：" prop="sex">
                                <el-radio v-model="addForm.sex" label="男">男</el-radio>
                                <el-radio v-model="addForm.sex" label="女">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model="addForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="个人邮箱：" prop="email">
                                <el-input v-model="addForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="证件类型：" prop="idType" >
                                <el-select v-model="addForm.idType" style="width:100%" @change="idTypeChange" >
                                    <el-option v-for="(item,index) in cardTyptList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码：" prop="idNum">
                                <el-input v-model="addForm.idNum" @blur="idNumberBlur" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="年龄：" prop="age">
                                <el-input type="number" v-model="addForm.age" class="removeNumberInput" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="参加工作时间：" prop="startWorkDate">
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
                            <el-form-item label="岗位：" prop="post">
                                <el-input v-model="addForm.post" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="婚姻状况：" prop="maritalStatus">
                                <el-select v-model="addForm.maritalStatus" style="width:100%" @change="maritalStatusChange" >
                                    <el-option v-for="(item,index) in marryStatusList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="学历：" prop="degree">
                                <el-select v-model="addForm.degree" style="width:100%" @change="degreeChange" >
                                    <el-option v-for="(item,index) in degreeList" :key="index" :label="item.dictValue" :value="item.dictCode" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="毕业学校：" prop="school">
                                <el-input v-model="addForm.school"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="毕业专业：" prop="major">
                                <el-input v-model="addForm.major" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最近工作单位：" prop="lastCompany">
                                <el-input v-model="addForm.lastCompany"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="16" type="flex" justify="center">
                    <el-col :span=".5">
                        <el-button size="small" plain="" @click="userInfoEditShow = false" >取 消</el-button>
                    </el-col>
                    <el-col :span=".5">
                        <el-button type="primary" size="small" @click="userInfoSave('addForm')" >保 存</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 入职信息 -->
        <div class="userInfo">
            <div class="title">
                <div class="label">
                    <span class="icon"></span>
                    <span>入职信息</span>
                </div>
                <div class="btn" v-show="!entryInfoEditShow" @click="entryInfoEdit">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                </div>
            </div>

            <!-- 显示 -->
            <div class="show" v-if="!entryInfoEditShow" >
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">计划入职日期：</el-col>
                    <el-col class="value" :span="8">{{entryForm.joinDate}}</el-col>
                    <el-col class="label" :span="4">试用期：</el-col>
                    <el-col class="value" :span="8">{{selectData.testDate}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">入职部门：</el-col>
                    <el-col class="value" :span="8">{{selectData.joinDepartment}}</el-col>
                    <el-col class="label" :span="4">入职岗位：</el-col>
                    <el-col class="value" :span="8">{{selectData.joinPost}}</el-col>
                </el-row>
                <el-row :gutter="32" class="row">
                    <el-col class="label" :span="4">备注：</el-col>
                    <el-col class="value" :span="8">{{entryForm.backup}}</el-col>
                </el-row>
            </div>

            <!-- 编辑 -->
            <div class="edit" v-if="entryInfoEditShow">
                <el-form :model="entryForm" size="small" status-icon :rules="entryRules" ref="entryForm" label-width="110px" >
                    <!-- 个人信息 -->
                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="计划入职日期：" prop="joinDate">
                                <el-date-picker
                                    style="width:100%;"
                                    v-model="entryForm.joinDate"
                                    :editable="false"
                                    size="small"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="试用期：" prop="testDate">
                                <el-select v-model="entryForm.testDate" style="width:100%" @change="testDateChange" >
                                    <el-option v-for="(item,index) in testList" :key="index" :label="item.label" :value="item.value" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="入职部门：" prop="joinDepartment">
                                <el-select v-model="entryForm.joinDepartment" ref="selectTree" popper-class="base_treeSelect" style="width:100%" >
                                    <el-option  :label="entryForm.joinDepartment" :value="entryForm.joinDepartment" >
                                        <tree :treeData="treeData"></tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="入职岗位：" prop="joinPost">
                                <el-select v-model="entryForm.joinPost" style="width:100%" @change="joinPostChange" >
                                    <el-option v-for="(item,index) in postList" :key="index" :label="item.post_name" :value="item.post_id" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" >
                        <el-col :span="12">
                            <el-form-item label="备注：" prop="backup">
                            <el-input v-model="entryForm.backup" type="textarea" :autosize="{minRows: 4}" ></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row :gutter="16" type="flex" justify="center">
                    <el-col :span=".5">
                        <el-button size="small" plain="" @click="entryInfoEditShow = false" >取 消</el-button>
                    </el-col>
                    <el-col :span=".5">
                        <el-button type="primary" size="small" @click="entryInfoSave('entryForm')" >保 存</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import base from '../../../assets/js/base';
import tree from '../../../components/tree/tree';
import {sys_api1, staff_api1, staff_api2, entry_api8, entry_api11, entry_api12} from "../../../request/api";

export default {
    name: 'userInfo',                       /* 个人基本信息组件 */
    props: {
        userInfo: Object
    },
    data() {
        return {
            hasBaseData: false,             /* 是否已经请求了基础数据 */
            cardTyptList: [],               /* 证件类型 */
            marryStatusList: [],            /* 婚姻状况 */
            degreeList: [],                 /* 学历 */
            testList: [                     /* 试用期 */
                {label: '无试用期', value: 0},
                {label: '1个月', value: 1},
                {label: '2个月', value: 2},
                {label: '3个月', value: 3},
                {label: '4个月', value: 4},
                {label: '5个月', value: 5},
                {label: '6个月', value: 6}
            ],
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


            // 下拉框类型显示数据
            selectData: {
                idType: '',                     /* 证件类型 */
                maritalStatus: '',              /* 婚姻状况 */
                degree: '',                     /* 学历 */
                testDate: '',                   /* 试用期 */
                joinDepartment: '',             /* 入职部门 */
                joinPost: '',                   /* 入职岗位 */
            },
            selectData_2: null,
            


            userInfoEditShow: false,        /* 用户信息编辑是否显示 */
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
            },
            addRules: {
                name: [{required: true, message: '请输入姓名', trigger: 'change'}],
                phone: [{required: true, message: '请输入手机号码', trigger: 'change'},
                        {pattern: /^1[3,4,5,6,7,8,9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change'}],
                email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}],
            },

            entryInfoEditShow: false,
            entryForm: {
                joinDate: '',                   /* 计划入职日期 */
                testDate: '',                   /* 试用期 */
                joinDepartment: '',             /* 入职部门 */
                joinPost: '',                   /* 入职岗位 */
                backup: '',                     /* 备注 */
            },
            entryRules: {
                joinDate: [{required: true, message: '请选择计划入职日期', trigger: 'change'}]
            },
        };
    },
    watch: {
        userInfo: {
            handler: function(v) {
                console.log('改变了')
                // 赋值操作
                this.dataInit(v);
            },
            deep: true
        }
    },
    mounted() {},
    methods: {
        // 数据初始化
        dataInit(data) {
            this.selectData_2 = {};
            console.log('初始化数据')
            // 下拉框数据
            this.selectInit(data);
            // 用户信息
            this.userInfoInit(data);
            // 入职信息
            this.jobInfoInit(data);
        },

        // 下拉框数据
        selectInit(data) {
            let testList = {
                0: '无试用期',
                1: '1个月',
                2: '2个月',
                3: '3个月',
                4: '4个月',
                5: '5个月',
                6: '6个月',
            };
            this.selectData.idType = data.idTypeName;                       /* 证件类型 */
            this.selectData.maritalStatus = data.marryStatusName;                             /* 婚姻状况 */
            this.selectData.degree = data.highestDegreeName;                                    /* 学历 */
            this.selectData.testDate = testList[data.probationPeriod];                   /* 试用期 */
            this.selectData.joinDepartment = data.orgName;                  /* 入职部门 */
            this.selectData.joinPost = data.postName;                       /* 入职岗位 */
        },

        // 初始化用户信息
        userInfoInit(data) {
            this.addForm.name           = data.userName;                /* 姓名 */
            this.addForm.sex            = data.gender;                  /* 性别 */
            this.addForm.phone          = data.phone;                   /* 联系电话 */
            this.addForm.email          = data.email;                   /* 邮箱 */
            this.addForm.idType         = data.idType;                  /* 证件类型 */
            this.addForm.idNum          = data.idNumber;                /* 证件号码 */
            this.addForm.age            = data.age;                     /* 年龄 */
            this.addForm.startWorkDate  = data.firstWorkDate.split('T')[0];           /* 参加工作时间 */
            this.addForm.post           = data.applicationPosition;     /* 应聘岗位 */
            this.addForm.maritalStatus  = data.maritalStatus;           /* 婚姻状况 */
            this.addForm.degree         = data.highestDegree;           /* 最高学历 */
            this.addForm.school         = data.graduatedSchool;         /* 毕业学校 */
            this.addForm.major          = data.graduatedSpeciality;     /* 毕业专业 */
            this.addForm.lastCompany    = data.lastWorkCompany;         /* 最近工作单位 */
        },

        // 初始化入职信息
        jobInfoInit(data) {
            if (data.orgId || data.orgId === 0) {
                this.getPost(data.orgId)
            }
            this.entryForm.joinDate         = data.hireDate.split('T')[0];                    /* 计划入职日期 */
            this.entryForm.testDate         = data.probationPeriod;             /* 试用期 */
            this.entryForm.joinDepartment   = data.orgId;                       /* 入职部门 */
            this.entryForm.joinPost         = data.postId;                      /* 入职岗位名称 */
            this.entryForm.backup           = data.description;                 /* 备注 */
        },

        // 用户信息--编辑按钮
        userInfoEdit() {
            // 请求需要的数据
            if (!this.hasBaseData) {
                this.initGetData();
                this.hasBaseData = true;
            };
            this.userInfoEditShow = true;
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

        // 部门下拉框节点被点击(入职部门改变)
        selectTreeNodeClick(node) {
            this.selectData_2.joinDepartment = node.org_name;
            this.entryForm.joinDepartment = node.org_id;
            this.$refs.selectTree.blur();
            this.getPost(node.org_id);
            this.selectData_2.joinPost = '';
            this.entryForm.joinPost = '';
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
            this.selectData_2.joinPost = this.getShowName(this.postList,v);
        },

        // 证件类型改变
        idTypeChange(v) {
            if (v === 'ID_CARD') {
                if (this.addForm.idNum.length === 18) {
                    this.addForm.age = base.getAgeFromIdNumber(this.addForm.idNum);
                }
            };
            this.selectData_2.idType = this.getShowName(this.cardTyptList,v);
        },

        // 婚姻状况改变
        maritalStatusChange(v) {
            console.log(v)
            this.selectData_2.maritalStatus = this.getShowName(this.marryStatusList,v);
            console.log(this.selectData_2.maritalStatus)
        },

        // 学历改变
        degreeChange(v) {
            this.selectData_2.degree = this.getShowName(this.degreeList,v);
        },

        // 试用期改变
        testDateChange(v) {
            let testList = {
                0: '无试用期',
                1: '1个月',
                2: '2个月',
                3: '3个月',
                4: '4个月',
                5: '5个月',
                6: '6个月',
            };
            this.selectData_2.testDate = testList[v];
        },

        // 取显示名称方法
        getShowName(list, code) {
            let a = list.filter(item => {
                return item.dictCode === code;
            });
            return a[0]['dictValue'];
        },

        // 证件号码输入框失去焦点--如果是身份证号码，计算年龄
        idNumberBlur() {
            if (this.addForm.idType === 'ID_CARD' && this.addForm.idNum.length === 18) {
                this.addForm.age = base.getAgeFromIdNumber(this.addForm.idNum);
            }
        },

        // 用户信息--保存
        userInfoSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.userInfoEditSubmit();
                }
            });
        },

        // 用户信息--编辑--提交
        userInfoEditSubmit() {
            let send = {
                "userName":             this.addForm.name,                          /* 用户名 */
                "gender":               this.addForm.sex,                           /* 性别 */
                "phone":                this.addForm.phone,                         /* 手机号 */
                "email":                this.addForm.email,                         /* 邮箱 */
                "idType":               this.addForm.idType,                        /* 证件类型 */
                "idNumber":             this.addForm.idNum,                         /* 证件号码 */
                "age":                  Number(this.addForm.age),                   /* 年龄 */
                "firstWorkDate":        this.addForm.startWorkDate,                 /* 参加工作时间 */
                "applicationPosition":  this.addForm.post,                          /* 应聘岗位 */
                "maritalStatus":        this.addForm.maritalStatus,                 /* 婚姻状况 */
                "highestDegree":        this.addForm.degree,                        /* 最高学历 */
                "graduatedSchool":      this.addForm.school,                        /* 毕业院校 */
                "graduatedSpeciality":  this.addForm.major,                         /* 毕业专业 */
                "lastWorkCompany":      this.addForm.lastCompany,                   /* 最近工作单位 */

                // "employmentId":         0,                                          /* 预入职ID */
                // "hireDate":             this.addForm.joinDate,                      /* 入职日期 */
                // "orgId":                Number(this.addForm.joinDepartmentId),      /* 入职部门id */
                // "orgName":              this.addForm.joinDepartment,                /* 入职部门 */
                // "postId":               Number(this.addForm.joinPostId),            /* 入职岗位id */
                // "postName":             this.addForm.joinPost,                      /* 入职岗位 */
                // "probationPeriod":      Number(this.addForm.testDate),              /* 试用期 */
            };
            base.log('s', '编辑个人信息', send);
            this.addLoading = true;
            entry_api11(send, res => {
                this.addLoading = false;
                let d = res.data;
                base.log('r', '编辑个人信息', d);
                if (d.success) {
                    Object.assign(this.selectData,this.selectData_2);
                    base.success(d);
                }else{
                    base.error(d);
                }
            })
        },

        // 入职信息--编辑
        entryInfoEdit() {
            // 请求需要的数据
            if (!this.hasBaseData) {
                this.initGetData();
                this.hasBaseData = true;
            };
            this.entryInfoEditShow = true;
        },
    }
}
</script>