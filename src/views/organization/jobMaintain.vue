<style lang="scss">
#organization_jobMaintain{
    .el-tabs{
        height: 100%;        
    }
    .el-tabs__header {      
        padding: 0 24px;
        border-bottom: 1px solid rgba(241, 242, 242, 1);
      
    }
    .el-tabs__content {
        height: calc(100% - 64px);
        overflow: auto;
        #pane-orgPic {
            height: 100%;
        }
    }
}   
</style>
<style lang="scss" scoped >
@import url(../../assets/js/orgChart/orgchart-webcomponents.css);
#organization_jobMaintain {
    display: flex;
    height: 100%;
    .side_tree {
        width: 216px;
        height: 100%;
        box-sizing: border-box;
        padding: 16px 10px 0px 20px;
        background-color: #fff;
        overflow: hidden;
        text-align: left;
    }
    .content {
        flex: 1;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        background-color: #fff;
        .post_table {
            margin-top: 30px;
        }
        .qj-form,
        .qj-map {
            margin-right: 5px;
        }
    }
}

//弹框样式开始--删除,解封,封存
.comf {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: bold;
}
.wait_del {
    margin: 0px 0px 16px 30px;
    font-size: 16px;
}
.check_all {
    height: 40px;
    border-bottom: 1px solid #dbdbdbff;
    line-height: 40px;
}
.check_wrap {
    border: 1px solid#DBDBDBFF;
}
.check_wrap2 {
    padding-left: 8px;
    margin: 0px 30px;
    overflow:hidden;
}
.check_box {
    height: 32px;
    line-height: 32px;
}
.el-icon-question {
    margin-right: 8px;
    font-size: 22px;
    color: #ffd532ff;
}
.el-checkbox {
    width: 100%;
    height: 32px;
    line-height: 32px;
}
.is-checked {
    border-left: 8px solid #ffefe8ff;
    margin-left: -8px;
    background-color: #ffefe8ff;
}
//弹框样式开始--删除,解封,封存
.merge_check {
    height: 168px;
    padding-left: 8px;
    overflow: auto;
    border: 1px solid #dbdbdbff;
    border-radius: 3px;
}
//岗位删除开始
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
.el-button {
    cursor: default;
}
//岗位图
.operation {
    padding: 18px 24px;
}
.chart {
    margin: 0 24px 18px 24px;
    border: 1px solid rgba(241, 242, 242, 1);
    height: 600px;
}
//岗位排序
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
    <div id="organization_jobMaintain">
        <!-- 岗位树 -->
        <div class="side_tree">
            <tree :treeData="postTree"></tree>
        </div>
        <!-- 岗位 -->
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 岗位表 -->
                <el-tab-pane name="post_table">
                    <span slot="label">
                        <i class="qj-form"></i>岗位表
                    </span>
                    <commonTable :table="postTable" class="post_table"></commonTable>
                    <!-- 新增岗位弹窗 -->
                    <el-dialog
                        :visible.sync="addPostDialog"
                        class="qinjeeDialogSmall"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">岗位新增</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="addPostForm"
                                :rules="rules"
                                ref="addPostForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                size="small"
                            >
                                <el-form-item label="岗位编码" prop="postCode">
                                    <el-input v-model.trim="addPostForm.postCode"></el-input>
                                </el-form-item>
                                <el-form-item label="岗位名称" prop="postName">
                                    <el-input v-model.trim="addPostForm.postName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="orgName">
                                    <el-select
                                        v-model="addPostForm.orgName"
                                        placeholder="请选择"
                                        ref="selectTree1"
                                        popper-class="base_treeSelect"
                                        style="width:100%">
                                        <el-option
                                            :label="addPostForm.orgName"
                                            :value="addPostForm.orgName">
                                            <tree :treeData="orgTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上级岗位">
                                    <el-select
                                        v-model="addPostForm.parentPostName"
                                        placeholder="请选择"
                                        ref="selectTreeP1"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                        :clearable="true">
                                         <el-option
                                            :label="addPostForm.parentPostName"
                                            :value="addPostForm.parentPostName">
                                            <tree :treeData="postSelectTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位" prop="positionId">
                                    <el-select
                                        v-model="addPostForm.positionName"
                                        placeholder="请选择"
                                        filterable
                                        ref="selectTreeP3"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                         <el-option
                                            :label="addPostForm.positionName"
                                            :value="addPostForm.positionName">
                                            <tree :treeData="positionTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="addPostDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="addPostReq('addPostForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 编辑岗位弹窗 -->
                    <el-dialog
                        :visible.sync="editPostDialog"
                        class="qinjeeDialogSmall"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">岗位编辑</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="editPostForm"
                                :rules="rules"
                                ref="editPostForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                size="small"
                            >
                                <el-form-item label="岗位编码" prop="postCode">
                                    <el-input v-model.trim="editPostForm.postCode"></el-input>
                                </el-form-item>
                                <el-form-item label="岗位名称" prop="postName">
                                    <el-input v-model.trim="editPostForm.postName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="orgId">
                                    <el-select
                                        v-model="editPostForm.orgName"
                                        placeholder="请选择"
                                        ref="selectTree2"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                        <el-option
                                            :label="editPostForm.orgName"
                                            :value="editPostForm.orgName"
                                        >
                                            <tree :treeData="orgTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上级岗位">
                                    <el-select
                                        v-model="editPostForm.parentPostName"
                                        clearable
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                        ref="selectTreeP2"
                                        placeholder="请选择">
                                        <el-option
                                            :label="editPostForm.parentPostName"
                                            :value="editPostForm.parentPostName">
                                            <tree :treeData="postSelectTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位" prop="positionId">
                                    <el-select
                                        v-model="editPostForm.positionName"
                                        placeholder="请选择"
                                        filterable
                                        ref="selectTreeP4"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                        <el-option
                                            :label="editPostForm.positionName"
                                            :value="editPostForm.positionName">
                                            <tree :treeData="positionTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="editPostDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="editPostReq('editPostForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除岗位弹窗 -->
                    <el-dialog
                        :visible.sync="delPostDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">确认删除</span>
                        <div class="qinjeeDialogSmallMini">
                            <div>
                                <p class="comf">
                                    <i class="el-icon-question"></i>确认删除下表选中的岗位吗?
                                </p>
                                <p class="wait_del">待删除岗位</p>
                            </div>
                            <div
                                :class="{ check_wrap : delPostList.length > 1 }"
                                class="check_wrap2"
                            >
                                <el-checkbox
                                    :indeterminate="isIndeterminate"
                                    v-model="checkAll"
                                    @change="CheckAllChange"
                                    v-if="delPostList.length > 1"
                                    class="check_all"
                                >全选</el-checkbox>
                                <el-checkbox-group v-model="delCheckedList" @change="checkedResult">
                                    <div
                                        v-for="(item,index) in delPostList"
                                        :key="index"
                                        :class="{check_box : delPostList.length > 1}"
                                    >
                                        <el-checkbox :label="item">{{item.postName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="delPostDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="delPostReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 封存岗位弹窗 -->
                    <el-dialog
                        :visible.sync="notEnableDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">确认封存</span>
                        <div class="qinjeeDialogSmallMini">
                            <div>
                                <p class="comf">
                                    <i class="el-icon-question"></i>确认封存下表选中的岗位吗?
                                </p>
                                <p class="wait_del">待封存岗位</p>
                            </div>
                            <div
                                :class="{ check_wrap : notEnableList.length > 1 }"
                                class="check_wrap2"
                            >
                                <el-checkbox
                                    :indeterminate="isIndet"
                                    v-model="notEnableAll"
                                    @change="notEnableAllChange"
                                    v-if="notEnableList.length > 1"
                                    class="check_all"
                                >全选</el-checkbox>
                                <el-checkbox-group
                                    v-model="notEnableCheckedList"
                                    @change="notEnableChange"
                                >
                                    <div
                                        v-for="(item,index) in notEnableList"
                                        :key="index"
                                        :class="{check_box : notEnableList.length > 1}"
                                    >
                                        <el-checkbox :label="item">{{item.postName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="notEnableDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="notEnableReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 解封岗位弹窗 -->
                    <el-dialog
                        :visible.sync="EnableDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">确认解封</span>
                        <div class="qinjeeDialogSmallMini">
                            <div>
                                <p class="comf">
                                    <i class="el-icon-question"></i>确认解封下表选中的岗位吗?
                                </p>
                                <p class="wait_del">待解封岗位</p>
                            </div>
                            <div
                                :class="{ check_wrap : EnableList.length > 1 }"
                                class="check_wrap2"
                            >
                                <el-checkbox
                                    :indeterminate="isIndet2"
                                    v-model="EnableAll"
                                    @change="EnableAllChange"
                                    v-if="EnableList.length > 1"
                                    class="check_all"
                                >全选</el-checkbox>
                                <el-checkbox-group
                                    v-model="EnableCheckedList"
                                    @change="EnableChange"
                                >
                                    <div
                                        v-for="(item,index) in EnableList"
                                        :key="index"
                                        :class="{check_box : EnableList.length > 1}"
                                    >
                                        <el-checkbox :label="item">{{item.postName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="EnableDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="EnableReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 复制岗位弹窗 -->
                    <el-dialog
                        :visible.sync="copyPostDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">岗位复制</span>
                        <div class="qinjeeDialogSmallMini">
                            <el-form
                                :model="copyPostForm"
                                :rules="rules"
                                ref="copyPostForm"
                                label-width="120px"
                                class="demo-ruleForm"
                                size="mini"
                            >
                                <el-form-item label="选择目标机构" prop="targetOrgName">
                                    <el-select
                                        v-model="copyPostForm.targetOrgName"
                                        placeholder="请选择"
                                        ref="selectTree3"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                        <el-option
                                            :label="copyPostForm.targetOrgName"
                                            :value="copyPostForm.targetOrgName"
                                        >
                                            <tree :treeData="orgTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="copyPostDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="copyPostReq('copyPostForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 查看历任弹窗 -->
                    <el-dialog
                        :visible.sync="postSuccessiveDialog"
                        class="qinjeeDialogBig"
                        id="successive_table"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">历任人员信息</span>
                        <div class="qinjeeDialogBigCont">
                            <commonTable :table="postSuccessiveTable"></commonTable>
                        </div>
                    </el-dialog>
                    <!-- 岗位排序弹窗 -->
                    <el-dialog
                        :visible.sync="sortPostDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">岗位排序</span>
                        <div class="qinjeeDialogMiniCont">
                            <draggable
                                class="sortComponent"
                                v-model="sortPostList"
                                group="org"
                                @start="drag=true"
                                @end="drag=false"
                            >
                                <div
                                    class="sortList"
                                    v-for="item in sortPostList"
                                    :key="item.postId"
                                >{{item.postName}}</div>
                            </draggable>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="sortPostDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="sortPostReq">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-tab-pane>
                <!-- 岗位图 -->
                <el-tab-pane name="post_pic">
                    <span slot="label">
                        <i class="qj-form"></i>岗位图
                    </span>

                    <el-row :gutter="16" class="operation">
                        <el-col :span=".5">
                            <el-select
                                v-model="direction"
                                size="small"
                                placeholder="显示方向"
                                @change="directionChange"
                            >
                                <el-option value="t2b" label="竖"></el-option>
                                <el-option value="l2r" label="横"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span=".5">
                            <el-select
                                v-model="tier"
                                size="small"
                                placeholder="显示层级"
                                @change="tierChange"
                            >
                                <el-option :value="0" label="全部显示"></el-option>
                                <el-option
                                    v-for="item in tierList"
                                    :key="item"
                                    :value="item"
                                    :label="`${item}层`"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span=".5">
                            <el-button type="primary" size="small" @click="downloadChart">导出</el-button>
                        </el-col>
                    </el-row>

                    <div class="chart" id="postChart"></div>
                </el-tab-pane>
            </el-tabs>
            <!-- 岗位导入 -->
            <commonUpload :data="uploadData" :uploadShow="uploadShow" :active="uploadActive"  @close="uploadShow=$event"></commonUpload>
        </div>
    </div>
</template>
<script>

import draggable from "vuedraggable";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import OrgChart from "../../assets/js/orgChart/orgchart-webcomponents.js";
import base from "../../assets/js/base";
import file from "../../request/filePath";
import commonUpload from "../../components/upload/upload";
import {
    postRepair_api1,
    postRepair_api2,
    postRepair_api3,
    postRepair_api4,
    postRepair_api5,
    postRepair_api6,
    postRepair_api7,
    postRepair_api8,
    postRepair_api9,
    postRepair_api10,
    postRepair_api11,
    postRepair_api12,
    postRepair_api13,
    postRepair_api14,
    postRepair_api15,
    postRepair_api16,
    postRepair_api17,
} from "../../request/api";

export default {
    name: "jobMaintain" /* 岗位维护 */,
    components: {
        tree,
        commonTable,
        draggable,
        commonUpload,
    },
    data() {
        return {
            activeName: "post_table",
            postTree: {
                data: [],
                props: {
                    children: "childList",
                    label: "orgName"
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key: "orgType",
                        val: "GROUP",
                        icon: "qj-jituan"
                    },
                    {
                        key: "orgType",
                        val: "UNIT",
                        icon: "qj-danwei"
                    },
                    {
                        key: "orgType",
                        val: "DEPT",
                        icon: "qj-nav_client"
                    },
                    {
                        key: "orgType",
                        val: "POST",
                        icon: "qj-detail"
                    }
                ],
                switchOpen: true,
                switchChange: this.switchChange,
                showDefaultIcon: true,
                nodeClick: this.nodeClick
            },
            isEnable: "",
            postSelectTree:{ //下拉框岗位树
                data: [],
                icons: [
                    {
                        key: "orgType",
                        val: "GROUP",
                        icon: "qj-jituan"
                    },
                    {
                        key: "orgType",
                        val: "UNIT",
                        icon: "qj-danwei"
                    },
                    {
                        key: "orgType",
                        val: "DEPT",
                        icon: "qj-nav_client"
                    },
                    {
                        key: "orgType",
                        val: "POST",
                        icon: "qj-detail"
                    }
                ],
                props: {
                    children: "childList",
                    label: "orgName"
                },
                nodeClick: this.SelectTreeNode,
                showDefaultIcon: true,
            },
            positionTree:{ //下拉职位树
                data: [],
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
                showDefaultIcon: true,
                nodeClick: this.positionTreeClick
            },
            //岗位表格
            postTable: {
                head: [
                    { name: "封存", key: "isEnable", isShow: true },
                    { name: "岗位编码", key: "postCode", isShow: true },
                    { name: "岗位名称", key: "postName", isShow: true },
                    { name: "所属部门", key: "orgName", isShow: true,width:"200px"},
                    { name: "职位名称", key: "positionName", isShow: true },
                    { name: "上级岗位", key: "parentPostName", isShow: true }
                ],
                data: [],
                total: 0,
                bar: [
                    {
                        type: "button",
                        text: "新增",
                        btnType: "primary",
                        method: this.addPost
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delPost
                    },
                    {
                        type: "buttons",
                        text: "更多操作",
                        btnType: "plain",
                        icon: "",
                        defaultIconHide: false,
                        list: [
                            { text: "封存", method: this.notEnable },
                            { text: "解封", method: this.Enable },
                            { text: "排序", method: this.sortPostBtn },
                            // { text: "模板下载", method: this.tempDownload },
                            { text: "复制", method: this.copyPost },
                            { text: "导入", method: this.importPost },
                            { text: "导出", method: this.exportPostTable }
                        ]
                    }
                ],
                perColumn: [
                    {
                        name: "历任",
                        list: [
                            {
                                type: "primary",
                                text: "历任",
                                method: this.columnBtn
                            }
                        ]
                    }
                ],
                activeColumn: "岗位名称",
                cellClick: this.cellClick,
                showSelect: true,
                selectChange: this.postSelectChange,
                loading: false,
                pageResize: false,
                pageHide: false,
                pageSizeChange: this.postPageSizeChange,
                pageChange: this.postPageChange,
                formatter: this.formatter
            },
            orgNode: "",
            currentPage: 1,
            pageSize: 10,
            postId: "",
            //岗位--新增
            addPostDialog: false,
            addPostForm: {
                postCode: "",
                postName: "",
                orgName: "",
                orgId: "",
                parentPostId: "",
                parentPostName: "",
                positionId: "",
                positionName:"",
            },
            rules: {
                postCode: [
                    { required: true, message: "请输入", trigger: "blur" },
                ],
                postName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                orgName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                positionId: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                targetOrgName: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
                orgId: [
                    { required: true, message: "请选择", trigger: "blur" }
                ]
            },
            maxCodeAdd: "",
            orgTree: {
                data: [],
                props: {
                    children: "childList",
                    label: "orgName"
                },
                showDefaultIcon: true,
                defaultIconExpandNode: true,
                nodeClick: this.selectTreeClick
            },
            //岗位编辑
            editPostForm: {
                postCode: "",
                postName: "",
                postId: "",
                orgId: "",
                orgName: "",
                parentPostId: "",
                parentPostName:"",
                positionId: "",
                positionName: "",
            },
            editPostDialog: false,
            //岗位删除
            checkAll: true,
            isIndeterminate: false,
            delCheckedList: [],
            delPostList: [],
            delPostDialog: false,
            //岗位封存
            notEnableAll: true,
            isIndet: false,
            notEnableCheckedList: [],
            notEnableList: [],
            notEnableDialog: false,
            //岗位解封
            isIndet2: false,
            EnableAll: true,
            EnableCheckedList: [],
            EnableList: [],
            EnableDialog: false,
            //岗位复制
            copyPostList: [],
            copyPostDialog: false,
            copyPostForm: {
                targetOrgName: "",
                targetOrgId: ""
            },
            //查看历任
            postSuccessiveDialog: false,
            postSuccessiveTable: {
                head: [
                    { name: "姓名", key: "userName", isShow: true },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    { name: "岗位", key: "postName", isShow: true },
                    {
                        name: "起任日期",
                        key: "employmentBeginDate",
                        isShow: true
                    },
                    {
                        name: "任免日期",
                        key: "employmentEndDate",
                        isShow: true
                    },
                    {
                        name: "任免原因",
                        key: "appointDismissalReason",
                        isShow: true
                    }
                ],
                data: [],
                bar: [],
                total: 0,
                pageHide: true,
                formatter: this.timeFormatter
            },
            SuccessiveInfo: true,
            columnValue: null,
            //岗位导出
            exportPostList: [],
            //岗位排序
            sortPostList: [],
            sortPostDialog: false,
            //岗位图
            direction: "t2b",
            tier: 0,
            tierList: [1, 2, 3, 4],
            postChartData: null,
            //岗位导入
            uploadActive: 0,
            uploadShow: false,
            uploadData: {
                title: "岗位导入",
                download: this.importTempDownload,
                fileFormatDescription: "仅支持扩展名：.xls .xles，大小不能超过5M",
                uploadDescription: "这句话的内容还需要和产品沟通",
                templateName: "岗位导入",
                uploadUrl: "",
                cancel: this.uploadCancel, // 必须，取消操作
                upload: this.uploadOrReturn, // 必须，上传操作
                cancelLoading: false, // 必须，取消loading
                btnText: "校验", //按钮文字
                cancelbtn: "取消",
                
                tableShow: false, //是否显示表格
                tableData: {
                    head: [
                        { name: "机构编码", key: "orgCode", isShow: true },
                        { name: "机构名称", key: "orgName", isShow: true },
                        { name: "职位名称", key: "positionName", isShow: true },
                        { name: "岗位编码",key: "postCode",isShow: true},
                        { name: "岗位名称", key: "postName", isShow: true }
                    ],
                    hideHeader: false,
                    data: [],
                    total: 0,
                    pageHide: true
                },
                checkedResult: "", //校验结果
                fileList: [], //上传的文件
                readReport: this.readReport, //查看检验报告的回调
                checkFailshow: false,
                checkFailTable: {
                    head: [
                        { name: "行号", key: "lineNumber", isShow: true },
                        { name: "说明", key: "resultMsg", isShow: true }
                    ],
                    hideHeader: false,
                    bar: [
                        {
                            type: "button",
                            text: "导出Txt",
                            btnType: "primary",
                            method: this.exportTxTReq
                        }
                    ],
                    data: [],
                    total: 0,
                    webPage: true
                }
            },
            redisKey: ""
        };
    },
    mounted() {
        this.getPostTreeReq();
    },
    methods: {
        //岗位--导入按钮
        importPost() {
            this.uploadShow = true;
            this.uploadActive = 0;
            this.uploadData.fileList = [];
            this.uploadData.tableShow = false;
            this.uploadData.checkFailshow = false;
            this.uploadData.title = "岗位导入";
            this.uploadData.cancelbtn = "取消";
            this.uploadData.checkedResult = "";
            this.uploadData.btnText = "校验"
        },
        //岗位导入---导出txt
        exportTxTReq() {
            let send = {
                redisKey: this.redisKey
            };
            base.log("s", "错误信息导出", send);
            postRepair_api17(send, res => {
                console.log(res);
                base.blobDownLoad(res,true);
            });
        },
        //岗位导入--点击查看校验报告
        readReport() {
            this.uploadData.tableShow = false;
            this.uploadData.checkFailshow = true;
            this.uploadData.title = "校验报告";
            this.uploadData.btnText = "确定";
            this.uploadData.cancelbtn = "返回";
        },
        //岗位导入--上传按钮
        uploadOrReturn() {
            if (this.uploadData.btnText === "导入") {
                this.uploadReq();
            } else if (this.uploadData.btnText === "返回") {
                this.uploadActive = 0;
                this.uploadData.fileList = [];
                this.uploadData.tableShow = false;
                this.uploadData.checkFailshow = false;
                this.uploadData.title = "岗位导入";
            } else if (this.uploadData.btnText === "确定") {
                this.uploadShow = false;
                this.uploadData.tableShow = false;
            }else if(this.uploadData.btnText === "校验"){
                this.uploadActive = 1;
                this.uploadData.tableShow = true;
                this.uploadCheckReq();
            }
        },
        //岗位导入--文件上传请求
        uploadReq() {
            let send = {
                redisKey: this.redisKey
            };
            base.log("s", "岗位文件上传", send);
            postRepair_api16(send, res => {
                base.log("r", "岗位文件上传", res.data);
                if (res.data.success) {
                    this.$message.success("文件上传成功");
                    this.uploadData.fileList = [];
                    this.uploadActive = 3;
                    setTimeout(() => {
                        this.uploadShow = false;
                    }, 800);
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位导入--校验请求接口
        uploadCheckReq() {
            let send = this.uploadData.fileList[0].raw;
            let fd = new FormData();
            fd.append("multfile", send);
            base.log("s", "岗位导入校验", fd);
            postRepair_api15(fd, res => {
                base.log("r", "岗位导入校验", res);
                if (res.data.success) {
                    this.uploadData.checkedResult = "success";
                    this.uploadData.btnText = "导入";
                    this.uploadData.tableData.data = res.data.result.excelList;
                    this.redisKey = res.data.result.redisKey;
                    this.uploadActive = 2;
                } else {
                    this.uploadData.checkedResult = "fail";
                    this.uploadData.btnText = "返回";
                    this.uploadData.tableData.data = res.data.result.excelList;
                    this.uploadData.checkFailTable.data =res.data.result.failCheckList;
                    this.uploadData.checkFailTable.total =res.data.result.failCheckList.length;
                    this.redisKey = res.data.result.redisKey;
                }
            });
        },
        //岗位导入--取消/关闭按钮
        uploadCancel() {
            if (this.uploadData.cancelbtn === "取消") {
                this.uploadShow = false;
                this.uploadData.tableShow = false;
            } else if (this.uploadData.cancelbtn === "返回") {
                this.uploadData.tableShow = true;
                this.uploadData.checkFailshow = false;
                this.uploadData.cancelbtn = "取消";
                this.uploadData.btnText = "返回";
            }
        },

        //岗位图--导出(未做)
        downloadChart() {},
        // 岗位图--显示方向改变
        directionChange(v) {
            this.createChart(v, this.tier);
        },
        // 岗位图--层级改变
        tierChange(v) {
            this.createChart(this.direction, v);
        },
        //岗位图--获取岗位图请求
        getChartReq() {
            let send = {
                isContainsActualMembers: true,
                isContainsCompiler: true,
                isEnable: this.isEnable ? 1 : 0,
                layer: 3,
                postId: this.orgNode.postId
            };
            base.log("s", "获取岗位图", send);
            postRepair_api11(send, res => {
                base.log("r", "获取岗位图", res.data);
                if (res.data.success) {
                    this.postChartData = res.data.result[0];
                    this.createChart(this.direction, this.tier);
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位图--创建岗位图
        createChart(direction = "t2b", tier) {
            let orgchart = new OrgChart({
                chartContainer: "#postChart",
                chartClass: "orgchartSingleClassName",
                data: this.postChartData,
                nodeTitle: "postName" /* 节点标题字段 */,
                childTitle: "childList",
                zoom: true /* 鼠标滚轮缩放 */,
                pan: true /* 是否可以拖动 */,
                depth: tier ? tier : 999,
                direction: direction,
                // 'nodeContent': 'orgType',
                createNode: function(node, data) {
                    // 创建节点
                    let cont = document.createElement("div");

                    // 添加点击事件
                    cont.addEventListener("click", event => {
                        // 这里可以添加点击事件
                    });
                    // 添加属性
                    cont.setAttribute("class", "nodeCont");
                    // 添加内容
                    let html = `<div>
                                    <div class="info">
                                        <p class="number">${data.staffNumbers}/${data.planNumbers}</p>
                                    </div>
                                </div>`;
                    cont.innerHTML = html;
                    // 插入节点内
                    node.appendChild(cont);
                }
            });
            let chartNode = document.querySelector(".orgchartSingleClassName");
            if (chartNode) {
                document.querySelector("#postChart").removeChild(chartNode);
            }
            document.querySelector("#postChart").appendChild(orgchart);
        },

        //岗位排序--表格按钮
        sortPostBtn() {
            if (!this.orgNode) {
                this.$message.warning("请选择左侧机构树");
                return;
            } 
            if(this.sortPostList.length < 2){
                 this.$message.warning("该机构下岗位数少于2");
                 return;
            } 
            this.sortPostDialog = true;      
        },
        //岗位排序--请求接口
        sortPostReq() {
            let ids = this.sortPostList.map(item => item.postId);
            let send = ids;
            base.log("s", "岗位排序", send);
            postRepair_api13(send, res => {
                base.log("r", "岗位排序", res.data);
                if (res.data.success) {
                    this.getPostTableReq();
                    this.getPostTreeReq()
                    this.$message.success("排序成功");
                    this.sortPostDialog = false;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位排序--请求获取需要排序的岗位(暂时放弃)
        getNeedSortPost() {
            let send = {
                orgId: this.orgNode.orgId,
                parentPostId: this.orgNode.postId ? this.orgNode.postId : "",
                isEnable: 1
            };
            base.log("s", "获取需排序的岗位", send);
            postRepair_api12(send, res => {
                base.log("r", "获取需排序的岗位", res.data);
                if (res.data.success) {
                    if (res.data.result.list.length < 2) {
                        this.$message.warning("该机构岗位数少于2");
                        return;
                    }
                    this.sortPostList = res.data.result.list;
                    this.sortPostDialog = true;
                } else {
                    base.error(res.data);
                }
            });
        },

        //岗位导出--请求接口
        exportPostTable(searchData, radioData, checkboxData) {
            if (!this.orgNode) {
                this.$message.warning("请点击左侧机构树");
                return;
            }
            let ids = this.exportPostList.map(item => item.postId);
            let send = {
                orgId: this.orgNode.orgId,
                postIds: ids
            };
            base.log("s", "岗位导出", send);
            postRepair_api14(send, res => {
                base.log("r", "岗位导出", res);
                base.blobDownLoad(res);
            });
        },

        //模板下载
        // tempDownload() {
        //     let url = file["岗位导入"];
        //     console.log("岗位模板下载");
        //     if (url) {
        //         window.open(url, "_self");
        //     }
        // },

        //查看历任--按钮
        columnBtn(row) {
            this.columnValue = row;
            this.postSuccessiveReq();
            this.postSuccessiveDialog = true;
        },
        //查看历任 -- 时间格式化
        timeFormatter(key, val) {
            if (key == "employmentBeginDate") {
                val = val.split("T")[0];
                return val;
            } else if (key == "employmentEndDate") {
                val = val.split("T")[0];
                return val;
            } else {
                return val;
            }
        },
        //查看历任--请求接口
        postSuccessiveReq() {
            let send = {
                postId: this.columnValue.postId
                // postId: 1
            };
            base.log("s", "查看历任", send);
            postRepair_api10(send, res => {
                base.log("r", "查看历任", res.data);
                if (res.data.success) {
                    this.postSuccessiveTable.data = res.data.result;
                } else {
                    base.error(res.data);
                }
            });
        },

        //岗位复制--按钮
        copyPost() {
            if (this.copyPostList.length === 0) {
                this.$message.warning("请选择岗位");
                return;
            }
            this.copyPostDialog = true;
        },
        //岗位复制--请求接口
        copyPostReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let postIds = this.copyPostList.map(item => item.postId);
                    let send = {
                        postIds: postIds,
                        orgId: this.copyPostForm.targetOrgId
                    };
                    base.log("s", "复制岗位", send);
                    postRepair_api9(send, res => {
                        base.log("r", "复制岗位", res.data);
                        if (res.data.success) {
                            this.$message.success("复制成功");
                            this.getPostTableReq();
                            this.getPostTreeReq()
                            this.copyPostDialog = false;
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //岗位解存--点击按钮
        Enable() {
            let status = this.EnableList.find(item => item.isEnable === 1); //数据中有未封存的数据
            if (this.EnableList.length === 0 || status) {
                this.$message.warning("请选择已封存的岗位");
                return;
            }
            this.EnableAll = true;
            this.EnableDialog = true;
            this.EnableCheckedList = this.EnableList;
        },
        //岗位解存--全选状态改变
        EnableAllChange(val) {
            this.EnableCheckedList = val ? this.EnableList : [];
            this.isIndet2 = false;
        },
        //岗位解存--弹出框多选改变
        EnableChange(value) {
            let checkedCount = value.length;
            this.EnableAll = checkedCount === this.EnableList.length;
            this.isIndet2 =
                checkedCount > 0 && checkedCount < this.EnableList.length;
        },
        //岗位解存--请求接口
        EnableReq() {
            let send = this.EnableCheckedList.map(item => item.postId);
            base.log("s", "解封岗位", send);
            postRepair_api8(send, res => {
                base.log("r", "解封岗位", res.data);
                if (res.data.success) {
                    this.$message.success("解封成功");
                    this.getPostTableReq();
                    this.getPostTreeReq()
                    this.EnableDialog = false;
                } else {
                    base.error(res.data);
                }
            });
        },

        //岗位封存--请求接口
        notEnableReq() {
            let send = this.notEnableCheckedList.map(item => item.postId);
            base.log("s", "封存岗位", send);
            postRepair_api7(send, res => {
                base.log("r", "封存岗位", res.data);
                if (res.data.success) {
                    this.$message.success("封存成功");
                    this.getPostTableReq();
                    this.getPostTreeReq()
                    this.notEnableDialog = false;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位封存--全选状态改变
        notEnableAllChange(val) {
            this.notEnableCheckedList = val ? this.notEnableList : [];
            this.isIndet = false;
        },
        //岗位封存--弹出框多选改变
        notEnableChange(value) {
            let checkedCount = value.length;
            this.notEnableAll = checkedCount === this.notEnableList.length;
            this.isIndet =
                checkedCount > 0 && checkedCount < this.notEnableList.length;
        },
        //岗位封存--点击按钮
        notEnable() {
            if (this.notEnableList.length === 0) {
                this.$message.warning("请选择未封存的岗位");
                return;
            }
            this.notEnableAll = true;
            this.notEnableDialog = true;
            this.notEnableCheckedList = this.notEnableList;
        },

        //删除岗位--弹出框全选删除
        CheckAllChange(val) {
            this.delCheckedList = val ? this.delPostList : [];
            this.isIndeterminate = false;
        },
        //删除岗位--弹出框多选删除
        checkedResult(value) {
            console.log(value);

            let checkedCount = value.length;
            this.checkAll = checkedCount === this.delPostList.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.delPostList.length;
        },
        //删除岗位-- 按钮点击
        delPost() {
            if (this.delPostList.length === 0) {
                this.$message.warning("未选中岗位");
                return;
            }
            this.delPostDialog = true;
            this.delCheckedList = this.delPostList;
        },
        //删除岗位--请求接口
        delPostReq() {
            let send = this.delCheckedList.map(item => item.postId);
            base.log("s", "编辑岗位", send);
            postRepair_api6(send, res => {
                base.log("r", "编辑岗位", res.data);
                if (res.data.success) {
                    this.delPostDialog = false;
                    this.getPostTableReq();
                    this.getPostTreeReq()
                } else {
                    base.error(res.data);
                }
            });
        },

        //岗位编辑--请求接口
        editPostReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = this.editPostForm;
                    base.log("s", "编辑岗位", send);
                    postRepair_api5(send, res => {
                         base.log("r", "编辑岗位", res.data);
                        if (res.data.success) {
                            this.$message.success("编辑成功")
                            this.editPostDialog = false;
                            this.getPostTableReq();
                            this.getPostTreeReq()
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //岗位编辑--单元格点击
        cellClick(key,row){
            if(key === "postName"){
            this.editPostForm.postCode = row.postCode;
            this.editPostForm.postName = row.postName;
            this.editPostForm.orgName = row.orgName;
            this.editPostForm.orgId = row.orgId;
            this.editPostForm.parentPostId =row.parentPostId ?row.parentPostId: "";
            this.editPostForm.parentPostName =row.parentPostName ?row.parentPostName: "";
            this.editPostForm.positionId =row.positionId;
            this.editPostForm.positionName =row.positionName;
            this.editPostForm.postId =row.postId;
            this.editPostDialog = true;
            }
        },
    
        //岗位新增/编辑--下拉职位树
        positionTreeClick(node){
            this.addPostForm.positionId = node.positionId
            this.addPostForm.positionName = node.positionName

            this.editPostForm.positionId = node.positionId
            this.editPostForm.positionName = node.positionName
            
            if (this.$refs.selectTreeP3 && node.positionName) {
                this.$refs.selectTreeP3.blur();
            }
            if (this.$refs.selectTreeP4 && node.positionName) {
                this.$refs.selectTreeP4.blur();
            }
        },

        //岗位新增/编辑--下拉岗位树
        SelectTreeNode(node){
            this.addPostForm.parentPostId = node.postId
            this.addPostForm.parentPostName = node.postName

            this.editPostForm.parentPostId = node.postId
            this.editPostForm.parentPostName = node.postName
            

            if (this.$refs.selectTreeP1 && node.postName) {
                this.$refs.selectTreeP1.blur();
            }
            if (this.$refs.selectTreeP2 && node.postName) {
                this.$refs.selectTreeP2.blur();
            }
        },
        //岗位新增--表格按钮
        addPost() {
            if (this.orgNode === "") {
                this.$message.warning("请选择机构");
                return;
            }

            if (this.orgNode.orgType !== "POST") {
                this.addPostForm.orgName = this.orgNode.orgName;
                this.addPostForm.orgId = this.orgNode.orgId;
            } else {
                this.addPostForm.orgName = "";
            }

            this.addPostForm.positionId = ""
            this.addPostForm.parentPostId = ""
            this.addPostForm.parentPostName = ""
            this.addPostForm.positionName = ""
            this.addPostForm.postCode = this.maxCodeAdd; 

            this.getAllPositionReq();            
            this.dialogType = true;
            this.addPostDialog = true;
             setTimeout(() => {
                   this.$refs.addPostForm.clearValidate()
            }, 0); 
        },
        //岗位新增 --获取所有职位请求
        getAllPositionReq() {
            let send = {};
            base.log("s", "获取所有职位", send);
            postRepair_api3(send, res => {
                base.log("r", "获取所有职位", res.data);
                if (res.data.success) {
                    let newTree = JSON.parse(JSON.stringify(res.data.result));
                    this.positionTreeFormatter(newTree);
                    this.positionTree.data = newTree;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位新增 -- 格式化职位树形
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
        //岗位新增--新增接口请求
        addPostReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = {
                        postCode: this.addPostForm.postCode,
                        orgId: this.addPostForm.orgId,
                        parentPostId: this.addPostForm.parentPostId ? this.addPostForm.parentPostId : 0,
                        positionId: this.addPostForm.positionId,
                        postName: this.addPostForm.postName
                    };
                    base.log("s", "新增岗位", send);
                    postRepair_api4(send, res => {
                        base.log("r", "新增岗位", res.data);
                        if (res.data.success) {
                            this.addPostDialog = false;
                            this.$message.success("新增成功");
                            this.getPostTableReq();
                            this.getPostTreeReq();
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //岗位新增--所有部门下拉树形点击
        selectTreeClick(node) {
            console.log(node);

            this.addPostForm.orgName = node.orgName;
            this.addPostForm.orgId = node.orgId;

            this.editPostForm.orgName = node.orgName;
            this.editPostForm.orgId = node.orgId;

            this.copyPostForm.targetOrgName = node.orgName;
            this.copyPostForm.targetOrgId = node.orgId;

            if (this.$refs.selectTree1) {
                this.$refs.selectTree1.blur();
            }
            if (this.$refs.selectTree2) {
                this.$refs.selectTree2.blur();
            }
            if (this.$refs.selectTree3) {
                this.$refs.selectTree3.blur();
            }
        },
        //岗位新增 -- 获取下级岗位最大编码(根据岗位表)
        getPostMaxCode(postList, nodeData) {
            if (postList.length != 0) {
                let codeList = postList.map(item => item.postCode);
                let maxCode = Math.max.apply(this, codeList);               
                this.maxCodeAdd = maxCode + 1;
                if(isNaN(this.maxCodeAdd)){
                    this.maxCodeAdd = nodeData.orgCode
                }              
            } else {
                this.maxCodeAdd = nodeData.orgCode + "01";
            }
        },

        //岗位表-- 格式化封存样式
        formatter(key, val) {
            if (key == "isEnable") {
                val = val === 1 ? "否" : "是";
                return val;
            } else {
                return val;
            }
        },
        //岗位表--获取岗位表请求
        getPostTableReq() {
            let send = {
                currentPage: this.currentPage,
                isEnable: this.isEnable ? 1 : 0,
                orgId: this.orgNode.orgId,
                pageSize: this.pageSize,
                postId: this.postId
            };
            base.log("s", "获取岗位表", send);
            postRepair_api2(send, res => {
                base.log("r", "获取岗位表", res.data);
                if (res.data.success) {
                    this.postTable.data = res.data.result.list;
                    this.postTable.total = res.data.result.total;
                    this.getPostMaxCode(res.data.result.list, this.orgNode); //获取最大下级岗位编码
                    this.postTable.pageResize = false;
                    this.exportPostList = res.data.result.list; //导出文件列表

                    this.sortPostList = res.data.result.list;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位表--多选框点击赋值
        postSelectChange(val) {
            this.delPostList = val; //删除多选赋值
            this.notEnableList = val; //封存多选赋值
            this.EnableList = val; //解封多选赋值
            this.copyPostList = val; //赋值多选赋值
            this.exportPostList = val; //导出多选赋值

            console.log(val);
        },
        //岗位表--页码改变
        postPageChange(page) {
            this.currentPage = page;
            this.getPostTableReq();
        },
        //岗位表--页容量改变
        postPageSizeChange(pageSize) {
            console.log("咱大爷");
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.postTable.pageResize = true;
            this.getPostTableReq();
        },

        //tab栏点击
        handleClick(tab) {
            if (tab.name == "post_table") {
                if (this.orgNode) {
                    this.getPostTableReq();
                    console.log("岗位树");
                }
            } else if (tab.name == "post_pic") {
                if (this.orgNode.orgType === "POST") {
                    this.getChartReq();
                } else {
                    this.$message.warning("请选择岗位");
                }
            }
        },

        //岗位树-- 获取岗位树请求
        getPostTreeReq() {
            let send = {
                isEnable: this.isEnable ? 1 : 0
            };
            base.log("s", "获取岗位树", send);
            postRepair_api1(send, res => {
                base.log("r", "获取岗位树", res.data);
                if (res.data.success) {
                    this.orgTree.data = res.data.result; //赋值机构部门树
                    let newTree = JSON.parse(JSON.stringify(res.data.result));
                    this.postTreeFormatter(newTree);
                    this.postTree.data = newTree;
                    this.postSelectTree.data = newTree;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位树--格式化岗位树
        postTreeFormatter(newTree) {
            for (let i = 0; i < newTree.length; i++) {
                let temp = newTree[i];
                if (temp.childList) {
                    this.postTreeFormatter(temp.childList);
                    if (temp.postList) {
                        temp.postList.forEach(item => {
                            item.orgName = item.postName;
                            item.orgType = "POST";
                        });
                        temp.childList.push(...temp.postList);
                    }
                } else if (!temp.childList && temp.postList) {
                    temp.postList.forEach(item => {
                        item.orgName = item.postName;
                        item.orgType = "POST";
                    });
                    temp.childList = temp.postList;
                }
            }
        },
        //岗位数--封存开关改变
        switchChange(val) {
            this.isEnable = val;
            this.getPostTreeReq();
        },
        //岗位树--节点被点击
        nodeClick(node) {
            this.orgNode = node;
            if (this.activeName == "post_table") {
                if (node.orgType !== "POST") {
                    this.postId = "";
                    this.currentPage = 1;
                    this.postTable.pageResize = true;
                    this.getPostTableReq();
                } else {
                    this.currentPage = 1;
                    this.postTable.pageResize = true;
                    this.postId = node.postId;
                    this.getPostTableReq();
                }
            } else if (this.activeName == "post_pic") {
                if (this.orgNode.orgType === "POST") {
                    this.getChartReq();
                }
            }
            console.log(node);
        }
    }
};
</script>