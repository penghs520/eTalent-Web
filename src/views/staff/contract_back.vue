<style lang="scss" scoped >
    
</style>

<template>
    <div id="contract_back">
        <!-- 主页 -->
        <commonTable v-show="showType === 'main'" :table="table" ref="commonTable" ></commonTable>
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

export default {
    name: 'contract_back',            /* 续签反馈 */
    components: {commonTable, commonTitle, commonForm, commonUpload},
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
                        type: 'button',
                        text: '续签',
                        method: this.renew
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
                            showCheckbox: true,
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
        };
    },
    created() {
        cr.getOrg(this.getOrg);
    },
    mounted() {},
    methods: {
        // 获取机构树
        getOrg(orgList) {
            this.table.bar[1].treeData.data = orgList;
        },
    }
}
</script>