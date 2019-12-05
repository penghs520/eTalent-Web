<style scoped lang="scss">
#user_info {
    display: flex;
    height: 100%;
    .side_tree {
        width: 216px;
        height: 100%;
        box-sizing: border-box;
        padding: 16px 10px 0px 20px;
        background-color: #fff;
        text-align: left;
    }
    .content {
        flex: 1;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding: 24px;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
    }
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
        #pane-orgPic {
            height: 100%;
        }
    }
}
</style>


<template>
    <div id="user_info">
        <!-- 左侧树形 -->
        <div class="side_tree">
            <tree :treeData="treeData"></tree>
        </div>
        <!-- 右侧表格 -->
        <div class="content">
            <commonTable :table="userTable"></commonTable>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import { org_userInfo_api1, org_userInfo_api2 } from "../../request/api";

export default {
    name: "userInfo", //用户信息
    data() {
        return {
            // value: false,
            //树形
            treeData: {
                data: [],
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
                showDefaultIcon: false,
                nodeClick: this.nodeClick
            },
            orgParent: "",
            currentPage: 1,
            pageSize: 10,
            //表格
            userTable: {
                head: [
                    { name: "姓名", key: "userName", isShow: true },
                    { name: "单位", key: "businessUnitName", isShow: true },
                    { name: "部门", key: "orgName", isShow: true },
                    { name: "岗位", key: "postName", isShow: true },
                    { name: "性别", key: "gender", isShow: true },
                    { name: "联系电话", key: "phone", isShow: true },
                    { name: "电子邮件", key: "email", isShow: true },
                    {
                        name: "直接上级",
                        key: "supervisorUserName",
                        isShow: true
                    },
                    { name: "入职日期", key: "hireDate", isShow: true }
                ],
                data: [],
                total: 0,
                bar: [
                    {
                        type: "button",
                        text: "新增",
                        btnType: "primary",
                        method: this.addInfo
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delInfo
                    },
                    {
                        type: "button",
                        text: "导入",
                        btnType: "plain",
                        method: this.importInfo
                    }
                ],
                showSelect: true,
                selectChange: this.userSelectChange,
                loading: false,
                pageResize: false,
                page: {
                    pageSizes: [10, 20, 30],
                    pageSize: 10
                },
                pageHide: false,
                pageSizeChange: this.userPageSizeChange,
                pageChange: this.userPageChange,
                formatter: this.formatter
            }
        };
    },
    components: {
        tree,
        commonTable
    },
    mounted() {
        this.getOrgTreeReq();
    },
    methods: {
        //表格--多选框
        userSelectChange(val) {},
        //表格 -- 页容量改变
        userPageSizeChange(pageSize) {
            this.userTable.pageResize = true;
            this.currentPage = 1;
            this.pageSize = pageSize;
            this.getTableReq();
        },
        //表格 -- 页码改变
        userPageChange(page) {
            this.currentPage = page;
            this.getTableReq();
        },

        userPageSizeChange() {},
        //表格日期格式化
        formatter(key, val) {
            if (key == "hireDate") {
                val = val.split("T")[0];
                return val;
            } else {
                return val;
            }
        },
        //员工表格 --获取表格请求
        getTableReq() {
            let send = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                orgId: this.orgParent.orgId,
                querFieldVos: []
            };
            base.log("s", "获取表格", send);
            org_userInfo_api2(send, res => {
                base.log("r", "获取表格", res.data);
                if (res.data.success) {
                    this.userTable.data = res.data.result.list;
                    this.userTable.total = res.data.result.total;
                    this.userTable.pageResize = false;
                } else {
                    base.error(res.data);
                }
            });
        },

        //树形--节点点击
        nodeClick(node) {
            console.log(node);
            this.orgParent = node;
            this.currentPage = 1
            this.userTable.pageResize = true;
            this.getTableReq();
        },
        //树形--获取树形请求
        getOrgTreeReq() {
            let send = {
                isEnable : 0
            }
            org_userInfo_api1(send, res => {
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