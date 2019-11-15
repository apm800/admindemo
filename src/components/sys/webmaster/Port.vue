<template>
    <div class="webmasterServer">
        <div style="margin: 0 10px 20px 0">
            <el-button  style="margin: 0 20px 0 0" size="mini" type="success" @click="append" v-checkup="':sys:menu:add'">新增</el-button>
            <el-button  style="margin: 0 20px 0 0" size="mini" type="danger" @click="open2" v-checkup="':sys:menu:add'">删除</el-button>
            <!-- <el-select  @change="requireData(1,PageSize,input21,sorT)" v-model="sorT.gateServiceId" clearable=true placeholder="查询服务器"> 可清空-->
            <el-select  @change="requireData(1,PageSize,input21,sorT)" v-model="sorT.gateServiceId" placeholder="查询服务器">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-input style='max-width: 300px;' @keyup.enter.native='requireData(1,PageSize,input21,sorT)' placeholder="请输入接口名称" v-model="input21" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click='requireData(1,PageSize,input21,sorT)'></el-button>
            </el-input>
        </div>
                    <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @sort-change='sort'
                    @row-click = 'modification'
                    @selection-change="changeFun">
                        <el-table-column
                          type="index"
                          fixed = 'left'
                          width="40">
                        </el-table-column>
                        <el-table-column
                          type="selection"
                          fixed = 'left'
                          width="40">
                        </el-table-column>
                        
					    <el-table-column
					      label="操作"
					      width="200">
					      <template slot-scope="scope">
					        <el-button
					           @click.stop="handleEdit(scope.$index, scope.row)"
					          type="primary" 
					          plain
					          size="mini">
					         接口测试
					        </el-button>
					        <el-button
					           @click.stop="testHistory(scope.$index, scope.row)"
					          type="info" 
					          plain
					          size="mini">
					         测试记录
					        </el-button>
					      </template>
					    </el-table-column>
                        <el-table-column
                          prop="gateServiceId"
                          label="服务器名称"
                          :formatter="nameMap"
                          sortable='custom'
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="interfaceName"
                          label="接口名称"
                          sortable='custom'
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="serviceIp"
                          label="serviceIp"
                          sortable='custom'
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="servicePort"
                          label="servicePort"
                          sortable='custom'
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="url"
                          label="URL"
                          sortable='custom'
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="是否启用"
                          :formatter="formatter"
                          sortable='custom'
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="createUser"
                          sortable='custom'
                          label="创建人"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          sortable='custom'
                          label="创建时间"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="updateUser"
                          sortable='custom'
                          label="最后修改人"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="updateTime"
                          sortable='custom'
                          label="最后修改时间"
                          show-overflow-tooltip>
                        </el-table-column> -->
                        <el-table-column
                          prop="remake"
                          label="备注"
                          show-overflow-tooltip>
                        </el-table-column>
                        
                  </el-table>
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

            <!-- 弹出框  -->
            <el-dialog :title="addType?'修改':'新增'" :visible.sync="addDialog" @close='colse'>
                <el-form :model="ruleForm" name="addStor" :rules="rules" ref="ruleForm">
                	
                    <el-form-item style='width: 92%;display: inline-block;' label="服务器ID" :label-width="'120px'">
                        <el-select v-model="ruleForm.gateServiceId" placeholder="请选择">
                            <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item><br>
                    <el-form-item style='width: 92%;display: inline-block;' label="访问方法地址" :label-width="'120px'">
                        <el-input v-model="ruleForm.url" auto-complete="off"></el-input>
                    </el-form-item><br>
                    <el-form-item style='width: 92%;display: inline-block;' label="接口名称" :label-width="'120px'">
                        <el-input v-model="ruleForm.interfaceName" auto-complete="off"></el-input>
                    </el-form-item><br>
                    <el-form-item style='width: 92%;display: inline-block;' label="备注" :label-width="'120px'">
                        <el-input v-model="ruleForm.remake" auto-complete="off"></el-input>
                    </el-form-item><br>
                    <el-form-item style='width: 92%;display: inline-block;' label="是否启用" :label-width="'120px'">       
                        <el-switch
                            v-model="ruleForm.status"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item style='width: 92%;display: inline-block;' label="请求方式" :label-width="'120px'">
						<template>
						  <el-radio v-model="ruleForm.requestMethod" label="2">post</el-radio>
						  <el-radio v-model="ruleForm.requestMethod" label="1">get</el-radio>
						</template>
                    </el-form-item><br>
                    
                </el-form>
  				<el-button type="success" size="small" @click='addParameter' style='margin-left: 30px;'>{{flag==false?"添加参数":'取消添加'}}</el-button>
  				<div class="parameter" v-if="flag">
					<!--<div><span>参数名称：</span><el-input class='' v-model="input" placeholder="请输入内容"></el-input></div>
					<div><span>参数类型：</span><el-input v-model="input" placeholder="请输入内容"></el-input></div>
					<div><span>参数例子：</span><el-input v-model="input" placeholder="请输入内容"></el-input></div>
					<div><span>说明：</span><el-input v-model="input" placeholder="请输入内容"></el-input></div>-->
	                <!--<el-form :model="ruleForm" name="addStor" :rules="rules" ref="ruleForm">
	                	<el-form-item style='width: 42%;display: inline-block;' label="参数名称" :label-width="'120px'">
	                        <el-input v-model="parameter.name" auto-complete="off"></el-input>
	                    </el-form-item><br>
	                    <el-form-item style='width: 42%;display: inline-block;' label="参数类型" :label-width="'120px'">
	                        <el-input v-model="parameter.type" auto-complete="off"></el-input>
	                    </el-form-item><br>
	                    <el-form-item style='width: 42%;display: inline-block;' label="参数例子" :label-width="'120px'">
	                        <el-input v-model="parameter.example" auto-complete="off"></el-input>
	                    </el-form-item><br>
	                    <el-form-item style='width: 42%;display: inline-block;' label="说明" :label-width="'120px'">
	                        <el-input v-model="parameter.instruction" auto-complete="off"></el-input>
	                    </el-form-item><br>
	                </el-form>-->
	               <div class="parametertop">
	               	<span class="sp1">参数名称</span><span class="sp1">参数类型</span><span class="sp1">参数例子</span><span class="sp1">说明</span>
	               </div>
	                <div class="parameterinput" v-for="(list,index) in lists">
	                	<el-input v-model="list.paramName" placeholder="请输入内容"></el-input><el-input v-model="list.paramType" placeholder="请输入内容"></el-input>
	                	<el-input v-model="list.paramExample" placeholder="请输入内容"></el-input><el-input v-model="list.description" placeholder="请输入内容"></el-input>
  						<el-button type="danger" icon="el-icon-delete" @click="del(index)" ></el-button>
	                </div>
  					<el-button type="warning" icon="el-icon-plus" @click="add" circle></el-button>
  				</div>
                <div slot="footer" class="dialog-footer">
                    <el-button  v-if="addType" @click="quxiaoForm()">取消</el-button>
                    <el-button  v-if="!addType" @click="resetForm('addStor')">重置</el-button>
                    <el-button v-if="!addType" type="primary" @click="submitForm('addStor')">确定</el-button>
                    <el-button v-if="addType" type="primary" @click="modiForm('addStor')">确定</el-button>
                </div>
                
            </el-dialog>
            
            
            <el-dialog title="接口测试" :visible.sync="interfaceTest" v-if="ruleForm" 
            	v-loading="loading2"
			    element-loading-text="正在执行中"
			    element-loading-spinner="el-icon-loading"
			    element-loading-background="rgba(0, 0, 0, 0.4)" >
            	<p class="top_p"><span class="sp1">接口名称：</span><span class="sp2">{{ruleForm.interfaceName}}</span></p>
            	<div class="interfaceMain" >
            		<div class="parametertop">
	               		<span class="sp1">参数名称</span><span class="sp1">参数类型</span><span class="sp1">参数例子</span><span class="sp1">说明</span>
	               	</div>
	                <div class="parameterinput" v-if="lists[0].paramName==''&&lists[0].paramType==''&&lists[0].paramExample==''&&lists[0].description==''">
	                	<el-input placeholder="参数为空" :disabled="true"></el-input><el-input placeholder="参数为空" :disabled="true"></el-input>
	                	<el-input placeholder="参数为空" :disabled="true"></el-input><el-input placeholder="参数为空" :disabled="true"></el-input>
	                </div>
	                <div class="parameterinput" v-for="(list,index) in lists" v-else>
	                	<el-input v-model="list.paramName" :disabled="true"></el-input><el-input v-model="list.paramType" :disabled="true"></el-input>
	                	<el-input v-model="list.paramExample" :disabled="true"></el-input><el-input v-model="list.description" :disabled="true"></el-input>
	                </div>
            		<div class="right">
            			<div class="top"><span class="sp1">请求：</span><span class="sp2">{{ruleForm.url}}</span></div>
            			<div class="bottom"><span class="sp1">结果：</span><span class="sp2">{{dataMain}}</span></div>
            		</div>
            	</div>
            	<span slot="footer" class="dialog-footer">
				    <el-button @click="interfaceTest = false">取 消</el-button>
				    <el-button type="primary" @click='performBtn'>执 行</el-button>
				</span>
            </el-dialog>
            
            <el-dialog title="测试历史" :visible.sync="interhistory" width='70%'>
            	<p v-if='loglist==""' style="text-align: center;">暂时没有测试记录</p>
            	<div class="testmain"  v-for='item in loglist' v-else>
            		<p><span class="sp1"><span class="sp2">测试人：</span><span class="sp3">{{item.userName}}</span></span><span class="sp1"><span class="sp2">测试时间：</span><span class="sp3">{{item.createTime}}</span></span></p>
            		<p><span class="sp1"><span class="sp2">url：</span><span class="sp3">http://{{item.serviceIp}}:{{item.servicePort}}{{item.url}}</span></span><span class="sp1"><span class="sp2">请求方式：</span><span class="sp3">{{item.requestMethod==2?"post":"get"}}</span></span></p>
            		<h5>参数：</h5>
            		<div class="result">{{item.params}}</div>
            		<h5>结果：</h5>
            		<div class="result">{{item.result}}</div>
            	</div>
            	
            </el-dialog>
            
        <!--新增-->

    </div>
