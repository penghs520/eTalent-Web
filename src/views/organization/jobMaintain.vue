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
        padding:24px 0px 0px 24px;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
    }
}
</style>
<template>
    <div id="organization_jobMaintain">
        <div class="side_tree">
            <tree :treeData="postTree"></tree>
        </div>
        <div class="content">
           <commonTable :table="postTable"></commonTable>
        </div>
    </div>
</template>
<script>
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import { postRepair_api } from "../../request/api";
import base from "../../assets/js/base";

export default {
    name: "jobMaintain" /* 岗位维护 */,
    components: {
        tree,
        commonTable
    },
    data() {
        return {
            postTree: {
                data: [],
                props: {
                    children: "childList",
                    label: "orgName"
                },
                icons: [
                    /* 非必须，树形结构层级图标配置 */
                    {
                        key:
                            "orgType" /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: "GROUP" /* 必须，key对应的值 */,
                        icon:
                            "qj-jituan" /* 必须，图标类名 * /
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
                switchOpen: true,
                switchChange: this.switchChange,
                showDefaultIcon: true,
                nodeClick: this.nodeClick
            },
            isEnable: "",
            postTable: {
                head: [
                    { name: "封存", key: "isEnable", isShow: true},
                    { name: "历任", key: "orgCode", isShow: true },
                    { name: "岗位编码", key: "orgType", isShow: true },
                    { name: "岗位名称", key: "orgParentName", isShow: true },
                    { name: "所属部门", key: "orgManagerName", isShow: true },
                    { name: "职位名称", key: "orgFullName", isShow: true },
                    { name: "上级岗位", key: "orgFullName", isShow: true },
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
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
                showSelect: true /* 非必须，是否显示select勾选框 */,
                selectChange: this.postSelectChange,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [10, 20, 30] /* 非必须，页码可选的每页数量 */,
                    pageSize: 10 /* 非必须，默认每页显示的数量 */
                },
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this.postPageSizeChange,
                pageChange: this.postPageChange,
                formatter: this.formatter
            },
        };
    },
    mounted() {
        this.getPostTree();
    },
    methods: {
        //岗位树-- 获取岗位树请求
        getPostTree() {
            let send = {
                isEnable: this.isEnable ? 0 : 1
            };
            base.log("s", "获取岗位树", send);
            postRepair_api(send, res => {
                base.log("r", "获取岗位树", res.data);
                if (res.data.success) {
                    let newTree = JSON.parse(JSON.stringify(res.data.result));
                    this.postTreeFormatter(newTree);
                    this.postTree.data = newTree;
                } else {
                    base.error(res.data);
                }
            });
        },
        //岗位数--格式化岗位树
        postTreeFormatter(newTree) {
            for (let i = 0; i < newTree.length; i++) {
                let temp = newTree[i];
                if (temp.childList) {
                    this.postTreeFormatter(temp.childList);
                    if (temp.postList) {
                        temp.postList.forEach(item => {
                            item.orgName = item.postName;
                        });
                        temp.childList.push(...temp.postList);
                    }
                } else if (!temp.childList && temp.postList) {
                    temp.postList.forEach(item => {
                        item.orgName = item.postName;
                    });
                    temp.childList = temp.postList;
                }
            }
        },
        //岗位数--封存开关改变
        switchChange(val) {
            this.isEnable = val;
            this.getPostTree();
        },
        //岗位树--节点被点击
        nodeClick(node) {
            console.log(node);
        }
    }
};
</script>