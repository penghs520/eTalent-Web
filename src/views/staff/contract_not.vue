<style lang="scss" scoped >
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
.upload{
    padding: 20px;
}
</style>

<template>
    <div id="contract_not" class="commonRightCont">
        <!-- 主页 -->
        <commonTable v-show="showType === 'main'" :table="table" ref="commonTable" ></commonTable>

        <!-- 人员详情 -->
        <div v-if="showType === 'userInfo'" >
            <userInfo :userInfo="userInfoData" :methods="userInfoMethods" :option="userInfoOption" :tabList="userInfoTabList" :formList="userInfoFormList" ></userInfo>
        </div>

        <!-- 新签 -->
        <div class="add" v-show="showType === 'add'" >
            <commonTitle name="合同签订信息" ></commonTitle>
            <!-- 业务对象 -->
            <ul class="person" >
                <li class="left">
                    <span class="label">业务对象：</span>
                    <span class="value">
                        <span>张三、李四</span>
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
                    <el-col :span="12">
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
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="合同期限（月）：" prop="range">
                            <el-input v-model.number="addForm.range" :disabled="rangeDisabled" type="number" @change="rangeChange" class="removeNumberInput" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="isEndDate">
                        <el-form-item label="合同终止日期：" prop="endDate">
                            <el-date-picker
                                style="width:100%;"
                                v-model="addForm.endDate"
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
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="合同主体：" prop="theme">
                            <el-input v-model="addForm.theme"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签订次数：" prop="times">
                            <el-input v-model.number="addForm.times" class="inputRemove"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="备注：" prop="note"> 
                            <el-input v-model="addForm.note" type="textarea" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-row :gutter="20" class="button" type="flex" justify="center" align="middle" >
                <el-col :span=".5">
                    <el-button size="small" plain="" @click="addCancel" >取消</el-button>
                </el-col>
                <el-col :span=".5">
                    <el-button size="small" type="primary" >提交</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="upload" v-if="showType === 'upload'" >
            <commonUpload :data="uploadData"  :active="uploadActive">
                <template v-slot:remind>
                    <div style="marginTop:-2px">
                        <span style="marginRight:10px">推荐下载标准模板,填写信息后再上传</span>
                        <el-button type="primary" size="mini" @click="upload_download">下载模板</el-button>
                    </div>                           
                </template>
                    <template v-slot:explain>
                        <div>
                        <p>一次最多导入1000条数据</p>
                        </div>  
                </template>
                <template v-slot:btn>
                    <el-button size="small" plain="" @click="showType = 'main'" >返回</el-button>
                </template>
            </commonUpload>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {notContract_api1, sys_api2, custom_api4, custom_api3} from '../../request/api';
import cr from '../../request/commonRequest';
import commonTable from '../../components/table/commonTable';
import commonTitle from '../../components/title';
import commonForm from '../../components/form/commonForm';
import commonUpload from '../../components/archivesUpload/archivesUpload';
import userInfo from './components/userInfo';
import file from '../../request/filePath';

