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
            <el-select filterable v-model="shopid_value" style="width: 150px" placeholder="请选择店铺名" @change='filter_shop(shopid_value)'>
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
          <span>时间类型：</span>
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
          
        </div>
        
        <!--入账时间-->
         <div class="CollectSousuo">
          <span>时间类型：</span>
          <el-select v-model="account_time_type" style="width: 150px" placeholder="请选择" @change='account_order_time_type(account_time_type)'>
              <el-option
                v-for="item in order_time_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          <el-date-picker  style="width: 250px" @change='enteraccount(account_time)'
            v-model="account_time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          
        </div>

        <!--对账情况 默认都是已对账的数据-->  
        <!--
        <div class="CollectSousuo">
          <span class="mustFill">*</span>
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

        <!--差异-->
        
        <div class="CollectSousuo">
            <span>差异类型：</span>
            <el-select v-model="select_difference" style="width: 150px" placeholder="请选择订单类型" @change='fun_difference(select_difference)'>
                <el-option
                  v-for="item in select_difference_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        
        

        <!--订单类型-->
        <div class="CollectSousuo">
            <span>订单类型：</span>
            <el-select v-model="select_order_type" style="width: 150px" placeholder="请选择订单类型" @change='fun_order_type(select_order_type)'>
                <el-option
                  v-for="item in select_order_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>

        <!--签收状态-->
        <div class="CollectSousuo">
            <span>签收状态:</span>
            <el-select v-model="sign_order_type" style="width: 150px" placeholder="请选择签收状态" @change='fun_order_sign_type(sign_order_type)'>
                <el-option
                  v-for="item in sign_order_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--回款状态-->
        <div class="CollectSousuo">
            <span>回款状态:</span>
            <el-select v-model="return_money_type" style="width: 150px" placeholder="请选择回款状态" @change='fun_return_money(return_money_type)'>
                <el-option
                  v-for="item in return_money_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--签收状态--> 
        <!--
        <div class="CollectSousuo">
            <span>签收状态：</span>
            <el-select v-model="sign_state" style="width: 150px" placeholder="请选择签收状态" @change='fun_sign_state(sign_state)'>
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
        <div class="CollectSousuo">
          <span>查询字段：</span>
          <el-select v-model="keywordsearch" placeholder="查询字段" @change='fun_keywordsearch(keywordsearch)'>
              <el-option
                v-for="item in keywordsearch_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <!--搜索-->
        <div class="CollectSousuo">
          <el-input style='max-width: 200px;' placeholder="输入关键字查询"  v-model="inputSearch" class="input-with-select">
            <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
          </el-input>
          
          <span style="margin-left: 10px;">查询关键字：</span>
          <el-input style='max-width: 200px;' placeholder="输入备注关键字查询"  v-model="inputSearch1" class="input-with-select">
            <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
          </el-input>
         
        </div>
		
        <div class="CollectSousuo">
			<span style="margin-left: 10px;">汇总编号：</span>
          	<el-input style='max-width: 200px;' placeholder="输入汇总编号查询"  v-model="inputstock_sum_no" class="input-with-select">
            <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
          	</el-input>
        </div>	
        
        <div class="CollectSousuo">
			<span style="margin-left: 10px;">批次号：</span>
          	<el-input style='max-width: 200px;' placeholder="输入批次号查询"  v-model="inputbatch_no" class="input-with-select">
            <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
          	</el-input>
        </div>	
        <!--核销-->
        
        <div class="CollectSousuo">
            <span>是否二次核销：</span>
            <el-select v-model="hexiao" style="width: 150px" placeholder="请选择订单类型">
                <el-option
                  v-for="item in hexiao_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        
        <div class="CollectSousuo">
            <span>是否有备注：</span>
            <el-select v-model="is_remarks" style="width: 150px" placeholder="请选择订单类型">
                <el-option
                  v-for="item in is_remarks_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        
		<!-- 菜鸟订单类型筛选-->
        <div class="CollectSousuo">
          <span>菜鸟订单类型：</span>
          <el-select v-model="cainiaostylestr"   multiple style="width: 150px" placeholder="全部" @change='fun_select_cainiaostyle(cainiaostylestr)'>
              
              <el-option
                v-for="item in orcainiaostyle"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
          </el-select>
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
        <div style="margin: 20px 10px 0 0">
        	<el-button size="mini" type="warning" v-if='checkbox_key!=""' @click="addDialog_select_ware=true">添加备注</el-button>
            <el-button size="mini" type="primary" @click="cancelafterverification" v-checkup="'order:check:manual'">人工核销</el-button>
            <!--
            <el-button size="mini" type="primary" @click="fun_consent_supplement" v-checkup="':sys:menu:add'">同意补录</el-button>
            -->
            <el-button size="mini" type="warning" @click="DaoChu" v-checkup="'order:check:export'">表格导出</el-button>
            
            <el-button size="mini" type="primary" @click="dialogFormVisible"  v-if="flag">订单结转</el-button>
