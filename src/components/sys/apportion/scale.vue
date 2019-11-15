<template>
	<div class="pDetail"> 
		<div style="margin:20px 0">
			<!-- <span>员工所在部门:</span>
      <el-select v-model="value4" multiple @change='staffDeptChange(value4)' placeholder="请选择">
		    <el-option
		      v-for="item in rlBaseDetailList"
		      :key="item.name"
		      :label="item.name"
		      :value="item.name">
		    </el-option>
		  </el-select> -->
      <span>项目所在部门:</span>
      <el-select v-model="value5" multiple @change='departmentchange(value5)' placeholder="请选择">
        <el-option
          v-for="item in departmentlist"
          :key="item.departmentCode"
          :label="item.departmentName"
          :value="item.departmentCode">
        </el-option>
      </el-select>
	            <el-button style='margin-left: 20px;' type="primary" @click="departmentbtn"  v-checkup="'*'">查询</el-button>
            	<el-button type="primary" @click="cide"  v-checkup="'*'">引用上月比例</el-button>
              <el-button type="primary" @click="submit"  v-checkup="'*'">提交</el-button>
           
        </div>

        <el-table
	      :data="tableData"
	      border
	      style="width: 100%"  v-loading="loading1"
	                element-loading-text="正在查询..."
	                element-loading-spinner="el-icon-loading"
	                element-loading-background="rgba(0, 0, 0, 0.8)"
	                :cell-style='cellstyle'
                 height='600'>
	          <el-table-column
            prop="legalEntityName"
            label="人员签订法律主体"
            fixed>
            </el-table-column>
            <el-table-column
            prop="legalEntityCode"
            label="法律主体编码"
            fixed>
            </el-table-column>
            <el-table-column
            prop="departmentName"
            label="人员所在部门"
            fixed>
            </el-table-column>
            <el-table-column
            prop="departmentCode"
            label="人员所在部门编码"
            fixed>
            </el-table-column>
            <el-table-column
            prop="workNumber"
            label="工号"
            fixed>
            </el-table-column>
            <el-table-column
            prop="staffName"
            label="姓名"
            fixed>
            </el-table-column>
            <el-table-column
            v-for='i in biaotou'
            :prop="i.param"
            :label="i.name">
              <el-table-column
              v-for='j in i.department'
              :prop="j.param"
              :label="j.name">
	              <el-table-column
	              v-for='k in j.projectGroup'
	              :prop="k.param"
	              :label="k.name">
		              <el-table-column
		              v-for='l in k.project'
		              :prop="l.projectCode"
		              :label="l.name"
		              :formatter='formatter'>
						<template slot-scope="scope">
		                    <el-input size="small" :value='scope.row.projectMap[scope.column.property].scale' v-model='scope.row.projectMap[scope.column.property].scale' @change="ceshi11(scope.column, scope.row,scope.row.projectMap[scope.column.property])"></el-input> 
				     	</template>
		              </el-table-column>
	              </el-table-column>
              </el-table-column>
            </el-table-column>
			     <el-table-column
            prop="total"
            label="合计(%)">
            
           </el-table-column> 
           <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click.stop.prevent="edit(scope.$index, scope.row)">清空比例</el-button>
              </template>
            </el-table-column>

	    </el-table>

      <div style="margin:10px auto 0; text-align: center;">共{{total}}条</div>

	  	<el-dialog title="修改" :visible.sync="addDialog">
            <el-form>
                <el-form-item label="XXXX" :label-width="'120px'">
                    <el-input v-model="formatterdata" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="addFinish">确定</el-button>
            </div>
        </el-dialog>
	</div>    
        
</template>

