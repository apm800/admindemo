<template>
<div>
    <div class="FoderTop">
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
      <el-collapse v-model="activeNames" @change="activeZuo">
        <el-collapse-item :title="activeCont" name="1">

        <div class="FoderSousuo">
            <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select filterable v-model="value1" placeholder="请选择店铺名" @change='shopFn'>
                <el-option
                  v-for="item in shopName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="FoderSousuo">
            <span>仓库名称：</span>
            <el-select v-model="value2" placeholder="请选择仓库名" @change='wareFn'>
                <el-option
                  v-for="item in options2"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <!--  -->
        <!-- <div class="FoderSousuo">
            <span>订单类型：</span>
            <el-select v-model="dataWa.param.type" placeholder="请选择订单类型" @change=''>
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div> -->
        <!--  -->
        <!-- <div class="FoderSousuo">
            <span>有无差异：</span>
            <el-select v-model="dataWa.param.orderstatus" placeholder="请选择" @change=''>
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div> -->
        <!-- 日期 -->
        <div class="FoderSousuo">
            <span class="mustFill">*</span>
          <el-select v-model="dataWa.param.datetype" placeholder="请选择订单时间" @change='datatypeChang'>
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>：
          <el-date-picker 
            @change='dateChang'
            v-model="value6"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <br>
        <!--  -->
        <div class="FoderSousuo">
          <el-select v-model="value4.value" placeholder="请选择" @change='value4Chang'>
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>            
        <el-input style='max-width: 300px;' placeholder="输入关键字查询" v-model="input21" class="input-with-select">
          <!-- <el-button slot="append" icon="el-icon-search" @click='onLine'></el-button> -->
        </el-input>
        <!--查询按钮-->
        <span style="margin: 20px 10px 0 20px" v-checkup="'order:sum:list'">
            <el-button  type="primary" @click="onLine">查询</el-button>
        </span>
        <div style="margin: 20px 10px 0 0">
            <el-button size="mini"  type="primary" @click="Dowdata" v-checkup="'order:sum:down'">下载签收时间</el-button>
            <el-button size="mini"  type="warning" @click="DaoChu" v-checkup="':sys:menu:add'">导出表格</el-button>
            <!-- <el-button size="mini" type="danger" @click="" v-checkup="':sys:menu:add'">删除</el-button> -->
        </div>
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
        </el-collapse-item>
      </el-collapse>
    </div>
    <div id="FoderBut">
        <!--  -->
        <div id="FoderButcontent">

                <el-table
                v-loading="loading1"
                element-loading-text="拼命加载订单汇总数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @row-click = 'modification'
                @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="店铺名称"
                      prop="shop_name"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="storage_id"
                      label="仓库名称"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="tid"
                      label="系统订单编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_tid"
                      label="外部订单编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--
                    <el-table-column
                      prop="sku"
                      label="条形码"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="品名"
                      show-overflow-tooltip>
                    </el-table-column>
                    -->
                    <el-table-column
                      prop="receiver_name"
                      label="收货人"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="receiver_mobile"
                      label="收货手机"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="express"
                      label="快递公司"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="express_no"
                      label="快递单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="tid_time"
                      label="订货时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="pay_time"
                      label="付款日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="delivery_time"
                      label="发货时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="province"
                      label="省"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="city"
                      label="市"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="district"
                      label="区"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="buyer_id"
                      label="买家id"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="buyer_message"
                      label="买家留言"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="service_remarks"
                      label="客服备注"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="signtime"
                      label="签收时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column
                      prop=""
                      label="签收状态"
                      show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column
                      prop="product_num"
                      label="发货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="order_totalfee"
                      label="发货金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="tmall_payment"
                      label="实收金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column
                      prop=""
                      label="支付宝金额"
                      show-overflow-tooltip>
                    </el-table-column> -->
                    <!-- <el-table-column
                      prop=""
                      label="对账情况"
                      show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column
                      prop="pro_totalfee"
                      label="产品成本单价（xx）元"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column
                      prop="address"
                      label="预收金额（xx）元"
                      show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column
                      prop="reference_price_paid"
                      label="成本金额(xx)元"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="inner_lable"
                      label="内部便签"
                      show-overflow-tooltip>
                    </el-table-column>
              </el-table>
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="dataWa.param.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCon">
            </el-pagination>
        </div>



        <div id="FoderButright" style="display: none"></div>
        <div id="FoderButdiv1" style="display: none"></div>
        <div id="FoderButbottom" style="display: block"></div>
    </div>
      <div>

                <el-table
                v-checkup="'order:sum:list'"
                

                border
                ref="multipleTable"
                :data="tableData2"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                    <!-- <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
                    </el-table-column> -->
                    <el-table-column
                      label="仓库编号"
                      prop="storage_id"
                      width="120">
                      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                    </el-table-column>
                    <el-table-column
                      prop="tid"
                      label="订单编号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="pro_detail_code"
                      label="产品明细编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="pro_name"
                      label="网店产品名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="specification"
                      label="规格"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="barcode"
                      label="条形码"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="combine_barcode"
                      label="套装条形码"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="iscancel"
                      label="是否取消"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="isscheduled"
                      label="是否预定"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="stock_situation"
                      label="产品缺货情况"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="isbook_pro"
                      label="是否预售产品"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="iscombination"
                      label="是否组合"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="isgifts"
                      label="是否赠品"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="gift_num"
                      label="赠品数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="book_storage"
                      label="预分配库存"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="pro_num"
                      label="订货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="send_num"
                      label="发货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="refund_num"
                      label="退货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="refund_renum"
                      label="退货到货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="inspection_num"
                      label="验货数量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="timeinventory"
                      label="当期库存"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="cost_price"
                      label="成本价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="sell_price"
                      label="销售单价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="average_price"
                      label="加权平均单价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="original_price"
                      label="原始价格"
                      show-overflow-tooltip>
                    </el-table-column> -->
                     <el-table-column
                      prop="sys_price	"
                      label="软件销售单价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="ferght"
                      label="运费"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="item_discountfee"
                      label="单品优惠金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="inspection_time"
                      label="验货日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="weight"
                      label="重量"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="shopid"
                      label="店铺编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_tid"
                      label="外部平台单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_proid"
                      label="外部平台产品id"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_prosku"
                      label="外部平台产品sku_id"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="proexplain"
                      label="产品简介"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="buyer_memo"
                      label="买家留言"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="seller_remark"
                      label="卖家备注"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="distributer"
                      label="配货员"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="distribut_time"
                      label="配货时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="second_barcode"
                      label="配货时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="product_no"
                      label="产品编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="brand_number"
                      label="品牌编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="brand_name"
                      label="品牌名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="discount_amount	"
                      label="打折金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="credit_amount	"
                      label="抵扣分摊金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="md5_encryption"
                      label="MD5加密值"
                      show-overflow-tooltip>
                    </el-table-column>
              </el-table>
            <!-- <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="dataWa.param.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCon">
            </el-pagination> -->
      </div>
