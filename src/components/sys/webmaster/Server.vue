<template>
    <div class="webmasterServer">
        <div style="margin: 0 10px 20px 0">
            <el-button  style="margin: 0 20px 0 0" size="mini" type="success" @click="append" v-checkup="':sys:menu:add'">新增</el-button>
            <el-button  style="margin: 0 20px 0 0" size="mini" type="danger" @click="open2" v-checkup="':sys:menu:add'">删除</el-button>
            <!-- <el-input style='max-width: 300px;' @keyup.enter.native='requireData(1,PageSize,input21,sorT)' placeholder="请输入内容" v-model="input21" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click='requireData(1,PageSize,input21,sorT)'></el-button>
            </el-input> -->
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
                          prop="gateServiceId"
                          label="gateServiceId"
                          sortable='custom'
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="serviceIp"
                          label="服务器IP"
                          sortable='custom'
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="serviceName"
                          label="服务器名称"
                          sortable='custom'
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="servicePort"
                          label="服务器端口"
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
                          label="创建人"
                          sortable='custom'
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="创建时间"
                          sortable='custom'
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
            <el-dialog :title="addType?'修改':'新增'" :visible.sync="addDialog">
                <el-form :model="ruleForm" name="addStor" :rules="rules" ref="ruleForm">
                    <!-- <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="店铺ID" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.id" auto-complete="off"></el-input>
                    </el-form-item>
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
                        <el-input v-model="ruleForm.code" auto-complete="off"></el-input>
                    </el-form-item> -->



                    <el-form-item style='max-width: 100%;display: inline-block;' label="gateInsterfaceld" :label-width="'120px'">
                        <el-input :disabled="true" v-model="ruleForm.gateServiceId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="serviceIp" style='max-width: 100%;display: inline-block;' label="服务器IP" :label-width="'120px'">
                        <el-input v-model="ruleForm.serviceIp" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="serviceName" style='max-width: 100%;display: inline-block;' label="服务器名称" :label-width="'120px'">
                        <el-input v-model="ruleForm.serviceName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="servicePort" style='max-width: 100%;display: inline-block;' label="服务器端口" :label-width="'120px'">
                        <el-input v-model="ruleForm.servicePort" auto-complete="off"></el-input>
                    </el-form-item><br>
                    <el-form-item style='max-width: 100%;display: inline-block;' label="是否启用" :label-width="'120px'">       
                        <el-switch
                            v-model="ruleForm.status"
                            :active-value="1"
                            :inactive-value="0">
                        </el-switch>
                    </el-form-item><br>
                    <!-- <el-form-item style='max-width: 48%;display: inline-block;' label="创建人" :label-width="'120px'">
                        <el-input v-model="ruleForm.createUser" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="创建时间" :label-width="'120px'">
                        <el-input v-model="ruleForm.createTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="最后修改人" :label-width="'120px'">
                        <el-input v-model="ruleForm.updateUser" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style='max-width: 48%;display: inline-block;' label="最后修改时间" :label-width="'120px'">
                        <el-input v-model="ruleForm.updateTime" auto-complete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item style='max-width: 100%;display: inline-block;' label="备注" :label-width="'120px'">
                        <el-input v-model="ruleForm.remake" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button  v-if="addType" @click="quxiaoForm()">取消</el-button>
                    <el-button  v-if="!addType" @click="resetForm('addStor')">重置</el-button>
                    <el-button v-if="!addType" type="primary" @click="submitForm('addStor')">确定</el-button>
                    <el-button v-if="addType" type="primary" @click="modiForm('addStor')">确定</el-button>
                </div>
            </el-dialog>

        <!--新增-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
              //弹出框
                value3:'',
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
                    "gateServiceId": "",
                    "serviceIp": '',
                    "serviceName": "",
                    "servicePort": "",
                    "status": "0",
                    "createUser": '',
                    "createTime": '',
                    "updateUser": '',
                    "updateTime": '',
                    "remake":''
                },
                // 重置表单
                CruleForm:{
                    "gateServiceId": "",
                    "serviceIp": '',
                    "serviceName": "",
                    "servicePort": "",
                    "status": "",
                    "createUser": '',
                    "createTime": '',
                    "updateUser": '',
                    "updateTime": '',
                    "remake":''
                },
                  // 表单验证
                rules: {
                  serviceIp: [
                    { required: true, message: '请输入服务器IP', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                  serviceName: [
                    { required: true, message: '请输入服务器名称', trigger: 'blur' }
                    // { required: true, message: '请输入店铺编码', trigger: 'change' }
                  ],
                  servicePort: [
                    { required: true, message: '请输入服务器端口', trigger: 'blur' }
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
                    sidx:null,
                    order:null,
                  }
            }
        },
        methods: { 
              append() {
                // 清空提交表单
                this.ruleForm = Object.assign({}, this.CruleForm) 
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
              // 添加按钮提交
              submitForm(formName) {
                console.log(this.ruleForm)
                this.axios.post('/dc-admin/gateservices/save',
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
              // 排序
              sort(a){
                  this.sorT.sidx= a.prop;
                  if (a.order=='descending') {
                    this.sorT.order = '-';
                  }else{
                    this.sorT.order = a.order;
                  }
                  console.log(this.sorT)
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
              // 表格选中
              changeFun(val){
                this.tableChe = [];
                for (var i in val) {
                  this.tableChe.push(val[i].gateServiceId)
                }
              },
              //批量删除
              open2() {
                this.$confirm('此操作将永久删除选中的服务器, 是否继续?', '提示', {
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
                        this.axios.post('/dc-admin/gateservices/delete',
                          this.tableChe,
                          {type: 'payload'}
                          ).then(res =>{
                            console.log(444,res)
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
                // this.axios.get('/dc-admin/admin/shop/info?'+val.gateServiceId,{type: 'payload'}).then(res =>{
                //     console.log(res)
                //   })
                this.addDialog=true;
                this.addType = true;
                this.ruleForm = val
              },
              // 取消修改
              quxiaoForm(){
                this.addType = false;
                this.addDialog=false;
              },
              //确认修改
              modiForm(){
                this.axios.post('/dc-admin/gateservices/update',
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
              // 请求数据
              requireData(page,limit,key,sort){
                this.axios.get('/dc-admin/gateservices/list?page='+page+'&limit='+limit, {type: 'payload'}
                  ).then(res =>{
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
</style>
