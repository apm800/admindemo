<template>
<div>
    <div class="SubTop" v-checkup="'order:operation:list'">
       <!-- 店铺名称 Start -->
        <div class="SubSousuo" >
          <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select filterable v-model="shopid_value" style="width: 150px" placeholder="请选择店铺名" @change='filter_shop(shopid_value)'>
                <el-option
                  v-for="item in shop_options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <!-- 店铺名称 Start -->

        <!-- 订单时间 Start-->
        <div class="SubSousuo">
          <span class="mustFill">*</span>
          <span>订单时间：</span>
          <el-select v-model="order_time_type"  style="width: 150px" placeholder="请选择订单时间" @change='select_order_time_type(order_time_type)'>
              <el-option
                v-for="item in order_time_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <!-- 订单时间 End-->

        <!-- 时间插件 S -->
        <div class="SubSousuo">
          <span class="mustFill">*</span>
          <el-date-picker  style="width: 240px" @change='filter_date(seleted_time)'
      
            v-model="seleted_time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!--时间插件 E-->
        <!-- 是否菜鸟 Start-->
        <div class="SubSousuo">
          <span>是否菜鸟：</span>
          <el-select v-model="collect_data.param.cainiao"  style="width: 150px" placeholder="请选择">
              <el-option
                v-for="item in orcainiaodata"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
          </el-select>
        </div>

        <!--仓库查询 S-->
        <div class="SubSousuo">
            <span>仓库名称：</span>
            <el-select v-model="warehouse_model" style="width: 150px" placeholder="请选择仓库" @change='fun_select_ware(warehouse_model)'>
                <el-option
                  v-for="item in warehouse_options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <!--仓库查询 E-->

        <!--订单类型 S-->
        <!-- <div class="SubSousuo">
            <span>订单类型：</span>
            <el-select v-model="select_order_type" style="width: 150px" placeholder="订单类型" @change='fun_order_type(select_order_type)'>
                <el-option
                  v-for="item in select_order_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div> -->
        <!--订单类型 E-->


        <!--对账情况-->
        <!--
        <div class="SubSousuo">
          <span>对账情况：</span>
          <el-select v-model="value_blance_account" style="width: 150px" placeholder="请选择对账情况" @change='fun_account_situation(value_blance_account)'>
              <el-option
                v-for="item in option_blance_account"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        -->

        <!--签收状态-->
        <!--
        <div class="SubSousuo">
            <span>签收状态：</span>
            <el-select v-model="sign_state" style="width: 100px" placeholder="签收状态" @change='fun_sign_state(sign_state)'>
                <el-option
                  v-for="item in sign_state_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        -->
        <!--关键字查询 -->
        <div class="SubSousuo">
          <span>查询字段：</span>
          <el-select v-model="keywordsearch" style="width: 150px" placeholder="查询字段" @change='fun_keywordsearch(keywordsearch)'>
              <el-option
                v-for="item in keywordsearch_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <!--搜索-->
        <div class="SubSousuo">
            <el-input style='max-width: 180px;' placeholder="输入关键字查询"  v-model="inputSearch" class="input-with-select">
              <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
            </el-input>
            
            <!--查询按钮-->
            <span style="margin: 20px 10px 0 20px">
                <el-button type="primary" @click="OrderSearch">查询</el-button>
            </span>
        </div>
        <!-- 
        <div class="SubSousuo">
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
        <div style="margin: 20px 10px 0 0" v-checkup="'order:operation:sumit'">
            <el-button size="mini" type="primary" @click="bookkeeping_registration">记账提交</el-button>
            <!-- <el-button size="mini" type="primary" @click="apply_for_supplement" v-checkup="':sys:menu:add'">申请补录</el-button> -->
