<style lang="scss" scoped>
#archives_file {
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
    <div id="archives_file">
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
    name: "archives_file",
    components:{
        commonTable,
    },
    data() {
        return {
            tableData:{
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'employeeNumber', isShow: true},
                    {name: '单位', key: 'employeeNumber', isShow: true},
                    {name: '部门', key: 'orgName', isShow: true},
                    {name: '证件类型', key: 'attritionType', isShow: true},
                    {name: '证件名称', key: 'postName', isShow: true},
                    {name: '上传日期', key: 'hireDate', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
                    {
                        type: 'selectTree',                 /* 单选下拉框树形 */
                        placeholder: '请筛选机构',
                        key: 'typeTree',                         // 必须,树形下拉框选择值绑定的变量
                        showKey: 'typeTreeName',                 // 必须,树形下拉框选择值显示的值绑定的变量                        
                        nodeValueKey: 'orgId',                  // 必须,树形下拉框选中的节点对象中要取的值的key
                        nodeShowKey: 'orgName',                 // 必须,树形下拉框选中的节点对象中要显示的值的key
                        //下拉机构树
                        treeData: {
                            data: [],
                            props: {
                                children: "childList",
                                label: "orgName",
                            },
                            icons:[],
                            showCheckbox: true,
                            checkClick: this.checkTreeClick,
                            showDefaultIcon: true, 
                     },
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '上传',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.upload        /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '下载',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.download        /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '删除',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.del        /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '打印',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.print        /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '高拍仪',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.search        /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
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
        this.getOrgTreeReq()
    },
    methods:{
         getOrgTreeReq() {
            let send = {
                isEnable: 0
            };
            base.log("s", "查询树", send);
            archives_file_api1(send, res => {                
                base.log("r", "查询树", res.data);
                if (res.data.success) {                                  
                    this.tableData.bar[0].treeData.data = res.data.result.list;
                } else {
                    base.error(res.data);
                }
            });
        },
    }
};
</script>

