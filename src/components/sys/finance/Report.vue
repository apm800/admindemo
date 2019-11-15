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
        
        <!--  -->
        <div class="FWasteSousuo">
          <span class="mustFill">*</span>
          <span>请选择年份：</span>
          <el-date-picker
		     v-model="value6"
		     type="year"
		     placeholder="选择年" @change='yearFn'>
		  </el-date-picker>
        </div>

        <!--查询按钮-->
        <span style="margin: 20px 10px 0 20px"  v-checkup="'alipay:list'">
            <el-button type="primary" @click="inquiryBtn">查询</el-button>
            <el-button type="primary" @click="onLine">重新生成</el-button>
            <el-button type="primary" @click="Dowdata">导出</el-button>
        </span>
        </el-collapse-item>
      </el-collapse>
      <!--数据总数 -->
      
    </div>
        <!--  -->
        <div id="FWasteButcontent">
			<el-table :data="tableData4" style="width: 100%" v-loading="loading1"
	                element-loading-text="正在查询..."
	                element-loading-spinner="el-icon-loading"
	                element-loading-background="rgba(0, 0, 0, 0.8)" >
			    <el-table-column label="" fixed min-width='600'>
			      <el-table-column prop="types" label="类型" min-width="120">
			      </el-table-column>
			        <el-table-column prop="head" label="项目明细" min-width="120" show-overflow-tooltip>
			        </el-table-column>
			        <el-table-column prop="remarks" label="说明" min-width="120">
			        </el-table-column>
			        <el-table-column prop="opposite_user_id" label="对方账户" min-width="120">
			        </el-table-column>
			        <el-table-column prop="opposite_name" label="对方名字" min-width="120">
			        </el-table-column>
			    </el-table-column>
			    <el-table-column v-for="col in cols"  :label="col.moth">
			      <el-table-column  v-for="(col1,index) in col.data" v-if="index!=5"  :prop="col1.prop" :label="col1.label" width="120">
			     	<template slot-scope="scope">
                		<span v-if="index!=2">{{scope.row[col1.prop]}}</span>
	                    <el-input v-if="index==2" size="small" :value='scope.row[col1.prop]' v-model='scope.row[col1.prop]' placeholder="请输入内容" @change="ceshi11(scope.column, scope.row)"></el-input> 
			     	</template>
			      </el-table-column>
			      
			    </el-table-column>
			</el-table>
			
         
        </div>
        <div id="FWasteButright" style="display: none"></div>
        <div id="FWasteButdiv1" style="display: none"></div>
        <div id="FWasteButbottom" style="display: none"></div>
</div>

</template>

