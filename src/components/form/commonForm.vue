<style lang="scss" scoped>
#commonForm{
    background-color: #fff;
}
.notFirstGroup{
    border-top: 1px solid #ECECEC;
}
.biserial .el-form,
.biserial .showBox ul{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.biserial .showBox ul li,
.biserial .el-form .el-form-item{
    width: 46%;
    text-align: left;
}
.biserial .showBox ul li:nth-child(odd),
.biserial .el-form .el-form-item:nth-child(odd){
    margin-right: 2%;
}
.biserial .showBox ul li:nth-child(even),
.biserial .el-form .el-form-item:nth-child(even){
    margin-left: 2%;
}

.el-form .el-form-item{
    text-align: left;
}
.formBox{
    overflow: hidden;
}
.showBox li{
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 32px;
    margin-bottom: 18px;
    color: #606266;
}
.showBox li .label{
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
}
.groupTitle{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #000;
    line-height: 22px;
    padding: 28px 0;
    .groupTieleIcon{
        width: 4px;
        height: 16px;
        background-color: #FF8C58;
        margin-right: 16px;
    }
}
.hasTitleGroup .showBox ul,
.hasTitleGroup .formBox{
    margin-left: 44px;
}
.btnRow{
    margin-bottom: 24px;
}
</style>

<template>
    <div id="commonForm">
        <h1>公共表单</h1>
        <div :class="{biserial: option.biserial}" >
            <!-- 组 -->
            <div class="group" v-for="(group, groupIndex) in domList" :key="groupIndex" :class="{hasTitleGroup: group.groupTitle, notFirstGroup: groupIndex !== 0}" >
                <!-- 组名 -->
                <div class="groupTitle" v-show="group.groupTitle" >
                    <span class="groupTieleIcon"></span>
                    <span>{{group.groupTitle}}</span>
                </div>
                <!-- 展示内容 -->
                <div class="showBox">
                    <ul>
                        <li v-for="(item,index) in group.list" :key="index">
                            <span class="label" :style="{width: option.labelWidth}">{{item.fieldName}}：</span>
                            <span class="value">{{item.default}}</span>
                        </li>
                    </ul>
                </div>
                
                <!-- 表单内容 -->
                <div class="formBox">
                    <el-form :model="form" size="small" status-icon :rules="rules" :ref="`form_${groupIndex}`" :label-width="option.labelWidth" >
                        <el-form-item v-for="(item,index) in group.list" :key="index" :label="`${item.fieldName}：`" :prop="item.key">
                            <!-- 输入框 -->
                            <el-input v-if="item.type === 'input'" v-model="form[item.key]" clearable="" ></el-input>

                            <!-- 文本框 -->
                            <el-input v-else-if="item.type === 'textarea'" v-model="form[item.key]" type="textarea" clearable="" ></el-input>

                            <!-- 单选下拉框 -->
                            <el-select v-else-if="item.type === 'select'" v-model="form[item.key]" style="width:100%" clearable="" >
                                <el-option v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.label" :value="se.value" ></el-option>
                            </el-select>

                            <!-- 多选下拉框 -->
                            <el-select v-else-if="item.type === 'selectMore'" v-model="form[item.key]" style="width:100%" multiple="" clearable="" >
                                <el-option v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.label" :value="se.value" ></el-option>
                            </el-select>

                            <!-- 多选框 -->
                            <template v-else-if="item.type === 'checkbox'">
                                <el-checkbox-group v-model="form[item.key]">
                                    <el-checkbox v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.value">{{se.label}}</el-checkbox>
                                </el-checkbox-group>
                            </template>

                            <!-- 单选框 -->
                            <template v-else-if="item.type === 'radio'">
                                <el-radio v-for="(radio,radioIndex) in item.list" :key="radioIndex" v-model="form[item.key]" :label="radio.value">{{radio.label}}</el-radio>
                            </template>

                            <!-- 时间选择框 -->
                            <el-time-picker
                                v-else-if="item.type === 'time'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :editable="false"
                                :value-format="item.timeFormat ? item.timeFormat : 'HH:mm:ss'"
                                placeholder="选择时间">
                            </el-time-picker>
                            
                            <!-- 日期选择框 -->
                            <el-date-picker
                                v-else-if="item.type === 'date'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :editable="false"
                                :value-format="item.timeFormat ? item.timeFormat : 'yyyy-MM-dd'"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>

                            <!-- 时间日期选择框 -->
                            <el-date-picker
                                v-else-if="item.type === 'dateTime'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :editable="false"
                                :value-format="item.timeFormat ? item.timeFormat : 'yyyy-MM-dd HH:mm:ss'"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-row class="btnRow">
                        <el-button @click="cancel(groupIndex)" size="small" >取消</el-button>
                        <el-button @click="sure(groupIndex,`form_${groupIndex}`)" size="small" type="primary" >确定</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commonForm',             /* 公共表单 */
    props: {
        data: Object,
    },
    data() {
        return {
            domList: [],
            option: {
                showType: 'form',           /* 显示样式类型 */
                biserial: true,             /* 单双列，true-双列、false-单列 */
                labelWidth: '100px',        /* label宽度 */
            },
            form: {},
            rules: {
                // name: [{required: true, message: '请输入姓名', trigger: 'change'}],
            }
        };
    },
    created() {
        this.domList = this.data.domList;
        if (this.data.option) {
            Object.assign(this.option,this.data.option);
        };

        this.init();
    },
    computed: {},
    watch: {
        'data.domList': {
            handler: function(v) {
                this.domList = v;
            },
            deep: true
        }
    },
    mounted() {
        // this.init();
        console.log(this.rules)
    },
    methods: {
        // 初始化
        init() {
            this.domList.forEach(group => {
                group.list.forEach(item => {
                    // 添加校验规则
                    this.ruleM(item);
                    // 添加必要的绑定字段
                    this.modelKey(item);
                    // 添加默认值
                    this.defaultValue(item);
                });
            });
            console.log(this.form)
        },

        // 添加必要绑定字段
        modelKey(dom) {
            if (dom.type === 'checkbox') {
                this.$set(this.form,dom.key,[]);
            }
        },

        // 添加默认值
        defaultValue(dom) {
            if (dom.default) {
                this.form[dom.key] = dom.default;
            }
        },

        // 添加校验规则
        ruleM(option) {
            if (Boolean(option.isMust)) {
                let rules = new Array();
                let rule = {
                    required: Boolean(option.isMust),
                    message: '必须',
                    trigger: 'change'
                };
                rules.push(rule);
                this.rules[option.key] = rules;
            }
        },

        // 确定
        sure(groupIndex,formName) {
            console.log(formName)
            console.log(this.$refs)
            this.$refs[formName][0].validate((valid) => {
                if (valid) {
                    console.log('校验通过');
                    console.log(groupIndex);
                    console.log(this.form)
                }
            });
        },
    }
}
</script>