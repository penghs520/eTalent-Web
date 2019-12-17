<style lang="scss" scope>
#archives_style{
    display: flex;
    width: 100%;
    height: 100%;
    // overflow: hidden;
    .content {
        width: 100%;
        height:  calc(100% - 64px);
        border: 10px solid #f0f0f0;
        border-bottom: none;
        box-sizing: border-box;
        background-color: #fff;
        .title{
            box-sizing: border-box;
            height: 64px;
            padding: 24px 24px 0px 24px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 16px;
            color: #676B6D;
            text-align: left;
        }
        .main{
            display: flex;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            .sider{
                box-sizing: border-box;
                width: 215px;
                height: 100%;
                border-right: 1px solid #f0f0f0;
                padding: 16px;
                font-size: 16px;
                background-color: #fff;
            }
            .common_content{
                box-sizing: border-box;
                flex: 1;
                height: 100%;
                padding: 16px 0px 0px 24px;
                overflow: auto;
                background-color: #fff;
                text-align: left;
            .sub_title{
                margin: 16px 0px;
                font-size: 16px;
                .drag_sort{
                    font-size: 14px;
                    font-weight: 400;
                    color: #7F8284;
                }
            }
            .show_heaher{
                .btn{
                position: relative;
                display: inline-block;
                margin:0px 12px 16px 0px;
                    i{
                        position: absolute;
                        display: none;
                        right: -5px;
                        top: -5px;
                        font-size: 18px;
                        color: #737373;
                    }                
                    .moveBtn{
                        cursor: move;
                    }
                }
                .btn:hover i{
                    display: block;
                    cursor: pointer;
                }
            }
            .sort{
                .btn{
                position: relative;
                display: inline-block;
                margin:0px 12px 16px 0px;
                    i{
                        position: absolute;
                        display: none;
                        z-index: 10;
                        right: -5px;
                        top: -5px;
                        font-size: 18px;
                        color: #737373;
                    }                
                    .moveBtn{
                        cursor: move;
                    }
                }
                .btn:hover i{
                    display: block;
                    cursor: pointer;
                }
            }
            .ready_field{
                .tab_content{
                    margin-top: 24px;
                }
                .btn_wrap{
                    display: inline-block;
                    position: relative;
                    margin: 0px 12px 16px 0px;
                    .mark_add{
                        position: absolute;
                        display: none;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.65);
                        color:#fff;
                        font-size: 14px;
                        text-align: center;
                        line-height: 32px;
                        border-radius: 3px;
                        cursor: pointer;
                        .add{
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .btn_wrap:hover .mark_add{
                        display: block;
                    }
            }
            .footer_btn{
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }
    
}
.group_list {
        margin-top: 10px;
        padding-left: 35px;
    }
</style>

<template>
    <div id="archives_style">
     <div class="content">
           <div class="title">新增显示方案</div>
           <div class="main">
                <div class="sider">
                    <!-- 左侧菜单树形 -->
                    <el-row :gutter="10">
                      <el-col :span="8"><el-button type="plain" size="small" :style="{ marginBottom :'16px'} " @click="addStyle" >新增</el-button></el-col>
                      <el-col :span="8"><el-button type="plain" size="small" @click="editStyle">编辑</el-button></el-col>
                      <el-col :span="8"><el-button type="plain" size="small" @click="delStyleBtn">删除</el-button></el-col>
                    </el-row>
                    <tree :treeData="treeData"></tree>
                </div> 
                <!-- 新增编辑方案弹窗 -->
                 <el-dialog
                    :visible.sync="addDialogShow"
                    class="qinjeeDialogMini"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center>
                    <span slot="title">{{dialogTitle}}</span>
                    <div class="qinjeeDialogMiniCont">
                        <el-form :model="addStyleForm" :rules="rules" ref="addStyleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="方案名称" prop="name">
                                <el-input v-model.trim="addStyleForm.name" size="mini" placeholder="请输入名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="addDialogShow = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="saveStyleName('addStyleForm')">确 定</el-button>
                    </span>
                 </el-dialog> 
                 <!-- 删除方案弹窗 -->
                 <el-dialog
                    :visible.sync="delStyleShow"
                    class="qinjeeDialogMini"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center>
                    <span slot="title">确认删除</span>
                    <div class="qinjeeDialogMiniCont">
                        <div>
                            <div>
                                <i class="el-icon-warning warning icon"></i>
                                <span>是否确认删除以下查询方案?</span>
                            </div>
                            <div class="group_list">
                                <div>{{treeNode.querySchemeName}}</div>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="delStyleShow = false">取 消</el-button>
                        <el-button size="small" type="primary" @click="delStyle">确 定</el-button>
                    </span>
                    </el-dialog>
                <!-- 内容区-->
                <div class="common_content" >
                    <div class="operate" v-show="treeNode">
                        <el-button type="primary" size="small" @click="defaultStyleReq">设为默认方案</el-button>
                    </div>
                    <!-- 显示表头 -->
                    <div class="show_heaher" v-show="treeNode">
                            <h3 class="sub_title">显示表头 <span class="drag_sort">可拖拽调整显示顺序</span></h3>
                            <span style="display: none;"></span>
                            <draggable
                                    class="sortComponent"
                                    v-model="tableList"
                                    group="people"
                                    @start="drag=true"
                                    @end="drag=false">
                                        <span class="btn" v-for="(item,index) in tableList" :key="index" >
                                            <i class="el-icon-error" @click="delField(index)" v-show="item.fieldName !== '姓名'"></i>
                                            <el-button class="moveBtn"  type="primary" size="small" :disabled="item.fieldName === '姓名'">
                                                {{item.fieldName}}
                                            </el-button>
                                        </span>  
                            </draggable>
                    </div>
                    <!-- 排序 -->
                    <div class="sort" v-show="treeNode">
                        <h3 class="sub_title">数据排序 <span class="drag_sort">可拖拽调整显示顺序</span></h3>
                        <draggable
                            class="sortComponent"
                            v-model="sortList"
                            group="people"
                            @start="drag=true"
                            @end="drag=false">
                                <span class="btn" :span="4" v-for="(item,index) in sortList" :key="index">
                                    <i class="el-icon-error" @click="delFieldsort(index)"></i>
                                    <el-button   type="primary" size="small" @click="statusChange(index)" >
                                        {{item.fieldName}}{{item.sortStatus ? "(升序)" : "(降序)"}}
                                    </el-button>
                                </span>  
                        </draggable>
                    </div>
                    <!-- 待选字段 -->
                    <div class="ready_field" v-show="treeNode">
                            <h3 class="sub_title">待选字段</h3>
                            <el-tabs @tab-click="handleClick"  v-model="activeName">
                                <el-tab-pane :label="item.tableName" :name="String(item.tableId)" v-for="(item,index) in tabsList" :key="index" >
                               </el-tab-pane>
                            </el-tabs>
                            <div v-for="(item, itemIndex) in tabContList" :key="itemIndex" class="tab_content">
                                <span v-if="typeof item !== 'number'">
                                    <span  v-for ="(sec,index) in item" :key="index">
                                        <span v-if="sec.tableId == tabName">
                                            <span  v-for="(sub,index) in sec.customFieldVOList" :key="index" class="btn_wrap">
                                                <el-button class="moveBtn"  type="plain" size="small">{{sub.fieldName}}</el-button>
                                                <el-dropdown class="mark_add" trigger="click" size="medium" @command="handleCommand($event,sub)">
                                                     <span class="el-dropdown-link">
                                                        <span class="add">添加</span>
                                                     </span>
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item command="sort">排序</el-dropdown-item>
                                                        <el-dropdown-item command="tableHead">表头</el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                    </div>
                    <!-- 底部 -->
                    <div class="footer_btn" >
                        <el-button type="plain" size="small" @click="handleClose">返回</el-button>
                        <el-button type="primary" size="small" @click="saveStyle" :disabled="!treeNode">保存</el-button>
                    </div>
                </div>
           </div>
        </div>   
    </div>
</template>

<script>
import tree from "../../../components/tree/tree"
import base from "../../../assets/js/base"
import { archives_ledger_api7,
         archives_ledger_api8,
         archives_ledger_api9,
         archives_ledger_api10,
         archives_ledger_api11,
         archives_ledger_api12,
         archives_ledger_api13,
          } from "../../../request/api";
import draggable from "vuedraggable";

export default {
    name:"show_style",
    components:{
        tree,
        draggable
    }, 
    props:{
        show:Boolean,
        data:Object,        
    },   
    data(){
        return{
            activeName:"",
            styleName:"",
            tabsList:[],   
            tabContList: [],
            tabName:"",       //tab栏绑定的name
            tableList:[],
            sortList:[],
            //左侧菜单
            treeData: {
                data: [],
                props: {
                    children: "",
                    label: "querySchemeName",
                },
                nodeClick: this.styleNodeClick,
            },
            treeNode:"",
            addDialogShow:false,
            addStyleForm:{
                name:"",
            },
            rules:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
            },
            dialogTitle:"新增方案",
            //删除方案
            delStyleShow:false,
        }       
    },
    mounted(){
        // 初始化
        this.getStyleReq()
        this.getTabsMenu()  
    },
    methods:{
        //删除方案--点击按钮
        delStyleBtn(){
            if(!this.treeNode){
                this.$message.warning("请选择查询方案")
                return
            }
            this.delStyleShow = true
        },
        //删除方案--请求接口
        delStyle(){
            let send = [this.treeNode.querySchemeId]
            base.log("s","删除方案",send)
            archives_ledger_api11(send,res=>{
                base.log("r","删除方案",res.data)
                if(res.data.success){
                    this.$message.success("删除成功");
                    this.delStyleShow = false;
                    this.getStyleReq()
                }else{
                    base.error(res.data)
                }
            })
        },
        //保存按钮方案名
        saveStyle(){
           this.addStyleReq()
        },
        //点击编辑按钮
        editStyle(){
            if(!this.treeNode){
                this.$message.warning("请选择一个编辑方案")
                return
            }
            this.addStyleForm.name = this.treeNode.querySchemeName
            this.addDialogShow = true
            this.dialogTitle = "编辑方案"
             setTimeout(() => {
                 this.$refs.addStyleForm.clearValidate()
             }, 0);
        },
        //新增方案 --保存名称按钮
        saveStyleName(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.dialogTitle == "新增方案"){
                        this.addDialogShow = false
                        this.treeData.data.push({
                            querySchemeName:this.addStyleForm.name
                        })
                    }else if(this.dialogTitle == "编辑方案"){
                        this.addDialogShow = false
                        this.treeData.data.forEach(item=>{
                            if(item.querySchemeName == this.treeNode.querySchemeName){
                                item.querySchemeName  = this.addStyleForm.name
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //新增编辑方案--请求接口
        addStyleReq(){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            let fieldIds = this.tableList.map(item => item.fieldId) 
            let sortIds = this.sortList.map(item =>{
                   return {
                       fieldId:item.fieldId,
                       orderByRule:item.sortStatus ? "升序" : "降序",
                   }
            })
            let send = {
                    archiveId: userInfo.archiveId,
                    fieldId: fieldIds,
                    querySchemeId: this.treeNode.querySchemeId ? this.treeNode.querySchemeId : "",
                    querySchemeName: this.treeNode.querySchemeName,
                    sort: this.treeNode.index,
                    sorts:sortIds,
                }
                base.log("s","新增编辑方案",send)
            archives_ledger_api10(send,res=>{
                base.log("r","新增编辑方案",res.data)
                if(res.data.success){   
                    this.$message.success("操作成功")
                    this.getStyleReq()
                }else{
                    base.error(res.data)
                }
            })
        },
        //左侧菜单--树形节点点击
        styleNodeClick(node){
            this.treeNode = node
            this.tableList = []
            this.sortList = []
            // 点击树形给sortId赋值
            this.treeData.data.forEach((item,index) => {
                if(item.sortId){
                    this.treeNode.index = item.sortId
                }else{
                    if(item.querySchemeName === node.querySchemeName){
                    this.treeNode.index = index
                  }
               }
            })
            
            //点击树形触发渲染数据
            if(node.querySchemeId){
                this.getStyleInfo(node)
            }else{
                this.tabContList = this.tabContList.map(item=>{                        
                    item.forEach(sec=>{
                            sec.customFieldVOList.forEach(sub=>{
                                if(sub.fieldName === "姓名" ){
                                     let judge = this.tableList.findIndex(item => item.fieldId === sub.fieldId)
                                    if(judge == -1){
                                        this.tableList =[sub]
                                    }
                                }
                            })
                        })
                    return  item
                })
            }
        },
        //左侧菜单--获取方案信息请求接口
        getStyleInfo(node){
            let send = {
                id:node.querySchemeId
            }
            base.log("s","查看方案信息",send)
            archives_ledger_api12(send,res=>{
                 base.log("r","查看方案信息",res.data)
                if(res.data.success){
                    //渲染默认表头
                    let tList = JSON.parse(JSON.stringify(res.data.result.querySchemeFieldList))
                    tList =  tList.map(item=>item.fieldId)
                    let tableArr = []
                    this.tabContList.forEach(item=>{                        
                        item.forEach(sec=>{
                            sec.customFieldVOList.forEach(sub=>{
                                if(tList.includes(sub.fieldId)){
                                    tableArr.push(sub)
                                }
                            })
                        })
                    })
                    this.tableList = tableArr

                    //渲染默认排序字段
                    let sList = JSON.parse(JSON.stringify(res.data.result.querySchemeSortList))
                    sList =  sList.map(item=>item.fieldId)
                    let sortArr = []
                    this.tabContList.forEach(item=>{                        
                        item.forEach(sec=>{
                            sec.customFieldVOList.forEach(sub=>{
                                if(sList.includes(sub.fieldId)){
                                    sub.sortStatus = sub.orderByRule == "升序"
                                    sortArr.push(sub)
                                }
                            })
                        })
                    })
                    this.sortList = sortArr
                }else{
                    base.error(res.data)
                }
            })
        },
        //左侧菜单--点击新增按钮
        addStyle(){
            this.addDialogShow = true;
            this.addStyleForm.name = "";
            this.dialogTitle = "新增方案"
              setTimeout(() => {
                 this.$refs.addStyleForm.clearValidate()
             }, 0);
        },
        //左侧菜单-- 获取左侧菜单
        getStyleReq(){
            archives_ledger_api7(null,res=>{
                base.log("r","获取显示方案",res.data)
                if(res.data.success){
                    let list = JSON.parse(JSON.stringify(res.data.result))
                    list.sort((a,b)=>{
                       return a.sort - b.sort
                    })
                    this.treeData.data = list
                }else{
                    base.error(res.data)
                }
            })
        },
        //内容区--设置默认按钮
        defaultStyleReq(){
             let send = {
                querySchmeId:this.treeNode.querySchemeId
            }
            base.log("s","设置默认方案",send)
            archives_ledger_api13(send,res=>{
                 base.log("r","设置默认方案",res.data)
                if(res.data.success){
                    this.$message.success("设置成功")
                    this.$emit("defaultStyle",this.treeNode.querySchemeId)
                }else{
                    base.error(res.data)
                }
            })
        },
        //内容区--点击表头叉号删除字段
        delField(index){            
           this.tableList.splice(index,1)       
        },
        //内容区--点击表头叉号取消排序
        delFieldsort(index){            
           this.sortList.splice(index,1)       
        },
        //内容区--点击升序降序
        statusChange(index){
          this.sortList = this.sortList.map((item,i)=>{
               if(index == i){
                   item.sortStatus = !item.sortStatus
               }
               return item 
           })
        },
        //内容区--点击下拉框
        handleCommand(command,sub){
           //添加到排序
           if(command === "sort"){
               let judge = this.sortList.findIndex(item => item.fieldId === sub.fieldId)
               
                if(judge == -1){
                   this.sortList.push(sub)
               }
               sub.sortStatus = true;
           }else if(command === "tableHead"){
               let judge = this.tableList.findIndex(item => item.fieldId === sub.fieldId)
                if(judge == -1){
                   this.tableList.push(sub)
               }
           }
        },
        //获取字段名--固定渲染姓名字段
        getField(tableId){
            let send = {
                tableId,
            }
            // base.log("s","获取字段",send)
              archives_ledger_api9(send,res=>{
                // base.log("r","获取字段",res.data)
                if(res.data.success){
                   let list =   JSON.parse(JSON.stringify(res.data.result.customGroupVOList))
                    list.forEach(item=>{                       
                        item.tableId   = tableId;          /* tab栏id */
                    })            
                    this.tabContList = this.tabContList.map(item=>{                        
                        if(item == tableId){
                            item = JSON.parse(JSON.stringify(list))
                        }
                        return  item
                    })
                }else{
                    base.error(res.data)
                }
            })
        },
        //获取tab栏菜单
        getTabsMenu(){
            archives_ledger_api8(null,res=>{
                base.log("r","获取tab菜单",res.data)
                if(res.data.success){
                    this.tabsList = res.data.result;
                    this.tabContList = res.data.result.map(item => item.tableId)
                    this.tabName = res.data.result[0].tableId                   
                    this.activeName = String(res.data.result[0].tableId) 

                    this.tabsList.forEach(item=>{
                        this.getField(item.tableId)
                    })
                    
                }else{
                    base.error(res.data)
                }
            })
        },
        //关闭子页面
        handleClose(){          
            if(this.data.handleClose){
                this.data.handleClose()
            }       
        },
        //tab栏切换
        handleClick(tab){
            this.tabName = tab.name                                        
        }
    }
};
</script>


