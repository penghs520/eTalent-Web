<style scoped>
    
</style>

<template>
    <div id="commonFormDemo">
        <commonForm :data="commonForm" ></commonForm>
        <input type="text" placeholder="">
    </div>
</template>

<script>
export default {
    name: 'commonFormDemo',             /* 公用表单demo */
    data() {
        return {}
    },
    mounted() {},
    methods: {
        commonForm: {
            domList: [
                {
                    type: String,                       /* 必须，DOM类型，可能值：input-输入框、textarea-文本框、select-单选下拉框、selectMore-多选下拉框、
                                                        checkbox-多选框、radio-单选框、time-时间选择框、date-日期选择框、dateTime-日期时间选择框、orgTree-机构树下拉框 */
                    key: String,                        /* 必须，该DOM绑定的字段 */
                    default: String/Array,              /* 非必须，默认值，值类型要与type相应 */
                    placeholder: String,                /* 非必须，输入框中的提示信息 */
                    maxLength: Number,                  /* 非必须，最大长度，只有type是 input、textarea时才生效*/
                    minLength: Number,                  /* 非必须，最小长度，只有type是 input、textarea时才生效 */
                    inputType: String,                  /* 非必须，输入框的值类型，默认值：text,可能的值：text、number、password */
                    max: Number,                        /* 非必须，数字输入框可输入的最大值，textType的值为number时生效 */
                    min: Number,                        /* 非必须，数字输入框可输入的最小值，textType的值为number时生效 */
                    floatLength: Number,                /* 非必须，浮点长度，默认0（整形） */
                    list: [                             /* type为 select/selectMore/checkbox/radio 时必须*/
                        {
                            label: String,                  /* 必须，供选值显示的文本 */
                            value: String/Number/Boolean,   /* 必须，供选值显示的文本对应的值，例如下拉框，选中时传递的不是label，是value */
                        }
                    ],
                    isRange: Boolean,                   /* 非必须，是否为范围选择器，默认false，只对时间、日期选择框生效 */
                    timeMin: String,                    /* 非必须，最小时间，只对时间、日期选择框生效 */
                    timeMax: String,                    /* 非必须，最大时间，只对时间、日期选择框生效 */
                    timeFormat: String,                 /* 非必须，格式化规则，可能的值： yyyy-MM-dd/等，只对时间、日期选择框生效 */
                    isReadOnly: Boolean,                /* 非必须，是否只读 */
                    isMust: Boolean,                    /* 非必须，是否必填，默认false */
                    rule: Array,                        /* 非必须，特殊校验规则，暂时支持的值有：email、phone */
                }
            ],
        },
    }
}
</script>