export default {
    name: 'contract_not',            /* 未签合同 */
    components: {commonTable, commonTitle, commonForm, commonUpload, userInfo},
    data() {
        return {
            showType: 'main',
            table: {
                head: [],
                data: [],
                total: 0,
                bar: [
                    {
                        type: 'button',
                        text: '新签',
                        method: this.add
                    },
                    {
                        type: 'button',
                        text: '导入',
                        method: this.upload
                    },
                    {
                        type: 'button',
                        text: '导出',
                        method: this.download
                    },
                    {
                        type: 'selectTree',
                        placeholder: '请选择机构',
                        key: 'org',
                        showKey: 'orgName',
                        nodeValueKey: 'org_id',
                        nodeShowKey: 'org_name',
                        treeData: {
                            data: [],
                            props: {
                                children: "list",
                                label: "org_name"
                            },
                            showDefaultIcon: true,
                            nodeClick: this.selectTreeNodeClick,
                            defaultIconExpandNode: true
                        }
                    }
                ],
                showSelect: true,
                activeColumn: '姓名',
                cellClick: this.cellClick,
                loading: false,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange
            },
            currentPage: 1,
            pageSize: 10,

            // 新签
            contractType: '1',
            addTableShow: false,
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
                // showSelect: true,
                // selectChange: this.addSelectChange,
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
                range: '',                  /* 合同期限 */
                endDate: '',                /* 合同终止日期 */
                endDateText: '',            /* 合同终止日期文字描述 */
                theme: '',                  /* 合同主体 */
                times: '',                  /* 签订次数 */
                note: '',                   /* 备注 */
            },
            addRules: {
                type: [{required: true, message: '必选', trigger: 'change'}],
                writeDate: [{required: true, message: '必选', trigger: 'change'}],
                startDate: [{required: true, message: '必选', trigger: 'change'}],
                endDate: [{required: true, message: '必选', trigger: 'change'}],
            },

            // 上传
            uploadActive: 0,                   // 必须，步骤条的进度，初始化应该是0，然后是1、2、3
            uploadData: {                           // 必须，上传组件的配置项
                uploadUrl: '',                  // 必须，上传地址
                uploadSuccess: this.upload_success,            // 非必须，上传成功的回调函数，接收3个参数：response/file/fileList
                uploadError: this.upload_error,              // 非必须，上传失败的回调函数，接收3个参数：error/file/fileList               

                tableShow: false,                  // 非必须,是否显示表格
                tableData: {},                   // 非必须，表格数据(同公共表格组件格式)
                fileList: [],                     // 必须，上传文件存储
            },

            // 人员信息
            userInfoData: null,
            userInfoMethods: {
                tabClick: this.userInfoTabClick,         /* 非必须，tab栏被点击，接收1个参数，tab对象数据 */
                reback: this.userInfoReback,           /* 非必须，不配置不显示按钮，返回按钮 */
            },
            userInfoOption: {
                showType: 'see',           /* 显示类型，默认显示seeForm */
                labelWidth: '200px',         /* label宽度，默认120px */
                btnShow: false
            },
            userInfoTabList: [],
            userInfoFormList: [],
            currentRow: null,
        };
    },
    created() {
        cr.getOrg(this.getOrg);
    },
    mounted() {},
    methods: {
        // 人员详情--返回
        userInfoReback() {
            this.showType = 'main';
        },

        // 人员详情--tab被点击
        userInfoTabClick(tab) {
            console.log(tab);
            this.getTabDetail(tab.tableId);
        },

        // 表格单元格被点击
        cellClick(key,row) {
            if (key === 'userName') {
                console.log(row)
                this.currentRow = row;
                this.userInfoData = row;
                this.showType = 'userInfo';
                this.getTab(row.archiveId);
            }
        },
        // 人员详情--获取tab信息
        getTab() {
            custom_api4(null, res => {
                let d = res.data;
                base.log('r', '获取tab', d);
                if (d.success) {
                    this.userInfoTabList = d.result;
                    this.getTabDetail(d.result[0].tableId);
                }else{
                    base.error(d);
                }
            })
        },
        // 人员详情--获取tab下的详情
        getTabDetail(tableId) {
            let send = {
                businessId: this.currentRow.archiveId,
                tableId: tableId,
            };
            base.log('s', 'tab下的详情', send);
            custom_api3(send, res => {
                let d = res.data;
                base.log('r', 'tab下的详情', d);
                if (d.success) {
                    this.userInfoFormList = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 获取机构树
        getOrg(orgList) {
            this.table.bar[3].treeData.data = orgList;
        },

        // 机构树节点被点击
        selectTreeNodeClick(node) {
            this.getTable(node.org_id);
        },
        // 获取表格数据
        getTable(orgId) {
            let send = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orgId: orgId
            };
            this.table.loading = true;
            base.log('s', '获取表格', send);
            notContract_api1(send, res => {
                this.table.loading = false;
                let d = res.data;
                base.log('r', '获取表格', d);
                if (d.success) {
                    this.table.data = d.result.pageResult.list;
                    this.table.total = d.result.pageResult.total;
                    this.table.head = d.result.heads;
                }else{
                    base.error(d);
                }
            })
        },

        // 新签
        add(barData, radioData, selectData) {
            console.log(selectData)
            if (!selectData || selectData.legnth === 0) {
                this.$message({
                    message: '请勾选人员',
                    type: 'warning'
                })
                return false;
            }
            this.getContractNum(1);
            this.addTable.data = selectData;

            // 计算一些默认值
            if (selectData.length === 1) {
                this.addForm.startDate = selectData[0].hireDate;
                this.addForm.writeDate = new Date();
            }
            this.showType = 'add';
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

        // 计算合同终止日期
        rangeChange(v) {
            console.log(v);
            let start = this.addForm.startDate;
            if (!start || !v) {
                return false;
            }
            let startDate = new Date(start);
            let y = startDate.getFullYear(),
                m = startDate.getMonth() + 1,
                d = startDate.getDate();
                console.log('------------')
                console.log(v);
                console.log(y);
                console.log(m);
                console.log(d);
        },

        // 合同期限类型改变
        typeChange(v) {
            console.log(v)
            this.rangeDisabled = v !== '固定期限';
            this.isEndDate = v === '固定期限';
            this.addForm.endDateText = v;
            if (v === '无固定期限') {
                this.addForm.range = '';
            }
        },

        // 新签--确定
        addSure(groupIndex, data) {},

        // 新签--取消
        addCancel() {
            this.showType = 'main';
        },

        download() {},

        // 上传
        upload() {
            this.showType = 'upload';
        },

        upload_download() {
            let url = file['新签合同'];
            if (url) {
                window.open(url, "_self");
            }
        },
        upload_success() {},
        upload_error() {},
    }
}
</script>