<!-- <el-button size="mini" type="danger" @click="" v-checkup="':sys:menu:add'">删除</el-button> -->
        </div>
    </div>

    <div id="SubBut">
        <!--  -->
        <div id="SubButcontent">

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
                @row-click = 'modification'
                @selection-change="handleSelectionChange">
                    <!--选择器-->
                    <!--
                    <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
                    </el-table-column>
                     -->
                     <!--核销表头 Start-->
                    <el-table-column
                      prop= "out_tid"
                      label="外部订单编号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="tid"
                      label="系统订单编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="shop_name"
                      label="店铺名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="storage_id"
                      label="仓库"
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
                      prop="buyer_id"
                      label="买家id">
                    </el-table-column>
                    <el-table-column
                      prop="receiver_name"
                      label="收件人"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="receiver_mobile"
                      label="收货人电话"
                      width="110"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="收货人地址"
                      width="110"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="reference_price_paid"
                      label="实收金额"
                      width="110"
                      show-overflow-tooltip>
                    </el-table-column>
                    
                    

                    <!--
                    订单来源
                    买家留言
                    -->

                    <el-table-column
                      prop="type"
                      label="订单类型"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="order_from"
                      label="订单来源"
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
                      prop="delivery_time"
                      label="发货时间"
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
   

              </el-table>
            <!--分页 Start-->
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 50,100,500]"
                :page-size="PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
            <!--分页 End-->
 <!--详情S-->
            <el-table
                v-checkup="'order:operation:detail'"
                border
                ref=" "
                :data="tableData_detail"
                tooltip-effect="dark"
                style="width: 100%"
                @row-click = 'modification'>
                     <!--核销表头 Start-->
                    <el-table-column
                      prop= "out_tid"
                      label="外部订单编号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="Tid"
                      label="系统订单编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="pro_name"
                      label="品名"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="Specification"
                      label="规格"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="Barcode"
                      label="条形码"
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
                      prop="sell_price"
                      label="单价"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="Isgifts"
                      label="是否赠品"
                      show-overflow-tooltip>
                    </el-table-column> 
                    	                    
                    <el-table-column
                      prop="storage_id"
                      label="仓库"
                      show-overflow-tooltip>
                    </el-table-column> 
              </el-table>
            <!--详情E-->


        </div>



        <div id="SubButright" style="display: none"></div>
        <div id="SubButdiv1" style="display: none"></div>
        <div id="SubButbottom" style="display: none"></div>
    </div>



</div>
</template>

