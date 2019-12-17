<style lang='scss' scoped>
.register {
    display: flex;
    width: 1008px;
    height: 600px;
    border-radius: 12px;
    .content {
        flex: 1;
        position: relative;
        box-sizing: border-box;
        height: 600px;
        padding: 80px 88px 0px;
        text-align: left;
        background: #fff;
        border-radius: 0px 12px 12px 0px;  
        h1 {
            font-size: 28px;
        }
        // 手机输入
        .mobileInput {
            margin-top: 45px;
            position: relative;
            .number {
                position: absolute;
                left: 10px;
                color: #6c7072ff;
            }
            .mobile {
                text-indent: 46px;
            }
            .small_line {
                margin-left: 12px;
                color: #e5e5e5ff;
            }
        }
        // 验证码
        .codeInput {
            position: relative;
            .codeBlock {
                position: absolute;
                top: -40px;
                right: 0px;
                width: 104px;
                height: 32px;
            }
        }
        .link_text {
            margin-top: 20px;
            font-size: 14px;
            .read {
                margin-left: 8px;
            }
            .agreement {
                color: #ff8c58;
            }
        }
        // 底部图标
        .we_chat {
            .footer_line {
                text-align: center;
                background: url("../../assets/img/login/admin_line.png")
                    no-repeat center center;
                span {
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
    .line {
        width: 400px;
        height: 1px;
        background: rgba(219, 219, 219, 1);
    }
    .active {
        background: #ff8c58;
    }
    .input-text {
        font-size: 16px;
    }
    .el-button {
        display: block;
        width: 288px;
        margin: 32px auto 25px;
    }
}
</style>
<template>
    <div class="register">
        <div class="swiper-wrap">
            <swiper></swiper>
        </div>
        <div class="content">
            <h1>用户注册</h1>
            <el-form
                :model="regForm"
                ref="regForm"
                :rules="rules"
                class="regForm"
                label-position="left"
                label-width="0"
            >
                <el-form-item prop="mobile" class="mobileInput">
                    <span class="number">
                        <span>+86</span>
                        <span class="small_line">|</span>
                    </span>
                    <el-input
                        v-model="regForm.mobile"
                        placeholder="手机号"
                        class="mobile"
                        @focus="name = true"
                        @blur="name = false"
                    ></el-input>
                    <div class="line" :class="{active: name}"></div>
                </el-form-item>

                <el-form-item prop="password" class="mobileInput">
                    <el-input
                        v-model="regForm.password"
                        type="password"
                        @focus="name1= true"
                        @blur="name1 = false"
                        placeholder="请输入密码"
                    ></el-input>
                    <div class="line" :class="{active: name1}"></div>
                </el-form-item>

                <el-form-item prop="code" class="mobileInput codeInput">
                    <el-input
                        v-model="regForm.code"
                        @focus="name2= true"
                        @blur="name2 = false"
                        placeholder="验证码"
                    ></el-input>
                    <el-button
                        class="codeBlock"
                        @click="getCode"
                        type="primary"
                        size="mini"
                        :disabled="isDisable"
                    >{{codeTxt}}</el-button>
                    <div class="line" :class="{active: name2}"></div>
                </el-form-item>
            </el-form>
            <!-- 协议 -->
            <div class="link_text">
                <el-checkbox v-model="checked" @change="checkedChange"></el-checkbox>
                <span class="read">阅读并接受</span>
                <span class="agreement">《勤杰Qinjee软件协议》</span>
            </div>
            <!-- 登陆按钮 -->
            <el-button type="primary" @click="register('regForm')" :disabled="!checked">注册</el-button>
            <!-- 返回登陆 -->
            <div class="we_chat">
                <div class="footer_line">
                    <span @click="$router.push('/')">返回登陆</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../../components/swiper";

export default {
    name:"register",
    data() {      
        return {
            regForm: {
                mobile: "",
                password: "",
                code: ""
            },
            rules: {
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^1[3,4,5,6,7,8,9]\d{9}$/,
                        message: "请输入正确的手机号",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            name: false,
            name1: false,
            name2: false,
            codeTxt: "获取验证码",
            isDisable: false,
            checked: true,
            sec: 60,
            waitTime: 60
        };
    },
    components: { swiper },
    created() {
        let timestamp = +localStorage.getItem("regTime");
        if (Math.round(Date.now() - timestamp) / 1000 < this.waitTime) {
            this.sec =
                this.waitTime - Math.round((Date.now() - timestamp) / 1000);
            this.codeTxt = `还有${this.sec}秒`;
            this.isDisable = true;
            let timeId = setInterval(() => {
                this.sec--;
                this.codeTxt = `还有${this.sec}秒`;
                if (this.sec < 0) {
                    clearInterval(timeId);
                    this.isDisable = false;
                    this.codeTxt = "获取验证码";
                    this.sec = this.waitTime;
                }
            }, 1000);
        }
    },
    methods: {
        //多选框改变
        checkedChange(val){
            if(!val){
                this.$message.warning("请点击阅读并接受《勤杰Qinjee软件协议》！")
            }
        },
        //验证码倒计时
        getCode() {
            if (this.regForm.mobile.length == 0) {
                this.$message.warning("请输入手机");
                return;
            }
            let timestamp = localStorage.setItem("regTime", Date.now());
            this.isDisable = true;
            this.codeTxt = `还有${this.sec}秒`;
            let timeId = setInterval(() => {
                this.sec--;
                this.codeTxt = `还有${this.sec}秒`;
                if (this.sec < 0) {
                    clearInterval(timeId);
                    this.isDisable = false;
                    this.codeTxt = "获取验证码";
                    this.sec = this.waitTime;
                }
            }, 1000);
        },
        //注册账号
        register(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$router.push("/create");
                }
            });
        }
    }
};
</script>

