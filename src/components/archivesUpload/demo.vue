<template>
    <div>
        <commonUpload :data="uploadData"  :active="uploadActive">
            <template v-slot:remind>
              <!--温馨提示 -->
            </template>
            <template v-slot:explain>
              <!--导入说明 -->
            </template>
            <template v-slot:btn>
              <!-- 底部按钮 -->
            </template>
        </commonUpload>
    </div>
</template>

<script>
import commonUpload from './archivesUpload';

export default {
    name: 'archivesUpload',                         // 上传模板
    components: {
        commonUpload
        },
    data() {
        return {
            uploadActive: Number,                   // 必须，步骤条的进度，初始化应该是0，然后是1、2、3
            uploadData: {                           // 必须，上传组件的配置项
                download: Function,                 // 非必须，下载模板方法
                templateName: String,               // 非必须,模板的名称,默认方法下载模板
                uploadUrl: String,                  // 必须，上传地址
                multiple: Boolean,                  // 非必须，是否支持多选，true-支持，false-不支持，默认false
                maxNum: Number,                     // 非必须，最大上传个数，默认1个
                uploadSuccess: Function,            // 非必须，上传成功的回调函数，接收3个参数：response/file/fileList
                uploadError: Function,              // 非必须，上传失败的回调函数，接收3个参数：error/file/fileList               

                tableShow:Boolean,                  // 非必须,是否显示表格
                tableData:Object,                   // 非必须，表格数据(同公共表格组件格式)
                fileList:Array,                     // 必须，上传文件存储
            }
        }
    },
}
</script>