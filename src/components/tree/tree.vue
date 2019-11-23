<style scoped lang="scss">
.tree {
    width: 100%;
}
.treeIcon {
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
.treeNode {
    font-size: 14px;
    color: #676b6d;
}
.title{
    // margin: 0 auto;
    .switch_title {
            display: inline-block;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 20px;
        }
}
</style>

<template>
    <div id="componentsTree">
        <div class="title" v-if="treeData.switchOpen">
            <span class="switch_title">显示封存:</span>
            <el-switch
                v-model="switchValue"
                active-color="#19ADE6"
                inactive-color="#ccc"
                @change="switchChange"
            ></el-switch>
        </div>
        <el-tree
            class="tree"
            :data="treeData.data"
            :props="treeData.props"
            ref="serverTree"
            :node-key="treeData.nodeKey"
            @node-click="treeNodeClick"
            @check="checkClick"
            :show-checkbox="treeData.showCheckbox"
            :default-expand-all="treeData.showAllNode"
            :highlight-current="true"
            :icon-class="showDefaultIcon(treeData.showDefaultIcon)"
        >
            <span slot-scope="{ node, data }">
                <span
                    v-for="(item,index) in icons"
                    :key="index"
                    v-show="data[item.key] === item.val"
                    class="treeIcon"
                    :class="item.icon"
                ></span>
                <span class="treeNode">{{node.label}}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "tree" /* 树形结构*/,
    props: {
        treeData: Object
    },
    data() {
        return {
            icons: [], /* icon图标 */
            switchValue:""
        };
    },
    created() {
        if (this.treeData.icons) {
            this.icons = this.icons.concat(this.treeData.icons);
        }
    },
    watch: {
        treeData: {
            handler: function(val) {
                if (val.data && val.defaultChecked && this.treeData.nodeKey) {
                    setTimeout(() => {
                        let checkedNodeList = this.getHasMenu(
                            val.data,
                            val.defaultChecked.nodeTypeKey,
                            val.defaultChecked.nodeTypeVal,
                            val.defaultChecked.childKey,
                            val.defaultChecked.hasKey
                        );
                        this.$refs.serverTree.setCheckedKeys(
                            checkedNodeList.map(item => {
                                return item[this.treeData.nodeKey];
                            })
                        );
                    }, 0);
                }
            },
            deep: true
        }
    },
    methods: {
        //封存的回调
        switchChange(newVal) {
            if (this.treeData.switchChange) {
                this.treeData.switchChange(newVal);
            }
        },
        treeNodeClick(node) {
            if (this.treeData.nodeClick) {
                this.treeData.nodeClick(node);
            }
        },
        showDefaultIcon(isShow) {
            let result = isShow ? "" : "hideDefaultIcon";
            return result;
        },

        //多选框点击
        checkClick(data, checkedData) {
            if (this.treeData.checkClick) {
                this.treeData.checkClick(data, checkedData);
            }
        },

        // 获取已有权限的节点
        /**
         * @param {Array}   list        要处理的数据
         * @param {String}  nodeTypeKey 要处理的节点的数据的某个字段
         * @param {String}  nodeTypeVal nodeTypeKey对应的值,从节点数据中取nodeTypeKey的值,如果等于nodeTypeVal,就对该节点进行操作
         * @param {String}  childKey    节点的子集字段
         * @param {String}  hasKey      判断规则
         */
        getHasMenu(list, nodeTypeKey, nodeTypeVal, childKey, hasKey) {
            let nodeList = new Array();
            this.getNode(list, nodeList, nodeTypeKey, nodeTypeVal, childKey);
            let result = nodeList.filter(item => {
                return item[hasKey];
            });
            return result;
        },

        // 获取权限node节点
        getNode(list, resultList, nodeTypeKey, nodeTypeVal, childKey) {
            list.forEach(item => {
                if (item[nodeTypeKey] === nodeTypeVal) {
                    resultList.push(item);
                } else {
                    this.getNode(item[childKey], resultList);
                }
            });
        }
    }
};
</script>