</div>
</template>

<script>
    export default {
        data() {
          return {
                loading1:0,
                // 有无差异
                options6: [{
                    value: '0',
                    label: '无差异'
                }, {
                    value: '1',
                    label: '有差异'
                }],
                
                input21:'',
                // 默认展开操作选项
                activeNames: ['1'],
                activeCont:'折叠页面操作选项',
                // 店铺名称
                value1:'',
                shopName: [],
                // 仓库名称
                value2:'',
                options2: [],
                // 订单类型
                options3: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '销售订单',
                    label: '销售订单'
                }, {
                    value: '手工订单',
                    label: '手工订单'
                }, {
                    value: '补发订单',
                    label: '补发订单'
                }, {
                    value: '换货订单',
                    label: '换货订单'
                }, {
                    value: '退货订单',
                    label: '退货订单'
                }],
                // 外部单号
                value4:{
                    value: 'out_tid',
                    label: '外部单号'
                },
                options4: [{
                    value: 'out_tid',
                    label: '外部单号'
                }, {
                    value: 'buyer_id',
                    label: '买家ID'
                }, {
                    value: 'tid',
                    label: '系统订单编号'
                }, {
                    value: 'receiver_name',
                    label: '收件人'
                }, {
                    value: 'receiver_mobile',
                    label: '收件人手机'
                }],
                // 提交日期
                options5: [{
                    value: '1',
                    label: '订货时间'
                }, {
                    value: '2',
                    label: '发货时间'
                }, {
                    value: '3',
                    label: '付款时间'
                }, {
                    value: '4',
                    label: '提交时间'
                }, {
                    value: '5',
                    label: '签收时间'
                }, {
                    value: '6',
                    label: '对账时间'
                }],
                // 总条数
                pageCon:0,
                // 店铺名称
                value6:'',
                //分页
                currentPage4: 1,

                // 日期范围
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
                value7: '',

                tableData3: [],
                tableData2: [],
                // 发货订单汇总 
                dataWa:{
                  apiName:'orderColl',
                  param:{
                      datetype:'2',//时间类型
                      start_time:'',//开始时间
                      end_time:'',//结束时间
                      type:'',//订单类型
                      storage_id:'',//仓库编号
                      shopid:'',//店铺ID
                      // orderstatus:'',//差异
                      page:1,
                      pagesize:10,
                      tid:'',
                      out_tid:'',
                      buyer_id:'',
                      receiver_name:'',
                      receiver_mobile:'',
                  }
                },
                // 到处表格
                dataWa2:{
                  apiName:'exportsubmit',
                  param:{
                      datetype:'2',//时间类型
                      start_time:'',//开始时间
                      end_time:'',//结束时间
                      type:'',//订单类型
                      storage_id:'',//仓库编号
                      shopid:'',//店铺ID
                      // orderstatus:'',//差异
                      page:1,
                      pagesize:10,
                      tid:'',
                      out_tid:'',
                      buyer_id:'',
                      receiver_name:'',
                      receiver_mobile:'',
                  }
                },
                // 下载
                dataWa1:{
                  apiName:'getsigntime',
                  param:{
                      StartTime:'',
                      EndTime:'',
                      shopid:'',
                  }
                },
                // 查询子
                dataWaz:{
                  apiName:'orderchaxu',
                    param:{
                        tid:'',
                    }
                },
                dataDowload:{
                  apiName:'aliUpload',
                }
            }
        },
        methods: {
              // 分页方法        
              handleSizeChange(val) {
                this.dataWa.param.pagesize = val;
                this.dataWa2.param.pagesize = val;
                this.requireData()
              },
              handleCurrentChange(val) {
                this.dataWa.param.page = val;
                this.dataWa2.param.page = val;
                this.requireData()
              },
              //请求
              requireData(){
                // 获取页面数据
                this.loading1 = 1;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                  ).then(res =>{
                    var json_data = JSON.parse(res.data.data);
                    this.tableData3 = json_data.result.data;

                    this.pageCon = JSON.parse(res.data.data)
                    // // 总条数
                    this.pageCon = parseInt(this.pageCon.result.count)

                    this.loading1 = 0;
                });
              },
              //查询线上
              onLine(){
                var a = this.value4.value;
                this.dataWa.param[a] = this.input21;
                this.dataWa2.param[a] = this.input21;
                if(this.dataWa.param.shopid==''){
                    this.$message({
                        type: 'error',
                        message: '请选择查询店铺'
                    });
                }else if(this.dataWa.param.orderstatus==''){
                    this.$message({
                        type: 'error',
                        message: '请填选择有无差异'
                    });
                }else if(this.dataWa.param.datetype==''){
                    this.$message({
                        type: 'error',
                        message: '请填选择时间类型'
                    });
                }else if(this.dataWa.param.start_time=='' || this.dataWa.param.end_time==''){
                    this.$message({
                        type: 'error',
                        message: '请填写查询日期'
                    });
                }else{
                  this.requireData();
                  this.dataWa.param.pages=1;
                  this.dataWa.param.pages=2;
                }
              },
              //更改搜索条件的字段清空之前的搜索条件
              value4Chang(a){
                this.dataWa.param.tid = 
                this.dataWa.param.out_tid =
                this.dataWa.param.buyer_id = 
                this.dataWa.param.receiver_mobile = 
                this.dataWa.param.receiver_name = '';
                this.dataWa2.param.tid = 
                this.dataWa2.param.out_tid =
                this.dataWa2.param.buyer_id = 
                this.dataWa2.param.receiver_mobile = 
                this.dataWa2.param.receiver_name = '';
              },
              // 改变时间类型
              datatypeChang(data){
                  // this.dataWa1.param.datetype = data;
                  this.dataWa2.param.datetype = data;
              },
              // 修改时间
              dateChang(data){
                this.dataWa.param.start_time = data[0];
                this.dataWa.param.end_time = data[1];
                // 下载流水的参数
                this.dataWa1.param.StartTime = data[0];
                this.dataWa1.param.EndTime = data[1];
                // 导入
                this.dataWa2.param.start_time = data[0];
                this.dataWa2.param.end_time = data[1];
              },
              //选择仓库
              wareFn(data){
                this.dataWa.param.storage_id = data;
                this.dataWa1.param.storage_id = data;
                this.dataWa2.param.storage_id = data;
              },
              //选择店铺
              shopFn(data){
                this.dataWa.param.shopid = data;
                this.dataWa1.param.shopid = data;
                this.dataWa2.param.shopid = data;
              },
              onSubmit() {
              },
              aaa(a){
                this.$emit('aab',a)
              },
              handleSelectionChange(val) {
                this.multipleSelection = val;
              },
              // 表格方法
              toggleSelection(rows) {
                if (rows) {
                  rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                  });
                } else {
                  this.$refs.multipleTable.clearSelection();
                }
              },
              // 收起页面查询条件
              activeZuo(val){
                  if(val.length==0){
                    this.activeCont='展开页面操作选项'
                  }else if(val.length==1){
                    this.activeCont='折叠页面操作选项'
                  }
              },
              //下载
              Dowdata(){
                if(this.dataWa1.param.shopid==''){
                    this.$message({
                        type: 'error',
                        message: '请选择店铺'
                    });
                    return;
                }else if(this.dataWa1.param.StartTime=='' || this.dataWa1.param.EndTime==''){
                    this.$message({
                        type: 'error',
                        message: '请填写下载日期'
                    });
                    return;
                }
                this.dataWa1.param.b = 1;

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa1,
                {type: 'payload'}
                  ).then(res =>{
                    var a = JSON.parse(res.data.data);
                    try{
                      if(a.code=='正在有下载数据'){
                          this.$message({
                              type: 'error',
                              message: a.code+'，请您稍后再试！',
                          });
                      }else if(a.code=='成功'){
                          this.$message({
                              type: 'success',
                              message: '数据库下载成功',
                          });
                      }
                    }
                    catch(err){

                    }
                });
              },
              DaoChu(){
                
                if(this.dataWa2.param.shopid==''){
                    this.$message({
                        type: 'error',
                        message: '请选择查询店铺'
                    });
                    return;
                }else if(this.dataWa2.param.datetype==''){
                    this.$message({
                        type: 'error',
                        message: '请填选择时间类型'
                    });
                    return;
                }else if(this.dataWa2.param.start_time=='' || this.dataWa2.param.end_time==''){
                    this.$message({
                        type: 'error',
                        message: '请填写查询日期'
                    });
                    return;
                }    
// var formData = new FormData();
// for (var i = 0; i < e.target.files.length; i++) {
//     var file = e.target.files[i];
//     formData.append(""+i+"",file);
// }
// formData.append('stype',0);
// let config = {
//     headers: {
//     'Content-Type': 'multipart/form-data'
//     },
//     type:'payload',
// }
// this.axios.post(this.url,formData,config).then(res=>{
//     this.$message({
//         type: 'success',
//         message: res.data.code
//     });
// })
var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Resource/exportsubmit";  
var form = $("<form>");   //定义一个form表单  
form.attr('style','display:none');   //在form表单中添加查询参数  
form.attr('target','');  
form.attr('method','post');  
form.attr('action',downloadURL);  
                      
var input1 = $('<input>');   
input1.attr('type','hidden');   
input1.attr('name','datetype');   
input1.attr('value',this.dataWa2.param.datetype);   //时间类型
                      
var input2 = $('<input>');   
input2.attr('type','hidden');   
input2.attr('name','shopid');   
input2.attr('value',this.dataWa2.param.shopid);    //店铺id
                      
var input3 = $('<input>');   
input3.attr('type','hidden');   
input3.attr('name','start_time');   
input3.attr('value',this.dataWa2.param.start_time);  //开始时间

var input4 = $('<input>');   
input4.attr('type','hidden');   
input4.attr('name','end_time');   //结束时间
input4.attr('value',this.dataWa2.param.end_time);   

var input5 = $('<input>');   
input5.attr('type','hidden');   
input5.attr('name','type');   //订单类型
input5.attr('value',this.dataWa2.param.type); 

var input5 = $('<input>');   
input5.attr('type','hidden');   
input5.attr('name','orderstatus');   //对账情况
input5.attr('value',this.dataWa2.param.orderstatus); 

var input6 = $('<input>');   
input6.attr('type','hidden');   
input6.attr('name','storage_id');   //仓库编号
input6.attr('value',this.dataWa2.param.storage_id);    

var input7 = $('<input>');   
input7.attr('type','hidden');   
input7.attr('name','receiver_mobile');   //收货人电话
input7.attr('value',this.dataWa2.param.receiver_mobile);    

var input8 = $('<input>');   
input8.attr('type','hidden');   
input8.attr('name','receiver_name');   //收货人
input8.attr('value',this.dataWa2.param.receiver_name);    

var input9 = $('<input>');   
input9.attr('type','hidden');   
input9.attr('name','buyer_id');   //买家id
input9.attr('value',this.dataWa2.param.buyer_id);   

var input10 = $('<input>');   
input10.attr('type','hidden');   
input10.attr('name','out_tid');   //外部单号
input10.attr('value',this.dataWa2.param.out_tid);

var input11 = $('<input>');   
input11.attr('type','hidden');   
input11.attr('name','tid');   //系统单号
input11.attr('value',this.dataWa2.param.tid);    
  
$('body').append(form);  //将表单放置在web中  
form.append(input1);   //将查询参数控件提交到表单上  
form.append(input2);   //将查询参数控件提交到表单上  
form.append(input3);   //将查询参数控件提交到表单上  
form.append(input4);   //将查询参数控件提交到表单上  
form.append(input5);   //将查询参数控件提交到表单上  
form.append(input6);   //将查询参数控件提交到表单上  
form.append(input7);   //将查询参数控件提交到表单上  
form.append(input8);   //将查询参数控件提交到表单上  
form.append(input9);   //将查询参数控件提交到表单上  
form.append(input10);   //将查询参数控件提交到表单上  
form.append(input11);   //将查询参数控件提交到表单上  
form.submit();   //表单提交  

                // this.axios.post('http://'+this.$store.state.xianshang+':8021/home/Resource/exportsubmit', 
                // this.dataWa2,
                // {type: 'payload'}
                //   ).then(res =>{
                //     // var a = JSON.parse(res.data.data);

                //    
                //     var blob = new Blob([res.data.data],{type:"text/plain"})
                //     var b = document.createElement('a');
                //     b.download = 'data.xls';
                //     b.href=window.URL.createObjectURL(blob)
                //     b.click()
                  
                //     // try{
                //     //   if(a.code=='正在有下载数据'){
                //     //       this.$message({
                //     //           type: 'error',
                //     //           message: a.code+'，请您稍后再试！',
                //     //       });
                //     //   }else if(a.code=='成功'){
                //     //       this.$message({
                //     //           type: 'success',
                //     //           message: '数据库下载成功',
                //     //       });
                //     //   }
                //     // }
                //     // catch(err){

                //     // }
                // });
              },
              modification(val){
                this.dataWaz.param.tid=val.tid;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWaz,
                {type: 'payload'}
                  ).then(res =>{
                    var json_data = JSON.parse(res.data.data);
                    this.tableData2 = json_data.result.data;

                    // this.pageCon = JSON.parse(res.data.data)
                    // // 总条数
                    // this.pageCon = parseInt(this.pageCon.result.count)
                });
              },
        },
        mounted() {
          // 请求店铺信息
            this.axios.post('/dc-admin/admin/shop/query/',
            {type: 'payload'}
              ).then(res =>{
                this.shopName = JSON.parse(res.data.list);
            });
          // 请求仓库信息
            this.axios.post('/dc-admin/admin/warehouse/query/',
            {type: 'payload'}
              ).then(res =>{
                this.options2 = JSON.parse(res.data.list);
            });

            this.$store.commit("changeSize",{wai:'FoderBut',rightBottom:'FoderButdiv1',right:'FoderButright',bottom:'FoderButbottom',content:'FoderButcontent'});

            // 设置默认时间从上月21-当月20
            var date=new Date;
            var month=date.getMonth();
            var month1=month+1;
            var year=date.getFullYear();
            var year1=date.getFullYear();
            if (month<=9){
              month = '0'+month;
            }
            if (month1<=9){
              month1 = '0'+month1;
            }else if(month1==13){
              month1 = '01';
              year1=year+1;
            }
            this.value6 = [year+'-'+month+'-21 00:00:00',year1+'-'+month1+'-21 00:00:00']
            this.dateChang(this.value6);
            this.datatypeChang(2);
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .FoderTop{
    display: inline-block;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .FoderSousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
  .FoderTitle{
    height: 40px;
    line-height: 40px;
  }
</style>
