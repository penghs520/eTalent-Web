<style scoped lang="scss">
#orgTree {
    height: 100%;
    .side_tree {    
        height: 100%;
        box-sizing: border-box;
        text-align: left;
        .switch_title {
            display: inline-block;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 20px;
        }
    }
}
</style>

<template>
    <div id="orgTree">
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
    </div>
</template>

<script>
import base from "../../assets/js/base";
import { orgRepair_api1 } from "../../request/api";
import tree from "../../components/tree/tree";


export default {
    name: "orgTree" /* 机构维护 */,
    props:[ "orgTree" ],
    data() {
        return {
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
            value:"",
        };
    },
    components: {
        tree,
    },
    mounted() {
        this.getTreeReq();
    },
    methods: {
        //树形节点点击
        nodeClick(node) {
            if(this.orgTree.nodeClick){
                this.orgTree.nodeClick(node)
            }
        },
        //树形封存
        switchChange() {
            this.getTreeReq();
        },
        //获取树形
        getTreeReq() {
            let send = {
                isEnable: this.value ? 1 : 0
            };
            orgRepair_api1(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {
                    this.treeData.data = d.result;
                    // this.orgId = d.result.list[0].orgId;
                } else {
                    base.error(d);
                }
            });
        }
    }
};
</script>
