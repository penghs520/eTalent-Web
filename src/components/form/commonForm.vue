<style lang="scss" scoped>
#commonForm{
    background-color: #fff;
}
.group{
    padding: 0 24px;
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
.biserial .el-form .elFormItemBox{
    width: 48%;
    text-align: left;
}
.biserial .showBox ul li:nth-child(odd),
.biserial .el-form .elFormItemBox:nth-child(odd){
    margin-right: 2%;
}
.biserial .showBox ul li:nth-child(even),
.biserial .el-form .elFormItemBox:nth-child(even){
    margin-left: 2%;
}
.biserial .showBox ul li.isFullRow,
.biserial .el-form .elFormItemBox.isFullRow{
    width: 100%;
    text-align: left;
    margin-left: 0;
    margin-right: 0;
}

.el-form .elFormItemBox{
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
    height: 78px;
    box-sizing: border-box;
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
    text-align: center;
    button{
        margin: 0 8px;
    }
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
                <div class="groupTitle" v-show="group.groupTitle || option.showType === 'seeForm'" >
                    <div class="title" >
                        <span class="groupTieleIcon" v-show="group.groupTitle"></span>
                        <span v-show="group.groupTitle">{{group.groupTitle}}</span>
                    </div>
                    <div class="editBtn" v-if="option.showType === 'seeForm'" v-show="!showForm[groupIndex]" @click="edit(groupIndex)">
                        <i class="el-icon-edit icon"></i>
                        <span>编辑</span>
                    </div>
                    <div class="editBtn" v-if="option.showType === 'seeForm' && showForm[groupIndex]" @click="del(groupIndex)">
                        <i class="el-icon-edit icon"></i>
                        <span>删除</span>
                    </div>
                </div>
                <!-- 展示内容 -->
                <div class="showBox" v-if="option.showType === 'see' || option.showType === 'seeForm'" v-show="option.showType === 'see' || !showForm[groupIndex]" >
                    <ul>
                        <li v-for="(item,index) in group.list" :key="index" v-show="item.isShow !== false" :class="{isFullRow: item.isFullRow}">
                            <span class="label" :style="{width: option.labelWidth}">{{item.label}}：</span>
                            <span class="value" v-text="seeData[item.key] && seeData[item.key] !== 'null' ? seeData[item.key] : ''" ></span>
                        </li>
                    </ul>
                </div>
                
                <!-- 表单内容 -->
                <div class="formBox" v-if="option.showType === 'form' || option.showType === 'seeForm'" v-show="option.showType === 'form' || showForm[groupIndex]" >
                    <el-form :model="form" size="small" status-icon :rules="rules" :ref="`form_${groupIndex}`" :label-width="option.labelWidth" >
                 <div v-for="(item,index) in group.list" :key="index" class="elFormItemBox" :class="{isFullRow: item.isFullRow}">
                    <el-form-item   v-if="item.isShow !== false" :label="`${item.label}：`" :prop="item.key">
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
                                    <el-checkbox v-for="(se,seIndex) in item.list" :key="seIndex" :disabled="se.disabled ? true : false" :label="se.value">{{se.label}}</el-checkbox>
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

                            <!-- 机构树 -->
                            <el-select v-if="item.type === 'orgTree'" :ref="`orgTree_${index}`"  v-model="orgTreeShowData[`orgTree_${index}`]" :placeholder="item.placeholder" size="small" clearable="" popper-class="base_treeSelect" style="width:100%"  :disabled="Boolean(item.isReadOnly)">
                                <el-option  :label="orgTreeShowData[`orgTree_${index}`]" :value="orgTreeShowData[`orgTree_${index}`]">
                                    <tree :treeData="orgTreeData" @nodeClick="org_treeNodeClick($event,item,`orgTree_${index}`)" ></tree>
                                </el-option>
                            </el-select>

                            <!-- 岗位树 -->
                            <!-- postTree -->
                            <el-select v-else-if="item.type === 'postTree'" v-model="form[item.key]" style="width:100%" clearable="" :placeholder="item.placeholder" :disabled="Boolean(item.isReadOnly)" >
                                <el-option v-for="(post,postIndex) in postTreeList" :key="postIndex" :label="post.post_name" :value="post.post_id" ></el-option>
                            </el-select>

                        </el-form-item>
                        </div>
                        
                    </el-form>
                    <el-row class="btnRow" v-if="!option.isAllBtn && !option.btnHide">
                        <el-button @click="cancel(groupIndex)" size="small" >取消</el-button>
                        <el-button @click="sure(groupIndex,`form_${groupIndex}`)" size="small" type="primary" :loading="loading[groupIndex]" >确定</el-button>
                    </el-row>
                </div>
            </div>

            <!-- 控制全部的按钮 -->
            <el-row class="btnRow" v-if="option.isAllBtn && !option.btnHide">
                <el-button @click="allFormCancel" size="small" >取消</el-button>
                <el-button @click="allFormSure" size="small" type="primary" :loading="allLoading" >确定</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import base from '../../assets/js/base';
import tree from '../tree/tree';
import {staff_api1,staff_api2,staff_api3} from '../../request/api'

export default {
    name: 'commonForm',             /* 公共表单 */
    components: {tree},
    props: {
        index: Number,              /* 存在多个commonForm时的index序号 */
        data: Object,
    },
    data() {
        return {
            domList: [],
            option: {
                showType: 'form',           /* 显示样式类型 */
                biserial: true,             /* 单双列，true-双列、false-单列 */
                labelWidth: '100px',        /* label宽度 */
                formatDom: false,
                isAllBtn: false,            /* 是否显示控制所有表单的按钮 */
            },

            seeData: {},
            form: {},
            rules: {
                // name: [{required: true, message: '请输入姓名', trigger: 'change'}],
            },
            showForm: [],                   /* 存储各分组的编辑状态 */
            loading: [],
            formRefNameList: [],            /* 表单ref名称列表 */
            allLoading: false,              /* 总按钮的loading */

            // 机构树
            orgTreeShowData: {},            /* 机构树显示字值绑定的变量集合 */
            orgTreeData: {
                data: null,
                nodeKey: 'org_id',
                props: {
                    children: 'list',
                    label: 'org_name'
                },
                showDefaultIcon: true,
                defaultIconExpandNode: true,
            },

            // 岗位------------
            postTreeList: null,
            hasOrgTree: false,
            postKey: '',
        };
    },
    created() {
        if (this.data.option) {
            Object.assign(this.option,this.data.option);
        };
        if (this.option.formatDom) {
            this.domList = this.domListFormatter(this.data.domList);
        }else{
            this.domList = this.data.domList;
        };

        this.init();
    },
    computed: {},
    watch: {
        'data.domList': {
            handler: function(v) {
                if (this.option.formatDom) {
                    // this.domList = this.domListFormatter(v);
                    this.$set(this, 'domList', this.domListFormatter(v));
                }else{
                    // this.domList = v;
                    this.$set(this, 'domList', v)
                };
                this.init();
            },
            deep: true
        }
    },
    mounted() {
        // this.init();
    },
    methods: {
        // 转换方法--后端传来的字段不是预期的字段，需要转换一下下
        domListFormatter(initialData) {
            let result = [];

            if (!Array.isArray(initialData)) {
                console.error(`commonForm提示：值类型错误：domList的值应该是数组`);
                return result;
            };
            
            initialData.forEach((group, groupIndex) => {
                let myGroup = new Object();
                if (group.hasOwnProperty('groupName')) {
                    myGroup.groupTitle = group.groupName;
                };
                if (group.hasOwnProperty('customFieldVOList')) {
                    if (Array.isArray(group.customFieldVOList)) {
                        myGroup.list = new Array();
                        let list = group.customFieldVOList;
                        list.forEach((item,index) => {
                            let dom = new Object();
                            // type
                            if (item.hasOwnProperty('fieldType')) {
                                dom.type = item.fieldType;
                            };

                            // label
                            if (item.hasOwnProperty('fieldName')) {
                                dom.label = item.fieldName;
                            };

                            // key
                            if (item.hasOwnProperty('fieldId')) {
                                dom.key = String(item.fieldId);
                            }

                            // default
                            if (item.hasOwnProperty('defaultValue')) {
                                if (item.defaultValue !== 'null') {
                                    dom.default = item.defaultValue;
                                }
                            }

                            // placeholder
                            if (item.hasOwnProperty('placeholder')) {
                                dom.placeholder = item.placeholder;
                            }

                            // maxLength
                            if (item.hasOwnProperty('maxLength')) {
                                dom.maxLength = item.maxLength;
                            }

                            // minLength
                            if (item.hasOwnProperty('minLength')) {
                                dom.minLength = item.minLength;
                            }

                            // inputType
                            if (item.hasOwnProperty('inputType')) {
                                dom.inputType = item.inputType;
                            }

                            // max
                            if (item.hasOwnProperty('maxNumber')) {
                                dom.max = item.maxNumber;
                            }

                            // min
                            if (item.hasOwnProperty('minNumber')) {
                                dom.min = item.minNumber;
                            }

                            // floatLength
                            if (item.hasOwnProperty('floatLength')) {
                                dom.floatLength = item.floatLength;
                            }

                            // list
                            if (item.hasOwnProperty('dictList') && item.dictList) {
                                dom.list = item.dictList.map(item => ({label: item.dictValue, value: item.dictCode}));
                            }

                            // isRange
                            if (item.hasOwnProperty('isTimeRange')) {
                                dom.isRange = item.isTimeRange;
                            }

                            // timeMin
                            if (item.hasOwnProperty('minTime')) {
                                dom.timeMin = item.minTime;
                            }

                            // timeMax
                            if (item.hasOwnProperty('maxTime')) {
                                dom.timeMax = item.maxTime;
                            }

                            // timeFormat
                            if (item.hasOwnProperty('formatTime')) {
                                dom.timeFormat = item.formatTime;
                            }

                            // isReadOnly
                            if (item.hasOwnProperty('isOnlyRead')) {
                                dom.isReadOnly = item.isOnlyRead;
                            }

                            // isMust
                            if (item.hasOwnProperty('isMust')) {
                                dom.isMust = item.isMust;
                            }

                            // rule
                            if (item.hasOwnProperty('rule') && item.rule) {
                                dom.rule = item.rule.split(',');
                            }

                            myGroup.list[index] = dom;
                        });
                    }else{
                        console.error(`commonForm提示：值类型错误：customFieldVOList的值应该是数组`);
                    }
                }else{
                    console.error(`commonForm提示：后端缺少字段：customFieldVOList`);
                };

                result[groupIndex] = myGroup;
            });

            console.log(result)
            return result;
        },
        // 初始化
        init() {
            console.log('初始化')
            this.formRefNameList = new Array();
            this.domList.forEach((group,groupIndex) => {
                // 添加ref绑定名称
                this.formRefNameList.push(`form_${groupIndex}`);
                // 编辑按钮显示状态处理
                this.showForm.forEach(item => {
                    item = false;
                });
                this.loading = [];
                group.list.forEach((item, index) => {
                    // 特殊dom处理
                    this.specialDom(item, index);
                    // 添加校验规则
                    this.ruleM(item);
                    // 添加必要的绑定字段
                    this.modelKey(item);
                    // 添加默认值
                    this.defaultValue(item);
                });
            });
        },

        // 处理特殊dom
        specialDom(dom,index) {
            // 机构树
            if (dom.type === 'orgTree') {
                if (!this.orgTreeData.data) {
                    this.hasOrgTree = true;
                    // 请求机构树、赋值
                    this.orgTree_getCompany();
                    // this.$set(this.orgTreeShowData, `orgTree_${index}`, )
                }
            }
            if (dom.type === 'postTree') {
                this.postKey = dom.key;
                if (!this.postTreeList && !this.hasOrgTree) {
                    // 请求岗位
                    this.post_getPostList();
                }
            }
        },

        // 请求机构树
        orgTree_getCompany() {
            staff_api1(null, res => {
                base.log('s', 'commonForm--机构树', res)
                let d = res.data;
                if (d.success) {
                    this.orgTree_getDepartment(d.result);
                }else{
                    base.error(d);
                }
            })
        },
        orgTree_getDepartment(id) {
            let send = {"companyId": id};
            base.log('s', '机构树', send);
            staff_api2(send, res => {
                let d = res.data;
                base.log('r', '机构树', d);
                if (d.success) {
                    this.orgTreeData.data =new Array();
                    this.orgTreeData.data.push(d.result);
                }else{
                    base.error(d);
                }
            })
        },

        // 添加必要绑定字段
        modelKey(dom) {
            if (dom.type === 'checkbox') {
                this.$set(this.form,dom.key,[]);
            }
        },

        // 添加默认值
        defaultValue(dom) {
            if (dom.default && dom.default !== 'null') {
                // 表单默认值
                this.$set(this.form, dom.key, dom.default);
                // 显示默认值
                if (dom.type === 'orgTree') {
                    //(◔.̮◔)
                    // this.orgTree_getCompany(dom.default); 
                }else if (dom.type === 'postTree') {
                    // (◔.̮◔)
                    // this.orgTree_getCompany(null,dom.default);
                }else{
                    this.$set(this.seeData, dom.key, dom.default);
                }
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

        // 删除
        del(index) {
            // this.data.del(index,this.data.formId,this.index);
        },

        // 取消
        cancel(index) {
            this.$set(this.showForm,index,false);
            if (this.data.cancel) {
                this.data.cancel(index);
            }
        },

        // 确定
        sure(groupIndex,formName) {
            this.$refs[formName][0].validate((valid) => {
                if (valid) {
                    if (this.data.sure) {
                        let data = this.getCurrentGroupData(groupIndex);
                        this.data.sure(groupIndex,data,this.data.formId,this.index);
                        this.$set(this.loading, groupIndex, true);
                    }
                }
            });
        },

        // allForm
        allFormCancel() {
            if (this.data.allCancel) {
                this.data.allCancel();
            }
        },

        // allForm
        allFormSure() {
            if (this.data.allSure) {
                let pass = true;
                this.formRefNameList.forEach(name => {
                    this.$refs[name][0].validate((valid) => {
                        if (!valid) {
                            pass = false;
                        }
                    });
                });
                if (pass) {
                    this.data.allSure(this.form);
                }
            }
        },

        getData() {
            let pass = true;
            this.formRefNameList.forEach(name => {
                this.$refs[name][0].validate((valid) => {
                    if (!valid) {
                        pass = false;
                    }
                });
            });
            if (pass) {
                return this.form;
            }
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

        // 机构树--节点被点击
        org_treeNodeClick(node, domOption, domRef) {
            let dataKey = domOption.key;
            let showKey = domRef;
            this.$set(this.form, dataKey, node.org_id);
            this.$set(this.orgTreeShowData, showKey, node.org_name);
            this.$refs[domRef][0].blur();
            if (this.postKey) {
                this.$set(this, 'postTreeList', null);
                this.$set(this.form, this.postKey, '');
                this.post_getPostList(node.org_id);
            }
        },

        // 请求岗位
        post_getPostList(orgId=null) {
            let send = {"orgId": orgId};
            base.log('s', '获取入职岗位a', send);
            staff_api3(send, res => {
                let d = res.data;
                base.log('r', '获取入职岗位a', d);
                if (d.success) {
                    this.postTreeList = JSON.parse(d.result);
                    console.log(this.postTreeList)
                }else{
                    base.error(d);
                }
            })
        },
    }
}
</script>