<template>
<div>
    <div class="FWasteTop">
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
      <el-collapse v-model="activeNames" @change="activeZuo">
        <el-collapse-item :title="activeCont" name="1">

        <div class="FWasteSousuo">
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
        <!--  -->
        <div class="FWasteSousuo">
            <span class="mustFill">*</span>
            <span>匹配结果：</span>
            <el-select v-model="dataWa.param.matching" placeholder="请选择匹配结果" @change='matchingChang'>
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--<div class="FWasteSousuo">
            <span class="mustFill">*</span>
            <span>账单来源：</span>
            <el-select v-model="dataWa.param.recodes" placeholder="请选择账单来源" @change='matchingChang'>
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>-->
        
        <!--  -->
        <div class="FWasteSousuo">
            <span class="mustFill">*</span>
          <!--<el-select v-model="value5" placeholder="请选择入账时间">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
          </el-select>：-->
          <span>请选择入账时间：</span>
          <el-date-picker @change='dateChang'
            v-model="value6"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!-- 日期 -->
        <div class="FWasteSousuo">
        </div>
        <br>

        <div class="FWasteSousuo">
          <el-select v-model="value4.value" placeholder="请选择" @change="value4Chang">
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
        <span style="margin: 20px 10px 0 20px"  v-checkup="'alipay:list'">
            <el-button type="primary" @click="onLine">查询</el-button>
        </span>
        <!--  -->

        <div style="margin: 20px 10px 0 0">
            <el-button size="mini" type="primary" @click="Dowdata" v-checkup="'alipay:down'">下载支付宝流水</el-button>
            <el-button size="mini" type="warning" @click="toLead">表格导入</el-button>
            <el-button size="mini" type="danger" @click="deleteTable" v-if="flag">删除</el-button>
            <el-button size="mini" type="warning" @click="waterbilbtn">导出</el-button>
			<!-- <el-button size="mini" type="danger" @click="" v-checkup="':sys:menu:add'">删除</el-button> -->
        </div>
      <!-- /折叠检索条件.
        el-collapse
        el-collapse
       -->
        </el-collapse-item>
      </el-collapse>
      <!--数据总数 -->

      <div v-if='sum_data.result'>
          <span style="font-weight:900;">总数：</span>{{all_count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="font-weight:900;">收入金额汇总：￥</span>{{all_insum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="font-weight:900;">支出金额汇总：￥</span>{{all_outsum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
        <!--  -->
        <div id="FWasteButcontent">

                <el-table
                v-loading="loading1"
                element-loading-text="拼命加载支付宝流水数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"


                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                    <el-table-column
                      label="序号"
                      type="index"
                      width="45">
                    </el-table-column>
                    <el-table-column
                      prop="trade_num"
                      label="支付宝交易号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="alipay_order_num"
                      label="支付宝流水号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="merchant_order_no"
                      :formatter = 'merc_order_no'
                      label="外部订单编号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="merchant_order_no"
                      label="商户订单号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="trade_name"
                      label="商品名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="create_time"
                      label="入账时间"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="opposite_user_id"
                      label="对方账号"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="opposite_name"
                      label="对方名称"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="total_support"
                      label="收入金额
                      （xx）元"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="toltal_expenditure"
                      label="支出金额
                      （xx）元"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="account_balance"
                      label="账户余额
                      （xx）元"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="channel_disbursement"
                      label="交易渠道"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="alipay_type"
                      label="业务类型"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="remarks"
                      label="备注"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="matching"
                      :formatter = 'matchingFn'
                      label="匹配结果"
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
        <!-- 弹出框 -->
              <el-dialog title="导入表格" :visible.sync="addDialog" @close="Closes">
                <span style="display:block">
                    账单模版下载： <a href="http://admin.blueiec.com/bfecadmin/download/template/aliplayWater.csv" download="账单模板">下载</a>
                </span>
                <div class="FWasteSousuo">
                    <span class="mustFill">*</span>
                    <span>店铺名称：</span>
                    <el-select v-model="valueDaoru" placeholder="请选择店铺名">
                        <el-option
                          v-for="item in shopName"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                    </el-select>
                </div>

                <a href="javascript:;" class="file" >选择文件
                    <input type="file" name="" id="" v-if='falg' @change="ceshi">
                </a>
                <span style="">{{fileList}}</span>
            	<el-button size="mini" type="primary" @click="daoru"  class='daoru'>导入</el-button>
               
                <!-- <span style="display:block">退款单模版下载：</span>
                <a href="javascript:;" class="file">选择文件
                    <input type="file" name="" id="" @change="ceshi">
                    <span style="">{{fileList1}}</span>
                </a> -->
            </el-dialog>

        <div id="FWasteButright" style="display: none"></div>
        <div id="FWasteButdiv1" style="display: none"></div>
        <div id="FWasteButbottom" style="display: none"></div>
</div>

</template>

<script>
    export default {
        data() {
          return {
                loading1:0,
                // 上传进度
                headerss:{
                  // 'Access-Control-Allow-Origin':'*',
                  'Content-Type': 'multipart/form-data'
                  },
//              url:'http://'+this.$store.state.xianshang+':8021/home/Resource/uploaddata',
                // url:'http://172.18.62.176:8072/bfec-erp/anon/importExcel',
                //文件列表
                fileList:'',
                fileList1:'',
                //弹出框
                addDialog:false,
                // 总条数
                pageCon:0,
                falg:true,
                // 默认展开操作选项
                activeNames: ['1'],
                activeCont:'折叠页面操作选项',
                // 店铺名称
                value1:'',
                valueDaoru:'',
                formData:'',
                shopName: [],
                // 仓库名称
                value2:'',
                options2: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '已匹配'
                }, {
                    value: '0',
                    label: '未匹配'
                }],
                // 订单类型
                value3:'',
                options3: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '销售订单'
                }, {
                    value: '选项3',
                    label: '手工订单'
                }, {
                    value: '选项4',
                    label: '补发订单'
                }, {
                    value: '选项5',
                    label: '换货订单'
                }, {
                    value: '选项6',
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
                value5:'入账时间',
                // 选项1
                options5: [{
                    value: '选项1',
                    label: '入账时间'
                }],
                // 账单来源
                options6: [{
                    value: "0",
                    label: '支付宝账单'
                }, {
                    value: "1",
                    label: '线下账单'
                }],
                //分页
                currentPage4: 1,
                // 搜搜
                input21:'',
				flag:false,
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
                // 时间
                value6: '',
                value7: '',

                //统计
                sum_data:'',
                all_count:'',
                all_insum:'',
                all_outsum:'',

                tableData3: [],
                // 支付宝流水的接口
                dataWa:{
                  apiName:'alipayQuery',
                  param:{
                      recodes:1,
                      shopid:'',
                      pages:1,
                      pagesize:10,
                      create_time_start:'',
                      create_time_end:'',
                      tid:'',
                      out_tid:'',
                      buyer_id:'',
                      receiver_name:'',
                      receiver_mobile:'',
                      matching:'',
                  }
                },
                // 支付宝流水的接口
                dataWaDelete:{
                  apiName:'deldata',
                  param:{
                      recodes:1,
                      shopid:'',
                      pages:1,
                      pagesize:10,
                      create_time_start:'',
                      create_time_end:'',
                      tid:'',
                      out_tid:'',
                      buyer_id:'',
                      receiver_name:'',
                      receiver_mobile:'',
                      matching:'',
                  }
                },
                
                
                // 下载支付宝流水的接口
                dataWa1:{
                  apiName:'dowAliwater',
                  param:{
                      StartTime:'',
                      EndTime:'',
                      shopid:'',
                  }
                },
                dataDowload:{
                  apiName:'aliUpload',
                }
            }
        },
        methods: {
              //上传按钮
              ceshi(e) {
              	console.log(e)
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
                console.log(this.fileList)
                var formData = new FormData();
                for (var i = 0; i < e.target.files.length; i++) {
                    var file = e.target.files[i];
                    formData.append(""+i+"",file);
                }
                formData.append('stype',0);
                this.formData = formData;
                console.log(this.formData)
                
              },
              daoru(){
                if(this.valueDaoru==''){
                    this.$message({
                        type: 'error',
                        message: '请选择店铺'
                    });
                    return
                }

              	if(this.fileList==''){
              		this.$message.error('请先选择文件!');
              	}else{
	                let config = {
	                    headers: {
	                    'Content-Type': 'multipart/form-data'
	                    },
	                    type:'payload',
	                }
	                this.addDialog=false;
	                const loading = this.$loading({
			          lock: true,
			          text: '正在导入中,请稍等',
			          spinner: 'el-icon-loading',
			          background: 'rgba(0, 0, 0, 0.6)'
			        });
			        this.axios.post('http://'+this.$store.state.xianshang+':8021/home/Resource/uploaddata?shopid='+this.valueDaoru,this.formData,config).then(res=>{
	                	loading.close();
	                	this.valueDaoru='';
	                	this.fileList='';
	                	this.falg = false;
	                	console.log(res.data.code)
	                	if(res.data.code=='上传成功'){
	                		this.$message({
	                		    type: 'success',
	                		    message: res.data.code
	                		});
	                	}else{
	                		this.$message.error(res.data.code);
	                	}
	                })	
              	}
              },
              
              //更改搜索条件的字段清空之前的搜索条件
              value4Chang(a){
                this.dataWa.param.tid = 
                this.dataWa.param.out_tid =
                this.dataWa.param.buyer_id = 
                this.dataWa.param.receiver_mobile = 
                this.dataWa.param.receiver_name = '';
              },
              beforeAvatarUpload(file) {
              },
              handleRemove(file, fileList) {
              },
              handlePreview(file) {
              },
              handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
              },
              beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
              },
              // 上传按钮
              toLead(){
                	this.addDialog=true;
                	this.fileList='';
	               	this.falg = true;
                	
              },
//            弹框关闭
              Closes(){
	            this.falg = false;
              },
              // 收起页面查询条件
              activeZuo(val){
                  if(val.length==0){
                    this.activeCont='展开页面操作选项'
                  }else if(val.length==1){
                    this.activeCont='折叠页面操作选项'
                  }
              },

              onSubmit() {
              },
              handleSelectionChange(val) {
                this.multipleSelection = val;
              },
              // 分页方法        
              handleSizeChange(val) {
                this.dataWa.param.pagesize = val;
                this.requireData()
              },
              handleCurrentChange(val) {
                this.dataWa.param.pages = val;
                this.requireData()
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
              //请求
              requireData(){
                this.loading1 = 1;
                // 获取页面数据
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                  ).then(res =>{
                    this.tableData3 = JSON.parse(res.data.data);
                    this.tableData3 = this.tableData3.result.data;
                    console.log(this.tableData3)
                    if(this.tableData3.length!=0){
                    	this.flag=true;
                    }
                    var res_data = JSON.parse(res.data.data);
                    this.pageCon = JSON.parse(res.data.data)
                    // // 总条数
                    this.pageCon = parseInt(this.pageCon.result.count)
                    this.loading1 = 0;

                    this.sum_data = res_data;//获取数据的总数
					console.log(res_data.result)
                    try{
                        this.all_count = res_data.result.count;
                        this.all_insum = res_data.result.count_sum[0].in_sum;
                        this.all_outsum = res_data.result.count_sum[0].out_sum;
                    }catch(err){

                    }
                  
                      
                });
              },
              //外部订单号去掉前五位
              merc_order_no(res){
                // 去掉前五个
                try{
                  return res.merchant_order_no.replace("T200P","");;
                }catch(err){
                  return '';
                }
              },
              // 匹配结果
              matchingFn(res){
                if(res.matching==0){
                  return '未匹配';
                }else{
                  return '已匹配';
                }
              },
              //选择店铺
              shopFn(data){
                this.dataWa.param.shopid = data;
                this.dataWa1.param.shopid = data;
              },
              // 选择匹配结果
              matchingChang(data){
              },
              //查询线上
              onLine(){
                var a = this.value4.value;
                this.dataWa.param[a] = this.input21;
                if(this.dataWa.param.shopid==''){
                    this.$message({
                        type: 'error',
                        message: '请选择查询店铺'
                    });
                }else if(this.dataWa.param.recodes==''){
                    this.$message({
                        type: 'error',
                        message: '请填选择账单来源'
                    });
                }else if(this.dataWa.param.create_time_start=='' || this.dataWa.param.create_time_end==''){
                    this.$message({
                        type: 'error',
                        message: '请填写查询日期'
                    });
                }else{
                  this.requireData();
                  this.dataWa.param.pages=1;
                  this.dataWa1.param.pages=1;
                }
              },
//            删除
				deleteTable(){
					this.dataWaDelete.param = this.dataWa.param;
					this.axios.post('/dc-admin/gate/api', 
		                this.dataWaDelete,
		                {type: 'payload'}
		                 ).then(res =>{
		                 	console.log(res)
		                 	var res = res.data.code;
		                    try{
		                    	if(res==0){
		                          this.$message({
		                               type: 'success',
		                              message: '删除成功',
		                          });
								this.flag=false;
                  				this.requireData();
		                          
		                      }else{
		                          this.$message({
		                              type: 'error',
		                              message: '请您稍后再试！',
		                          });
		                      }
		                        
		                    }catch(err){
		                    }
	                	});
				},
				
//            导出数据
              waterbilbtn(){
                    var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Resource/csv_export";  
                    var form = $("<form>"); //定义一个form表单 
					form.attr('style','display:none'); //在form表单中添加查询参数 
					form.attr('target',''); 
					form.attr('method','get');
					form.attr('action',downloadURL); 
	
					$('body').append(form); //将表单放置在web中 
					
					for(let i in this.dataWa.param){
						var a = $('<input>'); 
						a.attr('type','hidden'); 
						a.attr('name',i); 
						a.attr('value',this.dataWa.param[i]); 
						form.append(a); //将查询参数控件提交到表单上 
					}  
	                form.submit();  
                                                                                                    
              },
				
              // 修改时间
              dateChang(data){
                this.dataWa.param.create_time_start = data[0];
                this.dataWa.param.create_time_end = data[1];
                // 下载流水的参数
                this.dataWa1.param.StartTime = data[0];
                this.dataWa1.param.EndTime = data[1];
              },
              //计算时间差的方法
              dateDiffer(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
                  var dateSpan,
                      tempDate,
                      iDays;
                  sDate1 = Date.parse(sDate1);
                  sDate2 = Date.parse(sDate2);
                  dateSpan = sDate2 - sDate1;
                  dateSpan = Math.abs(dateSpan);
                  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                  return iDays
              },
              //下载流水
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
                }else if(this.dateDiffer(this.dataWa1.param.StartTime,this.dataWa1.param.EndTime)>6){
                  this.$message({
                      type: 'error',
                      message: '日期范围不得大于七天'
                  });
                  return;
                };
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
              // 收入，支出
              shouru(data){
                if(data.recodes=='0'){
                  if(data.in_out_type=='in'){
                    return data.total_amount;
                  }else{
                    return '';
                  }
                }else if(data.recodes=='1'){
                  return data.otal_support;
                }
              },
              zhichu(data){
                if(data.recodes=='0'){
                  if(data.in_out_type=='out'){
                    return data.total_amount;
                  }else{
                    return '';
                  }
                }else if(data.recodes=='1'){
                  return data.total_expenditure;
                }
              },
        },
        mounted() {
            this.axios.post('/dc-admin/admin/shop/query/',
            {type: 'payload'}
              ).then(res =>{
                this.shopName = JSON.parse(res.data.list);
            });
            this.$store.commit("changeSize",{wai:'FWasteBut',rightBottom:'FWasteButdiv1',right:'FWasteButright',bottom:'FWasteButbottom',content:'FWasteButcontent'});
            // this.requireData()
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
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .FWasteTop{
    display: inline-block;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .FWasteSousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
  .FWasteTitle{
    height: 40px;
    line-height: 40px;
  }
  // 上传文件按钮
  /*a  upload */
  .file {
      position: relative;
      display: inline-block;
      background: #1ab394;
      border: 1px solid #1ab394;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      vertical-align: middle;
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
      z-index: 100000;
  }
  .file:hover {
      background: #1ab394;
      border-color: #1ab394;
      color: #fff;
      text-decoration: none;
  }
  .daoru{
  	vertical-align: super;
  	margin-left: 20px;
  }
</style>
