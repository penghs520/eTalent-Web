
<style lang="scss" scoped>
.swiper_wrap {
    width: 432px;
    height: 600px;
    .swiper_img {
        width: 100%;
        height: 100%;
    }
}
</style>
<template>
    <div class="swiper_wrap">
        <img src="../assets/img/login/pic2.png" alt class="swiper_img" />
        <!-- <el-carousel height="600px" iarrow="never">
            <el-carousel-item v-for="item in imgList" :key="item">
                <img :src="item" alt class="swiper_img" />
            </el-carousel-item>
        </el-carousel> -->
    </div>
</template>

<script>
export default {
    name: "login_wrap",
    data() {
        return {
            imgList: []
        };
    }
};
</script>