<script>
    export default {
        data() {
          return {
                // 是否是菜鸟
                orcainiaodata:[
                  {
                    value:1,
                    name:'是',
                  },
                  {
                    value:0,
                    name:'否',
                  }
                ],
                /** 字段 Start */
                "out_tid": "",//外部平台单号
                "tid": "",//系统订单编号
                "storage_id": "",//仓库
                "shopid": "",//店铺id
                "shop_name": "",//店铺
                "express": "",//快递
                "express_no": "",//快递单号
                "buyer_id": "",//买家id
                "receiver_mobile": "",
                "receiver_name": "",
                "province": "",
                "city": "",
                "district": "",
                "address": "",
                "reference_price_paid": "",
                "type": "",
                "tid_time": "",
                "pay_time": "",
                "delivery_time": "",
                "service_remarks": "",
                /** 字段 End */

                inputSearch:'',//输入查询的内容
                search_key_tmp:'',// 存储搜索的类型

                loading1:0,

                /**
                 * 分页参数
                 */
                //默认当前页码是第一页
                currentPage4: 1,
                //总数
                totalPage: 0,
                //默认 每页多少条
                PageSize:10,


                // 店铺名称
                shopid_value:'',
                shop_options: [],//店铺列表

                warehouse_model:'',//仓库
                warehouse_options:[],//仓库数据
                // 订单类型
                select_order_type:'',
                select_order_type_options: [ {
                    value: '1',
                    label: '销售订单'
                }, {
                    value: '2',
                    label: '手工订单'
                }, {
                    value: '3',
                    label: '补发订单'
                }, {
                    value: '4',
                    label: '换货订单'
                }, {
                    value: '5',
                    label: '退货订单'
                }],
                // 搜索关键字
                keywordsearch:'',
                keywordsearch_options: [{
                    value: '1',
                    label: '外部单号'
                }, {
                    value: '2',
                    label: '买家ID'
                }, {
                    value: '3',
                    label: '系统订单编号'
                }, {
                    value: '4',
                    label: '收件人'
                }, {
                    value: '5',
                    label: '收件人手机'
                }],
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
                },{
                    value: '4',
                    label: '签收时间'
                },],
                //对账情况
                value_blance_account:'',
                option_blance_account:[{
                    value: '0',
                    label: '未对账'
                },{
                    value: '1',
                    label: '已对账'         
                },],

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
                seleted_time:'',//选择时间
                value6: '',
                value7: '',
                tableData3:[],
                checkbox_ids:[],// 选中的table 的ids
                multipleSelection:'',//动态选中的数据
                // supplement_shop_id:[],//同意补录 选中的店铺id
                supplement_tid_ids:[],//tid
                  //记账数据
                collect_data:{
                  apiName:'getorderlist',
                  param:{
                      cainiao:'',//是否菜鸟
                      shopid:'',
                      storage_id:'',//仓库
                      begin_time:'',
                      end_time:'',
                      order_type:'',//订单类型
                      other_type:'',//1外部订单号 2买家id 3系统订单编号 4手机人 5收件人手机
                      key_world:'',
                      page:'',//分多少页`
                      pagesize:'10',//分页大小
                      action_type:'1', //  1 默认是已经登记的数据

                      action_type:'',//提交后设置成1
                      issend:'',   //提交后设置成1
                    }
                },
                //记账提交
                order_temp_data:{
                    apiName:'getorderlist',
                    param:{
                        // action_type:'2',//action_type 操作类型 1记账 2提交 3删除
                        // tids:'',//删除的订单标识 多个用逗号分隔 比：S1804250000073,S1804250003673   
                    }
                },
                //同意补录
                consentsupplement_data:{
                  apiName:'consentsupplement',
                    param:{
                        shopid:[],
          
                    }
                },
                tableData_detail:[],//详情数据
                //获取订单详情信息
                order_detail_data:{
                  apiName:'getorderdetail',
                    param:{
                        tid:'',//通过tid获取详情信息
          
                    }
                },
          }
             
        },
        methods: {
              onSubmit() {
              },
              aaa(a){
                this.$emit('aab',a)
              },
              /** 
               * 获取选中的行 
               * 获取数据的id 用于人工核销
               * 对已经核销的数据进行显示 用于提示  status（已对账 未对账）
               */
              handleSelectionChange(val) {
                this.multipleSelection = val;//动态选中的数据
                this.checkbox_ids = []
                this.supplement_tid_ids = []
                /*
                *这里面有详细的数据，之后点击显示详细信息用此信息 console.log('动态选中的数据的id',val)
                */ 
                for(var i=0;i<val.length;i++){
                  //数据id
                  // this.checkbox_ids.push(this.multipleSelection[i].id);
                  //tis  这里就是主键
                   this.supplement_tid_ids.push(this.multipleSelection[i].tid);
                }

              },
              // 分页方法        
              // handleSizeChange(val) {
              // },
              // handleCurrentChange(val) {
              // },
              //分页方法
              //每页多少条数据
              handleSizeChange(val) {
                this.PageSize = val;//将点击后的数据赋值到每页显示的数量
                this.collect_data.param.pagesize = this.PageSize;//每页的数据 添加到请求参数中
                this.requireData(this.currentPage4,this.PageSize);//获取数据
             },
              //第几页
              handleCurrentChange(val) {
                this.currentPage4 = val;
                this.collect_data.param.page = this.currentPage4;//当前页
                this.requireData(this.currentPage4,this.PageSize)
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
              //选择时间类型
              select_order_time_type(val){ 
                  if(val){
                    this.collect_data.param.date_type = val;
                  }
              },
              //选择店铺
              filter_shop(val){
                  if(val){
                    this.collect_data.param.shopid = val;
                  }
              },
              //选择仓库
              fun_select_ware(val){
                  if(val){
                    this.collect_data.param.storage_id = val;
                  }
              },
              //选择时间
              filter_date(time){ 
                if (time.length == 2){
                       this.collect_data.param.begin_time = time[0]; //开始时间
                       this.collect_data.param.end_time = time[1]; // 结束时间
                }
              },
              //对账状态
              fun_account_situation(status){
                if(status){
                  this.collect_data.param.status = status;//设置状态
                }
              },
              // 订单类型
              fun_order_type(type){
                if(type){
                  this.collect_data.param.order_type = type//设置订单类型 已对账 未对账
                }
              },

              //签收状态
              fun_sign_state(status){
                if(status){
                  this.collect_data.param.signtimestats = status;
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

              /** 
               * 查询按钮，点击进行查询
               */
              OrderSearch(){
                this.collect_data.param.pagesize = this.PageSize;
                var select_shop_id = this.collect_data.param.shopid; // 店铺id  
                /**
                 * 必须的筛选条件  店铺id 订单时间类型 开始时间 结束时间  
                 */

                var select_shop_name =this.shopid_value; // 店铺
                var select_time_type = this.order_time_type; //时间类型
                var select_real_time = this.seleted_time; // 选中的时间 (包含开始时间 结束时间)
                if (select_shop_name == ''){
                  var value = '店铺不能为空'
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

                //按照关键字进行查询 需要对不同的进行过滤
                if( select_shop_name && select_time_type && select_real_time){
                  if(this.search_key_tmp){
                    this.collect_data.param.key_world = this.inputSearch;//输入的字段
                    this.collect_data.param.other_type = this.search_key_tmp;//筛选的类型
                  }
                  this.requireData();//执行查询
                }  
              },

              /**
               * 查询所有的数据进行展示
               */
              requireData(){
                    this.loading1 = 1;
                    this.collect_data.param.action_type = '1'
                    this.axios.post('/dc-admin/gate/api',this.collect_data,{type:'payload'}
                    ).then(res =>{
                      
                      var json_data =  JSON.parse(res.data.data)  //解析数据  

                        // action_type:'',//提交后设置成1
                        // issend:'',   //提交后设置成1
                        //筛选的时候将这连个值清空
                        this.collect_data.param.action_type = ''
                        this.collect_data.param.issend = ''         
                        try{
                          var json_data =  JSON.parse(res.data.data)
                          // this.totalPage = json_data.result.data.length;//对列表长度赋值
                          this.tableData3 = json_data.data.result;
                          var data_length = this.tableData3.length; //获取数据的长度
                          this.totalPage = json_data.data.recordsNumber;//数据总数
                          //循环获取到的数据 将tid 添加到列表中用于查询
                          for(var i=0;i<data_length;i++){
                            this.supplement_tid_ids.push(this.tableData3[i].tid);//将筛选的页面的数据添加到列表中
                          }
                        }
                        catch(err){
                          this.tableData3 = '';
                          this.open_message('错误,数据无法解析')
                        }
                        this.loading1 = 0;
                    });
              },
                /** 
                 * 对选中的每一行进行 修改操作、
                 * 根据tid 获取详细的数据
                 */
                modification(val){
                  this.order_detail_data.param.tid = ''//每次先清空
                  this.order_detail_data.param.tid = val.tid;//进行参数的赋值
                  this.requireDetailData();//获取详细信息
                },

               /** 
                 * 根据tid获取详细的信息
                 */
                requireDetailData(){
                   this.axios.post('/dc-admin/gate/api',this.order_detail_data,{type:'payload'}
                    ).then(res =>{
                      var json_data =  JSON.parse(res.data.data)  //解析数据               
                        try{
                          // this.totalPage = json_data.result.data.length;//对列表长度赋值
                          this.tableData_detail = json_data.data;
                          // this.totalPage = json_data.data.recordsNumber;//数据总数
                        }
                        catch(err){
                          this.tableData_detail = '';
                          // this.open_message('错误,数据无法解析')
                        }
                    });
              },

                 /** 
                 * 对选中的每一行进行 修改操作、
                 * 根据tid 获取详细的数据
                 */
                modification(val){
                  this.order_detail_data.param.tid = ''//每次先清空
                  this.order_detail_data.param.tid = val.tid;//进行参数的赋值
                  this.requireDetailData();//获取详细信息
                },

              /**
               * 获取店铺的名称 
               */
              get_shop_list(){
                this.axios.get('/dc-admin/admin/shop/query',{tupe:'playload'}).then(res =>{
                  try{
                    this.shop_options =JSON.parse(res.data.list) 
                  }
                  catch(err){
                    this.open_message('错误,获取店铺数据错误')
                  }
                  
                })
              },
              /**
               * 获取仓库的名称 
               */
              get_ware_list(){
                this.axios.get('/dc-admin/admin/warehouse/query',{tupe:'playload'}).then(res =>{
                  try{
                        this.warehouse_options =JSON.parse(res.data.list) //
                      }
                      catch(err){
                        this.open_message('错误,获取店铺数据错误')
                  }                  
                })
              },
   
              /**
               *  记账提交  默认的action_type =1
               *  */
              bookkeeping_registration(){
                // this.order_temp_data.param.tids = this.supplement_tid_ids.join(',') //拼接字符串 tids 中间用逗号隔开

                //对筛选出的数据集 添加相应的字段
                this.order_temp_data.param = this.collect_data.param  //重新赋值
                this.order_temp_data.param.action_type = '1'
                this.order_temp_data.param.issend = '1'
                
                

                //登记记账请求
                this.axios.post('/dc-admin/gate/api',this.order_temp_data,{type:'payload'}).then(res =>{
                    var res_data = JSON.parse(res.data.data) 
                    try{
                       var res_data = JSON.parse(res.data.data) 
                        if(res_data.code == '1'){
                            this.open_message('提交成功')
                            //重新刷线之前需要将参数中的值清空   
                            this.collect_data.param.action_type = ''
                            this.collect_data.param.issend = ''    
                            this.requireData();//重新刷新
                        }else{
                          this.open_message('提交失败，参数错误')   
                        }
                    }
                    catch(err){                               
                      this.open_message('错误,数据无法解析')
                    }
                });
              },

              /** 
               * 申请补录
               */
              apply_for_supplement(){

              },

        },
        mounted() {
            this.$store.commit("changeSize",{wai:'SubBut',rightBottom:'SubButdiv1',right:'SubButright',bottom:'SubButbottom',content:'SubButcontent'});
            // this.requireData(this.currentPage4,this.PageSize);//进来就获取数据
            this.get_shop_list();//获取店铺数据
            this.get_ware_list();//获取仓库数据
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

        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .SubTop{
    display: inline-block;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .SubSousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
  .SubTitle{
    height: 40px;
    line-height: 40px;
  }
</style>
