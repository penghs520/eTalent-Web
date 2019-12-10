<style scoped lang="scss">
.commonRightCont{
    padding: 12px 22px;
}
.label{
    font-size: 14px;
}
.radioGroup{
    margin-top: 20px;
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
    td{
        border: 1px solid rgba(241,242,242,1);
        padding: 0 4px;
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
        <el-row type="flex" class="radioGroup">
            <el-radio-group v-model="tableType">
                <el-radio :label="1">增员明细表</el-radio>
                <el-radio :label="2">减员明细表</el-radio>
                <el-radio :label="3">增减员统计表</el-radio>
            </el-radio-group>
        </el-row>

        <!-- 增员明细表 -->
        <table class="table_1" v-show="tableType === 1" id="table_1">
            <thead>
                <tr>
                    <td>姓名</td>
                    <td>增员单位</td>
                    <td>增员部门</td>
                    <td>增员职位</td>
                    <td>增员岗位</td>
                    <td>增员原因</td>
                    <td>变动日期</td>
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
        <table class="table_2" v-show="tableType === 2" ref="table_2">
            <thead>
                <tr>
                    <td>姓名</td>
                    <td>减员单位</td>
                    <td>减员部门</td>
                    <td>减员职位</td>
                    <td>减员岗位</td>
                    <td>减员原因</td>
                    <td>变动日期</td>
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
    </div>
</template>

<script>
import base from '../../assets/js/base';
import tree from '../../components/tree/tree';
import cr from '../../request/commonRequest';
import {table_api1, table_api2, table_api3} from '../../request/api';
import { log } from 'util';

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
                nodeKey: 'org_id',
                props: {
                    children: 'list',
                    label: 'org_name'
                },
                showCheckbox: true,
                checkClick: this.selectTreeCheck,
                showDefaultIcon: true,                  /* 显示树形默认图标 */
                nodeClick: this.selectTreeNodeClick,    /* 节点被点击的方法 */
                defaultIconExpandNode: true,            /* 点击树形默认图标时才可以对子节点进行展开收起操作 */
            },

            tableType: 1,               /* 表格显示 */
            tableData_1: [],
            tableData_2: [],
        };
    },
    created() {
        cr.getOrg(this.getOrg);
    },
    mounted() {},
    methods: {
        // 获取机构树
        getOrg(orgList) {
            this.treeData.data = orgList;
        },

        // 节点被勾选
        selectTreeCheck(node,list) {
            let names = list.checkedNodes.map(item => item.org_name).join(',');
            this.checkedName = names;
            this.checkedValue = list.checkedKeys;
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
                    // 
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

        // 导出
        download() {
            let dom = document.getElementById('table_1').cloneNode(true);
            let domStr = base.domString(dom);
            let send = {
                htmlContent: domStr
            };
            base.log('s', '导出', send);
            table_api3(send, res => {
                console.log(res);
            })
        },

        // 

    },
}
</script>