<style lang="scss" scope>
.archives_style{
    height: 100%;
    display: flex;
    text-align: left;
    .side_tree{
        width: 215px;
        height: 400px;
        box-sizing: border-box;
        border-right: 1px solid #f0f0f0;
        padding: 16px;
        font-size: 16px;
    }
    .content{
        flex: 1;
        box-sizing: border-box;
        padding: 16px;
        overflow: auto;
    }
}
.archives_style{
    width: 100%;
    margin: -32px -25px;
}

</style>
<template>
    <div id="archives_style">
           <el-dialog
            :visible.sync="show"
            class="qinjeeDialogBig"
            :append-to-body="true"
            :before-close="handleClose"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增显示方案</span>
            <div class="archives_style">
                    <div class="side_tree">
                        <p>默认显示方案</p>
                        <p>默认显示方案1</p>
                        <p>默认显示方案2</p>
                    </div>
                    <div class="content">
                        显示内容
                    </div>
             </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancel">取 消</el-button>
                <el-button size="small" type="primary" @click="show = false">确 定</el-button>
            </span>
        </el-dialog>

      
    </div>
</template>

<script>
export default {
    name:"show_style",
    props:{
        show:Boolean,
        data:Object,        
    },
    model:{
        prop:"show",
        event:"close"
    },
    methods:{
        handleClose(){
            this.$emit("close",false)          
        },
        cancel(){
            this.$emit("close",false)         
        },
    }
};
</script>


