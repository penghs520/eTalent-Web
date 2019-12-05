<style lang="scss" scoped>
#archives_blacklist {
    display: flex;
    height: 100%;
    text-align: left;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding: 24px 0px 0px 24px;
        box-sizing: border-box;
        background-color: #fff;
    }
}
</style>
<template>  
    <div id="archives_blacklist">
        <div class="content">
           <commonTable :table="tableData"></commonTable>
        </div>
    </div>
</template>

<script>
import  commonTable  from "../../components/table/commonTable";
import base from "../../assets/js/base"
import { archives_file_api1 } from '../../request/api'

export default {
    name: "archives_blacklist",
    components:{
        commonTable,
    },
    data() {
        return {
             tableData:{
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '性别', key: 'employeeNumber', isShow: true},
                    {name: '证件号码', key: 'employeeNumber', isShow: true},
                    {name: '手机号', key: 'orgName', isShow: true},
                    {name: '所属单位', key: 'attritionType', isShow: true},
                    {name: '部门', key: 'postName', isShow: true},
                    {name: '岗位', key: 'hireDate', isShow: true},
                    {name: '拉黑原因', key: 'hireDate', isShow: true},
                    {name: '拉黑时间', key: 'hireDate', isShow: true},
                    {name: '操作人', key: 'hireDate', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '上传',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.upload             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '移除',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.removeData             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '导出',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.exportData           /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '导入',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.importData             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
 
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.selectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                activeColumn:"",                        /* 非必须，给列加高亮，值是该列表格头显示的名称，多列的话要写成数组格式 */
                cellClick: this.cellClick,              /* 非必须，表格单元格被点击的回调，接收3个参数：该列的key、行数据、该单元格显示的内容 */
                pageResize: false,                      /* 非必须，页码重置 */
                pageHide: true,                         /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
        };
    },
    created(){
       
    },
    methods:{
    }
};
</script>

