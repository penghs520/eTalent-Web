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
    }
}   
</style>
<style lang="scss" scoped>
#archives_ledger {
    display: flex;
    height: 100%;
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
            overflow: auto;
            .sider{
                box-sizing: border-box;
                width: 215px;
                border-right: 1px solid #f0f0f0;
                padding: 16px 16px 0px 20px;
                font-size: 16px;
            }
            .common_content{
                flex: 1;
                box-sizing: border-box;
                padding-top: 16px;
                overflow: auto;
             
            }
            .switch_title{
                font-size: 14px;
                margin-right: 10px;
                margin-bottom: 20px;
            }
        }
        .form_cont,
        .dropdown{
            margin-left: 24px;
            display: flex;
            align-items: center;
        }
    }  
}
 .group_list {
    margin-top: 10px;
    padding-left: 35px;
    }

</style>

<template>
    <div id="archives_ledger">
        <div class="content" v-if="!addStyleShow">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 常用台账 -->
                <el-tab-pane label="常用台账" name="common" class="common">
                    <!-- 左侧树形 -->
                    <div  class="sider">
                        <span class="switch_title">含共享台账：</span>
                        <el-switch
                            v-model="switchValue"
                            active-color="#19ADE6"
                            inactive-color="#ccc"
                            @change="switchChange">                           
                        </el-switch>
                       <tree :treeData="treeData"></tree>
                    </div>
                    <div  class="common_content">
                        <commonTable :table="ledgerTable" ref="commonTable" ></commonTable>                       
                    </div>
                                   
                  </el-tab-pane>
                   <!-- 台账设置 -->
                   <el-tab-pane label="台账设置" name="setting" class="common">
                    <!-- 台账设置侧边 -->
                    <div class="sider">
                        <el-row :gutter="10">
                          <el-col :span="8"><el-button type="plain" size="small" :style="{ marginBottom :'16px'} " @click="addLedger">新增</el-button></el-col>
                          <el-col :span="8"><el-button type="plain" size="small" @click="editLedger">编辑</el-button></el-col>
                          <el-col :span="8"><el-button type="plain" size="small" @click="delLedger">删除</el-button></el-col>
                        </el-row>  
                        <tree :treeData="treeData"></tree>
                        <!--新增编辑台账弹窗-->
                        <el-dialog
                                :visible.sync="addDialogShow"
                                class="qinjeeDialogMini"
                                :append-to-body="true"
                                :close-on-click-modal="false"
                                center
                                 >
                                <span slot="title">{{dialogTitle}}</span>
                                <div class="qinjeeDialogMiniCont">
                                    <el-form :model="addLegerForm" :rules="rules" ref="addLegerForm" label-width="100px" class="demo-ruleForm">
                                        <el-form-item label="台账名称" prop="name">
                                            <el-input v-model.trim="addLegerForm.name" size="mini" placeholder="请输入名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否共享">
                                            <el-switch v-model="addLegerForm.isShare"></el-switch>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                 <el-button size="small" @click="addDialogShow = false">取 消</el-button>
                                 <el-button size="small" type="primary" @click="addLedgerReq('addLegerForm')">确 定</el-button>
                                </span>
                        </el-dialog> 
                        <!-- 删除台账弹窗 -->
                        <el-dialog
                            :visible.sync="delDialogShow"
                            class="qinjeeDialogMini"
                            :append-to-body="true"
                            :close-on-click-modal="false"
                            center
                             >
                            <span slot="title">确认删除</span>
                            <div class="qinjeeDialogMiniCont">
                             <div>
                                <div>                                    
                                    <i class="el-icon-warning warning icon"></i>
                                    <span>是否确认删除以下台账?</span>                                   
                                </div>
                                 <div class="group_list">
                                     {{ledgerNode.standingBookName}}
                                 </div>
                                </div>
                             </div>
                            <span slot="footer" class="dialog-footer">
                              <el-button size="small" @click="delDialogShow = false">取 消</el-button>
                              <el-button size="small" type="primary" @click="delLedgerReq">确 定</el-button>
                            </span>
                       </el-dialog> 
                    </div>
                    <!-- 台账设置表格 -->
                    <div class="common_content">
                    </div>   
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 展示方案组件 -->
        <showStyle v-if="addStyleShow" :data="styleData" @defaultStyle="recordDefaultStyle = $event"></showStyle>   
    </div>
</template>

<script>
import tree from '../../components/tree/tree'
import base from '../../assets/js/base'
import commonTable from "../../components/table/commonTable";
import showStyle from "./components/showStyle.vue";

