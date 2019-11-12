<style scoped>
#organization_repair,.mian,.tree,.cont{
    height: 100%;
}
.mian{
    display: flex;
}
.tree{
    width: 200px;
}
.cont{
    width: calc(100% - 200px);
    background-color: #F0F0F0;
}
nav{
    padding: 13px 20px;
    text-align: left;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F1F2F2;
}
nav .label{
    margin-right: 10px;
    font-size: 14px;
    line-height: 14px;
}
</style>

<template>
    <div id="organization_repair">
        <div class="mian">
            <div class="tree">
                <nav>
                    <span class="label" >显示封存：</span>
                    <el-switch v-model="sealUp" active-color="#13ce66" ></el-switch>
                </nav>
                <el-tree :data="treeData" :props="treeProps" @node-click="treeNodeClick"></el-tree>
            </div>
            <div class="cont"></div>
        </div>
    </div>
</template>

<script>
import { page_api1 } from "../../request/api";
export default {
    name: "repair" /* 机构维护 */,
    data() {
        return {
            sealUp: false,          /* 显示封存 */
            treeData: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [{label: '三级 1-1-1'}]
                        }
                    ]
                }],
            treeProps:{
                children: 'children',
                label: 'label'
            },
        };
    },
    mounted() {},
    methods: {
        treeNodeClick() {},
    }
};
</script>