<template>
<div>
    <div class="IncomeShow">
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
      <el-collapse v-model="activeNames" @change="activeZuo">
        <el-collapse-item :title="activeCont" name="1">
        <!--时间类型-->
        <div class="CollectSousuo">
            <span>时间类型:</span>
            <el-select v-model="select_time_type" style="width: 150px" placeholder="请选择订单类型" @change='fun_order_time_type(select_time_type)'>
                <el-option
                    v-for="item in select_time_type_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>

        <!-- 日期 -->
        <div class="CollectSousuo">
          <span class="mustFill">*</span>
          <el-date-picker  style="width: 360px" @change='filter_date(seleted_time)'
            v-model="seleted_time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

        </div>


        <!--店铺名称-->
        <div class="CollectSousuo" >
          <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select v-model="shopid_value" style="width: 145px" placeholder="请选择店铺名" @change='filter_shop(shopid_value)'>
                <el-option
                  v-for="item in shop_options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
 
    
        <!--批次-->
        <span>批次:</span>
        <div class="CollectSousuo">
          <el-input style='max-width: 200px;' placeholder="批次查询"  v-model="inputSearchBatch" class="input-with-select">
          </el-input>         
        </div>
        
        <!--收发存汇总单号-->
        <span>收发存汇总单号:</span>
        <div class="CollectSousuo">
            <el-input style='max-width: 200px;' placeholder="收发存汇总单号"  v-model="inputSearchAll" class="input-with-select">
            </el-input>         
        </div>
        <!--查询按钮-->
        <span style="margin: 0px 10px 0 20px" v-checkup="'order:check:list'">
              <el-button type="primary" @click="OrderSearch">查询</el-button>
        </span>
        <!--查询按钮E-->

        <!--查询详情按钮S-->
        <span style="margin: 0px 10px 0 20px">
              <el-button type="primary" @click="OrderSearchDetail">查询详情</el-button>
        </span>
        <!--查询详情按钮E-->
		<!--导出-->
		<span style="margin: 0px 10px 0 20px">
              <el-button type="primary" @click="handleExport">导出明细</el-button>
              <el-button type="primary" @click="handleExportsum">导出汇总</el-button>
        </span>
		<!--导出-->
        <!--条件按钮 S-->
        <!--<div class="el-buttonsp"  style="margin: 20px 10px -10px 0">
        	<el-badge :value="bubble.qitaa" class="item">
			 <el-button type="text"  @click="handleClick('allTag')">全部</el-button>
			</el-badge>
			<el-badge :value="bubble.caigou==null?'0':bubble.caigou" class="item">
			 <el-button type="text"  @click="handleClick('purchaseTag')">采购入库</el-button>
			</el-badge>
			<el-badge :value="bubble.zhengchang==null?'0':bubble.zhengchang" class="item">
			 <el-button type="text"  @click="handleClick('normalTag')">正常入库</el-button>
			</el-badge>
			<el-badge :value="bubble.diaobo==null?'0':bubble.diaobo" class="item">
			 <el-button type="text"  @click="handleClick('allocationTag')">调拨入库</el-button>
			</el-badge>
			<el-badge :value="bubble.tuihou==null?'0':bubble.tuihou" class="item">
			 <el-button type="text"  @click="handleClick('returnTag')">退货入库</el-button>
			</el-badge>
			<el-badge :value="bubble.panying==null?'0':bubble.panying" class="item">
			 <el-button type="text"  @click="handleClick('profitTag')">盘盈入库</el-button>
			</el-badge>
			<el-badge :value="bubble.chaifen==null?'0':bubble.chaifen" class="item">
			 <el-button type="text"  @click="handleClick('splitTag')">拆分入库</el-button>
			</el-badge>
			<el-badge :value="bubble.xiangguan==null?'0':bubble.xiangguan" class="item">
			 <el-button type="text"  @click="handleClick('prpTag')">项目关联采购入库</el-button>
			</el-badge>
			<el-badge :value="bubble.fanchang==null?'0':bubble.fanchang" class="item">
			 <el-button type="text"  @click="handleClick('retuernFacTag')">返厂入库</el-button>
			</el-badge>
			
            
            
        </div>-->
        <!--条件按钮 E-->


      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
        </el-collapse-item>
      </el-collapse>
      <!--
          <div v-if="zongshu.result">
                <span style="font-weight:900;">总数：</span>{{zongshu.result.count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-weight:900;">支付宝总金额：￥</span>{{zongshu.result.payment[0].sumincome}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-weight:900;">天猫总金额：￥</span>{{zongshu.result.payment[0].sumtmall}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
      -->    
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
                style="width: 100% "
                max-height="600"
                @row-click = 'modification'
                @selection-change="handleSelectionChange"
                @size-change="handleSizeChange">
                    <!--选择器-->
                    <el-table-column
                      prop="remark"
                      label="财务备注">
                    </el-table-column>
                    <!--入库数据源 Start-->
                    <el-table-column
                      prop="create_time"
                      label="导入时间">
                    </el-table-column>
                    <el-table-column
                      prop="batch_no"
                      label="导入批次">
                    </el-table-column>
                    <el-table-column
                      prop="stock_sum_no"
                      label="汇总单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="datetime"
                      label="日期"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="shopname"
                      label="店铺名称"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="buyerid"
                      label="买家ID"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="tid"
                      label="订单编号"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="refundtype"
                      label="退换类型"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop="buyeraddress"
                      label="消费者信息"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop=""
                      label="备注1"
                      show-overflow-tooltip>
                    </el-table-column>             
                    <el-table-column
                      prop=""
                      label="备注2"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop=""
                      label="原因"
                      show-overflow-tooltip>
                    </el-table-column>              
                    <el-table-column
                      prop=""
                      label="事件号码"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="express"
                      label="快递公司"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="expresscode"
                      label="退货快递单号"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop="warehouse"
                      label="仓库是否收到"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="refunddate"
                      label="仓库收到退货日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="siginname"
                      label="签收人"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--入库数据源 End-->
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

            <!--详情S-->
            <el-table
                border
                ref="DetailTable"
                :data="tableData_detail"
                tooltip-effect="dark"
                style="width: 100%;"
                id = 'detailtable'>
                     <!--核销表头 Start-->
                    <el-table-column
                      prop="barcode"
                      label="条形码">
                    </el-table-column>
                    <el-table-column
                      prop="goodsname"
                      label="退回商品名称">
                    </el-table-column>
                    <el-table-column
                      prop="goodsnum"
                      label="产品数量">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="价格">
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="SN条形码">
                    </el-table-column>
                    
                    
              </el-table>
            <!--详情E-->
        </div>
        
        <div id="CollectButcontentdetail">
        	<el-table
                v-loading="loading1"
                element-loading-text="拼命加载订单数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100% "
                max-height="600"
                @row-click = 'modification'
                @selection-change="handleSelectionChange"
                @size-change="handleSizeChange">
                    <!--选择器-->
                    <el-table-column
                      prop="remark"
                      label="财务备注">
                    </el-table-column>
                    <!--入库数据源 Start-->
                    <el-table-column
                      prop="create_time"
                      label="导入时间">
                    </el-table-column>
                    <el-table-column
                      prop="batch_no"
                      label="导入批次">
                    </el-table-column>
                    <el-table-column
                      prop="stock_sum_no"
                      label="汇总单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="datetime"
                      label="日期"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="shopname"
                      label="店铺名称"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="buyerid"
                      label="买家ID"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="tid"
                      label="订单编号"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="refundtype"
                      label="退换类型"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop="buyeraddress"
                      label="消费者信息"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop=""
                      label="备注1"
                      show-overflow-tooltip>
                    </el-table-column>             
                    <el-table-column
                      prop=""
                      label="备注2"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop=""
                      label="原因"
                      show-overflow-tooltip>
                    </el-table-column>              
                    <el-table-column
                      prop=""
                      label="事件号码"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="goodsname"
                      label="退回商品名称"
                      show-overflow-tooltip>
                    </el-table-column>   
                    <el-table-column
                      prop="goodsnum"
                      label="产品数量"
                      show-overflow-tooltip>
                    </el-table-column>   
                    
                    <el-table-column
                      prop="barcode"
                      label="条形码">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="价格">
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="SN条形码">
                    </el-table-column>
                    <el-table-column
                      prop="express"
                      label="快递公司"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="expresscode"
                      label="退货快递单号"
                      show-overflow-tooltip>
                    </el-table-column>          
                    <el-table-column
                      prop="warehouse"
                      label="仓库是否收到"
                      show-overflow-tooltip>
                    </el-table-column>       
                    <el-table-column
                      prop="refunddate"
                      label="仓库收到退货日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="siginname"
                      label="签收人"
                      show-overflow-tooltip>
                    </el-table-column>
                    <!--入库数据源 End-->
              </el-table>

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
                // new field
                create_time:'',//导入时间 创建时间
                batch_no:'',//导入批次
                shopid:'',//店铺名称
                stock_sum_no:'',//汇总单号
                code:'',//入库单号
                in_type:'',//入库类型
                warehouse:'',//仓库名称
                out_warehouse:'',//调出仓库
                in_stock_time:'',//入库日期
                source_create_time:'',//制单日期
                checked_time:'',//审核日期
                source_create_user:'',//制单人
                confirmed_user:'',//确认人
                source_order_code:'',//来源单号
                in_status:'',//入库状态
                remake:'',//备注
				bubble:'',

                /*字段  End*/

                tableData_detail:[],//详情

                search_type_btn:'',//区分主查询和详情查询

                // value:'',
                // options:[],
                inputSearchBatch:'',//批次
                inputSearchAll:'',//收发存汇总单号


                //分页
                currentPage4: 1,
                totalPage: 0,
                // 每页多少条
                PageSize:10,


                // 店铺名称
                shopid_value:'',
                shop_options: [],//店铺列表
                // 时间类型
                select_time_type:'',
                select_time_type_options: [ {
                    value: '1',
                    label: '客服退货时间'
                }, {
                    value: '2',
                    label: '入库审核时间'
                }, {
                    value: '3',
                    label: '导入系统时间'
                },],

                //差异类型  difference 
                select_difference:'',
                select_difference_options: [ {
                    value: '1',
                    label: '有差异'
                }, {
                    value: '2',
                    label: '无差异'
                }, {
                    value: '',
                    label: '全部'
                },
                ],


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


                
                //入库单数据参数
                ware_house_data:{
                  apiName:'refundserch',
                  param:{
                      typetime:'',//时间类型 typetime
                      // start_time:'2018-01-01 00:00:00',
                      start_time:'',
                      end_time:'',
                      // end_time:'2018-02-01 00:00:00',
                      shopid:'',//店铺id
                      serachtype:'1',//查询条件 1主，2明细
                      page:'1',
                      pagesize:'10',
                      stock_sum_no:'',//收发存来源单号
                      batch_no:'',//批次
                    }

                },

                //获取入库单详情
                ware_income_detail_data:{
                  apiName:'serachrefundorder ',
                    param:{
                        tid:'',//通过tid获取详情信息
          				batch_no:'',//批次号
                    }
                },
  
               
                // 查询统计
                zongshu:'',

                //条件
                activeName: 'allTag',//全部


                
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
               * 获取数据的id  
               * 
               */
              handleSelectionChange(val) {
                this.multipleSelection = val;//动态选中的数据
                this.checkbox_ids = []
                for(var i=0;i<val.length;i++){
                
                  this.checkbox_ids.push(this.multipleSelection[i].tid); //   tid + 去重
                  this.checkbox_ids = this.uniq(this.checkbox_ids);//去重后重新赋值  
                  
                  // this.checkbox_ids =  this.checkbox_ids.prototype.delRepeat; //去重
                
                   this.supplement_shop_id.push(this.multipleSelection[i].shopid);
                }

              },
			//导出

            handleExport(){
				var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Newdemand/exportrefundorder"; 
				var form = $("<form>"); //定义一个form表单 
				form.attr('style','display:none'); //在form表单中添加查询参数 
				form.attr('target',''); 
				form.attr('method','get'); 
				form.attr('action',downloadURL); 

				$('body').append(form); //将表单放置在web中 
				
				for(let i in this.ware_house_data.param){
					var a = $('<input>'); 
					a.attr('type','hidden'); 
					a.attr('name',i); 
					a.attr('value',this.ware_house_data.param[i]); 
					form.append(a); //将查询参数控件提交到表单上 
				}  
	                form.submit();   //表单提交  
			},
			handleExportsum(){
				var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Newdemand/exporsumrefund"; 
				var form = $("<form>"); //定义一个form表单 
				form.attr('style','display:none'); //在form表单中添加查询参数 
				form.attr('target',''); 
				form.attr('method','get'); 
				form.attr('action',downloadURL); 
				console.log(downloadURL)
				
				$('body').append(form); //将表单放置在web中 
				
				for(let i in this.ware_house_data.param){
					var a = $('<input>'); 
					a.attr('type','hidden'); 
					a.attr('name',i); 
					a.attr('value',this.ware_house_data.param[i]); 
					form.append(a); //将查询参数控件提交到表单上 
				}  
	                form.submit();   //表单提交  
			
				
			},
            
              // 分页方法        
              handleSizeChange(val) {
                this.PageSize = val;
                this.currentPage4 = 1;
                 this.ware_house_data.param.page = this.currentPage4;//页码
                this.ware_house_data.param.pagesize = this.PageSize;//条数
                this.requireData(this.currentPage4,this.PageSize)
              },
              handleCurrentChange(val) {
                //打印参数 当前页
                this.currentPage4 = val;
                this.ware_house_data.param.page = this.currentPage4;//页码
                this.ware_house_data.param.pagesize = this.PageSize;//条数
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
                    this.ware_house_data.param.typetime = val;
                  }
              },
              //选择店铺
              filter_shop(val){
                  if(val){
                    this.ware_house_data.param.shopid = val;
                  }
              },
              //选择时间
              filter_date(time){ 
                if (time.length == 2){
                       this.ware_house_data.param.start_time = time[0]; //开始时间
                       this.ware_house_data.param.end_time = time[1]; // 结束时间
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

              // 时间类型 选择
              fun_order_time_type(type){
                if(type){
                  this.ware_house_data.param.typetime = type//设置时间类型 入库时间 创建时间
                }
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


              /**
               * 查询按钮，点击进行查询
               */
              OrderSearch(){
                //获取 批次  发货订单汇总 中的text
                this.ware_house_data.param.batch_no = this.inputSearchBatch     
                this.ware_house_data.param.stock_sum_no = this.inputSearchAll
                this.ware_house_data.param.type = '1';// 主查询是1
                this.search_type_btn = '1'  // 主查询的状态设置成1
                this.ware_house_data.param.page = '1'
                // this.ware_house_data.param.in_type = ''// 默认查询全部
                /**
                 * 将下面的详情隐藏
                 */
                // var tmp =this.$refs.DetailTable
                // $(".detailtable")
                $("#CollectButcontent").css('display','block'); 
                $("#CollectButcontentdetail").css('display','none'); 

                this.tableData_detail=[];
                this.requireData();
              },
              /**
               * 点击查询详情 主查询1  详情2
               */
              OrderSearchDetail(){
                 this.ware_house_data.param.batch_no = this.inputSearchBatch     
                 this.ware_house_data.param.stock_sum_no = this.inputSearchAll
                 this.ware_house_data.param.type = '2';// 详情是2
                 this.search_type_btn = '2'  // 详情查询的状态设置成2
                //  this.ware_house_data.param.in_type = ''// 默认查询全部
                //清除详情
                this.tableData_detail=[];
                $("#CollectButcontent").css('display','none'); 
                $("#CollectButcontentdetail").css('display','block'); 
                 this.requireData();
              },

              //查询所有的数据进行展示
              requireData(){
                  this.loading1 = 1;
                  this.axios.post('/dc-admin/gate/api',this.ware_house_data,{type:'payload'}
                    ).then(res =>{

                      var json_data =  JSON.parse(res.data.data)  //解析数据    
                      console.log(json_data)
                      this.zongshu = json_data;
                      
//                      this.data_length = parseInt(json_data.result.data.length)
                        try{
                          this.tableData3 = json_data.data;
//						  this.bubble = json_data.result.sum_count[0]
                          this.totalPage =parseInt(json_data.count);
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
                 * 点击选中的数据  点击获取详情
                 * 
                 */
                modification(val){
                	console.log(val)
                  if(this.search_type_btn == '1'){
                    this.ware_income_detail_data.param.tid = ''//每次先清空
                    this.ware_income_detail_data.param.batch_no = ''//每次先清空
                    this.ware_income_detail_data.param.tid = val.tid//每次先清空
                    this.ware_income_detail_data.param.batch_no = val.batch_no  //将获取的批次号进行赋值
                    this.requireDetailData();//获取详细信息
                    console.log(this.ware_income_detail_data)
                  }
                },
                /** 
                 * 根据code获取详细的信息
                 */
                requireDetailData(){
                   this.axios.post('/dc-admin/gate/api',this.ware_income_detail_data,{type:'payload'}
                    ).then(res =>{
                      var json_data =  JSON.parse(res.data.data)  //解析数据           
                      console.log(json_data)
                        try{
                          this.tableData_detail = json_data.data;
                        }
                        catch(err){
                          this.tableData_detail = '';
                          // this.open_message('错误,数据无法解析')
                        }
                    });
              },

              /**
               * 条件
               */
//            handleClick(tab) {
//              if(tab == 'allTag'){
//                  this.ware_house_data.param.in_type = ''// 默认查询全部
//              }else if(tab == 'purchaseTag'){
//                  this.ware_house_data.param.in_type = '采购入库'    
//              }else if(tab == 'normalTag'){
//                  this.ware_house_data.param.in_type = '正常入库'    
//              }else if(tab == 'allocationTag'){
//                  this.ware_house_data.param.in_type = '调拨入库'    
//              }else if(tab == 'returnTag'){
//                  this.ware_house_data.param.in_type = '退货入库'    
//              }else if(tab == 'profitTag'){
//                  this.ware_house_data.param.in_type = '盘盈入库'    
//              }else if(tab == 'splitTag'){
//                  this.ware_house_data.param.in_type = '拆分入库'    
//              }else if(tab == 'prpTag'){
//                  this.ware_house_data.param.in_type = '项目关联采购入库'    
//              }else if(tab == 'retuernFacTag'){
//                  this.ware_house_data.param.in_type = '返厂入库'    
//              }
//              if(this.search_type_btn==2){
//              	this.OrderSearchDetail()
//            	}else{
//            		this.OrderSearch()	
//            	}
//            },
              /**
               * 获取店铺的名称 
               */
              get_shop_list(){
                this.axios.get('/dc-admin/admin/shop/query',{tupe:'playload'}).then(res =>{
                  this.shop_options =JSON.parse(res.data.list) 
                })
              },
            
              //格式化店铺名称  
              formattershopname(row,column){
                  for (var i=0;i<this.shop_options.length;i++){
                      if(this.shop_options[i].code == row.shopid){
                          row.shopid = this.shop_options[i].name
                      }
                  }
                  return row.shopid
              },



              //默认发货时间 
              set_default(){
                // order_time_options
                //根据月份设置默认时间，example 6月 ->5月21-6月21
                // ['2018-05-04 00:00:00','2018-05-05 00:00:00']
                // 设置默认时间从上月21-当月20
                // var date=new Date;
                // var month=date.getMonth();
                // var month1=month+1;
                // var year=date.getFullYear();
                // var year1=date.getFullYear();
                // if (month<=9){
                //   month = '0'+month;
                // }
                // if (month1<=9){
                //   month1 = '0'+month1;
                // }else if(month1==13){
                //   month1 = '01';
                //   year1=year+1;
                // }
                // this.seleted_time = [year+'-'+month+'-21 00:00:00',year1+'-'+month1+'-20 00:00:00']
                // this.filter_date(this.seleted_time);
                // 默认订单时间类型
                // this.select_order_time_type(2);
              }


        },
        mounted() {
            // 是否有从别的地方带来的批次号
            console.log(this.$store.state.picihao)
//          this.ware_house_data.param.batch_no
            if(this.$store.state.picihao==''){
                this.OrderSearch();
            }
            else{
              this.inputSearchBatch = this.$store.state.picihao;
              this.OrderSearch();
              this.$store.state.picihao = '';
            }
            
            this.$store.commit("changeSize",{wai:'CollectBut',rightBottom:'CollectButdiv1',right:'CollectButright',bottom:'CollectButbottom',content:'CollectButcontent'});
            
            // this.requireData(this.currentPage4,this.PageSize);
            this.get_shop_list();
            // 设置默认时间从上月21-当月20
            // var date=new Date;
            // var month=date.getMonth();
            // var month1=month+1;
            // var year=date.getFullYear();
            // var year1=date.getFullYear();
            // if (month<=9){
            //   month = '0'+month;
            // }
            // if (month1<=9){
            //   month1 = '0'+month1;
            // }else if(month1==13){
            //   month1 = '01';
            //   year1=year+1;
            // }
            // this.seleted_time = [year+'-'+month+'-21 00:00:00',year1+'-'+month1+'-20 00:00:00']
            // this.filter_date(this.seleted_time);
            // this.select_order_time_type(2);

            this.set_default();

        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .IncomeShow{
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
    .el-buttonsp button{
  	color: #2d2f33;
  }
  .el-buttonsp{
  	border-bottom: 2px solid #ccc;
  }
  .el-buttonsp .el-badge{
  	margin-right: 20px;
  }
</style>
