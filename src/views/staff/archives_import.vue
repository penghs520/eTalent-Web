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
    }
}
</style>
<template>
    <div id="archives_import">
        <div class="content">
             <el-tabs v-model="activeName" @tab-click="handleClick">
               
                <el-tab-pane label="基本信息导入" name="common" class="common">                
                </el-tab-pane>
                 
                <el-tab-pane label="附件信息导入" name="setting" class="common"> 
                </el-tab-pane>

                <el-tab-pane label="照片导入" name="setting" class="common"> 
                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>

export default {
    name: "archives_import",
    data() {
        return {
            activeName:"",
        };
    },
    methods:{
        //tab栏点击
        handleClick(){

        }
    }

};
</script>

