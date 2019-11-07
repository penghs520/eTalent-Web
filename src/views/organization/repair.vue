<style lang="stylus" scoped>

</style>
<style>
    .avatar-uploader{
        background-color: rgb(212, 109, 12);
    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload{
      width: 200px;
      height: 200px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<template>
    <div id="organization_repair">
        <h1>机构维护</h1>
        <el-upload
        class="avatar-uploader"
        action="http://192.168.1.119:5555/aop/file"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-change="fileChange"
        :before-upload="beforeAvatarUpload">
        </el-upload>
    </div>
</template>
<script>
export default {
    name: 'repair',        /* 机构维护 */
    data() {
        return {};
    },
    mounted() {},
    methods: {
        handleAvatarSuccess() {},
        beforeAvatarUpload() {},
        fileChange(file) {
            console.log(file);
        }
    }
}
</script>