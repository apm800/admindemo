<template>
<div>
    <div class="TallyTop" v-checkup="'order:operation:list'">
       <!-- 店铺名称 Start -->
       <span class="mustFill">*</span>
        <div class="TallySousuo" >
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
        <div class="TallySousuo">
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
        <div class="TallySousuo">
          
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
        <div class="TallySousuo">
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
        <div class="TallySousuo">
            <span>仓库名称：</span>
            <el-select v-model="warehouse_model" filterable style="width: 150px" placeholder="请选择仓库" @change='fun_select_ware(warehouse_model)'>
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
        <!-- <div class="TallySousuo">
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
        <div class="TallySousuo">
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
        <div class="TallySousuo">
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
        <div class="TallySousuo">
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
        <div class="TallySousuo">
            <el-input style='max-width: 180px;' placeholder="输入关键字查询"  v-model="inputSearch" class="input-with-select">
              <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
            </el-input>
            
            <!--查询按钮-->
            <span style="margin: 20px 10px 0 20px">
                <el-button type="primary" @click="OrderSearch">查询</el-button>
            </span>
        </div>
        <!-- 
        <div class="TallySousuo">
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
            <el-button size="mini" type="primary" v-show=falg @click="bookkeeping_registration" v-checkup="'order:all:submit'">全部记账登记</el-button>
            <!--<el-button size="mini" type="warning" @click="toLead" v-checkup="'order:sys:menu:add1'">菜鸟订单导入</el-button>-->
            <el-button size="mini" type="danger" @click="delete_menu" v-checkup="'order:sys:menu:add'">删除</el-button>
<!-- <el-button size="mini" type="danger" @click="" v-checkup="':sys:menu:add'">删除</el-button> -->
            <el-button size="mini" type="primary" @click="order_mark" v-checkup="'order:all:submit'">订单备注</el-button>
        </div>
        
        
        <div class="active" :class="{activespecial:flag}" v-if='cangkuName!=""'><div><el-button v-for="item in cangkuName" style="display: inline-block; margin:5px 15px 5px 0;" size="mini" @click="warehouse(item.storage_id)">{{item.name}}:{{item.number}}</el-button></div>
  <el-button type="warning" plain  @click='spreadbtn' style='margin-top: 5px;'>{{flag?'收起':'展开'}}</el-button>
        
        </div>
    </div>

    <div id="TallyBut">
        <!--  -->
        <div id="TallyButcontent">
				
                <el-table
                v-loading="loading1"
                element-loading-text="拼命加载订单数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                
                :row-key="getRowKeys"
                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @row-click = 'modification'
                @selection-change="handleSelectionChange">
                    <!--选择器-->
                    <el-table-column
                      type="selection"
                      fixed='left'
                      width="55">
                    </el-table-column>
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
                :page-sizes="[10, 20, 30,50,100,500]"
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
                style="width: 100%">
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
                      prop="storage_name"
                      label="仓库名称"
                      show-overflow-tooltip>
                    </el-table-column> 
                    	                    
                    <el-table-column
                      prop="storage_id"
                      label="仓库编码"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <!--
                    <el-table-column
                      prop=" "
                      label="库位"
                      show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column
                      prop=" "
                      label="批次"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop=" "
                      label="生产日期"
                      show-overflow-tooltip>
                    </el-table-column>  
                    <el-table-column
                      prop=" "
                      label="失效日期"
                      show-overflow-tooltip>
                    </el-table-column>   
                    -->                                                          
              </el-table>
            <!--详情E-->

            <!-- 弹出框  -->
            <!-- 
            <el-dialog  :visible.sync="addDialog1">
              
                
                <div slot="footer" class="dialog-footer">
                    <el-button  v-if="addType" @click="quxiaoForm()">取消</el-button>
                    <el-button  v-if="!addType" @click="resetForm('addWare')">重置</el-button>
                    <el-button v-if="!addType" type="primary" @click="submitForm('addWare')">确定</el-button>
                    <el-button v-if="addType" type="primary" @click="modiForm('addWare')">确定</el-button>
                </div>
                
            </el-dialog>
            -->
            <!--弹出框 E-->
        </div>

        
             <!-- 弹出框 -->
              <el-dialog title="导入菜鸟订单表格" :visible.sync="addDialog">
              <!--
                <span style="display:block">
                    账单模版下载： <a href="./aliplayWater.xlsx" download="账单模板">下载</a>
                </span>
                -->
                <!-- <a href="javascript:;" class="file">选择文件 -->

                    <input style="margin-bottom:20px;" type="file" name="" id="" @change="upload">
                    <!-- <span style="">{{fileList}}</span> -->
                    
                <!-- </a> -->

                <el-alert
                  title="导入格式仅支持  ‘.csv’"
                  type="warning"
                  show-icon
                  :closable="false">
                </el-alert>
                <!-- <span style="display:block">退款单模版下载：</span>
                <a href="javascript:;" class="file">选择文件
                    <input type="file" name="" id="" @change="ceshi">
                    <span style="">{{fileList1}}</span>
                </a> -->
                  <div slot="footer">
                  
                      <el-button type="primary" @click="uploadConfirm()">确认</el-button>
                      <el-button @click="uploadCancel()">取消</el-button>
                  </div>

            </el-dialog>
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
                    <el-button type="primary" @click="subEnter">确 定</el-button>
                </div>
        	</el-dialog>
        	
        	
        	<el-dialog title="记账登记备注" :visible.sync="account_select_ware">
                <el-input
                autosize
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :rows="4"
                placeholder="请输入内容"
                v-model="account_textarea">
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="account_select_ware = false">取 消</el-button>
                    <el-button type="primary" @click="account_subEnter">确 定</el-button>
                </div>
        	</el-dialog>


        <div id="TallyButright" style="display: none"></div>
        <div id="TallyButdiv1" style="display: none"></div>
        <div id="TallyButbottom" style="display: none"></div>
    </div>



