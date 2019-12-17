<style lang="scss" scoped >
</style>

<template>
    <div id="contract_has" class="commonRightCont">
        <!-- 主页 -->
        <commonTable v-show="showType === 'main'" :table="table" ref="commonTable" ></commonTable>

        <!-- 续签 -->
        <div v-show="showType === 'renew'">
            <contractSign :signData="signData" ref="contractSign"></contractSign>

            <el-row :gutter="20" class="button" type="flex" justify="center" align="middle" >
                <el-col :span=".5">
                    <el-button size="small" plain="" @click="renewCancel" >取消</el-button>
                </el-col>
                <el-col :span=".5">
                    <el-button size="small" type="primary" @click="renewSure" >提交</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {contractHas_api1} from '../../request/api';
import cr from '../../request/commonRequest';
import commonTable from '../../components/table/commonTable';
import commonTitle from '../../components/title';
import commonForm from '../../components/form/commonForm';
import commonUpload from '../../components/archivesUpload/archivesUpload';
import file from '../../request/filePath';
import contractSign from './components/contractSign';

export default {
    name: 'contract_has',            /* 已签合同 */
    components: {commonTable, commonTitle, commonForm, commonUpload, contractSign},
    data() {
        return {
            showType: 'main',
            table: {
                head: [
                    {
                        name: '姓名',
                        key: 'userName',
                        isShow: true,
                        width: '200px'
                    },
                    {name: '工号', key: 'employeeNumber', isShow: true}
                ],
                data: [],
                total: 0,
                bar: [
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
                            showCheckbox: true,
                            showDefaultIcon: true,
                            nodeClick: this.selectTreeNodeClick,
                            defaultIconExpandNode: true
                        }
                    },
                    {
                        label: '合同标识：',
                        key: 'sign',
                        type: 'select',
                        list: [
                            {label: '有效', value: '有效'},
                            {label: '无效', value: '无效'},
                            {label: '全部', value: '全部'}
                        ]
                    },
                    {
                        label: '合同状态：',
                        key: 'contractStatus',
                        type: 'selects',
                        list: [
                            {label: '新签', value: '新签'},
                            {label: '续签', value: '续签'},
                            {label: '变更', value: '变更'},
                            {label: '解除', value: '解除'},
                            {label: '终止', value: '终止'}
                        ]
                    },
                    {
                        type: 'button',
                        text: '查询',
                        method: this.search
                    },
                    {
                        type: 'button',
                        text: '续签',
                        method: this.renew
                    },
                    {
                        type: 'button',
                        text: '终止',
                        method: this.stop
                    },
                    {
                        type: 'button',
                        text: '解除',
                        method: this.relieve
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多操作',
                        list: [                         /* 必须，更多按钮的数据组成的数组 */
                            {text: '变动', method: this.change},
                            {text: '打印', method: this.print},
                            {text: '导出', method: this.download},
                            {text: '发送续签意向', method: this.sendRenew}
                        ],                       
                    }
                    
                ],
                showSelect: true,
                // cellClick: Function,
                loading: false,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange,
                // formatter: Function,
            },
            currentPage: 1,
            pageSize: 10,

            // 续签
            operationRows: null,
            signData: {
                title: '续签合同',
                list: []
            },
        };
    },
    created() {
        cr.getOrg(this.getOrg);
    },
    mounted() {},
    methods: {
        // 获取机构树
        getOrg(orgList) {
            this.table.bar[0].treeData.data = orgList;
        },

        // 获取表格数据
        getTable(searchData) {
            let send = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                isEnable: searchData.sign,
                orgIdList: searchData.org,
                status: searchData.contractStatus
            };
            this.table.loading = true;
            base.log('s', '获取表格', send);
            contractHas_api1(send, res => {
                this.table.loading = false;
                this.table.pageResize = false;
                let d = res.data;
                base.log('r', '获取表格', d);
                if (d.success) {
                    this.table.head = d.result.heads;
                    this.table.data = d.result.pageResult.list;
                    this.table.total = d.result.pageResult.total;
                }else{
                    base.error(d);
                }
            })
        },

        // 查询
        search(searchData) {
            if (searchData.org.length === 0 || searchData.contractStatus.length === 0) {
                this.$message({
                    message: '机构与合同状态为必选项',
                    type: 'warning'
                });
                return false;
            }
            this.table.pageResize = true;
            this.getTable(searchData);
        },

        // 页容量改变
        pageSizeChange(size, serachData) {
            this.pageSize = size;
            this.search(searchData);
        },
        
        // 翻页
        pageChange(index, searchData) {
            if (searchData.org.length === 0 || searchData.contractStatus.length === 0) {
                this.$message({
                    message: '机构与合同状态为必选项',
                    type: 'warning'
                });
                return false;
            }
            this.currentPage = index;
            this.getTable(searchData);
        },

        // 续签
        renew(search,radio,checkbox) {
            if (!checkbox || checkbox.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            }
            console.log(checkbox)
            this.operationRows = checkbox;
            this.signData.list = checkbox;
            this.showType = 'renew';
        },

        // 续签--取消
        renewCancel() {
            this.showType = 'main';
        },

        // 续签--确定
        renewSure() {},

        // 终止
        stop(search,radio,checkbox) {
            if (!checkbox || checkbox.length === 0) {
                this.$message({
                    message: '请先勾选人员',
                    type: 'warning'
                });
                return false;
            }
            console.log(checkbox)
        },




        relieve() {},
        change() {},
        print() {},
        download() {},
        sendRenew() {},
    }
}
</script>