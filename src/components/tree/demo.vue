<style scoped>
</style>

<template>
    <div id="treeDemo">
        <h1>树形结构</h1>
        <tree :treeData="treeData" @nodeClick="domNodeClick" @selectChange="selectChange"></tree>
    </div>
</template>

<script>
import tree from "./tree.vue";

export default {
    name: "treeDemo" /* 树形结构  demo */,
    components: {
        tree
    },
    data() {
        return {
            treeData: {
                data: Array                         /* 必须，树形结构数据 */,
                nodeKey: String                     /* 必须, 节点key，一般选取节点数据中某个字段,一般是id字段 */,
                props: {    
                                                    /* 必须，树形结构数据绑字段配置 */
                    children: String                /* 必须，子集key */,
                    label: String                   /* 必须，菜单节点要显示的文字对应的字段 */
                },  
                icons: [    
                                                    /* 非必须，树形结构层级图标配置 */
                    {   
                        key: String                 /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */,
                        val: String                 /* 必须，key对应的值 */,
                        icon: String                /* 必须，图标类名 */
                    }   
                ],  
                showCheckbox: false                 /* 非必须，是否显示多选框 */,
                checkClick: this.checkClick         /* 非必须，点击多选框事件,接收两个参数,当前选中的节点数据,树中选中的所有节点*/,
                showDefaultIcon: false              /* 非必须，是否显示默认图标 */,
                defaultIconExpandNode: false,       /* 非必须，是否在点击默认图标时才展开或收起子节点，默认false */
                showAllNode: false                  /* 非必须，是否展开所有的子节点*/,
                nodeClick: this.nodeClick 　　　    /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */,
                switchOpen: Boolean 　　            /* 非必须，是否显示封存开关 */,
                switchTitle: String 　　　          /* 非必须，设置开关文字,不设置默认:显示封存 */,
                switchChange: this.switchChange     /* 非必须，接收一个参数,封存开关的值,布尔值 */,
                defaultChecked: {   
                                                    /* 非必须,默认勾选配置 */
                    nodeTypeKey: String             /* 必须,根据此字段来筛选我们想要的节点 */,
                    nodeTypeVal: String             /* 必须,与 nodeTypeKey 对应的值,如果节点中nodeTypeKey的值与该值相等,该节点就是我们想要的节点 */,
                    childKey: String                /* 必须,子集字段 */,
                    hasKey: String                  /* 必须,如果节点中该字段的值经过 Boolean() 格式化后为true,就默认勾选 */
                }
            }
        };
    },
    mounted() {},
    methods: {
        // 节点被点击
        nodeClick(node) {
            console.log("节点被点击");
            console.log(node);
        },

        // 绑在dom上的方法--节点被点击,接收一个参数,节点对象
        domNodeClick(node) {},

        // 绑在dom上的方法--多选框勾选改变,接收一个参数,勾选的节点对象
        selectChange(nodeList) {}
    }
};
</script>