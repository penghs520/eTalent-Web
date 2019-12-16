<style lang="scss" scoped>
#archives_file {
    display: flex;
    height: 100%;
    text-align: left;
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
</style>
<template>
    <div id="archives_file">
        <div class="content">
           <commonTable v-show="!uploadShow" :table="tableData"></commonTable>
           <commonUpload v-show="uploadShow" :data="uploadData" :active="active">
                  <template v-slot:remind>
                      <div style="marginTop:-2px">
                          <span style="marginRight:10px">上传的附件单个最大为5M（根据系统设置）</span>
                     </div>                           
                 </template>
                  <template v-slot:explain>
                      <div>
                         <p>1.一次最多导入 100个附件。</p>
                         <p>2.附件的的命名规则须按 “工号#附件名称”或"身份证号#附件名称"，如”QJ090814#身份证“。</p>
                         <p>3.系统根据导入文件的命名中包含的关键字智能匹配证件类型，如“QJ090814#身份证"导入后会自动将文件存放在附件列表中的身份证目录下。如果文件名中不含有附件类型中的关键字，则导入后存放在其他目录下。</p>
                      </div>  
                 </template>
                 <template v-slot:btn>
                     <el-button type="primary" @click="backHome" size="mini">返回</el-button>
                     <el-button type="primary" size="mini">导入校验</el-button>
                 </template>
           </commonUpload>
        </div>
    </div>
</template>

<script>
import  commonTable  from "../../components/table/commonTable";
import  commonUpload from "../../components/archivesUpload/archivesUpload"
import base from "../../assets/js/base"
import { archives_file_api1 } from '../../request/api'

export default {
    name: "archives_file",
    components:{
        commonTable,
        commonUpload,
    },
    data() {
        return {
            tableData:{
                head: [                                 /* 必须，表格头配置 */
                    {name: '姓名', key: 'userName', isShow: true},
                    {name: '工号', key: 'employeeNumber', isShow: true},
                    {name: '单位', key: 'employeeNumber', isShow: true},
                    {name: '部门', key: 'orgName', isShow: true},
                    {name: '证件类型', key: 'attritionType', isShow: true},
                    {name: '证件名称', key: 'postName', isShow: true},
                    {name: '上传日期', key: 'hireDate', isShow: true},
                ],
                data: [],                               /* 必须，表格要渲染的数据，数组格式 */
                total: 0,                               /* 必须，数据的总条数，用于翻页 */
                bar: [
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
                        type: 'button',                 
                        text: '查询',                   
                        btnType: 'primary',            
                        method: this.searchFile       
                    },
                    {
                        type: 'button',               
                        text: '上传',                  
                        btnType: 'plain',            
                        method: this.uploadClick      
                    },
                    {
                        type: 'button',                
                        text: '下载',                  
                        btnType: 'plain',            
                        method: this.download       
                    },
                    {
                        type: 'button',          
                        text: '删除',                
                        btnType: 'plain',             
                        method: this.del      
                    },
                    {
                        type: 'button',              
                        text: '打印',                 
                        btnType: 'plain',            
                        method: this.print       
                    },
                    {
                        type: 'button',               
                        text: '高拍仪',                   
                        btnType: 'plain',          
                        method: this.search      
                    },
                ],
                showSelect: true,                       
                selectChange: this.selectChange,        
                activeColumn:"",                        
                cellClick: this.cellClick,              
                pageResize: false,                    
                pageHide: true,                        
                pageSizeChange: this.pageSizeChange,  
                pageChange: this.pageChange,            
            },
            active:0,
            uploadData:{
                uploadUrl:"",
            },
            uploadShow:false,
        };
    },
    created(){
        this.getOrgTreeReq()
    },
    methods:{
        //上传附件--返回按钮
        backHome(){
            this.uploadShow = false
        },
        //上传附件--按钮
        uploadClick(){
            this.uploadShow = true
        },
        //获取机构树
         getOrgTreeReq() {
            let send = {
                isEnable: 0
            };
            base.log("s", "查询树", send);
            archives_file_api1(send, res => {                
                base.log("r", "查询树", res.data);
                if (res.data.success) {                                  
                    this.tableData.bar[0].treeData.data = res.data.result.list;
                } else {
                    base.error(res.data);
                }
            });
        },
    }
};
</script>

