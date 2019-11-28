<style lang="scss" scoped>
#organization_position {
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
</style>

<template>
    <div id="organization_position">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="职位体系" name="systematic">
                <el-radio-group v-model="positionRadio" class="position_radio">
                    <el-radio :label="1">按职级</el-radio>
                    <el-radio :label="2">按职位</el-radio>
                </el-radio-group>
            </el-tab-pane>

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
                        center
                    >
                        <span slot="title">新增</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form :model="addPositionForm" label-width="100px">
                                <el-form-item label="所属职位族">
                                    <el-input v-model="addPositionForm.groupName" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="职位名称">
                                    <el-input v-model="addPositionForm.positionName" size="mini"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="positionDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="addPositiionReq">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>

            <!-- 职级设置 -->
            <el-tab-pane label="职级设置" name="position_level" class="position_level">
                <commonTable :table="positionLevelTable" class="position_level"></commonTable>
            </el-tab-pane>

            <!-- 职等设置 -->
            <el-tab-pane label="职等设置" name="position_grade" class="position_grade">
                <commonTable :table="positionGradeTable"></commonTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
    positionGroup_api1,
    positionGroup_api2,
    positionGroup_api3,
    positionGroup_api4,
    positionLevel_api1,
    positionGrade_api1,
    position_api1
} from "../../request/api";
import commonTable from "../../components/table/commonTable";
import tree from "../../components/tree/tree";
import base from "../../assets/js/base";

