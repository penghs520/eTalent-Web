<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 424px;
    height: 448px;
    padding: 48px 40px 0px;
    background: rgba(241, 242, 242, 1);
    border-radius: 12px;
    .logo {
        width: 172px;
        height: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .new_pwd {
        margin-top: 43px;
        font-size: 18px;
        color: #333333ff;
    }
    .set_pwd {
        margin-top: 40px;
    }
    //独立模块
    .el-button {
        display: block;
        width: 288px;
        margin: 18px auto 0px;
    }
    .input-text {
        font-size: 16px;
    }
    .line {
        width: 344px;
        height: 1px;
        background: rgba(219, 219, 219, 1);
    }
    .active {
        background: #ff8c58;
    }
}
</style>
<template>
    <div class="wrap">
        <div class="logo">
            <img src="../../assets/img/login/admin_logo2.png" alt />
        </div>
        <h2 class="new_pwd">设置新密码</h2>
        <!-- 输入密码 -->
        <el-form
            :model="pwdForm"
            ref="pwdForm"
            :rules="rules"
            class="loginForm"
            label-position="left"
            label-width="0"
        >
            <el-form-item prop="pwd1" class="set_pwd">
                <el-input
                    v-model="pwdForm.pwd1"
                    @focus="name = true"
                    @blur="name = false"
                    class="input-text"
                    placeholder="请输入新密码"
                    type="password"
                ></el-input>
                <div class="line" :class="{active: name}"></div>
            </el-form-item>
            <el-form-item prop="pwd2" class="set_pwd">
                <el-input
                    v-model="pwdForm.pwd2"
                    @focus="name1 = true"
                    @blur="name1 = false"
                    class="input-text"
                    placeholder="请确定新密码"
                     type="password"
                ></el-input>
                <div class="line" :class="{active: name1}"></div>
            </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button type="primary" @click="setPwd('pwdForm')">确定</el-button>
    </div>
</template>

<script>
export default {
    name: "setpassword",
    data() {
        return {
            pwdForm: {
                pwd1: "",
                pwd2: ""
            },
            name: false,
            name1: false,
            rules: {
                pwd1: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                pwd2: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        // 设置新密码
        setPwd(formName) {
            if(this.pwdForm.pwd1 != this.pwdForm.pwd2){
                this.$message.error('两次密码输入不一致')
                return
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$router.push("/setsuccess");                 
                }
            });
        }
    }
};
</script>

