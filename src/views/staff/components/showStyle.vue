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
</style>

<template>
    <div id="archives_style">
     <div class="content">
           <div class="title">新增显示方案</div>
           <div class="main">
                <div class="sider">
                    <!-- 左侧菜单树形 -->
                    <el-row :gutter="10">
                      <el-col :span="8"><el-button type="plain" size="small" :style="{ marginBottom :'16px'} " >新增</el-button></el-col>
                      <el-col :span="8"><el-button type="plain" size="small" >编辑</el-button></el-col>
                      <el-col :span="8"><el-button type="plain" size="small" >删除</el-button></el-col>
                    </el-row>                   
                     <tree :treeData = data.treeData ></tree>
                </div> 
                    <!-- 内容区-->
                <div class="common_content">
                    <div class="operate">
                        <el-button type="primary" size="small" @click="defaultStyle">设为默认方案</el-button>
                    </div>
                    <!-- 显示表头 -->
                    <div class="show_heaher">
                            <h3 class="sub_title">显示表头 <span class="drag_sort">可拖拽调整显示顺序</span></h3>
                            <span style="display: none;"></span>
                            <draggable
                                    class="sortComponent"
                                    v-model="tableList"
                                    group="people"
                                    @start="drag=true"
                                    @end="drag=false">
                                        <span class="btn" v-for="(item,index) in tableList" :key="index" >
                                            <i class="el-icon-error" @click="delField(index)"></i>
                                            <el-button class="moveBtn"  type="primary" size="small">
                                                {{item.fieldName}}
                                            </el-button>
                                        </span>  
                            </draggable>
                    </div>
                    <!-- 排序 -->
                    <div class="sort">
                        <h3 class="sub_title">数据排序 <span class="drag_sort">可拖拽调整显示顺序</span></h3>
                        <draggable
                            class="sortComponent"
                            v-model="sortList"
                            group="people"
                            @start="drag=true"
                            @end="drag=false">
                                <span class="btn" :span="4" v-for="(item,index) in sortList" :key="index">
                                    <i class="el-icon-error" @click="delFieldsort(index)"></i>
                                    <el-button   type="primary" size="small">
                                        {{item.fieldName}}
                                    </el-button>
                                </span>  
                        </draggable>
                    </div>
                    <!-- 待选字段 -->
                    <div class="ready_field">
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
                    <div class="footer_btn">
                        <el-button type="plain" size="small" @click="handleClose">返回</el-button>
                        <el-button type="primary" size="small" @click="saveStyle">保存</el-button>
                    </div>
                </div>
           </div>
        </div>   
    </div>
</template>

<script>
import tree from "../../../components/tree/tree"
import base from "../../../assets/js/base"
import { archives_ledger_api8, archives_ledger_api9 } from "../../../request/api";
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
            tabName:"",
            checkTry2: [],
            tableList:[],
            sortList:[],
        }       
    },
    computed:{

    },
    mounted(){
        // 初始化
        this.getTabsMenu()  
    },
    methods:{
        //设置默认按钮
        defaultStyle(){
        },
        //点击表头叉号删除字段
        delField(index){            
           this.tableList.splice(index,1)       
        },
        //点击表头叉号取消排序
        delFieldsort(index){            
           this.sortList.splice(index,1)       
        },
        //点击下拉框
        handleCommand(command,sub){
           //添加到排序
           if(command === "sort"){
               let judge = this.sortList.findIndex(item => item.fieldId === sub.fieldId)
                if(judge == -1){
                   this.sortList.push(sub)
               }
           }else if(command === "tableHead"){
               let judge = this.tableList.findIndex(item => item.fieldId === sub.fieldId)
                if(judge == -1){
                   this.tableList.push(sub)
               }
           }
        },
        //获取字段名
        getField(tableId){
            let send = {
                tableId,
            }
            base.log("s","获取字段",send)
              archives_ledger_api9(send,res=>{
                base.log("r","获取字段",res.data)
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
        //保存按钮方案名
        saveStyle(){
            if(this.data.getStyleName){
                    this.data.getStyleName()
            }
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


