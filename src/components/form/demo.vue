<style scoped>
    
</style>

<template>
    <div id="commonFormDemo">
        <commonForm :data="commonForm" ref="commonForm" ></commonForm>
        <input type="text" placeholder="">
    </div>
</template>

<script>
export default {
    name: 'commonFormDemo',             /* 公用表单demo */
    data() {
        return {
            commonForm: {
                domList: [
                    {
                        groupTitle: String,                 /* 非必须，分组名称，不配置不显示 */
                        list: [                             /* 必须，form字段 */
                            {
                                type: String,                       /* 必须，DOM类型，可能值：input-输入框、textarea-文本框、select-单选下拉框、selectMore-多选下拉框、
                                                                    checkbox-多选框、radio-单选框、time-时间选择框、date-日期选择框、dateTime-日期时间选择框、
                                                                    orgTree-机构树下拉框、postTree岗位树下拉框 */
                                label: String,                      /* 必须，表单的label */
                                key: String,                        /* 必须，该DOM绑定的字段 */
                                default: String/Array,              /* 非必须，默认值，值类型要与type相应 */
                                placeholder: String,                /* 非必须，输入框中的提示信息 */
                                maxLength: Number,                  /* 非必须，最大长度，只有type是 input、textarea时才生效*/
                                minLength: Number,                  /* 非必须，最小长度，只有type是 input、textarea时才生效 */
                                inputType: String,                  /* 非必须，输入框的值类型，默认值：text,可能的值：text、number、password，type值是input时才生效 */
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
                                isShow: Boolean,                    /* 非必须，是否显示，默认true, true-显示、false-不显示，会用v-if渲染 */
                                rule: Array,                        /* 非必须，特殊校验规则，暂时支持的值有：email、phone、自定义校验对象 */
                                isFullRow: Boolean,                 /* 非必须，是否充满整行,该属性只能给最后一个表单条目用，否则样式会错乱 */
                            }
                        ]
                    },
                ],
                option: {
                    showType: String,           /* 非必须整体显示类型，显示样式类型,默认值：form,可能取值：see-显示、form-表单、seeForm-能看能编辑 */
                    biserial: true,             /* 非必须，单双列，默认true,true-双列、false-单列 */
                    labelWidth: '100px',        /* 非必须，label宽度，默认100px */
                    formatDom: Boolean,         /* 非必须，是否格式化dom数据，默认false, 注意：从后端请求来的数据一般都需要格式化 */
                    isAllBtn: Boolean,          /* 非必须, 是否显示控制所有表单的按钮,默认值:false,一般用于弹窗,该值为true时,不显示分组按钮 */
                },
                sure: Function,                 /* 非必须，表单格式下，"确定"按钮的回调,接收2个参数：组序号、该组数据, option.isAllBtn为true时无效 */
                cancel: Function,               /* 非必须，表单格式下，"取消"按钮的回到，接收一个参数：组序号 */
                allCancel: Function,            /* 非必须, 表单格式下,控制所有分组的"取消"按钮的回调,无参数,option.isAllBtn为false时无效 */
                allSure: Function,              /* 非必须, 表单格式下,控制所有分组的"确定"按钮的回调,接收1个参数,所有表单的值,option.isAllBtn为false时无效 */
            }
        }
    },
    mounted() {},
    methods: {
        // 提交方法
        submit(groupIndex, groupData) {
            // 提交---

            // 分组按钮--关闭提交,在提交回调中使用
            this.$refs.commonForm.closeSubmit(groupIndex);

            // 总按钮--提交时的loading控制
            this.$refs.commonForm.allLoading = true;
            this.$refs.commonForm.allLoading = false;

        },
    }
}
</script>