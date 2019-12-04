<style lang="scss">
#archives_ledger{
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
#archives_ledger {
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
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            .sider{
                width: 215px;
                height: 100%;
                border-right: 1px solid #f0f0f0;
                padding: 16px 16px 0px 20px;
                font-size: 16px;
            }
            .common_content{
                flex: 1;
                height: 100%;
             
            }
        }

    }
}

</style>

</<template>
    <div id="archives_ledger">
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="常用台账" name="common" class="common">
                    <div class="sider">
                        <span>含共享台账：</span>
                       <el-switch
                        v-model="switchValue"
                        active-color="#19ADE6"
                        inactive-color="#ccc"
                        >
                       </el-switch>
                       <div>我是台账</div>
                    </div>
                    <div class="common_content">

                    </div>                   
                </el-tab-pane>
                <el-tab-pane label="台账设置" name="setting" class="common">
                    <div class="sider">
                        <el-button type="plain" size="small">新增</el-button>
                        <el-button type="plain" size="small">编辑</el-button>
                        <el-button type="plain" size="small">删除</el-button>
                    </div>
                    <div class="common_content">

                    </div>   
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
export default {
    name:"archives_ledger",
    components:{},
    data(){
        return {
            activeName:"common",
            switchValue:true,
        }
    },
    methods:{
        //tabs栏切换
        handleClick(tab){}
    }
}
</script>