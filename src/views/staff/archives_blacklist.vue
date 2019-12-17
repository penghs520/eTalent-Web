<style lang="scss" scoped>
#archives_blacklist {
    display: flex;
    height: 100%;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding-top: 24px;
        box-sizing: border-box;
        background-color: #fff;
    }
}
.group_list {
    margin-top: 10px;
    padding-left: 35px;
 }
</style>
<template>  
    <div id="archives_blacklist">
        <div class="content">
           <commonTable :table="tableData"></commonTable>
           <!-- 删除黑名单 -->
            <el-dialog
                    :visible.sync="delDialogShow"
                    class="qinjeeDialogMini"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    center>
                    <span slot="title">确认删除</span>
                    <div class="qinjeeDialogMiniCont">
                     <div>
                        <div>                                    
                            <i class="el-icon-warning warning icon"></i>
                            <span>是否确认删除以下黑名单人员?</span>                            
                        </div>
                         <div class="group_list">
                                <div
                                    v-for="(item,index) in removeList"
                                    :key="index"
                                >{{item.userName}}</div>
                            </div>
                        </div>
                     </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button size="small" @click="delDialogShow = false">取 消</el-button>
                      <el-button size="small" type="primary" @click="delBlockReq">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 导入文件 -->
            <commonUpload :data="uploadData" :uploadShow="uploadShow" :active="uploadActive"></commonUpload>
            <!-- 新增弹窗 -->
            <el-dialog
            :visible.sync="addDialogShow"
            class="qinjeeDialogBig"
            :append-to-body="true"
            :close-on-click-modal="false"
            center>
            <span slot="title" >新增</span>
            <div class="qinjeeDialogBigCont">
                <commonForm :data="commonForm" ref="addCommonForm" v-if="addDialogShow"></commonForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addDialogShow = false">取 消</el-button>
                <el-button size="small" type="primary" @click="getData">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>
<script>
import  commonTable  from "../../components/table/commonTable";
import commonUpload from "../../components/upload/upload";
import commonForm from '../../components/form/commonForm';
import base from "../../assets/js/base"
import { 
         archives_blacklist_api1,
         archives_blacklist_api2,
         archives_blacklist_api3,
         archives_blacklist_api4,
         archives_blacklist_api5,
         archives_blacklist_api6,
         archives_blacklist_api7,
         sys_api1,
         entry_api17,
         } from '../../request/api'