</div>
</template>

<script>
    export default {
        data() {
          return {
          		falg:false,
          		addDialog_select_ware:false,
          		account_select_ware:false,
          		account_textarea:'',
                textarea:'',
                //确认导入
                flag:false,
                dataWa1:{
                  apiName:'tradeaddmark',
                  param:{
                  	
                  }
                },
                // 是否是菜鸟
                orcainiaodata:[
                  {value:1,
                    name:'是',},
                  {value:0,
                    name:'否',}
                ],
                loading1:0,

                /*字段  Start*/
                // shopname : '',
                // storage_id : '',
                // tid : '',
                // out_tid : '',
                // Barcode : '',
                // addresspro_name : '',
                // receiver_name : '',
                // receiver_mobile : '',
                // express : '',
                // express_no : '',
                // tid_time : '',
                // pay_time : '',
                // province : '',
                // city : '',
                // district : '',
                // signtimestats : '',
                // signtime : '',
                // buyer_id : '',
                // buyer_message : '',
                // service_remarks : '',
                // send_num : '',
                // delivery_time : '',
                // delivery_value : '',
                // payment : '',
                // status : '',
                // account_balance : '',
                // total_support : '',
                // account_balance : '',
                // income_difference : '',
                // imount_in_advance : '',
                // inner_lable : '',
                /*字段  End*/

                // addDialog1:false,//弹出框默认关闭

                //菜鸟订单导入 弹出框
                addDialog:false,
                //菜鸟订单url
                url:'http://'+this.$store.state.xianshang+':8020/api/upload',
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
                "reference_price_paid": "49.00",
                "type": "正常订单",
                "tid_time": "2018-04-17 16:14:27",
                "pay_time": "2018-04-17 16:15:01",
                "delivery_time": "2018-04-18 11:36:01",
                "service_remarks": "",
                /** 字段 End */

                inputSearch:'',//输入查询的内容
                search_key_tmp:'',// 存储搜索的类型

                /**
                 * 分页参数
                 */
                //默认当前页码是第一页
                currentPage4: 1,
                //总数
                totalPage: 0,
                //默认 每页多少条
                PageSize:10,

                fileList:'', 
                
                //菜鸟订单导入的保存
                config:'',
                formData:'',


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
                }, {
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
                //详情数据
                tableData_detail:[],
				cangkuName:[],//cangku

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
                      page:'',//分多少页
                      pagesize:'10'//分页大小
                    }
                },

                //记账数据（结果集登记）
                collect_data_all:{
                  apiName:'order_temp_data_all',
                  param:{
                      shopid:'',
                      storage_id:'',//仓库
                      begin_time:'',
                      end_time:'',
                      remake:'',
                      order_type:'',//订单类型
                      other_type:'',//1外部订单号 2买家id 3系统订单编号 4手机人 5收件人手机
                      key_world:'',
                      page:'',//分多少页
                      pagesize:'10'//分页大小
                    }
                },
                //订单记账  删除  提交
                order_flag_data:{
                    apiName:'orderchangestatus',
                    param:{
                        action_type:'',//action_type 操作类型 1记账 2提交 3删除
                        tids:'',//删除的订单标识 多个用逗号分隔 比：S1804250000073,S1804250003673
          
                    }
                },
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
        	spreadbtn(){
        		this.flag = !this.flag
        	},
        	
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
              	console.log(val)
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
                    this.collect_data_all.param.date_type = val;
                  	
                  }
              },
              //选择店铺
              filter_shop(val){
                  
                  if(val){
                    this.collect_data.param.shopid = val;
                    this.collect_data_all.param.shopid = val;
                    
                  }
              },
              //选择仓库
              fun_select_ware(val){
                  if(val){
                    this.collect_data.param.storage_id = val;
                    this.collect_data_all.param.storage_id = val;
                    
                  }
              },
              //选择时间
              filter_date(time){ 
                if (time.length == 2){
                       this.collect_data.param.begin_time = time[0]; //开始时间
                       this.collect_data.param.end_time = time[1]; // 结束时间
                       this.collect_data_all.param.begin_time = time[0]; //开始时间
                       this.collect_data_all.param.end_time = time[1]; // 结束时间
                }
              },
              //对账状态
              fun_account_situation(status){
                if(status){
                  this.collect_data.param.status = status;//设置状态
                  this.collect_data_all.param.status = status;//设置状态
                }
              },
              // 订单类型
              fun_order_type(type){
                if(type){
                  this.collect_data.param.order_type = type//设置订单类型 已对账 未对账
                  this.collect_data_all.param.order_type = type//设置订单类型 已对账 未对账
                }
              },
