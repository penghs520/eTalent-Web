<style lang="scss" scoped>
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
        height: 100%;
        border: 10px solid #f0f0f0;
        padding-left: 24px;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
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
//岗位删除开始
.el-select {
    width: 100%;
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
                                    <el-input v-model="addPostForm.postCode" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="岗位名称" prop="postName">
                                    <el-input v-model="addPostForm.postName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="orgName">
                                    <el-select
                                        v-model="addPostForm.orgName"
                                        placeholder="请选择"
                                        ref="selectTree"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                        <el-option
                                            :label="addPostForm.orgName"
                                            :value="addPostForm.orgName"
                                        >
                                            <tree :treeData="orgTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上级岗位">
                                    <el-select
                                        v-model="addPostForm.parentPostId"
                                        placeholder="请选择"
                                        :clearable="true"
                                    >
                                        <el-option
                                            v-for="item in orgParenList"
                                            :key="item.postId"
                                            :label="item.postName"
                                            :value="item.postId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位" prop="positionId">
                                    <el-select
                                        v-model="addPostForm.positionId"
                                        placeholder="请选择"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in positionList"
                                            :key="item.value"
                                            :label="item.positionName"
                                            :value="item.positionId"
                                        ></el-option>
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
                                    <el-input v-model="editPostForm.postCode"></el-input>
                                </el-form-item>
                                <el-form-item label="岗位名称" prop="postName">
                                    <el-input v-model="editPostForm.postName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="orgId">
                                    <el-select
                                        v-model="editPostForm.orgName"
                                        placeholder="请选择"
                                        ref="selectTree"
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
                                        v-model="editPostForm.parentPostId"
                                        clearable
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in orgParenList"
                                            :key="item.postId"
                                            :label="item.postName"
                                            :value="item.postId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位" prop="positionId">
                                    <el-select
                                        v-model="editPostForm.positionId"
                                        placeholder="请选择"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in positionList"
                                            :key="item.value"
                                            :label="item.positionName"
                                            :value="item.positionId"
                                        ></el-option>
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
                </el-tab-pane>
                <!-- 岗位图 -->
                <el-tab-pane name="post_pic">
                    <span slot="label">
                        <i class="qj-form"></i>岗位图
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import {
    postRepair_api1,
    postRepair_api2,
    postRepair_api3,
    postRepair_api4,
    postRepair_api5,
    postRepair_api6
} from "../../request/api";
import base from "../../assets/js/base";

export default {
    name: "jobMaintain" /* 岗位维护 */,
    components: {
        tree,
        commonTable
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
            //岗位表格
            postTable: {
                head: [
                    { name: "封存", key: "isEnable", isShow: true },
                    { name: "岗位编码", key: "postCode", isShow: true },
                    { name: "岗位名称", key: "postName", isShow: true },
                    { name: "所属部门", key: "orgName", isShow: true },
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
                        text: "编辑",
                        btnType: "plain",
                        method: this.editPost
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
                            { text: "排序", method: this.btn2 },
                            { text: "模板下载", method: this.btn2 },
                            { text: "复制", method: this.btn2 },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn2 }
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
                showSelect: true,
                selectChange: this.postSelectChange,
                loading: false,
                pageResize: false,
                page: {
                    pageSizes: [10, 20, 30],
                    pageSize: 10
                },
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
                positionId: ""
            },
            rules: {
                postCode: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                postName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                orgName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                positionId: [
                    { required: true, message: "请输入", trigger: "blur" }
                ]
            },
            orgParenList: [],
            positionList: [],
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
            editPostList: [],
            editPostForm: {
                postCode: "",
                postName: "",
                postId: "",
                orgId: "",
                orgName: "",
                parentPostId: "",
                positionId: ""
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
            EnableDialog: false
        };
    },
    mounted() {
        this.getPostTreeReq();
    },
    methods: {
        //解存--点击按钮
        Enable() {
            if (this.EnableList.length === 0) {
                this.$message.warning("请选择已封存的岗位");
                return;
            }
            this.EnableAll = true;
            this.EnableDialog = true;
            this.EnableCheckedList = this.EnableList;
        },
        //解存--全选状态改变
        EnableAllChange(val) {
            this.EnableCheckedList = val ? this.EnableList : [];
            this.isIndet2 = false;
        },
        //解存--弹出框多选改变
        EnableChange(value) {
            let checkedCount = value.length;
            this.EnableAll = checkedCount === this.EnableList.length;
            this.isIndet2 =
                checkedCount > 0 && checkedCount < this.EnableList.length;
        },
        //解存--请求接口
        EnableReq() {
            console.log("点击解封");
        },

        //岗位封存--请求接口
        notEnableReq() {
            console.log("请求封存了");
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
                if (res.data.success) {
                    base.log("r", "编辑岗位", res.data);
                    this.delPostDialog = false;
                    this.getPostTableReq()
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
                        if (res.data.success) {
                            base.log("r", "编辑岗位", res.data);
                            this.editPostDialog = false;
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //岗位编辑--按钮
        editPost() {
            this.getAllPositionReq();
            if (this.editPostList.length != 1) {
                this.$message.warning("请选择一个岗位");
                return;
            }

            this.editPostForm.postCode = this.editPostList[0].postCode;
            this.editPostForm.postName = this.editPostList[0].postName;
            this.editPostForm.orgName = this.editPostList[0].orgName;
            this.editPostForm.orgId = this.editPostList[0].orgId;
            this.editPostForm.parentPostId = this.editPostList[0].parentPostId
                ? this.editPostList[0].parentPostId
                : "";
            this.editPostForm.positionId = this.editPostList[0].positionId;
            this.editPostForm.postId = this.editPostList[0].postId;
            this.editPostDialog = true;
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
            this.getAllPositionReq();
            this.addPostForm.postCode = this.maxCodeAdd;
            this.dialogType = true;
            this.addPostDialog = true;
        },
        //岗位新增 --获取所有职位请求
        getAllPositionReq() {
            let send = {};
            base.log("s", "获取所有职位", send);
            postRepair_api3(send, res => {
                base.log("r", "获取所有职位", res.data);
                if (res.data.success) {
                    this.positionList = res.data.result.list;
                    console.log(this.positionList);
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位新增--新增接口请求
        addPostReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = {
                        orgId: this.addPostForm.orgId,
                        parentPostId: this.addPostForm.parentPostId
                            ? this.addPostForm.parentPostId
                            : 0,
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
            this.addPostForm.orgName = node.orgName;
            this.addPostForm.orgId = node.orgId;
            this.editPostForm.orgName = node.orgName;
            this.editPostForm.orgId = node.orgId;
            this.$refs.selectTree.blur();
        },
        //岗位新增 -- 获取下级岗位最大编码(根据岗位表)
        getPostMaxCode(postList, nodeData) {
            if (postList.length != 0) {
                let codeList = postList.map(item => item.postCode);
                let maxCode = Math.max.apply(this, codeList);
                this.maxCodeAdd = maxCode + 1;
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
                isEnable: this.isEnable ? 0 : 1,
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
                    if (res.data.result.total === 0) {
                        //获取上级岗位
                        this.orgParenList = [];
                        this.addPostForm.parentPostId = "";
                    } else if (this.orgNode.orgType === "POST") {
                        this.orgParenList = res.data.result.list;
                        this.addPostForm.parentPostId = "";
                    } else {
                        this.orgParenList = res.data.result.list;
                    }
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位表--多选点击
        postSelectChange(val) {
            this.editPostList = val; //编辑多选赋值
            this.delPostList = val; //删除多选赋值
            this.notEnableList = val; //封存多选赋值
            this.EnableList = val; //解封多选赋值

            console.log(val);
        },
        //岗位表--页码改变
        postPageChange(page) {
            this.currentPage = page;
            this.getPostTableReq();
        },
        //岗位表--页容量改变
        postPageSizeChange(pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.getPostTableReq();
        },

        //tab栏点击
        handleClick(command) {},

        //岗位树-- 获取岗位树请求
        getPostTreeReq() {
            let send = {
                isEnable: this.isEnable ? 0 : 1
            };
            base.log("s", "获取岗位树", send);
            postRepair_api1(send, res => {
                base.log("r", "获取岗位树", res.data);
                if (res.data.success) {
                    this.orgTree.data = res.data.result; //赋值机构部门树
                    let newTree = JSON.parse(JSON.stringify(res.data.result));
                    this.postTreeFormatter(newTree);
                    this.postTree.data = newTree;
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
            if (node.orgType !== "POST") {
                this.postId = "";
                this.getPostTableReq();
            } else {
                this.postId = node.postId;
                this.getPostTableReq();
            }
            console.log(node);
        }
    }
};
</script>