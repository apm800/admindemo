<template>
    <div class="basicsSuit">
        <div style="margin: 0 10px 20px 0">
            <el-button  style="margin: 0 20px 0 0" size="mini" icon='el-icon-refresh' :loading='refreshBtn.now' type="success" @click="refresh" v-checkup="'admin:productSuit:download'">{{refreshBtn.con}}</el-button>
            <!-- <el-button  style="margin: 0 20px 0 0" size="mini" type="danger" @click="open2" v-checkup="':sys:menu:add'">删除套装</el-button> -->
            <el-input v-checkup="'admin:productSuit:list'" style='max-width: 300px;' @keyup.enter.native='requireData(1,PageSize,input21,sorT)' placeholder="请输入内容" v-model="input21" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click='requireData(1,PageSize,input21,sorT)'></el-button>
            </el-input>
        </div>
                    <el-table
                v-loading="loading1"
                element-loading-text="拼命加载套装列表..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @sort-change='sort'
                    @row-click = 'modification'
                    @selection-change="changeFun">
                        <el-table-column
                          type="selection"
                          fixed = 'left'
                          width="40">
                        </el-table-column>
                    <!--套装表头数据 Start-->
                        <el-table-column
                            prop="id"
                            label="套装ID"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="套装名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="code"
                            label="套装编码">
                        </el-table-column>
                        <el-table-column
                            prop="barcode"
                            label="条形码">
                        </el-table-column>
                        <el-table-column
                            prop="typeCode"
                            label="分类编码">
                        </el-table-column>
                        <el-table-column
                            prop="brandCode"
                            label="品牌编码">
                        </el-table-column>
                        <el-table-column
                            prop="brandName"
                            label="品牌名称">
                        </el-table-column>                        
                        <el-table-column
                            prop="supplier"
                            label="供应商">
                        </el-table-column>  
                        <el-table-column
                            prop="standards"
                            label="规格">
                        </el-table-column>                          
                        <el-table-column
                            prop="unit"
                            label="计量单位">
                        </el-table-column>      
                        <el-table-column
                            prop="isSuit"
                            label="是否套装">
                        </el-table-column>
                         <el-table-column
                            prop="remake"
                            label="备注">
                        </el-table-column>                 
                    </el-table>
                    <!--套装表头数据 End-->         

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
           <!--  <el-dialog :title="addType?'修改':'新增'" :visible.sync="addDialog">
                <el-form :model="ruleForm" name="addStor" :rules="rules" ref="ruleForm">
                    <el-form-item  v-if="addType" style='max-width: 48%;display: inline-block;' label="套装ID" :label-width="'120px'">
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
                        <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
                    </el-form-item>



                    <el-form-item  prop="code" style='max-width: 48%;display: inline-block;' label="套装编码" :label-width="'120px'">
                        <el-input v-model="ruleForm.code" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="name" style='max-width: 48%;display: inline-block;' label="套装名称" :label-width="'120px'">
                        <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
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
                    <el-form-item style='max-width: 48%;display: inline-block;' label="套装联系人" :label-width="'120px'">
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
 -->
        <!--新增-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading1:0,
                refreshBtn:{
                    con:'更新全部数据',
                    now:false
                },
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
                    "id": '',
                    "name": '', // 产品名称
                    "code": '', //产品编码
                    "barcode": '',//条形码
                    "typeCode": '',//分类编码
                    "typeName": '',//分类名称
                    "brandCode": '',//品牌编码
                    "brandName": '',//品牌名称
                    "supplier": '',//供应商
                    "standards": '',//规格
                    "unit": '',//计量单位
                    "isSuit": "",//是否套装
                    "updateUser": '',
                    "updateTime": '',
                    "remake": '',//备注,
                },
                // 重置表单
                CruleForm:{
                    "id": '',
                    "name": '', // 产品名称
                    "code": '', //产品编码
                    "barcode": '',//条形码
                    "typeCode": '',//分类编码
                    "typeName": '',//分类名称
                    "brandCode": '',//品牌编码
                    "brandName": '',//品牌名称
                    "supplier": '',//供应商
                    "standards": '',//规格
                    "unit": '',//计量单位
                    "isSuit": "",//是否套装
                    "updateUser": '',
                    "updateTime": '',
                    "remake": '',//备注,
                },
                  // 表单验证
                rules: {
                  name: [
                    { required: true, message: '请输入套装名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                  code: [
                    { required: true, message: '请输入套装编码', trigger: 'blur' }
                    // { required: true, message: '请输入套装编码', trigger: 'change' }
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
                  }
            }
        },
        methods: { 
              refresh() {
                this.refreshBtn.now = true;
                this.refreshBtn.con = '玩命更新中...';
                this.axios.post('/dc-admin/admin/productSuit/download',
                  {type: 'payload'}
                  ).then(res =>{
                    if (res.data.code==0) {
                        this.$message({
                            type: 'success',
                            message: '服务器数据更新成功!'
                        });
                        // 更新视图
                        this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
                    }else{
                        this.$message({
                            type: 'error',
                            message: '服务器繁忙，请您稍后重试。'
                        });
                    }
                    this.refreshBtn.now = false;
                    this.refreshBtn.con = '更新全部数据';
                });

              }, 
              handleNodeClick(data) {
              },            
              onSubmit() {
              },
              basicsSuitSou(data){
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
                this.axios.post('/dc-admin/admin/productSuit/save',
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
                this.$confirm('此操作将永久删除选中的套装, 是否继续?', '提示', {
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
                        this.axios.post('/dc-admin/admin/productSuit/delete',
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
                this.axios.post('/dc-admin/admin/productSuit/update',
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
              requireData(page,limit,key,sort){
                this.loading1 = 1;
                this.axios.get('/dc-admin/admin/productSuit/list?page='+page+'&limit='+limit+'&key='+key+'&sidx='+sort.sidx+'&order='+sort.order, {type: 'payload'}
                  ).then(res =>{
                    console.log(444,res)
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

                    this.loading1 = 0;
                });
              }
        },
        mounted() { 
          // 列表
          // 
                //https://api.ekuaitu.com/city/getOpenCityList
                // this.$http.get('dc-admin/admin/productSuit/list',{page:1,limit:10},{type: 'payload'}).then((response) => {
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
.basicsSuit{
    height: 100%;
    width: 100%;
}
</style>
