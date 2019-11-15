<template>
	<div class="dianpu">
	    <div class="sendCreate animated fadeInDown">
	        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
	            <span class="mustFill">*</span>
	            <span>店铺名称：</span>
	            <!--<el-select v-model="value1" multiple filterable placeholder="请选择店铺名" @change='XzShop'>-->
	            <el-select v-model="value1" multiple filterable placeholder="请选择店铺名(可多选)" @change='XzShop'>
	                <el-option
	                  v-for="item in shopName"
	                  :key="item.code"
	                  :label="item.name"
	                  :value="item.code">
	                </el-option>
	            </el-select>
	        </div>
	        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;" v-checkup="'batch:code:list'">
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
	        <!--查询按钮-->
	        <span style="margin: 20px 10px 0 0px">
	            <el-button style="margin: 0 0 10px 0" type="primary" @click="onLine" v-checkup="'SendCreatechart'">查询</el-button>
	        </span>
	
	      <el-table
	                v-loading="loading1"
	                element-loading-text="正在查询..."
	                element-loading-spinner="el-icon-loading"
	                element-loading-background="rgba(0, 0, 0, 0.8)"
	                
	        height="450"
	        :data="tableData"
	        @selection-change="handleSelectionChange"
	        style="width: 100%">
	        <el-table-column
	          type="selection"
	          width="55">
	        </el-table-column>
	        
	        <el-table-column
	          prop="shop_id"
	          label="店铺"
              :formatter="formattershopname"
	          width="">
	        </el-table-column>
	        <el-table-column
	          prop=""
	          label="已提交数据源"
	          width="">
	          <template slot-scope="scope">
	            <i class="el-icon-document"></i>
	            <span style="margin-left: 10px">{{ scope.row.file_name }}</span>
	          </template>
	        </el-table-column>
	        <el-table-column
	          prop="type"
	          :formatter = 'merc_order_no'
	          label="单据类型"
	          width="">
	        </el-table-column>
	        <el-table-column
	          prop=""
	          label="批次号"
	          width="">
	          <template slot-scope="scope">
	            <span style="margin-left: 10px">{{ scope.row.batch_no }}</span>
	          </template>
	        </el-table-column>
	        
	        <el-table-column
	          prop=""
	          label="备注"
	          width="">
	          <template slot-scope="scope">
	            <span style="margin-left: 10px">{{ scope.row.remake }}</span>
	          </template>
	        </el-table-column>
	      </el-table>
	
	      <div style="text-align:center;margin:20px 0px">
	        <el-input style='max-width: 300px;' placeholder="请填写汇总表名称" v-model="dataWa1.param.stock_sum_name" class="input-with-select">
	          <!-- <el-button slot="append" icon="el-icon-search" @click='onLine'></el-button> -->
	        </el-input>
	        <!--查询按钮-->
	        <span style="margin: 20px 10px 0 20px">
	            <el-button style="margin: 0 0 10px 0" type="primary" @click="shengchengData" v-checkup="'createerpstocksum'">生成收发存汇总表</el-button>
	        </span>
	      </div>
	
	    </div>

	<el-dialog
	  title="请选择店铺"
	  :visible.sync="dialogVisible"
	  width="50%">
	  <template>
		  <el-radio-group v-model="radio2">
		    <el-radio  v-for="item in shopidName" :label="item">{{item.name}}</el-radio>
		  </el-radio-group>
		</template>
	  
	  
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogVisibles">确 定</el-button>
	  </span>
	</el-dialog>
    </div>
    
    
</template>

