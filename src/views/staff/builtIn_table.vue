<style scoped lang="scss">
#builtIn_table{
    overflow: auto;
}
.commonRightCont{
    padding: 12px 22px;
}
.label{
    font-size: 14px;
}
.radioGroup{
    margin-top: 20px;
    height: 32px;
}
table{
    margin-top: 20px;
    width: 100%;
    border: 1px solid rgba(241,242,242,1);
    border-collapse: collapse;
    text-align: left;
    tr{
        height: 54px;
    }
    thead{
        tr{
            color: #343535;
            background:rgba(248,248,248,1);
        }
    }
    tbody{
        color: #676B6D;
    }
    td,th{
        border: 1px solid rgba(241,242,242,1);
        padding: 0 4px;
        font-size: 14px;
        font-weight: normal;
    }
}
.table_3{
    thead{
        tr{
            height: 30px;
        }
    }
    .total{
        background-color: #f8f8f8;
    }
}
</style>

<template>
    <div id="builtIn_table" class="commonRightCont">
        <el-row type="flex" align="middle" :gutter="20">
            <el-col :span=".5" class="label">统计机构范围</el-col>
            <el-col :span=".5">
                <el-select v-model="checkedName" ref="selectTree" size="small" popper-class="base_treeSelect" style="width:100%" >
                    <el-option  :label="checkedName" :value="checkedName" >
                        <tree :treeData="treeData"></tree>
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span=".5" class="label">时间范围</el-col>
            <el-col :span=".5">
                <el-date-picker
                    v-model="date"
                    :editable="false"
                    type="daterange"
                    size="small"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-col>
            
            <el-col :span=".5">
                <el-button type="primary" size="small" @click="search" >查询</el-button>
            </el-col>
            <el-col :span=".5">
                <el-button type="primary" size="small" @click="download" >导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="radioGroup" :gutter="20">
            <el-col :span=".5">
                <el-radio-group v-model="tableType">
                    <el-radio :label="1">增员明细表</el-radio>
                    <el-radio :label="2">减员明细表</el-radio>
                    <el-radio :label="3">增减员统计表</el-radio>
                </el-radio-group>
            </el-col>
            <el-col v-show="tableType === 3" :span=".5" class="label">统计部门层级</el-col>
            <el-col v-show="tableType === 3" :span=".5">
                <el-select v-model="layer" size="small" >
                    <el-option v-for="item in layerList" :key="item" :value="item" ></el-option>
                </el-select>
            </el-col>
        </el-row>

        <!-- 增员明细表 -->
        <table class="table_1" v-show="tableType === 1" id="table_1">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>增员单位</th>
                    <th>增员部门</th>
                    <th>增员职位</th>
                    <th>增员岗位</th>
                    <th>增员原因</th>
                    <th>变动日期</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableData_1" :key="index" >
                    <td>{{item.userName}}</td>
                    <td>{{item.businessUnitName}}</td>
                    <td>{{item.orgName}}</td>
                    <td>{{item.positionName}}</td>
                    <td>{{item.postName}}</td>
                    <td>{{item.changeReason}}</td>
                    <td>{{item.changeDate}}</td>
                </tr>
            </tbody>
        </table>

        <!-- 减员明细表 -->
        <table class="table_2" v-show="tableType === 2" id="table_2">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>减员单位</th>
                    <th>减员部门</th>
                    <th>减员职位</th>
                    <th>减员岗位</th>
                    <th>减员原因</th>
                    <th>变动日期</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableData_2" :key="index" >
                    <td>{{item.userName}}</td>
                    <td>{{item.businessUnitName}}</td>
                    <td>{{item.orgName}}</td>
                    <td>{{item.positionName}}</td>
                    <td>{{item.postName}}</td>
                    <td>{{item.changeReason}}</td>
                    <td>{{item.changeDate}}</td>
                </tr>
            </tbody>
        </table>

        <!-- 增减员统计表 -->
        <table class="table_3" v-show="tableType === 3" id="table_3" >
            <thead>
                <tr>
                    <th rowspan="2">单位</th>
                    <th rowspan="2" :colspan="maxColspan">部门</th>
                    <th rowspan="2">本期初实有人数</th>
                    <th colspan="3">本期增加</th>
                    <th colspan="4">本期减少</th>
                    <th rowspan="2">本期末实有人数</th>
                </tr>
                <tr>
                    <th>新入职</th>
                    <th>调入</th>
                    <th>小计</th>
                    <th>调出</th>
                    <th>离职</th>
                    <th>退休</th>
                    <th>小计</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,rowIndex) in tableData_3" :key="rowIndex" >
                    <td v-for="(item,index) in row" :key="index" :colspan="item.colspan ? item.colspan : 1" :rowspan="item.rowspan ? item.rowspan : 1">{{item.orgName}}</td>

                    <td>{{row[row.length - 1]['beginNum']}}</td>
                    <td>{{row[row.length - 1]['newJoinNum']}}</td>
                    <td>{{row[row.length - 1]['transferInNum']}}</td>
                    <td>{{row[row.length - 1]['newJoinNum'] + row[row.length - 1]['transferInNum']}}</td>
                    <td>{{row[row.length - 1]['transferOutNum']}}</td>
                    <td>{{row[row.length - 1]['leaveNum']}}</td>
                    <td>{{row[row.length - 1]['retiredNum']}}</td>
                    <td>{{row[row.length - 1]['transferOutNum'] + row[row.length - 1]['leaveNum'] + row[row.length - 1]['retiredNum']}}</td>
                    <td>{{row[row.length - 1]['endNum']}}</td>
                </tr>
                <tr v-if="total" class="total">
                    <td :colspan="maxColspan + 1">合计</td>
                    <td>{{total.beginNum}}</td>
                    <td>{{total.newJoinNum}}</td>
                    <td>{{total.transferInNum}}</td>
                    <td>{{total.increasedNum}}</td>
                    <td>{{total.transferOutNum}}</td>
                    <td>{{total.leaveNum}}</td>
                    <td>{{total.retiredNum}}</td>
                    <td>{{total.attritionNum}}</td>
                    <td>{{total.endNum}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import tree from '../../components/tree/tree';
import cr from '../../request/commonRequest';
import {table_api1, table_api2, table_api3, table_api4} from '../../request/api';

export default {
    name: 'builtIn_table',              /* 内置报表 */
    components: {tree},
    data() {
        return {
            checkedValue: '',           /* 机构范围 */
            date: '',                   /* 时间范围 */
            checkedName: '',
            treeData:{                                  /* tree按照树形结构封装的赋值，需要注意的是该对象下有注释的3个属性 */
                data: [],
                nodeKey: 'orgId',
                props: {
                    children: 'childList',
                    label: 'orgName'
                },
                showCheckbox: true,
                checkClick: this.selectTreeCheck,
                showDefaultIcon: true,                  /* 显示树形默认图标 */
                nodeClick: this.selectTreeNodeClick,    /* 节点被点击的方法 */
                defaultIconExpandNode: true,            /* 点击树形默认图标时才可以对子节点进行展开收起操作 */
            },

            tableType: 1,               /* 表格显示 */
            layer: 1,
            layerList: [1,2,3,4,5,6],
            tableData_1: [],
            tableData_2: [],
            tableData_3: [],
            maxColspan: 1,
            total: null
        };
    },
    created() {
        cr.getOrgP(this.getOrg);
    },
    mounted() {},
    methods: {
        // 获取机构树
        getOrg(orgList) {
            this.treeData.data = orgList;
        },

        // 节点被勾选
        selectTreeCheck(node,list) {
            console.log(list)
            let names = list.checkedNodes.map(item => item.orgName).join(',');
            this.checkedName = names;
            this.checkedValue = [...list.checkedKeys,...list.halfCheckedKeys];
        },

        // 查询
        search() {
            if (!this.checkedValue || this.checkedValue.length === 0) {
                this.$message({
                    message: '请选择机构',
                    type: 'warning'
                })
                return false;
            };
            if (!this.date) {
                this.$message({
                    message: '请选择时间范围',
                    type: 'warning'
                })
                return false;
            };
            switch (this.tableType) {
                case 1:
                    this.getTable_1();
                    break;
                
                case 2:
                    this.getTable_2();
                    break;

                case 3:
                    this.getTable_3();
                    break;
            
                default:
                    break;
            }
        },

        // 获取增员明细表
        getTable_1() {
            let send = {
                "orgIds": this.checkedValue,
                "startDate": this.date[0],
                "endDate": this.date[1],
            };
            base.log('s', '增员明细表', send);
            table_api1(send, res => {
                let d = res.data;
                base.log('r', '增员明细表', d);
                if (d.success) {
                    this.tableData_1 = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 获取减员明细表
        getTable_2() {
            let send = {
                "orgIds": this.checkedValue,
                "startDate": this.date[0],
                "endDate": this.date[1],
            };
            base.log('s', '增员明细表', send);
            table_api2(send, res => {
                let d = res.data;
                base.log('r', '增员明细表', d);
                if (d.success) {
                    this.tableData_2 = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 获取增减员明细表
        getTable_3() {
            let send = {
                "orgIds": this.checkedValue,
                "startDate": this.date[0],
                "endDate": this.date[1],
                "layer": this.layer
            };
            base.log('s', '增减员明细表', send);
            table_api4(send, res => {
                let d = res.data;
                base.log('r', '增减员明细表', d);
                if (d.success) {
                    // this.tableData_2 = d.result;
                    let r = JSON.parse(JSON.stringify(d.result));
                    this.total = r[0];
                    this.tableData_3 = this.dataFormatter(r[0].childList);
                }else{
                    base.error(d);
                }
            })
        },

        // 解析数据--------------------------
        // 增减员数据解析
        dataFormatter(list) {
            // 取所有的行
            let allRow = new Array();
            this.getAllRow(list,allRow);

            // 构建表格需要的数组
            let tableList = new Array();
            allRow.forEach(item => {
                let row = new Array();
                row.push(item);
                tableList.push(row);
            });

            // 添加父级
            for (let i = 0; i < this.layer; i++) {
                this.addParent(list,tableList);
            }
            // console.log(tableList);

            // 反转
            for (let i = 0; i < tableList.length; i++) {
                const item = tableList[i];
                item.reverse();
            }
            console.log(tableList);

            // 取最大长度
            let max = this.getMaxLength(tableList);
            this.maxColspan = max - 1;

            // 添加colspan
            this.addColspan(tableList,max);

            // 添加rowSpan
            this.addRowspan(tableList,max);

            return tableList;
        },

        // 添加rowspan
        addRowspan(list,max) {
            let orgId = null;
            let operationCell = null;
            for (let i = max - 1; i > -1; i--) {
                for (let r = 0; r < list.length; r++) {
                    const row = list[r];
                    let cell = row[i];
                    if (cell) {
                        if (cell.orgId === orgId) {
                            row.splice(i,1);
                            operationCell.rowspan ++;
                        }else{
                            orgId = cell.orgId;
                            operationCell = cell;
                            operationCell.rowspan = 1;
                        }
                    }
                }
            }
        },

        // 添加colspan
        addColspan(list, max) {
            for (let i = 0; i < list.length; i++) {
                const row = list[i];
                let item = row[row.length - 1];
                item.colspan = max - row.length + 1
            }
        },

        // 获取最大长度
        getMaxLength(list) {
            let a = [];
            list.forEach(item => {
                a.push(item.length);
            });
            let max = Math.max.apply(Math,a);
            return max;
        },

        // 添加父级
        addParent(list, table) {
            let currentRowIndex = 0,
            parentId = '';
            let rowSpan = 0;
            for (let i = 0; i < table.length; i++) {
                const row = table[i];
                let item = row[row.length - 1];
                rowSpan ++;
                let parentArry = [];
                this.getParent(list,item.orgParentId,parentArry);
                let parent = parentArry[0];
                if (parent) {
                    row.push(parent);
                }
            }
        },

        // 找父级
        getParent(tree,parentId,result) {
            tree.forEach(item => {
                if (item.orgId === parentId) {
                    result.push(item);
                }else{
                    if (item.childList) {
                        this.getParent(item.childList, parentId, result)
                    }
                }
            });
        },

        // 取最深层节点
        getAllRow(list, result) {
            list.forEach(item => {
                if (item.childList) {
                    this.getAllRow(item.childList, result);
                }else{
                    result.push(item);
                }
            });
        },
        // 解析数据--------------------------

        // 导出
        download() {
            let id = `table_${this.tableType}`;
            let dom = document.getElementById(id).cloneNode(true);
            let domStr = base.domString(dom);
            let send = {
                htmlContent: domStr
            };
            table_api3(send, res => {
                console.log(res);
                base.blobDownLoad(res);
            })
        },

        // 

    },
}
</script>