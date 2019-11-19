<style lang="scss" scoped>
#organization_position {
    height: 100%;
    padding: 10px 0px 0px 10px;
    text-align: left;
    background-color: #f0f0f0ff;

    .table_title {
        margin: 40px 0px 16px 115px;
        font-size: 14px;
    }
    // 职位
    .position {
        display: flex;
        .position_side {
            width: 216px;
        }
        .position_content {
            flex: 1;
        }
    }
    //按钮
    .btn_content {
        margin-top: 18px;
        .el-button {
            margin-right: 16px;
        }
    }
}
</style>
<template>
    <div id="organization_position">
        <!-- <h1>职位体系</h1> -->
        <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        </el-upload>
        -->
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="职位体系" name="systematic">职位体系</el-tab-pane>

                <!-- 职位族设置 -->
                <el-tab-pane label="职位族设置" name="positionGroup">
                    <div class="btn_content">
                        <el-button type="primary" plain @click="addDialog = true">新增</el-button>
                        <el-button type="primary" plain @click="delPositionGroup">删除</el-button>
                        <el-dropdown trigger="click">
                            <el-button type="primary" plain>
                                更多操作
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>排序</el-dropdown-item>
                                <el-dropdown-item>导入</el-dropdown-item>
                                <el-dropdown-item>导出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="positionGroup_content">
                        <h4 class="table_title">职位族名称</h4>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            style="width: 100%"
                            :show-header="false"
                            @selection-change="handleSelectionChange"
                        >
                            >
                            <el-table-column width="108">
                                <template>
                                    <el-checkbox :v-model="checked"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="职位族名称">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-dialog title="新增信息" :visible.sync="addDialog" width="20%">
                        <el-form :model="positionGroupForm" :rules="rules" ref="positionGroupForm">
                            <el-form-item label="职位族名称" label-width="100px" prop="name">
                                <el-input v-model="positionGroupForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addDialog = false">取 消</el-button>
                            <el-button
                                type="primary"
                                @click="addPositionGroup('positionGroupForm')"
                            >确定</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
                <!-- 职位设置 -->
                <el-tab-pane label="职位设置" name="position">
                    <div class="position_side">
                        <el-tree
                            :data="position_data"
                            :props="defaultProps"
                            @node-click="handleNodeClick"
                            class="position_tree"
                        ></el-tree>
                    </div>
                    <div class="position_content">
                        <div class="btn_content">
                            <el-button type="primary" plain>新增</el-button>
                            <el-button type="primary" plain>删除</el-button>
                            <el-dropdown trigger="click">
                                <el-button type="primary" plain>
                                    更多操作
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>排序</el-dropdown-item>
                                    <el-dropdown-item>导入</el-dropdown-item>
                                    <el-dropdown-item>导出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 职级设置 -->
                <el-tab-pane label="职级设置" name="position_level">职级设置</el-tab-pane>
                <!-- 职等设置 -->
                <el-tab-pane label="职等设置" name="position_grade">职等设置</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import { positionGroup_api1 } from "../../request/api";
export default {
    name: "position" /* 职位体系 */,
    data() {
        return {
            activeName: "positionGroup",
            radio: "",
            tableData: [
                {
                    date: "2016-05-03"
                },
                {
                    date: "2016-05-03"
                },
                {
                    date: "2016-05-03"
                },
                {
                    date: "2016-05-03"
                }
            ],
            addDialog: false,
            positionGroupForm: {
                name: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入职位族名称",
                        trigger: "blur"
                    }
                ]
            },
            checked: true,
            index: "",
            clon_checked: [],
            //职位设置
            position_data: [
                {
                    label: "一级 1",
                    children: [
                        {
                            label: "二级 1-1",
                            children: [
                                {
                                    label: "三级 1-1-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 2",
                    children: [
                        {
                            label: "二级 2-1",
                            children: [
                                {
                                    label: "三级 2-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 2-2",
                            children: [
                                {
                                    label: "三级 2-2-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 3",
                    children: [
                        {
                            label: "二级 3-1",
                            children: [
                                {
                                    label: "三级 3-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 3-2",
                            children: [
                                {
                                    label: "三级 3-2-1"
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    mounted() {},
    methods: {
        // handleAvatarSuccess() {},
        // beforeAvatarUpload() {}

        //单选框
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.Table.clearSelection();
                this.$refs.Table.toggleRowSelection(val.pop());
            } else {
            }
        },
        //树形控件
        handleNodeClick(data) {
            console.log(data);
        },
        //复选框
        select(selection, row) {
            this.clon_checked = selection;
            console.log(selection);
            console.log(row);
        },
        // 新增职位族
        addPositionGroup(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addDialog = false;
                } else {
                    return false;
                }
            });
        },
        //删除职位族
        delPositionGroup() {
            console.log("删除职位族");
        },
        // tab栏切换事件
        handleClick(tab, event) {
            //获取所有职位族
            console.log("切换tab栏");

            if (tab.name == "positionGroup") {
                let sendData = {
                    currentPage: 1,
                    pageSize: 10
                };
                positionGroup_api1(sendData, res => {
                    console.log("123456");
                    console.log(res);
                });
            }
        }
    }
};
</script>