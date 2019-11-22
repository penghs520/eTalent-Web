<style scoped>
    
</style>

<template>
    <div id="archives_info">
        <h1>档案管理-信息维护</h1>
        <commonTable :table="table" ref="commonTable" ></commonTable>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonForm from '../../components/table/commonTable';
import {entry_api1} from "../../request/api";

export default {
    name: 'archives_info',               /* 档案管理-信息维护 */
    components: {commonForm},
    data() {
        return {
            table: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'gender', isShow: true},
                    {name: '单位', key: 'phone', isShow: true},
                    {name: '部门', key: 'employmentState', isShow: true},
                    {name: '岗位', key: 'email', isShow: true},
                    {name: '入职日期', key: 'applicationPosition', isShow: true},
                    {name: '试用期到期日期', key: 'orgId', isShow: true},
                    {name: '直接上级', key: 'postId', isShow: true},
                    {name: '联系电话', key: 'hireDate', isShow: true}
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
                        text: '删除',
                        method: this.delet
                    },
                    {
                        type: 'button',
                        text: '打印',
                        method: this.print
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多操作',
                        btnType: 'primary',
                        list: [                         /* 必须，更多按钮的数据组成的数组 */
                            {text: '删除恢复', method: this.deleteRecover},
                            {text: '兼职维护', method: this.partTimeJob},
                            {text: '自定义导出', method: this.download}
                        ]
                    }
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                loading: false,                       /* 非必须，加载动画 */
                pageResize: false,                    /* 非必须，页码重置 */
                pageResize: false,
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            currentPage: 1,                             /* 页面要用到的页码变量 */
            pageSize: 10,
        };
    },
    mounted() {},
    methods: {
        // 新增
        add() {},

        // 删除
        delet(searchData,radioData,checkboxData) {},

        // 打印
        print(searchData,radioData,checkboxData) {},

        // 删除恢复
        deleteRecover() {},

        // 兼职维护
        partTimeJob(searchData,radioData,checkboxData) {},

        // 自定义导出
        download(searchData,radioData,checkboxData) {},

        // 改变页容量
        pageSizeChange(size) {},

        // 翻页
        pageChange(index) {},
    }
}
</script>