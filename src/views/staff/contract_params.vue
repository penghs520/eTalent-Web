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
                    <el-checkbox-group v-model="workKind" @change="workKindChange" :max="1">
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
                                <el-input size="mini" v-model="Prefix" placeholder="请输入"></el-input>
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
                                <el-input size="mini" v-model="Infix" placeholder="请输入"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <div class="contract_title">流水号</div>
                                <el-select v-model="serial" placeholder="请选择" size="mini">
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
                                <el-input size="mini" v-model="Suffix" placeholder="请输入"></el-input>
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

import base from "../../assets/js/base"
import { params_api1 } from "../../request/api"

export default {
    name: "contract_params",
    data() {
        return {
            workKind: [],
            workKindList: ["正式", "试用", "实习"],
            days: 1,
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
                { value: "01", label: "01(两位)" },
                { value: "001", label: "001(三位)" },
                { value: "0001", label: "0001(四位)" },
                { value: "00001", label: "00001(五位)" },
                { value: "000001", label: "000001(六位)" },
                { value: "0000001", label: "0000001(七位)" }
            ],
            dateFormatter: ""
        };
    },
    computed: {
        contractNum() {
            let res =
                this.Prefix +
                this.dateFormatter +
                this.Infix +
                this.serial +
                this.Suffix;
            return res;
        }
    },
    methods: {
        setParamsReq() {
            let send = {
                applicationScopeCode:"",
                contractParamDescribe:"",
                contractParamName:"",
                contractRuleInfix:"",
                contractRulePrefix:"",
                contractRuleSuffix:"",
                dateRule:"",
                digitCapacity:1,
                rememberDays:30,
            }
            params_api1(send, res => {
                base.log("s", "合同参数设置", send);
                base.log("r", "合同参数设置", res.data);
                if (res.data.success) {
                    this.$message.success("设置成功")
                } else {
                    base.error(res.data);
                }
            });
        },
        //日期选择框切换
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
        //适用范围多选框切换
        workKindChange(val) {
            console.log(val);
        },
        //
        //计数器组件切换
        daysChange(value) {
            console.log(value);
        },
        //保存设置
        saveSet() {
            this.setParamsReq()
        }
    }
};
</script>

