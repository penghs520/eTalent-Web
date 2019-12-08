<style scoped>

</style>

<template>
    <div id="commonTableDemo">
        <commonTable :table="table" ref="commonTable" ></commonTable>
    </div>
</template>

<script>
import commonTable from '../../components/table/commonTable';

export default {
    name: 'commonTableDemo',            /* 公共表格组件 */
    components: {commonTable},
    data() {
        return {
            table: {
                head: [                                 /* 必须，表格头配置 */
                    {
                        name: '姓名',                   /* 必须，表格头所显示的文字 */
                        key: 'userName',                /* 必须，该列要显示的数据所对应的变量的字符串格式 */
                        isShow: true,                   /* 必须，表格是否默认显示该列 */
                        width: '200px'                  /* 非必须，该列的默认宽度 */
                    },
                    {name: '工号', key: 'employeeNumber', isShow: true}
                ],
                hideHeader: Boolean,                    /* 非必须,是否不显示表格头 */
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [                                  /* 非必须，表格上面的操作栏配置 */
                    {
                        type: 'input',                  /* 输入框 */
                        placeholder: '请输入',          /* 非必须，输入框提示语 */
                        key: 'name',                    /* 必须，输入框绑定的变量字符串 */
                        defaultVal: '',                 /* 非必须，默认值 */
                        isShow: Boolean,                /* 非必须,是否显示该dom */
                        enter: this.search              /* 非必须，回车键的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type',
                        defaultVal: '',
                        list: [
                            {label: '类型1', value: 1},
                            {label: '类型2', value: 2},
                        ],
                    },
                    {
                        type: 'selectTree',                 /* 单选下拉框树形 */
                        placeholder: '请选择',
                        key: 'typeTree',                    // 必须,树形下拉框选择值绑定的变量
                        showKey: '',                        // 必须,树形下拉框选择值显示的值绑定的变量
                        defaultVal: String/Number/Array,    // 非必须,树形下拉框值默认值,如果树形有勾选框,该值类型是数组
                        defaultShowVal: String,             // 非必须,树形下拉框默认显示值                         
                        nodeValueKey: '',                   // 必须,树形下拉框选中的节点对象中要取的值的key
                        nodeShowKey: '',                    // 必须,树形下拉框选中的节点对象中要显示的值的key
                        treeData: {                         /* 必须,树形配置项,参考tree组件 */
                            data: [],
                            props: {
                                children: "childList",
                                label: "orgName"
                            },
                            showDefaultIcon: true,
                            nodeClick: this.selectTreeNodeClick,
                            defaultIconExpandNode: true
                        }
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '查询',                   /* 必须，按钮名称 */
                        btnType: 'primary',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        icon: 'el-icon-search',         /* 非必须，icon图标 */
                        method: this.search             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多',
                        btnType: 'primary',
                        icon: '',
                        defaultIconHide: false,         /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */
                        list: [                         /* 必须，更多按钮的数据组成的数组 */
                            {
                                text: '按钮1',          /* 必须，按钮名称 */
                                method: this.btn1,      /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                                icon: 'el-icon-search'  /* 非必须，icon图标 */
                            },
                            {text: '按钮2', method: this.btn2}
                        ],                       
                    }
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selected: {                             /* 非必须, 默认勾选的行 */
                    key: '',
                    value: ''
                },
                selectChange: this.selectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                showRadio: true,                        /* 非必须，是否显示单选框 */
                perColumn: [                            /* 非必须，表格前置列配置，数组格式，数组中的每个元素就是一列 */
                    {
                        name: '角色',                   /* 必须，该列的表头名称 */
                        width: '200px',                 /* 非必须，该列的宽度 */
                        list: [                         /* 必须，该列中要渲染的按钮，数组格式，数组中每个元素就是一个按钮 */
                            {
                                type: 'primary',        /* 非必须，按钮的样式，element-ui提供的按钮样式 */
                                icon: '',               /* 非必须，按钮的icon */
                                text: '角色',           /* 必须，按钮上显示的文字 */
                                method: this.columnBtn        /* 必须，按钮点击时的回调，该函数接收1个参数：该行的数据 */
                            }
                        ]
                    }
                ],
                activeColumn: Array/String,             /* 非必须，给列加高亮，值是该列表格头显示的名称，多列的话要写成数组格式 */
                cellClick: Function,                    /* 非必须，表格单元格被点击的回调，接收3个参数：该列的key、行数据、该单元格显示的内容 */
                loading: Boolean,                       /* 非必须，加载动画 */
                page: {                                 /* 非必须，页码配置 */
                    pageSizes: [1,2,3],                 /* 非必须，页码可选的每页数量 */
                    pageSize: 2                         /* 非必须，默认每页显示的数量 */
                },
                webPage: Boolean,                       /* 非必须，是否前端分页,默认false */
                pageResize: Boolean,                    /* 非必须，页码重置 */
                pageHide: false,                        /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
                formatter: Function,                    /* 非必须，格式化表格列，返回格式化后的内容即可，String格式，该方法接收5个参数：key(该列的字段), cellValue（单元格的值）, rowIndex（行序号）, column（列数据）, row（行数据） */
            },
            currentPage: 1,                             /* 页面要用到的页码变量 */
            pageSize: 10,                               /* 页面要用到的页码变量 */


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
                hideHeader: Boolean,
                data: [],
                total: 0,
                bar: [
                    {
                        type: 'input',
                        placeholder: '请输入',
                        key: 'name',
                        defaultVal: '',
                        isShow: Boolean,
                        enter: this.search
                    },
                    {
                        type: 'select',
                        placeholder: '请选择',
                        key: 'type',
                        defaultVal: '',
                        list: [
                            {label: '类型1', value: 1},
                            {label: '类型2', value: 2},
                        ],
                    },
                    {
                        type: 'selectTree',
                        placeholder: '请选择',
                        key: 'typeTree',
                        showKey: '',
                        defaultVal: String/Number/Array,
                        defaultShowVal: String,
                        nodeValueKey: '',
                        nodeShowKey: '',
                        treeData: {
                            data: [],
                            props: {
                                children: "childList",
                                label: "orgName"
                            },
                            showDefaultIcon: true,
                            nodeClick: this.selectTreeNodeClick,
                            defaultIconExpandNode: true
                        }
                    },
                    {
                        type: 'button',
                        text: '查询',
                        btnType: 'primary',
                        icon: 'el-icon-search',
                        method: this.search
                    },
                    {
                        type: 'buttons',
                        text: '更多',
                        btnType: 'primary',
                        icon: '',
                        defaultIconHide: false,
                        list: [
                            {
                                text: '按钮1',
                                method: this.btn1,
                                icon: 'el-icon-search'
                            },
                            {text: '按钮2', method: this.btn2}
                        ],                       
                    }
                ],
                showSelect: true,
                selected: {
                    key: '',
                    value: ''
                },
                selectChange: this.selectChange,
                showRadio: true,
                perColumn: [
                    {
                        name: '角色',
                        width: '200px',
                        list: [
                            {
                                type: 'primary',
                                icon: '',
                                text: '角色',
                                method: this.columnBtn
                            }
                        ]
                    }
                ],
                activeColumn: Array/String,
                cellClick: Function,
                loading: Boolean,
                page: {
                    pageSizes: [1,2,3],
                    pageSize: 2
                },
                webPage: Boolean,
                pageResize: Boolean,
                pageHide: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange,
                formatter: Function,
            },
            currentPage: 1,
            pageSize: 10,
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 组件提供的一些方法---------------------开始
            // 重置操作栏
            method_1() {
                this.$$refs.commonTable.resizeOperationBar();
            },
        // 组件提供的一些方法---------------------结束
        
        selectChange(val) {
            console.log(val)
        },

        search(search,radio,checkbox) {
            console.log('查询')
            console.log(search)
            console.log(radio)
            console.log(checkbox)
        },

        btn1(search,radio,checkbox) {
            console.log('按钮1')
            console.log(search)
            console.log(radio)
            console.log(checkbox)
        },
        btn2(search,radio,checkbox) {
            console.log('按钮2')
            console.log(search)
            console.log(radio)
            console.log(checkbox)
        },
        columnBtn(row) {
            console.log(row)
        },
    }
}
</script>