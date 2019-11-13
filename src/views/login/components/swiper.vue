
<style scoped>
</style>

<template>
    <div>
        <el-carousel height="600px">
            <el-carousel-item v-for="item in 4" :key="item">
                <img :src="item" alt />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "login_wrap",
    data() {
        return {
            
        };
    }
};
</script>
