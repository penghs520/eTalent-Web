<style scoped lang="scss">
@import url(../../assets/js/orgChart/orgchart-webcomponents.css);
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
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
        .org_table {
            margin-top: 18px;
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

.operation {
    padding: 18px 24px;
}
.chart {
    margin: 0 24px 18px 24px;
    border: 1px solid rgba(241, 242, 242, 1);
}
//排序弹窗
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
<style lang="scss">
.organization_repair_tabsBar {
    height: 100%;
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
            <!-- 机构表 -->
            <el-tabs
                v-model="activeName"
                class="organization_repair_tabsBar"
                @tab-click="handleClick"
            >
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
                        <span slot="title">确认删除</span>
                        <div class="qinjeeDialogSmallMini">
                            <div>
                                <p class="comf">
                                    <i class="el-icon-question"></i>确认删除下表选中的机构吗?
                                </p>
                                <p class="wait_del">待删除机构</p>
                            </div>
                            <div
                                :class="{ check_wrap : delOrgList.length > 1 }"
                                class="check_wrap2"
                            >
                                <el-checkbox
                                    :indeterminate="isIndeterminate"
                                    v-model="checkAll"
                                    @change="CheckAllChange"
                                    v-if="delOrgList.length > 1"
                                    class="check_all"
                                >全选</el-checkbox>
                                <el-checkbox-group v-model="delCheckedList" @change="checkedResult">
                                    <div
                                        v-for="(item,index) in delOrgList"
                                        :key="index"
                                        :class="{check_box : delOrgList.length > 1}"
                                    >
                                        <el-checkbox :label="item">{{item.orgFullName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
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
                        <span slot="title">编辑机构</span>
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
                                    <el-input v-model="editOrgForm.orgCode"></el-input>
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
                    <!-- 封存机构弹窗 -->
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
                                    <i class="el-icon-question"></i>确认封存下表选中的机构吗?
                                </p>
                                <p class="wait_del">待封存机构</p>
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
                                        <el-checkbox :label="item">{{item.orgFullName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="notEnableDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="notEnableReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 解封机构弹窗-->
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
                                    <i class="el-icon-question"></i>确认解封下表选中的机构吗?
                                </p>
                                <p class="wait_del">待解封机构</p>
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
                                        <el-checkbox :label="item">{{item.orgFullName}}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="EnableDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="EnableReq">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 合并机构弹窗 -->
                    <el-dialog
                        :visible.sync="mergeDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">机构合并</span>
                        <div class="qinjeeDialogSmallMini">
                            <!-- 合并机构 -->
                            <el-form
                                :model="mergeForm"
                                :rules="rules"
                                ref="mergeForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                size="mini"
                            >
                                <el-form-item label="新机构名称" prop="newOrgName">
                                    <el-input v-model="mergeForm.newOrgName" placeholder="请输入"></el-input>
                                </el-form-item>
                                <!-- 合并机构选择框 -->
                                <el-form-item label="待合并机构">
                                    <div class="merge_check">
                                        <el-checkbox
                                            :indeterminate="mergeisIndet"
                                            v-model="mergeAll"
                                            @change="mergeAllChange"
                                            v-if="mergeList.length > 1"
                                            class="check_all"
                                        >全选</el-checkbox>
                                        <el-checkbox-group
                                            v-model="mergeCheckedList"
                                            @change="mergeChange"
                                        >
                                            <div
                                                v-for="(item,index) in mergeList"
                                                :key="index"
                                                :class="{check_box : mergeList.length > 1}"
                                            >
                                                <el-checkbox :label="item">{{item.orgFullName}}</el-checkbox>
                                            </div>
                                        </el-checkbox-group>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="mergeDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="mergeReq('mergeForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 划转机构弹窗-->
                    <el-dialog
                        :visible.sync="enrolDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">机构划转</span>
                        <div class="qinjeeDialogSmallMini">
                            <!-- 划转机构 -->
                            <el-form
                                :model="enrolForm"
                                :rules="rules"
                                ref="enrolForm"
                                label-width="120px"
                                class="demo-ruleForm"
                                size="mini"
                            >
                                <el-form-item label="选择目标机构" prop="reachOrgName">
                                    <el-select
                                        v-model="enrolForm.reachOrgName"
                                        placeholder="请选择"
                                        ref="selectTree"
                                        popper-class="base_treeSelect"
                                        style="width:100%"
                                    >
                                        <el-option
                                            :label="enrolForm.reachOrgName"
                                            :value="enrolForm.reachOrgName"
                                        >
                                            <tree :treeData="enrolTree"></tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 划转机构选择框 -->
                                <el-form-item label="待划转机构">
                                    <div class="merge_check">
                                        <el-checkbox
                                            :indeterminate="enrolisIndet"
                                            v-model="enrolAll"
                                            @change="enrolAllChange"
                                            v-if="enrolList.length > 1"
                                            class="check_all"
                                        >全选</el-checkbox>
                                        <el-checkbox-group
                                            v-model="enrolCheckedList"
                                            @change="enrolChange"
                                        >
                                            <div
                                                v-for="(item,index) in enrolList"
                                                :key="index"
                                                :class="{check_box : enrolList.length > 1}"
                                            >
                                                <el-checkbox :label="item">{{item.orgFullName}}</el-checkbox>
                                            </div>
                                        </el-checkbox-group>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="enrolDialog = false">取 消</el-button>
                            <el-button
                                size="small"
                                type="primary"
                                @click="enrolReq('enrolForm')"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 机构排序弹窗-->
                    <el-dialog
                        :visible.sync="sortDialog"
                        class="qinjeeDialogMini"
                        :append-to-body="true"
                        :close-on-click-modal="false"
                        center
                    >
                        <span slot="title">机构排序</span>
                        <div class="qinjeeDialogMiniCont">
                            <draggable
                                class="sortComponent"
                                v-model="sortOrgList"
                                group="org"
                                @start="drag=true"
                                @end="drag=false"
                            >
                                <div
                                    class="sortList"
                                    v-for="item in sortOrgList"
                                    :key="item.orgId"
                                >{{item.orgName}}</div>
                            </draggable>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button size="small" @click="sortDialog = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="sortOrgReq">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-tab-pane>
                <!-- 机构图 -->
                <el-tab-pane name="orgPic">
                    <span slot="label">
                        <i class="qj-map"></i>机构图
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
                            <el-button type="primary" size="small" @click="download">导出</el-button>
                        </el-col>
                    </el-row>

                    <div class="chart" id="orgChart"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import OrgChart from "../../assets/js/orgChart/orgchart-webcomponents.js";
import draggable from "vuedraggable";
import {
    orgRepair_api1,
    orgRepair_api2,
    orgRepair_api3,
    orgRepair_api4,
    orgRepair_api5,
    orgRepair_api6,
    orgRepair_api7,
    orgRepair_api8,
    orgRepair_api9,
    orgRepair_api10,
    orgRepair_api11,
    orgRepair_api12,
    orgRepair_api13
} from "../../request/api";

export default {
    name: "repair" /* 机构维护 */,
    data() {
        return {
            value: false,
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
                            { text: "封存", method: this.notEnable },
                            { text: "解封", method: this.Enable },
                            { text: "合并", method: this.mergeOrg },
                            { text: "划转", method: this.enrolOrg },
                            { text: "排序", method: this.sortOrg },
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
                ],
                newOrgName: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                reachOrgName: [
                    { required: true, message: "请选择", trigger: "blur" }
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
            checkAll: true,
            isIndeterminate: false,
            delCheckedList: [],
            delOrgList: [],
            delOrgDialog: false,
            //编辑机构
            editOrgDialog: false,
            editOrglist: [],
            editOrgForm: {},
            //封存机构
            notEnableAll: true,
            isIndet: false,
            notEnableCheckedList: [],
            notEnableList: [],
            notEnableDialog: false,
            //解封机构
            isIndet2: false,
            EnableAll: true,
            EnableCheckedList: [],
            EnableList: [],
            EnableDialog: false,
            //合并机构
            mergeAll: true,
            mergeisIndet: false,
            mergeDialog: false,
            mergeCheckedList: [],
            mergeList: [],
            mergeForm: {
                newOrgName: ""
            },
            //划转机构
            enrolTree: {
                data: [] /* 必须，树形结构数据 */,
                props: {
                    /* 必须，树形结构数据绑字段配置 */
                    children: "childList" /* 必须，子集key */,
                    label: "orgName" /* 必须，菜单节点要显示的文字对应的字段 */
                },
                showDefaultIcon: true /* 非必须，是否显示默认图标 */,
                defaultIconExpandNode: true,
                nodeClick: this
                    .selectTreeClick /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            },
            enrolDialog: false,
            enrolForm: {
                reachOrgName: "",
                reachOrgValue: ""
            },
            enrolAll: true,
            enrolisIndet: false,
            enrolCheckedList: [],
            enrolList: [],
            // 机构图
            direction: "t2b" /* 显示方向 */,
            tier: 0 /* 显示层级 */,
            tierList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] /* 显示层级 */,
            orgChartData: null /* 机构图数据 */,
            //机构排序
            sortDialog: false,
            sortOrgList: []
        };
    },
    components: {
        tree,
        commonTable,
        draggable
    },
    mounted() {
        this.getTreeReq();
    },
    methods: {
        //机构排序--表格按钮
        sortOrg() {            
            this.sortOrgList = [];
            this.getNeedSortOrgReq();
        },
        //机构排序--请求接口
        sortOrgReq() {
            let send = this.sortOrgList.map(item=>item.orgId)
            base.log("s", "排序机构", send);
            orgRepair_api13(send, res => {
                base.log("s", "排序机构", res.data);
                if (res.data.success) {
                    this.sortDialog = false;
                    this.$message.success("排序成功")
                    this.getOrgTable()
                } else {
                    base.error(res.data);
                }
            });
        },
        //机构排序--获取需排序的机构
        getNeedSortOrgReq() {
            let send = {
                orgParentId: this.orgParent.orgId
            };
            base.log("s", "获取需排序机构", send);
            orgRepair_api12(send, res => {
                base.log("s", "获取需排序机构", res.data);
                if (res.data.success) {
                    if(res.data.result.total === 0){
                        this.$message.warning("该机构无下级机构")
                        return
                    }
                    this.sortDialog = true;
                    this.sortOrgList = res.data.result.list;
                } else {
                    base.error(res.data);
                }
            });
        },

        //划转机构--点击树形
        selectTreeClick(node) {
            this.enrolForm.reachOrgName = node.orgName;
            this.enrolForm.reachOrgValue = node.orgId;
            this.$refs.selectTree.blur();
        },
        //划转机构--点击按钮
        enrolOrg() {
            if (this.enrolList.length < 1) {
                this.$message.warning("请选择至少一个机构");
                return;
            }
            this.enrolDialog = true;
            this.enrolCheckedList = this.enrolList;
        },
        //划转机构--弹出框全选
        enrolAllChange(val) {
            this.enrolCheckedList = val ? this.enrolList : [];
            this.enrolisIndet = false;
        },
        //划转机构--弹出框多选
        enrolChange(value) {
            let checkedCount = value.length;
            this.enrolAll = checkedCount === this.enrolList.length;
            this.enrolisIndet =
                checkedCount > 0 && checkedCount < this.enrolList.length;
        },
        //划转机构--请求接口
        enrolReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let orgIds = this.enrolCheckedList.map(item => item.orgId);
                    let send = {
                        orgIds: orgIds,
                        targetOrgId: this.enrolForm.reachOrgValue
                    };
                    base.log("s", "划转机构", send);
                    orgRepair_api10(send, res => {
                        base.log("r", "划转机构", res.data);
                        if (res.data.success) {
                            this.enrolDialog = false;
                            this.$message.success("划转成功");
                            this.getOrgTable();
                            this.getTreeReq();
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //合并机构--弹出框全选
        mergeAllChange(val) {
            this.mergeCheckedList = val ? this.mergeList : [];
            this.mergeisIndet = false;
        },
        //合并机构--弹出框多选
        mergeChange(value) {
            let checkedCount = value.length;
            this.mergeAll = checkedCount === this.mergeList.length;
            this.mergeisIndet =
                checkedCount > 0 && checkedCount < this.mergeList.length;
        },
        //合并机构--点击按钮
        mergeOrg() {
            if (this.mergeList.length < 2) {
                this.$message.warning("请选择2个以上的机构");
                return;
            }
            this.mergeAll = true;
            this.mergeCheckedList = this.mergeList;
            this.mergeDialog = true;
        },
        //合并机构--请求接口
        mergeReq(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let orgIds = this.mergeCheckedList.map(item => item.orgId);
                    let send = {
                        newOrgName: this.mergeForm.newOrgName,
                        orgIds: orgIds,
                        parentOrgId: this.orgParent.orgId
                    };
                    base.log("s", "合并机构", send);
                    orgRepair_api9(send, res => {
                        base.log("r", "合并机构", res.data);
                        if (res.data.success) {
                            this.$message.success("合并成功");
                            this.mergeDialog = false;
                            this.getOrgTable();
                            this.getTreeReq();
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //解存--点击按钮
        Enable() {
            let status = this.EnableList.find(item => item.isEnable === 1); //数据中有未封存的数据
            if (this.EnableList.length === 0 || status) {
                this.$message.warning("请选择已封存的机构");
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
            console.log("点击");
            let send = this.EnableCheckedList.map(item => item.orgId);
            if (send.length === 0) {
                this.$message.warning("请选择解封机构");
                return;
            }
            orgRepair_api8(send, res => {
                base.log("s", "解封机构", send);
                base.log("r", "解封机构", res.data);
                if (res.data.success) {
                    this.$message.success("解封成功");
                    this.getOrgTable(); //刷新表格
                    this.EnableDialog = false;
                } else {
                    base.error(res.data);
                }
            });
        },

        //封存--点击按钮
        notEnable() {
            let status = this.notEnableList.find(item => item.isEnable === 0); //找出已封存的数据
            console.log("封存状态", status);
            if (this.notEnableList.length === 0 || status) {
                this.$message.warning("请选择未被封存的机构");
                return;
            }
            this.notEnableAll = true;
            this.notEnableDialog = true;
            this.notEnableCheckedList = this.notEnableList;
        },
        //封存--全选状态改变
        notEnableAllChange(val) {
            this.notEnableCheckedList = val ? this.notEnableList : [];
            this.isIndet = false;
        },
        //封存--弹出框多选改变
        notEnableChange(value) {
            let checkedCount = value.length;
            this.notEnableAll = checkedCount === this.notEnableList.length;
            this.isIndet =
                checkedCount > 0 && checkedCount < this.notEnableList.length;
        },
        //封存--请求接口
        notEnableReq() {
            let send = this.notEnableCheckedList.map(item => item.orgId);
            orgRepair_api7(send, res => {
                base.log("s", "封存机构", send);
                base.log("r", "封存机构", res.data);
                if (res.data.success) {
                    this.$message.success("封存成功");
                    this.getOrgTable(); //刷新表格
                    this.notEnableDialog = false;
                } else {
                    base.error(res.data);
                }
            });
        },

        //编辑机构--弹出框
        editOrg() {
            if (this.editOrglist.length != 1) {
                this.$message.warning("请选择一个机构");
                return;
            }
            this.getOrgType(); //获取所有数据类型
            this.editOrgForm = { ...this.editOrglist[0] };
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
                            this.$message.success("编辑成功");
                        } else {
                            base.error(res.data);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //删除机构--弹出框全选删除
        CheckAllChange(val) {
            this.delCheckedList = val ? this.delOrgList : [];
            this.isIndeterminate = false;
        },
        //删除机构--弹出框多选删除
        checkedResult(value) {
            console.log(value);

            let checkedCount = value.length;
            this.checkAll = checkedCount === this.delOrgList.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.delOrgList.length;
        },
        //删除机构,编辑机构,封存,解封,合并,划转--多选赋值
        orgSelectChange(node) {
            console.log(node);
            this.delOrgList = node; //删除数据赋值
            this.editOrglist = node; //编辑数据赋值
            this.notEnableList = node; //封存数据赋值
            this.EnableList = node; //封存数据赋值
            this.mergeList = node; //合并数据赋值
            this.enrolList = node; //合并数据赋值
        },
        orgDelChange(node) {},
        //删除机构--表格点击删除按钮
        delOrg() {
            if (this.delOrgList.length === 0) {
                this.$message.warning("未选中机构");
                return;
            }
            this.delOrgDialog = true;
            this.delCheckedList = this.delOrgList;
        },
        //删除机构--请求接口
        delOrgReq() {
            let send = this.delCheckedList.map(item => item.orgId);
            if (send.length === 0) {
                this.$message.warning("未删除机构");
                return;
            }
            orgRepair_api5(send, res => {
                base.log("s", "删除机构", send);
                base.log("r", "删除机构", res.data);
                if (res.data.success) {
                    this.getOrgTable();
                    this.getTreeReq();
                    this.delOrgDialog = false;
                    this.$message.success("删除成功");
                } else {
                    base.error(res.data);
                }
            });
        },

        //新增机构--弹出弹框
        addOrg() {
            if (this.orgParent.length === 0) {
                this.$message.warning("请选择机构");
                // let maxCodeList = this.treeData.data.map(item => item.orgCode);
                // let maxCode = Math.max.apply(this, maxCodeList);
                // this.addOrgForm.orgCode = maxCode + 1;
                // this.rules.orgParentId = [] //构建集团时取消上级机构校验
                return;
            }
            // this.rules.orgParentId = [{ required: true, message: "请输入", trigger: "blur" }]
            this.addOrgForm.orgName = "";
            this.addOrgForm.orgManagerId = "";
            this.getOrgType(); //获取所有机构类型
            this.addOrgDialog = true;
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
                    let send = this.addOrgForm;
                    orgRepair_api4(send, res => {
                        base.log("s", "新增机构", send);
                        base.log("r", "新增机构", res.data);
                        if (res.data.success) {
                            this.addOrgDialog = false;
                            this.$message.success("新增成功");
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
            this.currentPage = 1;
            this.orgTable.pageResize = true;
            this.pageSize = pageSize;
            this.getOrgTable();
        },
        //机构表--格式化数据
        formatter(key, val) {
            if (key == "isEnable") {
                val = val === 1 ? "否" : "是";
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
                isEnable: this.value ? 0 : 1,
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
                    this.orgTable.pageResize = false;
                } else {
                    base.error(res.data);
                }
            });
        },
        //tab栏点击
        handleClick(tab) {
            if (tab.name == "orgForm") {
                console.log("机构表");
                if (this.orgParent) {
                    this.getOrgTable(); //获取机构表
                    this.getMaxOrgCode(this.orgParent); //获取最大下级机构编码
                }
            } else if (tab.name == "orgPic") {
                console.log("机构图");
                if (this.orgParent) {
                    this.getChartData(this.orgParent);
                }
            }
        },

        //树形--节点点击
        nodeClick(node) {
            this.orgParent = node;
            if (this.activeName === "orgForm") {
                this.currentPage = 1;
                this.orgTable.pageResize = true;
                this.getOrgTable(); //获取机构表
                this.getMaxOrgCode(node); //获取最大下级机构编码

                this.orgParenList = [node]; //获取上级机构
            } else if (this.activeName === "orgPic") {
                // 获取机构图
                this.getChartData(node);
            }
        },
        //树形--封存
        switchChange() {
            this.getTreeReq();
        },
        //树形--获取树形
        getTreeReq() {
            let send = {
                isEnable: this.value ? 0 : 1
            };
            orgRepair_api1(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result.list;
                    this.enrolTree.data = d.result.list;
                } else {
                    base.error(d);
                }
            });
        },

        // 获取机构图数据
        getChartData(node) {
            let send = {
                isContainsActualMembers: true,
                isContainsCompiler: true,
                isEnable: Number(this.value),
                layer: 0,
                orgId: node.orgId
            };
            base.log("s", "机构图", send);
            orgRepair_api11(send, res => {
                let d = res.data;
                base.log("r", "机构图", res);
                if (d.success) {
                    this.orgChartData = d.result[0];
                    this.createChart(this.direction, this.tier);
                } else {
                    base.error(d);
                }
            });
        },

        // 显示方向改变
        directionChange(v) {
            this.createChart(v, this.tier);
        },

        // 层级改变
        tierChange(v) {
            this.createChart(this.direction, v);
        },

        // 导出
        download() {},

        // 创建机构图
        /**
         * @param {string} direction    图形显示方向，可能的值：'l2r'-从左到右、't2b'-从上到下
         * @param {number} tier         显示的层级,，0是全显示
         */
        createChart(direction = "t2b", tier) {
            let orgchart = new OrgChart({
                chartContainer: "#orgChart",
                chartClass: "orgchartSingleClassName",
                data: this.orgChartData,
                nodeTitle: "orgName" /* 节点标题字段 */,
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
                                    <img class="personPic" src="${data.attachmentUrl}">
                                    <div class="info">
                                        <p class="text" title="${data.orgManagerName}/${data.orgManagerPositionName}" >${data.orgManagerName}/${data.orgManagerPositionName}</p>
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
                document.querySelector("#orgChart").removeChild(chartNode);
            }
            document.querySelector("#orgChart").appendChild(orgchart);
        }
    }
};
</script>