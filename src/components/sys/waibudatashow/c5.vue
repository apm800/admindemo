<template>
    <div class="waic5 animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">
            <div class="waic5_s">
                <span>任务日期：</span>
                <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                
                <!-- <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker> -->
                
                <!-- <el-date-picker
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
                </el-date-picker> -->
             <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'get_irobot_source_weekly'">查询</el-button> 
            <el-button style=" " type="primary" @click="daochubtn">导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            <!-- <el-button style=" " type="primary" @click="OralBdaochu" v-checkup="'DZDC'">定制的导出</el-button>
            <a :href="OralBdaochuUrl" style="display:none" id="OralBdaochuA"></a> -->
            </div>
        </div>
        <el-table
            v-loading="loading1"
            element-loading-text="正在查询..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :header-cell-style="headClass"
            
            :data="tableData3"
            border
            style="width: 100%">

            <el-table-column
                label="Tmall traffic 天猫流量">
                <el-table-column
                prop="week"
                label="时间">
                </el-table-column>
                <el-table-column
                prop="start_date"
                label="开始日期">
                </el-table-column>
                <el-table-column
                prop="end_date"
                label="结束日期">
                </el-table-column>
            </el-table-column>
            
            <el-table-column
            label="搜索">
                <el-table-column
                prop="search_pc"
                label="PC">
                </el-table-column>
                <el-table-column
                prop="search_mb"
                label="Mobile">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="推广">
                <el-table-column
                prop="sales_promotion_pc"
                label="PC">
                </el-table-column>
                <el-table-column
                prop="sales_promotion_mb"
                label="Mobile">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="活动">
                <el-table-column
                prop="extension_pc"
                label="PC">
                </el-table-column>
                <el-table-column
                prop="extension_mb"
                label="Mobile">
                </el-table-column>
            </el-table-column>
            
            <el-table-column
                prop="search_all"
                label="搜索">
            </el-table-column>
            <el-table-column
                prop="extension_all"
                label="活动">
            </el-table-column>
            <el-table-column
                prop="sales_promotion_all"
                label="推广">
            </el-table-column>
            <el-table-column
                prop="total_all"
                label="Total">
            </el-table-column>
            <el-table-column
                prop="search_percent"
                label="搜索占比">
            </el-table-column>
            <el-table-column
                prop="extension_percent"
                label="活动占比">
            </el-table-column>
            <el-table-column
                prop="sales_promotion_percent"
                label="推广占比">
            </el-table-column>
            
            <el-table-column
            label="终端">
                <el-table-column
                prop="total_pc"
                label="PC">
                </el-table-column>
                <el-table-column
                prop="total_mb"
                label="Mobile">
                </el-table-column>
                <el-table-column
                prop="total_mb_percent"
                label="Mob%">
                </el-table-column>
            </el-table-column>
            
        </el-table>
        </template>
    </div>
</template>

<script>
	
    import bus from '../../../assets/eventbus';
    import download from './download.js';

    export default {
        mixins:[download],
        data() {
            return {
                // 模糊查询
                options4: [],
                value9: [],
                list: [],
                loading: false,
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
                value6:'',
                headClass: function (row) {//头部样式
                        return {"text-align":"left",'background':'#409EFF','color':'#fff',}
                },
                tableData3: [],
                // 查询
                dataWa:{
                  apiName:'get_irobot_source_weekly',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
                //导出的地址
                daochuUrl:'',
                //导出的地址
                OralBdaochuUrl:'',
                //sku列表
                SKUlists:[],
                dataWasku:{
                    apiName:'ZK_competinggoods_list',
                    param:{
                        projectId:'',
                    }
                },
            }
        },
        methods: {
            //模糊查询提示
            remoteMethod(query) {
                if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options4 = this.list.filter(item => {
                        console.log(item.value.toLowerCase().indexOf(query.toLowerCase()))
                        // if(item.value.toLowerCase().indexOf(query.toLowerCase())==0){
                            return  item.value.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1||item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1
                        // }
                        // if(item.label.toLowerCase().indexOf(query.toLowerCase())==0){
                        //     return  item.label.toLowerCase()
                        //             .indexOf(query.toLowerCase()) > -1
                        // }
                        // console.log(item.value)
                        // return item.label.toLowerCase()
                        // .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
                } else {
                this.options4 = [];
                }
            },
            //  格式化日期
            formatter_ishandle(data){
                console.log(data.date)
                 var date =  new Date(data.date);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
                // return data.date.substr(0,10)
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
                var a = '';
                for(let i in this.shopName){
                    if(this.shopName[i].code==val){
                        this.value11 = this.shopName[i].name;
                        a = this.shopName[i].code;
                        // return;
                    }
                }
                        console.log(a)
                this.SKUlist(a);
            },
            //获取店铺下的sku
            SKUlist(sku){
                this.dataWasku.param.projectId = sku;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWasku,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    console.log('‘123’',datas.list)
                    
                    //SKU的值
                    this.list = datas.list.map(item => {
                        return { value: item.productId, label: item.productName };
                    });
                    console.log('asdssasadsaasasd',this.list)

                });
            },
            // 修改时间
            dateChang(data){
                console.log(data)
                this.value6 = data;
            },

//          导出
            daochubtn(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
//              console.log(this.value6.slice(0,8))
//              var a = this.value6.slice(0,10)
                this.daochuUrl='http://'+this.$store.state.xianshang+':8024/oralb/get_irobot_source_weekly/?task_date='+this.value6;
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            
            //查询
            chaxun(){
            	if(this.value6==''){
            		 this.$message.error('请先选择任务日期');
            	}
                this.loading1 = 1;

                this.dataWa.param.task_date = this.value6;
                // this.dataWa.param.statistical_date_start = '2018-05-27';
                // this.dataWa.param.statistical_date_end = '2018-06-28';

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    console.log(res)
                    var datas = JSON.parse(res.data.data)
                    console.log(datas)
                    this.tableData3 = datas.data;
//                  console.log('‘123’',datas.list.totalCount)
//                  // this.dataSum = datas;//为了求和字段而存储
//                  this.pageCon = datas.list.totalCount;
//                  console.log(this.tableData3)
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
            // var date=new Date;
            // var end = date.getTime();
            // var start = end - 3600 * 1000 * 24 * 30;
            // end = this.fmtDate(end)
            // start = this.fmtDate(start)
            // this.value6 = [start,end]
            // this.dateChang(this.value6);


            //默认sku
            this.SKUlist(this.value1);
            
            // 默认查询
//          this.chaxun();
               
        },
        props: {},
        
    }
</script>
<style lang="less">
.waic5 .el-table__fixed{
    pointer-events: none;
}
.waic5_s{
    display: inline-block;
    margin: 10px;
}
.waic5_s .el-input__inner{
    height: 30px !important;
}
</style>
