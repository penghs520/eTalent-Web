<style scoped>
#authority_user,.mian,.tree,.cont{
    height: 100%;
}
.mian{
    display: flex;
}
.tree{
    width: 216px;
    background-color: #fff;
}
.tree nav{
    padding: 13px 20px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #F1F2F2;
}
.cont{
    width: calc(100% - 216px);
    background-color: #F0F0F0;
    padding: 10px;
    box-sizing: border-box;
}
.cont>div{
    background-color: #fff;
    height: 100%;
}
</style>
<template>
    <div id="authority_user">
        <div class="mian">
            <div class="tree">
                <nav>用户授权</nav>
                <tree :treeData="treeData" ></tree>
            </div>
            <div class="cont">
                <div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import tree from '../../components/tree/tree';
import {user_api1} from '../../request/api';

export default {
    name: 'user',             /* 用户授权 */
    components:{tree},
    data() {
        return {
            treeData: {
                data: [
                    {
                        childRoleGroupList: [],
                        roleGroupName: '角色分类',
                        roleType: 'ROLE_GROUP',
                        roleGroupId: 'top'
                    }
                ],                /* 必须，树形结构数据 */
                props: {                    /* 必须，树形结构数据绑字段配置 */
                    children: 'childRoleGroupList',       /* 必须，子集key */
                    label: 'roleGroupName'           /* 必须，菜单节点要显示的文字对应的字段 */
                },
                icons: [                    /* 非必须，树形结构层级图标配置 */
                    {
                        key: 'roleType',            /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */
                        val: "ROLE_GROUP",            /* 必须，key对应的值 */
                        icon: 'qj-wenjianjia'            /* 必须，图标类名 */
                    },
                    {
                        key: 'roleType',            /* 必须，该节点的数据中的某个字段，如果key的值与val相等，就显示icon */
                        val: "ROLE",            /* 必须，key对应的值 */
                        icon: 'qj-nav_client'            /* 必须，图标类名 */
                    }
                ],
                showDefaultIcon: false,     /* 非必须，是否显示默认图标 */
                nodeClick: this.roleNodeClick   /* 非必须，节点被点击时的回调，接收一个参数：node节点数据 */
            }
        };
    },
    mounted() {
        this.getRoleTree();
    },
    methods: {
        // 获取角色树
        getRoleTree() {
            user_api1(null, res => {
                let d = res.data;
                base.log('r', '获取角色树', d);
                if (d.success) {
                    this.treeData.data[0].childRoleGroupList = d.result;
                }else{
                    base.error(d);
                }
            })
        },

        // 角色树节点被点击
        roleNodeClick(node) {
            console.log(node);
        },
    }
}
</script>