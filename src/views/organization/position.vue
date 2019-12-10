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
.el-icon-warning {
    color: #ffd532ff;
}
.group_list {
    margin-top: 10px;
    padding-left: 35px;
}
.el-select {
    width: 100%;
}
.sortComponent {
    width: 100%;
}
.sortList {
    margin: 8px 0;
    cursor: pointer;
    width: 100%;
    font-size: 14px;
    line-height: 24px;
}
.sortList:hover {
    background-color: #ffefe8ff;
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
                 <commonTable :table="positionTable" v-show ="positionNode.positionGroupId !== '' && positionNode !== ''"></commonTable>
                    <!-- 新增职位族弹窗 -->
                     <el-dialog
                         :visible.sync="positionGroupDialog"
                         class="qinjeeDialogMini"
                         :append-to-body="true"
                         :close-on-click-modal="false"
                         center>
                       <span slot="title">新增职位族</span>
                       <div class="qinjeeDialogSmallCont">
                           <el-form :model="groupForm" label-width="100px" ref="groupForm" :rules="rules">
                             <el-form-item label="职位族名称"  prop="groupname">
                                <el-input v-model.trim="groupForm.groupname" size="mini"></el-input>
                             </el-form-item>
                           </el-form>
                       </div>
                       <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="positionGroupDialog = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="addGroupRequst('groupForm')">确 定</el-button>
                       </span>
                     </el-dialog>
                    <!-- 编辑职位族弹窗 -->
                     <el-dialog
                       :visible.sync="editGroupDialog"
                       class="qinjeeDialogMini"
                       :append-to-body="true"
                       :close-on-click-modal="false"
                       center
                        >
                       <span slot="title">编辑职位族</span>
                       <div class="qinjeeDialogSmallCont">
                        <el-form :model="editGroupForm" label-width="100px" ref="editGroupForm" :rules="rules">
                            <el-form-item label="职位族名称"  prop="groupname">
                                <el-input v-model.trim="editGroupForm.groupname" size="mini"></el-input>
                            </el-form-item>
                        </el-form>
                       </div>
                       <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="editGroupDialog = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="editGroupReq('editGroupForm')">确 定</el-button>
                       </span>
                     </el-dialog>
                    <!-- 删除职位族弹窗 -->
                     <el-dialog
                       :visible.sync="groupDelDialog"
                       class="qinjeeDialogMini"
                       :append-to-body="true"
                       :close-on-click-modal="false"
                       center
                        >
                       <span slot="title">确认删除</span>
                       <div class="qinjeeDialogMiniCont">
                        <div>
                            <div>
                                <i class="el-icon-warning warning icon"></i>
                                <span>是否确认删除以下职位族?</span>
                            </div>
                            <div class="group_list">
                                <div
                                    v-for="(item,index) in GroupDelList"
                                    :key="index"
                                >{{item.positionGroupName}}</div>
                            </div>
                        </div>
                       </div>
                       <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="groupDelDialog = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="delGroupRequst">确 定</el-button>
                       </span>
                     </el-dialog> 
                <!-- 职位表格 -->
                 <commonTable :table="positionGroupTable" v-show ="positionNode.positionGroupId === '' ||  positionNode === ''"></commonTable> 
                    <!-- 新增职位弹窗 -->
                    <el-dialog
                        :visible.sync="positionDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center>
                        <span slot="title">新增职位</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="addPositionForm"
                                label-width="100px"
                                ref="addPositionForm"
                                :rules="rules"
                            >
                                <el-form-item label="所属职位族" prop="positionGroupId">
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
                                <el-form-item label="职位名称" prop="positionName">
                                    <el-input
                                        v-model.trim="addPositionForm.positionName"
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
                        <span slot="title">编辑职位</span>
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
                                        v-model.trim="editPositionForm.positionName"
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
                    <el-dialog
                        :visible.sync="delPositionDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center>
                        <span slot="title">确认删除</span>
                        <div class="qinjeeDialogMiniCont">
                            <div>
                                <div>
                                    <i class="el-icon-warning warning icon"></i>
                                    <span>是否确认删除以下职位?</span>
                                </div>
                                <div class="group_list">
                                    <div
                                        v-for="(item,index) in delPositionList"
                                        :key="index"
                                    >{{item.positionName}}</div>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="delPositionDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="delPositionReq">确 定</el-button>
                        </span>
                    </el-dialog>
                 </div>  
                  <!-- 排序弹窗 -->
                  <el-dialog
                     :visible.sync="sortDialog"
                     v-if="sortDialog"
                     class="qinjeeDialogMini"
                     :append-to-body="true"
                     :close-on-click-modal="false"
                     center>
                     <span slot="title">{{sortTitle}}</span>
                     <div class="qinjeeDialogMiniCont">
                         <draggable
                             class="sortComponent"
                             v-model="sortData"
                             group="people"
                             @start="drag=true"
                             @end="drag=false"
                         >
                             <div
                                 class="sortList"
                                 v-for="element in sortData"
                                 :key="element.id"
                             >{{element.name}}</div>
                         </draggable>
                     </div>
                     <span slot="footer" class="dialog-footer">
                         <el-button size="small" @click="sortDialog = false">取 消</el-button>
                         <el-button
                             size="small"
                             type="primary"
                             @click="sortSure"
                             :disabled="sortData.length === 0"
                             :loading="sortLoading"
                         >确 定</el-button>
                     </span>
                </el-dialog>
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
                    {
                        name: "职位族" ,
                        key:
                            "positionGroupName" ,
                        isShow: true 
                    }
                ],
                data: [] ,
                total: 0 ,
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
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "排序" /* 必须，按钮名称 */,
                        btnType: "plain",
                        method: this.positionGroupSort
                    },
                ],
                showSelect: true ,
                selectChange: this.GroupselectChange,
                loading: false ,
                webPage: true,
                activeColumn: "职位族",            
                cellClick: this.groupCellClick,
                // pageHide:true,  
          
            },
            positionGroupDialog: false,
            groupForm: {
                groupname: ""
            },
            GroupDelList: [],
            groupDelDialog: false,
            editGroupDialog: false,
            editGroupForm: {
                groupname: "",
                positionGroupId:"",
            },
            editGroupList: [],
            //职位表格
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
                checkClick: this.checkClick ,
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
                        type: "button",
                        text: "排序",
                        btnType: "plain",
                        method: this.positionSort
                    },
                ],
                showSelect: true,
                selectChange: this.postSelectChange,
                loading: false,
                pageResize: false,
                loading: false,
                // pageHide: true,
                webPage:true,
                activeColumn: "职位名称",             /* 非必须，给列加高亮，值是该列表格头显示的名称，多列的话要写成数组格式 */
                cellClick: this.cellClick,  
            },
            positionNode: "",
            //编辑职位
            editPositionDialog: false,
            editPositionForm: {
                positionGroupId: "",
                positionName: "",
                positionId:"",
            },
            rules: {
                groupname: [
                    { required: true, message: "请输入",trigger: "blur" }
                ],
                positionGroupId: [
                    { required: true,message: "请选择",trigger: "blur" }
                ],
                positionName: [
                    { required: true, message: "请输入",trigger: "blur" }
                ],
            },
            positionGroupList:[],
            //新增职位
            positionDialog: false,
            addPositionForm: {
                positionGroupId: "",
                positionName: ""
            },
            positionSelectList: [],
            //删除职位
            delPositionList: [],
            delPositionDialog: false,
            // 排序
            sortDialog: false,
            sortTitle: "",
            sortData: [],
            sortLoading: false,
        };
    },
    created(){
         this.getPositionTreeReq();
    },
    methods:{
        //职位删除--请求接口
        delPositionReq() {
            let delList = this.delPositionList.map(item => item.positionId);
            console.log(delList);

            let send = delList;
            base.log("s", "删除职位", send);
            position_api4(send, res => {
                base.log("r", "删除职位", res.data);
                if (res.data.success) {
                    this.$message.success("删除成功");
                    this.delPositionDialog = false;
                    this.positionTableReq();
                    this.getPositionTreeReq();
                } else {
                    base.error(res.data);
                }
            });
        },
        //职位删除 -- 删除按钮
        delPosition() {
            if (this.delPositionList.length === 0) {
                this.$message.warning("请选择职位");
                return;
            }
            this.delPositionDialog = true;
        },
        //职位删除-- 多选节点点击
        postSelectChange(node) {
            this.delPositionList = node;
            this.editPositionList = node;
            this.exportPositionList = node;
            console.log(node);
        },

        //职位 -- 新增按钮
        addPosition() {
            this.positionDialog = true;
            this.addPositionForm.positionGroupId = this.positionNode.positionGroupId
            setTimeout(() => {
                   this.$refs.addPositionForm.clearValidate()
            }, 0);
             
        },
        //职位--新增请求接口
        addPositiionReq(formName) {
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
                            this.$message.success("添加成功");
                            this.positionDialog = false;
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
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
            setTimeout(() => {
                   this.$refs.editPositionForm.clearValidate()
            }, 0);
            if(key === "positionName" ){                       
                this.editPositionDialog = true;
                this.editPositionForm.positionGroupId = row.positionGroupId;
                this.editPositionForm.positionName = row.positionName;
                this.editPositionForm.positionId = row.positionId;
            }
        },
        //职位-- 获取表格请求
        positionTableReq() {
            let send = {
                positionGroupId: this.positionNode.positionGroupId
            };
            base.log("s", "获取职位表格", send);
            position_api1(send, res => {
                base.log("r", "获取职位表格", res.data);
                if (res.data.success) {
                    this.positionTable.data = res.data.result.list;
                    this.positionTable.total = res.data.result.list.length;
                    this.exportPositionList= res.data.result.list
                } else {
                    base.error(res.data);
                }
            });
        },


        //职位族--编辑按钮
        groupCellClick(key,row) {
              setTimeout(() => {
                   this.$refs.editGroupForm.clearValidate()
            }, 0);
            if(key === "positionGroupName"){
                this.editGroupDialog = true;
                this.editGroupForm.groupname = row.positionGroupName;
                this.editGroupForm.positionGroupId = row.positionGroupId;
            }
            
        },
        //职位族--编辑请求接口
        editGroupReq(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let send = {
                positionGroupId: this.editGroupForm.positionGroupId,
                positionGroupName: this.editGroupForm.groupname
            };
            base.log("s", "编辑职位族", send);
            positionGroup_api5(send, res => {
                base.log("r", "编辑职位族", res.data);
                if (res.data.success) {
                    this.$message.success("编辑成功");
                    this.editGroupDialog = false;
                    this.getAllPositionGroup();
                } else {
                    base.error(res.data);
                }
            });
          } else {
            return false;
          }
        });
      
        },
         //职位族--新增,弹出弹框
        addPositionGroup() {
            this.positionGroupDialog = true;
             setTimeout(() => {
                   this.$refs.groupForm.clearValidate()
            }, 0);
            this.groupForm.groupname = "";
        },
        //职位族--新增,请求接口
        addGroupRequst(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               let send = {
                positionGroupName: this.groupForm.groupname.toString()
            };
            positionGroup_api2(send, res => {
                base.log("s", "新增职位族", send);
                base.log("r", "新增所有职位族", res.data);
                if (res.data.success) {
                    this.getAllPositionGroup();
                     this.positionGroupDialog = false;
                } else {
                    base.error(res.data);
                }
            });
          } else {
           
            return false;
          }
        });
        
        },
        //职位族--删除,多选框选择
        GroupselectChange(node) {
            this.GroupDelList = node;
            this.editGroupList = node;
            this.exportGroupList = node;
            console.log(node);
        },
        //职位族--删除,点击删除按钮
        delPositionGroup() {
            if (this.GroupDelList.length == 0) {
                this.$message.warning("请选择职位族");
                return;
            }
            this.groupDelDialog = true;
        },
        //职位族--删除,请求接口
        delGroupRequst() {
            this.GroupDelList = this.GroupDelList.map(
                item => item.positionGroupId
            );
            let send = this.GroupDelList;
            positionGroup_api3(send, res => {
                base.log("s", "删除职位族", send);
                base.log("r", "删除职位族", res.data);
                if (res.data.success) {
                    this.$message.success("删除成功");
                    this.groupDelDialog = false;
                    this.getAllPositionGroup();
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
                    this.positionGroupTable.total = res.data.result.length;
                } else {
                    base.error(res.data);
                }
            });
        },

         // 职位族--排序
        positionGroupSort() {
            if(this.positionGroupTable.data.length < 2){
                this.$message.warning("职位族数量少于2,不可排序")
                return
            }
            this.sortTitle = "职位族排序";
            let data = JSON.parse(JSON.stringify(this.positionGroupTable.data));
            this.sortData = data.map(item => {
                return {
                    id: item.positionGroupId,
                    name: item.positionGroupName
                };
            });
            this.sortDialog = true;
        },
        // 职位--排序
        positionSort() {
            if(this.positionTable.data.length < 2){
                this.$message.warning("职位数量少于2,不可排序")
                return
            }
            this.sortTitle = "职位排序";
            let data = JSON.parse(JSON.stringify(this.positionTable.data));
            this.sortData = data.map(item => {
                return { id: item.positionId, name: item.positionName };
            });
            this.sortDialog = true;
        },
        // 排序--确定
        sortSure() {
            this.sortLoading = true;
            let list = this.sortData.map(item => item.id);
            switch (this.sortTitle) {
                case "职位族排序":
                    this.positionGroupSortSubmit(list);
                    break;

                case "职位排序":
                    this.positionSortSubmit(list);
                    break;

                default:
                    break;
            }
        },
        // 职位族排序提交
        positionGroupSortSubmit(list) {
            let send = {
                positionGroupIds: list
            };
            base.log("s", "职位族排序", send);
            positionGroup_api6(send, res => {
                this.sortLoading = false;
                let d = res.data;
                base.log("r", "职位族排序", d);
                if (d.success) {
                    this.sortDialog = false;
                    base.success(d);
                    this.positionGroupTable.loading = true;
                    this.getAllPositionGroup();
                } else {
                    base.error(d);
                }
            });
        },
        // 职位排序提交
        positionSortSubmit(list) {
            let send = list
            base.log("s", "职位排序", send);
            position_api5(send, res => {
                this.sortLoading = false;
                let d = res.data;
                base.log("r", "职位排序", d);
                if (d.success) {
                    this.sortDialog = false;
                    base.success(d);
                    this.positionTableReq();
                } else {
                    base.error(d);
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

