<template>
	<div class="pDetail"> 
		
        <!--<span style="display:block">
            <a href="http://47.104.20.122:8077/bfecadmin/download/template/zicangruku.xls" download="自仓入库.xls">下载导入模板</a>
        </span>
        -->
         <div class="CollectSousuo1">
             <!--<span class="mustFill">*</span>
            <span>项目明细：</span>
            <el-select v-model="value2" placeholder="请选择类型" >
                <el-option
                  v-for="item in details"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>-->
             
			<!--            
            <el-select v-model="" placeholder="请选择项目明细" >
                <el-option
                  v-for="item in details"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>-->
        </div>
         <div class="CollectSousuo1">
             <span class="mustFill">*</span>
            <span>类型：</span>
            <el-select v-model="dataWa1.param.type"  placeholder="请选择类型" >
                <el-option
                  v-for="item in details"
                  :key="item.type_id"
                  :label="item.type_name"
                  :value="item.type_id">
                </el-option>
            </el-select>
        </div>

		<el-button type="primary" size="small" @click="detailList">查询</el-button>
    	
        <div style="margin:20px 0">
            <el-button type="primary" @click="increase"  v-checkup="'edbSelfIn_submit'">新增</el-button>
            <!--<el-button type="warning" @click='toLead' >导入</el-button>-->
        </div>
		
		<!--新增-->
		<el-dialog :title="addType?'修改交易类型':'新增交易类型'"  :visible.sync="addDialog_select_ware" @close="colseBtn" >
            <el-form :model="addform">
                <el-form-item label="项目明细" :label-width="formLabelWidth">
                    <el-input v-model="addform.de_name" auto-complete="off"></el-input>
                    
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-select v-model="addform.type" placeholder="请选择">
                            <el-option
			                  v-for="item in details"
			                  :key="item.type_id"
			                  :label="item.type_name"
			                  :value="item.type_id">
			                </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-radio v-model="radio2" label="有效">有效</el-radio>
  					<el-radio v-model="radio2" label="无效">无效</el-radio>
                </el-form-item>
                <el-form-item label="说明" :label-width="formLabelWidth">
                    <el-input v-model="addform.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog_select_ware = false">取 消</el-button>
                <el-button type="primary" @click="addFinsh">确 定</el-button>
            </div>
        </el-dialog>
        
        <!-- 弹出框 -->
              <!--<el-dialog title="导入表格" :visible.sync="addDialog">
                <span style="display:block">
                    导入模版下载： <a href="http://47.104.20.122:8077/bfecadmin/download/template/aliplayWater.csv" download="账单模板">下载</a>
                </span>
                <a href="javascript:;" class="file">选择文件
                    <input type="file" name="" id="" @change="ceshi">
                </a>
                <span style="">{{fileList}}</span>
            	<el-button size="mini" type="primary" @click="daoru"  class='daoru'>导入</el-button>
            </el-dialog>
            -->
        <!--表格-->
        <el-table
	      :data="tableData"
	      border
	      style="width: 100%"  v-loading="loading1"
	                element-loading-text="正在查询..."
	                element-loading-spinner="el-icon-loading"
	                element-loading-background="rgba(0, 0, 0, 0.8)" >
	      <el-table-column
	        label="操作"
	        width='180'>
	         <template slot-scope="scope">
		        <el-button
		          @click="changes(scope.row)"
		          type="danger"
		          size="small">
		          	修改
		        </el-button>
		      </template>
	      </el-table-column>
	      <el-table-column
	        prop="de_name"
	        label="项目明细">
	      </el-table-column>
	      <el-table-column
	        prop="type_name"
	        label="类型">
	      </el-table-column>
	      <el-table-column
	        prop="remark"
	        label="说明">
	      </el-table-column>
	      <el-table-column
	        prop="status"
	        label="状态"
            :formatter="format_difference">
	      </el-table-column>
	    </el-table>
        
	
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
            	details: [],
                //遮罩
                loading1:0,
                addDialog_select_ware:false,
                dataWa:{
                  apiName:'typeList',
                },
                dataWa1:{
                  apiName:'detailList',
                  param:{
                  	type:''
                  }
                },
                dataWa2:{
                  apiName:'reviseDetail',
                  param:{
                  }
                },
                
            	value2:'',//明细
                fileList:'',//文件列表
                addDialog:false,//弹框
				addType:false,
                addform: {
                    de_name: '',
                    remark: '',
                    type: '',
                	status:''
                },
            	formLabelWidth: '80px',
            	}
        	},
        	methods:{
//      		查询明细
				detailList(){
					console.log(this.dataWa1)
					if(this.dataWa1.param.type==""){
						this.$message({
	                        type: 'error',
	                        message: '请选择查询类型'
	                   });
					}else{
						this.loading1 = 1;
						this.axios.post('/dc-admin/gate/api',this.dataWa1,{type: 'payload'}).then(res =>{
                		this.loading1 = 0;
	              			console.log(JSON.parse(res.data.data))
	              			if(JSON.parse(res.data.data).code == 1){
	              				this.tableData = JSON.parse(res.data.data).data
	              			}
							
			            });
						
					}


				},
				//格式化 差异类型
              format_difference(row) {
              	try {
              		if(row.status == '1') {
              			row.status = '有效'
              		} else if(row.status == '0') {
              			row.status = '无效'
              		}
              		return row.status

              	} catch(err) {}
              },
              //新增
				increase(){
		            this.addform.de_name="";
		            this.addform.remark="";
		            this.addform.type="";
		            this.addform.de_id="";
		            this.addform.type_name="";
		            this.addform.status="";
					this.addDialog_select_ware=true;
					this.addType=false;
				},
				//修改
				changes(res){
					this.addform = res;
					this.radio2 = res.status;
					this.addDialog_select_ware=true;
					this.addType=true;
				},
				colseBtn(){
					if(this.dataWa1.param.type!=""&&this.tableData.length!=0&&this.addType==false){
						this.detailList()
					}
				},
				addFinsh(){
					if(this.addType==true){//修改
						if(this.radio2=='有效'){
							this.addform.status=1
						}else if(this.radio2=='无效'){
							this.addform.status=0
						}
						this.dataWa2.param = this.addform;
						this.axios.post('/dc-admin/gate/api',this.dataWa2,{type: 'payload'}).then(res =>{
	              			if(JSON.parse(res.data.data).code == 1){
								this.$message({
		                		    type: 'success',
		                		    message: '修改成功'
		                		});
		                		this.detailList()
		                		this.addDialog_select_ware=false;
	              			}else{
	              				this.$message({
		                		    type: 'error',
		                		    message: JSON.parse(res.data.data).message
		                		});
	              			}
			           });
					}else{
						if(this.addform.de_name==''){
							this.$message({
		                	    type: 'error',
		                		message: '项目名称不能为空'
		                	});
						} else if(this.addform.type==''){
							this.$message({
		                	    type: 'error',
		                		message: '请选择类型'
		                	});
						} else{
							if(this.radio2=='有效'){
								this.addform.status = '1'
							}else if (this.radio2=='无效'){
								this.addform.status = '0'
							}
							this.dataWa2.param = this.addform;
							this.axios.post('/dc-admin/gate/api',this.dataWa2,{type: 'payload'}).then(res =>{
		              			if(JSON.parse(res.data.data).code == 1){
									this.$message({
			                		    type: 'success',
			                		    message: '添加成功'
			                	});
			                		this.addDialog_select_ware=false;
				                		this.loading1 = 1;
			                			this.dataWa1.param.type = this.dataWa2.param.type
										this.axios.post('/dc-admin/gate/api',this.dataWa1,{type: 'payload'}).then(res =>{
				                		this.loading1 = 0;
					              			console.log(JSON.parse(res.data.data))
					              			if(JSON.parse(res.data.data).code == 1){
					              				this.tableData = JSON.parse(res.data.data).data
					              			}
							            });
		              			}else{
		              				this.$message({
			                		    type: 'error',
			                		    message: JSON.parse(res.data.data).message
			                		});
			                		this.addDialog_select_ware=false;
		              			}
				          });
						}
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
	//		        更改url
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
	            this.axios.post('/dc-admin/gate/api',this.dataWa,{type: 'payload'}).then(res =>{
	              	var res = JSON.parse(res.data.data);
	              	console.log(res)
	              	this.details = res.data;
	              	
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