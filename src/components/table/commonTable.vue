<style scoped>

</style>

<template>
    <div id="commonTable">
        <h1>commonTable</h1>
        <ul>
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
            </li>
        </ul>
        <el-table :data="data" style="width: 100%" @selection-change="selectChange" >
            <el-table-column v-if="table.showSelect" type="selection" width="55"></el-table-column>
            <el-table-column v-if="table.showRadio" width="55">
                <template slot-scope="scope">
                    <el-checkbox :checked="radioCheckedIndex === scope.$index" @change="radioClick($event,scope)" ></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column v-for="(item,index) in head" :key="index" :prop="item.key" :label="item.name" :width="item.width" v-show="item.isShow" ></el-table-column>
        </el-table>
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
        };
    },
    created() {
        // 变量初始化
        this.barModelInit(this.table.bar);
        console.log(this.barData)
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
            console.log('行被点击')
            console.log(val)
            this.radioCheckedIndex = val ? scope.$index : undefined;
            this.radioChecked = val ? scope.row : null;
            console.log(this.radioCheckedIndex);
        },

        // 操作栏数据绑定初始化
        barModelInit(list) {
            list.forEach(item => {
                let val;
                switch (item.type) {
                    case 'input':
                        // 输入框
                        val = item.defaultVal || item.defaultVal === 0 ? item.defaultVal : '';
                        break;
                    
                    case 'select':
                        // 单选下拉框
                        val = item.defaultVal || item.defaultVal === 0 ? item.defaultVal : '';
                        break;
                
                    default:
                        break;
                };
                this.$set(this.barData, item.key, val);
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
    }
}
</script>