<template>
    <div class="basicsStor">
        <div style="margin: 0 10px 20px 0">
            <el-button  style="margin: 0 20px 0 0" size="mini" type="success" @click="append" v-checkup="':sys:menu:add'">添加店铺</el-button>
            <el-button  style="margin: 0 20px 0 0" size="mini" type="danger" @click="open2" v-checkup="':sys:menu:add'">删除店铺</el-button>
            <el-input style='max-width: 300px;' @keyup.enter.native='requireData(1,PageSize,input21,sorT)' placeholder="请输入内容" v-model="input21" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click='requireData(1,PageSize,input21,sorT)'></el-button>
            </el-input>
        </div>
                    <el-table
                v-loading="loading1"
                element-loading-text="拼命加载店铺列表..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                    border
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="tableData"
                    style="width: 100%"
                    @sort-change='sort'
                    @row-click = 'modification'
                    @selection-change="changeFun">
                        <el-table-column
                          type='selection'
                          fixed = 'left'
                          width="40">
                        </el-table-column>
                        <!-- <el-table-column
                          prop=""
                          label="修改"
                          fixed = 'left'
                          width='50'
                          show-overflow-tooltip>
                          <template scope="scope">
                            <i class="el-icon-edit"></i>
                          </template>
                        </el-table-column> -->
                        <!-- <el-table-column
                          prop="id"
                          label="店铺ID"
                          sortable='custom'
                          width="120">
                        </el-table-column> -->
                        <el-table-column
                          prop="name"
                          label="店铺名称"
                          sortable='custom'
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="code"
                          label="仓库编码"
                          sortable='custom'
                          width="120">
                        </el-table-column>
                        <!--click.stop阻止事件冒泡-->
                        <el-table-column label="对应仓库" width="100">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              @click.stop="handleEdit(scope.$index, scope.row)">选择仓库</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="enterpriseName"
                          label="法律主体"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="projectGroup"
                          label="项目组"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="project"
                          label="项目"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="platform"
                          label="平台"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="backPathway"
                          label="回款途径"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="catchSiginfor"
                          label="抓取签收"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="financeEmployee"
                          label="财务负责人"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        
                        <el-table-column
                          prop="address"
                          label="地址"
                          show-overflow-tooltip
                          width="200">
                        </el-table-column>
                        <el-table-column
                          prop="partner"
                          label="联系人"
                          sortable='custom'
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="phone"
                          label="电话"
                          show-overflow-tooltip
                          width="200">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="appkey"
                          label="appkey"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="secret"
                          label="secret"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="sessionkey"
                          label="sessionkey"
                          show-overflow-tooltip>
                        </el-table-column> -->
                        <el-table-column
                          prop="status"
                          label="是否启用"
                          :formatter="formatter"
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <!-- <el-table-column
                          prop="createUser"
                          label="创建用户"
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
                          label="修改用户"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="updateTime"
                          label="修改时间"
                          sortable='custom'
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
            <el-dialog :title="addType?'修改':'新增'" :visible.sync="addDialog" height='800px'>
                <el-form :model="ruleForm" name="addStor" :rules="rules" ref="ruleForm">
                    <!-- <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="店铺ID" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.id" auto-complete="off"></el-input>
                    </el-form-item> -->
                    <!--
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="创建用户" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.createUser" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="创建时间" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.createTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="修改用户" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.updateUser" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="修改时间" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.updateTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="电话" :label-width="'120px'">
                        <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    -->
                    <el-form-item  prop="code" style='max-width: 48%;display: inline-block;' label="店铺编码" :label-width="'120px'">
                        <el-input v-model="ruleForm.code" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="name" style='max-width: 48%;display: inline-block;' label="店铺名称" :label-width="'120px'">
                        <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item   prop="name" style='max-width: 48%;display: inline-block;' label="法律主体" :label-width="'120px'">
                       <!--
                       <el-input v-model="ruleForm.enterpriseName" auto-complete="off"></el-input>
                       -->
                          <el-select v-model="ruleForm.enterprise" placeholder="选择法律主体"  @change='fun_enterprise(ruleForm.enterprise)'>
                           <el-option
                              v-for="item in enterprise_options"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                    </el-form-item>


                      


                    <el-form-item  prop="projectGroup" style='max-width: 48%;display: inline-block;' label="项目组" :label-width="'120px'">
                        <el-input v-model="ruleForm.projectGroup" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="project" style='max-width: 48%;display: inline-block;' label="项目" :label-width="'120px'">
                        <el-input v-model="ruleForm.project" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="platform" style='max-width: 48%;display: inline-block;' label="平台" :label-width="'120px'">
                        <el-input v-model="ruleForm.platform" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="backPathway" style='max-width: 48%;display: inline-block;' label="回款途径" :label-width="'120px'">
                        <el-input v-model="ruleForm.backPathway" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="catchSiginfor" style='max-width: 48%;display: inline-block;' label="抓取签收" :label-width="'120px'">
                        <el-input v-model="ruleForm.catchSiginfor" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="financeEmployee" style='max-width: 48%;display: inline-block;' label="财务负责人" :label-width="'120px'">
                        <el-input v-model="ruleForm.financeEmployee" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="appKey" :label-width="'120px'">
                        <el-input v-model="ruleForm.appkey" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="secret" :label-width="'120px'">
                        <el-input v-model="ruleForm.secret" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="sessionKey" :label-width="'120px'">
                        <el-input v-model="ruleForm.sessionkey" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="店铺联系人" :label-width="'120px'">
                        <el-input v-model="ruleForm.partner" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="地址" :label-width="'120px'">
                        <el-input v-model="ruleForm.address" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="备注" :label-width="'120px'">
                        <el-input v-model="ruleForm.remake" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="是否启用" :label-width="'120px'">       
                        <el-switch
                            v-model="ruleForm.status"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button  v-if="addType" @click="quxiaoForm()">取消</el-button>
                    <el-button  v-if="!addType" @click="resetForm('addStor')">重置</el-button>
                    <el-button v-if="!addType" type="primary" @click="submitForm('addStor')">确定</el-button>
                    <el-button v-if="addType" type="primary" @click="modiForm('addStor')">确定</el-button>
                </div>
            </el-dialog>


            <!--弹出框 选择仓库-->
              <el-dialog title="绑定仓库" :visible.sync="addDialog_select_ware">
                	<el-form :v-model="wareForm">
                      <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                      </el-input>
                <div style="margin-top:20px;max-height: 500px; overflow-y: scroll;">
                    <el-col style="float: none" :span="11" >
                      <h3>{{wareForm.ware_name}}</h3>
                      <el-tree
                        :data="wareForm.ware_data_list"
                        :filter-node-method="filterNode"
                        show-checkbox
                        default-expand-all
                        node-key="code"
                        ref="tree"
                        :default-checked-keys='checkedkey'
                        highlight-current
                        :props="ware_dataProps"
                        @check-change="handleCheckChange"
                        >
                      </el-tree>
                    </el-col>
                </div>
                    <el-form-item center style="margin-top: 15px; text-align: center; margin-bottom: 15px;">
                      <el-button type="primary" @click="editFinish">确认修改</el-button>
                      <el-button @click="editCancel">取消</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>

        <!--新增-->



    </div>
