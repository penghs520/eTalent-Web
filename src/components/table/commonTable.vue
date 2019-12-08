<style scoped lang="scss">
#commonTable{
    background-color: #fff;
}
.operateBar{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 16px;
}
.operateBar>li{
    margin:10px 20px 0px 0px;
}
.operateBar>li:last-child{
    margin-right: 0;
}
.table{
    margin-bottom: 20px;
    /* width: 100%; */
}
.select_wrap{
    display: inline-flex;
    justify-content: center;
    align-items: center;   
    .select_title{
        font-size: 14px;
        // width: 70px;
    }
    .el-select{
        flex: 1;
    }
}
</style>
<style>
    #commonTable .tableHeader th{
        background-color: #FAFAFA;
        padding: 7px 0;
        height: 54px;
    }
    #commonTable .el-table th,
    #commonTable .el-table td{
        padding: 7px 0;
    }

</style>

<template>
    <div id="commonTable">
        <!-- 操作栏 -->
        <ul class="operateBar" v-if="table.bar && table.bar.length > 0" >
            <li v-for="(item,index) in table.bar" :key="index" >
                
                <!-- 输入框 -->
                <el-input v-if="item.type === 'input' && item.isShow !== false"   v-model="barData[item.key]" :placeholder="item.placeholder" size="small" clearable="" @keydown.enter="inputEnter(item)" ></el-input>
                
                <!-- 下拉框 -->
                <div v-if="item.type === 'select' && item.isShow !== false" class="select_wrap">
                    <span v-if="item.type === 'select' && item.isShow !== false" :class="{ 'select_title' : item.label}">{{item.label}}</span>
                    <el-select v-model="barData[item.key]" :placeholder="item.placeholder" size="small" clearable="" @change="selectValueChange($event,item.method)">
                        <el-option v-for="li in item.list" :key="li.value" :label="li.label" :value="li.value"></el-option>
                    </el-select>
                </div>
                

                <!-- 下拉选择框树 -->
                <div v-if="item.type === 'selectTree' && item.isShow !== false" class="select_wrap">
                    <span v-if="item.type === 'selectTree' && item.isShow !== false" :class="{ 'select_title' : item.label}">{{item.label}}</span>
                    <el-select  :ref="`selectTree_${index}`"  v-model="barData[item.showKey]" :placeholder="item.placeholder" size="small" clearable="" popper-class="base_treeSelect" style="width:100%">
                        <el-option  :label="barData[item.showKey]" :value="barData[item.showKey]">
                            <tree :treeData="item.treeData" @nodeClick="selectTreeNodeClick($event,item,`selectTree_${index}`)" @selectChange="selectTreeCheckedChange($event,item)" ></tree>
                     </el-option>
                    </el-select>
                 </div>

                <!-- 按钮 -->
                <template v-if="item.type === 'button' && item.isShow !== false">
                    <el-button v-if="item.btnType === 'plain'" plain="" size="small" :icon="item.icon" @click="btnClick(item.method)" >{{item.text}}</el-button>
                    <el-button v-else :type="item.btnType ? item.btnType : 'primary'" size="small" :icon="item.icon" @click="btnClick(item.method)" >{{item.text}}</el-button>
                </template>

                <!-- 二级按钮 -->
                <el-dropdown v-if="item.type === 'buttons' && item.isShow !== false" trigger="click" @command="buttonsClick" >
                    <el-button v-if="item.btnType === 'plain'" plain="" size="small" :icon="item.icon">
                        {{item.text}}
                        <i v-show="!item.defaultIconHide" class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-button v-else :type="item.btnType ? item.btnType : 'primary'" size="small" :icon="item.icon">
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
        <el-table 
            :data="data" 
            class="table" 
            :show-header="!table.hideHeader"
            stripe
            ref="tableDom"
            header-row-class-name="tableHeader"
            :v-loading='loading' 
            :cell-style="cellStyle"
            @selection-change="selectChange"
            @cell-click="cellClick" 
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)" >
            <el-table-column width="14"></el-table-column>
            <el-table-column v-if="table.showSelect" type="selection" width="55"></el-table-column>
            <el-table-column v-if="table.showRadio" width="55">
                <template slot-scope="scope">
                    <el-checkbox :value="radioCheckedIndex === scope.$index" @change="radioClick($event,scope)" ></el-checkbox>
                </template>
            </el-table-column>
            <template v-if="table.perColumn && table.perColumn.length > 0">
                <el-table-column  v-for="(item, index) in table.perColumn" :key="`perColumn_${index}`" :label="item.name" :width="item.width" >
                    <template slot-scope="scope">
                        <el-button v-for="(btn, btnIndex) in item.list" :key="`perColumnBtn_${btnIndex}`" @click="perColumnBtnClick(btn.method, scope)" :type="btn.btnType ? btn.btnType : 'text'" :icon="btn.icon" >{{btn.text}}</el-button>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-for="(item,index) in head" :key="index" :prop="item.key" :label="item.name" :width="item.width" :formatter="columnFormatter" v-show="item.isShow" >
            </el-table-column>
            <el-table-column width="14"></el-table-column>
        </el-table>

        <!-- 页码 -->
        <el-pagination
            v-if="!table.pageHide"
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import tree from '../tree/tree'

