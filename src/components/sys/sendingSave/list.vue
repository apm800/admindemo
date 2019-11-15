<template>
    <div class="compColl ">
    	<a href="/sendColl" style="display:none;" id="aaa2" class="J_menuItem bottom_title">收发存汇总表</a>
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select filterable v-model="value1" placeholder="请选择店铺名" @change='XzShop'>
                <el-option
                  v-for="item in shopName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span class="mustFill">*</span>
            <span>账期：</span>
            
            <el-select v-model="value4" placeholder="请选择账期">
                <el-option
                  v-for="item in codeperiod"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;" v-if='supplyShow'>
            <!-- <span class="mustFill">*</span> -->
            <span>提交状态：</span>
            <el-select v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in subType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <!-- <span class="mustFill">*</span> -->
            <span>财务状态：</span>
            <el-select v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in moneyType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        <span style="margin: 20px 10px 0 0px">
            <el-button style="margin: 0 0 10px 0" type="primary" @click="onLine" v-checkup="'send_transceiverlist'">查询</el-button>
            <a href="http://admin.blueiec.com/bfecadmin/download/template/summary sheetmodel.xls" download="收发存表模板.xls">下载收发存表模板</a>
        </span>
        <br>
        <!--查询按钮-->
        <div v-if='supplyShow' class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span v-if='tijiao_show' style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="primary" @click="tijiao" v-checkup="'SFC_logicalbutton_tijiao'">提交财务</el-button>
            </span>
            <span v-if='!tijiao_show' style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="primary" disabled v-checkup="'SFC_logicalbutton_tijiao'">提交财务</el-button>
            </span>


            
            <span v-if='zuofei_show' style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="danger" v-checkup="'SFC_logicalbutton_zuofei'" v-on:click="addDialog_select_ware=true">作废</el-button>
            </span>
            <span v-if='!zuofei_show' style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="danger" disabled v-checkup="'SFC_logicalbutton_zuofei'">作废</el-button>
            </span>
        </div>
        <div v-if='!supplyShow' class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span v-if="queren_show" style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="primary" @click="queren" v-checkup="'SFC_logicalbutton_queren'">财务确认</el-button>
            </span>
            <span v-if="!queren_show" style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="primary" disabled v-checkup="'SFC_logicalbutton_queren'">财务确认</el-button>
            </span>


            <span v-if="bohui_show" style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="danger" @click="addDialog_select_ware1=true" v-checkup="'SFC_logicalbutton_bohui'">驳回汇总表</el-button>
            </span>
            <span v-if="!bohui_show" style="margin: 20px 10px 0 0px">
                <el-button style="margin: 0 0 10px 0" type="danger" disabled v-checkup="'SFC_logicalbutton_bohui'">驳回汇总表</el-button>
            </span>
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
                        <el-button type="primary" @click="zuofei">确 定</el-button>
                    </div>
            </el-dialog>
        <!--弹出框-->
            <el-dialog title="备注" :visible.sync="addDialog_select_ware1">
                    <el-input
                    autosize
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="textarea1">
                    </el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialog_select_ware1 = false">取 消</el-button>
                        <el-button type="primary" @click="bohui">确 定</el-button>
                    </div>
            </el-dialog>

      <el-table
                v-loading="loading1"
                element-loading-text="正在查询..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                
        :data="tableData"
        @selection-change.shop="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="汇总表名称"
          width="100">
          <!--<template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span style="margin-left: 10px">{{ scope.row.stock_sum_name }}</span>
          </template>-->
          <el-button type="text" slot-scope="scope"  @click='list_click(scope.row)'
          >{{ scope.row.stock_sum_name }}</el-button>
          
          
        </el-table-column>
        <el-table-column
          label="账期"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.account_period }}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="stock_sum_no"
          label="汇总编号"
          width="">
        </el-table-column>
        <el-table-column
            prop="status"
          label="提交状态"
          :formatter="formatter_ishandle1"
          width="">
        </el-table-column>
        <el-table-column
            prop="finance_status"
          label="财务状态"
          :formatter="formatter_ishandle2"
          width="">
        </el-table-column>
        <el-table-column
            prop="finance_remake"
          label="财务备注"
          width="">
        </el-table-column>
        
        <el-table-column
          :formatter="formatter_ishandle_time1"
          label="汇总表生成时间"
          prop="create_time"
          width="">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          label="汇总表生成人员"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.create_user }}</span>
          </template>
        </el-table-column>
        <el-table-column
            :formatter="formatter_ishandle_time2"
            prop="send_time"
          label="汇总表提交时间"
          width="">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.send_time }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          label="提交人"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.send_user }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="formatter_ishandle_time3"
          label="财务操作时间"
          prop="finance_time"
          width="">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.finance_time }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          label="操作员"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.finance_user }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="shop_name"
          label="店铺名称"
          width="">
        </el-table-column>
        <el-table-column
            prop="finance_remake"
          label="财务备注"
          width="">
        </el-table-column>
         <el-table-column
	      label="操作"
	      width="200">
      <template slot-scope="scope">

        <el-button @click.stop="handleClick(scope.row)" size="small" round>导出</el-button>
        <el-button @click.stop="handleClickru(scope.row)" size="small" round>期末库存导入</el-button>
      </template>
    </el-table-column>
      </el-table>
      
        <!-- 弹出框 -->
              <el-dialog title="导入表格" :visible.sync="addDialog" @close="Closes">
                <a href="javascript:;" class="file">选择文件
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

    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                //导出汇总编号
                DCstock_sum_no:'',
                //弹出框
                falg:true,
                addDialog:false,
                fileList:'',
                //显示隐藏供应链提交状态
                supplyShow:1,
                // 遮罩
                addDialog_select_ware:false,
                // 遮罩
                addDialog_select_ware1:false,
                //作废原因
                textarea:'',
                //驳回原因
                textarea1:'',
                //按钮状态
                tijiao_show:0,
                zuofei_show:0,
                queren_show:0,
                bohui_show:0,
                //加载
                loading1:0,
                // 店铺信息
                value1:'',
                shopName:[],
                //提交状态
                value2:'',
                subType:[
                    {
                        name:'全部',
                        code:'',
                    },
                    {
                        name:'汇总表生成中',
                        code:0,
                    },
                    {
                        name:'未提交',
                        code:1,
                    },
                    {
                        name:'已作废',
                        code:2,
                    },
                    {
                        name:'已提交',
                        code:3,
                    },
                ],
                //财务状态
                value3:'',
                moneyType:[
                    {
                        name:'全部',
                        code:'',
                    },
                    {
                        name:'财务未确认',
                        code:20,
                    },
                    {
                        name:'财务确认',
                        code:21,
                    },
                    {
                        name:'财务驳回',
                        code:22,
                    },
                ],
                //月
                value4: '',
                // 表格操作
                tableData: [],
                //查询
                chaxun:{
                  apiName:'send_transceiverlist',
                  param:{
                      shopid:'',
                      account_period:'',
                      status:'',
                      finance_status:'',
                  }
                },
                //账期
                codeperiod:[],
                //账期的码表数据
                collect_data1:{
                  apiName:'codeperiod',
                  param:{
                    // status:0,
                  }
                },
                //财务四个按钮
                caiwu:{
                  apiName:'SFC_logicalbutton',
                  param:{
                      
                  }
                },
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
                // if(postf!='.xls'){
                //     this.$message.error('上传文件只能是xls格式!');
                //     return;
                // }
				
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
                // if(this.valueDaoru==''){
                //     this.$message({
                //         type: 'error',
                //         message: '请选择店铺'
                //     });
                //     return
                // }

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
                    // this.$store.state.xianshang
                    
			        this.axios.post('http://'+this.$store.state.xianshang+':8021/home/Baoge/import_excel?shopid='+this.value1+'&stock_sum_no='+this.DCstock_sum_no,this.formData,config).then(res=>{
	                	loading.close();
	                	this.valueDaoru='';
	                	this.fileList='';
	                	this.falg = false;
	                	console.log(res.data.code)
	                	if(res.data.code=='导入成功'){
	                		this.$message({
	                		    type: 'success',
	                		    message: '导入成功'
	                		});
	                	}else{
	                		this.$message.error(res.data.code);
	                	}
	                })	
              	}
            },
            //财务提交
            tijiao(){
                if(this.caiwu.param.stock_sum_no=='' || this.caiwu.param.stock_sum_no == undefined){
                    this.$message({
                        type: 'error',
                        message: "没有已选中数据"
                    });
                    return;
                };
                this.caiwu.param.action_type = 'send_finance' ;//(提交财务)
                this.axios.post('/dc-admin/gate/api', 
                this.caiwu,
                {type: 'payload'}
                ).then(res =>{
                	console.log(res)
                    var a = JSON.parse(res.data.data);
                    console.log(a)
                    if(a.code == 0){
                    	this.$message({
                        type: 'error',
                        message: a.message
                    });
                    }
                    this.onLine();
                });
            },
            //财务作废
            zuofei(){
                if(this.textarea==''){
                    this.$message({
                        type: 'error',
                        message:'请填写原因!'
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
                        message:'请填写原因!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }

                
                if(this.caiwu.param.stock_sum_no=='' || this.caiwu.param.stock_sum_no == undefined){
                    this.$message({
                        type: 'error',
                        message: "没有已选中数据"
                    });
                    return;
                };
                
                this.caiwu.param.remake = this.textarea;//作废的原因

                this.caiwu.param.action_type = 'cancel' ;//（作废）
                this.axios.post('/dc-admin/gate/api', 
                this.caiwu,
                {type: 'payload'}
                ).then(res =>{
                    this.textarea = this.caiwu.param.remake = '';
                    this.addDialog_select_ware=false;
                    this.onLine();
                });

            },
            //财务确认
            queren(){
                if(this.caiwu.param.stock_sum_no=='' || this.caiwu.param.stock_sum_no == undefined){
                    this.$message({
                        type: 'error',
                        message: "没有已选中数据"
                    });
                    return;
                };
                this.caiwu.param.action_type = 'finance_confirm';//（财务确认）
                this.axios.post('/dc-admin/gate/api', 
                this.caiwu,
                {type: 'payload'}
                ).then(res =>{
                    this.onLine();
                });

            },
            //财务驳回
            bohui(){
                if(this.textarea1==''){
                    this.$message({
                        type: 'error',
                        message:'请填写原因!'
                    });
                    this.addDialog_select_ware1=false;
                    return;
                }
                

                //判断备注是不是只有回车或者空格
                var reg = /([^\s])/g;
                var arr = this.textarea1.match(reg);
                if(arr===null){
                    this.$message({
                        type: 'error',
                        message:'请填写原因!'
                    });
                    this.addDialog_select_ware1=false;
                    return;
                }

                if(this.caiwu.param.stock_sum_no=='' || this.caiwu.param.stock_sum_no == undefined){
                    this.$message({
                        type: 'error',
                        message: "没有已选中数据"
                    });
                    return;
                };
                
                
                this.caiwu.param.remake = this.textarea1;//作废的原因


                this.caiwu.param.action_type = 'reject';//（驳回）
                this.axios.post('/dc-admin/gate/api', 
                this.caiwu,
                {type: 'payload'}
                ).then(res =>{
                    this.textarea1 = this.caiwu.param.remake = '';
                    this.addDialog_select_ware1=false;
                    this.onLine();
                });
            },
            // 改变店铺
            XzShop(){
            },
            //改变时间
            dateChang(data){
            },
            //查询
            onLine(){
                if(this.value1==''){
                    this.$message({
                        type: 'error',
                        message: "请选择店铺"
                    });
                    return;
                }
                if(this.value4==''){
                    this.$message({
                        type: 'error',
                        message: "请选择账期"
                    });
                    return;
                }
                this.loading1 = 1;
                

                this.chaxun.param.shopid = this.value1;
                this.chaxun.param.account_period =  this.value4;
                this.chaxun.param.status = this.value2;
                this.chaxun.param.finance_status = this.value3;


                
                if(this.$route.query.type=='finance'){
                    this.chaxun.param.status = 3;
                }

                this.axios.post('/dc-admin/gate/api', 
                this.chaxun,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var a = JSON.parse(res.data.data);
                    this.tableData = a.result.data;
                    console.log(a.result.data)
                });
            },
            //格式化时间不能全是0
            formatter_ishandle_time1(row){
                if(row.create_time.charAt(0)=='0'){
                    return '无';
                }else{
                    return row.create_time;
                }
            },
            //格式化时间不能全是0
            formatter_ishandle_time2(row){
                if(row.send_time.charAt(0)=='0'){
                    return '无';
                }else{
                    return row.send_time;
                }
            },
            //格式化时间不能全是0
            formatter_ishandle_time3(row){
                if(row.finance_time.charAt(0)=='0'){
                    return '无';
                }else{
                    return row.finance_time;
                }
            },
            //格式化单据类型
            formatter_ishandle1(row){
                try{
                  switch(row.status)
                  {
                      case '0':
                          row.status = '汇总表生成中'
                          break;
                      case '1':
                          row.status = '未提交'
                          break;
                      case '2':
                          row.status = '已作废'
                          break;
                      case '3':
                          row.status = '已提交'
                          break;
                      default:
                          break;
                  }
                    return row.status

                  }catch(err){
                  }
            },
            //格式化单据类型
            formatter_ishandle2(row){
                try{
                  switch(row.finance_status)
                  {
                      case '20':
                          row.finance_status = '财务未确认'
                          break;
                      case '21':
                          row.finance_status = '财务确认'
                          break;
                      case '22':
                          row.finance_status = '财务驳回'
                          break;
                      default:
                          break;
                  }
                    return row.finance_status

                  }catch(err){
                  }
            },
            //选择
            handleSelectionChange(val) {
            	console.log(val)
                this.caiwu.param.stock_sum_no='';
                for(var i in val){
                    this.caiwu.param.stock_sum_no += val[i].stock_sum_no+',';
                };
                console.log(this.caiwu.param.stock_sum_no)
                for(var i in val){
                    if(val[i].finance_status!='财务未确认'){
                        this.queren_show = 0;
                        this.bohui_show = 0;
                        break;
                    }else if(val[i].status!="已提交"){
                        this.queren_show = 0;
                        this.bohui_show = 0;
                        break;
                    }
                    else{this.queren_show=1;this.bohui_show=1;}

                };
                for(var i in val){
                    if(val[i].status!="未提交"){
                        this.tijiao_show = 0;
                        this.zuofei_show = 0;
                        break;
                    }else{
                    	this.tijiao_show=1;
                    	this.zuofei_show=1;
                    }
                };
                if(this.caiwu.param.stock_sum_no.length=='0'){
                    this.queren_show = this.bohui_show =this.tijiao_show =this.zuofei_show = 0; 
                }
            },
//          跳转到收发汇总表
            list_click(data){
            	console.log(data)
//          	if(event.target.nodeName!="INPUT"&&event.target.nodeName!="SPAN"){
	               if(data.status=='汇总表生成中'){
	            		return
	            	}else{
	                    // bus.$emit('sendMsg',data.stock_sum_no)
	                    this.$store.state.SFCmingxi = data.stock_sum_no;
	            		setTimeout(function(){document.getElementById("aaa2").click()},500)
	            	}
//	            } 
            	
            },
            //导出
            handleClick(val){
            	console.log(this.$store.state.xianshang)
//          	e.stopPropagation();
            	console.log(val)
            	var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Baoge/gonggao_excel";  
                var form = $("<form>");   //定义一个form表单  
                form.attr('style','display:none');   //在form表单中添加查询参数  
                form.attr('target','');  
                form.attr('method','post');  
                form.attr('action',downloadURL);  
                                    
                console.log(this.stock_sum_no)
                var input1 = $('<input>');
                input1.attr('type','hidden');   
                input1.attr('name','stock_sum_no');   
                
                input1.attr('value',val.stock_sum_no);   //时间类型
                
                $('body').append(form);  //将表单放置在web中  
                form.append(input1);   //将查询参数控件提交到表单上  
                form.submit();   //表单提交  
            },
            //导入
            handleClickru(val){
            	this.falg = true;
                this.addDialog = true;
                this.DCstock_sum_no = val.stock_sum_no;
            },
//           弹框关闭
            Closes(){
	            this.falg = false;
            },
        },
        mounted() {
            //店铺信息
            this.shopName = window.shopName;
            // 获取账期的码表数据
            this.axios.post('/dc-admin/gate/api',this.collect_data1,{type:'payload'}
            ).then(res =>{
              var json_data =  JSON.parse(res.data.data)  //解析数据 
              this.codeperiod = json_data.data;
            });
            //标签
            var path = this.$route.fullPath;
            contabs(this.$router);
            this.$router.push(path)
        },
        computed:{
            // 计算属性的 getter
            urlPath: function () {
            // `this` 指向 vm 实例
                return this.$route.query;
            }
        },
        props: {},
        watch: {
            urlPath(){
                console.log(this.$route.query)
                this.chaxun.param.status = '';
                if(this.$route.query.type=='finance'){
                    this.supplyShow = 0;
                }else if(this.$route.query.type=='supply'){
                    this.supplyShow = 1;
                }else{
                    this.supplyShow = 1;
                }
            }
        }
    }
</script>
<style lang="less">
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
      z-index: 1000;
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
