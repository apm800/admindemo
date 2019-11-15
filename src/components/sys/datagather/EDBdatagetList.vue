<template>
<div>
    <div class="EDBdatagetList">
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                一致性 Consistency<i class="header-icon el-icon-info"></i>
                </template>
                <el-steps :active="1">
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    shopID:'',//店铺
                    wareID:'',//仓库
                    OderID:'',//外部单号
                    EDBID:'',//易店宝
                    timeType:'',//时间类型
                    time:'',//时间
                    setTime:'',//开始时间
                    endTime:'',//结束时间
                    manageState:'',//处理状态
                    cargoState:'',//发货状态
                },
                // 店铺信息
                shopName:[],
                // 仓库信息
                entrepotName:[],
                // 日期选择范围限制
                pickerOptions0:{
                    disabledDate(time) {
                        let curDate = (new Date()).getTime();
                        let three = 90 * 24 * 3600 * 1000;
                        let threeMonths = curDate - three;
                        return time.getTime() > Date.now() || time.getTime() < threeMonths;
                    }
                },
                // 日期类型
                timeType: [{
                    value: '订货日期',
                    label: ''
                }, {
                    value: '付款日期',
                    label: ''
                }, {
                    value: '发货日期',
                    label: ''
                }, {
                    value: '归档日期',
                    label: ''
                }, {
                    value: '预计归档日期',
                    label: ''
                }, {
                    value: '验货日期',
                    label: ''
                }, {
                    value: '核销日期',
                    label: ''
                }, {
                    value: '生成应收时间',
                    label: ''
                }, {
                    value: '称重时间',
                    label: ''
                }, {
                    value: '审单时间',
                    label: ''
                }, {
                    value: '取消时间',
                    label: ''
                }, {
                    value: '完成时间',
                    label: ''
                }, {
                    value: '打印时间',
                    label: ''
                }, {
                    value: '获取日期',
                    label: ''
                }],
                //发货状态
                cargoState: [{
                    value: '待退货部分退货',
                    label: ''
                }, {
                    value: '待退货全部退货',
                    label: ''
                }, {
                    value: '待退货所有',
                    label: ''
                }, {
                    value: '退货到货部分退货',
                    label: ''
                }, {
                    value: '退货到货全部退货',
                    label: ''
                }, {
                    value: '退货到货所有',
                    label: ''
                }, {
                    value: '未发货',
                    label: ''
                }, {
                    value: '已发货',
                    label: ''
                }],
                //处理状态
                manageState: [{
                    value: '未确认',
                    label: ''
                }, {
                    value: '已确认',
                    label: ''
                }, {
                    value: '已财务审核',
                    label: ''
                }, {
                    value: '已作废',
                    label: ''
                }, {
                    value: '已归档',
                    label: ''
                }],
                // 表单验证
                rules: {
                    shopID:[
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    timeType:[
                        {required: true, message: '请选择日期类型', trigger: 'change' }
                    ],
                    time:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    manageState:[
                        { required: true, message: '请选择处理状态', trigger: 'change' }
                    ],
                    cargoState:[
                        { required: true, message: '请选择发货状态', trigger: 'change' }
                    ],
                },
            }
        },
        methods: {
            // 提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //改变时间
            timeChange(data){
                this.form.setTime=data[0];
                this.form.endTime=data[1];
            } 
        },
        mounted() {
            // 获取店铺数据
            this.axios.post('/dc-admin/admin/shop/query/',
            {type: 'payload'}
              ).then(res =>{
                this.shopName = JSON.parse(res.data.list);
            });
            // 获取仓库数据
            this.axios.post('/dc-admin/admin/warehouse/query/',
            {type: 'payload'}
              ).then(res =>{
                this.entrepotName = JSON.parse(res.data.list);
            });
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .EDBdatagetList{
    display: inline-block;
    border-bottom: 1px solid #ccc;
    width: 100%;
    background: #fff;
    padding: 10px;
  }
</style>
