<template>
    <div class="waic8 animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">

            <div class="waic8_s">
                <span>任务日期：</span>
                
                <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                

            <el-button style=" " type="primary" @click="daochu8">查询</el-button>
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
                prop="this_date"
                label="日期"
                width="120">
                </el-table-column>
                <el-table-column
                prop="pay_money"
                label="销售额"
                width="120">
                </el-table-column>
                <el-table-column
                prop="plan_pay_fund "
                label="单日目标销售额"
                width="120">
                </el-table-column>
                <el-table-column
                prop="uv_num"
                label="流量"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="转化"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="客单价"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="分销"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="店铺状态"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="活动名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="活动数据"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="媒体花费"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="CR"
                width="120">
                </el-table-column>
                <el-table-column
                prop="top_3_all"
                label="TOP 3 SKU 销售"
                width="120">
                </el-table-column>
                <el-table-column
                prop="top_3_all_percent"
                label="全店占比"
                width="120">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="TOP1">
                <el-table-column
                prop="top1_sale"
                label="SKU">
                </el-table-column>
                <el-table-column
                prop="top1_sale_percent"
                label="销售占比">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="TOP2">
                <el-table-column
                prop="top2_sale"
                label="SKU">
                </el-table-column>
                <el-table-column
                prop="top2_sale_percent"
                label="销售占比">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="TOP3">
                <el-table-column
                prop="top3_sale"
                label="SKU">
                </el-table-column>
                <el-table-column
                prop="top3_sale_percent"
                label="销售占比">
                </el-table-column>
            </el-table-column>
            <el-table-column
            label="DSR">
                <el-table-column
                prop="description_of_the_match_score"
                label="描述评分">
                </el-table-column>
            </el-table-column>
                <el-table-column
                prop="description_of_the_match_score_change"
                label="幅度纪录"
                width="120">
                </el-table-column>
                <el-table-column
                prop=""
                label="行业均值"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="行业相比"
                width="120">
            </el-table-column>
                <el-table-column
                prop="logistics_service_score"
                label="物流评分"
                width="120">
            </el-table-column>
                <el-table-column
                prop="logistics_service_score_change"
                label="幅度纪录"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="行业均值"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="行业相比"
                width="120">
            </el-table-column>
                <el-table-column
                prop="service_attitude_score"
                label="服务评分"
                width="120">
            </el-table-column>
                <el-table-column
                prop="service_attitude_score_change"
                label="幅度纪录"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="行业均值"
                width="120">
            </el-table-column>
                <el-table-column
                prop=""
                label="行业相比"
                width="120">
            </el-table-column>
            </el-table-column>
            <el-table-column
            	label="评价">
                <el-table-column
                prop="negative_evaluation_number"
                label="负面评价">
                </el-table-column>
                <el-table-column
                prop="there_is_a_figure_of_evaluation"
                label="带图评价">
                </el-table-column>
            </el-table-column>
                <el-table-column
                prop=""
                label="新增评价数"
                width="120">
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
               dataWa2:{
               	apiName:'get_irobot_daily',
               	param:{
               		project_id:"111",
               		task_date:""
                }
               },
                value6:[],
                headClass: function (row) {//头部样式
                        return {"text-align":"left",'background':'#409EFF','color':'#fff',}
                },
                tableData3: [],
                // 查询
                dataWa:{
                  apiName:'ZK_competitiveproductsellinfor_list',
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
            //导出Σ>―(〃°ω°〃)♡→
            OralBdaochu(){
                var a = '';
                for(let i in this.options4){
                    console.log(this.value9)
                    if(this.options4[i].label == this.value9){
                        a = this.options4[i].value
                    }
                }
                //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
                this.OralBdaochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/competitiveproductsellinfor/downloadbybrand?date='
                +this.value6[1]+
                '&projectId='+this.value1+
                setTimeout(function(){document.getElementById("OralBdaochuA").click()},800)
            },
            daochubtn(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
//              console.log(this.value6.slice(0,8))
//              var a = this.value6.slice(0,10)
                this.daochuUrl='http://'+this.$store.state.xianshang+':8024/oralb/get_irobot_daily/?task_date='+this.value6;
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            
            daochu8(){
            	if(this.value6==''){
            		console.log(121321)
            		 this.$message.error('请选择日期');
            	}else{
	            	this.dataWa2.param.task_date = this.value6
	            	this.axios.post('/dc-admin/gate/api',this.dataWa2,{type: 'payload'}).then(res =>{
	                    var datas = JSON.parse(res.data.data)
	                	console.log(datas)
	                    this.tableData3 = datas.data;
	                })
            	}
            },
            //查询
            chaxun(){
                this.loading1 = 1;

                // this.dataWa.param.project_name = this.value11;
                this.dataWa.param.projectId = this.value1 ;
                this.dataWa.param.productId = this.value9 ;
                this.dataWa.param.startDate = this.value6[0]+' 00:00:00';
                this.dataWa.param.endDate = this.value6[1]+' 00:00:00';
                this.dataWa.param.page = this.page;
                this.dataWa.param.limit = this.pagesize;
                // this.dataWa.param.sourceType = '1';
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
                    console.log('‘123’',datas.list.totalCount)
                    // this.dataSum = datas;//为了求和字段而存储
                    this.tableData3 = datas.list.list;
                    this.pageCon = datas.list.totalCount;
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

               
        },
        props: {},
        
    }
</script>
<style lang="less">
.waic8 .el-table__fixed{
    pointer-events: none;
}
.waic8_s{
    display: inline-block;
    margin: 10px;
}
.waic8_s .el-input__inner{
    height: 30px !important;
}
</style>
