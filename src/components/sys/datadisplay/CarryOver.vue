<template>
<div>
    <div class="CollectTop">
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
      <el-collapse v-model="activeNames" @change="activeZuo">
        <el-collapse-item :title="activeCont" name="1">
        <div class="CollectSousuo" >
          <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select v-model="shopid_value" style="width: 150px" placeholder="请选择店铺名" @change='filter_shop(shopid_value)'>
                <el-option
                  v-for="item in shop_options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <!-- 订单时间 -->
        <!--订货日期‘1’，发货日期‘2’，付款日期，‘3’，提交时间‘4’，签收时间‘5’，对账时间‘6’-->
        <div class="CollectSousuo">
          <span class="mustFill">*</span>
          <span>订单时间：</span>
          <el-select v-model="order_time_type" placeholder="请选择订单时间" @change='select_order_time_type(order_time_type)'>
              <el-option
                v-for="item in order_time_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>

      

        <!-- 日期 -->
        <div class="CollectSousuo">
          <span class="mustFill">*</span>
          <el-date-picker  style="width: 250px" @change='filter_date(seleted_time)'
            v-model="seleted_time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!--
          <el-date-picker
            v-model="seleted_time"  style="width: 250px" @change='filter_date(seleted_time)'
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          -->
        </div>
		<!--批次-->
        <span>批次:</span>
        <div class="CollectSousuo">
          <el-input style='max-width: 200px;' placeholder="批次查询"  v-model="inputSearchBatch" class="input-with-select" @change='inputSearchBatchs(inputSearchBatch)'>
          </el-input>         
        </div>
   
        <!--搜索-->
        <div class="CollectSousuo">
          <el-input style='max-width: 200px;' placeholder="输入关键字查询"  v-model="inputSearch" class="input-with-select">
            <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
          </el-input>
         
        </div>
        <!--查询按钮-->
        <span style="margin: 0px 10px 0 20px" v-checkup="'order:check:list'">
              <el-button type="primary" @click="OrderSearch">查询</el-button>
        </span>
        <!--查询按钮-->
        <!-- 
        <div class="CollectSousuo">
            <span>仓库名称：</span>
            <el-select v-model="value2" placeholder="请选择仓库名" @change='aaa()'>
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        -->
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
        </el-collapse-item>
      </el-collapse>
          <div v-if="zongshu.result">
                <span style="font-weight:900;">总数：</span>{{zongshu.result.count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-weight:900;">支付宝总金额：￥</span>{{zongshu.result.payment[0].sumincome}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!--
                <span style="font-weight:900;">天猫总金额：￥</span>{{zongshu.result.payment[0].sumtmall}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                -->
          </div>
    </div>
	
    <div id="CollectBut">
        <!--  -->
        <div id="CollectButcontent">
                <el-table
                v-loading="loading1"
                element-loading-text="拼命加载订单数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"


                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="600"
                @selection-change="handleSelectionChange"
                @size-change="handleSizeChange">
                    <!--选择器-->
                    <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
                    </el-table-column>
                     <!--核销表头 Start-->
                    <el-table-column
                      prop="shop_name"
                      label="店铺名称">
                      <!--
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                      -->
                    </el-table-column>
                    <el-table-column
                      prop="storage_id"
                      label="仓库">
                    </el-table-column>
                    <el-table-column
                      prop="tid"
                      label="系统订单编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="out_tid"
                      label="外部订单编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="barcode"
                      label="条形码"
                      show-overflow-tooltip>
                    </el-table-column>                   
                    <el-table-column
                      prop="brand_name"
                      label="品名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="receiver_name"
                      label="收货人"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="receiver_mobile"
                      label="收货人手机"
                      width="110"
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
                      label="订货日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="pay_time"
                      label="付款日期"
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
                    <!--
                    <el-table-column
                      prop="signtimestats"
                      label="签收状态"
                      show-overflow-tooltip>
                    </el-table-column>
                    -->
                    <el-table-column
                      prop="signtime"
                      label="签收时间"
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
                      prop="send_num"
                      label="发货数量"
                      show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                      prop="delivery_time"
                      label="发货时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--计算：订单明细的产品成交单价*数量  单价是sell_price  数量是send_num-->
                    <el-table-column
                      prop="send_money"
                      label="发货金额"
                      :formatter="formatter_count_act"
                      show-overflow-tooltip>
                    </el-table-column>                   
                    <!--实收金额==天猫金额）-->
                    <el-table-column
                      prop="tmall_payment"
                      label="实收金额"
                      :formatter="actual_tmall"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--对账情况 原先是status 现在是ishandler-->
                    <!--页面删除-->


                    <!--
                    <el-table-column
                      prop="income"
                      label="支付宝金额"
                      show-overflow-tooltip
                      width="100">
                    </el-table-column>
                    -->
                    <!--
                    <el-table-column
                      prop="total_support"
                      label="线下收入"
                      show-overflow-tooltip>
                    </el-table-column>
                    -->
                    <el-table-column
                      prop="income"
                      label="支付宝收入"
                      width="100"
                      :formatter="ali_income"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--本期不做
                    <el-table-column
                      prop="alipay_tui"
                      label="支付宝退款"
                      show-overflow-tooltip>
                    </el-table-column>
                    -->
                    <!--计算 支付宝收入-实收金额-->
                    <el-table-column
                      prop="income_difference"
                      label="收入差异"
                      :formatter="count_income_diff"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--支付宝收入-发货金额-->
                    <el-table-column
                      prop="imount_in_advance"
                      label="预收金额"
                      :formatter="formatter_pre_income"
                      show-overflow-tooltip>
                    </el-table-column>

                    <!--差异类型-->
                    <el-table-column
                      prop="difference"
                      label="差异类型"
                      :formatter="format_difference"
                      show-overflow-tooltip>
                    </el-table-column>

                    <!--订单类型 order_check_status-->
                    <el-table-column
                      prop='order_check_status'
                      label="订单类型"
                      :formatter="formatterOrderStatus"
                      show-overflow-tooltip>
                    </el-table-column>


                    <!--先不做
                    <el-table-column
                      prop="address"
                      label="收款月份"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="签收收入月份"
                      show-overflow-tooltip>
                    </el-table-column>
                    
                    <el-table-column
                      prop="address"
                      label="产品成本单价"
                      show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                      prop="address"
                      label="成本单价"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="成本金额"
                      show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column
                      prop="address"
                      label="签收数据成本月份"
                      show-overflow-tooltip>
                    </el-table-column>
                    -->
                    <el-table-column
                      prop="inner_lable"
                      label="内部便签"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--核销表头 End-->
              </el-table>
            <!-- <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination> -->

            <!--分页 Start-->
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
            <!--分页 End-->
        </div>



        <div id="CollectButright" style="display: none"></div>
        <div id="CollectButdiv1" style="display: none"></div>
        <div id="CollectButbottom" style="display: none"></div>
    </div>



</div>
</template>

<script>
    export default {
        data() {
          return {
                loading1:0,
                /*字段  Start*/
                shop_name : '',
                storage_id : '',
                tid : '',
                out_tid : '',
                barcode : '',
                brand_name : '',
                receiver_name : '',
                receiver_mobile : '',
                express : '',
                express_no : '',
                tid_time : '',
                pay_time : '',
                province : '',
                city : '',
                district : '',
                signtimestats : '',
                signtime : '',
                buyer_id : '',
                buyer_message : '',
                service_remarks : '',
                send_num : '',//数量
                delivery_time : '',//发货时间
                // delivery_value : '',
                tmall_payment:'',//实收金额()
                payment : '',
                // status : '',//原来的对账情况
                ishandler:'',//现在的对账情况 默认都是已对账的\
                account_balance : '',
                total_support : '',
                account_balance : '',
                income_difference : '',
                imount_in_advance : '',
                inner_lable : '',
                invoice_value :'',//发货金额
                sell_price :'',//单价
                difference :'',//差异类型 有差异 无差异
                send_money :'',//发货金额 计算
                order_check_status :'',//订单类型 
                /*字段  End*/
				batch_no:'',//批次
                // value:'',
                // options:[],
                inputSearch:'',//输入查询的内容
                search_key_tmp:'',// 存储搜索的类型

                //分页
                currentPage4: 1,
                totalPage: 0,
                // 每页多少条
                PageSize:10,

                // 店铺名称
                shopid_value:'',
                shop_options: [],//店铺列表
 	 			inputSearchBatch:'',
                // 提交日期
                order_time_type:'发货时间',
                // 选项1  订货日期‘1’，发货日期‘2’，付款日期，‘3’，提交时间‘4’，签收时间‘5’，对账时间‘6’
                order_time_options: [{
                    value: '1',
                    label: '订货时间'
                }, {
                    value: '2',
                    label: '发货时间'
                }, {
                    value: '3',
                    label: '付款日期'
                }, {
                    value: '4',
                    label: '提交时间'
                },{
                    value: '5',
                    label: '签收时间'
                },{
                    value: '6',
                    label: '对账时间'
                },],
                //对账情况
                value_blance_account:'已对账',
                option_blance_account:[{
                    value: '0',
                    label: '未对账'
                },{
                    value: '1',
                    label: '已对账'         
                },
                ],

                // 签收状态
                sign_state:'',
                // 选项1
                sign_state_options: [ {
                    value: '1',
                    label: '已签收'
                }, {
                    value: '0',
                    label: '未签收'
                },],
                

                //分页
                // currentPage4: 1,

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
                // 默认展开操作选项
                activeNames: ['1'],
                activeCont:'折叠页面操作选项',
                seleted_time:'',//选择时间
                value6: '',
                value7: '',
                tableData3:[],
                data_length:'',//数组的长度
                checkbox_ids:[],// 选中的table 的ids
                multipleSelection:'',//动态选中的数据
                supplement_shop_id:[],//同意补录 选中的店铺id
                  //核销数据
                collect_data:{
                  apiName:'CarryOder',
                  param:{
                      datetype:'1',
                      shopid:'1',
                      // start_time:'2018-01-01 00:00:00',
                      batch_no:'',
                      start_time:'',
                      end_time:'',
                      page:'1',
                      pagesize:'10',
                    }

                },
                // 查询统计
                zongshu:'',

                
          }
             
        },
        methods: {
              onSubmit() {
              },
              aaa(a){
                this.$emit('aab',a)
              },
              //数组去重
              uniq(array){
                  var temp = []; //一个新的临时数组
                  for(var i = 0; i < array.length; i++){
                      if(temp.indexOf(array[i]) == -1){
                          temp.push(array[i]);
                      }
                  }
                  return temp;
              },
              /** 
               * 获取选中的行 
               * 获取数据的id 用于人工核销
               * 对已经核销的数据进行显示 用于提示  status（已对账 未对账）
               */
              handleSelectionChange(val) {
                this.multipleSelection = val;//动态选中的数据
                this.checkbox_ids = []
                for(var i=0;i<val.length;i++){
                  //人工核销数据id
                  this.checkbox_ids.push(this.multipleSelection[i].tid); //   tid + 去重
                  this.checkbox_ids = this.uniq(this.checkbox_ids);//去重后重新赋值  
                  
                  // this.checkbox_ids =  this.checkbox_ids.prototype.delRepeat; //去重
                  //同意补录数据shopid
                   this.supplement_shop_id.push(this.multipleSelection[i].shopid);
                }

              },
              // 分页方法        
              // handleSizeChange(val) {
              // },
              // handleCurrentChange(val) {
              // },

              // 分页方法        
              handleSizeChange(val) {
                this.PageSize = val;
                 this.collect_data.param.page = this.currentPage4;//页码
                this.collect_data.param.pagesize = this.PageSize;//条数
                this.requireData(this.currentPage4,this.PageSize)
              },
              handleCurrentChange(val) {
                //打印参数 当前页
                this.currentPage4 = val;
                this.collect_data.param.page = this.currentPage4;//页码
                this.collect_data.param.pagesize = this.PageSize;//条数
                this.requireData(this.currentPage4,this.PageSize)
              },
              //选择时间类型
              select_order_time_type(val){ 
                  if(val){
                    this.collect_data.param.datetype = val;
                  }
              },
              //选择店铺
              filter_shop(val){
                  if(val){
                    this.collect_data.param.shopid = val;
                  }
              },
              //选择时间
              filter_date(time){ 
                if (time.length == 2){
                       this.collect_data.param.start_time = time[0]; //开始时间
                       this.collect_data.param.end_time = time[1]; // 结束时间
                       
                }
              },
              //批次号
              inputSearchBatchs(val){
              	if(val){
                    this.collect_data.param.batch_no = val; //批次              		
              		
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
              //获取选中的字段类型进行存储
              fun_keywordsearch(key){
                this.search_key_tmp = key;//将选中的类型进行存储
              },
              //消息
              //带有偏移量的的消息通知
              open_message(value,offset) {
                this.$notify({
                  title: '通知',
                  message: value,
                  offset: offset
                });
              },
              Trim(str)
              { 
                return str.replace(/(^\s*)|(\s*$)/g, ""); 
              },
              //在中间显示的消息
              open_message_middle(title,content) {
                this.$alert(content, title, {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
              },
              //查询按钮，点击进行查询
              OrderSearch(){
                var select_shop_id =this.shopid_value; // 店铺id
                var select_time_type = this.order_time_type; //时间类型
                var select_real_time = this.seleted_time; // 选中的时间 (包含开始时间 结束时间)
                if (select_shop_id == ''){
                  var value = '店铺id不能为空'
                  this.open_message(value,60);
                }
                if(select_time_type == ''){
                  var value = '订单时间类型不能为空'
                  this.open_message(value,120);
                }
                if(select_real_time == ''){
                  var value = '开始时间 结束时间不能为空'
                  this.open_message(value,180);
                }

                /**
                 * 必须的筛选条件  店铺id 订单时间类型 开始时间 结束时间  页码 条数
                 */
                // this.collect_data.param.page = this.currentPage4;//页码
                // this.collect_data.param.pagesize = this.PageSize;//条数
                if(select_shop_id && select_time_type && select_real_time){
                  
                  //按照关键字进行查询 需要对不同的进行过滤
                  if(this.search_key_tmp){
                  	
                  }
                  this.requireData();//
                  // this.count_act();
                }
              },

              //查询所有的数据进行展示
              requireData(){
              	console.log(this.collect_data)
                  this.loading1 = 1;
                  this.axios.post('/dc-admin/gate/api',this.collect_data,{type:'payload'}
                   ).then(res =>{
                      var json_data =  JSON.parse(res.data.data)  //解析数据  
                      this.zongshu = json_data;
                      
                      try{
                        var re = /([0-9]+\.[0-9]{2})[0-9]*/;
                        this.zongshu.result.payment[0].sumincome = this.zongshu.result.payment[0].sumincome.replace(re,"$1");
                        // this.zongshu.result.payment[0].sumtmall = this.zongshu.result.payment[0].sumtmall.replace(re,"$1");
                      }catch(err){

                      }
                      
                      // this.totalPage = json_data.result.data.length;//对列表长度赋值
                      // this.totalPage = ;
                        this.data_length = parseInt(json_data.result.data.length)
                        try{
                          this.tableData3 = json_data.result.data;

                          this.totalPage =parseInt(json_data.result.count);
                          // this.count_act();
                          
                        }
                        catch(err){
                          this.tableData3 = '';
                          this.open_message('错误,数据无法解析')
                        }
                        this.loading1 = 0;
                        // 总页数
                        // this.totalPage=res.data.page.totalCount;
                        //当前页数
                        // this.currentPage4 = res.data.page.currPage;
                    });
              },
              /**
               * 获取店铺的名称 
               */
              get_shop_list(){
                this.axios.get('/dc-admin/admin/shop/query',{tupe:'playload'}).then(res =>{
                  this.shop_options =JSON.parse(res.data.list) 
                })
              },


              //计算销售金额
               formatter_count_act(row){
                    //初始化的时候数据为空，使用对象点的方法会报错
                    try{
                      //发货金额：销售单价 * 数量
                      row.send_money = parseFloat(row.sell_price) *  parseFloat(row.send_num)
                      return row.send_money
                    }catch(err){

                    }
               },
              //收入差异:支付宝收入-实收金额
              count_income_diff(row){
                  try{
                      if(row.income == ''){
                        row.income = 0
                        // return row.income -  (parseFloat(row.sell_price) *  parseFloat(row.send_num))
                      }
                      return row.income -  parseFloat(row.tmall_payment)
                      
                    }catch(err){

                    }
              }, 

              //实收金额 == 天猫金额
              actual_tmall(row){
                 try{
                      if(row.tmall_payment == ''){
                        row.tmall_payment = 0
                      }
                      return row.tmall_payment
                    }catch(err){

                    }
              },


              //预收金额  支付宝收入-发货金额
              formatter_pre_income(row){
                  try{
                    if(row.income == ''){
                      row.income = 0
                    }
                    return row.income - (parseFloat(row.sell_price) *  parseFloat(row.send_num))
                    
                  }catch(err){

                  }
              },

              //支付宝收入
              ali_income(row){
                  try{
                    if (row.income == ''){
                      row.income = 0
                    }
                    return row.income
                  }catch(err){

                  }
              },

              //格式化对账情况
              formatter_ishandle(row){
                  try{
                    if(row.ishandler == '1'){
                      row.ishandler = '已对账'
                    }
                    return row.ishandler

                    }catch(err){
                    }
              },

              //格式化 差异类型
              format_difference(row){

                  try{
                      if(row.difference == '1'){
                       row.difference = '有差异'
                      }else if(row.difference == '2'){
                       row.difference = '无差异'
                      }
                      return row.difference
                      
                    }catch(err){
                    }
              },

              //格式化 订单类型        
              formatterOrderStatus(row,column){
                  if (row.order_check_status=='1'){
                         row.order_check_status = '正常订单'
                      }else if (row.order_check_status=='2'){
                        row.order_check_status = '手工订单'
                      }else if (row.order_check_status=='3'){
                        row.order_check_status = '赠品订单'
                      }else if (row.order_check_status=='0'){
                         row.order_check_status = '全部'
                      }
                      return row.order_check_status
              },

              //设置对账情况为 默认已对账
              //默认发货时间 
              set_default(){
                // this.value_blance_account = this.option_blance_account[1].label;//默认的选择框 对账情况
                this.order_time_type = this.order_time_options[1].label
                this.collect_data.param.datetype = '2'
                // order_time_options
                //根据月份设置默认时间，example 6月 ->5月21-6月21
                // ['2018-05-04 00:00:00','2018-05-05 00:00:00']
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
                this.seleted_time = [year+'-'+month+'-21 00:00:00',year1+'-'+month1+'-21 00:00:00']
                this.filter_date(this.seleted_time);
                // 默认订单时间类型
                this.select_order_time_type(2);
              }


        },
        computed:{
          //计算实收金额
          // count_act(){
          // }
        },
        mounted() {
            this.$store.commit("changeSize",{wai:'CollectBut',rightBottom:'CollectButdiv1',right:'CollectButright',bottom:'CollectButbottom',content:'CollectButcontent'});
            
            // this.requireData(this.currentPage4,this.PageSize);
            this.get_shop_list();
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
            this.seleted_time = [year+'-'+month+'-21 00:00:00',year1+'-'+month1+'-21 00:00:00']
            this.filter_date(this.seleted_time);
            this.select_order_time_type(2);

            this.set_default();
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .CollectTop{
    display: inline-block;
    // padding-bottom: 20px;
    // margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .CollectSousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
  .CollectTitle{
    height: 40px;
    line-height: 40px;
  }
</style>
