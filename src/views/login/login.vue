<style lang="scss" scoped>
.wrap {
    display: flex;
    width: 1008px;
    height: 600px;
    background: rgba(241, 242, 242, 1);
     border-radius:12px;
    // 账号手机登陆
    .content {
        flex: 1;
        position: relative;
        box-sizing: border-box;
        height: 600px;
        padding: 80px 88px 0px;
        text-align: left;    
        .code {
            position: absolute;
            top: 27px;
            right: 21px;
            img {
                width: 64px;
                height: 64px;
                cursor: pointer;
            }
        }
        h1 {
            margin-bottom: 20px;
            font-size: 28px;
        }
        .formInput1 {
            margin-top: 30px;
        }
        .formInput2 {
            margin-top: 45px;
        }
        // 手机快捷
        .mobileInput {
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
        //手机验证码
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
        // 链接文本
        .link_text {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .forget {
                color: #ff8c58;
                .vertical-line{
                    margin: 0px 10px;
                }
                span {
                    cursor: pointer;
                }
            }
        }
        // 底部微信登陆图标
        .we_chat {
            .footer_line {
                text-align: center;
                background: url("../../assets/img/login/admin_line.png") no-repeat center center;
                i {
                    display: inline-block;
                    width: 16px;
                    height: 14px;
                    margin-right: 5px;
                    background: url("../../assets/img/login/admin_weixin.png") center;
                }
                span {
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
    // 微信扫码登录
    .wechat_login {
        flex: 1;
        position: relative;
        padding: 80px 88px 0px;
        text-align: left;
        .code {
            position: absolute;
            top: 27px;
            right: 21px;
            img {
                width: 64px;
                height: 64px;
                cursor: pointer;
            }
        }
        .wechat_content {
            display: flex;
            flex-direction: column;
            align-items: center;
            .wechat_code {
                margin: 80px auto 72px;
                img {
                    width: 160px;
                    height: 160px;
                }
            }
            p {
                color: #bfbfbfff;
            }
            .footer_login {
                margin-top: 20px;
                span {
                    color: #ff8c58;
                    font-size: 14px;
                    cursor: pointer;
                }
                .vertical_line{
                    margin: 0px 10px;
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
    <div id="login">
        <div class="wrap">
            <!-- 左边轮播图组件 -->
            <div>
                <swiper></swiper>
            </div>
            <!-- 手机登陆页面 -->
            <div class="content" v-if="methodChange">
                <div class="code" @click="methodChange = false">
                    <img src="../../assets/img/login/admin_qrcode.png" alt />
                </div>
                <h1>登录</h1>
                <el-tabs v-model="activeName">
                    <!-- 普通登陆 -->
                    <el-tab-pane label="普通登陆" name="account_login" class="login_title">
                        <el-form
                            :model="loginForm"
                            ref="loginForm"
                            :rules="rules"
                            class="loginForm"
                            label-position="left"
                            label-width="0"
                        >
                            <el-form-item prop="userName" class="formInput1">
                                <el-input
                                    v-model="loginForm.userName"
                                    @focus="name = true"
                                    @blur="name = false"
                                    class="input-text"
                                    placeholder="电话/邮箱/用户名"
                                ></el-input>
                                <div class="line" :class="{active: name}"></div>
                            </el-form-item>
                            <el-form-item prop="password" class="formInput2">
                                <el-input
                                    v-model="loginForm.password"
                                    type="password"
                                    @focus="name2 = true"
                                    @blur="name2 = false"
                                    placeholder="密码"
                                ></el-input>
                                <div class="line" :class="{active: name2}"></div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <!-- 手机快捷登陆 -->
                    <el-tab-pane label="手机快捷登陆" name="mobile_login" class="login_title">
                        <el-form
                            :model="mobileForm"
                            ref="mobileForm"
                            :rules="rules"
                            class="loginForm"
                            label-position="left"
                            label-width="0"
                        >
                            <el-form-item prop="phone" class="formInput1 mobileInput">
                                <span class="number">
                                    <span>+86</span>
                                    <span class="small_line">|</span>
                                </span>
                                <el-input
                                    v-model="mobileForm.phone"
                                    placeholder="手机"
                                    class="mobile"
                                    @focus="name3 = true"
                                    @blur="name3 = false"
                                ></el-input>
                                <div class="line" :class="{active: name3}"></div>
                            </el-form-item>
                            <el-form-item prop="code" class="formInput2 codeInput">
                                <el-input
                                    v-model="mobileForm.code"
                                    type="password"
                                    @focus="name4= true"
                                    @blur="name4 = false"
                                    placeholder="请输入验证码"
                                ></el-input>
                                <el-button
                                    class="codeBlock"
                                    @click="getCode"
                                    type="primary"
                                    size="mini"
                                    :disabled="isDisable"
                                >{{codeTxt}}</el-button>
                                <div class="line" :class="{active: name4}"></div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <!-- 链接文本 -->
                <div class="link_text">
                    <el-checkbox v-model="checked">记住我</el-checkbox>
                    <div class="forget">
                        <span @click="$router.push('/findpassword')">忘记密码?</span>
                        <span class="vertical-line">|</span>
                        <span @click="$router.push('/register')" class="register">注册</span>
                    </div>
                </div>

                <el-button type="primary" @click="login">登录</el-button>
                <!-- 登陆图标 -->
                <div class="we_chat">
                    <div class="footer_line">
                        <i></i>
                        <span @click="methodChange = false">微信登陆</span>
                    </div>
                </div>
            </div>
            <!-- 微信扫码登陆 -->
            <div class="wechat_login" v-else>
                <div class="code" @click="methodChange = true">
                    <img src="../../assets/img/login/admin_computer.png" alt />
                </div>
                <div class="wechat_content">
                    <h1>微信登陆</h1>
                    <div class="wechat_code">
                        <img src="../../assets/img/login/adimin_qrcode.png" alt />
                    </div>
                    <p>已有账号,请使用微信扫描二维码登陆</p>
                    <div class="footer_login">
                        <span @click="methodChange = true">密码登陆</span>
                        <span class="vertical_line">|</span>
                        <span @click="$router.push('/register')">注册</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import pageRoute from "../../router/pageRoute";
import {
    login_api1,
    login_api2,
    login_api3,
    login_api4,
} from "../../request/api";

import swiper from "../../components/swiper";

export default {
    name: "login",
    data() {
        return {
            loginForm: {
                userName: "zhouyun",
                password: "123456"
            },
            mobileForm: {
                phone: "",
                code: ""
            },
            checked: false,
            rules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入登录密码",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /1[0-9]{10}/,
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
                ]
            },
            activeName: "account_login",
            name: false,
            name2: false,
            name3: false,
            name4: false,
            methodChange: true, //登录方式,
            isDisable: false,
            codeTxt: "获取验证码",
            sec: 60,
            waitTime: 60
        };
    },
    components: {
        swiper
    },
    //获取倒计时
    created() {
        let timestamp = +localStorage.getItem("time");
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
        //获取验证码 , 验证码倒计时
        getCode() {
            if (this.mobileForm.phone.length == 0) {
                this.$message.error("请输入手机号");
                return;
            }
            //验证码倒计时
            let timestamp = localStorage.setItem("time", Date.now());
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
            //获取验证码
            login_api3({ phone: this.mobileForm.phone }, res => {
                this.$message.success("短信发送成功");
            });
        },
        //登陆
        login() {
            if (this.activeName == "account_login") {
                if (
                    this.loginForm.password.length == 0 ||
                    this.loginForm.userName.length == 0
                ) {
                    this.$message.error("输入内容为空");
                    return;
                }
                this.$refs["loginForm"].validate(valid => {
                    if (valid) {
                        this.submit();
                    }
                });
            } else {
                if (this.mobileForm.phone.length == 0) {
                    this.$message.error("输入内容为空");
                    return;
                }
                this.$refs["mobileForm"].validate(valid => {
                    if (valid) {
                        this.mobileLogin();
                    }
                });
            }
        },
        //手机快捷登陆
        mobileLogin() {
            let send = {
                phone: this.mobileForm.phone,
                code: this.mobileForm.code
            };
            login_api4(send, res => {
                this.$message.success("登陆成功");
                this.$router.push("/qinjee/organization_repair");
            });
        },
        //普通登陆提交
        submit() {
            let send = {
                account: this.loginForm.userName,
                password: this.loginForm.password
            };
            base.log("s", "登录", send);
            login_api1(send, res => {
                let d = res.data;
                base.log("r", "登录", d);
                if (d.success) {
                    this.getMenu();
                    console.log('成功登陆');                    
                    localStorage.setItem('userInfo',JSON.stringify(d))                    
                } else {
                    base.error(d);
                }
            });
        },
        // 请求菜单
        getMenu() {
            login_api2({}, res => {
                let d = res.data;
                base.log("r", "请求菜单", d);
                if (d.success) {
                    // 处理数据
                    this.menuFormat(d.result);
                    this.$message.success("登陆成功");
                    this.$router.push("/qinjee/organization_repair");
                } else {
                    base.error(d);
                }
            });
        },
        // 处理菜单
        menuFormat(list) {
            let topMenu = new Array();
            let sideMenu = new Object();
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                topMenu.push(item.menuName);
                sideMenu[item.menuName] = new Array();
                for (let k = 0; k < item.childMenuList.length; k++) {
                    const sideItem = item.childMenuList[k];
                    let o = {
                        chName: sideItem.menuName
                    };
                    if (sideItem.childMenuList) {
                        o.children = new Array();
                        for (
                            let j = 0;
                            j < sideItem.childMenuList.length;
                            j++
                        ) {
                            const listItem = sideItem.childMenuList[j];
                            let route = {
                                chName: listItem.menuName,
                                path: pageRoute[listItem.menuName]
                                    ? pageRoute[listItem.menuName]
                                    : ""
                            };
                            o.children.push(route);
                        }
                    } else {
                        o.path = pageRoute[sideItem.menuName]
                            ? pageRoute[sideItem.menuName]
                            : "";
                    }
                    sideMenu[item.menuName].push(o);
                }
            }
            // 存储菜单
            localStorage.setItem("topMenu", JSON.stringify(topMenu));
            localStorage.setItem("sideMenu", JSON.stringify(sideMenu));
        }
    }
};
</script>