<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 424px;
    height: 453px;
    padding: 48px 68px 0px;
    background: rgba(241, 242, 242, 1);
    border-radius: 12px;
    // logo图标
    .logo {
        width: 172px;
        height: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .success {
        margin-top: 43px;
        font-size: 18px;
    }
    .jump {
        margin-top: 54px;
        font-size: 18px;
        color: #ff8c51ff;
    }

    //独立模块
    .el-button {
        display: block;
        width: 288px;
        margin: 120px auto 0px;
    }
}
</style>
<template>
    <div class="wrap">
        <div class="logo">
            <img src="../../assets/img/login/admin_logo2.png" alt />
        </div>
        <h2 class="success">您的新密码设置成功</h2>
        <p class="jump">5秒后为您跳转至登陆界面...</p>
        <!-- 按钮 -->
        <el-button type="primary" @click="toLogin">马上登陆</el-button>
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
            name1: false
        };
    },
    created() {
        setTimeout(() => {
            this.$router.push("/");
        }, 5000);
    },
    methods: {
        toLogin() {
            this.$router.push("/");
        }
    }
};
</script>

