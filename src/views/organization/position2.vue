<style lang="scss" scoped>
#organization_position2 {
    display: flex;
    height: 100%;
    border: 10px solid #f0f0f0ff;
    padding: 10px 10px 0px 20px;
    box-sizing: border-box;
    text-align: left;
    overflow: auto;
    background-color: #fff;
    .positionGroupTable {
        height: 100%;
        margin-top: 18px;
    }
    .groupInput {
        display: inline-block;
        width: 100px;
    }
    //职位设置
    .position {
        display: flex;
        .side_tree {
            width: 216px;
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
        }
        .post_table {
            flex: 1;
            box-sizing: border-box;
            margin-top: 18px;
            overflow: auto;
        }
    }
    // 职级设置
    .position_level {
        margin-top: 18px;
    }
    //职等设置
    .position_grade,
    .position_radio {
        margin-top: 18px;
    }
}

//删除职位族开始
.el-icon-warning {
    color: #ffd532ff;
}
.group_list {
    margin-top: 10px;
    padding-left: 35px;
}
//删除职位族结束
.el-tabs {
    width: 100%;
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
    <div id="organization_position2">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 职位族设置 -->
            <el-tab-pane label="职位族设置" name="positionGroup">
                <div class="group_table">
                    <commonTable :table="positionGroupTable" class="positionGroupTable"></commonTable>
                </div>
                <!-- 新增职位族弹窗 -->
                <el-dialog
                    :visible.sync="positionGroupDialog"
                    class="qinjeeDialogMini"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center
                >
                    <span slot="title">新增</span>
                    <div class="qinjeeDialogSmallCont">
                        <el-form :model="GroupForm" label-width="100px">
                            <el-form-item label="职位族名称">
                                <el-input v-model="GroupForm.Groupname" size="mini"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="positionGroupDialog = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="addGroup">确 定</el-button>
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
                    <span slot="title">新增</span>
                    <div class="qinjeeDialogSmallCont">
                        <el-form :model="editGroupForm" label-width="100px">
                            <el-form-item label="职位族名称">
                                <el-input v-model="editGroupForm.GroupName" size="mini"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="editGroupDialog = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="editGroupReq">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 删除职位族弹窗 -->
                <el-dialog
                    :visible.sync="groupDelDialog"
                    class="qinjeeDialogMini"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center>
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
            </el-tab-pane>

            <!-- 职位设置 -->
            <el-tab-pane label="职位设置" name="position" class="position">
                <tree :treeData="positionTree" class="side_tree"></tree>
                <div class="post_table">
                    <commonTable :table="positionTable"></commonTable>
                    <!-- 新增职位弹窗 -->
                    <el-dialog
                        :visible.sync="positionDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center>
                        <span slot="title">新增</span>
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
                                        <div v-for="item in positionSelectList" :key="item.id">
                                            <el-option
                                                :label="item.positionGroupName"
                                                :value="item.positionGroupId"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位名称" prop="positionName">
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
                        center
                    >
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
                                        size="mini"
                                        disabled
                                    >
                                        <div v-for="item in editPositionList" :key="item.id">
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
            </el-tab-pane>

        </el-tabs>
        <!-- 排序弹窗 -->
        <el-dialog
            :visible.sync="sortDialog"
            v-if="sortDialog"
            class="qinjeeDialogMini"
            :append-to-body="true"
            :close-on-click-modal="false"
            center
        >
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
    name: "position2" /* 职位体系 */,
    data() {
        return {
            activeName: "positionGroup",

            // 职位族
            positionGroupTable: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "职位族设置" /* 必须，表格头所显示的文字 */,
                        key:
                            "positionGroupName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */
                    }
                ],
                hideHeader: true /* 非必须,是否不显示表格头 */,
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
                        type: "button",
                        text: "编辑",
                        btnType: "plain",
                        method: this.eidtPositionGroup
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
                pageHide: true /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
          
            },
            GroupCurrentPage: 1,
            GroupPageSize: 10,
            positionGroupDialog: false,
            GroupForm: {
                Groupname: ""
            },
            GroupDelList: [],
            groupDelDialog: false,
            editGroupDialog: false,
            editGroupForm: {
                GroupName: ""
            },
            editGroupList: [],

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
                        text: "编辑",
                        btnType: "plain",
                        method: this.editPosition
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
                pageChange: this.postPageChange
            },
            positionNode: "",
            postCurrentPage: 1,
            postPageSize: 10,
            //职位--新增
            positionDialog: false,
            addPositionForm: {
                positionGroupId: "",
                positionName: ""
            },
            positionSelectList: [],
            rules: {
                positionGroupId: [
                    {
                        required: true,
                        message: "请选择",
                        trigger: "blur"
                    }
                ],
                positionName: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur"
                    }
                ]
            },
            //职位--编辑
            editPositionDialog: false,
            editPositionForm: {
                positionGroupId: "",
                positionName: ""
            },
            editPositionList: [],
            //职位--删除
            delPositionList: [],
            delPositionDialog: false,

            // 排序
            sortDialog: false,
            sortTitle: "",
            sortData: [],
            sortLoading: false,

            //职位族导出
            exportGroupList: [],
            //职位导出
            exportPositionList: []
        };
    },
    components: {
        commonTable,
        tree,
        draggable
    },
    created() {
        this.getAllPositionGroup();
    },
    methods: {
        //职位导出
        exportPositionTable(searchData, radioData, checkboxData) {
            if(!this.positionNode){
                this.$message.warning("请点击左侧职位族树")
                return
            }
            let ids = this.exportPositionList.map(item => item.positionGroupId);
            let send = ids;
            base.log("s", "职位导出", send);
            position_api6(send, res => {
                console.log(res);
                base.blobDownLoad(res);
            });
        },
        //职位族导出
        exportGroupTable(searchData, radioData, checkboxData) {
            let ids = this.exportGroupList.map(item => item.positionGroupId);
            let send = this.exportGroupList.length === 0 ? [] : ids;
            base.log("s", "职位族导出", send);
            positionGroup_api7(send, res => {
                console.log(res);
                base.blobDownLoad(res);
            });
        },
        // 职位族--排序
        positionGroupSort() {
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
            let send = {
                positionGroupIds: list
            };
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
        //职位-- 编辑按钮
        editPosition() {
            if (this.editPositionList.length != 1) {
                this.$message.warning("请选择一个职位");
                return;
            }
            this.editPositionForm.positionGroupId = this.editPositionList[0].positionGroupId;
            this.editPositionForm.positionName = this.editPositionList[0].positionName;
            this.editPositionDialog = true;
        },
        //职位 -- 编辑请求接口
        editPositionReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = {
                        positionGroupId: this.editPositionForm.positionGroupId,
                        positionName: this.editPositionForm.positionName,
                        positionId: this.editPositionList[0].positionId
                    };
                    base.log("s", "编辑职位", send);
                    position_api3(send, res => {
                        base.log("r", "编辑职位", res.data);
                        if (res.data.success) {
                            this.$message.success("编辑成功");
                            this.editPositionDialog = false;
                            this.positionTableReq();
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //职位 -- 新增按钮
        addPosition() {
            this.positionDialog = true;
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
        //职位 -- 树形被点击
        positionTreeClick(node) {
            this.positionNode = node;
            this.positionTableReq();
        },
        //职位 -- 获取树形结构
        getPositionTreeReq() {
            positionGroup_api4(null, res => {
                base.log("r", "获取所有职位树", res.data);
                if (res.data.success) {
                    this.positionSelectList = res.data.result;
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

        //职位族--编辑按钮
        eidtPositionGroup() {
            console.log(this.editGroupList);

            if (this.editGroupList.length != 1) {
                this.$message.warning("请选择一个职位族");
                return;
            }
            this.editGroupDialog = true;
            this.editGroupForm.GroupName = this.editGroupList[0].positionGroupName;
        },
        //职位族--编辑请求接口
        editGroupReq() {
            if (this.editGroupForm.GroupName.trim().length === 0) {
                this.$message.warning("请输入内容");
            }
            let send = {
                positionGroupId: this.editGroupList[0].positionGroupId,
                positionGroupName: this.editGroupForm.GroupName
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
        },

        //职位族--新增,弹出弹框
        addPositionGroup() {
            this.positionGroupDialog = true;
            this.GroupForm.Groupname = "";
        },
        //职位族--新增,弹出框表单验证
        addGroup() {
            if (this.GroupForm.Groupname.length == 0) {
                this.$message.warning("请输入职位族名称");
                return;
            }
            this.positionGroupDialog = false;
            this.addGroupRequst();
        },
        //职位族--新增,请求接口
        addGroupRequst() {
            let send = {
                positionGroupName: this.GroupForm.Groupname.toString()
            };
            positionGroup_api2(send, res => {
                base.log("s", "新增职位族", send);
                base.log("r", "新增所有职位族", res.data);
                if (res.data.success) {
                    this.getAllPositionGroup();
                } else {
                    base.error(res.data);
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
                    this.positionGroupTable.loading = false;
                    this.positionGroupTable.data = res.data.result;
                } else {
                    base.error(res.data);
                }
            });
        },

        //tab栏切换
        handleClick(tab, event) {
            if (tab.name === "positionGroup") {
                this.positionGroupTable.loading = true;
                this.GroupCurrentPage = 1;
                this.getAllPositionGroup();
            } else if (tab.name === "position") {
                this.getPositionTreeReq();
            }
             
        }
    }
};
</script>