<script>
    export default {
        data() {
          return {
                // 上传进度
                headerss:{
                  // 'Access-Control-Allow-Origin':'*',
                  'Content-Type': 'multipart/form-data'
                  },
                url:'http://'+this.$store.state.xianshang+':8021/home/Resource/upload',
                // url:'http://172.18.62.176:8072/bfec-erp/anon/importExcel',
                //文件列表
                fileList:'',
                reduceData:[],
                timeArr:[],//下载表格
                //遮罩
                loading1:0,
                fileList1:'',
                // 总条数
                pageCon:0,
                // 默认展开操作选项
                activeNames: ['1'],
                activeCont:'折叠页面操作选项',
                // 店铺名称
                value1:'',
                shopName: [],
                // 提交日期
                value5:'入账时间',
                dates:[],
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
				tableData4:[],
                cols: [],
                
//                 查询接口
                dataWa:{
                  apiName:'showincome',
                  param:{
                      shop_id:"",
                      years:"",
                  }
                },
//              重新生成
                reducesdataWa:{
                  apiName:'showincome',
                  param:{
                  	shop_id:"",
                    years:"",
                  	decr_value_list:"",
                  	action:'created',
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
		ceshi11(a, b) {
			console.log(b)
			let shop_id = b.shop_id
			let reduces = b[a.property]
			if(reduces != '') {
				if(!/^[0-9]*$/.test(reduces)){    
				    this.$message({
                        type: 'error',
                        message: '输入有误'
                   });
				}else{
				let year_months = a.property.substring(a.property.length - 7)
				let detail_id = b.detail_id
				let values = {year_months,reduces,detail_id,shop_id}
				if(this.reduceData.length != 0) {
					for(let i in this.reduceData) {
						if(this.reduceData[i].detail_id == values.detail_id && this.reduceData[i].year_months == values.year_months) {
							this.reduceData.splice(i, 1)
							this.reduceData.push(values)
							return;
						}
					}
					this.reduceData.push(values)
				} else {
					this.reduceData.push(values)
				}
			}
					
			}
		},
		//上传按钮
              ceshi(e) {
                var a = e.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
                if(postf!='.xlsx' && postf!='.xls' ){
                    this.$message.error('上传文件只能是 xlsx或xls 格式!');
                    return;
                }

                this.fileList = '';
                this.fileList = e.target.files[0].name;
                var formData = new FormData();
                for (var i = 0; i < e.target.files.length; i++) {
                    var file = e.target.files[i];
                    formData.append(""+i+"",file);
                }
                formData.append('stype',0);
                let config = {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                    type:'payload',
                }
                this.axios.post(this.url,formData,config).then(res=>{
                    this.$message({
                        type: 'success',
                        message: res.data.code
                    });
                })
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
              // 收起页面查询条件
              activeZuo(val){
                  if(val.length==0){
                    this.activeCont='展开页面操作选项'
                  }else if(val.length==1){
                    this.activeCont='折叠页面操作选项'
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
              
              //重新生成
              onLine(){
              	console.log(this.reduceData)
				if(this.reduceData.length==0){
					this.$message({
                        type: 'error',
                        message: '请先修改数据'
                  });
				}else{
	              	this.reducesdataWa.param.shop_id = this.dataWa.param.shop_id 
	              	this.reducesdataWa.param.years = this.dataWa.param.shop_id 
	              	this.reducesdataWa.param.decr_value_list = this.reduceData
	                console.log(this.reducesdataWa)
	                this.axios.post('/dc-admin/gate/api',
	                this.reducesdataWa,
	                {type: 'payload'}
	                ).then(res =>{
	                	console.log(JSON.parse(res.data.data))
	                	if(JSON.parse(res.data.data).code==1){
	                		this.$message({
		                        type: 'success',
		                        message: '重新生成成功'
		                  });
		                  this.requireData();
	                	}else{
	                		this.$message({
		                        type: 'error',
		                        message: JSON.parse(res.data.data).message
		                  });
	                	}
	                    try{
	                    	
	                    }catch(err){
	
	                    }
	                });
				}
              },
              
              //请求
              requireData(){
                // 获取页面数据
                this.loading1 = 1;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                	this.loading1 = 0;
                  	console.log(JSON.parse(res.data.data))
                  	var datas = JSON.parse(res.data.data).data;
                    this.dataCont(datas)
                    this.dataHead(datas)
                    try{
                    	
                    }catch(err){

                    }
                  
                      
                });
              },
//            去重
              uniq(array){
                  var temp = []; //一个新的临时数组
                  for(var i = 0; i < array.length; i++){
                      if(temp.indexOf(array[i]) == -1){
                          temp.push(array[i]);
                      }
                  }
                  return temp;
              },
              //处理表格渲染的数据
				dataCont(datas) {
          		this.tableData4 = [];
					var b = [];
					for(let i in datas) {
						var a = {};
						a.head = datas[i][0].de_name;
						a.types = datas[i][0].type;
						a.remarks = datas[i][0].remark;
						a.opposite_user_id = datas[i][0].opposite_user_id;
						a.opposite_name = datas[i][0].opposite_name;
						a.detail_id = datas[i][0].detail_id;
						a.shop_id = datas[i][0].shop_id;
						for(let j in datas[i]) {
							var date = datas[i][j].year_months
							var title = Object.keys(datas[i][j])
							var title2 = []
							for(let l in title) {
								title2[l] = title[l] + date;
								title2[title.length]='reduce' + date
								a[title2[l]] = datas[i][j][title[l]]
								a[title2[title.length]] = ''
							}
						}
		            b.push(a);
		            this.tableData4 = b;
					}
        		},
		        //处理表格渲染的表头
				dataHead(datas) {
		          this.cols = [];
		          var a = {};
					var b = [];
					for(let i in datas) {
		            var moth = []
		            for(let j in datas[i]){
		              moth.push(datas[i][j].year_months)
		              this.uniq(moth);
		            }
		          };
		          this.timeArr = []
		          for(let ii in moth){
		            var aa = {};
		            aa.data=[];
		            aa.moth = moth[ii];
		            var labels = ['期初','增加','减少','合计','计提','月份']
		            var props = ['first_value','incr_value','decr_value','sum_value','total_value','year_months']
		            for(let iii in labels){
		              var bb = {}
		              bb.label = labels[iii]
		              bb.prop = props[iii]+moth[ii]
		              aa.data.push(bb);
		              this.timeArr.push(bb.prop)
		            }
		            this.cols.push(aa)
		          }
		
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
              // 备注
              remark(res){
                return res.owner_name+'：'+res.order_title;
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
                this.dataWa.param.shop_id = data;
                this.dataWa1.param.shopid = data;
              },
              yearFn(res){
                this.dataWa.param.years = res.getFullYear().toString();
              },
              // 选择匹配结果
              matchingChang(data){
              },
//            查询
              inquiryBtn(){
                if(this.dataWa.param.shop_id==''){
                    this.$message({
                        type: 'error',
                        message: '请选择查询店铺'
                    });
                }else if(this.dataWa.param.years==''){
                    this.$message({
                        type: 'error',
                        message: '请填选择年份'
                    });
                }else{
                	console.log(this.dataWa)
                  this.requireData();
//                this.dataWa1.param.pages=1;
                }
              	
              },
              // 修改时间
              dateChang(data){
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
              // 文件导出
                Dowdata() {
                    this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.excelData = this.tableData4 //你要导出的数据list。
                        this.export2Excel()
                    }).catch(() => {
                    
                    });
                } ,
                export2Excel() {
                    var that = this;
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../../vendor/Export2Excel'); //这里必须使用绝对路径
                        let tHeader = ['类型','项目明细','说明','对方账户','对方名字']; // 导出的表头名
		            	let tHeaders = ['期初','增加','减少','合计','计提','月份']
                        for(var i=0;i<this.cols.length;i++){
                       		tHeader = tHeader.concat(tHeaders)//两个字段内容合并在一起
                        }
                        let filterVal = ['types','head','remarks','opposite_user_id','opposite_name']; // 导出的表头字段名
                       	filterVal = filterVal.concat(this.timeArr)//两个表头合并在一起
                       	const list = that.excelData;
                        const data = that.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, `收入月报excel`);// 导出的表格名称，根据需要自己命名
                    })
                },
                formatJson(filterVal, jsonData) {
                  console.log(jsonData)
                    return jsonData.map(v => filterVal.map(j => v[j]))
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
  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    background-color: lightgoldenrodyellow;
}
.el-table__fixed-footer-wrapper tbody td {
    background-color: lightgoldenrodyellow;
}
#FWasteButcontent .el-table__fixed{
	pointer-events: none;
}
</style>