<!-- <el-button size="mini" type="danger" @click="" v-checkup="':sys:menu:add'">删除</el-button> -->
        </div>
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
	<!--<el-dialog title="选择账期" :visible.sync="dialogFormVisible" width='40%'>
		<span>账期：</span>
		<el-select v-model="select_payment" style="width: 220px" placeholder="请选择" @change=''>
			<el-option v-for="item in select_payment_options" :key="item" :label="item" :value="item">
			</el-option>
		</el-select>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		</div>
	</el-dialog>-->
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
                      prop="id"
                      label="主键">
                    </el-table-column>
                    <el-table-column
                      prop="stock_sum_no"
                      label="汇总编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="batch_no"
                      label="批次号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="tid"
                      label="系统订单编号"
                      show-overflow-tooltip
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="platformnum"
                      label="原始外部平台单号"
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
                      prop="storage_name"
                      label="仓库名称"
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
                      prop="income_time"
                      label="入账时间"
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
                    <el-table-column
                      prop="remarks"
                      label="备注">
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
			<!--弹出框-->
            <el-dialog title="备注" :visible.sync="addDialog_select_ware">
                <el-input
                autosize
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :rows="4"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDialog_select_ware = false">取 消</el-button>
                    <el-button type="primary" @click="addremark">确 定</el-button>
                </div>
        </el-dialog>


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
                // 遮罩
                addDialog_select_ware:false,
                textarea:'',
                loading1:0,
                /*字段  Start*/
                shop_name : '',
                inputstock_sum_no:'',
                inputbatch_no:'',
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
                checkbox_key:[],
                /*字段  End*/

                // value:'',
                // options:[],
                inputSearch:'',//输入查询的内容
                inputSearch1:'',//输入查询的内容
                search_key_tmp:'',// 存储搜索的类型

                //分页
                currentPage4: 1,
                totalPage: 0,
                // 每页多少条
                PageSize:10,
				
            	cainiaostylestr:'全部',
            	// 是否是菜鸟
                orcainiaostyle:[
                  {value:'交易出库',
                    name:'交易出库',},
                  {value:'换发单',
                    name:'换发单',},
                  {value:'正常订单',
                    name:'正常订单',},
                  {value:'补发单',
                    name:'补发单',},
                  {value:'销售单',
                    name:'销售单',},
                  {value:'预售订单',
                    name:'预售订单',},
                ],

                // 店铺名称
                shopid_value:'',
                shop_options: [],//店铺列表
                // 订单类型
                select_order_type:'',
                select_order_type_options: [ {
                    value: '1',
                    label: '正常订单'
                }, {
                    value: '2',
                    label: '手工订单'
                }, {
                    value: '3',
                    label: '赠品订单'
                },{
                    value: '',
                    label: '全部'
                },],
                
                // 账期
                select_payment:'',
                select_payment_options: [],

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

                //差异类型  difference 
                hexiao:'',
                hexiao_options: [ {
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }, {
                    value: '',
                    label: '全部'
                },
                ],
                is_remarks:'',
				is_remarks_options: [ {
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }, {
                    value: '',
                    label: '全部'
                },
                ],
				
				
                // 签收状态
                sign_order_type:'',
                sign_order_type_options: [ {
                    value: '1',
                    label: '已签收'
                }, {
                    value: '2',
                    label: '未签收'
                }, {
                    value: '',
                    label: '全部'
                },],

                //回款状态
                return_money_type:'',
                return_money_options: [ {
                    value: '1',
                    label: '已回款'
                }, {
                    value: '2',
                    label: '未回款'
                }, {
                    value: '',
                    label: '全部'
                },],

                // 搜索关键字
                keywordsearch:'',
                keywordsearch_options: [{
                    value: '1',
                    label: '原始外部平台单号'
                },{
                    value: '2',
                    label: '外部单号'
                }, {
                    value: '3',
                    label: '买家ID'
                }, {
                    value: '4',
                    label: '系统订单编号'
                }, {
                    value: '5',
                    label: '收件人'
                }, {
                    value: '6',
                    label: '收件人手机'
                }],
                // 提交日期
                order_time_type:'发货时间',
                // 选项1  订货日期‘1’，发货日期‘2’，付款日期，‘3’，提交时间‘4’，签收时间‘5’，对账时间‘6’，入账时间‘7’
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
                },{
                    value: '7',
                    label: '入账时间'
                }],
                account_time_type:'',
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
                account_time:'',//入账时间
                value6: '',
                value7: '',
                tableData3:[],
                data_length:'',//数组的长度
                checkbox_ids:[],// 选中的table 的ids
                multipleSelection:'',//动态选中的数据
                supplement_shop_id:[],//同意补录 选中的店铺id
                flag:false,
                  //核销数据
                collect_data:{
                  apiName:'ordercancellation',
                  param:{
                      datetype:'1',
                      shopid:'1',
                      // start_time:'2018-01-01 00:00:00',
                      start_time:'',
                      end_time:'',
                      accounstart_time:'',
                      accounend_time:'',
                      // end_time:'2018-02-01 00:00:00',
                      // order_type:'',
                      status:'1',// 测试未对账人工核销
                      // ishandler:'',//
                      order_check_status:'',//订单类型
                      // order_type:'',// 订单类型
                      difference:'',//差异类型
                      status:'',// 测试未对账人工核销
                      // ishandle:'',//
                      signtimestats:'',
                      queryField:'',
                      tid:'',
                      accountype:'',
                      page:'1',
                      pagesize:'10',
                      signtimestats:'',//签收状态
                      remittance:'',//回款状态
                      cancel_reload:'',
                      stock_sum_no:'',
                      batch_no:'',
                   },
                    /**
                     * 测试数据
                     */
                    //  param:{
                    //   datetype:'1',
                    //   shopid:'1',
                    //   start_time:'2018-01-01 00:00:00',
                    //   end_time:'2018-02-01 00:00:00',
                    //   order_type:'',
                    //   status:'0',
                    //   signtimestats:'',
                    //   tid:'',
                    //   out_tid:'',
                    //   buyer_id:'',
                    //   receiver_name:'',
                    //   receiver_mobile:'',
                    //   page:'1',
                    //   pagesize:''
                    // }
                },
                addremarkdata:{
                  apiName:'addremarks',
                  param:{
                      id:"",
                      remarks:""
                  },
                },
                  //订单结转
                collect_detele:{
                  apiName:'Knotsdel',
                  param:{
                      
                  },
                },
                //人工核销
                manual_cancellation_data:{
                    apiName:'cancelafterverification',
                    param:{
                        id:[],
          
                    }
                },
                //同意补录
                consentsupplement_data:{
                  apiName:'consentsupplement',
                    param:{
                        shopid:[],
          
                    }
                },
                // 导出表格  /home/Resource/exportData
                dataWa2:{
                  apiName:'exportData',
                  param:{
                      datetype:'',//时间类型
                      start_time:'',//开始时间
                      end_time:'',//结束时间
                      accounstart_time:'',
                      accounend_time:'',
                      accountype:'',
                      type:'',//订单类型
                      storage_id:'',//仓库编号
                      shopid:'',//店铺ID
                      status:'1',//对账情况
                      // page:1,
                      // pagesize:10,
                      tid:'',
                      queryField:'',
                      signtimestats:'',//签收状态
                      remittance:'',//回款状态
                      difference:'',//差异
                      order_check_status:'',//订单类型
                      stock_sum_no:'',
                      batch_no:'',
                  }
                },
                // 查询统计
                zongshu:'',

                
          }
             
        },
        methods: {
//      	订单核销
        	addremark(){
        		if(this.checkbox_key==''){
	        		this.$message({
						type: 'error',
						message: '请选择订单！',
	        		});
        		}else if(this.textarea==""){
        			this.$message({
						type: 'error',
						message: '请填写备注！',
	        		});
        		}else{
        			this.$notify.info({
			          title: '提示',
			          message: '请稍等'
			        });
        		this.addremarkdata.param.id =  this.checkbox_key.toString();
        		this.addremarkdata.param.remarks =  this.textarea
        		this.axios.post('/dc-admin/gate/api',this.addremarkdata,{type:'payload'}).then(res => {
					console.log(res.data.data)
					var data =JSON.parse(res.data.data)
					this.addDialog_select_ware=false
					if(res.data.code==0){
						this.$message({
							type: 'success',
							message: data.code,
						});
						this.textarea="";
                  		this.requireData();
					}else{
						this.$message({
							type: 'error',
							message: data.code,
						});
						
					}
        		})
        		}

        	},
        	
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
              	console.log(val)
                this.multipleSelection = val;//动态选中的数据
                this.checkbox_ids = []
                this.checkbox_key = []
                for(var i=0;i<val.length;i++){
                  //人工核销数据id
                  this.checkbox_ids.push(this.multipleSelection[i].tid); //   tid + 去重
                  this.checkbox_key.push(this.multipleSelection[i].id)
                  this.checkbox_ids = this.uniq(this.checkbox_ids);//去重后重新赋值  
                  this.checkbox_key = this.uniq(this.checkbox_key);//去重后重新赋值  
				                  
                  // this.checkbox_ids =  this.checkbox_ids.prototype.delRepeat; //去重
                  //同意补录数据shopid
                   this.supplement_shop_id.push(this.multipleSelection[i].shopid);
                }
                console.log(this.checkbox_key)
                console.log(this.checkbox_ids)

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
              
              fun_select_cainiaostyle(val){
              	if(val){
                    this.collect_data.param.type = val.join(',');
                    this.dataWa2.param.type = val.join(',');
              	}
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
                    this.collect_data.param.datetype = val;
                    this.dataWa2.param.datetype = val;//用于请求导出excel
                  }
                  console.log(this.collect_data.param.datetype)
                  if(this.collect_data.param.datetype==this.collect_data.param.accountype){
                  	this.$message({
						type: 'error',
						message: '不能选择同一种类型！',
					});
                  }
              },
              account_order_time_type(val){
              	if(val){
              		this.collect_data.param.accountype = val;
                    this.dataWa2.param.accountype = val;//用于请求导出excel
              	}
              	if(this.collect_data.param.datetype==this.collect_data.param.accountype){
                  	this.$message({
						type: 'error',
						message: '不能选择同一种类型！',
					});
                  }
              },
              //选择店铺
              filter_shop(val){
                  if(val){
                    this.collect_data.param.shopid = val;
                    this.dataWa2.param.shopid = val;//导出excel数据
                  }
              },
              //选择时间
              filter_date(time){ 
                if (time.length == 2){
                       this.collect_data.param.start_time = time[0]; //开始时间
                       this.collect_data.param.end_time = time[1]; // 结束时间
                       //导出excel
                       this.dataWa2.param.start_time = time[0]; //开始时间
                       this.dataWa2.param.end_time = time[1]; // 结束时间
                       
                }
              },
              enteraccount(time){
				
                if (time&&time.length == 2){
              		this.collect_data.param.accounstart_time = time[0]; //开始时间
                    this.collect_data.param.accounend_time = time[1]; // 结束时间
                    this.dataWa2.param.accounstart_time = time[0]; //开始时间
                    this.dataWa2.param.accounend_time = time[1]; // 结束时间
              	}else{
              		console.log('选择时')
					this.collect_data.param.accounstart_time =""; //开始时间
                    this.collect_data.param.accounend_time = ""; // 结束时间
                    this.dataWa2.param.accounstart_time = ""; //开始时间
                    this.dataWa2.param.accounend_time = ""; // 结束时间
              		
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
              //对账状态
              fun_account_situation(status){
                  this.collect_data.param.status = status;//设置状态
                  this.dataWa2.param.status = status;//设置状态
              },
              // 订单类型
              fun_order_type(type){
                  this.collect_data.param.order_check_status = type//设置订单类型 已对账 未对账
                  this.dataWa2.param.order_check_status = type//设置订单类型 已对账 未对账
              },
              //签收状态
              fun_order_sign_type(sign){
                  this.collect_data.param.signtimestats = sign//设置订单类型 已对账 未对账
                  this.dataWa2.param.signtimestats = sign//设置订单类型 已对账 未对账
              },
              //回款状态
              fun_return_money(status){
                  this.collect_data.param.remittance = status
                  this.dataWa2.param.remittance = status
              },

              //差异
              fun_difference(diff){
                  this.collect_data.param.difference = diff
                  this.dataWa2.param.difference = diff
              },
//            订单结转
			dialogFormVisible(){
				this.collect_detele.param =this.collect_data.param 
				this.collect_detele.param.tid  = (this.checkbox_ids).toString()
				this.axios.post('/dc-admin/gate/api',this.collect_detele,{type:'payload'}).then(res => {
				console.log(res)
				var res = res.data.code;
				try {
					if(res == 0) {
						this.$message({
							type: 'success',
							message: '结转成功',
						});
						this.collect_detele.param.tid  = '';
						this.requireData();
			
					} else {
						this.$message({
							type: 'error',
							message: '请您稍后再试！',
						});
					}
			
				} catch(err) {}
			})
			},//签收状态
              // fun_sign_state(status){
              //   if(status){
              //     this.collect_data.param.signtimestats = status;
              //     this.dataWa2.param.signtimestats = status;
              //   }
              // },
              //获取选中的字段类型进行存储
              fun_keywordsearch(key){
              	console.log(key)
                this.search_key_tmp = key;//将选中的类型进行存储
                this.collect_data.param.queryField = key;
                this.dataWa2.param.queryField = key;
                
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
				 if(this.collect_data.param.datetype==this.collect_data.param.accountype){
                  	this.$message({
						type: 'error',
						message: '不能选择同一种类型！',
					});
                  }else{
                  	
                /**
                 * 必须的筛选条件  店铺id 订单时间类型 开始时间 结束时间  页码 条数
                 */
                // this.collect_data.param.page = this.currentPage4;//页码
                // this.collect_data.param.pagesize = this.PageSize;//条数
	                if(select_shop_id && select_time_type && select_real_time) {
	                	if(this.keywordsearch != "" && this.inputSearch == "") {
	                		this.$message({
	                			type: 'error',
	                			message: '请输入关键字查询！',
	                		});
	                	} else {
	                		this.collect_data.param.tid = this.inputSearch;
	                		this.collect_data.param.remarks = this.inputSearch1;
	                		this.collect_data.param.cancel_reload = this.hexiao;
	                		this.collect_data.param.is_remarks = this.is_remarks;
	                		this.collect_data.param.stock_sum_no = this.inputstock_sum_no;
	                		this.collect_data.param.batch_no = this.inputbatch_no;
	                		this.requireData(); //
	                	}
	                }
	               }
	            },//查询所有的数据进行展示
              requireData(){
              	console.log('执行')
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
                          console.log(this.tableData3)
		                    if(this.tableData3.length!=0){
		                    	this.flag=true;
		                    }
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
              /**
               * 人工核销接口 获取选中的订单id,通过list进行post
               */
              cancelafterverification(rows){
                var value = '没有选中数据进行核销'
                var offset = 0
                var value1 = '选中的数据有已经核销的数据，请重新选择'

                /**
                * 获取选中元素的id并添加到列表中
                */
                for (var i=0;i<this.multipleSelection.length;i++){
                  offset += 60
                  if(this.multipleSelection[i].status == '1'){
                      this.open_message('选中的数据已经核销',offset)
                  }else{
                        //判断数组的长度
                        if(this.checkbox_ids.length > 0){
                              this.manual_cancellation_data.param.id = this.checkbox_ids; //数据赋值
                            }else{
                            this.open_message(value,offset)
                        }

                        //发送请求
                        this.axios.post('/dc-admin/gate/api',this.manual_cancellation_data,{type:'payload'}
                              ).then(res =>{
                                  
                                  try{
                                      var res_data = JSON.parse(res.data.data) 
                                      var title = '人工核销'
                                      var content_ok = '人工核销成功'  
                                      var content_err = '人工核销失败'  
                                      if (res_data.sucess == true){
                                        this.open_message_middle(title,content_ok)
                                        this.requireData();
                                      }else{
                                        this.open_message_middle(title,content_err)
                                      }
                                  }
                                  catch(err){                               
                                    this.open_message('错误,数据无法解析')
                                  }
                              });
                  }
                }
              },
              selectable(data){
              	console.log(data)
              },
              /** 
               * 同意补录
               */
              fun_consent_supplement(){
              	
                
                if(this.supplement_shop_id.length > 0){
                          this.consentsupplement_data.param.shopid = this.supplement_shop_id
                        }else{
                    // this.open_message(value,offset)
                    }
                this.axios.post('/dc-admin/gate/api',this.consentsupplement_data,{type:'payload'}
                          ).then(res =>{
                              var res_data = JSON.parse(res.data.data) 
                              //返回的状态是true 显示提交按钮
                              //返回false 隐藏确认按钮
                              if(res_data.success == true){
                                
                                 this.open_message(res_data.data.code)   
                              }else{
                                this.open_message(res_data.data.code)   
                              }
                          });
              },
                // 文件导出
                inportexcel: function() {
                  // var select_shop_id =this.shopid_value; // 店铺id
                  // var select_time_type = this.order_time_type; //时间类型
                  // var select_real_time = this.seleted_time; // 选中的时间 (包含开始时间 结束时间)
                  // var value = '时间未选中';
                  // var offset = 100;
                  // if(select_shop_id && select_time_type && select_real_time){
                      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                      }).then(() => {
                          this.excelData = this.tableData3 //你要导出的数据list。
                          this.export2Excel()
                      }).catch(() => {
                      
                      });
                  // }else{
                    // this.open_message(value,offset)
                  // }
                } ,
                export2Excel() {
                    var that = this;
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../../vendor/Export2Excel'); //这里必须使用绝对路径
                        const tHeader = ["店铺名称", "仓库", "系统订单编号", "外部订单编号", "条形码", "品名", "收货人", "收货人手机", "快递公司", "快递单号", "订货日期", "付款日期", "省", "市", "区", "签收状态", "签收时间","入账时间", "买家id", "买家留言", "客服备注", "发货数量","发货时间", "发货金额", "实收金额", "对账情况", "支付宝金额", "线下收入", "支付宝收入", "收入差异", "预收金额", "内部便签"]; // 导出的表头名
                        const filterVal = ["shopname", "storage_id", "tid","out_tid", "Barcode", "addresspro_name", "receiver_name", "receiver_mobile", "express", "express_no", "tid_time", "pay_time", "province", "city", "district", "signtimestats", "signtime","income_time", "buyer_id",  "buyer_message", "service_remarks", "send_num",  "delivery_time", "delivery_value",  "payment",  "ishandler", "account_balance", "total_support", "account_balance", "income_difference", "imount_in_advance", "inner_lable"]; // 导出的表头字段名
                        const list = that.excelData;
                        const data = that.formatJson(filterVal, list);
                        // let time1,time2 = '';
                        var value1 = '开始时间未选中';
                        var value2 = '结束时间未选中';
                        var offset = 100;
                        if(this.collect_data.param.start_time !== '') {//规范日期显示的
                            // time1 = that.moment(that.start).format('YYYY-MM-DD')
                            this.open_message(value1,offset)
                        }else{
                          time1 = this.collect_data.param.start_time;
                        }
                        if(this.collect_data.param.end_time !== '') {
                            // time2 = that.moment(that.end).format('YYYY-MM-DD')
                            this.open_message(value2,offset)
                        }else{
                           time2 = this.collect_data.param.end_time;
                        }
                        if(this.collect_data.param.start_time.length > 0){
                          export_json_to_excel(tHeader, data, `[${this.collect_data.param.start_time}-${this.collect_data.param.end_time}]核销excel`);// 导出的表格名称，根据需要自己命名
                        }
                        
                    })
                },
                formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))
                },

                /**
                 * 导出订单
                 */
                DaoChu() {

					if(this.dataWa2.param.shopid == '') {
						this.$message({
							type: 'error',
							message: '请选择查询店铺'
						});
						return;
					} else if(this.dataWa2.param.datetype == '') {
						this.$message({
							type: 'error',
							message: '请填选择时间类型'
						});
						return;
					} else if(this.dataWa2.param.start_time == '' || this.dataWa2.param.end_time == '') {
						this.$message({
							type: 'error',
							message: '请填写查询日期'
						});
						return;
					} else if(this.keywordsearch != "" && this.inputSearch == "") {
						this.$message({
							type: 'error',
							message: '请输入关键字查询！',
						});
					} else {
						this.dataWa2.param.tid = this.inputSearch;
	                	this.dataWa2.param.stock_sum_no = this.inputstock_sum_no;
	                	this.dataWa2.param.batch_no = this.inputbatch_no;
						console.log(this.dataWa2.param)
						var downloadURL = "http://" + this.$store.state.xianshang + ":8021/home/Resource/exportData";
						var form = $("<form>"); //定义一个form表单 
						form.attr('style', 'display:none'); //在form表单中添加查询参数 
						form.attr('target', '');
						form.attr('method', 'get');
						form.attr('action', downloadURL);
				
						$('body').append(form); //将表单放置在web中 
				
						for(let i in this.dataWa2.param) {
							var a = $('<input>');
							a.attr('type', 'hidden');
							a.attr('name', i);
							a.attr('value', this.dataWa2.param[i]);
							form.append(a); //将查询参数控件提交到表单上 
						}
						form.submit();
				
					}
				
				},/**
               * 格式化table中的数值
               */

              //计算销售金额
               formatter_count_act(row){
                    //初始化的时候数据为空，使用对象点的方法会报错
                    try{
                      //发货金额：销售单价 * 数量
                      if(row.sell_price!=""&&row.send_num!=""){
                      	row.send_money = parseFloat(row.sell_price) *  parseFloat(row.send_num)
                      	return row.send_money
                      }else{
                      	row.send_money = parseFloat(row.sell_price)
                      }
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
              formatter_pre_income(row) {
              		try {
              			if(row.income == '') {
              				row.income = 0
              			} else if(row.send_num != "" && row.sell_price != "") {
              				return row.income - (parseFloat(row.sell_price) * parseFloat(row.send_num))
              			} else {
              				return row.income - parseFloat(row.sell_price)
              				}
              			} catch(err) {

              			}
              		},//支付宝收入
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
                this.collect_data.param.status = '1';//设置状态 默认已对账
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
  .el-range__close-icon{
  	display: none !important;
  }
</style>
