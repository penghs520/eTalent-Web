<template>
    <div>
        <!-- 树形下拉框 -->
        <el-select v-model="checkedName" ref="selectTree" popper-class="base_treeSelect" style="width:100%" >
            <el-option  :label="checkedName" :value="checkedName" >
                <tree :treeData="treeData"></tree>
            </el-option>
        </el-select>
    </div>
</template>

<script>
import tree from '../../components/tree/tree';

export default {
    name: 'selectTree',
    components: {tree},
    data() {
        return {
            checkedName: '',
            checkedValue: '',
            treeData:{                                  /* tree按照树形结构封装的赋值，需要注意的是该对象下有注释的3个属性 */
                data: [],
                nodeKey: 'org_id',
                props: {
                    children: 'list',
                    label: 'org_name'
                },
                showDefaultIcon: true,                  /* 显示树形默认图标 */
                nodeClick: this.selectTreeNodeClick,    /* 节点被点击的方法 */
                defaultIconExpandNode: true,            /* 点击树形默认图标时才可以对子节点进行展开收起操作 */
            }
        }
    },
    method: {
        // DOM上的 popper-class="base_treeSelect" 不能去掉，为样式服务
        
        /**
         * 该方法中要做3件事情
         * 1.给select绑定的变量赋 要显示的值
         * 2.给变量赋用到的节点id（一般后台要的都是节点id，而不是节点名称）
         * 3.手动操作使得下拉框收起来
         */
        selectTreeNodeClick(node) {
            // 该方法中要做
            this.checkedName = node.org_name;
            this.checkedValue = node.org_id;
            this.$refs.selectTree.blur();
        },
    }
}
</script>