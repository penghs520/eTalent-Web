<style scoped lang="scss">
#archives_info {
    display: flex;
    height: 100%;
    // text-align: left;
    .wrap {
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
    <div id="archives_info">
        <div class="wrap">
            <!-- 表格操作 -->
            <commonTable :table="archivesTable" ref="commonTable"></commonTable>
            <!-- 删除弹窗-->

        </div>
    </div>
</template>

<script>
import base from "../../assets/js/base";
import commonTable from "../../components/table/commonTable";
import { archives_api1,
         archives_api2
    } from "../../request/api";

export default {
    name: "archives_info" /* 档案管理-信息维护 */,
    components: {
        commonTable,
    },
    data() {
        return {
            //表格
            archivesTable: {
                head: [
                    /* 必须，表格头配置 */
                    { name: "姓名", key: "userName", isShow: true },
                    { name: "工号", key: "employeeNumber", isShow: true },
                    { name: "单位", key: "businessUnitName", isShow: true },
                    { name: "部门", key: "orgName", isShow: true },
                    { name: "岗位", key: "postName", isShow: true },
                    { name: "入职日期", key: "firstWorkDate", isShow: true },
                    {
                        name: "试用期到期日期",
                        key: "probationDueDate",
                        isShow: true
                    },
                    {
                        name: "直接上级",
                        key: "supervisorUserName",
                        isShow: true
                    },
                    { name: "联系电话", key: "tel", isShow: true },
                    { name: "任职类型", key: "attritionType", isShow: true }
                ],
                data: [] /* 必须，表格要渲染的数据，数组格式 */,
                total: 0 /* 必须，数据的总条数，用于翻页 */,
                bar: [
                    /* 非必须，表格上面的操作栏配置 */
                    {
                        type: "button" /* 必须，DOM类型：按钮 */,
                        text: "新增" /* 必须，按钮名称 */,
                        method: this.add
                    },
                    {
                        type: "button",
                        text: "删除",
                        btnType: "plain",
                        method: this.delet
                    },
                    {
                        type: "button",
                        text: "打印",
                        btnType: "plain",
                        method: this.print
                    },
                    {
                        type: "buttons" /* 下拉按钮 */,
                        text: "更多操作",
                        btnType: "plain",
                        list: [
                            /* 必须，更多按钮的数据组成的数组 */
                            { text: "删除恢复", method: this.deleteRecover },
                            { text: "兼职维护", method: this.partTimeJob },
                            { text: "自定义导出", method: this.download }
                        ]
                    },
                    {
                        type: "selectTree", //下拉树形
                        placeholder: "请筛选机构",
                        key: "typeTree",
                        showKey: 'typeTreeName',
                        defaultVal: [456,457],
                        defaultShowVal: '深圳总部2,南宁分公司2',
                        nodeValueKey: 'orgId',
                        nodeShowKey: 'orgName',
                        method: this.selectValueChange,
                        treeData: {
                            data: [],
                            // nodeKey: "org_id",
                            props: {
                                children: "childList",
                                label: "orgName"
                            },
                            showDefaultIcon: true,
                            nodeClick: this.selectTreeNodeClick,
                            defaultIconExpandNode: true,
                            showCheckbox: true,
                        }
                    },
                     {
                        type: 'select',                 /* 单选下拉框 */
                        placeholder: '请选择',
                        key: 'type',
                        defaultVal: '默认显示方案',
                        isShow :true,
                        list:[
                            {value:"默认显示方案"},
                            {value:"人员档案展示方案"},
                            {value:"在职信息展示方案"},
                            {value:"+新增显示方案"},
                        ],
                    },
                ],
                showSelect: true /* 非必须，是否显示select勾选框 */,
                loading: false /* 非必须，加载动画 */,
                pageResize: false /* 非必须，页码重置 */,
                pageResize: false,
                pageSizeChange: this.pageSizeChange,
                pageChange: this.pageChange,
                formatter: this.timeFormatter,
            },
            currentPage: 1,
            pageSize: 10,
            orgNode: ""
            //机构树形
        };
    },
    mounted() {
        this.getOrgTree()
        this.getInfoReq();
    },
    methods: {
       
        // 档案表--新增按钮
        add() {
            this.$message.warning("点击新增");
        },

        // 档案表--删除按钮
        delet(searchData, radioData, checkboxData) {
            this.$message.warning("点击删除");
        },

        // 档案表--打印按钮
        print(searchData, radioData, checkboxData) {
            console.log('点击打印');
            console.log(searchData);
            console.log(radioData);
            console.log(checkboxData);
        },

        // 档案表--删除恢复按钮
        deleteRecover() {},

        // 档案表--兼职维护按钮
        partTimeJob(searchData, radioData, checkboxData) {},

        // 档案表--自定义导出按钮
        download(searchData, radioData, checkboxData) {},

        // 档案表--改变页容量
        pageSizeChange(size) {},
        // 档案表--翻页
        pageChange(index) {},
        //档案表 -- 格式化
        timeFormatter(key,val){
            if(key === "firstWorkDate" || key === "probationDueDate"){
                if(val){
                    let newVal = val.split('T')[0]
                    return newVal
                }
            }else{
                return val
            }
        },
        //档案表 -- 获取表格请求接口
        getInfoReq() {
            let send = {
                currentPage: 1,
                orgId: 28,
                pageSize: 10
            };
            base.log("s", "获取档案信息", send);
            archives_api1(send, res => {
                base.log("r", "获取档案信息", res.data);
                if (res.data.success) {
                    this.archivesTable.data = res.data.result.list;
                    this.archivesTable.total = res.data.result.total;
                } else {
                    base.error(res.data);
                }
            });
        },
         //机构树--下拉树形节点被点击
        selectTreeNodeClick(node) {
            console.log(node);
            this.archivesTable.selectTreeValue = node.orgName;
            this.orgNode =node            
        },
        //机构树--下拉树选择值改变的回调
        selectValueChange(val) {
            console.log(val);
        },
        //机构树 -- 获取树形请求
        getOrgTree() {
            let send = {
                isEnable: 1
            };
            archives_api2(send, res => {
                base.log("s", "查询树", send);
                let d = res.data;
                base.log("r", "查询树", d);
                if (d.success) {                  
                    this.archivesTable.bar[4].treeData.data = d.result.list;
                } else {
                    base.error(d);
                }
            });
        },
    }
};
</script>