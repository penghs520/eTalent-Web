<style scoped>
#powerCommon,.mian,.tree,.cont{
    height: 100%;
}
.mian{
    display: flex;
    background-color: #F0F0F0;
}
.tree{
    width: 216px;
    background-color: #fff;
}
.cont{
    width: calc(100% - 216px);
}
.cont>div{
    height: 100%;
}
.tree nav{
    padding: 13px 20px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #F1F2F2;
}
.tree .btnBar{
    padding: 16px 0 10px 0;
}
.is-focusable{
    color: orange;
}
.roleTreeIcon{
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
.roleTreeNode{
    font-size: 14px;
    color: #676B6D;
}

.tab{
    padding: 0 24px;
    border-bottom: 2px solid #F1F2F2;
}
.tabCont{
    height: calc(100% - 65px);
}
.tabCont li{
    overflow: auto;
    height: 100%;
}
.serverTree{
    /* padding: 0 24px; */
    background: linear-gradient(#fff 50%, #FAFAFA 50%);
    background-size: 100% 108px;
}
.serverIcon{
    margin-left: 6px;
    margin-right: 12px;
}

.rangeTreeHeader{
    position: relative;
    text-align: left;
    background-color: #F8F8F8;
}
.rangeTreeHeader span{
    font-size: 14px;
    line-height: 54px;
    font-weight: 600;
}
.rangeTreeHeader span:first-child{
    margin-left: 54px;
}
.rangeTreeHeader span:last-child{
    position: absolute;
    left: calc(300px + 20%);
}

.fieldSelect{
    padding: 18px 24px;
    font-size: 14px;
}
.fieldTableHeader{
    font-weight: 600;
}
</style>
<style>
    #powerCommon .serverTree .el-tree-node__content{
        height: 54px;
    }
    #powerCommon .leftTree .el-tree-node__content{
        height: 40px;
    }
    #powerCommon .serverTree .el-tree-node__expand-icon{
        margin-right: 6px;
        margin-left: 24px;
    }
    #powerCommon .el-tree-node__content{
        position: relative;
    }
    #powerCommon .rangeTree .el-checkbox{
        position: absolute;
        left: calc(300px + 20%);
    }
    #powerCommon .fieldTableHeader th{
        background-color: #FAFAFA;
    }
    #powerCommon .fieldTableRow{
        height: 54px;
    }

</style>

<template>
    <div id="powerCommon">
        <div 
            v-loading='loading' 
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)" 
            v-show="roleTreeRoleId">
            <el-tabs class="tab" v-model="tabActive" >
                <el-tab-pane v-for="(item,index) in tabs" v-if="data.showTab.includes(item.label)" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
            <ul class="tabCont">
                <!-- 功能权限 -->
                <li v-if="tabActive === 'server'">
                    <el-tree class="serverTree" key="serverTree" :data="serverData" :props="serverProps" ref="serverTree" node-key="menuId" show-checkbox @check="serverCheck" :highlight-current="true" >
                        <span slot-scope="{ node, data }">
                            <span v-show="data.funcType !== 'NODE'" class="qj-wenjianjia roleTreeIcon serverIcon"></span>
                            <span v-show="data.funcType === 'NODE'" class="qj-detail roleTreeIcon serverIcon"></span>
                            <span class="roleTreeNode">{{node.label}}</span>
                        </span>
                    </el-tree>
                </li>

                <!-- 管理范围权限 -->
                <li v-if="tabActive === 'range'">
                    <div class="rangeTreeHeader">
                        <span>机构范围</span>
                        <span>授权</span>
                    </div>
                    <el-tree class="serverTree rangeTree" key="rangeTree" :data="rangeData" :props="rangeProps" ref="rangeTree" node-key="orgId" show-checkbox @check="rangeCheck" :highlight-current="true" >
                        <span slot-scope="{ node}">
                            <span class="roleTreeNode">{{node.label}}</span>
                        </span>
                    </el-tree>
                </li>
                
                <!-- 字段权限 -->
                <li v-if="tabActive === 'field'">
                    <el-row class="fieldSelect" type="flex" align="middle" >
                        <el-col :span=".5">自定义表：</el-col>
                        <el-col :span=".5" style="margin-left: 10px;" >
                            <el-select v-model="tableChecked" size="small" @change="fieldSelectChange" placeholder="请选择自定义表">
                                <el-option
                                    v-for="item in tableList"
                                    :key="item.tableId"
                                    :label="item.tableName"
                                    :value="item.tableId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-table
                        ref="multipleTable"
                        :data="fieldTableData"
                        stripe
                        :border="false"
                        header-row-class-name="fieldTableHeader"
                        row-class-name="fieldTableRow"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column width="16"></el-table-column>
                        <el-table-column prop="fieldName" label="名称" class="fieldTableFirstLine" width="120"></el-table-column>
                        <el-table-column prop="name" label="可读" width="120">
                            <template slot-scope="scope">
                                <!-- <el-checkbox v-model="scope.row.readWriteCode"  >备选项</el-checkbox> -->
                                <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateRead" v-model="scope.row.isRead" :checked="scope.row.isRead" @change="fieldChangeAll($event,'read')" ></el-checkbox>
                                <el-checkbox v-else v-model="scope.row.isRead" :checked="scope.row.isRead" @change="fieldChangeSingle($event,'read',scope.row)" ></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="新增可写" width="120">
                            <template slot-scope="scope">
                                <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateAddWrite" v-model="scope.row.isAddWrite" @change="fieldChangeAll($event,'addWrite')" ></el-checkbox>
                                <el-checkbox v-else v-model="scope.row.isAddWrite" @change="fieldChangeSingle($event,'addWrite',scope.row) "></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="可写">
                            <template slot-scope="scope">
                                <el-checkbox v-if="scope.$index === 0" :indeterminate="scope.row.isIndeterminateWrite" v-model="scope.row.isWrite" @change="fieldChangeAll($event,'write')" ></el-checkbox>
                                <el-checkbox v-else v-model="scope.row.isWrite" @change="fieldChangeSingle($event,'write',scope.row)" ></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';

