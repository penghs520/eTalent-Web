<style lang='scss' scoped>
.create {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between;
    width: 1008px;
    height: 306px;
    .logo {
        width: 173px;
        height: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .staff{
        width: 392px;
        height: 72px;
    }
    .hr{
        width: 392px;
        height: 72px;       
    }
}
</style>
<template>
    <div class="create">
        <div class="logo">
            <img src="../../assets/img/login/admin_logo2.png" alt />
        </div>
        <el-card class="staff"></el-card>
        <el-card class="hr"></el-card>
    </div>
</template>

<script>
export default {};
</script>