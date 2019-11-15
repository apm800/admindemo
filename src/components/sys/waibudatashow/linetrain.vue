<template>
    <div class="waidatalineTrain animated fadeInDown">
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

            <div class="waidatalineTrain_s">
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
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <!-- <el-date-picker
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker> -->
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'ZK_directTrainInfor_list'">查询</el-button>
            <el-button style=" " type="primary" @click="daochu">导出</el-button>
            <el-button style=" " type="primary" @click="OralBdaochu" v-checkup="'OralB_ZK_directTrainInfor_up'">OralB导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
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
            :span-method="objectSpanMethod"

            
            show-summary
            :summary-method="getSummaries"
            
            
            :data="tableData3"
            border
            style="width: 100%">
            <el-table-column
                prop="head"
                :formatter="head1"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="extendPlanName"
            label="推广计划名称"
            width="">
            </el-table-column>
            <el-table-column
            prop="productName"
            label="宝贝名称"
            width="">
            </el-table-column>
            <el-table-column
            prop="searchType"
            label="搜索类型"
            width="">
            </el-table-column>
            <el-table-column
            prop="flowSource"
            label="流量来源"
            width="">
            </el-table-column>
            <el-table-column
            prop="presentationVolume"
            label="展现量"
      sortable
            width="">
            </el-table-column>
            <el-table-column
            prop="clicksVolume"
            label="点击量"
      sortable
            width="">
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="花费"
            width="">
                    <template slot-scope="scope">
                        <span>{{ scope.row.costCents | money}}</span>
                    </template>
            </el-table-column>
            <el-table-column
            prop="totalNumber"
      sortable
            label="总成交笔数"
            width="">
            </el-table-column>
            <el-table-column
            prop=""
      sortable
            label="总成交金额"
            width="">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalAmount | money}}</span>
                    </template>
            </el-table-column>
            <el-table-column
            prop=""
            label="CPC"
      sortable
            width="">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cpc | money}}</span>
                    </template>
            </el-table-column>
            <el-table-column
            prop=""
            label="ROI"
      sortable
            width="">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roi | money}}</span>
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
	
	var nocheckData =[];
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                // 日历不可选范围
                pickerOptions1: {
                	disabledDate(time) {
                		var moth = time.getMonth();
                		var day = time.getDate();
                		moth = moth + 1;
                		if(moth < 10) {
                			moth = '0' + moth;
                		}
                		if(day < 10) {
                			day = '0' + day;
                		}
                		var date1 = (time.getFullYear()) + "-" +
                			moth + "-" +
                			day;
                		return window.nocheckData.indexOf(date1) == -1;

                	}

                },//导出
                daochuUrl:'',
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
                value6:'',
                headClass: function (row) {//头部样式
                        if(row.rowIndex==1){
                            console.log(row)
                            return {"text-align":"left",'background':'#409EFF','color':'#fff','display':'none',}
                        }else{
                            return {"text-align":"center",'background':'#409EFF','color':'#fff',}
                        }
                },
                tableData3: [],
                // 查询
                dataWa:{
                  apiName:'ZK_directTrainInfor_list',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
                //可选日期
                checkdata:{
                    apiName:'LJS_check_it_shop_talbe',
                    param:{

                    }
                },
            }
        },
        methods: {
            //查询不可选日期
            checkDatas(one){
                this.checkdata.param.project_id = this.value1;
                // this.checkdata.param.this_date = this.value6;
                this.axios.post('/dc-admin/gate/api', 
                this.checkdata,
                {type: 'payload'}
                ).then(res =>{
                    var data = JSON.parse(res.data.data)
                    console.log(data)
                    window.nocheckData = data.data;
                    if(arguments.length==0){
                        this.value6 = window.nocheckData[window.nocheckData.length-1]
                        this.dateChang(this.value6);
                    }else{
                        this.value6 = window.nocheckData[window.nocheckData.length-1]
                    }
                });
            },
            //求和
            getSummaries(param){
                console.log('dsasad',param)
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    console.log(column.label)
                    if (index === 0) {
                        sums[index] = '总计';
                        return;
                    }
                    switch(column.label)
                    {
                        case '展现量':
                            sums[index] = data[0].pv;
                        break;
                        case '点击量':
                            sums[index] = data[0].cv;
                        break;
                        case '花费':
                            sums[index] = data[0].cs;
                        break;
                        case '总成交笔数':
                            sums[index] = data[0].tn;
                        break;
                        case '总成交金额':
                            sums[index] = data[0].ta;
                        break;
                        case 'CPC':
                            sums[index] = data[0].cpctotal;
                        break;
                        case 'ROI':
                            sums[index] = data[0].roitotal;
                        break;
                        default:
                            sums[index] = '-';
                    }
                });

                return sums;
            },
            //Oralb导出
            OralBdaochu(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
                console.log(this.value6.slice(0,8))
                var a = this.value6.slice(0,10)
                this.daochuUrl='http://'+this.$store.state.xianshang+':8078/bfec-obtain/directTrainInfor/downloadOralb?&project_id='+this.value1+'&date='+a+'&page=1&limit=100'
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            //导出
            daochu(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
                console.log(this.value6.slice(0,8))
                var a = this.value6.slice(0,10)
                this.daochuUrl='http://'+this.$store.state.xianshang+':8078/bfec-obtain/directTrainInfor/download?&project_id='+this.value1+'&date='+a+'&page=1&limit=100'
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            //合并列
            objectSpanMethod(data){
                if (data.columnIndex === 0) {
                    if (data.rowIndex % 50 === 0) {
                        return {
                            rowspan: 50,
                            colspan: 1
                        };
                    } else {
                        return {
                        rowspan: 0,
                        colspan: 0
                        };
                    }
                }
            },
            //纵向表头
            head1(data){
                console.log(data)
                return this.value6;
            },
              //格式化加单位
              formatterOrderStatus(row,column){
                    return row.pay_fund + '元'
              },
            //总和
            // getSummaries(param) {
            //     console.log('1221',this.dataSum)
            //     var sum=[];
            //     sum[0] = '合计：';
            //     sum[1] = this.dataSum.number_of_visitors_sum+'人';
            //     sum[2] = this.dataSum.number_of_buyers_sum+'人';
            //     sum[3] = this.dataSum.amount_of_payment_sum+'元';
            //     return sum;
            // },
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
                        //可选日期
                        this.checkDatas()
                        return;
                    }
                }
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
                console.log(this.value6)
            },
            //查询
            chaxun(){
                this.tableData3 = [];
                this.loading1 = 1;

                this.dataWa.param.date = this.value6;
                this.dataWa.param.projectId = this.value1 ;
                this.dataWa.param.page = '1' ;
                this.dataWa.param.limit = '100' ;

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    console.log(datas.list.list)
                    // this.dataSum = datas;//为了求和字段而存储
                    this.tableData3 = datas.list.list;
                    // this.pageCon = datas.count;
                    // for(let i in datas.result){
                    //     if(i == "practicalRate"){
                    //         console.log(datas.result[i])
                    //         for(let j in datas.result[i]){
                    //             datas.result[i][j] +='%';
                    //         }
                    //     }
                    //     datas.result[i].head = i;
                    //     this.tableData3.push(datas.result[i]);
                    // }
                    console.log('1221',this.tableData3)
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
            var start = end - 3600 * 1000 * 24 * 1;
            end = this.fmtDate(end)
            start = this.fmtDate(start)
            // this.value6 = [start,end]
            this.value6 = start
            this.dateChang(this.value6);

            
            //可选日期
            this.checkDatas('one')
            // 默认查询
            this.chaxun();
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.waidatalineTrain .el-table__fixed{
    pointer-events: none;
}
.waidatalineTrain_s{
    display: inline-block;
    margin: 10px;
}
.waidatalineTrain .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}

</style>
