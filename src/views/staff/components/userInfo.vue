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
    .addBtn{
        height: 64px;
        border: 1px dashed rgba(0,0,0,0.15);
        background-color: rgba(0,0,0,0.02);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
        color: #FF8C58;
        margin-top: 24px;
        margin: 0 40px;
        i{
            margin-right: 10px;
        }
    }
}
</style>
<style>
#staff_components_userInfo .el-tabs__nav-scroll{
    background-color: #fff !important;
    border-bottom: 1px solid #F1F2F2;
    display: flex;
    justify-content: center;
}
</style>

<template>
    <div id="staff_components_userInfo" class="detail">
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
                    <el-button type="primary"       size="small" v-if="methods.reback"    @click="methods.reback" >返回</el-button>
                    <el-button type="primary" plain size="small" v-if="methods.print"     @click="methods.print" >打印</el-button>
                    <el-button type="primary" plain size="small" v-if="methods.entrySure" @click="methods.entrySure" >确认入职</el-button>
                    <el-button type="primary" plain size="small" v-if="methods.sendEntry" @click="methods.sendEntry" >发送入职登记</el-button>
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
                <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.tableName" :name="String(item.sort)">
                </el-tab-pane>
            </el-tabs>
            <div class="detailCommonTable" v-for="(item, index) in detail_list" :key="index">
                <commonForm :data="item" :index="index" :ref="`detail_commonForm_${index}`" ></commonForm>
            </div>

            <!-- 添加 -->
            <div class="addBtn" v-if="currentTab && optionData.addShow" >
                <i class="el-icon-circle-plus-outline"></i>
                <span>添加{{currentTab.tableName}}</span>
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
                addShow: false
            },
            currentTab: null,
            tabIndex: 0,
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
        tabList: {
            handler: function(v) {
                this.init();
            },
            deep: true
        }
    },
    mounted() {},
    methods: {
        // 初始化
        init() {
            if (this.tabList && this.tabList.length > 0) {
                this.tabIndex = 0;
                this.currentTab = this.tabList[0];
            }
            if (this.option) {
                Object.assign(this.optionData,this.option);
            }
        },

        // 详情--确定
        detail_sure(groupIndex,data,formId,commonFormIndex) {
            if (this.methods.formSure) {
                this.methods.formSure(groupIndex, data, formId, this.currentTab, this.tabIndex, commonFormIndex);
            }
        },

        // 详情--tab被点击
        detail_tabClick(v) {
            console.log(v)
            console.log(typeof v.name)
            this.tabIndex = v.index;
            if (v.name !== this.tabActiveName2) {
                this.tabActiveName2 = v.name;
                this.currentTab = this.tabList[Number(v.index)];
                if (this.methods.tabClick) {
                    this.methods.tabClick(this.currentTab);
                }
            }
        },

        closeSubmit(commonFormIndex,groupIndex) {
            this.$refs[`detail_commonForm_${commonFormIndex}`][0].closeSubmit(groupIndex);
        },
    }
}
</script>