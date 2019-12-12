<style lang="scss" scope>
.archives_style{
    height: 100%;
    display: flex;
    text-align: left;
    .side_tree{
        width: 215px;
        height: 600px;
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
        .show_heaher{
            .btn{
                position: relative;
                display: inline-block;
                margin-top: 5px;
                i{
                    position: absolute;
                    display: none;
                    right: 0px;
                    color: red;
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
    }
}
.archives_style{
    width: 100%;
    margin: -32px -25px;
}

</style>
<style lang="scss">
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
                        <tree :treeData = data.treeData ></tree>
                        <el-input style="marginTop:10px;marginBottom:10px" v-show="showInput" size="mini" v-model="styleName" placeholder="请输入方案名称"></el-input>
                        <el-button  @click="addNewStyle" size="small">添加新的方案</el-button>
                    </div>
                    <div class="content">
                        <div class="operate">
                            <el-button type="plain" size="mini">删除</el-button>
                            <el-button type="plain" size="mini">设为默认方案</el-button>
                            <el-button type="primary" size="mini"  @click="saveStyle">保存</el-button>
                        </div>
                        <div class="show_heaher">
                            <h3>显示表头</h3>
                            <span style="display: none;" :checkTry="checkTry" ></span>
                            <el-row :gutter="20" v-if="checkTry2.length > 0">
                                <draggable
                                    class="sortComponent"
                                    v-model="checkTry2"
                                    group="people"
                                    @start="drag=true"
                                    @end="drag=false"
                                >
                                    <el-col :span="4" v-for="(item,index) in checkTry2" :key="index" >
                                        <span class="btn">
                                                <i class="el-icon-close" @click="delField(item)"></i>
                                                <el-button class="moveBtn" type="plain" size="small">{{item.fieldName}}</el-button>
                                        </span>  
                                    </el-col> 
                                </draggable>
                            </el-row>                         
                        </div>
                        <div class="sort">
                            <h3>数据排序</h3>
                            <el-button type="plain" size="small">单位升序<i class="el-icon-arrow-up"></i></el-button>
                            <el-button type="plain" size="small">部门升序<i class="el-icon-arrow-up"></i></el-button>
                        </div>
                        <div class="readyField">
                            <h3>待选字段</h3>
                            <el-tabs  type="card" @tab-click="handleClick"  v-model="activeName">
                                <el-tab-pane :label="item.tableName" :name="String(item.tableId)" v-for="(item,index) in tabsList" :key="index" >
                               </el-tab-pane>
                            </el-tabs>
                            <div v-for="(item, itemIndex) in tabContList" :key="itemIndex">
                                <template v-if="typeof item !== 'number'">
                                    <div class="title" v-for ="(sec,index) in item" :key="index">
                                        <div v-if="sec.tableId == tabName">
                                            <el-checkbox v-model="sec.checkAll" :indeterminate="sec.indeterminate"  @change="handleCheckAll($event,sec)">{{sec.groupName}}</el-checkbox>
                                            <el-checkbox-group v-model="sec.checkedList" @change="handleCheckedChange($event,sec)">
                                                    <el-row :gutter="20" style="marginLeft:20px">
                                                        <el-col :span="5"  v-for="(it,index) in sec.customFieldVOList" :key="index">
                                                            <el-checkbox  :label="it">{{it.fieldName}}</el-checkbox>                                                
                                                        </el-col>
                                                    </el-row>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
            </div>
        </el-dialog>      
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
            showInput:false,
            tabsList:[],
            tabContList: [],
            tabName:"",
            checkTry2: []
        }       
    },
    computed:{
        "checkTry"(){ 
            let arr = []        
            this.tabContList.forEach((item,index)=>{
                if(typeof item !== "number"){
                    item.forEach((sec,i)=>{
                        arr.push(...sec.checkedList)
                    })
                }                        
            })            
            this.$set(this,'checkTry2', arr);
            return arr
        },
    },
    created(){
        // 初始化
        this.$emit('getNav',this.getTabsMenu);
    },
    methods:{
        //点击叉号删除字段
        delField(val){            
           this.tabContList =  this.tabContList.map(item=>{ 
                if(typeof item !== "number"){ 
                    item.map(sub=>{
                        let checkedList     =  sub.checkedList.filter(sec =>  sec.fieldId !== val.fieldId);
                        sub.checkedList     =  checkedList;
                        sub.checkAll        = checkedList.length === sub.customFieldVOList.length;
                        sub.indeterminate   = checkedList.length > 0 && checkedList.length < sub.customFieldVOList.length;
                    })        
                }                 
              return item
           })           
        },
        //多选框点击
        handleCheckedChange(value,sec){
             let checkedCount = value.length;
             sec.checkAll = checkedCount === sec.customFieldVOList.length;
             sec.indeterminate = checkedCount > 0 && checkedCount < sec.customFieldVOList.length;
        },
        //全选改变
        handleCheckAll(val,sec){           
            sec.checkedList = val ? sec.customFieldVOList : [];
            sec.indeterminate   = sec.checkedList.length > 0 && sec.checkedList.length < sec.customFieldVOList.length;
        },
        //获取字段名
        getField(tableId,tabIndex){
            let send = {
                tableId,
            }
            base.log("s","获取字段",send)
              archives_ledger_api9(send,res=>{
                base.log("r","获取字段",res.data)
                if(res.data.success){
                   let list =   JSON.parse(JSON.stringify(res.data.result.customGroupVOList))
                    list.forEach(item=>{                       
                        item.checkAll       = false;            /* 是否全选 */
                        item.checkedList    = [];               /* 已经勾选的 */
                        item.tableId        = tableId;          /* tab栏id */
                        item.indeterminate  = false;            /* 是否半选 */

                        // 处理默认勾选状态
                        // 处理默认全选状态
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
                    // 构建全选状态存储的数组
                    this.isIndeterminate = new Array(res.data.result.length).fill([]);

                    this.getField(res.data.result[0].tableId,0)
                    this.tabName = res.data.result[0].tableId
                    this.tabContList = res.data.result.map(item => item.tableId)
                    this.activeName = String(res.data.result[0].tableId) 
                }else{
                    base.error(res.data)
                }
            })
        },
        //保存方案名
        saveStyle(){  
            this.showInput = false  
            if(this.data.getStyleName){
                this.data.getStyleName(this.styleName)
            }
            
        },
        //点击添加新方案按钮
        addNewStyle(){
            this.showInput = true
        },
        //关闭弹窗
        handleClose(){          
            if(this.data.handleClose){
                this.data.handleClose()
            }       
        },
        //tab栏切换
        handleClick(tab){
            this.tabName = tab.name            
            if(this.tabContList.includes(Number(tab.name))){
               this.getField(Number(tab.name)) 
            }                              
        }
    }
};
</script>


