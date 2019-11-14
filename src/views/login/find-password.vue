<style lang='scss' scoped>
.find_password {
    display: flex;
    width: 1008px;
    height: 600px;
    background: rgba(241, 242, 242, 1);
    
}
</style>
<template>
    <div class="find_password">
        <div class="swiper-wrap">
            <swiper></swiper>
        </div>
        <div class="content">
            
        </div>
    </div>
</template>

<script>
import swiper from "./components/swiper";

export default {

    components:{swiper}
};
</script>