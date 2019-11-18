<style scoped>
.tree{
    width: 100%;
}
.treeIcon{
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
.treeNode{
    font-size: 14px;
    color: #676B6D;
}
</style>

<template>
    <div id="componentsTree">
        <el-tree class="tree" :data="treeData.data" :props="treeData.props" @node-click="treeNodeClick" :highlight-current="true" :icon-class="showDefaultIcon(treeData.showDefaultIcon)" >
            <span slot-scope="{ node, data }">
                <span v-for="(item,index) in icons" :key="index" v-show="data[item.key] === item.val" class="treeIcon" :class="item.icon" ></span>
                <span class="treeNode">{{node.label}}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: 'tree',           /* 树形结构*/
    props: {
        treeData: Object,
    },
    data() {
        return {
            icons: [],          /* icon图标 */
        };
    },
    created() {
        if (this.treeData.icons) {
            this.icons = this.icons.concat(this.treeData.icons);
        }
    },
    methods: {
        treeNodeClick(node) {
            if (this.treeData.nodeClick) {
                this.treeData.nodeClick(node);
            }
        },
        showDefaultIcon(isShow) {
            let result = isShow ? '' : 'hideDefaultIcon';
            return result;
        },
    }
}
</script>