export default {
    name: "position" /* 职位体系 */,
    data() {
        return {
            activeName: "position",
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
                        btnType:
                            "primary" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .addPositionGroup /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType:
                            "plain" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .delPositionGroup /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "plain",
                        defaultIconHide: false /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */,
                        list: [
                            /* 必须，更多按钮的数据组成的数组 */
                            {
                                text: "排序" /* 必须，按钮名称 */,
                                method: this.btn1
                            },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn3 }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.GroupselectChange,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                loading: false,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this.GroupPageSizeChange,
                pageChange: this.GroupPageChange
            },
            GroupCurrentPage: 1,
            GroupPageSize: 10,
            positionGroupDialog: false,
            GroupForm: {
                Groupname: ""
            },
            GroupDelList: [],
            groupDelDialog: false,

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
                            { text: "排序", method: this.btn1 },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn3 }
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
            positionDialog: false,
            addPositionForm:{
                groupName:"",
                positionName:"",
            },

            // 职级
            positionLevelTable: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "职级名称" /* 必须，表格头所显示的文字 */,
                        key:
                            "userName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */,
                        width: "200px" /* 非必须，该列的默认宽度 */
                    },
                    { name: "职级说明", key: "employeeNumber", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        btnType:
                            "primary" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .addPositionLevel /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType:
                            "plain" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .delPositionLevel /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "primary",
                        defaultIconHide: false /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */,
                        list: [
                            /* 必须，更多按钮的数据组成的数组 */
                            {
                                text: "排序" /* 必须，按钮名称 */,
                                method: this.btn1
                            },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn3 }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this
                    .levelSelectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageResize: false,
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this
                    .levelPageSizeChange /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */,
                pageChange: this
                    .levelPageChange /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            //职等
            positionGradeTable: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "职等名称" /* 必须，表格头所显示的文字 */,
                        key:
                            "userName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */,
                        width: "200px" /* 非必须，该列的默认宽度 */
                    },
                    { name: "职等说明", key: "employeeNumber", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        btnType:
                            "primary" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .addPositionGrade /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType:
                            "plain" /* 非必须，element-ui提供的按钮样式，新增 plain */,
                        method: this
                            .delPositionGrade /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "primary",
                        defaultIconHide: false /* 非必须，默认图标是否不显示，默认显示，true-不显示，false-显示 */,
                        list: [
                            /* 必须，更多按钮的数据组成的数组 */
                            {
                                text: "排序" /* 必须，按钮名称 */,
                                method: this.btn1
                            },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn3 }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this
                    .GradeSelectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageResize: false,
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this
                    .GradePageSizeChange /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */,
                pageChange: this
                    .GradePageChange /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            //职位体系
            positionRadio: ""
        };
    },
    components: {
        commonTable,
        tree
    },
    mounted() {},
    methods: {
        //职等--获取职等列表
        getPositionGradeReq() {
            let send = {
                currentPage: 1,
                pageSize: 10
            };
            positionGrade_api1(send, res => {
                base.log("s", "获取职等数据", send);
                base.log("r", "获取职等数据", res);
                if (res.data.success) {
                } else {
                }
            });
        },
        //职等--多选框被点击
        GradeSelectChange() {},
        //职等--表格页容量改变
        GradePageSizeChange() {},
        //职等--表格页码改变
        GradePageChange() {},

        //职级--获取职级列表
        getPositionLevelReq() {
            let send = {
                currentPage: 1,
                pageSize: 10
            };
            positionLevel_api1(send, res => {
                base.log("s", "获取职级列表", send);
                base.log("r", "获取职级列表", res.data);
                if (res.data.success) {
                    this.positionLevelTable.data = res.data.list;
                } else {
                    base.error(res.data);
                }
            });
        },

        //职位 -- 新增按钮
        addPosition() {
            this.positionDialog = true;
        },
        //职位--新增请求接口
        addPositiionReq() {
            this.positionDialog = false;
        },
        //职位 -- 删除按钮
        delPosition() {
            console.log("点击职位删除");
        },
        //职位-- 获取表格请求
        positionTableReq() {
            let send = {
                currentPage: this.postCurrentPage,
                pageSize: this.postPageSize,
                positionGroupId: this.positionNode.positionGroupId
            };
            base.log("s", "获取职位表格", send);
            position_api1(send, res => {
                base.log("r", "获取职位表格", res.data);
                if (res.data.success) {
                    this.positionTable.data = res.data.result.list;
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
                    console.log(treeObj);
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

        //职位族--新增,弹出弹框
        addPositionGroup() {
            this.positionGroupDialog = true;
            this.GroupForm.Groupname = "";
        },
        //职位族--新增,弹出框表单验证
        addGroup() {
            if (this.GroupForm.Groupname.length == 0) {
                this.$message.error("请输入职位族名称");
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
        GroupselectChange(data) {
            this.GroupDelList = data;
            console.log(data);
        },
        //职位族--删除,点击删除按钮
        delPositionGroup() {
            this.groupDelDialog = true;
        },
        //职位族--删除,请求接口
        delGroupRequst() {
            // let send = {
            //     positionGroupIds: this.GroupDelList
            // };
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
                currentPage: this.GroupCurrentPage,
                pageSize: this.GroupPageSize
            };
            positionGroup_api1(send, res => {
                base.log("s", "获取所有职位族", send);
                base.log("r", "获取所有职位族", res.data);
                if (res.data.success) {
                    this.positionGroupTable.loading = false;
                    this.positionGroupTable.pageResize = false;
                    this.positionGroupTable.data = res.data.result;
                    // this.positionGroupTable.total = res.data.result
                } else {
                    base.error(res.data);
                }
            });
        },
        //职位族--表格页码改变
        GroupPageChange(page) {
            this.positionGroupTable.loading = true;
            this.GroupCurrentPage = page;
            this.getAllPositionGroup();
        },
        //职位族--表格页容量改变
        GroupPageSizeChange(pageSize) {
            this.positionGroupTable.pageResize = true;
            this.positionGroupTable.loading = true;
            this.GroupCurrentPage = 1;
            this.GroupPageSize = pageSize;
            this.getAllPositionGroup();
        },

        //tab栏切换
        handleClick(tab, event) {
            if (tab.name === "positionGroup") {
                this.positionGroupTable.loading = true;
                this.positionGroupTable.pageResize = true;
                this.getAllPositionGroup();
            } else if (tab.name === "position") {
                this.getPositionTreeReq();
            } else if (tab.name === "position_level") {
                this.getPositionLevelReq();
            } else if (tab.name === "position_grade") {
                this.getPositionGradeReq();
            }
        }
    }
};
</script>