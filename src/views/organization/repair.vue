<style scoped lang="scss">
#organization_repair {
    display: flex;
    height: 100%;
    .side_tree {
        width: 216px;
        height: 100%;
        box-sizing: border-box;
        padding: 16px 10px 0px 20px;
        background-color: #fff;
        text-align: left;
        .switch_title {
            display: inline-block;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 20px;
        }
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
        .org_table {
            margin-top: 30px;
        }
        .qj-form,
        .qj-map {
            margin-right: 5px;
        }
    }
}
.el-select {
    width: 100%;
}
</style>


<template>
    <div id="organization_repair">
        <!-- 左侧树形 -->
        <div class="side_tree">
            <span class="switch_title">显示封存:</span>
            <el-switch
                v-model="value"
                active-color="#19ADE6"
                inactive-color="#ccc"
                @change="switchChange"
            ></el-switch>
            <tree :treeData="treeData"></tree>
        </div>
        <!-- 右侧表格 -->
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="orgForm">
                    <span slot="label">
                        <i class="qj-form"></i>机构表
                    </span>
                    <commonTable :table="orgTable" class="org_table"></commonTable>
                    <!-- 新增机构弹窗 -->
                    <el-dialog
                        :visible.sync="addOrgDialog"
                        class="qinjeeDialogSmall"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">新增机构</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="addOrgForm"
                                :rules="rules"
                                ref="addOrgForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                size="small"
                            >
                                <el-form-item label="机构编码" prop="orgCode">
                                    <el-input v-model="addOrgForm.orgCode" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="机构名称" prop="orgName">
                                    <el-input v-model="addOrgForm.orgName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="机构类型" prop="orgType">
                                    <el-select v-model="addOrgForm.orgType" placeholder="请选择">
                                        <div v-for="item in orgTypeList" :key="item.id">
                                            <el-option
                                                :label="item.dictValue"
                                                :value="item.dictCode"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上级机构" prop="orgParentId">
                                    <el-select v-model="addOrgForm.orgParentId" placeholder="请选择">
                                        <el-option
                                            v-for="item in orgParenList"
                                            :key="item.orgParentId"
                                            :label="item.orgName"
                                            :value="item.orgId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="机构负责人" prop="orgManagerId">
                                    <el-select
                                        v-model="addOrgForm.orgManagerId"
                                        placeholder="输入查找"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in orgManagerList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="addOrgDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="addOrgReq('addOrgForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除机构弹窗 -->
                    <el-dialog
                        :visible.sync="delOrgDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">提示</span>
                        <div class="qinjeeDialogSmallMini">
                            <!-- <commonTable :table="DelOrgTable" ></commonTable> -->
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="delOrgDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="delOrgReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 编辑机构弹窗 -->
                    <el-dialog
                        :visible.sync="editOrgDialog"
                        class="qinjeeDialogSmall"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">新增机构</span>
                        <div class="qinjeeDialogSmallCont">
                            <el-form
                                :model="editOrgForm"
                                :rules="rules"
                                ref="editOrgForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                size="small"
                            >
                                <el-form-item label="机构编码" prop="orgCode">
                                    <el-input v-model="editOrgForm.orgCode" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="机构名称" prop="orgName">
                                    <el-input v-model="editOrgForm.orgName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="机构类型" prop="orgType">
                                    <el-select v-model="editOrgForm.orgType" placeholder="请选择">
                                        <div v-for="item in orgTypeList" :key="item.id">
                                            <el-option
                                                :label="item.dictValue"
                                                :value="item.dictCode"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上级机构" prop="orgParentId">
                                    <el-select v-model="editOrgForm.orgParentId" placeholder="请选择">
                                        <el-option
                                            v-for="item in orgParenList"
                                            :key="item.orgParentId"
                                            :label="item.orgName"
                                            :value="item.orgId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="机构负责人" prop="orgManagerId">
                                    <el-select
                                        v-model="editOrgForm.orgManagerName"
                                        placeholder="输入查找"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in orgManagerList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="editOrgDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="editOrgReq('editOrgForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane name="orgPic">
                    <span slot="label">
                        <i class="qj-map"></i>机构图
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import {
    orgRepair_api1,
    orgRepair_api2,
    orgRepair_api3,
    orgRepair_api4,
    orgRepair_api5,
    orgRepair_api6
} from "../../request/api";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";

export default {
    name: "repair" /* 机构维护 */,
    data() {
        return {
            value: "true",
            treeData: {
                data: [] /* 必须，树形结构数据 */,
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childList" /* 必须，子集key */,
                    label: "orgName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "GROUP" /* 必须，key对应的值 */,
                        icon: "qj-jituan" /* 必须，图标类名 */
                    },
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "UNIT" /* 必须，key对应的值 */,
                        icon: "qj-danwei" /* 必须，图标类名 */
                    },
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "DEPT" /* 必须，key对应的值 */,
                        icon: "qj-nav_client" /* 必须，图标类名 */
                    }
                ],
                showDefaultIcon: false /* 非必须，是否显示默认图标 */,
                nodeClick: this
                    .nodeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            },
            activeName: "orgForm",
            orgTable: {
                head: [
                    {
                        name: "机构名称",
                        key: "orgName",
                        isShow: true,
                        width: "200px"
                    },
                    { name: "封存", key: "isEnable", isShow: true },
                    { name: "机构编码", key: "orgCode", isShow: true },
                    { name: "机构类型", key: "orgType", isShow: true },
                    { name: "上级机构", key: "orgParentName", isShow: true },
                    { name: "部门负责人", key: "orgManagerName", isShow: true },
                    { name: "机构全称", key: "orgFullName", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button",
                        text: "新增",
                        btnType: "primary",
                        method: this.addOrg
                    },
                    {
                        type: "button",
                        text: "编辑",
                        btnType: "plain",
                        method: this.editOrg
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delOrg
                    },
                    {
                        type: "buttons",
                        text: "更多操作",
                        btnType: "plain",
                        icon: "",
                        defaultIconHide: false,
                        list: [
                            { text: "封存", method: this.btn1 },
                            { text: "解封", method: this.btn2 },
                            { text: "合并", method: this.btn2 },
                            { text: "划转", method: this.btn2 },
                            { text: "排序", method: this.btn2 },
                            { text: "模板下载", method: this.btn2 },
                            { text: "导入", method: this.btn2 },
                            { text: "导出", method: this.btn2 }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.orgSelectChange,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageResize: false,
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this.orgPageSizeChange,
                pageChange: this.orgPageChange,
                formatter: this.formatter
            },
            orgParent: "", //获取机构表的Id
            currentPage: 1,
            pageSize: 10,
            // 新增机构弹窗
            addOrgDialog: false,
            addOrgForm: {
                orgCode: "",
                orgName: "",
                orgType: "",
                orgParentId: "",
                orgManagerId: ""
            },
            rules: {
                orgName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                orgType: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                orgParentId: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                orgManagerId: [
                    { required: true, message: "请输入", trigger: "blur" }
                ]
            },
            orgTypeList: [],
            orgParenList: [],
            orgManagerList: [
                { label: "负责人", value: "1" },
                { label: "负责人001", value: "2" }
            ],
            maxCodeAdd: "",
            //删除机构
            DelOrgTable:{
                head: [
                    {
                        name: "机构名称",
                        key: "orgName",
                        isShow: true,
                        width: "200px"
                    },
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.orgDelChange,
            },
            delOrgList: [],
            delOrgDialog: false,
            //编辑机构
            editOrgDialog: false,
            editOrglist: [],
            editOrgForm: {}
        };
    },
    components: {
        tree,
        commonTable
    },
    mounted() {
        this.getTreeReq();
    },
    methods: {
        //编辑机构--弹出框
        editOrg() {
            if (this.editOrglist.length != 1) {
                this.$message.error("编辑机构当前必须只能选中一个");
                return;
            }
            this.getOrgType(); //获取所有数据类型
            this.editOrgForm = { ...this.editOrglist[0]};
            this.editOrgDialog = true;
        },
        //编辑机构--请求接口
        editOrgReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let send = this.editOrgForm;
                    orgRepair_api6(send, res => {
                        base.log("s", "编辑机构", send);
                        base.log("r", "编辑机构", res.data);                       
                        if (res.data.success) {
                            this.editOrgDialog = false;
                            this.getOrgTable();
                     this.getOrgTable();
                            this.$message.success('编辑成功')
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //删除机构--选中表格数据,编辑机构--选中表格数据
        orgSelectChange(node) {
            console.log(node);

            this.delOrgList = node; //删除数据赋值
            this.DelOrgTable.data = this.editOrglist //删除数据

            this.editOrglist = node; //编辑数据赋值
            
        },
        orgDelChange(node){
            
        },
        //删除机构--表格点击按钮
        delOrg() {
            if (this.delOrgList.length === 0) {
                this.$message.error("未选中机构");
                return;
            }
            this.delOrgDialog = true;
        },
        //删除机构--请求接口
        delOrgReq() {
            let send = this.delOrgList.map(item => item.orgId);
            orgRepair_api5(send, res => {
                base.log("s", "删除机构", send);
                base.log("r", "删除机构", res.data);
                if (res.data.success) {
                     this.getOrgTable();
                    this.delOrgDialog = false;
                     this.$message.success('删除成功')
                } else {
                    base.error(res.data);
                }
            });
        },

        //新增机构--弹出弹框
        addOrg() {
            this.addOrgDialog = true;
            this.getOrgType(); //获取所有机构类型
            this.addOrgForm.orgName = "";
            this.addOrgForm.orgManagerId = "";
            if (this.orgParent.length === 0) {
                this.addOrgForm.orgCode = "";
                return;
            }
            this.addOrgForm.orgCode = Number(this.maxCodeAdd);
            this.addOrgForm.orgParentId = this.orgParent.orgId;
        },
        // 新增机构--请求接口
        addOrgReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // let send = {
                    //     orgManagerId: this.addOrgForm.orgManagerId,
                    //     orgName: this.addOrgForm.orgName,
                    //     orgType: this.addOrgForm.orgType,
                    //     orgParentId: this.addOrgForm.orgParentId
                    // };
                    let send = this.addOrgForm
                    orgRepair_api4(send, res => {
                        base.log("s", "新增机构", send);
                        base.log("r", "新增机构", res.data);
                        if (res.data.success) {
                            this.addOrgDialog = false;
                            this.$message.success('新增成功')
                            this.getTreeReq();
                            this.getOrgTable();
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 新增机构--获取所有机构类型
        getOrgType() {
            let send = {
                dictType: "ORG_TYPE"
            };
            orgRepair_api3(send, res => {
                base.log("s", "获取所有机构类型", send);
                base.log("r", "获取所有机构类型", res.data);
                if (res.data.success) {
                    this.orgTypeList = res.data.result;
                } else {
                    base.error(res.data);
                }
            });
        },
        //新增机构--获取最大下级机构的编码
        getMaxOrgCode(parentrOrg) {
            if (parentrOrg.childList) {
                // console.log(parentrOrg.childList);
                let orgCode = parentrOrg.childList.map(item => item.orgCode);
                let maxCode = Math.max.apply(this, orgCode);
                this.maxCodeAdd = maxCode + 1;
            } else {
                this.maxCodeAdd = parentrOrg.orgCode + "01";
            }
        },

        //机构表--页码改变
        orgPageChange(page) {
            this.currentPage = page;
            this.getOrgTable();
        },
        //机构表--页容量改变
        orgPageSizeChange(pageSize) {
            this.table.pageResize = true
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.getOrgTable();
        },
        //机构表--格式化数据
        formatter(key, val) {
            if (key == "isEnable") {
                val = val == 1 ? "是" : "否";
                return val;
            } else if (key == "orgType") {
                if (val == "GROUP") {
                    return "集团";
                } else if (val == "UNIT") {
                    return "单位";
                } else if (val == "DEPT") {
                    return "部门";
                }
            } else {
                return val;
            }
        },
        //机构表--获取表格数据
        getOrgTable() {
            let send = {
                currentPage: this.currentPage,
                isEnable: this.value ? 1 : 0,
                orgParentId: this.orgParent.orgId,
                pageSize: this.pageSize,
                querFieldVos: []
            };
            orgRepair_api2(send, res => {
                base.log("s", "机构表", send);
                base.log("r", "机构表", res.data);
                if (res.data.success) {
                    this.orgTable.data = res.data.result.list;
                    this.orgTable.total = res.data.result.total;
                    this.table.pageResize = false;
                } else {
                    base.error(res.data);
                }
            });
        },
        //tab栏点击
        handleClick(tab) {
            if (tab.name == "orgForm") {
                console.log("机构表");
            } else if (tab.name == "orgPic") {
                console.log("机构图");
            }
        },

        //树形--节点点击
        nodeClick(node) {
            console.log(node);

            this.orgParent = node;
            this.getOrgTable(); //获取机构表
            this.getMaxOrgCode(node); //获取最大下级机构编码

            this.orgParenList = [node]; //获取上级机构
        },
        //树形--封存
        switchChange() {
            console.log("封存状态");
            this.getTreeReq();
        },
        //树形--获取树形
        getTreeReq() {
            let send = {
                isEnable: this.value ? 1 : 0
            };
            orgRepair_api1(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result.list;
                } else {
                    base.error(d);
                }
            });
        }
    }
};
</script>