<script>
    export default {
        data() {
            return {
                //账期
                codeperiod:[],
                //遮罩
                loading1:0,
                // 店铺信息
                value1:'',
                radio2:'',//选择的店铺
                shopName:[],
                //月
                value4: '',
                // 表格操作
                tableData: [],
				//弹框
				dialogVisible:false,
				shopidName:[],  //店铺名
				shop_options:[],
                // 上传
                dataWa:{
                  apiName:'SendCreatechart',
                  param:{
                  }
                },
                //生成收发存汇总表按钮createerpstocksum
                dataWa1:{
                  apiName:'createerpstocksum',
                  param:{
                    batch_no:'',
                    account_period:'',
                    shop_name:'',
                    shopid:'',
                    stock_sum_no:'',
                    //用户自定义名称
                    stock_sum_name:'',
                  }
                },
                //账期的码表数据
                collect_data1:{
                  apiName:'codeperiod',
                  param:{
                    // status:0,
                  }
                },
            }
        },
        methods: {
            // 选择
            handleSelectionChange(val) {
              this.dataWa1.param.batch_no=this.dataWa1.param.stock_sum_no='';
              this.dataWa1.param.account_period = this.value4;
//            this.dataWa1.param.shopid = (this.value1).toString();
              for(var i in val){
                this.dataWa1.param.batch_no +=val[i].batch_no+',';
                this.dataWa1.param.stock_sum_no +=val[i].stock_sum_no+',';
              }
              // try{
                this.dataWa1.param.batch_no=this.dataWa1.param.batch_no.substring(0,this.dataWa1.param.batch_no.length-1);
                this.dataWa1.param.stock_sum_no=this.dataWa1.param.stock_sum_no.substring(0,this.dataWa1.param.stock_sum_no.length-1);
              // }catch(err){}
            },
            // 改变店铺
            XzShop(value){
            	console.log(value)
              for(var i in this.shopName){
                if(this.shopName[i].code == value){
//                  this.shopidName.push(this.shopName[i].name) ;
                    
                }
              }
//            console.log(this.shopidName )
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
//          改变状态
            merc_order_no(res){
                	if(res.type==1){
                		return '自仓入库单'
                	}else if(res.type==2){
                		return '自仓出库单'
                	}else if(res.type==3){
                		return '菜鸟出入库单'
                	}else if(res.type==4){
                		return '自仓订单'
                	}else if(res.type==5){
                		return '菜鸟订单'
                	}else if(res.type==6){
                		return '采购订单'
                	}else{
                		return res.type;
                	}
              },
            //改变时间
            dateChang(data){
            },
            //查询
            onLine(){
                this.loading1 = 1;
                // 获取页面数据
                this.dataWa.param.account_period = this.value4;
                this.dataWa.param.shopid = (this.value1).toString();
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                  ).then(res =>{
                      this.loading1 = 0;
                      var a = JSON.parse(res.data.data);
                      this.tableData = a.result.data;
//                    另一种赋值方法
//                    var arr=['自仓入库单','自仓出库单','菜鸟出入库单','自仓订单','菜鸟订单','采购订单']
//                    for (var i=0;i<a.result.data.length;i++) {
//                    	a.result.data[i].types=arr[a.result.data[i].type-1]
//                    	console.log(a.result.data[i].types)
//                    }
//                    console.log(this.tableData)
                });

            },
			dialogVisibles(){
				if(this.radio2==''){
					 this.$message({
                        type: 'error',
                        message: "请选择店铺"
                    });
                    return;
				}
				this.dialogVisible=false;
              	this.dataWa1.param.shopid = this.radio2.code;
              	this.dataWa1.param.shop_name = this.radio2.name;
              	this.radio2=='';                      
				this.axios.post('/dc-admin/gate/api', 
                this.dataWa1,
                {type: 'payload'}
                  ).then(res =>{
	            	this.dataWa1.param.stock_sum_name=""
//                    this.onLine();
                      this.loading1 = 0;
                      var a = JSON.parse(res.data.data);
                      this.$message({
                          type: 'success',
                          message: a.msg
                      });
                });

			},
            //生成收发存汇总表
            shengchengData(){
            	console.log(this.radio2)
            	if(this.dataWa1.param.stock_sum_name==''){
                    this.$message({
                        type: 'error',
                        message: "请填写汇总表名称"
                    });
                    return;
                }else if(this.dataWa1.param.batch_no.length==0){
                    this.$message({
                        type: 'error',
                        message: "请选择要生成汇总表的数据"
                    });
                    return;
                }else{
                	console.log(1231231321321313213)
	                this.shopidName=[];
	            	for(var i in this.shopName){
		            	for(var j in this.value1){
			                if(this.shopName[i].code == this.value1[j]){
								this.shopidName.push(this.shopName[i]) ;
			                }
		                }
	             }

	            	this.dialogVisible=true;
                }
                	
              
                
            },
        },
        mounted() {
        	this.get_shop_list();
            //店铺信息
            this.shopName = window.shopName;
            // 获取账期的码表数据
            this.axios.post('/dc-admin/gate/api',this.collect_data1,{type:'payload'}
            ).then(res =>{
            	console.log(res)
              var json_data =  JSON.parse(res.data.data)  //解析数据       
              this.codeperiod = json_data.data;
            });
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
	.dianpu{
		.el-input .el-input__inner{
			height: 40px;
			max-height: 120px;
		}
		.el-select .el-select__tags{
			max-height: 114px !important;
			overflow-y: scroll;			
		}
		.el-select .el-select__tags .el-select__input{
			width: 138px!important;
		}
	}
	
</style>