</template>

<script>
    export default {
        data() {
            return {
              filterText: '',
            	checkedkey:[],//仓库默认选中
              loading1:0,
              //弹出框
                addDialog:false,
              //弹出框操作类型true表示修改false表示添加
                addType:false,
                roleList:[],
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                deptList: [],
                flag:'',
                depyDialog:false,
                ruleForm:{
                    "name": "",
                    "code": '',
                    "remake": "",
                    "address": "",
                    "partner": "",
                    "appkey": '',
                    "secret": '',
                    "sessionkey": '',
                    "status": 0,
                    "enterprise": "",
                    "enterpriseName": "",
                    "projectGroup": "",
                    "project": "",
                    "platform": "",
                    "backPathway": "",
                    "catchSiginfor": "",
                    "financeEmployee": "",
                },
                // 重置表单
                CruleForm:{
                    "name": "",
                    "code": '',
                    "remake": "",
                    "address": "",
                    "partner": "",
                    "appkey": '',
                    "secret": '',
                    "sessionkey": '',
                    "status": 0,
                    "enterprise": "",
                    "enterpriseName": "",
                    "projectGroup": "",
                    "project": "",
                    "platform": "",
                    "backPathway": "",
                    "catchSiginfor": "",
                    "financeEmployee": "",
                },
                  // 表单验证
                rules: {
                  name: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
                  totalPage:1,
                  // 每页多少条
                  PageSize:10,
                  tableData:[],
                  // 搜索
                  input21:'',
                  // 选中的表格
                  tableChe:[],
                  // 排序
                  sorT:{
                    sidx:null,
                    order:null,
                  },
                  //获取的法律主体列表
                  enterprise_options:[],
                  //法律主体
                  enterprise_name:'',
                  //对应仓库
                  corresponding_warehouse:'',
                  addDialog_select_ware:false,// 
                  
                  //仓库数据列表
                  // ware_data_list: [],
                  ware_dataProps:{
                    children: '',
                    label: 'name'
                  },


                  //仓库表单
                  wareForm:{
                    id:'',//店铺id
                    code:'',//仓库id
                    ware_name:'',
                    ware_data_list:[],
                    wareIdList:[],//默认选中的数据的id 
                  } ,
                  
//                仓库code
				codeForm:{
					shopId:'',//店铺id
					warehouseIds:[]
					
				}


            }
        },
        watch: {
          filterText(val) {
                console.log('1221',val)
            this.$refs.tree.filter(val);
          }
        },
        methods: { 
              // 搜索         
              filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
              },
              append() {
                // 清空提交表单
                this.ruleForm = Object.assign({}, this.CruleForm) 
                this.addDialog=true;
                this.addType = false;
              }, 
              handleNodeClick(data) {
              },            
              onSubmit() {
              },
              basicsStorSou(data){
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
              // 添加按钮提交
              submitForm(formName) {
                if(this.ruleForm.enterprise==''){
                    this.$message({
                        type: 'error',
                        message: "请选择法律主体"
                    });
                    return;
                };
                console.log(this.ruleForm)
                this.axios.post('/dc-admin/admin/shop/save',
                  this.ruleForm,
                  {type: 'payload'}
                  ).then(res =>{
                    console.log(444,res)
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
              resetForm(formName) {
                // 清空提交表单
                this.ruleForm = Object.assign({}, this.CruleForm) 
                this.$message({
                    type: 'success',
                    message: '重置成功'
                });
              },
              requireData(page,limit,key,sort){
                this.loading1 = 1;
                this.axios.get('/dc-admin/admin/shop/list?page='+page+'&limit='+limit+'&key='+key+'&sidx='+sort.sidx+'&order='+sort.order, {type: 'payload'}
                  ).then(res =>{
                    console.log(444,res)
                    // console.log('')
                    try{
                      this.tableData = res.data.page.list;                      
                    }
                    catch(err){
                      this.tableData = res.data.list;
                    }
                    this.loading1 = 0;
                    // 总页数
                    this.totalPage=res.data.page.totalCount;
                    //当前页数
                    this.currentPage4 = res.data.page.currPage;
                });
              },
              //获取法律主体
              // /admin/enterprise/list
              enterpriseData(page,limit,key,sort){
                this.axios.get('/dc-admin/admin/enterprise/list', {type: 'payload'}
                  ).then(res =>{

                    try{
                      
                      this.enterprise_options = res.data.list;
                      // console.log('主体', this.enterprise_options)
                      console.log('法律主体', this.enterprise_options)
                      
                    }
                    catch(err){

                    }
                });
              },
              // 排序
              sort(a){
                  this.sorT.sidx= a.prop;
                  if (a.order=='descending') {
                    this.sorT.order = '-';
                  }else{
                    this.sorT.order = '';
                  }
                  console.log(this.sorT)
                  this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
              },
              // 格式化表格数据
              formatter(a){
                console.log()
                if (a.status==1) {
                  return '启用'
                }else if(a.status==0){
                  return '未启用'
                }
              },
              // 表格选中
              changeFun(val){
                this.tableChe = [];
                for (var i in val) {
                  this.tableChe.push(val[i].id)
                }
                console.log(111,this.tableChe)
              },
              //批量删除
              open2() {
                this.$confirm('此操作将永久删除选中的店铺, 是否继续?', '提示', {
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
                        this.axios.post('/dc-admin/admin/shop/delete',
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
              modification(val){
                console.log(val)
                this.addDialog=true;
                this.addType = true;
                this.ruleForm = val
              },
              // 取消修改
              quxiaoForm(){
                this.addDialog=false;
                this.addType = false;
              },
              //确认修改
              modiForm(){
                
                if(this.ruleForm.enterprise==''){
                    this.$message({
                        type: 'error',
                        message: "请选择法律主体"
                    });
                    return;
                };
                this.axios.post('/dc-admin/admin/shop/update',
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
                        this.ruleForm = Object.assign({}, this.CruleForm) 
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
              //获取法律主体数据
              fun_enterprise(val){
                console.log('法律主体临时',val)
                  this.enterprise_name = val;
              },
              //点击选择仓库 店铺绑定不同的仓库
              handleEdit(index, row) {
              	this.axios.get('/dc-admin/admin/shop/branded/' + row.id, {
              		tupe: 'playload'
              	}).then(res => {
              		console.log('绑定关系数据', res.data)
              		this.checkedkey = []
              		console.log(this.checkedkey)
//            		判断点击当前店铺是否跟之前店铺一样
              		if(res.data.breaWarehouse!=''&&res.data.breaWarehouse[0].shopId == row.id) {
              			for(var i = 0; i < res.data.breaWarehouse.length; i++) {
              				this.checkedkey.push(res.data.breaWarehouse[i].warehosueId)
              			}
              			console.log(this.checkedkey)
              			this.codeForm.warehouseIds = this.checkedkey  //为了防止第二次重新选择之前的没有保存
              			console.log('一样'+this.codeForm.warehouseIds)
              			//console.log('绑定数据的返回信息',res.data.breaWarehouse)//{id: 1, shopId: 147, warehosueId: 1}
              		}else{
              			
              		}
              			try {
              				console.log('选中的行', index)
              				console.log('选中的行', row)
              				this.addDialog_select_ware = true;
              				this.wareForm.id = row.id; ///店铺id
              				this.get_ware_list();
              				console.log(this.wareForm)
              				this.wareForm.ware_name = row.partner;
              				this.get_relation_bind(row.id); //获取 店铺仓库 绑定关系数据
              				this.checkedkey = this.uniq(this.checkedkey)
              				console.log('ewwqe', this.checkedkey)
              				// this.wareForm.ware_data_list =JSON.parse(res.data.list)
              				// console.log('仓库解析数据',this.wareForm.ware_data_list)
              			} catch(err) {}

              	})

              },//获取仓库的列表
              get_ware_list(){
                this.axios.get('/dc-admin/admin/warehouse/query',{tupe:'playload'}).then(res =>{
                  // console.log('仓库数据',res)
                  try{
                        this.wareForm.ware_data_list =JSON.parse(res.data.list)
                        console.log('仓库解析数据',this.wareForm.ware_data_list)
                      }
                      catch(err){
                  }                  
                })
              },
              //获取绑定关系
              //admin/shop/branded/{shopid}  需要传入参数 店铺id
              get_relation_bind(shopid){
               
              },
//            选择仓库
//				function remove(arr,item){
//				    return arr.filter(function(ele){
//				         return ele != item;
//				    })
//				}	
//					 checkSelArr(selected){ 
//						var selectArr=[];
//					   var len=selectArr.length+1;
//					   for(var i=0;i<len;i++){
//					      if(selected == selectArr[i]){
//					         selectArr.splice(i,1);
//					         return;//利用函数的返回功能中断push操作
//					      }
//					   };
//					   selectArr.push(selected)
//					
//					},	
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
//				点击选择店铺
              handleCheckChange(data, checked, indeterminate) {
        		console.log(data, checked, indeterminate);
        		var codeData = parseInt(data.code)
        		console.log('未选择钱的数组'+this.codeForm.warehouseIds)
        		if(checked==true){
        			this.codeForm.warehouseIds.push(codeData)
        		}else{
					for(var i=0; i<this.codeForm.warehouseIds.length+1;i++){
						if(codeData==this.codeForm.warehouseIds[i]){
					         this.codeForm.warehouseIds.splice(i,1);
						}
					}
        		}
        		this.codeForm.warehouseIds=this.uniq(this.codeForm.warehouseIds)
        		console.log(this.codeForm.warehouseIds)
      		  },
      		  
			   
              //编辑完成后提交
              editFinish(){
              	this.codeForm.shopId=this.wareForm.id
              	console.log(this.codeForm)
				this.axios.post('/dc-admin/admin/shop/brandUpdate?shopId='+this.codeForm.shopId+'&ids='+this.codeForm.warehouseIds,
//				this.codeForm,
				{tupe:'playload'}).then(res =>{
					console.log(res)
					if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.addDialog_select_ware=false;
						this.checkedkey=[];
						console.log(this.codeForm.warehouseIds)
//						this.$refs.tree.setCheckedKeys(this.codeForm.warehouseIds);
                    }else{
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
                  	                
                })
              },
              //编辑返回
              editCancel(){
                this.addDialog_select_ware=false;
				this.checkedkey=[];
				console.log(this.checkedkey)
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
                  this.enterpriseData();
                  this.get_ware_list();
        },
        props: {},
    }
</script>
<style lang="less">
.basicsStor{
    height: 100%;
    width: 100%;
}
</style>
