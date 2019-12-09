<style lang="scss" scoped >
.title{
    display: flex;
    align-items: center;
    padding: 24px;
    font-size: 16px;
    color: #000;
    .groupTieleIcon{
        width: 4px;
        height: 16px;
        background-color: #FF8C58;
        margin-right: 16px;
    }
}
</style>

<template>
    <div id="commonTitle">
        <div class="title">
            <span class="groupTieleIcon"></span>
            <span v-text="name" ></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commonTitle',        /* 标题组件 */
    props: {
        name: String            /* 标题名称 */
    },
    data() {
        return {};
    }
}
</script>