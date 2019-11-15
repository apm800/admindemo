<template>
    <div class="waidataTargetPC animated fadeInDown">
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
            <div class="waidataTargetPC_s">
                <span>SKU：</span>
                <el-select
                    v-model="value9"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
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
            </div>
            <br>

            <div class="waidataTargetPC_s">
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
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'ZK_singleproductsourceinfor_list'">查询</el-button>
            <el-button style=" " type="primary" @click="daochu">导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>
        </div>
                    <!-- :header-cell-style="rowClass(0,0)" -->
                    <!-- :row-style="rowClass(6,6)" -->
                    <!-- 求合:summary-method="getSummaries" -->
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
            <el-table-column
            prop="date"
            label="日期"
            width="200">
            <!-- :formatter="formatter_ishandle" -->
            </el-table-column>
            <el-table-column
            prop="productName"
            label="SKU名称"
            width="200">
            </el-table-column>
            <el-table-column
            prop="百度"
            label="百度"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝站内其他"
            label="淘宝站内其他"
            width="200">
            </el-table-column>
            <el-table-column
            prop="智钻"
            label="智钻"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝搜索"
            label="淘宝搜索"
            width="200">
            </el-table-column>
            <el-table-column
            prop="天猫搜索"
            label="天猫搜索"
            width="200">
            </el-table-column>
            <el-table-column
            prop="直接访问"
            label="直接访问"
            width="200">
            </el-table-column>
            <el-table-column
            prop="直通车"
            label="直通车"
            width="200">
            </el-table-column>
            <el-table-column
            prop="购物车"
            label="购物车"
            width="200">
            </el-table-column>
            <el-table-column
            prop="宝贝收藏"
            label="宝贝收藏"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝首页"
            label="淘宝首页"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘外流量其他"
            label="淘外流量其他"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝客"
            label="淘宝客"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝海外"
            label="淘宝海外"
            width="200">
            </el-table-column>
            <el-table-column
            prop="聚划算"
            label="聚划算"
            width="200">
            </el-table-column>
            <el-table-column
            prop="天猫频道"
            label="天猫频道"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝足迹"
            label="淘宝足迹"
            width="200">
            </el-table-column>
            <el-table-column
            prop="天猫首页"
            label="天猫首页"
            width="200">
            </el-table-column>
            <el-table-column
            prop="淘宝其他店铺"
            label="淘宝其他店铺"
            width="200">
            </el-table-column>
            <el-table-column
            prop="店铺收藏"
            label="店铺收藏"
            width="200">
            </el-table-column>


        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100,500]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCon">
        </el-pagination>
        </template>
    </div>
</template>

<script>
	
    import bus from '../../../assets/eventbus';
    export default {
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
                  apiName:'ZK_singleproductsourceinfor_list',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
                //导出的地址
                daochuUrl:'',
                //sku列表
                SKUlists:[],
                dataWasku:{
                  apiName:'ZK_singleproductsourceinfor_skulist',
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
                    console.log('‘123’',datas.skulist)
                    
                    //SKU的值
                    this.list = datas.skulist.map(item => {
                        return { value: item.productId, label: item.productName };
                    });
                    console.log('asdssasadsaasasd',this.list)

                });
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
            },
            //导出
            daochu(){
                var a = 'product_id';
                for(let i in this.options4){
                    console.log('value9==',this.value9)
                    if(this.options4[i].label == this.value9){
                        a = this.options4[i].value
                    }
                }
                    console.log(a)
                if(this.value9==''){
                    this.$message({
                    type: 'error',
                    message: '请选择SKU'
                    });
                    return;
                }
                //this.daochuUrl = 'http://172.18.15.191:8000/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
                // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/select_single_product_source_infor_new_excel/?date_start='+this.value6[0]+'&project_id='+this.value1+'&product_id='+a+'&source_type='+'1'+'&date_end='+this.value6[1]

                this.daochuUrl = 'http://'+'172.18.15.243'+':8078/bfec-obtain/singleproductsourceinfor/sku/download?startDate='+this.value6[0]+'&projectId='+this.value1+'&productId='+a+'&sourceType='+'1'+'&endDate='+this.value6[1]
                
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
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
                this.dataWa.param.sourceType = '1';
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
                    console.log('‘123’',datas)
                    // this.dataSum = datas;//为了求和字段而存储
                    this.tableData3 = datas.page.list;
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
.waidataTargetPC .el-table__fixed{
    pointer-events: none;
}
.waidataTargetPC_s{
    display: inline-block;
    margin: 10px;
}
.waidataTargetPC_s .el-input__inner{
    height: 30px !important;
}
</style>
