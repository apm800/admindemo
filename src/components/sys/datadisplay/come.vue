<template>
<div>
    <div class="OutShow">
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
            <el-select v-model="shopid_value" style="width: 150px" placeholder="请选择店铺名" @change='filter_shop(shopid_value)'>
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
              <el-button type="primary" @click="handleExport">导出详情</el-button>
              <el-button type="primary" @click="handleExportSum">导出汇总</el-button>
        </span>
		<!--导出-->
        <!--条件按钮 S-->
        <div  class="el-buttonsp" style="margin: 20px 10px -10px 0">
        	<el-badge :value="bubble.qitaa" class="item">
			 <el-button type="text"  @click="handleClick('allTag')">全部</el-button>
			</el-badge>
			<el-badge :value="bubble.qita==null?'0':bubble.qita" class="item">
			 <el-button type="text"  @click="handleClick('otherTag')">其它</el-button>
			</el-badge>
			<el-badge :value="bubble.fanzhang==null?'0':bubble.fanzhang" class="item">
			 <el-button type="text"  @click="handleClick('retuernFacTag')">返厂出库</el-button>
			</el-badge>
			<el-badge :value="bubble.puhuo==null?'0':bubble.puhuo" class="item">
			 <el-button type="text" @click="handleClick('sgoTag')">铺货出库</el-button>
			</el-badge>
			<el-badge :value="bubble.lingyong==null?'0':bubble.lingyong" class="item">
			 <el-button type="text" @click="handleClick('getTag')">领用出库</el-button>
			</el-badge>
			<el-badge :value="bubble.pankui==null?'0':bubble.pankui" class="item">
			 <el-button type="text" @click="handleClick('lossTag')">盘亏出库</el-button>
			</el-badge>
			<el-badge :value="bubble.chaifeng==null?'0':bubble.chaifeng" class="item">
			 <el-button type="text" @click="handleClick('splitTag')">拆分出库</el-button>
			</el-badge>
			<el-badge :value="bubble.xiangguan==null?'0':bubble.xiangguan" class="item">
			 <el-button type="text" @click="handleClick('prpTag')">项目关联销售出库</el-button>
			</el-badge>
			
			<el-badge :value="bubble.diaobo==null?'0':bubble.diaobo" class="item">
			 <el-button type="text" @click="handleClick('diaoTag')">调拨出库</el-button>
			</el-badge>
			
            <!--<el-tabs v-model="activeName" @tab-click="handleClick" v-checkup="'order:check:list'">
                <el-tab-pane label="全部" name="allTag"></el-tab-pane>
                <el-tab-pane label="其他出库" name="otherTag"></el-tab-pane>
                <el-tab-pane label="返厂出库" name="retuernFacTag"> </el-tab-pane>
                <el-tab-pane label="铺货出库" name="sgoTag"> </el-tab-pane>
                <el-tab-pane label="领用出库" name="getTag"> </el-tab-pane>
                <el-tab-pane label="盘亏出库" name="lossTag"> </el-tab-pane>
                <el-tab-pane label="拆分出库" name="splitTag"> </el-tab-pane>
                <el-tab-pane label="项目关联采购出库" name="prpTag"> </el-tab-pane>
            </el-tabs>-->
        </div>
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
                style="width: 100%"
                max-height="600"
                @row-click = 'modification'
                @selection-change="handleSelectionChange"
                @size-change="handleSizeChange">
                    <!--选择器-->
                    <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
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
                      prop="shopid"
                      label="店铺名称"
                      :formatter="formattershopname"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="stock_sum_no"
                      label="汇总单号"
                      show-overflow-tooltip>
                    </el-table-column>                   
                    <el-table-column
                      prop="code"
                      label="出库单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_type"
                      label="出库类型"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="warehouse"
                      label="仓库名称"
                      width="110"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="in_warehouse"
                      label="调入仓库"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="back_partner"
                      label="返厂供应商"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="source_create_time"
                      label="制单日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="partner_product_code"
                      label="厂家货号"
                      show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column
                      prop="out_status"
                      label="出库状态"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="remake"
                      label="备注"
                      show-overflow-tooltip>
                    </el-table-column>
                    
                    <!--出库数据源 End-->
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
                id = 'detailtable'
                >
                     <!--详情表头 Start-->
                    <el-table-column
                      prop= "product_type"
                      label="产品分类"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="product_code"
                      label="产品编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="product_name"
                      label="产品名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="product_standard"
                      label="规格"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="product_barcode"
                      label="条形码"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="out_count"
                      label="出库数量"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="cost_price"
                      label="成本价"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="cost_subtotal"
                      label="成本小计"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="out_price"
                      label="出库价"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop="out_sum"
                      label="出库金额"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="out_order"
                      label="批次"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="producted_time"
                      label="生产日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="expiry_time"
                      label="失效日期"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="brand"
                      label="品牌"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="sell_group"
                      label="销量分组"
                      show-overflow-tooltip>
                    </el-table-column>   
                    <el-table-column
                      prop="element"
                      label="成分"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="color"
                      label="颜色"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="quality"
                      label="质量"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="colour"
                      label="色彩"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop="plush"
                      label="毛绒"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="product_function"
                      label="功效"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="suitable_hair"
                      label="适合发质"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="cosmetics_capacity"
                      label="化妆品容量"
                      show-overflow-tooltip>
                    </el-table-column>
              </el-table>
            <!--详情E-->
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
                code:'',//出库单号
                out_type:'',//出库类型
                warehouse:'',//仓库名称
                in_warehouse:'',//调入仓库
                back_partner:'',//返厂供应商
                source_create_time:'',//制单日期
                partner_product_code:'',//厂家货号
                out_status:'',//出库状态
                remake:'',//备注
                //详情字段
                product_type:'',//产品分类
                product_line_code:'',//产品明细编号
                product_code:'',//产品编号
                product_name:'',//产品名称
                product_standard:'',//规格
                product_barcode:'',//条形码
                back_partner:'',//供应商
                partner_product_code:'',//厂家货号
                out_count:'',//出库数量
                cost_price:'',//成本价

                cost_subtotal:'',//成本小计
                out_price:'',//出库价
                out_sum:'',//出库金额
                out_order:'',//批次
                producted_time:'',//生产日期
                expiry_time:'',//失效日期

                brand:'',//品牌
                sell_group:'',//销量分组
                element:'',//成分
                color:'',//颜色
                quality:'',//质量
                colour:'',//色彩
                plush:'',//毛绒
                product_function:'',//功效
                suitable_hair:'',//适合发质
                cosmetics_capacity:'',//化妆品容量






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
				bubble:'',

                // 店铺名称
                shopid_value:'',
                shop_options: [],//店铺列表
                // 时间类型
                select_time_type:'',
                select_time_type_options: [ {
                    value: '1',
                    label: '出库审核时间'
                }, {
                    value: '2',
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


                
                //出库单数据参数
                ware_house_data:{
                  apiName:'warehouseoutdata',
                  param:{
                      datetype:'',//时间类型
                      // start_time:'2018-01-01 00:00:00',
                      starttime:'',
                      endtime:'',
                      // end_time:'2018-02-01 00:00:00',
                      shopid:'',//店铺id
                      serachtype:'',//查询条件 1主，2明细
                      page:'1',
                      pagesize:'10',
                      stock_sum_no:'',//收发存来源单号
                      batch_no:'',//批次
                      out_type:'',
                    }

                },

                //获取入库单详情
                ware_outcome_detail_data:{
                  apiName:'warehouseoutdetail',
                    param:{
                        code:'',//通过tid获取详情信息
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
                    this.ware_house_data.param.datetype = val;
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
                       this.ware_house_data.param.starttime = time[0]; //开始时间
                       this.ware_house_data.param.endtime = time[1]; // 结束时间
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
                  this.ware_house_data.param.datetype = type//设置时间类型 入库时间 创建时间
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
                this.ware_house_data.param.serachtype = '1';// 主查询是1
                this.search_type_btn = '1'  // 主查询的状态设置成1
                this.ware_house_data.param.page = '1'
//               this.ware_house_data.param.out_type = ''
                
                console.log(this.ware_house_data)
                /**
                 * 将下面的详情隐藏
                 */
                // var tmp =this.$refs.DetailTable
                // $(".detailtable")
                $("#detailtable").css('display','block'); 
				this.tableData_detail=[];
                this.requireData();
              },
              /**
               * 点击查询详情 主查询1  详情2
               */
              OrderSearchDetail(){
                 this.ware_house_data.param.batch_no = this.inputSearchBatch     
                 this.ware_house_data.param.stock_sum_no = this.inputSearchAll
                 this.ware_house_data.param.serachtype = '2';// 详情是2
                 this.search_type_btn = '2'  // 详情查询的状态设置成2
//               this.ware_house_data.param.out_type = ''
                console.log(this.ware_house_data)
                //清除详情
                this.tableData_detail=[];
                $("#detailtable").css('display','none'); 
                 this.requireData();
                 
              },
 /**
               * 条件
               */
              handleClick(tab) {
              	
                /**
                 * <el-tab-pane label="全部" name="allTag"> </el-tab-pane>
                <el-tab-pane label="其他出库" name="otherTag"> </el-tab-pane>
                <el-tab-pane label="返厂出库" name="retuernFacTag"> </el-tab-pane>
                <el-tab-pane label="铺货出库" name="sgoTag"> </el-tab-pane>
                <el-tab-pane label="领用出库" name="getTag"> </el-tab-pane>
                <el-tab-pane label="盘亏出库" name="lossTag"> </el-tab-pane>
                <el-tab-pane label="拆分出库" name="splitTag"> </el-tab-pane>
                <el-tab-pane label="项目关联采购入库" name="prpTag"> </el-tab-pane>
                 */
                if(tab == 'allTag'){
                    this.ware_house_data.param.out_type = ''// 默认查询全部
                }else if(tab == 'otherTag'){
                    this.ware_house_data.param.out_type = '其它'    
                }else if(tab == 'retuernFacTag'){
                    this.ware_house_data.param.out_type = '返厂出库'    
                }else if(tab == 'sgoTag'){
                    this.ware_house_data.param.out_type = '铺货出库'    
                }else if(tab == 'getTag'){
                    this.ware_house_data.param.out_type = '领用出库'    
                }else if(tab == 'lossTag'){
                    this.ware_house_data.param.out_type = '盘亏出库'    
                }else if(tab == 'splitTag'){
                    this.ware_house_data.param.out_type = '拆分出库'    
                }else if(tab == 'prpTag'){
                    this.ware_house_data.param.out_type = '项目关联销售出库'    
                }else if(tab == 'diaoTag'){
                    this.ware_house_data.param.out_type = '调拨出库'    
                }
                if(this.search_type_btn==2){
                	this.OrderSearchDetail()
              	}else{
              		this.OrderSearch()	
              	}
              },
              //查询所有的数据进行展示
              requireData(){
                  this.loading1 = 1;
                  
                  this.axios.post('/dc-admin/gate/api',this.ware_house_data,{type:'payload'}
                    ).then(res =>{
                    console.log(this.ware_house_data)
						
                      var json_data =  JSON.parse(res.data.data)  //解析数据                      
                      this.zongshu = json_data;
                      this.bubble = json_data.result.sum_count[0]
                      console.log(this.bubble)
                        this.data_length = parseInt(json_data.result.data.length)
                        try{
                          this.tableData3 = json_data.result.data;
                          var i;
                          for (i in this.tableData3){
                          	if(this.tableData3[i].remarks){
                          		this.tableData3[i].remake = json_data.result.data[i].remarks
                          	}
                          }
							console.log(this.tableData3)			
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
                 * 点击选中的数据  点击获取详情
                 * 
                 */
                modification(val){
                	console.log('z执行')
                  if(this.search_type_btn == '1'){
                    this.ware_outcome_detail_data.param.code = ''//每次先清空
                   	this.ware_outcome_detail_data.param.batch_no = ''//每次先清空
                    this.ware_outcome_detail_data.param.code = val.code  //将获取的code进行赋值
                    this.ware_outcome_detail_data.param.batch_no = val.batch_no  //将获取的批次号进行赋值
                    console.log(this.ware_outcome_detail_data.param)
                    this.requireDetailData();//获取详细信息
                  }
                },
                /** 
                 * 根据code获取详细的信息
                 */
                requireDetailData(){
                   this.axios.post('/dc-admin/gate/api',this.ware_outcome_detail_data,{type:'payload'}
                    ).then(res =>{
                      var json_data =  JSON.parse(res.data.data)  //解析数据        
                        try{
                          this.tableData_detail = json_data.result.data;
                        }
                        catch(err){
                          this.tableData_detail = '';
                          // this.open_message('错误,数据无法解析')
                        }
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
            
              //格式化店铺名称  
              formattershopname(row,column){
                  for (var i=0;i<this.shop_options.length;i++){
                      if(this.shop_options[i].code == row.shopid){
                          row.shopid = this.shop_options[i].name
                      }
                  }
                  return row.shopid
              },

			//导出
			
            handleExport(){
            	var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Baoge/exportxls";  
                var form = $("<form>");   //定义一个form表单  
                form.attr('style','display:none');   //在form表单中添加查询参数  
                form.attr('target','');  
                form.attr('method','post');  
                form.attr('action',downloadURL);  
                                    
                $('body').append(form);  //将表单放置在web中  
	            for(let i in this.ware_house_data.param){
					var a = $('<input>'); 
					a.attr('type','hidden'); 
					a.attr('name',i); 
					a.attr('value',this.ware_house_data.param[i]); 
					form.append(a); //将查询参数控件提交到表单上 
				}  
                form.submit();   //表单提交  
            },
            
            handleExportSum(){
            	var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Newdemand/exportsum";  
                var form = $("<form>");   //定义一个form表单  
                form.attr('style','display:none');   //在form表单中添加查询参数  
                form.attr('target','');  
                form.attr('method','post');  
                form.attr('action',downloadURL);  
                                    
                $('body').append(form);  //将表单放置在web中  
	            for(let i in this.ware_house_data.param){
					var a = $('<input>'); 
					a.attr('type','hidden'); 
					a.attr('name',i); 
					a.attr('value',this.ware_house_data.param[i]); 
					form.append(a); //将查询参数控件提交到表单上 
				}  
                form.submit();   //表单提交  
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
        created(){
        	
        },
        mounted() {
        	
        	
            // 是否有从别的地方带来的批次号
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
            $(function(){
            	console.log(document.querySelector(".el-tabs__item"))
     		})

        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .OutShow{
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
