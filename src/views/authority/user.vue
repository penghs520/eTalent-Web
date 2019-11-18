<style scoped>

</style>
<template>
    <div id="authority_user">
        <h1>用户授权</h1>
        <commonTable :table="table" ></commonTable>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import {user_api1} from '../../request/api';

export default {
    name: 'user',             /* 用户授权 */
    components: {commonTable},
    data() {
        return {
            table: {
                head: [
                    {name: '姓名', key: 'userName', isShow: true, width: '200px'}
                ],
                data: [],
                total: 0,
                bar: [
                    {
                        type: 'input',                  /* 输入框 */
                        placeholder: '请输入',
                        key: 'name',
                        defaultVal: '',
                        enter: this.search
                    },
                    {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type',
                        defaultVal: '',
                        list: [
                            {label: '类型1', value: 1},
                            {label: '类型2', value: 2},
                        ]
                    },
                    {
                        type: 'button',                 /* 按钮 */
                        text: '查询',
                        btnType: 'primary',
                        icon: 'el-icon-search',
                        method: this.search
                    },
                    {
                        type: 'buttons',                 /* 下拉按钮 */
                        text: '更多',
                        btnType: 'primary',
                        icon: '',
                        defaultIconHide: false,         /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */
                        list: [
                            {text: '按钮1', method: this.btn1, icon: 'el-icon-search'},
                            {text: '按钮2', method: this.btn2}
                        ]
                    }
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.selectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                showRadio: true,                        /* 非必须，是否显示单选框 */
                page: {},
            },
        };
    },
    mounted() {
        this.getTable();
    },
    methods: {
        // 获取表格数据
        getTable() {
            let send = {
                roleId: 1,
                currentPage: 1,
                pageSize: 10
            };
            base.log('s', '获取表格数据', send);
            user_api1(send, res => {
                let d = res.data;
                base.log('r', '获取表格数据', d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                }else{
                    base.error(d);
                }
            })
        },

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

    }
}
</script>