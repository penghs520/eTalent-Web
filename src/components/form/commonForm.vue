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
    justify-content: space-between;
    font-size: 16px;
    color: #000;
    line-height: 22px;
    padding: 28px 0;
    .title{
        display: flex;
        align-items: center;
        .groupTieleIcon{
            width: 4px;
            height: 16px;
            background-color: #FF8C58;
            margin-right: 16px;
        }
    }
    .editBtn{
        display: none;
        margin-right: 44px;
        cursor: pointer;
        color: #FF8C58;
        .icon{
            margin-right: 4px;
        }
    }
}
.groupTitle
.hasTitleGroup .showBox ul,
.hasTitleGroup .formBox{
    margin-left: 44px;
}
.btnRow{
    margin-bottom: 24px;
}
.seeFormGroup:hover{
    background-color: #FAFAFA;
    .editBtn{
        display: inline-block;
    }
}
.editIng{
    background-color: #FAFAFA;
}
</style>

<template>
    <div id="commonForm">
        <div :class="{biserial: option.biserial}" >
            <!-- 组 -->
            <div class="group" 
                v-for="(group, groupIndex) in domList" :key="groupIndex" 
                :class="{
                    hasTitleGroup: group.groupTitle, 
                    notFirstGroup: groupIndex !== 0, 
                    seeFormGroup: option.showType === 'seeForm',
                    editIng: showForm[groupIndex]
                }" >
                <!-- 组名 -->
                <div class="groupTitle" >
                    <div class="title" v-show="group.groupTitle" >
                        <span class="groupTieleIcon"></span>
                        <span>{{group.groupTitle}}</span>
                    </div>
                    <div class="editBtn" v-if="option.showType === 'seeForm'" v-show="!showForm[groupIndex]" @click="edit(groupIndex)">
                        <i class="el-icon-edit icon"></i>
                        <span>编辑</span>
                    </div>
                </div>
                <!-- 展示内容 -->
                <div class="showBox" v-if="option.showType === 'see' || option.showType === 'seeForm'" v-show="option.showType === 'see' || !showForm[groupIndex]" >
                    <ul>
                        <li v-for="(item,index) in group.list" :key="index">
                            <span class="label" :style="{width: option.labelWidth}">{{item.fieldName}}：</span>
                            <span class="value">{{item.default}}</span>
                        </li>
                    </ul>
                </div>
                
                <!-- 表单内容 -->
                <div class="formBox" v-if="option.showType === 'form' || option.showType === 'seeForm'" v-show="option.showType === 'form' || showForm[groupIndex]" >
                    <el-form :model="form" size="small" status-icon :rules="rules" :ref="`form_${groupIndex}`" :label-width="option.labelWidth" >
                        <el-form-item v-for="(item,index) in group.list" :key="index" :label="`${item.fieldName}：`" :prop="item.key">
                            <!-- 输入框 -->
                            <template v-if="item.type === 'input'">
                                <!-- 数字输入框 -->
                                <el-input 
                                    v-if="item.inputType === 'number'"
                                    v-model.number="form[item.key]" 
                                    class="removeNumberInput" 
                                    clearable="" 
                                    type="number"
                                    :placeholder="item.placeholder" 
                                    :disabled="Boolean(item.isReadOnly)"
                                    :maxlength="item.maxLength" 
                                    :minlength="item.minLength" >
                                </el-input> 

                                <!-- 文本输入框 -->
                                <el-input
                                    v-else 
                                    v-model="form[item.key]" 
                                    clearable="" 
                                    :placeholder="item.placeholder" 
                                    :type="item.inputType ? item.inputType : 'text'"
                                    :disabled="Boolean(item.isReadOnly)"
                                    :maxlength="item.maxLength" 
                                    :minlength="item.minLength" >
                                </el-input>
                            </template>

                            <!-- 文本框 -->
                            <el-input 
                                v-else-if="item.type === 'textarea'" 
                                v-model="form[item.key]" 
                                type="textarea" 
                                clearable="" 
                                :placeholder="item.placeholder" 
                                :disabled="Boolean(item.isReadOnly)"
                                :maxlength="item.maxLength" 
                                :minlength="item.minLength" >
                            </el-input>

                            <!-- 单选下拉框 -->
                            <el-select v-else-if="item.type === 'select'" v-model="form[item.key]" style="width:100%" clearable="" :placeholder="item.placeholder" :disabled="Boolean(item.isReadOnly)" >
                                <el-option v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.label" :value="se.value" ></el-option>
                            </el-select>

                            <!-- 多选下拉框 -->
                            <el-select v-else-if="item.type === 'selectMore'" v-model="form[item.key]" style="width:100%" multiple="" clearable="" :placeholder="item.placeholder" :disabled="Boolean(item.isReadOnly)" >
                                <el-option v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.label" :value="se.value" ></el-option>
                            </el-select>

                            <!-- 多选框 -->
                            <template v-else-if="item.type === 'checkbox'" :disabled="Boolean(item.isReadOnly)">
                                <el-checkbox-group v-model="form[item.key]">
                                    <el-checkbox v-for="(se,seIndex) in item.list" :key="seIndex" :label="se.value">{{se.label}}</el-checkbox>
                                </el-checkbox-group>
                            </template>

                            <!-- 单选框 -->
                            <template v-else-if="item.type === 'radio'" :disabled="Boolean(item.isReadOnly)">
                                <el-radio v-for="(radio,radioIndex) in item.list" :key="radioIndex" v-model="form[item.key]" :label="radio.value">{{radio.label}}</el-radio>
                            </template>

                            <!-- 时间选择框 -->
                            <el-time-picker
                                v-else-if="item.type === 'time'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :disabled="Boolean(item.isReadOnly)"
                                :editable="false"
                                :is-range="Boolean(item.isRange)"
                                :value-format="item.timeFormat ? item.timeFormat : 'HH:mm:ss'"
                                :placeholder="item.placeholder ? item.placeholder : '请选择时间'">
                            </el-time-picker>
                            
                            <!-- 日期选择框 -->
                            <el-date-picker
                                v-else-if="item.type === 'date'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :disabled="Boolean(item.isReadOnly)"
                                :editable="false"
                                :value-format="item.timeFormat ? item.timeFormat : 'yyyy-MM-dd'"
                                :type="Boolean(item.isRange) ? 'daterange' : 'date'"
                                :placeholder="item.placeholder ? item.placeholder : '选择日期'">
                            </el-date-picker>

                            <!-- 时间日期选择框 -->
                            <el-date-picker
                                v-else-if="item.type === 'dateTime'"
                                v-model="form[item.key]"
                                style="width:100%"
                                :disabled="Boolean(item.isReadOnly)"
                                :editable="false"
                                :value-format="item.timeFormat ? item.timeFormat : 'yyyy-MM-dd HH:mm:ss'"
                                :type="Boolean(item.isRange) ? 'datetimerange' : 'datetime'"
                                :placeholder="item.placeholder ? item.placeholder : '选择日期时间'">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-row class="btnRow">
                        <el-button @click="cancel(groupIndex)" size="small" >取消</el-button>
                        <el-button @click="sure(groupIndex,`form_${groupIndex}`)" size="small" type="primary" :loading="loading[groupIndex]" >确定</el-button>
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
            },
            showForm: {},                   /* 存储各分组的编辑状态 */
            loading: {}
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
                this.$set(this.form, dom.key, dom.default);
            }
        },

        // 添加校验规则
        ruleM(option) {
            let rules = new Array();
            // 必填规则
            if (Boolean(option.isMust)) {
                let rule = {
                    required: true,
                    message: '必须',
                    trigger: 'change'
                };
                rules.push(rule);
            };

            // rule规则
            if (option.rule && Array.isArray(option.rule)) {
                option.rule.forEach(item => {
                    if (typeof item === 'string') {
                        switch (item) {
                            case 'email':
                                let emailRule = {type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'};
                                rules.push(emailRule);
                                break;

                            case 'phone':
                                let phoneRule = {pattern: /^1[3,4,5,6,7,8,9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change'};
                                rules.push(phoneRule);
                                break;
                        }
                    }else if(typeof item === 'object'){
                        // 自定义校验规则
                        rules.push(item);
                    }
                });
            };

            // 数字型的最大、最小值、整数、浮点数
            if (option.type === 'input' && option.inputType === 'number') {
                // 数字型
                let rule = {type: 'number', message: '只能输入数字', trigger: 'change'};
                rules.push(rule);

                // 最小值
                if (typeof option.min === 'number') {
                    let rule = {type: 'number', min: option.min, message: `不能小于${option.min}`, trigger: 'change'};
                    rules.push(rule);
                };

                // 最大值
                if (typeof option.max === 'number') {
                    let rule = {type: 'number', max: option.max, message: `不能大于${option.max}`, trigger: 'change'};
                    rules.push(rule);
                };

                // 整数、浮点数
                if (typeof option.floatLength === 'number') {
                    if (option.floatLength === 0) {
                        let rule = {type: 'integer', message: '只能输入整数', trigger: 'change'};
                        rules.push(rule);
                    }else{
                        let rule = {float: option.floatLength, validator: this.floatLengthCheck, trigger: 'change'};
                        rules.push(rule);
                    }
                };
            };

            this.rules[option.key] = rules;
        },

        // 浮点长度检测
        floatLengthCheck(rule,value,callback) {
            let float = rule.float;
            let valueString = String(value);
            if (valueString.includes('.')) {
                let valueArray = valueString.split('.');
                if (valueArray.length > 2) {
                    callback(new Error('请输入正确的小数'));
                    return false;
                }else{
                    let floatValue = valueArray[1];
                    if (floatValue.length > float) {
                        callback(new Error(`小数位数不能超过${float}`));
                        return false;
                    };
                }
            };
            callback();
        },

        // 编辑按钮被点击
        edit(index) {
            this.$set(this.showForm,index,true);
        },

        // 取消
        cancel(index) {
            this.$set(this.showForm,index,false);
        },

        // 确定
        sure(groupIndex,formName) {
            this.$refs[formName][0].validate((valid) => {
                if (valid) {
                    console.log('校验通过');
                    console.log(this.domList)
                    if (this.data.sure) {
                        let data = this.getCurrentGroupData(groupIndex);
                        this.data.sure(groupIndex,data) ;
                        this.$set(this.loading, groupIndex, true);
                    }
                }
            });
        },

        // 取当前组的值
        getCurrentGroupData(groupIndex) {
            let result = new Object();
            let groupDom = this.domList[groupIndex].list;
            let keys = groupDom.map(item => item.key);
            keys.forEach(key => {
                result[key] = this.form[key];
            });
            return result;
        },

        // 关闭loading、关闭form
        closeSubmit(formIndex) {
            this.$set(this.loading, formIndex, false);
            if (this.option.showType === 'seeForm') {
                this.$set(this.showForm, formIndex, false);
            };
        },
    }
}
</script>