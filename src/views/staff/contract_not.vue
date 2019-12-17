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
            <contractSign :signData="signData" ref="contractSign"></contractSign>
            <el-row :gutter="20" class="button" type="flex" justify="center" align="middle" >
                <el-col :span=".5">
                    <el-button size="small" plain="" @click="addCancel" >取消</el-button>
                </el-col>
                <el-col :span=".5">
                    <el-button size="small" type="primary" @click="addSure('addForm')" >提交</el-button>
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
import {notContract_api1, sys_api2, custom_api4, custom_api3, notContract_api2, notContract_api3} from '../../request/api';
import cr from '../../request/commonRequest';
import commonTable from '../../components/table/commonTable';
import commonTitle from '../../components/title';
import commonUpload from '../../components/archivesUpload/archivesUpload';
import userInfo from './components/userInfo';
import file from '../../request/filePath';
import contractSign from './components/contractSign';

export default {
    name: 'contract_not',            /* 未签合同 */
    components: {commonTable, commonTitle, commonUpload, userInfo, contractSign},
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

            currentOrgId: '',       /* 当前的机构id */

            // 新签
            addTableShow: false,
            addRows: [],
            signData: {
                title: '合同签订信息',
                list: []
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
            this.currentOrgId = node.org_id;
            this.table.pageResize = true;
            this.currentPage = 1;
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
                this.table.pageResize = false;
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
            if (!selectData || selectData.length === 0) {
                this.$message({
                    message: '请勾选人员',
                    type: 'warning'
                })
                return false;
            }
            this.signData.list = selectData;
            this.addRows = selectData;

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
        addSure() {
            let data = this.$refs.contractSign.getData();
            if (data) {
                this.addSubmit(data);
            }
        },

        // 新签--提交
        addSubmit(dict) {
            let send = {
                laborContractVo: {
                    "contractBeginDate": dict.startDate,
                    "contractEndDate": dict.endDate,
                    "contractId": 0,
                    "contractNumber": dict.num,
                    "contractPeriodMonth": dict.range,
                    "contractPeriodType": dict.type,
                    "contractRemark": dict.note,
                    "contractSignDate": dict.writeDate,
                    "contractSubject": dict.theme,
                    "signNumber": dict.times
                },
                list: this.addRows.map(item => item.archiveId)
            };
            base.log('s', '新签提交', send);
            notContract_api3(send, res => {
                let d = res.data;
                base.log('r', '新签提交', d);
                if (d.success) {
                    this.getTable(this.currentOrgId);
                    base.success(d);
                    this.showType = 'main';
                }else{
                    base.error(d);
                }
            })
        },

        // 新签--取消
        addCancel() {
            this.showType = 'main';
        },

        // 页容量改变
        pageSizeChange(size, search) {
            this.pageSize = size;
            this.getTable(search.org);
        },

        // 页码改变
        pageChange(index, search) {
            this.currentPage = index;
            this.getTable(search.org);
        },

        download(search,radio,checkbox) {
            if (!search.org) {
                this.$message({
                    message: '请先选择机构',
                    type: 'warning'
                });
                return false;
            }
            let send = {
                list: !checkbox ? [] : checkbox.map(item => item.archiveId),
                orgId: search.org
            };
            notContract_api2(send, res => {
                base.blobDownLoad(res);
            })
        },

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