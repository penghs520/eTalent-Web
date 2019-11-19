<style scoped lang="scss">
#authority_search {
    display: flex;
    height: 100%;
    text-align: left;
    background-color: #f0f0f0ff;
    .sideTree {
        width: 216px;
        .el-card {
            height: 100%;
        }
    }
    .content {
        flex: 1;
        height: 100%;
        padding: 16px 0px 0px 16px;
        .el-card {
            height: 100%;
        }
    }
}
</style>
<template>
    <div id="authority_search">
        <div class="sideTree">
            <el-card class="box-card">123</el-card>
        </div>
        <div class="content">
            <el-card class="box-card">
                <commonTable :table="table"></commonTable>
            </el-card>
        </div>
    </div>
</template>
<script>
import base from "../../assets/js/base";
import tree from "../../components/tree/tree";
import commonTable from "../../components/table/commonTable";
import { userCheck_api1, userCheck_api2 } from "../../request/api";

export default {
    name: "search" /* 角色反查 */,
    components: {
        commonTable
    },
    data() {
        return {
            table: {
                head: [
                    /* 必须，表格头配置 */
                    {
                        name: "姓名" /* 必须，表格头所显示的文字 */,
                        key:
                            "userName" /* 必须，该列要显示的数据所对应的变量的字符串格式 */,
                        isShow: true /* 必须，表格是否默认显示该列 */,
                        width: "200px" /* 非必须，该列的默认宽度 */
                    },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    { name: "单位", key: "businessUnitName", isShow: true },
                    { name: "部门", key: "deptName", isShow: true },
                    { name: "岗位名称", key: "postName", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "input" /* 输入框 */,
                        placeholder:
                            "请输入工号或姓名" /* 非必须，输入框提示语 */,
                        key: "name" /* 必须，输入框绑定的变量字符串 */,
                        defaultVal: "" /* 非必须，默认值 */,
                        enter: this
                            .search /* 非必须，回车键的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "确定" /* 必须，按钮名称 */,
                        btnType:
                            "primary" /* 非必须，element-ui提供的按钮样式 */,
                        method: this
                            .search /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    }
                ],
                selectChange: this
                    .selectChange /* 非必须，selcet选中改变时的回调，接收1个参数 */,
                page: {
                    /* 非必须，页码配置 */
                    pageSizes: [2, 4, 6] /* 非必须，页码可选的每页数量 */,
                    pageSize: 4 /* 非必须，默认每页显示的数量 */
                },
                pageHide: false /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */,
                pageSizeChange: this
                    .pageSizeChange /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */,
                pageChange: this
                    .pageChange /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            }
        };
    },
    mounted() {
        let send = {
            currentPage: 1,
            pageSize: 10,
            userName: "QJ"
        };
        this.getTable(send);
    },
    methods: {
        // 获取表格数据
        getTable(send) {
            base.log("s", "查询表格数据", send);
            userCheck_api1(send, res => {
                let d = res.data;
                base.log("r", "查询表格数据", d);
                if (d.success) {
                    this.table.data = d.result.list;
                    this.table.total = d.result.total;
                } else {
                    base.error(d);
                }
            });
        },
        // 查询
        search(val) {
            let send = {
                currentPage: 1,
                pageSize: 10,
                userName: val.name
            };
            this.getTable(send);
        },
        //页码改变
        pageChange(page) {
            console.log('7777777777')
            console.log(page);
            
            // let send = {
            //     currentPage: page,
            //     pageSize: 10,
            //     userName: "QJ"
            // };
        }
    }
};
</script>