<style lang="scss" scoped>
#organization_jobDescription {
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
        padding: 24px 0px 0px 24px;
        border-bottom: none;
        box-sizing: border-box;
        overflow: auto;
        text-align: left;
        background-color: #fff;
    }
}
</style>
<template>
    <div id="organization_jobDescription">
        <div class="side_tree">
            <tree :treeData="postTree"></tree>
        </div>
        <div class="content">
            岗位说明书
        </div>
    </div>
</template>
<script>
import tree from "../../components/tree/tree";
import { postRepair_api1 } from "../../request/api";
import base from "../../assets/js/base";

export default {
    name: "jobDescription" /* 岗位维护 */,
    components: {
        tree
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
            isEnable: ""
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
            postRepair_api1(send, res => {
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
            this.getPostTree();
        },
        //岗位树--节点被点击
        nodeClick(node) {
            console.log(node);
        }
    }
};
</script>