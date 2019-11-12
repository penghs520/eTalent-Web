<style lang="scss">
.loginForm{
    width: 600px;
    margin: 20px auto;
}
</style>
<template>
    <div id='login'>
        <h1>登录页面</h1>
        <el-form :model="loginForm" ref="loginForm" :rules="rules" class="loginForm" label-position="left" label-width="100px" status-icon >
            <el-form-item label="用户名：" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="loginForm.password" type="password" ></el-input>
            </el-form-item>
        </el-form>
        <el-button type='primary' @click="login('loginForm')" >登录</el-button>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import pageRoute from '../../router/pageRoute';
import {login_api1, login_api2} from '../../request/api';

export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                userName: 'zhouyun',
                password: '123456',
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
            }
        };
    },
    mounted() {},
    methods: {
        // login() {
        //     this.$router.push('/qinjee/index')
        // },
        login(formName) {
            this.$refs[formName].validate((valid) => {
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
            base.log('s', '登录', send);
            login_api1(send , res => {
                let d = res.data;
                base.log('r', '登录', d);
                if (d.success) {
                    this.getMenu();
                }else{
                    base.error(d);
                }
            })

        },

        // 请求菜单
        getMenu() {
            login_api2({}, res => {
                let d = res.data;
                base.log('r', '请求菜单', d);
                if (d.success) {
                    // 处理数据
                    this.menuFormat(d.result);
                    this.$router.push('/qinjee/organization_repair')
                }else{
                    base.error(d);
                }
            })
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
                        for (let j = 0; j < sideItem.childMenuList.length; j++) {
                            const listItem = sideItem.childMenuList[j];
                            let route = {
                                chName: listItem.menuName,
                                path: pageRoute[listItem.menuName] ? pageRoute[listItem.menuName] : ''
                            };
                            o.children.push(route);
                        };
                    }else{
                        o.path = pageRoute[sideItem.menuName] ? pageRoute[sideItem.menuName] : '';
                    };
                    sideMenu[item.menuName].push(o);
                };
            };
            // 存储菜单
            localStorage.setItem('topMenu',JSON.stringify(topMenu));
            localStorage.setItem('sideMenu',JSON.stringify(sideMenu));
        },
    }
}
</script>