<style lang="scss" scoped>
.detail{
    width: 100%;
    height: 100%;
    background-color: #F0F0F0;
    .userInfo{
        padding: 32px 48px 48px 48px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        .user{
            display: flex;
            .pic{
                width: 104px;
                height: 104px;
                border-radius: 50%;
                overflow: hidden;
                background-color: #D3D3D5;
                margin-right: 48px;
            }
            .text{
                width: 216px;
                .nameBox{
                    padding-top: 16px;
                    display: flex;
                    align-items: center;
                    .name{
                        font-size: 20px;
                        line-height: 28px;
                        color: #676B6D;
                    }
                    .icon{
                        margin: 0 8px;
                        font-size: 14px;
                    }
                    .man{
                        color: #19ADE6;
                    }
                    .woman{
                        color: #FF9DC6;
                    }
                    .status{
                        padding: 0 8px;
                        height: 22px;
                        border-radius: 4px;
                        border:1px solid rgba(135,232,222,1);
                        background:rgba(230,255,251,1);
                        color: #46D1D0;
                        text-align: center;
                    }
                }
                p{
                    font-size: 16px;
                    margin-top: 20px;
                    color: #676B6D;
                    line-height: 30px;
                    text-align: left;
                }
            }
        }
        .operat{
            .btns{
                button{
                    margin-left: 12px;
                }
                margin-bottom: 70px;
            }
            .contact{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                color: #676B6D;
                span{
                    display: flex;
                    align-items: center;
                    .email{
                        width: 16px;
                        margin-right: 8px;
                    }
                    .phone{
                        width: 12px;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div id="staff_components_userInfo">
        <div class="userInfo">
            <div class="user">
                <span class="pic"></span>
                <span class="text">
                    <div class="nameBox">
                        <span class="name">{{userInfo.userName}}</span>
                        <i class="qj-man icon man" v-if="userInfo.gender === '男'" ></i>
                        <i class="qj-woman icon woman" v-if="userInfo.gender === '女'"></i>
                        <span class="status">{{userInfo.employmentState}}</span>
                    </div>
                    <p>{{userInfo.applicationPosition}}</p>
                </span>
            </div>
            <div class="operat">
                <div class="btns">
                    <el-button type="primary"       size="small" v-show="methods.reback"    @click="methods.reback" >返回</el-button>
                    <el-button type="primary" plain size="small" v-show="methods.print"     @click="methods.print" >打印</el-button>
                    <el-button type="primary" plain size="small" v-show="methods.entrySure" @click="methods.entrySure" >确认入职</el-button>
                    <el-button type="primary" plain size="small" v-show="methods.sendEntry" @click="methods.sendEntry" >发送入职登记</el-button>
                </div>
                <div class="contact">
                    <span v-show="userInfo.email">
                        <img class="email" src="../../../assets/img/email.png" alt="">
                        <span>{{userInfo.email}}</span>
                    </span>
                    <span v-show="userInfo.phone">
                        <img class="phone" src="../../../assets/img/phone.png" alt="">
                        <span>{{userInfo.phone}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="cont">
            <el-tabs v-model="tabActiveName" @tab-click="detail_tabClick">
                <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.tableName" :name="String(item.tableId)"></el-tab-pane>
            </el-tabs>
            <div class="detailCommonTable" v-for="(item, index) in detail_list" :key="index">
                <commonForm :data="item" ref="detail_commonForm_index" ></commonForm>
            </div>
        </div>
    </div>
</template>

<script>
import commonForm from '../../../components/form/commonForm';

export default {
    name: 'staff_components_userInfo',                       /* 个人基本信息组件 */
    components: {commonForm},
    props: {
        userInfo: Object,               /* 用户信息 */
        tabList: Array,                 /* tab栏数据 */
        formList: Array,                /* 请求过来的表单数据 */
        option: Object,                 /* 配置项 */
        methods: Object,                /* 方法 */
    },
    data() {
        return {
            tabActiveName: '1',
            tabActiveName2: '1',
            detail_commonForm: {
                domList: [],
                option: {
                    showType: 'seeForm',
                    labelWidth: '120px',        /* 非必须，label宽度，默认100px */
                    formatDom: true,         /* 非必须，是否格式化dom数据，默认false, 注意：从后端请求来的数据一般都需要格式化 */
                },
                sure: this.detail_sure,
            },
            optionData: {
                showType: 'seeForm',
                labelWidth: '120px',        /* 非必须，label宽度，默认100px */
                formatDom: true,         /* 非必须，是否格式化dom数据，默认false, 注意：从后端请求来的数据一般都需要格式化 */
            },
            currentTab: null,
        };
    },
    created() {
        // 初始化
        this.init();
    },
    computed: {
        detail_list() {
            let r = [];
            for (let i = 0; i < this.formList.length; i++) {
                const item = this.formList[i];
                let o = {
                    domList: item.customGroupVOList,
                    option: {
                        showType: this.optionData.showType,
                        labelWidth: this.optionData.labelWidth,        /* 非必须，label宽度，默认100px */
                        formatDom: true,
                    },
                    formId: item.bigDataId,
                    sure: this.detail_sure,
                }
                r.push(o);
            }
            return r;
        },
    },
    watch: {
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            if (this.tabList && this.tabList.length > 0) {
                this.currentTab = this.tabList[0];
            }
            if (this.option) {
                Object.assign(this.optionData,this.option);
            }
        },

        // 详情--确定
        detail_sure(groupIndex,data,formId) {
            if (this.methods.formSure) {
                this.methods.formSure(groupIndex, data, formId, this.currentTab);
            }
        },

        // 详情--tab被点击
        detail_tabClick(v) {
            if (v.name !== this.tabActiveName2) {
                this.tabActiveName2 = v.name;
                this.currentTab = this.tabList[Number(v.index)];
                if (this.methods.tabClick) {
                    this.methods.tabClick(this.currentTab);
                }
            }
        },
    }
}
</script>