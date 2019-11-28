<style scoped lang="scss">
#archives_info {
    display: flex;
    height: 100%;
    text-align: left;
    .wrap {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding: 24px 0px 0px 24px;
        box-sizing: border-box;
        background-color: #fff;
    }
}
</style>

<template>
    <div id="archives_info">
        <div class="wrap">
            <commonTable :table="archivesTable" ref="commonTable"></commonTable>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import commonTable from "../../components/table/commonTable";
import { archives_api1 } from "../../request/api";

export default {
    name: "archives_info" /* 档案管理-信息维护 */,
    components: {
        commonTable
    },
    data() {
        return {
            archivesTable: {
                head: [
                    /* 必须，表格头配置 */
                    { name: "姓名", key: "userName", isShow: true },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    { name: "单位", key: "businessUnitName", isShow: true },
                    { name: "部门", key: "orgName", isShow: true },
                    { name: "岗位", key: "postName", isShow: true },
                    { name: "入职日期", key: "firstWorkDate", isShow: true },
                    {
                        name: "试用期到期日期",
                        key: "probationDueDate",
                        isShow: true
                    },
                    {
                        name: "直接上级",
                        key: "supervisorUserName",
                        isShow: true
                    },
                    { name: "联系电话", key: "tel", isShow: true },
                    { name: "任职类型", key: "attritionType", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        method: this
                            .add /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delet
                    },
                    {
                        type: "button",
                        text: "打印",
                        btnType: "plain",
                        method: this.print
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "plain",
                        list: [
                            /* 必须，更多按钮的数据组成的数组 */
                            { text: "删除恢复", method: this.deleteRecover },
                            { text: "兼职维护", method: this.partTimeJob },
                            { text: "自定义导出", method: this.download }
                        ]
                    }
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange
            },
        };
    },
    mounted() {
        this.getInfoReq();
    },
    methods: {
        //获取档案 -- 请求接口
        getInfoReq() {
            let send = {
                Integer: 28,
                comanyId: 28
            };
            base.log("s", "获取档案信息", send);
            archives_api1(send, res => {
                base.log("r", "获取档案信息", res.data);
                if (res.data.success) {
                    this.archivesTable.data = res.data.result.list;
                    this.archivesTable.total = res.data.result.total;
                } else {
                    base.error(res.data);
                }
            });
        },

        // 新增
        add() {
            this.$message.warning("点击新增");
        },

        // 删除
        delet(searchData, radioData, checkboxData) {
            this.$message.warning("点击删除");
        },

        // 打印
        print(searchData, radioData, checkboxData) {
            this.$message.warning("点击打印");
        },

        // 删除恢复
        deleteRecover() {},

        // 兼职维护
        partTimeJob(searchData, radioData, checkboxData) {},

        // 自定义导出
        download(searchData, radioData, checkboxData) {},

        // 改变页容量
        pageSizeChange(size) {},

        // 翻页
        pageChange(index) {}
    }
};
</script>