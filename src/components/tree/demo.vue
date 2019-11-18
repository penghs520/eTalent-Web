<style scoped>

</style>

<template>
    <div id="treeDemo">
        <h1>树形结构</h1>
        <tree :treeData="treeData" ></tree>
    </div>
</template>

<script>
import tree from './tree.vue'

export default {
    name: 'treeDemo',           /* 树形结构  demo */
    components: {tree},
    data() {
        return {
            treeData: {
                data: Array,                /* 必须，树形结构数据 */
                props: {                    /* 必须，树形结构数据绑字段配置 */
                    children: String,       /* 必须，子集key */
                    label: String           /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [                    /* 非必须，树形结构层级图标配置 */
                    {
                        key: String,            /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */
                        val: String,            /* 必须，key对应的值 */
                        icon: String            /* 必须，图标类名 */
                    }
                ],
                showDefaultIcon: false,     /* 非必须，是否显示默认图标 */
                nodeClick: this.nodeClick   /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            }
        };
    },
    mounted() {},
    methods: {
        // 节点被点击
        nodeClick(node) {
            console.log('节点被点击')
            console.log(node)
        },
    }
}
</script>