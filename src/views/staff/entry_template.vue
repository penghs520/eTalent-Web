<style lang="scss" scoped>
#staff_contract_params {
    display: flex;
    height: 100%;
    text-align: left;
    .content {
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
    <div id="staff_contract_params">
        <div class="content">
            <commonTable :table="regTable"></commonTable>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import commonTable from "../../components/table/commonTable";

export default {
    name: "contract_params",
    data() {
        return {
            regTable: {
                head: [
                    {
                        name: "填写",
                        key: "userName",
                        isShow: true,
                        width: "200px"
                    },
                    { name: "二维码", key: "employeeNumber", isShow: true },
                    { name: "创建人", key: "employeeNumber", isShow: true },
                    { name: "创建时间", key: "employeeNumber", isShow: true },
                ],
                data: [],
                total: 0,
                bar: [
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        method: this.addTempalte
                    },
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "删除" /* 必须，按钮名称 */,
                        btnType: "plain",
                        method: this.delTempalte
                    }
                ],
                showSelect: true,
                selectChange: this.TempSelectChange,
                perColumn: [
                    {
                        name: "模板名称" /* 必须，该列的表头名称 */,
                        width: "200px" /* 非必须，该列的宽度 */,
                        list: [
                            {
                                type: "primary",
                                text:
                                    "入职登记模板" /* 必须，按钮上显示的文字 */,
                                method: this.columnBtn
                            }
                        ]
                    }
                ],
                loading: false
            }
        };
    },
    components: {
        commonTable
    },
    methods: {}
};
</script>