export default {
    name: "archives_blacklist",
    components:{
        commonTable,
        commonUpload,
        commonForm,
    },
    data() {
        return {
            tableData:{
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '证件号码', key: 'idNumber', isShow: true},
                    {name: '手机号', key: 'phone', isShow: true},
                    {name: '所属单位', key: 'businessUnitName', isShow: true , width:"180px"},
                    {name: '部门', key: 'orgName', isShow: true, width:"180px"},
                    {name: '岗位', key: 'postName', isShow: true},
                    {name: '拉黑原因', key: 'blockReason', isShow: true},
                    {name: '拉黑时间', key: 'blockTime', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '新增',                   /* 必须，按钮名称 */
                        btnType: 'plain',                /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.addData             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '移除',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.delData             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '导出',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.exportData           /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '导入',                   /* 必须，按钮名称 */
                        btnType: 'plain',                 /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.importData             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
                    },
 
                ],
                showSelect: true,                       /* 非必须，是否显示select勾选框 */
                selectChange: this.selectChange,        /* 非必须，selcet选中改变时的回调，接收1个参数 */
                pageResize: false,                      /* 非必须，页码重置 */
                pageHide: false,                         /* 非必须，是否不显示页码，默认显示页码，true-不显示页码，false-显示页码 */
                pageSizeChange: this.pageSizeChange,    /* 非必须，每页数量改变时的回调，接收5个参数：每页数量，搜索栏数据，单选框数据，多选框数据 */
                pageChange: this.pageChange,            /* 非必须，页码改变时的回调，接收5个参数：当前页码，搜索栏数据，单选框数据，多选框数据 */
                formatter: this.timeFormatter,
            },
            currentPage:1,
            pageSize:10,
            //删除黑名单
            delDialogShow:false,
            removeList:[],
            //导入
            uploadActive: 0,
            uploadShow: false,
            uploadKey:"BLACKLIST",
            uploadData: {
                title: "导入黑名单",
                download: this.importTempDownload,
                fileFormatDescription:"仅支持扩展名：.xls .xles，大小不能超过5M",
                uploadDescription: "这句话的内容还需要和产品沟通",
                templateName: "黑名单导入",
                uploadUrl: "",
                cancel: this.uploadCancel,     
                upload: this.uploadOrReturn,   
                cancelLoading: false, 
                close:this.closeUpload,        

                btnText: "校验",              
                cancelbtn: "取消",
                tableShow: false,             
                tableData: {
                    head: [
                        {name: '姓名', key: '姓名', isShow: true},
                        {name: '证件号码', key: '证件号码', isShow: true},
                        {name: '手机号', key: '联系电话', isShow: true},
                        {name: '所属单位', key: '单位', isShow: true , },
                        {name: '部门', key: '部门', isShow: true,},
                        {name: '岗位', key: '岗位', isShow: true},
                        {name: '拉黑原因', key: '拉黑原因', isShow: true},
                        {name: '拉黑时间', key: '拉黑时间', isShow: true},
                    ],
                    hideHeader: false,
                    data: [],
                    total: 0,
                    pageHide: true
                },
                checkedResult: "",             
                fileList: [],                
                readReport: this.readReport, 
                checkFailshow: false,
                checkFailTable: {
                    head: [
                        { name: "行号", key: "lineNumber", isShow: true },
                        { name: "说明", key: "resultMsg", isShow: true }
                    ],
                    hideHeader: false,
                    bar: [
                        {
                            type: "button",
                            text: "导出Txt",
                            btnType: "primary",
                            method: this.exportTxTReq
                        }
                    ],
                    data: [],
                    total: 0,
                    webPage: true
                }
            },
            //导出黑名单
            exportList:[],
            //新增
            addDialogShow:false,
            commonForm: {
                domList: [
                    {list: [
                        {type: 'input', key: 'name', isMust: true, label: '姓名'},
                        // {type: 'radio', key: 'gender' ,label: '性别', list: [{label: '男', value: '男'},{label: '女', value: '女'}]},
                        {type: 'input', key: 'phone',isMust: true, label: '手机号', rule: ['phone']},
                        {type: 'select',key: 'idType',  label: '证件类型',list:[]},
                        {type: 'input', key: 'idNumber',isMust: true, label: '证件号码'},
                        {type: 'input', key: 'unit', label: '所属单位'},
                        {type: 'input', key: 'depart', label: '部门'},
                        {type: 'input', key: 'post', label: '岗位'},
                        {type: 'textarea', key: 'block', label: '拉黑原因', },
                    ]}
                ],
                option: {
                    btnHide: true
                }
            },
        };
    },
    created(){
        this.getTableReq()
    },
    methods:{
        //新增-- 请求接口
        getData() {
            let data = this.$refs.addCommonForm.getData();
            console.log(data);
            
            let send =[
                  {
                    blockReason: data.block,
                    businessUnitName: data.unit,
                    idNumber: data.idNumber,
                    idType: data.idType,
                    orgName: data.depart,
                    phone: data.phone,
                    postName: data.post,
                    userName: data.name
                }
            ]
            base.log("s","新增黑名单",send)
            archives_blacklist_api5(send,res=>{
                base.log("r","新增黑名单",send)
                if(res.data.success){
                    this.$message.success("新增成功")
                    this.getTableReq()
                    this.addDialogShow = false
                }else{
                    base.error(res.data)
                }
            })

        },
        //新增--证件类型请求接口
        getIdentifyReq(){
            let send ={
                dictType:"CARD_TYPE"
            }
            base.log("s","证件类型请求",send)
            sys_api1(send,res=>{
            base.log("r","人员类型请求",res.data)
                if(res.data.success){
                    let list = JSON.parse(JSON.stringify(res.data.result))
                    this.commonForm.domList[0].list[2].list = list.map(item=>{
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
        //新增--点击按钮
        addData(){
            this.getIdentifyReq()
            this.addDialogShow = true;
        },
        //黑名单导出--请求接口
        exportData(){
            if(this.exportList.length === 0){
                this.$message.warning("请选择需要导出的文件")
                return
            }
            let list = this.exportList.map(item=>item.blacklistId)
            console.log(list);
            
            let send = {
                    list,
                    title: "blacklist"
                }
            base.log("s","导出黑名单",send)
            archives_blacklist_api4(send,res=>{
            base.log("r","导出黑名单",res)
                base.blobDownLoad(res);
            })

        },
        //黑名单导入--关闭弹窗
        closeUpload(){
            this.uploadShow =  false 
        },

        //黑名单导入---导出txt
        exportTxTReq() {
            let send = {
                funcCode:this.uploadKey
            }
            base.log("s","导出txt",send)
            entry_api17(send,res=>{
                 base.log("r","导出txt",res.data)
                 base.blobDownLoad(res,true);
            })
        },
        //黑名单导入--点击查看校验报告
        readReport() {
            this.uploadData.tableShow = false;
            this.uploadData.checkFailshow = true;
            this.uploadData.title = "校验报告";
            this.uploadData.btnText = "确定";
            this.uploadData.cancelbtn = "返回";
            console.log("点击校验");
            
            this.readReportReq()
        },
        //黑名单导入--查看校验报告请求接口
        readReportReq(){
             console.log("点击校验2");
            let send = {
                funcCode: this.uploadKey
            }
            base.log("s","查看校验报告",send)            
            archives_blacklist_api7(send,res=>{
                base.log("r","查看校验报告",res.data)
                if(res.data.success){
                    let dict = JSON.parse(res.data.result)
                    let list = [];
                    for (const key in dict) {
                        if (dict.hasOwnProperty(key)) {
                            const val = dict[key];
                            let o = {
                                lineNumber: key,
                                resultMsg: val
                            };
                            list.push(o)
                        }
                    };
                    this.uploadData.checkFailTable.data = list
                }else{
                    base.error(res.data)
                }
            })
        },
        //黑名单导入--上传/校验/导入按钮
        uploadOrReturn() {
            if (this.uploadData.btnText === "导入") {
                this.uploadReq();
            } else if (this.uploadData.btnText === "返回") {
                this.uploadActive = 0;
                this.uploadData.fileList = [];
                this.uploadData.tableShow = false;
                this.uploadData.checkFailshow = false;
                this.uploadData.title = "黑名单导入";
                this.uploadData.btnText = "校验"
            } else if (this.uploadData.btnText === "确定") {
                this.uploadShow = false;
                this.uploadData.tableShow = false;
            }else if(this.uploadData.btnText === "校验"){
                this.uploadActive = 1;
                this.uploadData.tableShow = true;
                this.uploadData.btnText = "返回"; 
                this.uploadCheckReq();
            }
        },
        //黑名单导入--文件上传请求
        uploadReq() {
            archives_blacklist_api6(null,res => {
            base.log("r","上传文件",res.data)
                if(res.data.success){
                    this.$message.success("上传成功")
                    setTimeout(() => {
                        this.uploadShow = false
                    }, 300);
                }else{
                    base.error(res.data)
                }
            })
        },
        //黑名单导入--校验请求接口
        uploadCheckReq() {
            let send = this.uploadData.fileList[0].raw;
            let fd = new FormData();
            fd.append("file", send); 

            base.log("s", "黑名单导入校验", fd);
            archives_blacklist_api3(fd, res => {
                base.log("r", "黑名单导入校验", res.data);
                if (res.data.success) {
                    let newList = this.checkResultFormatter(res.data.result.list)
                    console.log("newList",newList);

                    if(newList.checkResult){
                        this.uploadActive = 2;
                        this.uploadData.btnText = "导入";
                        this.uploadData.checkedResult = "success";
                        this.uploadData.tableData.data = newList.list
                    }else{
                        this.uploadData.checkedResult  = "fail"
                        this.uploadData.tableData.data = newList.list
                    }
                } else {
                        base.error(res.data)
                }

            });
        },
        //黑名单导入--格式化导入文件
        checkResultFormatter(resList) {
            let result = [] ;
            result.checkResult = resList.every(item => item.resultMsg === "");
            result.list = [];
            
            resList.forEach((item,index) => {
                let cellList = item.customFieldVOList;
                let row = [];
                cellList.forEach(cell => {
                    row[cell.code] = cell.fieldValue
                });
                result.list[index] = row;
            });

            return result;
        },
        //黑名单导入--取消/关闭按钮
        uploadCancel() {
            if (this.uploadData.cancelbtn === "取消") {
                this.uploadShow = false;
                this.uploadData.tableShow = false;
            } else if (this.uploadData.cancelbtn === "返回") {
                this.uploadData.tableShow = true;
                this.uploadData.checkFailshow = false;
                this.uploadData.cancelbtn = "取消"
                this.uploadData.btnText = "返回"
            }
        },
        //黑名单导入--点击表格按钮
        importData() {
            this.uploadShow = true;
            this.uploadActive = 0;
            this.uploadData.fileList = [];
            this.uploadData.tableShow = false;
            this.uploadData.checkFailshow = false;
            this.uploadData.title = "黑名单导入";
            this.uploadData.cancelbtn = "取消";
            this.uploadData.checkedResult = "";
            this.uploadData.btnText = "校验"
        },

        // 删除 -- 请求接口
        delBlockReq(){
            let send = this.removeList.map(item => item.blacklistId)
            base.log("s","删除黑名单人员",send)
            archives_blacklist_api2(send,res=>{
                base.log("r","删除黑名单人员",res.data)
                if(res.data.success){
                    this.$message.success("删除成功")                   
                    this.delDialogShow = false                   
                    this.getTableReq() 
                }else{
                    base.error(res.data)
                }
            })
            
        },
        //删除 --表格按钮
        delData(){
            if(this.removeList.length === 0){
                this.$message.warning("请选择需要删除的人员")
                return
            }
            this.delDialogShow = true
        },
        //黑名单表-- 多选框点击
        selectChange(node){
            console.log(node);
            this.removeList = node
            this.exportList = node
        },
        //黑名单表 -- 格式化
        timeFormatter(key,val){
            if(key == "blockTime"){
                if(val){
                    let newVal = val.split(' ')[0]
                    return newVal
                }
            }else{
                return val
            }
        },
        //获取黑名单表格
        getTableReq(){
            let send = {
                currentPage:this.currentPage,
                pageSize:this.pageSize  
            }
            base.log("s","查询黑名单",send)
            archives_blacklist_api1(send,res=>{
                base.log("r","查询黑名单",res.data)
                if(res.data.success){   
                    this.tableData.data = res.data.result.list
                    this.tableData.total = res.data.result.total
                }else{
                    base.error(res.data)
                }
            })
        },
    }
};
</script>

