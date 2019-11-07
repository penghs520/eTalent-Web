<style lang="stylus" scoped>

</style>
<template>
    <div id="organization_position">
        <h1>职位体系</h1>
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        </el-upload>
    </div>
</template>
<script>
export default {
    name: 'position',        /* 职位体系 */
    data() {
        return {};
    },
    mounted() {},
    methods: {
        handleAvatarSuccess() {},
        beforeAvatarUpload() {},
    }
}
</script>