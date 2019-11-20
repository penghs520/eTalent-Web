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
    border: 10px solid #F0F0F0;
    box-sizing: border-box;
    background-color: #fff;
    box-sizing: border-box;
}
.title{
    padding: 20px 24px;
    font-size: 16px;
    line-height: 16px;
    text-align: left;
    color: #676B6D;
    border-bottom: 1px solid #F1F2F2;
    margin-bottom: 16px;
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
                <div class="title" v-if="roleNode">{{roleNode.roleGroupName}}</div>
                <commonTable v-show="roleNode" :table="table" ></commonTable>
            </div>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import commonTable from '../../components/table/commonTable';
import tree from '../../components/tree/tree';
import {user_api1, user_api2} from '../../request/api';

export default {
    name: 'user',             /* 用户授权 */
    components:{tree,commonTable},
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
            },
            roleNode: null,         /* 当前角色节点 */
            table: {
                head: [
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'employeeNumber', isShow: true},
                    {name: '机构名称', key: 'businessUnitName', isShow: true, width: '200px'},
                    {name: '部门', key: 'deptName', isShow: true, width: '400px'},
                    {name: '岗位', key: 'postName', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [                                  /* 非必须，表格上面的操作栏配置 */
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '新增',                   /* 必须，按钮名称 */
                        method: this.add             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '删除',                   /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式 */
                        method: this.delet             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    }
                ],
                perColumn: [                            /* 非必须，表格前置列配置，数组格式，数组中的每个元素就是一列 */
                    {
                        name: '操作',                   /* 必须，该列的表头名称 */
                        width: '60px',                 /* 非必须，该列的宽度 */
                        list: [                         /* 必须，该列中要渲染的按钮，数组格式，数组中每个元素就是一个按钮 */
                            {
                                type: 'primary',        /* 非必须，按钮的样式，element-ui提供的按钮样式 */
                                text: '授权',           /* 必须，按钮上显示的文字 */
                                method: this.power        /* 必须，按钮点击时的回调，该函数接收1个参数：该行的数据 */
                            }
                        ]
                    }
                ],
                loading: false,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            currentPage: 1,
            pageSize: 10,
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
            if (node.roleType === 'ROLE') {
                this.roleNode = node;
                this.getUserTable(node.parentRoleGroupId);
            }
        },

        // 根据角色id查询用户列表
        getUserTable(id) {
            let send = {
                "roleId": id,
                "currentPage": this.currentPage,
                "pageSize": this.pageSize
            };
            this.table.loading = true;
            base.log('s', '查询用户列表', send);
            user_api2(send, res => {
                let d = res.data;
                this.table.loading = false;
                base.log('r', '查询用户列表', d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                }else{
                    base.error(d);
                }
            })
        },

        // 新增
        add() {
            this.table.pageResize = true;
        },

        // 删除
        delet() {
            this.table.pageResize = false;
        },

        // 授权
        power(row) {
            console.log(row)
        },

        // 页码
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getUserTable(this.roleNode.parentRoleGroupId);
        },
        pageChange(index) {
            this.currentPage = index;
            this.getUserTable(this.roleNode.parentRoleGroupId);
        },
    }
}
</script>