<script>
    export default {
        data() {
            return {
              total:"0",
              value4:'',
            	value5:'',
            	biaotou:[],
            	tableData: [],
            	radio2:'有效',
            	formatterdata:'',
            	value1:'',//明细
            	formData:"",//上传明细
            	details: [],
            	projectMap:"",
                //遮罩
                loading1:0,
                dialogFormVisible:false,
                addDialog_select_ware:true,
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
                departmentlist:[],
                rlBaseDetailList:[],
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
                projectMapdata:{
                	// projectMap:{},
                  mapList:[],
                	userInfo:{}
                },
                bumenlistdata:{
                	param: {
						page:"1",
						limit:"2000"
					}
                },
                projectcitedata:{
                	userInfo:''
                },
                dataWa:{
          					userInfo: {
          						userId:1,
          						username:'admin'
          					},
          					param: {
          						projectDepartCode: "102",
                      staffDeptName: "",
          						page:"1",
          						limit:"20"
          					}
				                },
        	formLabelWidth: '80px',
          projectMapList:[],
        	}
        	},
        	methods:{
            edit(a,b){
              var data = {
                "workNumber":b.workNumber,
                "legalEntityCode":b.legalEntityCode
              }
              this.axios.post('/dc-admin/erprlsynthetical/clear',data,{type: 'payload'}).then(res =>{
                if(res.data.code == 0){
                  this.$message({
                    type: 'success',
                    message: '清除成功',
                  });
                }
              })

            },
        		cellstyle(a,b,c,d){
        			if(a.column.label==='合计(%)'&&a.row.total!=100){
						return "background:red;color:#fff"
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
//               ceshi11(a,b,c){
//               	console.log(c)
//                //单个提交
//                	this.projectMapdata=c               
//                	this.projectMapdata.userInfo = this.dataWa.userInfo
//               	var url='/dc-admin/erprlsynthetical/update';
//                 console.log(this.projectMapdata)
// 	            this.axios.post(url,this.projectMapdata,{type: 'payload'}).then(res =>{
// 	           		console.log(res)
//                 if(res.data.code==0){

//                 }else{
//                 	this.$alert(res.data.msg, '提示', {
// 			          confirmButtonText: '确定',
// 			          callback: action => {
// //			            this.$message({
// //			              type: 'info',
// ////			              message: `action: ${ action }`
// //			            });
// 			          }
// 			        });
// //                this.$message({
// //                    type: 'error',
// //                    message: res.data.msg
// //                  });
//                 }
// 	           		this.departmentbtn()
// 	           	})
              	
//               },
              ceshi11(a,b,c){
                console.log(c)
               //单个提交
                // this.projectMapdata=c               
                // this.projectMapdata.userInfo = this.dataWa.userInfo
                var url='/dc-admin/erprlsynthetical/update';

                // console.log(this.projectMapdata.id)
                // console.log(this.map[i].id)

                var index = this.ceshi111(c);
                console.log(this.projectMapList)
                console.log(index==undefined)
                if(index ==undefined){
                  this.projectMapList.push(c)                  
                }else{
                  this.projectMapList[index] = c
                }
              },
              ceshi111(a){

                for (var i in this.projectMapList){
                  if(a.id==this.projectMapList[i].id){
                    return i;
                  }else{

                  }
                }
              },
              submit(){
                this.projectMapdata.mapList=this.projectMapList;
                this.projectMapdata.userInfo = this.dataWa.userInfo;
                var url='/dc-admin/erprlsynthetical/update';
                this.axios.post(url,this.projectMapdata,{type: 'payload'}).then(res =>{
                // console.log(res)
                if(res.data.code==0){
                  this.projectMapList=[];
                  this.$message({
                   type: 'success',
                   message: res.data.msg
                 });
                  this.departmentbtn()
                }else{
                  this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
//                  this.$message({
//                    type: 'info',
////                    message: `action: ${ action }`
//                  });
                }
              });
//                this.$message({
//                    type: 'error',
//                    message: res.data.msg
//                  });
                }
                
              })
              },
              aaa(a){
              	console.log(a)
              },
				addFinish(){
////					console.log(window)
//					this.projectMap.scale = this.formatterdata
//					console.log(this.projectMap)
//					this.projectMapdata.projectMap = this.projectMap
//					this.projectMapdata.userInfo = this.dataWa.userInfo
//					console.log(this.projectMapdata)
//					var url='/dc-admin/erprlsynthetical/update';
//	            	this.axios.post(url,this.projectMapdata,{type: 'payload'}).then(res =>{
//	            		console.log(res)
//	            	})
				},

              cide(){
              	this.projectcitedata.userInfo = window.userMes
              	var url='/dc-admin/erprlsynthetical/cite';
	            this.axios.post(url,this.projectcitedata,{type: 'payload'}).then(res =>{
	            	console.log(res)
	            	if(res.data.code==0){
                        this.$message({
                            type: 'success',
                            message: '引用成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
	            	
	            	
	            })
              	

              },
				formatter(a,b,c,d){
					var h = b.property
					return a.projectMap[h].scale;						
				},
				formattertotal(a,b,c,d){
//					var h = b.property
					console.log(a,b,c,d)
//					return a.projectMap[h].total;						
					
				},
				bumenlist(){
	            this.axios.get('/dc-admin/erprlsynthetical/list',{type: 'payload'}).then(res =>{
	            	
	            	if(res.data.code==0){
                  this.departmentlist = res.data.data.department;
                  this.rlBaseDetailList = res.data.data.base
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
	            })
        		
        	},
        	departmentchange(e){
        		console.log(e.join(','))
        		this.dataWa.param.projectDepartCode = e.join(',')
        	},
          staffDeptChange(e){
            console.log(e.join(','))
            this.dataWa.param.staffDeptName = e.join(',')
          },
        	departmentbtn(){
        		this.dataWa.userInfo = window.userMes

        		var url='/dc-admin/erprlsynthetical/getsyntheticallist';

	            this.axios.post(url,this.dataWa,{type: 'payload'}).then(res =>{
	              	console.log(res)

                  if(res.data.code==0){
                    this.tableData = res.data.data.resultList;
                    this.biaotou = res.data.data.tableList;
                    this.total =  res.data.total
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
	              	
	            });
        	},
        	
        	// createFun(){
	        //     this.axios.get('/dc-admin/erprlsynthetical/create',{type: 'payload'}).then(res =>{
         //        if(res.data.code==0){
         //            }else{
         //                this.$message({
         //                    type: 'error',
         //                    message: res.data.msg
         //                });
         //            }
	        //     	this.bumenlist()
	        //     })
        		
        	// }
        	
        	
	       },

        	
        	
        	mounted() {
        		this.bumenlist()
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
	}
</style>