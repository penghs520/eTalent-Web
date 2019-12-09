<style scoped lang="scss">
#commonUpload_upload {
    margin-top: 18px;
}
.fileFormatDescription {
    color: rgb(192, 196, 204);
    font-size: 12px;
}
.el-upload__tip {
    display: flex;
    font-size: 14px;
}
.el-upload__tip .label {
    color: #2b2b2b;
    margin-right: 16px;
}
.el-upload__tip .text {
    color: #777b7c;
}
.table {
    margin-top: 20px;
    height: 260px;
    overflow: auto;
}
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
}
.com{
    margin: 0 auto;
    width: 80%;
    text-align: left;
}
.format{
    display: flex;
    .remind{
        margin-right: 16px;
        width: 70px;
        font-size: 14px;
        font-weight: 700;
        color: #2B2B2B;       
    } 
    .slot_content{
        flex: 1;
        font-size: 14px;
        line-height: 18px;
        color: #676B6D;
    }
}
.intro{
    padding-top: 24px;
}
</style>
<style>
#commonUpload_upload .el-upload,
#commonUpload_upload .el-upload-dragger {
    width: 100%;
}
.uploadIcon {
    color: #19ade6 !important;
}

</style>

<template>
    <div id="commonUpload2">
        <!-- 导入 -->
        <div>
            <div class="com">
                <el-steps :active="active" finish-status="success">
                    <el-step title="上传文件"></el-step>
                    <el-step title="导入校验"></el-step>
                    <el-step title="导入完成"></el-step>
                </el-steps>
            </div>
            <div class="com format" v-if="active === 0">
              <span class="remind">温馨提示:</span>
               <div class="slot_content">
                  <slot name="remind" class="remind_text"></slot>
                </div>              
            </div>
            <!--导入文件  -->
            <el-upload
                v-if="active === 0"
                id="commonUpload_upload"
                drag
                ref="upload"
                :multiple="Boolean(data.multiple)"
                :auto-upload="false"
                :limit="data.maxNum ? data.maxNum : 1"
                :on-change="fileChange"
                :action="data.uploadUrl">
                <i class="el-icon-upload uploadIcon"></i>
                <div>
                    点击或将文件拖到这里上传
                    <br />
                    <span
                        v-if="data.fileFormatDescription"
                        class="fileFormatDescription"
                    >{{data.fileFormatDescription}}</span>
                </div>
            </el-upload>
            <!-- 校验表格 -->
            <div class="table" v-if="data.tableShow">
                <commonTable :table="data.tableData" key="table1" ></commonTable>
            </div>
            <!-- 导入说明 -->
            <div class="com format intro" v-if="active === 0">
                <span class="remind">导入说明:</span>
                <div class="slot_content">
                    <slot name="explain" class="remind_text"></slot>
                </div>
            </div>            
        </div>       
        <div slot="footer" class="footer">
            <slot name="btn"></slot>
        </div>
    </div>
</template>

<script>
import file from "../../request/filePath";
import commonTable from "../table/commonTable";

export default {
    name: "commonUpload2", // 导入
    props: {
        active: Number,
        data: Object
    },
    components:{
        commonTable,
    },
    data() {
        return {
            uploadLoading: false
        };
    },
    computed: {
    },
    mounted() {},
    methods: {
        
        // 默认下载模板方法
        downloadModle(name) {
            let url = file[name];
            if (url) {
                window.open(url, "_self");
            }
        },
        // 下载模板
        download() {
            if (this.data.templateName) {
                this.downloadModle(this.data.templateName);
            }
            if (this.data.download) {
                this.data.download();
            }
        },
        // 文件状态改变
        fileChange(file, fileList) {
            this.data.fileList = fileList;
        },

        // 上传
        upload() {
            if (this.data.upload) {
                this.data.upload();
            }
        },

        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.uploadLoading = false;
            if (this.data.uploadSuccess) {
                this.data.uploadSuccess(res, file, fileList);
            }
        },

        // 上传失败
        uploadError(err, file, fileList) {
            this.uploadLoading = false;
            if (this.data.uploadError) {
                this.data.uploadError(err, file, fileList);
            }
        }
    }
};
</script>