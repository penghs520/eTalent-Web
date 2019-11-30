<style lang="scss" scoped>
    
</style>

<template>
    <div id="commonForm">
        <h1>公共表单</h1>
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
        };
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
    mounted() {},
    methods: {}
}
</script>