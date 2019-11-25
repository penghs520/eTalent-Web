<template>
    <div id="formDemo">
        <!-- 表单 -->
        <el-form :model="addForm" size="small" status-icon :rules="addRules" ref="addForm" label-width="100px" >
            <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
        </el-form>


        <!-- 下拉框 -->
        <el-select v-model="select" style="width:100%" @change="selectChange" >
            <el-option v-for="(item,index) in list" :key="index" :label="item.label" :value="item.value" ></el-option>
        </el-select>

        <!-- 日期选择框 -->
        <el-date-picker
            style="width:100%;"
            v-model="date"
            :editable="false"
            size="small"
            value-format="yyyy-MM-dd">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: 'demo',
    method: {
        addSure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addSubmit();
                }
            });
        },
    }
}
</script>