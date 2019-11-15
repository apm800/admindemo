<template>
    <div class="goodsEF animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">

            <div class="waic8_s">
                <span>当前项目：</span>
                <el-select v-model="value1" placeholder="请选择项目" @change="shop_xin">
                    <el-option
                        v-for="item in shopName"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
                <!-- <a href="javascript:;">生成任务</a> -->
            </div>
            <br>
            <div class="goodsEF_s">
                <span>任务日期：</span>
                <!-- <el-date-picker 
                @change='dateChang'
                v-model="value6"
                value-format="yyyy-MM-dd"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker
                v-model="value6"
                @change='dateChang'
                type="daterange"
                value-format="yyyy-MM-dd"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker>
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'LJS_select_product_daily'">查询</el-button>
            </div>
        </div>
                    <!-- :header-cell-style="rowClass(0,0)" -->
                    <!-- :row-style="rowClass(6,6)" -->
        <el-table
            v-loading="loading1"
            element-loading-text="正在查询..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            
            :header-cell-style="headClass"
            
            
            :data="tableData3"
            height="550"
            border
            style="width: 100%">
            <!-- <el-table-column
            label="支付金额"
            width="150">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.pay_fund | money}}
                    </span>
                </template>
            </el-table-column> -->

            <!-- <el-table-column
            v-for="i in biaotou"
            :prop="i.value"
            :label="i.name"
            width="150">
            </el-table-column> -->
            <el-table-column
            prop="commodity_name"
            label="品名"
      sortable
            width="">
            </el-table-column>
            <el-table-column
            prop="pay_fund"
            :formatter="formatterOrderStatus"
            label="支付金额"
      sortable
            width="">
            </el-table-column>
            <!-- <el-table-column
            prop="number_of_buyers"
            label="支付买家数（/人）"
            width="">
            </el-table-column>
            <el-table-column
            prop="amount_of_payment"
            label="支付金额（/元）"
            width="">
            </el-table-column> -->

        </el-table>
        <!-- <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100,500]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCon">
        </el-pagination> -->
        </template>
    </div>
</template>

<script>
	
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                loading1:0,
                //分页每页数量
                pagesize:10,
                // 总数
                pageCon:0,
                //当前页
                page:1,
                // 店铺信息
                shopName:[],
                value1:'22',
                // 时间
                pickerOptions2:{
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6:[],
                headClass: function (row) {//头部样式
                        return {"text-align":"left",'background':'#409EFF','color':'#fff',}
                },
                tableData3: [],
                // 查询
                dataWa:{
                  apiName:'LJS_select_product_daily',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
            }
        },
        methods: {
              //格式化加单位
              formatterOrderStatus(row,column){
                    return row.pay_fund + '元'
              },
            //总和
            getSummaries(param) {
                console.log('1221',this.dataSum)
                var sum=[];
                sum[0] = '合计：';
                sum[1] = this.dataSum.number_of_visitors_sum+'人';
                sum[2] = this.dataSum.number_of_buyers_sum+'人';
                sum[3] = this.dataSum.amount_of_payment_sum+'元';
                return sum;
            },
            // 分页方法        
            handleSizeChange(val) {
                this.pagesize = val;
                this.chaxun();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.chaxun();
            },
            //获取项目id和项目名称
            shop_xin(val){
                for(var i in this.shopName){
                    if(this.shopName[i].code==val){
                        this.value11 = this.shopName[i].name;
                        return;
                    }
                }
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
            },
            //查询
            chaxun(){
                this.loading1 = 1;

                this.dataWa.param.project_name = this.value11;
                this.dataWa.param.project_id = this.value1 ;
                this.dataWa.param.date_start = this.value6[0];
                this.dataWa.param.date_end = this.value6[1];
                // this.dataWa.param.page_size = this.pagesize;
                // this.dataWa.param.page_index = this.page;

                // this.dataWa.param.statistical_date_start = '2018-05-27';
                // this.dataWa.param.statistical_date_end = '2018-06-28';

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    console.log(datas)
                    this.dataSum = datas;//为了求和字段而存储
                    this.tableData3 = datas.data;
                    this.pageCon = datas.count;
                    console.log(this.tableData3)
                });
            },
            // 时间戳转为YY-MM-DD
            fmtDate(obj){
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            }
        },
        mounted() {
            // 店铺信息
            this.shopName = window.shopName;
            this.value1 = this.shopName[0].code;//默认选中第一个
            //根据月份设置默认时间，example 6月 ->5月21-6月21
            // ['2018-05-04 00:00:00','2018-05-05 00:00:00']
            // 设置默认时间从上月21-当月20
            var date=new Date;
            var end = date.getTime();
            var start = end - 3600 * 1000 * 24 * 7;
            end = this.fmtDate(end)
            start = this.fmtDate(start)
            this.value6 = [start,end]
            this.dateChang(this.value6);
                this.chaxun();
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.goodsEF .el-table__fixed{
    pointer-events: none;
}
.goodsEF_s{
    display: inline-block;
    margin: 10px;
}
</style>
