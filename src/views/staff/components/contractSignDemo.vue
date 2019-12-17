<style scoped lang="scss">
    
</style>

<template>
    <div id="contractSignDemo">
        <contractSign :signData="signData" ref="contractSign" ></contractSign>
    </div>
</template>

<script>
import contractSign from './contractSign';

export default {
    name: 'contractSignDemo',               /* 合同签订组件demo */
    components: {contractSign},
    data() {
        return {
            signData: {
                list: [],
                title: ''
            },
        };
    },
    created() {},
    methods: {
        // 获取表单数据
        get() {
            let data = this.$refs.contractSign.getData();
        },
    }
}
</script>