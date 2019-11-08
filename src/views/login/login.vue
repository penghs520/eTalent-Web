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
import {login_api1} from '../../request/api';

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
            })

        },
    }
}
</script>