export default {
    name: 'powerCommon',             /* 角色授权组件 */
    props: {
        data: Object
    },
    data() {
        return {

            // tab标签
            tabs: [
                {label: '功能权限', name: 'server'},
                {label: '管理范围权限', name: 'range'},
                {label: '字段权限', name: 'field'},
            ],
            currentTab: '功能权限',             /* 当前tab的名称 */
            tabActive: '',
            

            // 自定义字段表
            tableChecked: '',
        };
    },
    computed: {
        roleTreeRoleId() {
            return this.data.roleTreeRoleId;
        },
        loading() {
            return this.data.loading;
        },

        serverData() {
            // 添加禁止勾选
            if (this.data.disabled) {
                this.addTreeDisabled(this.data.serverData,this.serverProps['children']);
            }
            return this.data.serverData;
        },
        serverProps() {
            return this.data.serverProps;
        },

        rangeData() {
            if (this.data.disabled) {
                this.addTreeDisabled(this.data.rangeData,this.rangeProps['children']);
            }
            return this.data.rangeData;
        },
        rangeProps() {
            return this.data.rangeProps;
        },

        tableList() {
            return this.data.tableList;
        },
        fieldTableData() {
            let list = this.addFieldKeys(this.data.fieldTableData);
            return this.addCheckAllRow(list);
        },
    },
    mounted() {
        this.tabActive = this.tabActiveM();
    },
    methods: {

        tabActiveM() {
            if (this.data.tabActive) {
                let result = '';
                let a = this.tabs.filter(item => {
                    return item.label === this.data.tabActive;
                })
                this.currentTab = this.data.tabActive;
                return a[0].name;
            }else{
                return 'server';
            }
        },

        // 根据角色id查询角色功能权限树
        getServer(id) {
            let send = {"roleId": id};
            base.log('s', '角色功能权限树', send);
            this.contLoading = true;
            role_api8(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '角色功能权限树', d);
                if (d.success) {
                    // 赋值
                    this.serverData = d.result;
                    // 设置选中状态
                    let checkedNodeList = this.getHasMenu(d.result, 'funcType', 'NODE', 'childMenuList', 'hasMenu');
                    console.log(checkedNodeList)
                    this.$refs.serverTree.setCheckedKeys(checkedNodeList.map(item => {return item.menuId}));
                }else{
                    base.error(d);
                }
            })
        },

        // 获取已有权限的节点
        getHasMenu(list, nodeTypeKey, nodeTypeVal, childKey, hasKey) {
            let nodeList = new Array();
            this.getNode(list, nodeList, nodeTypeKey, nodeTypeVal, childKey);
            let result = nodeList.filter(item => {
                return item[hasKey];
            });
            return result;
        },

        // 获取权限node节点
        getNode(list,resultList, nodeTypeKey, nodeTypeVal, childKey) {
            list.forEach(item => {
                if (item[nodeTypeKey] === nodeTypeVal) {
                    resultList.push(item);
                }else{
                    this.getNode(item[childKey],resultList);
                }
            });
        },

        // 功能权限树选中值改变
        serverCheck() {
            let list = this.$refs.serverTree.getCheckedNodes(false,true);
            if (this.data.serverCheck) {
                this.data.serverCheck(list);
            }
        },

        // 根据角色id查询管理范围权限树
        getRange(id) {
            let send = {"roleId": id};
            base.log('s', '角色管理范围权限树', send);
            this.contLoading = true;
            role_api10(send, res => {
                this.contLoading = false;
                let d = res.data;
                base.log('r', '角色管理范围权限树', d);
                if (d.success) {
                    // 赋值
                    this.rangeData = d.result;
                    // 设置选中状态
                    let checkedNodeList = this.getHasMenu(d.result, 'orgType', 'DETP', 'childOrganizationList', 'hasOrg');
                    this.$refs.rangeTree.setCheckedKeys(checkedNodeList.map(item => {return item.orgId}));
                }else{
                    base.error(d);
                }
            })
        },

        // 管理范围权限树选中值改变
        rangeCheck() {
            let list = this.$refs.rangeTree.getCheckedNodes(false,true);
            if (this.data.rangeCheck) {
                this.data.rangeCheck(list);
            }
        },

        // select change
        fieldSelectChange(v) {
            if (this.data.fieldSelectChange) {
                this.data.fieldSelectChange(v);
            }
        },

        // 数据处理，添加权限字段
        addFieldKeys(list) {
            let result = list.map(item => {
                item.isRead = false;
                item.isAddWrite = false;
                item.isWrite = false;
                switch (item.readWriteCode) {
                    case 'READ':
                        item.isRead = true;
                        break;

                    case 'ADDWRITE':
                        item.isRead = true;
                        item.isAddWrite = true;
                        break;
                        
                    case 'WRITE':
                        item.isRead = true;
                        item.isAddWrite = true;
                        item.isWrite = true;
                        break;
                
                    default:
                        break;
                }
                return item;
            });
            return result;
        },

        // 添加全选行
        addCheckAllRow(list) {
            // this.tableList
            // tableChecked
            let select = this.tableList.filter(item => {
                return item.tableId === this.tableChecked;
            });

            // 获取全选状态值
            let status = this.checkAllStatusVal(list);
            let row = {
                fieldName               : select[0]['tableName'],
                isRead                  : status.read[0],
                isAddWrite              : status.addWrite[0],
                isWrite                 : status.write[0],
                isIndeterminateRead     : status.read[1],
                isIndeterminateAddWrite : status.addWrite[1],
                isIndeterminateWrite    : status.write[1],
            };
            list.unshift(row);
            return list;
        },

        // 获取全选状态值
        checkAllStatusVal(list) {
            let read        = list.map(item => {return item.isRead});
            let addWrite    = list.map(item => {return item.isAddWrite});
            let write       = list.map(item => {return item.isWrite});
            // includes(true)
            let result = {
                read    : this.checkAllStatus(read),
                addWrite: this.checkAllStatus(addWrite),
                write   : this.checkAllStatus(write),
            };
            return result;
        },

        // 判断全选状态
        checkAllStatus(list) {
            let result = [false,false];
            if (!list.includes(true)) {
                result = [false,false];
            }else if (!list.includes(false)) {
                result = [true,false];
            }else{
                result = [false,true];
            };
            return result;
        },

        // 权限改变处理方法
        /**
         * @param {Boolean} 当前字段的权限： true/false
         * @param {String}  权限类型：read/addWrite/write
         * @param {Object}  当前行数据
         */
        fieldChange(v,type,row) {
            switch (type) {
                case 'read':
                    // 可读
                    if (v) {
                        row.isRead = true;
                    }else{
                        row.isRead = false;
                        row.isWrite = false;
                        row.isAddWrite = false;
                    }
                    break;
                
                case 'addWrite':
                    // 新增可写
                    if (v) {
                        row.isRead = true;
                        row.isAddWrite = true;
                    }else{
                        row.isAddWrite = false;
                        row.isWrite = false;
                    }
                    break;
                
                case 'write':
                    // 可写
                    if (v) {
                        row.isRead = true;
                        row.isAddWrite = true;
                        row.isWrite = true;
                    }else{
                        row.isWrite = false;
                    }
                    break;
            
                default:
                    break;
            };
            // 判断全选状态
            let list = this.fieldTableData.slice(1);
            let status = this.checkAllStatusVal(list);
            this.fieldTableData[0].isRead                  = status.read[0];
            this.fieldTableData[0].isAddWrite              = status.addWrite[0];
            this.fieldTableData[0].isWrite                 = status.write[0];
            this.fieldTableData[0].isIndeterminateRead     = status.read[1];
            this.fieldTableData[0].isIndeterminateAddWrite = status.addWrite[1];
            this.fieldTableData[0].isIndeterminateWrite    = status.write[1];
        },

        // 单个权限改变
        fieldChangeSingle(v,type,row) {
            this.fieldChange(v,type,row);
            this.fieldSubmit();
        },

        // 全选改变
        fieldChangeAll(v,type) {
            this.fieldTableData.map(item => {
                this.fieldChange(v,type,item);
            });
            this.fieldSubmit();
        },

        // 处理数据，获取可提交数据
        getSubmitData(data) {
            let result = {
                "roleId": this.roleTreeRoleId,
                "fieldId": data.fieldId,
                "readWriteCode": data.isWrite ? 'WRITE' : data.isAddWrite ? 'ADDWRITE' : data.isRead ? 'READ' : ''
            };
            return result;
        },

        // 权限提交
        fieldSubmit() {
            let send = this.fieldTableData.map(item => {
                return this.getSubmitData(item);
            });
            send.shift();
            if (this.data.fieldSubmit) {
                this.data.fieldSubmit(send);
            }
        },

        // 给树形结构添加禁止勾选
        addTreeDisabled(list,key) {
            if (!list) {
                return false;
            };
            list.forEach(item => {
                if (item[key]) {
                    item.disabled = true;
                    this.addTreeDisabled(item[key],key);
                }else{
                    item.disabled = true;
                }
            });
        },
    }
}
</script>