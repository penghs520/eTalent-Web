<template>
    <div>
        <commonUpload :data="uploadData" :uploadShow="uploadShow" :active="uploadActive"></commonUpload>
    </div>
</template>

<script>
import commonUpload from '../../components/upload/upload';

export default {
    name: 'uploadDemo',             // 上传模板
    components: {commonUpload},
    data() {
        return {
            uploadActive: Number,                   // 必须，步骤条的进度，初始化应该是0，然后是1、2、3
            uploadShow: Boolean,                    // 必须，上传弹窗是否显示
            uploadData: {                           // 必须，上传组件的配置项
                title: '导入机构',                  // 非必须，弹窗标题
                download: Function,                 // 非必须，下载模板方法
                templateName: String,               // 非必须,模板的名称,默认方法下载模板
                fileFormatDescription: '仅支持扩展名：.xls .xles，大小不能超过5M',      // 非必须，文件格式说明
                uploadDescription: '这句话的内容还需要和产品沟通',                      // 非必须，导入说明
                uploadUrl: String,                  // 必须，上传地址
                multiple: Boolean,                  // 非必须，是否支持多选，true-支持，false-不支持，默认false
                maxNum: Number,                     // 非必须，最大上传个数，默认1个
                uploadSuccess: Function,            // 非必须，上传成功的回调函数，接收3个参数：response/file/fileList
                uploadError: Function,              // 非必须，上传失败的回调函数，接收3个参数：error/file/fileList
                cancel: Function,                   // 必须，取消操作
                check: Function,                    // 必须，校验操作
                finish: Function,                   // 必须，完成操作
                cancelLoading: Boolean,             // 必须，取消loading
                checkLoading: Boolean,              // 必须，校验loading
                finishLoading: Boolean,             // 必须，完成loading
            }
        }
    },
}
</script>