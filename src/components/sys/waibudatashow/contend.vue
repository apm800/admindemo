<template>
    <div class="waidataContend animated fadeInDown">
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
            <div class="waidataContend_s">
                <span>客户端：</span>
                <el-select v-model="value2" placeholder="请选择">
                    <el-option
                        v-for="item in value22"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <a href="javascript:;">生成任务</a> -->
            </div>
            <div class="waidataContend_s">
                <span>竞品SKU：</span>
                <el-select
                    v-model="value9"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading3">
                    <!-- <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option> -->
                    <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </div><br>
            <div class="waidataContend_s">
                <span>任务日期：</span>
                <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'ZK_competitiveproduct_list'">查询</el-button>
            <el-button style=" " type="primary" @click="daochu">导出</el-button>
            <el-button style=" " type="primary" @click="DZdaochu" v-checkup="'DZDC'">定制导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>

            <!-- <div class="waidataContend_s">
                <span style="color:#ccc">注：查询的数据是，选中的任务日期月的01日到选中的任务日期时间段内的数据。</span>
            </div> -->
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
            border
            style="width: 100%">
                <el-table-column
                prop="productName"
                label="竞品SKU"
                width="">
                </el-table-column>
                <el-table-column
                prop="flowSourceName"
                label="来源名称"
                width="">
                </el-table-column>
                <el-table-column
                prop="uv"
                label="竞品访客数"
                width="">
                </el-table-column>
                <el-table-column
                prop="uvPercent"
                label="竞品访客数占比"
                :formatter="head2"
                width="">
                </el-table-column>
                <el-table-column
                prop="tradeIndex"
                label="竞品交易指数"
                width="">
                </el-table-column>
        </el-table>
        </template>
    </div>
</template>

<script>
	var nocheckData =[];
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                value2:'1',
                value22:[
                    {
                        value:'1',
                        label:'PC端'
                    },
                    {
                        value:'2',
                        label:'移动端'
                    },
                ],
                // 模糊查询
                options4: [],
                value9: [],
                list: [],
                loading3: false,
                //sku列表
                SKUlists:[],
                dataWasku:{
                    apiName:'ZK_competinggoods_list',
                    param:{
                        projectId:'',
                    }
                },
                // 日历不可选范围
                pickerOptions1: {
                    disabledDate(time) {
                        var moth = time.getMonth();
                        var day = time.getDate();
                        moth = moth+1;
                        if(moth<10){
                            moth = '0'+moth;
                        }
                        if(day<10){
                            day = '0'+day;
                        }
                        var date1 = (time.getFullYear()) + "-" + 
                                moth + "-" +
                                day;
                        return window.nocheckData.indexOf(date1)==-1;
                    },
                },

                //导出
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
                  apiName:'ZK_competitiveproduct_list',
                  param:{
                  }
                },
                //可选日期
                checkdata:{
                    apiName:'LJS_check_it_shop_talbe',
                    param:{

                    }
                },
            }
        },
        methods: {
            head2(data){
                return data.uvPercent+'%'
            },
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
                var a = '';
                for(var i in this.shopName){
                    if(this.shopName[i].code==val){
                        this.value11 = this.shopName[i].name;
                        //可选日期
                        this.checkDatas()
                        a = this.shopName[i].code;
                    }
                }
                this.SKUlist(a);
                
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
                console.log(this.value6)
            },
            //定制导出
            DZdaochu(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
                console.log(this.value6)
                try{
                    var a = this.value6.slice(0,10)
                }catch(err){}
                this.daochuUrl='http://'+this.$store.state.xianshang+':8078/bfec-obtain/competitiveproduct/download1?projectId='
                                +this.value1+
                                '&date='+a
                                +'&productId='+this.value9+'&type='+this.value2
   
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            //导出
            daochu(){
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
                console.log(this.value6)
                try{
                    var a = this.value6.slice(0,10)
                }catch(err){}
                this.daochuUrl='http://'+this.$store.state.xianshang+':8078/bfec-obtain/competitiveproduct/download?projectId='
                                +this.value1+
                                '&date='+a
                                +'&productId='+this.value9+'&type='+this.value2
   
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            },
            //查询
            chaxun(){
                this.tableData3 = [];
                this.loading1 = 1;

                this.dataWa.param.date = this.value6;
                this.dataWa.param.projectId = this.value1 ;
                this.dataWa.param.productId = this.value9 ;
                this.dataWa.param.type = this.value2 ;

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    console.log(datas)
                    this.tableData3=datas.list
                });
            },
            // 时间戳转为YY-MM-DD
            fmtDate(obj){
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            },
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
            //获取店铺下的sku
            SKUlist(sku){
                this.dataWasku.param.projectId = sku;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWasku,
                {type: 'payload'}
                ).then(res =>{
                    // this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    console.log('‘123’',datas.list)
                    
                    //SKU的值
                    this.list = datas.list.map(item => {
                        return { value: item.productId, label: item.productName };
                    });
                    console.log('asdssasadsaasasd',this.list)

                });
            },
        },
        mounted() {
            // 店铺信息
            this.shopName = window.shopName;
            this.value1 = this.shopName[0].code;
            // var date=new Date;
            // var end = date.getTime();
            // var start = end - 3600 * 1000 * 24 * 1;
            // end = this.fmtDate(end)
            // start = this.fmtDate(start)
            // // this.value6 = [start,end]
            // this.value6 = start
            // this.dateChang(this.value6);

            //可选日期
            this.checkDatas('one')
            //默认sku
            this.SKUlist(this.value1);
            // 默认查询
            this.chaxun();

           
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.waidataContend .el-table__fixed{
    pointer-events: none;
}
.waidataContend_s{
    display: inline-block;
    margin: 10px;
}
.waidataContend .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}

</style>
