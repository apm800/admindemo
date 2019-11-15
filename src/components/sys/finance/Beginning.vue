<template>
	<div class="pDetail">
		<div style="margin-bottom:20px">
		<div class="CollectSousuo1">
            <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select v-model="value1" placeholder="请选择店铺名" @change='shopFn'>
                <el-option
                  v-for="item in shopName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
        
        
			<el-button type="primary" size="small" @click="detailList">查询</el-button>
  		</div>
		
        <el-table
	      :data="tableData"
	      border
	      style="width: 100%"  v-loading="loading1"
	      element-loading-text="正在查询..."
	      element-loading-spinner="el-icon-loading"
	      element-loading-background="rgba(0, 0, 0, 0.8)" >
	      <el-table-column
	        prop="de_name"
	        label="项目明细">
			</el-table-column>
	      <el-table-column
	        prop="begindate"
	        label="期初日期">
			</el-table-column>
			<el-table-column v-if='0'
	        prop="detail_id"
	        label="隐藏">
			</el-table-column>
	      <el-table-column label="期初值">
	       		<template scope="scope">
                    <el-input size="small" :value='scope.row.first_value' v-model="scope.row.first_value" placeholder="请输入期初值" @change="handleEdit_list(scope.$index, scope.row)"></el-input> 
                </template>
	      </el-table-column>
	    </el-table>
        
		<div style="margin-bottom:20px">
	        <div class="CollectSousuo1">
	          <span class="mustFill">*</span>
	          <span>请选择期初时间：</span>
	          <el-date-picker
			     v-model="value6"
			     type="month"
			     placeholder="选择期初时间" @change='yearFn'>
			  </el-date-picker>
	        </div>
	        <el-button type="danger" size="small" @click="referlList">提交</el-button>
		</div>    
	
	</div>    
</template>

<script>
    export default {
        data() {
            return {
            	 tableData: [],
            	radio2:'有效',
            	value1:'',//明细
            	formData:"",//上传明细
            	reduceData:[],
            	details: [],
                shopName: [],
                // 时间
                value6: '',
                //遮罩
                loading1:0,
                addDialog_select_ware:false,
//              明细
                dataWa:{
                  apiName:'qichuQuery',
                  param:{
                  	shop_id:'',
                  }
                },
//              修改值
                dataWa2:{
                  apiName:'qichuQuery',
                  param:{
                  	shop_id:'',
                  	action:'created',
                  	begindate:'',
                  	begin_value_list:{}
                  }
                },
                
                
            	value2:'',//明细
                fileList:'',//文件列表
                addDialog:false,//弹框
				addType:false,
            	formLabelWidth: '80px',
            	}
        	},
        	methods:{
			//查询明细
				detailList(){
					if(this.dataWa.param.shop_id==""){
						this.$message({
	                        type: 'error',
	                        message: '请选择店铺名'
	                   	});
					}else{
						this.loading1 = 1;
						this.axios.post('/dc-admin/gate/api',this.dataWa,{type: 'payload'}).then(res =>{
                		this.loading1 = 0;
	              			if(JSON.parse(res.data.data).code == 1){
	              				this.tableData = JSON.parse(res.data.data).data
	              				console.log(this.tableData)
	              			}
							
			            });
						
					}
					
				},    
				//提交期初值
				referlList(){
					if(this.dataWa2.param.begindate==""){
						this.$message({
	                        type: 'error',
	                        message: '请选择期初时间'
	                   	});
					}else if(this.dataWa2.param.shop_id==""){
						this.$message({
	                        type: 'error',
	                        message: '请选择店铺名'
	                   	});
					}{
						if(this.reduceData.length==0){
							this.dataWa2.param.begin_value_list = this.tableData
							for(let i in this.dataWa2.param.begin_value_list){
								this.dataWa2.param.begin_value_list[i].shop_id = this.dataWa2.param.shop_id
							}
						}else{
							this.dataWa2.param.begin_value_list = this.reduceData
						}
						for(let i in this.dataWa2.param.begin_value_list){
							this.dataWa2.param.begin_value_list[i].begindate=this.dataWa2.param.begindate					
						}
						console.log(this.dataWa2.param)
						this.axios.post('/dc-admin/gate/api',this.dataWa2,{type: 'payload'}).then(res =>{
							console.log(res)
							if(JSON.parse(res.data.data).code == 1){
								this.$message({
		                		    type: 'success',
		                		    message: '修改成功'
		                		});
		                		this.detailList()
	              			}
			            });
						
					}
				},
				//选择店铺
	             shopFn(data){
                	this.dataWa.param.shop_id = data;
                	this.dataWa2.param.shop_id = data;
	            },
	            //选择年份
	             yearFn(data){
	             	if(data!=''){
			            var month1=data.getMonth()+1;
			            var year=data.getFullYear();
			            var year1=data.getFullYear();
			            if (month1<=9){
			              month1 = '0'+month1;
			            }else if(month1==13){
			              month1 = '01';
			              year1=year+1;
			            }
		              	this.dataWa2.param.begindate = year1+'-'+month1;
	             	}
	            },
	            //修改期初值
	            handleEdit_list(a,b){
	            	let reduces = b.first_value
	            	b.shop_id = this.dataWa2.param.shop_id; 
	            	console.log(this.reduceData)
					if(reduces != '') {
						if(!/^[0-9]*$/.test(reduces)){    
						    this.$message({
		                        type: 'error',
		                        message: '输入有误'
		                   });
						}else{
							if(this.reduceData.length!=0){
								for(let i in this.reduceData){
									if(this.reduceData[i].detail_id==b.detail_id){
										this.reduceData.splice(i, 1)
										this.reduceData.push(b)
										return;
									}
								}
								this.reduceData.push(b)
							}else{
								this.reduceData.push(b)
							}
						}
	            	console.log(this.reduceData)
	          	  	}
	            },
              	//上传按钮
	            ceshi(e) {
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
	                    formData.append(""+i+"",file);
	                }
	                formData.append('stype',0);
	                this.formData = formData;
	                console.log(this.formData)
	                
	            },
				//确认导入
	            daoru(){
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
					//更改url
	                this.axios.post('http://'+this.$store.state.xianshang+':8021/home/Resource/uploaddata?shopid='+this.dataWa.param.shopid,this.formData,config).then(res=>{
	                	loading.close();
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
	          	}
        	},
        	mounted() {
            this.axios.post('/dc-admin/admin/shop/query/',
            {type: 'payload'}
              ).then(res =>{
                this.shopName = JSON.parse(res.data.list);
            });
        	},
        }
	
	
</script>

<style lang="less">
	.pDetail{
		.CollectSousuo1{
		 	display: inline-block;
		   	margin:20px 15px 0 0;
		}
		.el-dialog{
			.el-input,.el-select{
				width: 300px;
			}
		}
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
	}
	
	    
	
</style>