export default {
    name: 'commonTable',            /* 公共表格组件 */
    props: {
        table: Object
    },
    components:{
        tree,
    },
    data() {
        return {
            selectChecked: null,                /* 多选框选中值 */
            radioChecked: null,                 /* 单选框选中的行数据 */
            radioCheckedIndex: undefined,       /* 单选框选中的index */
            barData: {},                        /* 操作栏数据绑定变量 */
            allData: [],                        /* 所有的表格数据 */
            data: [],                           /* 显示的表格数据 */
            page: {
                pageSizes: [10, 20, 50, 100, 200, 500, 1000],
                pageSize: 10
            },
            currentPage: 1,
            pageSize: 10,

        };
    },
    created() {
            
        // 变量初始化
        this.barModelInit(this.table.bar);
        Object.assign(this.page, this.table.page);
        this.pageSize = this.page.pageSize;
    },
    computed: {
        head(){
            return this.table.head;
        },
        total(){
            return this.table.total;
        },
        loading() {
            return this.table.loading;
        },
        webPage() {
            return Boolean(this.table.webPage);
        },
    },
    watch: {
        'table.pageResize': {
            handler: function(val) {
                // 页码重置
                if (val.pageResize) {
                    this.currentPage = 1;
                }
            },
            deep: true
        },
        'table.data': {
            handler: function(val) {
                this.allData = val;
                if (this.webPage) {
                    this.data = this.getCurrentPageData(val, this.currentPage, this.pageSize);
                }else{
                    this.data = val;
                };
            },
            deep: true
        },
        data: {
            handler: function() {
                this.selected();
            },
            deep: true
        }
    },
    mounted() {
        this.allData = this.table.data;
        if (this.webPage) {
            this.data = this.getCurrentPageData(this.table.data, this.currentPage, this.pageSize);
        }else{
            this.data = this.table.data;
        };
    },
    methods: {
        // selectTree勾选改变
        selectTreeCheckedChange(checkedList,domOptions) {
            let showList  = checkedList.map(item => item[domOptions.nodeShowKey]);
            let valueList = checkedList.map(item => item[domOptions.nodeValueKey]);

            // 赋值--显示值
            this.$set(this.barData, domOptions.showKey, showList.join(','));
            
            // 赋值--绑定值
            this.$set(this.barData, domOptions.key, valueList);
        },

        // selectTree节点被点击
        selectTreeNodeClick(node,domOptions,refName) {
            if (domOptions.treeData.showCheckbox) {
                return false;
            };
            // 赋值--显示值
            this.$set(this.barData, domOptions.showKey, node[domOptions.nodeShowKey]);
            
            // 赋值--绑定值
            this.$set(this.barData, domOptions.key, node[domOptions.nodeValueKey]);
            // 关闭select
            this.$refs[refName][0].blur();
        },
        //下拉框的值改变
        selectValueChange(val,callBack){
           if(callBack){
               callBack(val)
           }
        },
        // 重置操作栏
        resizeOperationBar() {
            this.barModelInit(this.table.bar);
        },
        // 默认勾选行
        selected() {
            let rule = this.table.selected;
            if (rule) {
                this.data.forEach(item => {
                    if (item[rule.key] === rule.value) {
                        setTimeout(() => {
                            this.$refs.tableDom.toggleRowSelection(item);
                        });
                    }
                });
            }
        },
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
            if (list) {
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
                        
                        case 'selectTree':
                            // 单选下拉框
                            val = item.defaultVal || item.defaultVal === 0 ? item.defaultVal : item.treeData.showCheckbox ? [] : '';
                            let showVal = item.defaultShowVal || item.defaultShowVal === 0 ? item.defaultShowVal : '';
                            this.$set(this.barData, item.key, val);
                            this.$set(this.barData, item.showKey, showVal);
                            break;
                    
                        default:
                            break;
                    };
                });
            }
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

        // 前置列按钮被点击
        perColumnBtnClick(callBack, scope) {
            if (callBack) {
                callBack(scope.row);
            }
        },

        // 页码--每页数量改变
        pageSizeChange(size) {
            this.pageSize = size;
            if (this.webPage) {
                this.data = this.getCurrentPageData(this.allData, this.currentPage, size);
            }else{
                if (this.table.pageSizeChange) {
                    this.table.pageSizeChange(size, this.barData, this.radioChecked, this.selectChecked)
                }
            }
        },

        // 页码--当前页改变
        pageCurrentChange(index) {
            this.currentPage = index;
            if (this.webPage) {
                this.data = this.getCurrentPageData(this.allData, index, this.pageSize);
            }else{
                if (this.table.pageChange) {
                    this.table.pageChange(index, this.barData, this.radioChecked, this.selectChecked)
                }
            }
        },

        // 前端分页--获取当前页数据
        getCurrentPageData(allData, pageIndex, pagesize) {
            let start = (pageIndex - 1) * pagesize;
            let end = pageIndex * pagesize;
            let result = allData.slice(start,end);
            return result;
        },

        // 表格列格式化
        columnFormatter(row, column, cellValue, index) {
            let key = column.property;
            if (this.table.formatter) {
                let result = this.table.formatter(key, cellValue, index, column, row);
                return result;
            }else{
                return cellValue;
            };
        },

        // 单元格样式--给列加高亮
        cellStyle(cell) {
            if (this.table.activeColumn) {
                let label = cell.column.label;
                if (this.table.activeColumn.includes(label)) {
                    return {"color": "#FF8C58", "cursor": "pointer"};
                }
            }
        },

        // 单元格被点击
        cellClick(row,column,cell,event) {
            if (this.table.cellClick) {
                let key = column.property;
                let cellText = row[key];
                this.table.cellClick(key, row, cellText);
            }
        },
    }
}
</script>