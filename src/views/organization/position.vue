<style lang="scss" scoped>
#organization_position {
    height: 100%;
    padding: 10px 0px 0px 10px;
    text-align: left;
    background-color: #f0f0f0ff;
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
                    <div class="main">
                        <!-- <el-radio-group v-model="radio">
                            <el-radio-button label="上海"></el-radio-button>
                            <el-radio-button label="北京"></el-radio-button>
                            <el-radio-button label="广州"></el-radio-button>
                            <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>-->
                        <el-table ref="multipleTable" :data="tableData" style="width: 100%">
                                <el-table-column label="职位族名称">
                                    <template slot-scope="scope">
                                        <el-radio v-model="radio" label="1">{{ scope.row.date }}</el-radio>                                                                                                                                                       
                                    </template>
                                </el-table-column>           
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="职位设置" name="position">职位设置</el-tab-pane>
                <el-tab-pane label="职级设置" name="position_level">职级设置</el-tab-pane>
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
                    date: "2016-05-02"
                },
                {
                    date: "2016-05-02"
                }
            ]
        };
    },
    mounted() {},
    methods: {
        // handleAvatarSuccess() {},
        // beforeAvatarUpload() {}

        // tab栏切换事件
        handleClick(tab, event) {
            //获取所有职位族
            if (tab.name == "positionGroup") {
                positionGroup_api1(
                    {
                        currentPage: 1,
                        pageSize: 10
                    },
                    res => {
                        console.log(res);
                    }
                );
            }
        }
    }
};
</script>