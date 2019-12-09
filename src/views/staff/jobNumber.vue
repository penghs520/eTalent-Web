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
            <!-- 合同编号规则 -->
            <div class="contract">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>工号设定</span>
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
                    <span>工号示范例:</span>
                    <span class="result_number">{{jobNum}}</span>
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
import { params_api2 } from "../../request/api";
export default {
    name: "contract_params",
    data() {
        return {
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
        jobNum() {
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
            let params = JSON.parse(localStorage.getItem("numberRuler"));
            this.Prefix = params.employeeNumberPrefix;
            this.Infix = params.employeeNumberInfix;
            this.Suffix = params.employeeNumberSuffix;
            this.date = params.dateRule;
            this.serial = params.digitCapacity;

            this.dateChange(this.date);
            this.serialChange(this.serial)
        } catch (error) {}
    },
    methods: {
        //保存设置
        saveSet() {
            this.setNumberReq();
        },
        //工号生成请求
        setNumberReq() {
            let send = {
                employeeNumberPrefix: this.Prefix,
                employeeNumberInfix: this.Infix,
                employeeNumberSuffix: this.Suffix,
                dateRule: this.date,
                digitCapacity: Number(this.serial)
            };

            localStorage.setItem("numberRuler", JSON.stringify(send));

            base.log("s", "生成工号表", send);
            params_api2(send, res => {
                base.log("r", "生成工号表", res.data);
                if (res.data.success) {
                    this.$message.success("设置成功");
                } else {
                    base.error(res.data);
                }
            });
        },
        //日期选择框--格式化
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
        //流水号--格式化
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
        }
    }
};
</script>