</template>


<script>
    export default {
        data() {
            return {
                // 请选择
                value1: '',
                options1: [{
                    value: '选项1',
                    label: '店铺1'
                }, {
                    value: '选项2',
                    label: '店铺2'
                }, {
                    value: '选项3',
                    label: '店铺3'
                }, {
                    value: '选项4',
                    label: '对账时间'
                }],
                lists:[{
                    paramName:"",
                    paramType:"",
                    paramExample:"",
                    description:"",
                    interfaceName:"",
                    gateServiceId:"",
                }],
                dataMain:'',
                flag:false,
                loading2:false,
              //弹出框
                value3:'',
                addDialog:false,
                interfaceTest:false,//接口测试
                interhistory:false,//测试记录
                loglist:[],
              //弹出框操作类型true表示修改false表示添加
                addType:false,
                roleList:[],
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                deptList: [],
                depyDialog:false,
//              测试
				handleEditmain:{
					interfaceName:"",
				},
                ruleForm:{
                	"gateInsterfaceId":"",//修改id
                    "gateServiceId": "",//服务器ID
                    "url": '',//访问方法地址
                    "interfaceName": "",//接口名称
                    "status": 0,//状态 1 激活 ； 0 冻结
                    "remake": "",//备注
                    "paramsList":"",//参数
                	"requestMethod":"2",// 2 post；1get
                    
                },
                // 重置表单
                CruleForm:{
                	"gateInsterfaceId":"",
                    "gateServiceId": "",
                    "url": '',
                    "interfaceName": "",
                    "status": 0,
                    "remake": "",
                    "paramsList":"",
                	"requestMethod":"2",// 1 post；2get
                    
                },
                  // 表单验证
                rules: {
                  rulId: [
                    // { type: 'number', message: '请输入店铺名称', trigger: 'change' },
                    { required: true, type:'number' , message: '请输入店铺编码', trigger: 'blur' }
                  ],
                  code: [
                    { required: true, message: '请输入店铺编码', trigger: 'blur' }
                    // { required: true, message: '请输入店铺编码', trigger: 'change' }
                  ],
                  // date1: [
                  //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                  // ],
                  // date2: [
                  //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                  // ],
                  // type: [
                  //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                  // ],
                  // resource: [
                  //   { required: true, message: '请选择活动资源', trigger: 'change' }
                  // ],
                  // desc: [
                  //   { required: true, message: '请填写活动形式', trigger: 'blur' }
                  // ]
                },
                    //分页
                  currentPage4: 1,
                  totalPage:0,
                  // 每页多少条
                  PageSize:10,
                  tableData:[],
                  // 表单数据
                  form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                  },
                  // 搜索
                  input21:'',
                  // 选中的表格
                  tableChe:[],
                  // 排序
                  sorT:{
                    gateServiceId:'',
                    // order:null,
                  },
                  //映射map
                  map:{},
            }
        },
        methods: { 
              append() {
                // 清空提交表单
                this.ruleForm = Object.assign({}, this.CruleForm);
                this.addDialog=true;
                this.addType = false;
              }, 
              handleNodeClick(data) {
                console.log(data);
              },            
              onSubmit() {
                console.log('submit!');
              },
              webmasterServerSou(data){
                console.log(this.input21)
              },
              // 分页方法        
              handleSizeChange(val) {
                this.PageSize = val;
                this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
              },
              handleCurrentChange(val) {
                this.currentPage4 = val;
                this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
              },
//            测试参数
				ceshicanshu(){
					for(var i in this.lists){
	              		if(this.lists[i].paramName==""&&this.lists[i].paramType==""&&this.lists[i].paramExample==""&&this.lists[i].description==""){
	              			this.$message({
	                            type: 'error',
	                            message: '参数不得全为空'
	                        });
	              			return true;
	              		}
					}
				},
//            添加
              add(){
              		if(this.ceshicanshu()==true){
              			return;
              		};
					this.lists[0].interfaceName=this.ruleForm.interfaceName
					this.lists[0].gateServiceId=this.ruleForm.gateServiceId
                    let cope = {
	                    paramName:"",
	                    paramType:"",
	                    paramExample:"",
	                    description:"",
	                    interfaceName:this.ruleForm.interfaceName,
	                    gateServiceId:this.ruleForm.gateServiceId,
                    }
                    this.lists.push(cope);
                },
                del(index){
                	if(this.lists.length>1){
                		this.lists.splice(index,1);
                	}
                },
                colse(){
					this.flag = false;
                },
              
              
              // 添加按钮提交
              submitForm(formName) {
              	if(this.flag==true&&this.ceshicanshu()==true){
              		return;
              	}
              	if(this.flag==true){
              		this.ruleForm.paramsList=this.lists;
              		for (var i  in this.ruleForm.paramsList){
              			this.ruleForm.paramsList[i].gateServiceId=parseInt(this.lists[i].gateServiceId)
              		}
              	}else{
              		this.ruleForm.paramsList='';
              	}
                this.ruleForm.gateServiceId=parseInt(this.ruleForm.gateServiceId)
                this.axios.post('/dc-admin/gateinsterface/save',
                  this.ruleForm,
                  {type: 'payload'}
                 ).then(res =>{
                    if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.addDialog=false;
                        this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
                        // 清空提交表单
		                this.ruleForm = Object.assign({}, this.CruleForm) 
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
              },
//            参数测试
				canshu(){
					this.lists.splice(1,this.lists.length);
			        this.lists[0].paramName='';
			        this.lists[0].paramType='';
			        this.lists[0].paramExample='';
			        this.lists[0].description='';
					this.lists[0].interfaceName=this.ruleForm.interfaceName;
					this.lists[0].gateServiceId=this.ruleForm.gateServiceId;
				},
				//接口测试
				handleEdit(index,row){
					this.dataMain='';
					this.ruleForm = row;
					this.axios.get('/dc-admin/gateinsterface/info/'+row.gateInsterfaceId, {type: 'payload'}
		        ).then(res =>{
		            try{
		            	this.interfaceTest=true;
		            	if(res.data.paramsList.length>0){
		            		this.lists=res.data.paramsList;
							this.handleEditmain.interfaceName = row.interfaceName;
		            	}else{
		            		this.canshu()
		            	}
		            }
		            catch(err){
		             }
		         	});
				},
				//测试记录
				testHistory(index,row){
					this.axios.post('/dc-admin/interfacetest/log?url='+row.url, {type: 'payload'}
		        ).then(res =>{
		            try{
						if(res.data.code==0){
							
							this.interhistory=true;
							this.loglist = res.data.logList;
							
						}else{
							this.$message({
		                        type: 'error',
		                        message: '未选中任何数据'
		                    });
						}
		            }
		            catch(err){
		             }
		         	});
				},
//				执行测试接口
				performBtn() {
					this.loading2=true;
					if(this.lists[0].paramName==""&&this.lists[0].paramType==""&&this.lists[0].paramExample==""&&this.lists[0].description==""){
						this.handleEditmain.interfaceName = this.ruleForm.interfaceName;
					}else{
						var param = {};
						for(var i in this.lists) {
							param[this.lists[i].paramName] = this.lists[i].paramExample;
						}
						this.handleEditmain.param = param;
					}
					this.axios.post('/dc-admin/interfacetest/test',
						this.handleEditmain, {
							type: 'payload'
						}
					).then(res => {
						try {
							this.loading2=false;
							this.dataMain = res.data;
							
						}
						catch(err) {
							
						}
					});
				},
				//				添加或取消
				addParameter(){
					this.flag = !this.flag;
					//每次进来清空参数列表
//					if(this.addType==false){
						this.canshu()
//					}
	                

				},
              resetForm(formName) {
                // 清空提交表单
                this.ruleForm = Object.assign({}, this.CruleForm); 
                this.flag=false;
                this.$message({
                    type: 'success',
                    message: '重置成功'
                });
              },
              // 排序
              sort(a){
                  this.sorT.sidx= a.prop;
                  if (a.order=='descending') {
                    this.sorT.order = '-';
                  }else{
                    this.sorT.order = a.order;
                  }
                  this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
              },
              // 格式化表格数据
              formatter(a){
                if (a.status==1) {
                  return '启用'
                }else if(a.status==0){
                  return '未启用'
                }
              },
              // 名称映射
              nameMap(a){
                return this.map[a.gateServiceId]
              },
              // 表格选中
              changeFun(val){
                this.tableChe = [];
                for (var i in val) {
                  this.tableChe.push(val[i].gateInsterfaceId)
                }
              },
              //批量删除
              open2() {
                this.$confirm('此操作将永久删除选中的接口, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if (this.tableChe.length==0) {
                      this.$message({
                          type: 'error',
                          message: '未选中任何数据'
                      });
                  }else{
                        this.axios.post('/dc-admin/gateinsterface/delete',
                          this.tableChe,
                          {type: 'payload'}
                         ).then(res =>{
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
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
              },
              // 修改操作
              modification(val,column){
                this.ruleForm = val
                if(column.target.className!="el-checkbox__inner"&&column.target.className!="el-checkbox__original"){
                this.axios.get('/dc-admin/gateinsterface/info/'+val.gateInsterfaceId, {type: 'payload'}
		        ).then(res =>{
		            try{
                		this.addDialog=true;
                		this.addType = true;
		            	if(res.data.paramsList.length>0){
		            		this.flag = true;
		            		this.lists=res.data.paramsList;
		            	}
		            	
		            }
		            catch(err){
		             }
		        });
		        }
              },
              // 取消修改
              quxiaoForm(){
                this.addType = false;
                this.addDialog=false;
              },
              //确认修改
              modiForm(){	
              	if(this.flag==true&&this.ceshicanshu()==true){
              		return;
              	}
              	if(this.flag==true){
              		this.ruleForm.paramsList=this.lists;
              	}else{
              		this.ruleForm.paramsList='';
              	}
                this.axios.post('/dc-admin/gateinsterface/update',
                  this.ruleForm,
                  {type: 'payload'}
                 ).then(res =>{
                    if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.addDialog=false;
                        this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
                        // 清空提交表单
                        this.ruleForm = Object.assign({}, this.CruleForm);
                    } else {
                        var error = '';
                        if (res.data.msg) {
                          error = res.data.msg;
                        }else{
                          error = '服务器超时，请您重新登录'
                        }
                        this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
                        this.$message({
                            type: 'error',
                            message: error
                        });
                    }
                });
              },
              // 请求数据
              requireData(page,limit,key,sort){
                this.axios.get('/dc-admin/gateinsterface/list?page='+page+'&limit='+limit+'&gateServiceId='+sort.gateServiceId+'&interfaceName='+key , {type: 'payload'}
                 ).then(res =>{
                  	for (var i=0;i<res.data.page.list.length; i++) {
                  		if(res.data.page.list[i].requestMethod==2){
                  			res.data.page.list[i].requestMethod="2"
                  		}
                  		if(res.data.page.list[i].requestMethod==1){
                  			res.data.page.list[i].requestMethod="1"
                  		}
                  	}
                    try{
                      this.tableData = res.data.page.list;
                    }
                    catch(err){
                      this.tableData = res.data.list;
                    }
                    // 总页数
                    this.totalPage=res.data.page.totalCount;
                    //当前页数
                    this.currentPage4 = res.data.page.currPage;
                });
                this.axios.get('/dc-admin/gateservices/map', {type: 'payload'}
                  ).then(res =>{
                    this.map = res.data.data
                    // 下拉框数据
                    this.options1 = [{
                      label:'',
                      value:'',
                    }];
                    for(var i in this.map){
                        var obj = {};
                        obj.label = this.map[i];
                        obj.value = i;
                        this.options1.push(obj)
                    }
                });
              },
        },
        mounted() { 
          // 列表
          // 
                //https://api.ekuaitu.com/city/getOpenCityList
                // this.$http.get('/dc-admin/admin/shop/list',{page:1,limit:10},{type: 'payload'}).then((response) => {
                //     var res = response.data;
                //     console.log(res)
                // }).catch((error) => {

                // });
                  this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
.webmasterServer{
    height: 100%;
    width: 100%;
}
.parameterinput{display: flex; justify-content: space-around; margin-bottom: 8px;}
.parameterinput .el-input{
	width: 23%;
}
.parameter .el-input{
	/*display: ;*/
}
.parameter .el-form-item {
    margin-bottom: 0px;
}
.parameter .el-button--warning .el-icon-plus{
	margin-top: -5px;
}
.parametertop{width: 100%;}
.parametertop span{width: 23%; text-align: center; line-height: 30px; display: inline-block;}
.parameter .el-button--danger .el-icon-delete{
	margin-top: -5px;
}
.interfaceMain{}
.interfaceMain .left{border-bottom: 1px dotted #999999;}
.interfaceMain .right{position: relative; height: 100px; margin-top: 20px;}
.interfaceMain .right .top{position: absolute; left: 0; height: 100px;width: 50%; border-right: 1px dotted #999999;}
.interfaceMain .right .sp1{margin-left: 20px;}
.interfaceMain .right .bottom{position: absolute; right: 0; height: 100px; width: 50%; overflow-y: scroll;}
.interfaceMain .right .bottom .sp2{ width: 100%; overflow-y: scroll; display: inline-block;}
.testmain{width: 100%; border-bottom: 1px dotted #9F9F9F; padding-bottom: 10px; margin-bottom: 10px;}
.testmain p{line-height: 30px; margin: 0;}
.testmain p .sp1{width: 50%; display: inline-block;}
.testmain .result{width: 100%; max-height: 90px;line-height: 20px; overflow-y: scroll;}
.testmain h5{margin: 5px;}
</style>
