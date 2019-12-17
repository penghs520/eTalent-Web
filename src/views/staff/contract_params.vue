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
        .use_content {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 41px 0px 65px 124px;
            .worker {
                margin-right: 32px;
            }
        }
        .renew_content {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 41px 0px 65px 124px;
        }
        .contract_content {
            width: 726px;
            margin: 41px 0px 0px 124px;
        }
        .result {
            margin: 24px 0px 32px 124px;
            .result_number {
                margin-left: 32px;
                color: #ff8c58;
            }
        }
        .footer_btn {
            display: flex;
            justify-content: center;
        }
    }
    .title {
        display: flex;
        align-items: center;
        .vertical_line {
            display: inline-block;
            width: 4px;
            height: 16px;
            margin-right: 16px;
            background-color: #ff8c58ff;
        }
        span {
            font-size: 16px;
            color: #262626ff;
        }
    }
    .contract_title {
        font-size: 14px;
        margin-bottom: 16px;
    }
    .input_num {
        margin: 0px 8px;
    }
}
</style>
<template>
    <div id="staff_contract_params">
        <div class="content">
            <!-- 适用范围 -->
            <div class="use_scoped">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>适用范围</span>
                </div>
                <div class="use_content">
                    <span class="worker">适合在职人员</span>
                    <el-checkbox-group v-model="workKind" @change="workKindChange" >
                        <el-checkbox
                            v-for="(item,index) in workKindList"
                            :label="item"
                            :key="index"
                        >{{item}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <!-- 续签规则 -->
            <div class="renew">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>续签规则</span>
                </div>
                <div class="renew_content">
                    <span>劳动合同到期签可提前</span>
                    <el-input-number
                        v-model="days"
                        controls-position="right"
                        @change="daysChange"
                        size="small"
                        class="input_num"
                    ></el-input-number>
                    <span>天续签</span>
                </div>
            </div>
            <!-- 合同编号规则 -->
            <div class="contract">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>合同编号规则</span>
                </div>
                <div class="contract_content">
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">前缀固定字符</div>
                                <el-input size="mini" v-model.trim="Prefix" placeholder="请输入"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">日期</div>
                                <el-select
                                    v-model="date"
                                    placeholder="请选择"
                                    size="mini"
                                    @change="dateChange"
                                >
                                    <el-option
                                        v-for="item in dateList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">中间固定字符</div>
                                <el-input size="mini" v-model.trim="Infix" placeholder="请输入"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">流水号</div>
                                <el-select
                                    v-model="serial"
                                    placeholder="请选择"
                                    size="mini"
                                    @change="serialChange"
                                >
                                    <el-option
                                        v-for="item in serialList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">后缀固定字符</div>
                                <el-input size="mini" v-model.trim="Suffix" placeholder="请输入"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="result">
                    <span>合同编号示范:</span>
                    <span class="result_number">{{contractNum}}</span>
                </div>
            </div>
            <!--按钮点击-->
            <div class="footer_btn">
                <el-button plain size="small">取消</el-button>
                <el-button type="primary" size="small" @click="saveSet">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import { params_api1 } from "../../request/api";

export default {
    name: "contract_params",
    data() {
        return {
            workKind: [],
            workKindList: ["正式", "试用", "实习"],
            days: null,
            Prefix: "",
            Infix: "",
            Suffix: "",
            date: "",
            dateList: [
                { value: "", label: "空" },
                { value: "YY", label: "YY(两位年)" },
                { value: "YYYY", label: "YYYY(四位年)" },
                { value: "YYMM", label: "YYMM(两位年两位月)" },
                { value: "YYYYMM", label: "YYYYMM(四位年两位月)" },
                { value: "YYYYMMDD", label: "YYYYMMDD(四位年两位月两位日)" }
            ],
            serial: "",
            serialList: [
                { value: 2, label: "01(两位)" },
                { value: 3, label: "001(三位)" },
                { value: 4, label: "0001(四位)" },
                { value: 5, label: "00001(五位)" },
                { value: 6, label: "000001(六位)" },
                { value: 7, label: "0000001(七位)" }
            ],
            dateFormatter: "",
            serialFormatter: ""
        };
    },
    computed: {
        contractNum() {
            let res =
                this.Prefix +
                this.dateFormatter +
                this.Infix +
                this.serialFormatter +
                this.Suffix;
            return res;
        }
    },
    created() {
        try {
            let params = JSON.parse(localStorage.getItem("contract_params"));
            this.workKind = params.applicationScopeCode;
            this.Prefix = params.contractRulePrefix;
            this.Infix = params.contractRuleInfix;
            this.Suffix = params.contractRuleSuffix;
            this.date = params.dateRule;
            this.serial = params.digitCapacity;
            this.days = params.rememberDays;

            this.dateChange(this.date);
            this.serialChange(this.serial);
        } catch (error) {}
    },
    methods: {
        //保存设置
        saveSet() {
            this.setParamsReq();
        },
        //设置合同参数请求
        setParamsReq() {
            let send = {
                applicationScopeCode: this.workKindList,
                // contractParamDescribe:"",
                // contractParamName:"",
                contractRulePrefix: this.Prefix,
                contractRuleInfix: this.Infix,
                contractRuleSuffix: this.Suffix,
                dateRule: this.date,
                digitCapacity: Number(this.serial),
                rememberDays: this.days
            };
            localStorage.setItem("contract_params", JSON.stringify(send));

            base.log("s", "合同参数设置", send);
            params_api1(send, res => {
                base.log("r", "合同参数设置", res.data);
                if (res.data.success) {
                    this.$message.success("设置成功");
                } else {
                    base.error(res.data);
                }
            });
        },
        //日期选择框切换--格式化
        dateChange(val) {
            switch (val) {
                case "":
                    this.dateFormatter = "";
                    break;
                case "YY":
                    this.dateFormatter = String(new Date().getFullYear()).slice(
                        2,
                        4
                    );
                    break;
                case "YYYY":
                    this.dateFormatter = String(new Date().getFullYear());
                    break;
                case "YYMM":
                    this.dateFormatter =
                        String(new Date().getFullYear()).slice(2, 4) +
                        (new Date().getMonth() + 1);
                    break;
                case "YYYYMM":
                    this.dateFormatter =
                        String(new Date().getFullYear()) +
                        (new Date().getMonth() + 1);
                    break;
                case "YYYYMMDD":
                    this.dateFormatter =
                        String(new Date().getFullYear()) +
                        (new Date().getMonth() + 1) +
                        new Date().getDate();
                    break;
            }
            console.log(val);
        },
        //流水号格式化
        serialChange(val) {
            switch (val) {
                case 2:
                    this.serialFormatter = "01";
                    break;
                case 3:
                    this.serialFormatter = "001";
                    break;
                case 4:
                    this.serialFormatter = "0001";
                    break;
                case 5:
                    this.serialFormatter = "00001";
                    break;
                case 6:
                    this.serialFormatter = "000001";
                    break;
                case 7:
                    this.serialFormatter = "0000001";
                    break;
            }
        },

        //合同试用范围多选框切换
        workKindChange(val) {
            console.log(val);
        },
        //计数器组件
        daysChange(value) {
            console.log(value);
        }
    }
};
</script>

