<template>
<div>
    <div class="EDBdataget">
        <el-form :rules="rules" ref="form" :model="form" label-width="120px" label-position='right'>
            <!-- 选择店铺 -->
            <el-form-item label="店铺选择" prop="shopIds">
                <el-select v-model="form.shopIds" placeholder="请选择店铺名" multiple collapse-tags>
                    <el-option
                    v-for="item in shopName"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 选择仓库 -->
            <el-form-item label="店铺仓库" prop="storageId">
                <el-select v-model="form.storageId" clearable placeholder="请选择仓库名">
                    <el-option
                    v-for="item in entrepotName"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 外部订单号 -->
            <el-form-item label="外部订单编号" prop="outTid">
                <el-input v-model="form.outTid" style='max-width: 218px;' placeholder="请输入外部订单编号"></el-input>
            </el-form-item>
            <!-- EDB订单号 -->
            <el-form-item label="EDB订单编号" prop="EDBtid">
                <el-input v-model="form.EDBtid" style='max-width: 218px;' placeholder="请输入EDB订单编号"></el-input>
            </el-form-item>
            <!-- 日期类型 -->
            <el-form-item label="日期类型" prop="dateType">
                <el-radio-group v-model="form.dateType">
                    <el-radio v-for="i in dateType" :label="i.value" style="width:140px;margin:10px;">{{i.value}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 开始时间结束时间 -->
            <el-form-item label="选择时间" prop="time">
                
            <el-date-picker @change='timeChange'
                v-model="form.time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions0">
            </el-date-picker>

            </el-form-item>
            <!-- 处理状态 -->
            <el-form-item label="处理状态" prop="proceStatus">
                <el-radio-group v-model="form.proceStatus">
                    <el-radio v-for="i in proceStatus" :label="i.value" style="width:140px;margin:10px;">{{i.value}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 发货状态 -->
            <el-form-item label="发货状态" prop="orderStatus">
                <el-radio-group v-model="form.orderStatus">
                    <el-radio v-for="i in orderStatus" :label="i.value" style="width:140px;margin:10px;">{{i.value}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
    //页面代码
        // <ul class="nav nav-second-level">
        //     <li>
        //     <a href="/EDBdatagetList" class="J_menuItem">23122</a>
        //     </li>
        // </ul>

    //进入页面加载引入js以及加载下面第二三行，跳转页面就可以实现标签的变化
    // import contabs from '../../../assets/js/contabs';
    // contabs(this.$router);
    // this.$router.push('/EDBdataget')



    export default {
        data() {
            return {
                form: {
                    shopIds:[],//店铺
                    storageId:'',//仓库
                    outTid:'',//外部单号
                    EDBtid:'',//易店宝
                    dateType:'发货日期',//时间类型
                    time:'',//时间
                    beginTime:'',//开始时间
                    endTime:'',//结束时间
                    proceStatus:'已财务审核',//处理状态
                    orderStatus:'已发货',//发货状态
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
                dateType: [{
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
                orderStatus: [ {
                    value: '未发货',
                    label: ''
                },{
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
                    value: '已发货',
                    label: ''
                }],
                //处理状态
                proceStatus: [{
                    value: '已财务审核',
                    label: ''
                }, {
                    value: '未确认',
                    label: ''
                }, {
                    value: '已确认',
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
                    shopIds:[
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    dateType:[
                        {required: true, message: '请选择日期类型', trigger: 'change' }
                    ],
                    time:[
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    proceStatus:[
                        { required: true, message: '请选择处理状态', trigger: 'change' }
                    ],
                    orderStatus:[
                        { required: true, message: '请选择发货状态', trigger: 'change' }
                    ],
                },
                forms:[],
            }
        },
        methods: {
            // 提交
            submitForm(formName) {
                this.forms = this.form;
                // this.forms = JSON.stringify(this.form.shopIds)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('/dc-admin/anon/getEDBOrderList',
                        this.forms,
                        {type: 'application/x-www-form-urlencoded'}
                        ).then(res =>{
                            if(res.data.code=='0'){                     
                                this.$message({
                                    type: 'success',
                                    message: res.data.msg,
                                });
                            }else{           
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg,
                                });
                            }
                            this.$refs[formName].resetFields();
                        });
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
                this.form.beginTime=data[0];
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
                console.log(this.entrepotName)
            });
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .EDBdataget{
    display: inline-block;
    width: 100%;
  }
  .EDBdataget .el-input input{
    width: 400px;
  }
</style>
