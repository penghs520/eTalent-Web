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
            }
            .btn:hover i{
                    display: block;
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
                        <el-input v-show="showInput" size="mini" v-model="data.styleName" @click="inputName" placeholder="请输入方案名称"></el-input>
                        <el-button @click="addNewStyle" size="small">添加新的方案</el-button>
                    </div>
                    <div class="content">
                        <div class="operate">
                            <el-button type="plain" size="mini">删除</el-button>
                            <el-button type="plain" size="mini">设为默认方案</el-button>
                            <el-button type="primary" size="mini">保存</el-button>
                        </div>
                        <div class="show_heaher">
                            <h3>显示表头</h3>
                            <el-row :gutter="20" v-if="checkTry.length > 0">
                                  <el-col :span="4" v-for="(item,index) in checkTry" :key="index" >
                                       <span class="btn">
                                            <i class="el-icon-close" @click="delField(index)"></i>
                                            <el-button type="plain" size="small">{{item.fieldName}}</el-button>
                                      </span>  
                                   </el-col> 
                            </el-row>                         
                       </div>
                        <div class="sort">
                            <h3>数据排序</h3>
                            <el-button type="plain" size="small">单位升序<i class="el-icon-arrow-up"></i></el-button>
                            <el-button type="plain" size="small">部门升序<i class="el-icon-arrow-up"></i></el-button>
                        </div>
                        <div class="readyField">
                            <h3>待选字段</h3>
                            <el-tabs  type="border-card" @tab-click="handleClick"  v-model="activeName">
                                <el-tab-pane :label="item.tableName" :name="String(item.tableId)" v-for="(item,index) in tabsList" :key="index" >
                                    <div class="title" v-for ="(sec,index) in fieldList" :key="index">

                                        <el-checkbox v-model="sec.checkAll"  @change="handleCheckAll($event,sec)">{{sec.groupName}}</el-checkbox>
                                        <el-checkbox-group v-model="sec.checkedList" @change="handleCheckedChange($event,sec)">
                                               <el-row :gutter="20">
                                                <el-col :span="5"  v-for="(it,index) in sec.customFieldVOList" :key="index">
                                                    <el-checkbox  :label="it">{{it.fieldName}}</el-checkbox>                                                
                                                </el-col>
                                              </el-row>
                                        </el-checkbox-group>

                                    </div>
                               </el-tab-pane>
                            </el-tabs>
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

export default {
    name:"show_style",
    components:{
        tree,
    },
    props:{
        show:Boolean,
        data:Object,       
    },
    model:{
        prop:"show",
        event:"close"
    },
    created(){
        this.getTabsMenu() 
    },
    data(){
        return{
            activeName:"",
            showInput:false,
            tabsList:[],
            fieldList:[],
            allCheckedList:[],
        }       
    },
    computed:{
        "checkTry"(){
           let list =  this.fieldList.map( item=>item.checkedList)
           let arr= []
            list.forEach(item=>{
                item.forEach(sec=>{
                    arr.push(sec)
                })
            })
            return arr
        }
    },
    watch:{
        'fieldList':{
        handler(newVal){
           let list =  newVal.map( item=>item.checkedList)
           let arr= []
            list.forEach(item=>{
                item.forEach(sec=>{
                    arr.push(sec)
                })
            })
            console.log("---------------",arr);
            
           this.allCheckedList.push(...arr)
           this.allCheckedList = this.allCheckedList.filter((item, index, self) => index === self.findIndex((t) => (t.fieldId === item.fieldId && t.fieldName === item.fieldName)));
            },
            deep:true,
        },
    },
    methods:{
        //点击叉号删除字段
        delField(index){
            // this.allCheckedList.splice(index,1)
        },
        //多选框点击
        handleCheckedChange(value,sec){
             let checkedCount = value.length;
             sec.checkAll = checkedCount === sec.customFieldVOList.length;
             let val = JSON.parse(JSON.stringify(value))
            //  this.checkedList.push(...val)
            //  this.checkedList = this.checkedList.filter((item, index, self) => index === self.findIndex((t) => (t.fieldId === item.fieldId && t.fieldName === item.fieldName)));
             console.log(val);
                        
             
        },
        //全选改变
        handleCheckAll(val,sec){           
            sec.checkedList = val ? sec.customFieldVOList : [];
            // this.checkedList.push(...sec.checkedList) 
            //  this.checkedList = this.checkedList.filter((item, index, self) => index === self.findIndex((t) => (t.fieldId === item.fieldId && t.fieldName === item.fieldName)));

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
                        item.checkAll = false
                        item.checkedList = []
                    }) 
                    this.fieldList =  JSON.parse(JSON.stringify(list))              
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
                    this.tabsList = res.data.result
                    this.activeName = String(res.data.result[0].tableId) 
                }else{
                    base.error(res.data)
                }
            })
        },
        //显示方案名
        inputName(){
            
        },
        //点击添加新方案按钮
        addNewStyle(){
            this.showInput = true
        },
        //关闭弹窗
        handleClose(){
            this.$emit("close",false)          
        },
        //tab栏切换
        handleClick(tab){
            if(!tab.name){
                return
            }      
            this.getField(Number(tab.name))              
        }
    }
};
</script>


