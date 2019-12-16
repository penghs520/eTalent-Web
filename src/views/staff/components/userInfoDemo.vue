<template>
    <div id="userInfoDemo">
        <h1>userInfoDemo</h1>
        <userInfo :userInfo="userInfo" :methods="methods" :option="option" :tabList="tabList" :formList="formList" ></userInfo>
    </div>
</template>

<script>
import userInfo from './userInfo';

export default {
    name: 'userInfoDemo',               /* 用户信息组件demo */
    components: {userInfo},
    data() {
        return {
            userInfo: Object,               /* 用户信息，从表格中拿来的行数据 */
            tabList: Array,                 /* tab栏数据 */
            formList: Array,
            option: {
                showType: String,           /* 显示类型，默认显示seeForm */
                labelWidth: String,         /* label宽度，默认120px */
                option: Boolean,            /* 非必须，是否显示下面的“添加”按钮 */
            },
            methods: {
                tabClick: Function,         /* 非必须，tab栏被点击，接收1个参数，tab对象数据 */
                formSure: Function,         /* 非必须，表单的确定按钮被点击，接收6个参数，表单组序号、表单数据、表单id、tab数据、tabIndex、多个commonForm存在时的index */
                entrySure: Function,        /* 非必须，不配置不显示按钮，确认入职方法，不接收参数 */
                sendEntry: Function,        /* 非必须，不配置不显示按钮，发送预入职登记方法，不接收参数 */
                print: Function,            /* 非必须，不配置不显示按钮，打印，不接收参数 */
                reback: Function,           /* 非必须，不配置不显示按钮，返回按钮 */
            },
        };
    },
    methods: {}
}
</script>