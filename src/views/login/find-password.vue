<style lang='scss' scoped>
.find_password {
    display: flex;
    width: 1008px;
    height: 600px; 
    border-radius:12px;   
    .content {
        flex: 1;
        position: relative;
        box-sizing: border-box;
        height: 600px;
        padding: 80px 88px 0px;
        text-align: left;
        background: rgba(241, 242, 242, 1);
        border-radius:12px;        
        h1 {
            margin-bottom: 20px;
            font-size: 28px;
        }
        //手机找回
        .mobileInput {
            margin-top: 30px;
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
        //验证码
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
        // 微信图标
        .we_chat {
            .footer_line {
                text-align: center;
                background: url("../../assets/img/login/admin_line.png")
                    no-repeat center center;
                i {
                    display: inline-block;
                    width: 16px;
                    height: 14px;
                    margin-right: 5px;
                    background: url("../../assets/img/login/admin_weixin.png")
                        center;
                }
                span {
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
    .el-button {
        display: block;
        width: 288px;
        margin: 32px auto 25px;
    }
    .input-text {
        font-size: 16px;
    }
    .line {
        width: 400px;
        height: 1px;
        background: rgba(219, 219, 219, 1);
    }
    .active {
        background: #ff8c58;
    }
}
</style>
<template>
    <div class="find_password">
        <div class="swiper-wrap">
            <swiper></swiper>
        </div>
        <div class="content">
            <h1>找回密码</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 手机找回 -->
                <el-tab-pane label="手机号找回" name="mobile_find">
                    <el-form
                        :model="mobileForm"
                        ref="mobile_find"
                        :rules="rules"
                        label-position="left"
                        label-width="0"
                    >
                        <el-form-item prop="phone" class="mobileInput">
                            <span class="number">
                                <span>+86</span>
                                <span class="small_line">|</span>
                            </span>
                            <el-input
                                v-model="mobileForm.phone"
                                placeholder="请输入手机号"
                                class="mobile"
                                @focus="name = true"
                                @blur="name = false"
                            ></el-input>
                            <div class="line" :class="{active: name}"></div>
                        </el-form-item>

                        <el-form-item prop="code" class="mobileInput codeInput">
                            <el-input
                                v-model="mobileForm.code"
                                placeholder="验证码"
                                @focus="name1= true"
                                @blur="name1 = false"
                            ></el-input>
                            <el-button
                                class="codeBlock"
                                @click="getCode"
                                type="primary"
                                size="mini"
                                :disabled="isDisable"
                            >{{codeTxt}}</el-button>
                            <div class="line" :class="{active: name1}"></div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- 邮箱找回 -->
                <el-tab-pane label="邮箱找回" name="email_find" >
                    <el-form
                        :model="emailForm"
                        ref="email_find"
                        :rules="rules"
                        label-position="left"
                        label-width="0"
                    >
                        <el-form-item prop="email" class="mobileInput">
                            <el-input
                                v-model="emailForm.email"
                                @focus="name2 = true"
                                @blur="name2 = false"
                                class="input-text"
                                placeholder="请输入邮箱号"
                            ></el-input>
                            <div class="line" :class="{active: name2}"></div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" @click="toSetPwd">{{btnTxt}}</el-button>
            <!-- 登陆图标 -->
            <div class="we_chat">
                <div class="footer_line">
                    <i></i>
                    <span @click="$router.push('/')">返回登陆</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../../components/swiper";

export default {
    name:"findpassword",
    data() {
        return {
            activeName: "mobile_find",
            mobileForm: {
                phone: "",
                code: ""
            },
            emailForm: {
                email: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/,
                        message: "请输入正确的手机号",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                    {
                        pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
                        message: "请输入正确的邮箱",
                        trigger: "blur"
                    }
                ]
            },
            codeTxt: "获取验证码",
            isDisable: false,
            name: false,
            name1: false,
            name2: false,
            btnTxt: "确定",
            sec: 60,
            waitTime: 60
        };
    },
    components: { swiper },
    created() {
        //倒计时
        let timestamp = +localStorage.getItem("findTime");
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
        //找回密码按钮
        toSetPwd() {
            if (this.btnTxt == "确定") {
                this.$refs["mobile_find"].validate(valid => {
                    if (valid) {
                        console.log("手机找回密码");
                        setTimeout(() => {
                            this.$router.push("/setpassword");
                        }, 1000);
                    }
                });
            } else {
                this.$refs["email_find"].validate(valid => {
                    if (valid) {
                        console.log("邮箱验证成功");
                    }
                });
            }
        },
        //tab栏切换
        handleClick(tab, event) {
            if (tab.name == "mobile_find") {
                this.btnTxt = "确定";
            } else {
                this.btnTxt = "发送验证邮箱";
            }
        },
        //验证码倒计时
        getCode() {
            if(this.mobileForm.phone.length == 0){
                this.$message.error('请输入手机')
                return
            }
            let timestamp = localStorage.setItem("findTime", Date.now());
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
        }
    }
};
</script>