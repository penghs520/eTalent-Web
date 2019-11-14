<style lang="scss" scoped>
.login_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url("./img/pic1.png") center / cover;
    .back {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(241, 242, 242, 0.9);
        .footer{
            margin-top: 80px;
            color:#676B6DFF;
            font-size: 14px;
            .vertical-line{
                margin: 0px 15px;
            }
        }
    }    
}
</style>
<template>
    <div class="login_wrap">
        <div class="back">
            <router-view></router-view>
            <div class="footer">
                <span>勤杰人力资源官网</span>
                <span class="vertical-line">|</span>
                <span>联系我们400-6565-700</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

