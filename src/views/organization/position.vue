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
    .side_tree {
        width: 216px;
        border: 1px soild red;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
    }
}
</style>

<template>
    <div id="organization_position">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="职位体系" name="systematic">职位体系</el-tab-pane>

            <!-- 职位族设置 -->
            <el-tab-pane label="职位族设置" name="positionGroup">
                <div class="group_table">
                    <commonTable :table="positionGroupTable" class="positionGroupTable"></commonTable>
                </div>

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
            </el-tab-pane>

            <!-- 职位设置 -->
            <el-tab-pane label="职位设置" name="position">
                <div class="side_tree">
                    <tree :treeData="positionTree"></tree>
                </div>
            </el-tab-pane>

            <!-- 职级设置 -->
            <el-tab-pane label="职级设置" name="position_level">
                <commonTable :table="positionLevelTable" class="position_level"></commonTable>
            </el-tab-pane>

            <!-- 职等设置 -->
            <el-tab-pane label="职等设置" name="position_grade">职等设置</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
    positionGroup_api1,
    positionGroup_api2,
    positionGroup_api3,
    positionGroup_api4,
    positionLevel_api1
} from "../../request/api";
import commonTable from "../../components/table/commonTable";
import tree from "../../components/tree/tree";
import base from "../../assets/js/base";

export default {
    name: "position" /* 职位体系 */,
    data() {
        return {
            activeName: "systematic",
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
            //职位
            positionTree: {
                data: [] /* 必须，树形结构数据 */,
                nodeKey: "positionGroupId",
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "positionList" /* 必须，子集key */,
                    label:
                        "positionGroupName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key: "",
                        val: "" /* 必须，key对应的值 */,
                        icon: "" /* 必须，图标类名 */
                    }
                ],
                showCheckbox: false /* 非必须，是否显示多选框 */,
                checkClick: this
                    .checkClick /* 非必须，点击多选框事件,接收两个参数,当前选中的节点数据,树中选中的所有节点*/,
                showDefaultIcon: false /* 非必须，是否显示默认图标 */,
                showAllNode: false /* 非必须，是否展开所有的子节点*/,
                nodeClick: this
                    .nodeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
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
            positionGradeTable: {}
        };
    },
    components: {
        commonTable,
        tree
    },
    mounted() {},
    methods: {
        //职等设置
        getPositionGrade() {
            console.log("职等设置");
        },

        
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
        //职位 -- 获取树形结构
        getPositionTreeReq() {
            positionGroup_api4(null, res => {
                base.log("r", "获取所有职位树", res.data);
                if (res.data.success) {
                    this.positionTree.data = res.data.result;
                } else {
                    base.error(res.data);
                }
            });
        },


        //职位族--新增
        addPositionGroup() {
            this.positionGroupDialog = true;
            this.GroupForm.Groupname = "";
        },
        addGroup() {
            if (this.GroupForm.Groupname.length == 0) {
                this.$message.error("请输入职位族名称");
                return;
            }
            this.positionGroupDialog = false;
            this.addGroupRequst();
        },
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
        //职位族--删除
        GroupselectChange(data) {
            this.GroupDelList = data;
            console.log(data);
        },
        delPositionGroup() {
            this.GroupDelList = this.GroupDelList.map(
                item => item.positionGroupId
            );
            this.delGroupRequst();
            console.log(this.GroupDelList);
        },
        delGroupRequst() {
            let send = {
                positionGroupIds: this.GroupDelList
            };
            positionGroup_api3(send, res => {
                base.log("s", "删除职位族", send);
                base.log("r", "删除职位族", res.data);
                if (res.data.success) {
                    this.getAllPositionGroup();
                } else {
                    base.error(res.data);
                }
            });
        },
        //职位族--获取所有职位族
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
                    this.positionGroupTable.data = res.data.result
                    // this.positionGroupTable.total = res.data.result
                } else {
                    base.error(res.data);
                }
            });
        },
        //职位族--页码改变
        GroupPageChange(page) {
            this.positionGroupTable.loading = true;
            this.GroupCurrentPage = page;
            this.getAllPositionGroup();
        },
        //职位族--页容量改变
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
                this.getPositionGrade();
            }
        }
    }
};
</script>