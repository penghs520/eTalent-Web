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
    }
}
</style>
<template>
    <div id="organization_jobMaintain">
        <div class="side_tree">
            <orgTree :orgTree="orgTreeData"></orgTree>
        </div>
    </div>
</template>
<script>
import orgTree from "./orgTree";

export default {
    name: "orgTreeDemo" /* 岗位维护 */,
    components: {
        orgTree
    },
    data() {
        return {
            orgTreeData: {
                nodeClick: this.orgTreeNodeClick      //点击节点时触发,接收一个参数,节点的数据
            }
        };
    },
    mounted() {},
    methods: {
        orgTreeNodeClick(node) { 
            console.log(node);
        }
    }
};
</script>

