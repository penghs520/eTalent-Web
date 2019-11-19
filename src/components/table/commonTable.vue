<style scoped>
.operateBar{
    display: flex;
    align-items: center;
}
.operateBar>li{
    margin-right: 20px;
}
.table{
    margin-bottom: 20px;
    width: 100%;
}
</style>

<template>
    <div id="commonTable">
        <!-- 操作栏 -->
        <ul class="operateBar">
            <li v-for="(item,index) in table.bar" :key="index" >
                
                <!-- 输入框 -->
                <el-input v-if="item.type === 'input'"      v-model="barData[item.key]" :placeholder="item.placeholder" size="small" clearable="" @keydown.enter="inputEnter(item)" ></el-input>
                
                <!-- 下拉框 -->
                <el-select v-if="item.type === 'select'"    v-model="barData[item.key]" :placeholder="item.placeholder" size="small" clearable="" >
                    <el-option v-for="li in item.list" :key="li.value" :label="li.label" :value="li.value"></el-option>
                </el-select>

                <!-- 按钮 -->
                <el-button v-if="item.type === 'button'" :type="item.btnType ? item.btnType : 'primary'" size="small" :icon="item.icon" @click="btnClick(item.method)" >{{item.text}}</el-button>

                <!-- 二级按钮 -->
                <el-dropdown v-if="item.type === 'buttons'" trigger="click" @command="buttonsClick" >
                    <el-button :type="item.btnType ? item.btnType : 'primary'" size="small" :icon="item.icon">
                        {{item.text}}
                        <i v-show="!item.defaultIconHide" class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(btn,btnIndex) in item.list" :key="btnIndex" :command="btn" :icon="btn.icon" >{{btn.text}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>

        <!-- 表格 -->
        <el-table :data="data" class="table" @selection-change="selectChange" >
            <el-table-column v-if="table.showSelect" type="selection" width="55"></el-table-column>
            <el-table-column v-if="table.showRadio" width="55">
                <template slot-scope="scope">
                    <el-checkbox :value="radioCheckedIndex === scope.$index" @change="radioClick($event,scope)" ></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column v-for="(item,index) in head" :key="index" :prop="item.key" :label="item.name" :width="item.width" v-show="item.isShow" ></el-table-column>
        </el-table>

        <!-- 页码 -->
        <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page="1"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import base from '../../assets/js/base';

export default {
    name: 'commonTable',            /* 公共表格组件 */
    props: {
        table: Object,
    },
    data() {
        return {
            selectChecked: null,                /* 多选框选中值 */
            radioChecked: null,                 /* 单选框选中的行数据 */
            radioCheckedIndex: undefined,       /* 单选框选中的index */
            barData: {},                        /* 操作栏数据绑定变量 */
            page: {
                pageSizes: [10, 20, 50, 100, 200, 500, 1000],
                pageSize: 10
            },
        };
    },
    created() {
        // 变量初始化
        this.barModelInit(this.table.bar);
        Object.assign(this.page, this.table.page);
    },
    computed: {
        head(){
            return this.table.head;
        },
        data(){
            return this.table.data;
        },
        total(){
            return this.table.total;
        },
    },
    mounted() {},
    methods: {
        // 多选框改变
        selectChange(val) {
            this.selectChecked = val;
            if (this.table.selectChange) {
                this.table.selectChange(val);
            }
        },

        // 单选框被点击
        radioClick(val,scope) {
            this.radioCheckedIndex = val ? scope.$index : undefined;
            this.radioChecked = val ? scope.row : null;
        },

        // 操作栏数据绑定初始化
        barModelInit(list) {
            list.forEach(item => {
                let val;
                switch (item.type) {
                    case 'input':
                        // 输入框
                        val = item.defaultVal || item.defaultVal === 0 ? item.defaultVal : '';
                        this.$set(this.barData, item.key, val);
                        break;
                    
                    case 'select':
                        // 单选下拉框
                        val = item.defaultVal || item.defaultVal === 0 ? item.defaultVal : '';
                        this.$set(this.barData, item.key, val);
                        break;
                
                    default:
                        break;
                };
            });
        },

        // 输入框回车键
        inputEnter(config) {
            if (config.enter) {
                config.enter(this.barData, this.radioChecked, this.selectChecked);
            }
        },

        // 按钮被点击
        btnClick(callBack) {
            if (callBack) {
                callBack(this.barData, this.radioChecked, this.selectChecked);
            }
        },

        // 更多按钮
        buttonsClick(btn) {
            if (btn.method) {
                btn.method(this.barData, this.radioChecked, this.selectChecked);
            }
        },

        // 页码--每页数量改变
        pageSizeChange(size) {
            if (this.table.pageSizeChange) {
                this.table.pageSizeChange(size, this.barData, this.radioChecked, this.selectChecked)
            }
        },

        // 页码--当前页改变
        pageCurrentChange(index) {
            if (this.table.pageChange) {
                this.table.pageChange(index, this.barData, this.radioChecked, this.selectChecked)
            }
        },
    }
}
</script>