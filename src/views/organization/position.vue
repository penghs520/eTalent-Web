<style lang="scss">
#archives_import{
    .el-tabs{
        box-sizing: border-box;
        height: 100%;       
        overflow: hidden;
    }
    .el-tabs__header {      
        padding: 0 24px;
        border-bottom: 1px solid rgba(241, 242, 242, 1);
      
    }
    .el-tabs__content {
        height: calc(100% - 64px);
        overflow: auto;
        height: 100%;
        #pane-orgPic {
            height: 100%;
        }
    }
}   
</style>
<style lang="scss" scoped>
#organization_position {
    display: flex;
    height: 100%;
    overflow: hidden;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        box-sizing: border-box;
        background-color: #fff;
        .title{
            box-sizing: border-box;
            height: 64px;
            padding: 24px 24px 0px 24px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 16px;
            color: #676B6D;
            text-align: left;
        }
        .main{
            display: flex;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            .sider{
                box-sizing: border-box;
                width: 215px;
                height: 100%;
                border-right: 1px solid #f0f0f0;
                padding: 16px 16px 0px 20px;
                font-size: 16px;
            }
            .common_content{
                box-sizing: border-box;
                flex: 1;
                height: 100%;
                padding-top: 16px;
                overflow: auto;
             
            }
        }
    }
}
.el-select {
    width: 100%;
}
</style>
<template>
    <div id="organization_position">
        <div class="content">
           <div class="title">职位管理</div>
           <div class="main">
                <div class="sider">
                     <tree :treeData="positionTree" ></tree>
                </div>               
                <div class="common_content">
                    <!-- 职位族表格-->
                    <commonTable :table="positionTable" v-show ="positionNode.positionGroupId !== '' "></commonTable> 
                    <!-- 职位表格 -->
                    <commonTable :table="positionGroupTable" v-show ="positionNode.positionGroupId === '' "></commonTable> 
                    <!-- 新增职位弹窗 -->
                    <el-dialog
                        :visible.sync="positionDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center>
                        <span slot="title">新增信息</span>
                        <div class="qinjeeDialogSmallCont">                              
                            <el-form
                                :model="addPositionForm"
                                label-width="100px"
                                ref="addPositionForm"
                                :rules="rules">

                                <el-form-item v-show="addPositionForm.addRadio === 2" label="所属职位族" prop="positionGroupId">
                                    <el-select
                                        v-model="addPositionForm.positionGroupId"
                                        placeholder="请选择"
                                        size="mini"
                                    >
                                        <div v-for="item in positionGroupList" :key="item.id">
                                            <el-option
                                                :label="item.positionGroupName"
                                                :value="item.positionGroupId"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </el-form-item>

                                <el-form-item v-show="addPositionForm.addRadio === 2" label="职位名称" prop="positionName">
                                    <el-input
                                        v-model="addPositionForm.positionName"
                                        size="mini"
                                        placeholder="请输入"
                                    ></el-input>
                                </el-form-item>

                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="positionDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="addPositiionReq('addPositionForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 编辑职位弹窗 -->
                      <el-dialog
                        :visible.sync="editPositionDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center>
                        <span slot="title">编辑</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="editPositionForm"
                                label-width="100px"
                                ref="editPositionForm"
                                :rules="rules"
                            >
                                <el-form-item label="所属职位族" prop="positionGroupId">
                                    <el-select
                                        v-model="editPositionForm.positionGroupId"
                                        placeholder="请选择"
                                        size="mini">
                                        <div v-for="item in positionGroupList" :key="item.id">
                                            <el-option
                                                :label="item.positionGroupName"
                                                :value="item.positionGroupId"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位名称" prop="positionName">
                                    <el-input
                                        v-model="editPositionForm.positionName"
                                        size="mini"
                                        placeholder="请输入"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="editPositionDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="editPositionReq('editPositionForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除职位弹窗 -->
                </div>  
           </div>
        </div>
    </div>
</template>

<script>
import {
    positionGroup_api1,
    positionGroup_api2,
    positionGroup_api3,
    positionGroup_api4,
    positionGroup_api5,
    positionGroup_api6,
    positionGroup_api7,
    position_api1,
    position_api2,
    position_api3,
    position_api4,
    position_api5,
    position_api6,
} from "../../request/api";
import commonTable from "../../components/table/commonTable";
import tree from "../../components/tree/tree";
import draggable from "vuedraggable";
import base from "../../assets/js/base";

export default {
    name: "position",
    components: {
        commonTable,
        tree,
        draggable
    },
    data() {
        return {
            //职位族
            positionGroupTable: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "职位族" /* 必须，表格头所显示的文字 */,
                        key:
                            "positionGroupName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */
                    }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        btnType: "primary",
                        method: this.addPositionGroup
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType: "plain",
                        method: this.delPositionGroup
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "plain",
                        defaultIconHide: false,
                        list: [
                            {
                                text: "排序" /* 必须，按钮名称 */,
                                method: this.positionGroupSort
                            },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.exportGroupTable }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.GroupselectChange,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                loading: false,
                webPage: true,
          
            },
            //职位
            positionTree: {
                data: [],
                // nodeKey: "positionGroupId",
                props: {
                    children: "positionList",
                    label: "positionGroupName"
                },
                icons: [
                    {
                        key: "postType",
                        val: "POSTGROUP",
                        icon: "qj-danwei"
                    },
                    {
                        key: "postType",
                        val: "POST",
                        icon: "qj-nav_client"
                    }
                ],
                showCheckbox: false /* 非必须，是否显示多选框 */,
                checkClick: this
                    .checkClick /* 非必须，点击多选框事件,接收两个参数,当前选中的节点数据,树中选中的所有节点*/,
                showDefaultIcon: true /* 非必须，是否显示默认图标 */,
                showAllNode: false /* 非必须，是否展开所有的子节点*/,
                nodeClick: this.positionTreeClick
            },
            positionTable: {
                head: [
                    {
                        name: "职位族",
                        key: "positionGroupName",
                        isShow: true
                    },
                    {
                        name: "职位名称",
                        key: "positionName",
                        isShow: true
                    }
                ],
                data: [],
                total: 0,
                bar: [
                    {
                        type: "button",
                        text: "新增",
                        btnType: "primary",
                        method: this.addPosition
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delPosition
                    },
                    {
                        type: "buttons",
                        text: "更多操作",
                        btnType: "plain",
                        defaultIconHide: false,
                        list: [
                            { text: "排序", method: this.positionSort },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.exportPositionTable }
                        ]
                    }
                ],
                showSelect: true,
                selectChange: this.postSelectChange,
                loading: false,
                pageResize: false,
                loading: false,
                page: {
                    pageSizes: [10, 20, 30],
                    pageSize: 10
                },
                pageHide: false,
                pageSizeChange: this.postPageSizeChange,
                pageChange: this.postPageChange,
                activeColumn: "职位名称",             /* 非必须，给列加高亮，值是该列表格头显示的名称，多列的话要写成数组格式 */
                cellClick: this.cellClick,  
            },
            positionNode: "",
            postCurrentPage: 1,
            postPageSize: 10,
            //编辑职位
            editPositionDialog: false,
            editPositionForm: {
                positionGroupId: "",
                positionName: "",
                positionId:"",
            },
            rules: {
                positionGroupId: [
                    { required: true,message: "请选择",trigger: "blur" }
                ],
                positionName: [
                    { required: true, message: "请输入",trigger: "blur" }
                ],
                addGroupName: [
                    { required: true, message: "请输入",trigger: "blur" }
                ],
            },
            positionGroupList:[],
            //新增职位,职位族
            positionDialog: false,
            addPositionForm: {
                positionGroupId: "",
                positionName: "",
            },
        };
    },
    created(){
         this.getPositionTreeReq();
    },
    methods:{
        //职位删除

        //职位新增--单选框切换
        radioChange(val){
         if( val === 1){
                this.rules.positionGroupId[0].required = false    
                this.rules.positionName[0].required = false    
                this.rules.addGroupName[0].required = true
         }else{
              this.rules.positionGroupId[0].required = true
              this.rules.positionName[0].required = true    
              this.rules.addGroupName[0].required = false  
         }      
        },
        //职位新增--表格按钮
        addPosition(){
            this.positionDialog = true;
            this.addPositionForm.positionGroupId = this.positionNode.positionGroupId  
        },
        //职位--新增请求接口
        addPositiionReq(formName) {
            if(this.addPositionForm.addRadio === 1){
                this.$refs[formName].validate(valid => {
                 if (valid) {   
                let send = {
                    positionGroupName: this.addPositionForm.addGroupName
                };
                  positionGroup_api2(send, res => {
                    base.log("s", "新增职位族", send);
                    base.log("r", "新增所有职位族", res.data);
                    if (res.data.success) {
                        this.positionTableReq();
                        this.getPositionTreeReq();
                        this.$message.success("添加职位族成功");
                        this.positionDialog = false;
                    } else {
                        base.error(res.data);
                    }
                    });
                }
             });
            }else{                 
                this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = {
                        positionGroupId: this.addPositionForm.positionGroupId,
                        positionName: this.addPositionForm.positionName
                    };
                    base.log("s", "新增职位", send);
                    position_api2(send, res => {
                        base.log("r", "新增职位", res.data);
                        if (res.data.success) {
                            this.positionTableReq();
                            this.getPositionTreeReq();
                            this.$message.success("添加职位成功");
                            this.positionDialog = false;
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
             });
            }           
        },

        //职位编辑--请求接口
        editPositionReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = {
                        positionGroupId: this.editPositionForm.positionGroupId,
                        positionName: this.editPositionForm.positionName,
                        positionId: this.editPositionForm.positionId
                    };
                    base.log("s", "编辑职位", send);
                    position_api3(send, res => {
                        base.log("r", "编辑职位", res.data);
                        if (res.data.success) {
                            this.$message.success("编辑成功");
                            this.editPositionDialog = false;
                            this.positionTableReq();
                            this.positionTree()
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //职位编辑--单元格点击
        cellClick(key, row, value){
            console.log(row);
            if(key === "positionName" ){                       
                this.editPositionDialog = true;
                this.editPositionForm.positionGroupId = row.positionGroupId;
                this.editPositionForm.positionName = row.positionName;
                this.editPositionForm.positionId = row.positionId;
            }
        },

        //职位--表格页码改变
        postPageChange(page) {
            this.postCurrentPage = page;
            this.positionTableReq();
        },
        //职位--表格页容量改变
        postPageSizeChange(pageSize) {
            this.postCurrentPage = 1;
            this.pageResize = true;
            this.postPageSize = pageSize;
            this.positionTableReq();
        },
        //职位-- 获取表格请求
        positionTableReq() {
            let send = {
                currentPage: 0,
                pageSize: 0,
                positionGroupId: this.positionNode.positionGroupId
            };
            base.log("s", "获取职位表格", send);
            position_api1(send, res => {
                this.positionTable.pageResize = false;
                base.log("r", "获取职位表格", res.data);
                if (res.data.success) {
                    this.positionTable.data = res.data.result.list;
                    this.exportPositionList= res.data.result.list
                    this.positionTable.total = res.data.result.total;
                } else {
                    base.error(res.data);
                }
            });
        },

        //职位族--表格获取所有职位族
        getAllPositionGroup() {
            let send = {
                currentPage: 0,
                pageSize: 0
            };
            positionGroup_api1(send, res => {
                base.log("s", "获取所有职位族", send);
                base.log("r", "获取所有职位族", res.data);
                if (res.data.success) {
                    this.positionGroupTable.data = res.data.result;
                } else {
                    base.error(res.data);
                }
            });
        },

        //职位 -- 树形被点击
        positionTreeClick(node) {
            console.log(node);
            
            this.positionNode = node;
            if(node.positionGroupId == ""){
                this.getAllPositionGroup()
            }else{
                this.positionTableReq();
            }   
        },
        //职位 -- 获取树形结构
        getPositionTreeReq() {
            positionGroup_api4(null, res => {
                base.log("r", "获取所有职位树", res.data);
                if (res.data.success) {
                    this.positionGroupList = res.data.result;
                    let newTree = JSON.parse(JSON.stringify(res.data.result));
                    this.positionTreeFormatter(newTree);
                    let treeObj = [
                        {
                            positionList: newTree,
                            postType: "POSTGROUP",
                            positionGroupName: "职位族",
                            positionGroupId: ""
                        }
                    ];
                    this.positionTree.data = treeObj;
                } else {
                    base.error(res.data);
                }
            });
        },
        //职位 -- 格式化职位树形
        positionTreeFormatter(newTree) {
            newTree.forEach(item => {
                item.postType = "POSTGROUP";
                if (item.positionList) {
                    item.positionList.forEach(item => {
                        item.postType = "POST";
                        item.positionGroupName = item.positionName;
                    });
                }
            });
        },
    }

};
</script>

