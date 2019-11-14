
<style scoped>
 .swiper-wrap{
     width: 432px;
     background-color: skyblue;
 }
</style>

<template>
    <div class="swiper-wrap">
        <el-carousel height="600px">
            <el-carousel-item v-for="item in imgList" :key="item">
                <!-- <img :src="item" alt /> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "login_wrap",
    data() {
        return {
            imgList:['/src/views/login/img/pic1.png']
        };
    }
};
</script>
