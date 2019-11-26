<style lang="scss" scoped>
#staff_contract_params {
    display: flex;
    height: 100%;
    text-align: left;
    .content {
        width: 100%;
        height: 100%;
        border: 10px solid #f0f0f0;
        border-bottom: none;
        padding: 24px 0px 0px 24px;
        box-sizing: border-box;
        background-color: #fff;
        .use_content {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 41px 0px 65px 124px;
            .worker {
                margin-right: 32px;
            }
        }
        .renew_content {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 41px 0px 65px 124px;
        }
    }
    .title {
        display: flex;
        align-items: center;
        .vertical_line {
            display: inline-block;
            width: 4px;
            height: 16px;
            margin-right: 16px;
            background-color: #ff8c58ff;
        }
        span {
            font-size: 16px;
            color: #262626ff;
        }
    }
}
</style>
<template>
    <div id="staff_contract_params">
        <div class="content">
            <!-- 适用范围 -->
            <div class="use_scoped">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>适用范围</span>
                </div>
                <div class="use_content">
                    <span class="worker">适合在职人员</span>
                    <el-checkbox-group v-model="workKind" @change="workKindChange">
                        <el-checkbox
                            v-for="(item,index) in workKindList"
                            :label="item"
                            :key="index"
                        >{{item}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <!-- 续签规则 -->
            <div class="renew">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>续签规则</span>
                </div>
                <div class="renew_content">
                    <span>劳动合同到期签可提前</span>
                    <el-input-number
                        v-model="days"
                        controls-position="right"
                        @change="daysChange"
                        size="small"
                    ></el-input-number>
                    <span>天续签</span>
                </div>
            </div>
            <!-- 合同编号规则 -->
            <div class="contract">
                <div class="title">
                    <i class="vertical_line"></i>
                    <span>合同编号规则</span>
                </div>
                <div class="contract_content">
                    合同参数设置
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "contract_params",
    data() {
        return {
            workKind: [],
            workKindList: ["正式", "试用", "实习"],
            days: 1
        };
    },
    methods: {
        //多选框切换
        workKindChange(val) {
            console.log(val);
        },
        //时间组件切换
        daysChange(value) {
            console.log(value);
        }
    }
};
</script>