import { archives_ledger_api1,
         archives_ledger_api2,
         archives_ledger_api3,
         archives_ledger_api4,
         archives_ledger_api5,
         archives_ledger_api6,
         archives_ledger_api7,
         archives_ledger_api13,
         sys_api1,
         } from '../../request/api'
export default {
    name:"archives_ledger",
    components:{
        tree,
        commonTable,
        showStyle,        
    },  
    data(){
        return {
            activeName:"common",
            switchValue:false,
            treeData: {
                data: [],
                // nodeKey: "",
                props: {
                    children: "",
                    label: "standingBookName",
                },
                icons:[],
                nodeClick: this.ledgerNodeClick,
            },
            ledgerNode:"",
            //台账表格
            ledgerTable: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'employeeNumber', isShow: true},
                    {name: '单位', key: 'businessUnitName', isShow: true},
                    {name: '部门', key: 'orgName', isShow: true},
                    {name: '人员分类', key: 'idType', isShow: true},
                    {name: '岗位', key: 'postName', isShow: true},
                    {name: '入职日期', key: 'hireDate', isShow: true},
                    {name: '试用期到期日', key: 'probationDueDate', isShow: true , width:"120px"},
                    {name: '直接上级', key: 'supervisorUserName', isShow: true},
                    {name: '联系电话', key: 'phone', isShow: true},
                    {name: '任职类型', key: 'attritionType', isShow: true},
                    // {name: '第一学历', key: 'idType', isShow: false},
                    // {name: '紧急联系人姓名', key: 'idType', isShow: false},
                    // {name: '紧急联系人电话', key: 'idType', isShow: false},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
                    {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type1',
                        defaultVal: '',
                        label:"人员分类：",
                        method:this.selectArchiveType,
                        list:[]
                    },
                    {
                        type: 'selectTree',                       /* 单选下拉框树形 */
                        placeholder: '请筛选机构',
                        label:"部门选择：",
                        key: 'typeTree',                         // 必须,树形下拉框选择值绑定的变量
                        showKey: 'typeTreeName',                 // 必须,树形下拉框选择值显示的值绑定的变量                        
                        nodeValueKey: 'orgId',                  // 必须,树形下拉框选中的节点对象中要取的值的key
                        nodeShowKey: 'orgName',                 // 必须,树形下拉框选中的节点对象中要显示的值的key
                        //下拉机构树
                        treeData: {
                            data: [],
                            props: {
                                children: "childList",
                                label: "orgName",
                            },
                            icons:[],
                            showCheckbox: true,
                            checkClick: this.checkTreeClick,
                            showDefaultIcon: true, 
                     },
                    },
                     {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type2',
                        defaultVal: '',
                        label:"兼职状态：",
                        method:this.selectStatus,
                        list:[
                            {value:"全选"},
                            {value:"主职"},
                            {value:"兼职"},
                         ],
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '查询',                   /* 必须，按钮名称 */
                        btnType: 'primary',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.seachLedger             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type3',
                        label:"显示方案：",
                        defaultVal: '',
                        isShow :false,
                        method:this.selectValueChange,
                        list:[],
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '导出', 
                        isShow :false,                  /* 必须，按钮名称 */
                        btnType: 'plain',             /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.exportLedger             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.selectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                activeColumn:"",                        /* 非必须，给列加高亮，值是该列表格头显示的名称，多列的话要写成数组格式 */
                cellClick: this.cellClick,              /* 非必须，表格单元格被点击的回调，接收3个参数：该列的key、行数据、该单元格显示的内容 */
                pageResize: false,                      /* 非必须，页码重置 */
                pageHide: false,                        /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
                formatter: this.timeFormatter, 
            },
            archiveType:"",
            orgList:[],
            workType:"",
            //显示台账方案
            addStyleShow:false, 
            styleData:{
                handleClose:this.handleClose,
            },
            recordDefaultStyle:"",
            changeDefaultStyle:"",
            updateDefaultStyle:"",       
            //新增编辑台账
            addDialogShow:false,
            dialogTitle:"", 
            addLegerForm:{
                name:"",
                isShare:false,
                standingBookId:"",
            },
            rules:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
            },           
            //删除台账
            delDialogShow:false,
            
                  
        }
    },
    created(){
        this.getOrgTreeReq()       //获取机构树
        this.getNotShareLeger()    //获取不共享台账 
        this.getStyleList()        //获取模块方案
        this.archiveTypeReq()      //获取人员分类
    },
    beforeDestroy(){
        let send = {
                querySchmeId:this.recordDefaultStyle
            }
        this.styleChangeReq(send)
    },
    watch:{
        'ledgerTable.data'(newVal,oldVal){
            if(newVal.length === 0){
                this.ledgerTable.bar[4].isShow = false
                this.ledgerTable.bar[5].isShow = false
            }else{
                this.ledgerTable.bar[4].isShow = true
                this.ledgerTable.bar[5].isShow = true
            }
        }
    },
    methods:{
       
        //台账设置--删除按钮
        delLedger(){
            if(!this.ledgerNode){
                this.$message.warning("请选择需要删除的台账")
                return
            }
            this.delDialogShow = true;
        },
        //台账设置--删除台账请求
        delLedgerReq(){
            let send = {
                standingBookId:this.ledgerNode.standingBookId
            }
            base.log("s","删除台账请求",send)
             archives_ledger_api5(send,res=>{
                 base.log("r","删除台账请求",res.data)
                 if(res.data.success){
                     this.$message.success("删除台账成功")
                     this.getNotShareLeger()
                     this.delDialogShow = false;
                 }else{
                     base.error(res.data)
                 }
             })             
        }, 
        //台账设置--新增/编辑弹窗确定按钮
        addLedgerReq(formName){
               this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.dialogTitle === "新增台账"){
                        let send ={
                            standingBookVo: {
                                  isShare: this.addLegerForm.isShare ? 1 : 0,
                                  standingBookName: this.addLegerForm.name,
                            }
                         }
                        base.log("s","新增编辑台账",send)
                         archives_ledger_api6(send,res =>{
                         base.log("s","新增编辑台账",res.data)
                           if(res.data.success){
                               this.addDialogShow = false
                           }else{
                               base.error(res.data)
                           }
                       })                     
                    }else{
                        let send = {
                            isShare: this.addLegerForm.isShare,
                            standingBookName: this.addLegerForm.name,
                            standingBookId: this.addLegerForm.standingBookId,
                        }
                        base.log("s","新增编辑台账",send)
                         archives_ledger_api6(send,res =>{
                         base.log("s","新增编辑台账",res.data)
                           if(res.data.success){
                               this.addDialogShow = false
                           }else{
                               base.error(res.data)
                           }
                       })  
                    }                  
                } else {                
                  return false;
                }
          });           
        },
        //台账设置--编辑
        editLedger(){
            if(!this.ledgerNode){
                this.$message.warning("请选择需要编辑的台账")
                return
            }
            this.addLegerForm.standingBookId = this.ledgerNode.standingBookId
            this.addLegerForm.name = this.ledgerNode.standingBookName
            this.addLegerForm.isShare = this.ledgerNode.isShare
            this.addDialogShow = true;
            this.dialogTitle = "编辑台账"
              setTimeout(() => {
                 this.$refs.addLegerForm.clearValidate()
             }, 0);
        },
        //台账设置--新增按钮
        addLedger(){
             this.addDialogShow = true;
             this.dialogTitle = "新增台账";
             this.addLegerForm.name = "";
             this.addLegerForm.isShare = false;
             setTimeout(() => {
                 this.$refs.addLegerForm.clearValidate()
             }, 0);
        },
        
        //显示方案--关闭弹窗
        handleClose(){
            this.addStyleShow = false
            this.getStyleList()
        },
        //获取展示方案
        getStyleList(){           
            archives_ledger_api7(null,res=>{
                base.log("r","获取显示方案",res.data)
                if(res.data.success){
                    let list = JSON.parse(JSON.stringify(res.data.result))
                    this.ledgerTable.bar[4].list = list.map(item=>{
                        return {
                            value:item.querySchemeId,
                            label:item.querySchemeName,
                        }
                    })
                    //设置默认显示方案
                    list.forEach(item=>{
                        if(item.isDefault === 1){
                            this.ledgerTable.bar[4].defaultVal = item.querySchemeId
                            this.recordDefaultStyle = item.querySchemeId
                        }
                    })
                    this.ledgerTable.bar[4].list.push({value:"+新增显示方案",label:"+新增显示方案"})
                }else{
                    base.error(res.data)
                }
            })
        },
        //台账表格--时间格式化
        timeFormatter(key,val){
            if (key === 'hireDate' || key === 'probationDueDate') {
                if (val) {
                    let newVal = val.split(' ')[0];
                    return newVal;
                }
            }else{
                return val;
            }
        },
        //查询按钮点击
        seachLedger(){
            if(!this.ledgerNode){
                this.$message.warning("请选择台账")
                return
            }
            this.getLegerReq() 
        }, 
        //查询台账请求
        getLegerReq(){
            let ids = this.orgList.map(item =>item.orgId)        
            let send = {
                // archiveType: this.archiveType,
                archiveType: "REGULAR_EMPLOYEE",
                // orgId:ids,
                orgId:28,                
                // stangdingBookId:this.ledgerNode.standingBookId,
                stangdingBookId:10,
                // type:this.workType,
                type:"兼职",
                currentPage: 1,
                pageSize: 10,
            }
            base.log("s","查询台账",send)
            archives_ledger_api4(send,res=>{
                base.log("r","查询台账",res.data)
                if(res.data.success){
                    this.ledgerTable.head = res.data.result.heads
                    this.ledgerTable.data = res.data.result.pageResult.list
                }else{
                    base.error(res.data)
                }
                
            })
        },
        //表格下拉框 -- 切换方案设置默认请求接口
        styleChangeReq(send){
            base.log("s","设置默认方案",send)
            archives_ledger_api13(send,res=>{
                 base.log("r","设置默认方案",res.data)
                if(res.data.success){
                   this.getLegerReq()
                }else{
                    base.error(res.data)
                }
            })
        },
        //表格下拉框 --表格显示方案切换
        selectValueChange(val){
            console.log(val);
            this.changeDefaultStyle = val
           if(val ===  "+新增显示方案"){
                let send = {
                    querySchmeId:this.recordDefaultStyle
                }
                this.styleChangeReq(send)
                this.addStyleShow = true
            }else if(val === ""){
                return
            }else{
                 let send = {
                    querySchmeId:val
                }
                this.styleChangeReq(send)
           }          
        },
        //表格下拉框 -- 机构树 
        checkTreeClick(val,list){
            this.orgList =  list.checkedNodes
            console.log("机构",list.checkedNodes);            
        },
        //表格下拉框 -- 工作状态 
        selectStatus(val){
            this.workType = val
            console.log(val);
        }, 
        //表格下拉框 -- 人员分类
        selectArchiveType(val){
            this.archiveType = val
            console.log(val);            
        },
        //表格下拉框--人员分类请求
        archiveTypeReq(){
            let send ={
                dictType:"USER_CATEGORY"
            }
            base.log("s","人员分类请求",send)
            sys_api1(send,res=>{
            base.log("r","人员分类请求",res.data)
                if(res.data.success){
                    let list = JSON.parse(JSON.stringify(res.data.result))
                    this.ledgerTable.bar[0].list = list.map(item=>{
                        return {
                            value:item.dictCode,
                            label:item.dictValue,
                        }
                    })
                }else{
                    base.error(res.data)
                }
            })
        },
        //台账树--节点点击
        ledgerNodeClick(node){
            this.ledgerNode = node
            console.log(node);
            
        },
        //台账树--获取机构树
        getOrgTreeReq() {
            let send = {
                isEnable: 0
            };
            base.log("s", "查询树", send);
            archives_ledger_api1(send, res => {                
                base.log("r", "查询树", res.data);
                if (res.data.success) {                                  
                    this.ledgerTable.bar[1].treeData.data = res.data.result.list;
                } else {
                    base.error(res.data);
                }
            });
        },
        //共享开关转换
        switchChange(val){
            console.log(val);           
            if(val){
                this.getShareLeger()
            }else{
                this.getNotShareLeger() 
            }           
        },
        //获取含共享台账--请求接口
        getShareLeger(){
             archives_ledger_api3(null,res=>{
                 base.log("r","共享台账",res.data)
                if(res.data.success){
                    this.treeData.data = res.data.result
                }else{
                    base.error(res.data)
                }
            })
         },
        //获取不含共享台账--请求接口
        getNotShareLeger(){
            archives_ledger_api2(null,res=>{
                 base.log("r","不共享台账",res.data)
                if(res.data.success){
                    this.treeData.data = res.data.result
                }else{
                    base.error(res.data)
                }
            })
        },
        //tabs栏切换
        handleClick(tab){
            if(tab.name === "setting"){              
                this.ledgerNode = ""
                console.log(this.switchValue);               
                this.getNotShareLeger()
            }else{              
                this.ledgerNode = ""
                this.getNotShareLeger()
                this.switchValue ? this.getShareLeger() : this.getNotShareLeger()
            }
        }
    }
}
</script>