//            订单备注
              order_mark(){
              	if(this.supplement_tid_ids==''){
              		this.$message({
                        type: 'error',
                        message: "请先选择订单"
                    });	
              	}else{
              		this.addDialog_select_ware=true;
              	}
              	
              },
			//弹出框并且确认导入s
            subEnter(e){
                if(this.textarea==''){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }
                
                //判断备注是不是只有回车或者空格
                var reg = /([^\s])/g;
                var arr = this.textarea.match(reg);
                if(arr===null){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }

				this.dataWa1.param.tids=this.supplement_tid_ids.toString();
                this.dataWa1.param.readme = this.textarea;
                console.log(this.dataWa1)
                this.axios.post('/dc-admin/gate/api',
                this.dataWa1,
                {type: 'payload'}
                ).then(res =>{
                	console.log(res)
                    var msg = JSON.parse(res.data.data);
                    console.log(msg)
                    if(msg.code==1){
                        this.$message({
                            type: 'success',
                            message: '备注成功！'
                        });
                    }else{
                        msg = msg.msg
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    }
                    this.addDialog_select_ware = false;
                    this.textarea='';
                });

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
              //查询按钮，点击进行查询
              OrderSearch(){
                this.tableData_detail = [];
              	if(this.shopid_value==""){
              		this.$message({
                        type: 'error',
                        message: "请填选择店铺ID"
                    });
                    return;
              	}else{
              		
              	}
                this.collect_data.param.pagesize = this.PageSize;
                
                var select_shop_id = this.collect_data.param.shopid; // 店铺id
                // var select_time_type = this.order_time_type; //时间类型
                // var select_real_time = this.seleted_time; // 选中的时间 (包含开始时间 结束时间)
    
                /**
                 * 必须的筛选条件  店铺id 订单时间类型 开始时间 结束时间  页码 条数
                 */
                // if(select_shop_id && select_time_type && select_real_time){
                //   this.collect_data.param.page = this.currentPage4;//页码
                //   this.collect_data.param.pagesize = this.PageSize;//条数
                //   //按照关键字进行查询 需要对不同的进行过滤
                if( select_shop_id){
                  if(this.search_key_tmp){
                    this.collect_data.param.key_world = this.inputSearch;//输入的字段
                    this.collect_data.param.other_type = this.search_key_tmp;//筛选的类型
                    // this.collect_data.param.pagesize = '1';
                    // this.collect_data.param.page = '1';
                  }
                  this.requireData();//
                }  
                //   this.requireData();//
                // }
              },
              warehouse(res){
              	console.log(res)
              	var that = this;
                this.collect_data.param.storage_id = res;
                this.requireData();
                setTimeout(function(){
                	that.collect_data.param.storage_id = '';
//              	console.log(that.collect_data)
                },500)
                this.collect_data_all.param.storage_id = res;
                console.log(this.collect_data_all.param)
              	
              },
              //查询所有的数据进行展示
              requireData(){
                    this.loading1 = 1;
                    this.collect_data.param.action_type = '0'
                   this.axios.post('/dc-admin/gate/api',this.collect_data,{type:'payload'}
                    ).then(res =>{
                      var json_data =  JSON.parse(res.data.data)  //解析数据    
                      // this.totalPage = json_data.result.data.length;//对列表长度赋值
                        try{
                          // this.totalPage = json_data.result.data.length;//对列表长度赋值
                          this.tableData3 = json_data.data.result;
                          this.cangkuName = json_data.data.data;
                          var i;
                          var warehouse_json={};
                          console.log(this.tableData3)
                          if(this.tableData3!=""){
                          	this.falg = true
                          }else{
                          	this.falg = false
                          }
                          for( i in this.warehouse_options){
                          	warehouse_json[this.warehouse_options[i].code] = this.warehouse_options[i].name;
                          }
//                        var warehouse_json = res;
//                        console.log(warehouse_json)
                          for (i in this.cangkuName){
                          	var data = this.cangkuName[i].storage_id
                          	this.cangkuName[i].name = warehouse_json[data];
                          	if(this.cangkuName[i].name==undefined){
                          		this.cangkuName[i].name=this.cangkuName[i].storage_id
                          	}
                          }
                          console.log(this.cangkuName)
                          
                          this.totalPage = json_data.data.recordsNumber;//数据总数
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
                    if(this.checkbox_ids.length > 0){
                          this.manual_cancellation_data.param.id = this.checkbox_ids
                        }else{
                    this.open_message(value,offset)
                    }
                    this.axios.post('/dc-admin/gate/api',this.manual_cancellation_data,{type:'payload'}
                          ).then(res =>{
                              try{
                                  var res_data = JSON.parse(res.data.data) 
                                  var title = '人工核销'
                                  var content_ok = '人工核销成功'  
                                  var content_err = '人工核销失败'  
                                  if (res_data.data.stats == '\u6210\u529f'){
                                    this.open_message_middle(title,content_ok)
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

				account_subEnter(){
				if(this.account_textarea==''){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    return;
                }
                
                //判断备注是不是只有回车或者空格
                var reg = /([^\s])/g;
                var arr = this.account_textarea.match(reg);
                if(arr===null){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    return;
                }
              	this.account_select_ware = false;	
                this.$message({
		          message: '请稍等，正在处理',
		          type: 'warning'
		        });
                this.collect_data_all.param.action_type = '1';
                this.collect_data_all.param.remake = this.account_textarea;
					
                    this.axios.post('/dc-admin/gate/api',this.collect_data_all,{type:'payload'}).then(res =>{
                        var res_data = JSON.parse(res.data.data) 
                        console.log(res_data)
                        try{
                          var res_data = JSON.parse(res.data.data) 
                            //返回数据为记账成功的数据
                            if(res_data.code = '1'){
                                this.$message({
                                    type: 'success',
                                    message: '记账成功'
                                });
                                this.OrderSearch();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '记账失败'
                                });
                            }
                        }
                        catch(err){      
                            this.$message({
                                type: 'error',
                                message: '错误,数据无法解析'
                            }); 
                        }
                    });
                
				},
              /**
               *  记账登记
               *  */
              bookkeeping_registration(){
//            	备注弹窗
				if(this.shopid_value==""){
              		this.$message({
                        type: 'error',
                        message: "请填选择店铺ID"
                    });
                    return;
              	}else{
              		this.account_select_ware = true;	
              	}
                

  

              },

              /** 
               * 菜鸟订单导入
               */
              cainiao_input(){

              },

              // 上传按钮
              toLead(){
                this.addDialog=true;
                this.fileList='';
              },
              /** 
               * 供应链删除
               */
              delete_menu(){
                this.$confirm('此操作将永久删除选中的数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.delete_menu1();
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });      
                  return;    
                });
              },
              delete_menu1(){
                this.order_flag_data.param.tids = this.supplement_tid_ids.join(',') //拼接字符串 tids 中间用逗号隔开
                this.order_flag_data.param.action_type = '3' //3代表删除
                if (this.supplement_tid_ids.length==0) {
                    this.$message({
                        type: 'error',
                        message: '未选中任何数据'
                    });
                }else{
                    //登记记账请求
                    this.axios.post('/dc-admin/gate/api',this.order_flag_data,{type:'payload'}).then(res =>{
                          if (res.data.code == 0) {
                              this.$message({
                                  type: 'success',
                                  message: '删除成功!'
                              });
                          this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
                          } else {
                              var error = '';
                              if (res.data.msg) {
                                error = res.data.msg;
                              }else{
                                error = '服务器超时，请您重新登录'
                              }
                              
                              this.$message({
                                  type: 'error',
                                  message: error
                              });
                          }
                    });
                }
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
                        const tHeader = ["店铺名称", "仓库", "系统订单编号", "外部订单编号", "条形码", "品名", "收货人", "收货人手机", "快递公司", "快递单号", "订货日期", "付款日期", "省", "市", "区", "签收状态", "签收时间", "买家id", "买家留言", "客服备注", "发货数量","发货时间", "发货金额", "实收金额", "对账情况", "支付宝金额", "线下收入", "支付宝收入", "收入差异", "预收金额", "内部便签"]; // 导出的表头名
                        const filterVal = ["shopname", "storage_id", "tid","out_tid", "Barcode", "addresspro_name", "receiver_name", "receiver_mobile", "express", "express_no", "tid_time", "pay_time", "province", "city", "district", "signtimestats", "signtime", "buyer_id",  "buyer_message", "service_remarks", "send_num",  "delivery_time", "delivery_value",  "payment",  "status", "account_balance", "total_support", "account_balance", "income_difference", "imount_in_advance", "inner_lable"]; // 导出的表头字段名
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
                 * 菜鸟订单上传
                 */
                //上传按钮
              upload(e) {
                var a = e.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
                if(postf!='.csv'){
                    this.$message.error('上传文件只能是csv格式!');
                    return;
                }

                this.fileList = '';
                this.fileList = e.target.files[0].name;
                var formData = new FormData();
                for (var i = 0; i < e.target.files.length; i++) {
                    var file = e.target.files[i];
                    formData.append("file",file);
                }
                formData.append('stype',0);
                let config = {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                    type:'payload',
                }
                this.config = config
                this.formData = formData

                // 向接口发送请求
                // this.axios.post(this.url,formData,config).then(res=>{
                //   if (res.data.message == 'ok'){
                //     var mes = '上传成功'
                //      this.$message({
                //         type: 'success',
                //         message: mes,
                //     });
                //   }
                   
                // })
              },
              // 每一行的编号
              getRowKeys(row){
                // return row.out_tid;
              },

              //取消上传
              uploadCancel(){
                this.addDialog = false;
              },

              //确认上传
              uploadConfirm(){
                if(this.fileList==''){
                      this.$message({
                          type: 'error',
                          message: '上传文件为空',
                      });
                }else{
                    // 向接口发送请求
                    this.axios.post(this.url,this.formData,this.config).then(res=>{
                      if (res.data.message == 'ok'){
                        var mes = '上传成功'
                        this.$message({
                            type: 'success',
                            message: mes,
                        });
                      }else{
                        this.$message({
                            type: 'error',
                            message: res.data.message,
                        });
                      }
                    })
                }
              }





        },
        mounted() {
            this.$store.commit("changeSize",{wai:'TallyBut',rightBottom:'TallyButdiv1',right:'TallyButright',bottom:'TallyButbottom',content:'TallyButcontent'});
            // this.requireData(this.currentPage4,this.PageSize);//进来就获取数据
            this.get_shop_list();
            this.get_ware_list();
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
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .TallyTop{
    display: inline-block;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .TallySousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
  .TallyTitle{
    height: 40px;
    line-height: 40px;
  }

    .file {
      position: relative;
      display: inline-block;
      background: #1ab394;
      border: 1px solid #1ab394;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #fff;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      margin: 10px 0 20px 0;
  }
  .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .file:hover {
      background: #1ab394;
      border-color: #1ab394;
      color: #fff;
      text-decoration: none;
  }
   .TallyTop .active{
  	 margin-top: 30px;
  	 display: flex;
  	 justify-content: space-between;
  	 height: 40px;
  	 overflow: hidden;
  }
  .activespecial{
  	 height: auto;
  	
  }
</style>
