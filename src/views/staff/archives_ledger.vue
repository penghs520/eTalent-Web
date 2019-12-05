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
                padding-top: 16px;
                overflow: auto;
             
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

</style>

</<template>
    <div id="archives_ledger">
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 常用台账 -->
                <el-tab-pane label="常用台账" name="common" class="common">
                    <!-- 左侧树形 -->
                    <div class="sider">
                       <tree :treeData="treeData"></tree>
                    </div>
                    <div class="common_content">
                        <commonTable :table="ledgerTable" ref="commonTable" ></commonTable>                       
                    </div>                   
                </el-tab-pane>
                 <!-- 台账设置 -->
                <el-tab-pane label="台账设置" name="setting" class="common">
                    <div class="sider">
                        <el-button type="plain" size="small" :style="{ marginBottom :'16px'} ">新增</el-button>
                        <el-button type="plain" size="small">编辑</el-button>
                        <el-button type="plain" size="small">删除</el-button>
                        <tree :treeData="treeData"></tree>
                    </div>
                    <div class="common_content">
                    </div>   
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
import tree from '../../components/tree/tree'
import base from '../../assets/js/base'
import commonTable from "../../components/table/commonTable";
import { archives_ledger_api1,
         archives_ledger_api2,
         archives_ledger_api3,
         archives_ledger_api4, 
         } from '../../request/api'
export default {
    name:"archives_ledger",
    components:{
        tree,
        commonTable,
        
    },
    data(){
        return {
            activeName:"common",
            switchValue:true, 
            treeData: {
                data: [],
                // nodeKey: "",
                props: {
                    children: "",
                    label: "standingBookName",
                },
                icons:[],
                nodeClick: this.ledgerNodeClick,
                switchOpen: true,
                switchTitle:"含共享台账：",
                switchChange: this.switchChange,
            },
            ledgerNode:"",
            //台账表格
            ledgerTable: {
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '单位', key: 'employeeNumber', isShow: true},
                    {name: '部门', key: 'orgName', isShow: true},
                    {name: '人员分类', key: 'attritionType', isShow: true},
                    {name: '岗位', key: 'postName', isShow: true},
                    {name: '入职日期', key: 'hireDate', isShow: true},
                    {name: '试用期到期日', key: 'probationDueDate', isShow: true},
                    {name: '直接上级', key: 'supervisorUserName', isShow: true},
                    {name: '联系电话', key: 'phone', isShow: true},
                    {name: '任职类型', key: 'idType', isShow: true},
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
                        method:this.selectClassify,
                        list:[
                            {value:"全选"},
                            {value:"正式"},
                            {value:"试用"},
                            {value:"实习"},
                            {value:"离职"},
                            {value:"退休"},
                        ]
                    },
                    {
                        type: 'selectTree',                 /* 单选下拉框树形 */
                        placeholder: '请筛选机构',
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
                        defaultVal: '默认显示方案',
                        isShow :false,
                        list:[
                            {value:"默认显示方案"},
                            {value:"人员档案展示方案"},
                            {value:"在职信息展示方案"},
                            {value:"+新增显示方案"}
                        ],
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
                pageResize: false,                    /* 非必须，页码重置 */
                pageHide: false,                        /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
            },
            classify:"",
            orgList:[],
            workStatus:"",
        }
    },
    mounted(){
        this.getOrgTreeReq()
        this.getNotShareLeger()
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
        //查询台账请求
        getLegerReq(){
            let ids = this.orgList.map(item =>item.orgId)        
            let send = {
                archiveType: this.classify,
                orgId:28,
                // orgId:ids,
                stangdingBookId:this.ledgerNode.standingBookId,
                type:this.workStatus,
            }
            base.log("s","查询台账",send)
            archives_ledger_api4(send,res=>{
                base.log("r","查询台账",res.data)
                if(res.data.success){
                    this.ledgerTable.data = res.data.result
                }else{
                    base.error(res.data)
                }
                
            })
        },
        //查询按钮点击
        seachLedger(){
            if(!this.ledgerNode){
                this.$message.warning("请选择台账")
                return
            }
            this.getLegerReq()            
        },        
        //下拉框 -- 机构 
        checkTreeClick(val,list){
            this.orgList =  list.checkedNodes
            console.log("机构",list.checkedNodes);            
        },
        //下拉框 -- 工作状态 
        selectStatus(val){
            this.workStatus = val
            console.log(val);
        }, 
        //下拉框 -- 人员分类
        selectClassify(val){
            this.classify = val
            console.log(val);            
        },
        //台账树--节点点击
        ledgerNodeClick(node){
            this.ledgerNode = node
            console.log(node);
            
        },
        //获取机构树
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
        //获取含共享台账
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
        //获取不含共享台账
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
                console.log("台账设置");
                
                this.treeData.switchOpen = false
                this.getNotShareLeger()
            }else{    
                console.log("常用台账");           
                this.treeData.switchOpen = true
            }
        }
    }
}
</script>