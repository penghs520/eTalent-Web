<style lang="scss" scoped>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url("./img/pic1.png") center / cover;
    .back {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(241, 242, 242, 0.9);
        .wrap {
            display: flex;
            width: 1008px;
            height: 600px;
            background: rgba(241, 242, 242, 1);
            .swiper-wrap {
                width: 432px;
                background-color: skyblue;
            }
            .content {
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
                    }
                }
                h1 {
                    margin-bottom: 20px;
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
                        color: #6C7072FF
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
                .codeInput{
                    position: relative;
                   .codeBlock{
                       position: absolute;
                       top: -8px;
                       right: 0px;
                       width: 104px;
                       height: 32px;   
                       text-align: center;
                       line-height: 32px;
                       color: #fff;                    
                       background-color: #FF8C58FF;
                   }
                }
                .link_text {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    .forget {
                        color: #ff8c58;
                    }
                }
            }
            .el-button {
                display: block;
                width: 288px;
                margin: 32px auto 35px;
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
            .el-input-group__prepend {
                border: none;
            }
        }
    }
}
// .loginForm {
//     width: 600px;
//     margin: 20px auto;
// }
</style>
<template>
    <div id="login">
        <div class="back">
            <div class="wrap">
                <!-- 左边轮播图组件 -->
                <div class="swiper-wrap">
                    <swiper></swiper>
                </div>
                <!-- 右边登陆页面 -->
                <div class="content">
                    <div class="code">
                        <img src="./img/admin_qrcode.png" alt />
                    </div>
                    <h1>登录</h1>

                    <el-form
                        :model="loginForm"
                        ref="loginForm"
                        :rules="rules"
                        class="loginForm"
                        label-position="left"
                        label-width="0"
                    >
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <!-- 普通登陆 -->
                            <el-tab-pane label="普通登陆" name="account_login">
                                <el-form-item prop="userName" class="formInput1">
                                    <el-input
                                        v-model="loginForm.userName"
                                        @focus="name = !name"
                                        class="input-text"
                                        placeholder="电话/邮箱/用户名"
                                    ></el-input>
                                    <div class="line" :class="{active: name}"></div>
                                </el-form-item>
                                <el-form-item prop="password" class="formInput2">
                                    <el-input
                                        v-model="loginForm.password"
                                        type="password"
                                        @focus="name2 = !name2"
                                        placeholder="密码"
                                    ></el-input>
                                    <div class="line" :class="{active: name2}"></div>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 手机快捷登陆 -->
                            <el-tab-pane label="手机快捷登陆" name="mobile_login">
                                <el-form-item prop="userName" class="formInput1 mobileInput">
                                    <span class="number">
                                        <span>+86</span>
                                        <span class="small_line">|</span>
                                    </span>
                                    <el-input
                                        v-model="mobileForm.phone"
                                        placeholder="手机"
                                        class="mobile"
                                    ></el-input>
                                    <div class="line"></div>
                                </el-form-item>
                                <el-form-item prop="password" class="formInput2 codeInput" >
                                    <el-input v-model="mobileForm.code" type="password"></el-input>
                                    <div class="codeBlock">
                                        <span>获取验证码</span>
                                    </div>
                                    <div class="line"></div>
                                </el-form-item>
                            </el-tab-pane>
                        </el-tabs>

                        <div class="link_text">
                            <el-checkbox v-model="checked">记住我</el-checkbox>
                            <div class="forget">
                                <span>忘记密码?</span>
                                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span>注册</span>
                            </div>
                        </div>
                    </el-form>

                    <el-button type="primary" @click="login('loginForm')">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import pageRoute from "../../router/pageRoute";
import { login_api1, login_api2 } from "../../request/api";

import swiper from "./components/swiper";

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
                ]
            },
            activeName: "account_login",
            name: false,
            name2: false
        };
    },
    components: {
        swiper
    },
    mounted() {},
    methods: {
        //tab栏切换
        handleClick() {},
        // login() {
        //     this.$router.push('/qinjee/index')
        // },
        login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.submit();
                }
            });
        },
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