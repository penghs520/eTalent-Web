<style lang="scss" scoped >
.add{
    background-color: #fff;
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
    <div id="notContract" class="commonRightCont">
        <!-- 主页 -->
        <commonTable v-show="!addShow" :table="table" ref="commonTable" ></commonTable>

        <!-- 新签 -->
        <div class="add" v-show="addShow" >
            <commonTitle name="合同签订信息" ></commonTitle>
            <!-- 业务对象 -->
            <ul class="person" >
                <li class="left">
                    <span class="label">业务对象：</span>
                    <span class="value">
                        <span>张三、李四</span>
                        <el-button type="text" size="small" class="btn" >展开详情</el-button>
                    </span>
                </li>
                <li class="right">
                    <template>
                        <el-radio v-model="contractType" label="1" @change="contractTypeChange" >按合同期限</el-radio>
                        <el-radio v-model="contractType" label="2" @change="contractTypeChange">按起止日期</el-radio>
                    </template>
                </li>
            </ul>
            <!-- 表格 -->
            <!-- 表单 -->
            <commonForm :data="commonForm" ref="commonForm" ></commonForm>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import {notContract_api1} from '../../request/api';
import cr from '../../request/commonRequest';
import commonTable from '../../components/table/commonTable';
import commonTitle from '../../components/title';
import commonForm from '../../components/form/commonForm';

export default {
    name: 'notContract',            /* 未签合同 */
    components: {commonTable, commonTitle, commonForm},
    data() {
        return {
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
                cellClick: Function,
                loading: false,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange,
                formatter: Function,
            },
            currentPage: 1,
            pageSize: 10,

            // 新签
            addShow: true,
            contractType: '1',
            commonForm: {
                domList: [
                    {
                        list: [
                            {type: 'input', label: '合同编号', key: 'num', isReadOnly: true, default: '00-22-55'},
                            {type: 'select', label: '合同期限类型', key: 'dateType', isMust: true, list: [{label: '固定期限', value: 1},{label: '无固定期限', value: 2},{label: '以完成一定工作任务', value: 3}]},
                            {type: 'date', label: '合同签订日期', key: 'writeDate', isMust: true},
                            {type: 'input', label: '合同起始日期', key: 'startDate', isReadOnly: true, isMust: true, default: '员工入职日期'},
                            {type: 'input', label: '合同期限（月）', key: 'month', isReadOnly: true},
                            {type: 'date', label: '合同终止日期', key: 'endDate', isMust: true, isReadOnly: true},
                            {type: 'input', label: '合同主题', key: 'contractMain'},
                            {type: 'input', label: '签订次数', key: 'times', isReadOnly: true, default: '1'},
                            {type: 'textarea', label: '备注', key: 'note', isFullRow: true}
                        ]
                    }
                ],
                option: {
                    showType: 'form',           /* 非必须整体显示类型，显示样式类型,默认值：form,可能取值：see-显示、form-表单、seeForm-能看能编辑 */
                    labelWidth: '130px',        /* 非必须，label宽度，默认100px */
                },
                sure: this.addSure,
                cancel: this.addCancel
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
                    // 
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
        },

        // 新签--合同期限类型改变
        contractTypeChange(v) {
            if (v === '1') {
                this.$set(this.commonForm.domList[0].list, 5, {type: 'input', label: '合同终止日期', key: 'endDate', default: '根据合同期限(月)自动生成', isReadOnly: true})
            }else if (v === '2') {
                console.log(2)
                this.$set(this.commonForm.domList[0].list, 5, {type: 'date', label: '合同终止日期', key: 'endDate', isMust: true})
            }
        },

        // 新签--确定
        addSure(groupIndex, data) {},

        // 新签--取消
        addCancel() {
            this.addShow = false;
        },

        upload() {},
        download() {},
    }
}
</script>