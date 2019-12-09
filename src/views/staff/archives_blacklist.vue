<style lang="scss" scoped>
#archives_blacklist {
    display: flex;
    height: 100%;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding: 24px 0px 0px 24px;
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
                    center
                     >
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
        </div>
    </div>
</template>
<script>
import  commonTable  from "../../components/table/commonTable";
import base from "../../assets/js/base"
import { 
         archives_blacklist_api1,
         archives_blacklist_api2,
         } from '../../request/api'

export default {
    name: "archives_blacklist",
    components:{
        commonTable,
    },
    data() {
        return {
             tableData:{
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '性别', key: 'employeeNumber', isShow: true},
                    {name: '证件号码', key: 'phone', isShow: true},
                    {name: '手机号', key: 'phone', isShow: true},
                    {name: '所属单位', key: 'businessUnitName', isShow: true , width:"180px"},
                    {name: '部门', key: 'orgName', isShow: true, width:"180px"},
                    {name: '岗位', key: 'postName', isShow: true},
                    {name: '拉黑原因', key: 'blockReason', isShow: true},
                    {name: '拉黑时间', key: 'blockTime', isShow: true},
                    {name: '操作人', key: 'operatorId', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
                    {
                        type: 'button',                 /* 必须，DOM类型：按钮 */
                        text: '新增',                   /* 必须，按钮名称 */
                        btnType: 'plain',                /* 非必须，element-ui提供的按钮样式，新增 plain */
                        method: this.upload             /* 必须，按钮点击时的回调，接收3个参数：搜索栏数据，单选框数据，多选框数据 */
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
        };
    },
    created(){
        this.getTableReq()
    },
    methods:{
        // 删除 -- 请求接口
        delBlockReq(){
            let send = this.removeList.map(item => item.archivesId)
            base.log("s","删除黑名单人员",send)
            archives_blacklist_api2(send,res=>{
                base.log("r","删除黑名单人员",res.data)
                if(res.data.success){
                    this.getTableReq() 
                    this.$message.success("删除成功")                   
                    this.delDialogShow = false                   
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
        },

        //黑名单表 -- 格式化
        timeFormatter(key,val){
            if(key === "blockTime"){
                if(val){
                    let newVal = val.split('T')[0]
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
            base.log("s","查询台账",send)
            archives_blacklist_api1(send,res=>{
                base.log("r","查询台账",res.data)
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

