<style lang="scss">
#archives_import{
    .el-tabs{
        box-sizing: border-box;
        height: 100%;       
        overflow: hidden;
    }
    .el-tabs__header {      
        padding: 0 24px;
        border-bottom: 1px solid rgba(241, 242, 242, 1);
      
    }
    .el-tabs__content {
        height: calc(100% - 64px);
        overflow: auto;
        height: 100%;
        #pane-orgPic {
            height: 100%;
        }
    }
}   
</style>
<style lang="scss" scoped>
#archives_import {
    display: flex;
    height: 100%;
    text-align: left;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        box-sizing: border-box;
        background-color: #fff;
        .common{
            display: flex;
            height: 100%;
            justify-content: center;
            .wrap{
                margin-top: 24px;
                max-width: 1040px;
                width: 80%;
            }
        }
    }
}
</style>
<template>
    <div id="archives_import">
        <div class="content">
             <el-tabs v-model="activeName" @tab-click="handleClick">
               <!-- 基本信息导入 -->
                <el-tab-pane label="基本信息导入" name="baseInfo" class="common">
                    <div class="wrap">
                        <commonUpload :data="uploadBase" :active="activeBase">
                             <template v-slot:remind>
                                 <div style="marginTop:-2px">
                                     <span style="marginRight:10px">推荐下载标准模板,填写信息后再上传</span>
                                     <el-button type="primary" size="mini" @click="downloadTemp">下载模板</el-button>
                                </div>                           
                            </template>
                             <template v-slot:explain>
                                 <div>
                                    <p>1.部门可以用【部门编码】或者【部门名称】匹配，优先使用【部门编码】进行匹配。</p>
                                    <p>2.当表格中没有【部门编码】列时，系统会根据【部门名称】匹配相应的部门，如果存在相同名称的部门，则需要添加【单位】列加以区分。</p>
                                    <p>3.人员以【工号】、【证件号码】匹配，系统中不存在就做新增人员处理，如系统中存在，则做更新处理。</p>
                                    <p>4.数据导入只新增/更新主职数据。</p>
                                    <p>5.一次最多导入 1000条数据</p>
                                 </div>  
                            </template>
                            <template v-slot:btn>
                                <el-button type="primary" size="mini">导入校验</el-button>
                            </template>
                        </commonUpload>
                    </div>                   
                </el-tab-pane>
                 <!-- 附件信息导入 -->
                <el-tab-pane label="附件信息导入" name="fileImport" class="common"> 
                    <div class="wrap">
                        <commonUpload :data="uploadFile" :active="activeFile">
                             <template v-slot:remind>
                                 <div>
                                     <span>子集导入可以实现对子集信息的新增与更新处理，建议先导出子集信息作为模板，编辑后再导入。</span>
                                     <div  style="marginTop:10px">
                                         <span style="marginRight:10px">请选择要导入的子集：</span>
                                         <el-select v-model="value" placeholder="关联人员子集" size="mini" style="marginRight:10px">
                                               <el-option
                                                  v-for="item in childrenSet"
                                                  :key="item.value"
                                                  :value="item.value">
                                                </el-option>
                                         </el-select>
                                         <el-button type="primary" size="mini">下载模板</el-button>
                                    </div>                                    
                                </div>                           
                            </template>
                             <template v-slot:explain>
                                 <div>
                                     <p>1.一次最多导入 1000条数据</p>
                                 </div>  
                            </template>
                            <template v-slot:btn>
                                <el-button type="primary" size="mini">导入校验</el-button>
                            </template>
                        </commonUpload>
                    </div>  
                </el-tab-pane>
                <!-- 照片信息导入 -->
                <el-tab-pane label="照片导入" name="photoImport" class="common"> 
                    <div class="wrap">
                        <commonUpload :data="uploadPhoto" :active="activePhoto">
                             <template v-slot:remind>
                                 <div>
                                   为了达到最佳显示效果，上传的照片请处理成XXX*XXXX像素尺寸，单个文件大小(5M)                                  
                                </div>                           
                            </template>
                             <template v-slot:explain>
                                 <div>
                                     <p>1.一次最多导入 1000张员工头像照片</p>
                                     <p>2.相片的命名规则须按 “工号#姓名”或“证件号#姓名“，如”QJ090814#张三“或”210211198607293579#张三“</p>   
                                 </div>  
                            </template>
                            <template v-slot:btn>
                                <el-button type="primary" size="mini">导入校验</el-button>
                            </template>
                        </commonUpload>
                    </div>  
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import commonUpload from "../../components/archivesUpload/archivesUpload"

export default {
    name: "archives_import",
    components:{
        commonUpload,
    },
    data() {
        return {
            activeName:"baseInfo",
            uploadBase:{
                uploadUrl:"",
                tableShow:false,
            },
            uploadFile:{
                uploadUrl:"",
            },
            uploadPhoto:{
                uploadUrl:"",
            },
            activeBase:0,
            activeFile:0,
            activePhoto:0,
            value:"",
            childrenSet:[
                {value:"关联人员子集"},
                {value:"教育经历"},
                {value:"工作经历"},
                {value:"家庭成员"},
                {value:"奖惩信息"},
                {value:"人事变动"},
            ]
        };
    },
    created(){

    },
    methods:{
        //基本信息--模板下载
        downloadTemp(){
            this.activeBase = 1
            this.uploadBase.tableShow = true
        },
        //tab栏点击
        handleClick(){
            
        }
    }

};
</script>

