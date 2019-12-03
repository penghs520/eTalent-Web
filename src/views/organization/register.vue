<style lang="scss" scoped>
</style>

<template>
    <div id="commonFormDemo">
        <h1>表单组件</h1>
        <commonForm :data="form" ref="commonForm" ></commonForm>
    </div>
</template>

<script>
import commonForm from '../../components/form/commonForm';


export default {
    name: 'commonFormDemo',            /* 表单组件 */
    components: {commonForm},
    data() {
        return {
            form: {
                domList: [
                    {
                        groupTitle: '基本信息',
                        list: [
                            {type: 'input', fieldName: '姓名', key: 'name', placeholder: '请输入姓名', isMust: true, default: '和洋洋'},
                            {type: 'radio', fieldName: '性别', key: 'sex', list: [{label: '男', value: 1}, {label: '女', value: 2}], default: 1},
                            {type: 'select', fieldName: '年级', key: 'grade', placeholder: '请选择年级',default: 1, list: [{label: '一年级', value: 1}, {label: '二年级', value: 2}]},
                            {type: 'dateTime', fieldName: '年月日', key: 'dateTime1', placeholder: '请选择年月日'},
                        ]
                    },
                    {
                        groupTitle: '其它信息',
                        list: [
                            {type: 'input', fieldName: '数字1', key: 'number', isMust: true,inputType: 'number', min: 0, max:5, floatLength: 1},
                            {type: 'input', fieldName: '数字2', key: 'number2', isMust: true,inputType: 'number', max: 66, floatLength: 0},
                            {type: 'input', fieldName: '密码', key: 'password', placeholder: '请输入密码', isMust: true,inputType: 'password'},
                            {type: 'selectMore', fieldName: '喜欢的水果', key: 'fruit', placeholder: '请选择爱吃的水果', list: [{label: '苹果', value: 1}, {label: '香蕉', value: 2}, {label: '榴莲', value: 3}]},
                            {type: 'checkbox', fieldName: '喜欢动物', key: 'animal', list: [{label: '小狗', value: 1}, {label: '小猫', value: 2}, {label: '小刺猬', value: 3}]},
                            {type: 'time', fieldName: '起床时间', key: 'qichuang', placeholder: '请选择起床时间' ,isRange:true},
                            {type: 'date', fieldName: '生日', key: 'birthday', placeholder: '请选择生日',isReadOnly: false},
                            {type: 'dateTime', fieldName: '年月日', key: 'dateTime', placeholder: '请选择年月日'},
                            {type: 'textarea', fieldName: '备注', key: 'description'}
                        ]
                    }
                ],
                option: {
                    showType: 'seeForm',           /* 显示样式类型 */
                    biserial: true,             /* 单双列，true-双列、false-单列 */
                    labelWidth: '100px',        /* label宽度 */
                },
                sure: this.sure
            }
        }
    },
    mounted() {},
    methods: {
        sure(groupIndex,groupData) {
            console.log(groupIndex);
            console.log(groupData);
            setTimeout(() => {
                this.$refs.commonForm.closeSubmit(groupIndex);
            },1000)
        },
    }
}
</script>