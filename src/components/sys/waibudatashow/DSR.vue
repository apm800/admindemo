<template>
    <div class="waidataRibao animated fadeInDown">
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
            <div class="waidataRibao_s">
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
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'ZK_oralbdataitshoptable_dsr'">查询</el-button>
            <el-button style=" " type="primary" @click="daochu">导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>
        </div>
                    <!-- :header-cell-style="rowClass(0,0)" -->
                    <!-- :row-style="rowClass(6,6)" -->
                    <!-- :summary-method="getSummaries"总和 -->
                    <!-- show-summary -->
        <el-table
            v-loading="loading1"
            element-loading-text="正在查询..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            
            :header-cell-style="headClass"
            
            
            :data="tableData3"
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
            prop="statisticalDate"
            label="日期"
            :formatter="date1"
      sortable
            width="200">
            <!-- :formatter="formatter_ishandle" -->
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="描述相符">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.descriptionOfTheMatchScore}}</span>
                    <i v-if="scope.row.descriptionStatus<'0'" class="el-icon-sort-down" style="color:red"></i>
                    <i v-if="scope.row.descriptionStatus>'0'" class="el-icon-sort-up" style="color:green"></i>
                </template>
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="服务态度">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.serviceAttitudeScore}}</span>
                    <i v-if="scope.row.serviceStatus<'0'" class="el-icon-sort-down" style="color:red"></i>
                    <i v-if="scope.row.serviceStatus>'0'" class="el-icon-sort-up" style="color:green"></i>
                </template>
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="物流服务">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.logisticsServiceScore}}</span>
                    <i v-if="scope.row.logisticsStatus<'0'" class="el-icon-sort-down" style="color:red"></i>
                    <i v-if="scope.row.logisticsStatus>'0'" class="el-icon-sort-up" style="color:green"></i>
                </template>
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="DSR综合低评分买家数">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.negativeEvaluationNumber}}</span>
                    <i v-if="scope.row.negativeStatus<'0'" class="el-icon-sort-down" style="color:red"></i>
                    <i v-if="scope.row.negativeStatus>'0'" class="el-icon-sort-up" style="color:green"></i>
                </template>
            </el-table-column>

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
                //daochuUrl导出
                daochuUrl:'',
                loading1:0,
                //分页每页数量
                pagesize:100,
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
                  apiName:'ZK_oralbdataitshoptable_dsr',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
            }
        },
        methods: {
            //导出
            daochu(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
                // console.log(this.value6.slice(0,8))
                // var a = this.value6.slice(0,10)
                this.daochuUrl='http://'+this.$store.state.xianshang+':8078/bfec-obtain/oralbdataitshoptable/download?&start='+this.value6[0]+'&end='+this.value6[1]+'&projectId='+this.value1
//    /bfec-obtain/oralbuserplandatatargetdaily/download?start=2018-06-03&end=2018-07-03&projectId=22
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            //格式化日期
            date1(data){
                return data.statisticalDate.slice(0,10)
            },
            //  格式化日期
            formatter_ishandle(data){
                console.log(data.date)
                 var date =  new Date(data.date);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
                return data.date.substr(0,10)
            },
            //总和
            getSummaries(param) {
                // var sum=[];
                // sum[0] = '合计：';
                // sum[1] = this.dataSum.number_of_visitors_sum+'人';
                // sum[2] = this.dataSum.number_of_buyers_sum+'人';
                // sum[3] = this.dataSum.amount_of_payment_sum+'元';
                // return sum;
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
            changeDate(data){
                // 字符串转为时间戳，减去一天转为字符串
                var date = data;
                date = date.substring(0,19);    
                date = date.replace(/-/g,'/'); 
                console.log(date)
                var timestamp = new Date(date).getTime();
                timestamp = timestamp - 3600 * 1000 * 24 * 1;
                var d = new Date(timestamp);    //根据时间戳生成的时间对象
                var moth = d.getMonth();
                var day = d.getDate();

                moth = moth+1;
                if(moth<10){
                    moth = '0'+moth;
                }
                if(day<10){
                    day = '0'+day;
                }


                var date1 = (d.getFullYear()) + "-" + 
                        moth + "-" +
                        day;
                console.log('reeeeeee',date1);
                return date1
            },
            //查询
            chaxun(){
                this.loading1 = 1;
                // this.dataWa.param.project_name = this.value11;

                var startDate = this.changeDate(this.value6[0])
                this.dataWa.param.projectId = this.value1 ;
                this.dataWa.param.startDate = startDate;
                // this.dataWa.param.endDate = this.value6[1]+' 00:00:00';
                this.dataWa.param.endDate = this.value6[1];
                this.dataWa.param.page = this.page;
                this.dataWa.param.limit = this.pagesize;
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
                    console.log('123',datas)
                    // this.dataSum = datas;//为了求和字段而存储
                    this.tableData3 = datas.page.list;
                    // this.pageCon = datas.count;
                    this.pageCon = datas.page.totalCount;
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
            var start = end - 3600 * 1000 * 24 * 30;
            end = this.fmtDate(end)
            start = this.fmtDate(start)
            this.value6 = [start,end]
            this.dateChang(this.value6);

            // 默认查询
            this.chaxun();
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.waidataRibao .el-table__fixed{
    pointer-events: none;
}
.waidataRibao_s{
    display: inline-block;
    margin: 10px;
}
</style>
