<style scoped lang="scss">
.remindLabel {
    color: #000;
}
.remindText {
    color: #676b6d;
}
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
    width: 510px;
    height: 260px;
    overflow: auto;
    .el-table{
        height: 100%;
    }
}
.text_success,
.el-icon-success {
    color: #2fc42f;
}
.report {
    color: #1fafe7;
    cursor: pointer;
}
.checkFailshow,
.el-icon-error {
    color: #f03838;
    font-weight: 700;
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
    <div id="commonUpload">
        <!-- 导入 -->
        <el-dialog
            id="commonUpload_dialog"
            :visible.sync="uploadShow"
            v-if="uploadShow"
            class="qinjeeDialogSmall"
            :before-close="handleClose"
            :append-to-body="true"
            :close-on-click-modal="false"
            center
        >
            <span slot="title">{{data.title}}</span>
            <div class="qinjeeDialogSmallCont" v-if="!data.checkFailshow">
                <el-steps :active="active" finish-status="success">
                    <el-step title="上传文件"></el-step>
                    <el-step title="导入校验"></el-step>
                    <el-step title="导入完成"></el-step>
                </el-steps>

                <el-row :gutter="10" type="flex" align="middle">
                    <el-col :span=".5" class="remindLabel">温馨提醒：</el-col>
                    <el-col :span=".5" class="remindText">推荐下载标准模板，填写信息后再上传</el-col>
                    <el-col :span=".5">
                        <el-button @click="download" type="primary" size="small">下载模板</el-button>
                    </el-col>
                </el-row>

                <el-upload
                    v-if="active === 0"
                    id="commonUpload_upload"
                    drag
                    ref="upload"
                    :multiple="Boolean(data.multiple)"
                    :auto-upload="false"
                    :on-change="fileChange"
                    :limit="data.maxNum ? data.maxNum : 1"
                    :action="data.uploadUrl"
                >
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

                <!-- 表格 -->
                <div class="table" v-if="data.tableShow">
                    <commonTable :table="data.tableData" key="table1" class="table_content"></commonTable>
                </div>
                <!-- 导入说明 -->
                <div v-if="data.uploadDescription" class="el-upload__tip" slot="tip">
                    <span class="label">导入说明：</span>
                    <span class="text" v-show="active === 0">
                        <span>这句话的内容还需要和产品沟通</span>
                    </span>
                    <span class="text_success" v-show="data.checkedResult ==='success'  && active !== 0">
                        <i class="el-icon-success"></i>
                        <span>校验成功,可导入数据</span>
                    </span>
                    <span class="text_fail" v-show="data.checkedResult === 'fail'  && active !== 0 ">
                        <i class="el-icon-error"></i>
                        <span class="checkFailshow">校验失败，</span>
                        <span class="report" @click="readReport">点击此处查看校验报告</span>
                    </span>
                </div>
            </div>
            <div class="qinjeeDialogSmallCont table" v-if="data.checkFailshow"  >
                <commonTable :table="data.checkFailTable" key="table2" ></commonTable>
            </div>           
            <span slot="footer" class="dialog-footer">
                <el-button
                    size="small"
                    @click="cancel"
                    :loading="cancelLoading"
                >{{data.cancelbtn}}</el-button>
                <el-button
                    size="small"
                    type="primary"
                    @click="upload"
                    :loading="uploadLoading"
                    :disabled="data.fileList < 1"
                >{{data.btnText}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import file from "../../request/filePath";
import commonTable from "../table/commonTable";

export default {
    name: "commonUpload", // 导入
    props: {
        uploadShow: Boolean,
        active: Number,
        data: Object
    },
    data() {
        return {
            uploadLoading: false
        };
    },
    components: {
        commonTable
    },
    computed: {
        cancelLoading() {
            return this.data.cancelLoading;
        },
    },
    mounted() {},
    methods: {
        //查看校验报告
        readReport() {
            console.log("点击校验");
            if (this.data.readReport) {
                this.data.readReport();
            }
        },
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

        // 关闭弹窗
        handleClose() {
            if (this.data.close) {
                this.data.close();
            }
        },

        // 取消
        cancel() {
            if (this.data.cancel) {
                this.data.cancel();
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
        },

        
        // 完成
        finish() {
            if (this.data.finish) {
                this.data.finish();
            }
        }
    }
};
</script>