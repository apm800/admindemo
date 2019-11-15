<template>
    <div class="basicsClas">
        <div id="basicsClas_left">
            <span class="basicsClas_title">产品分类列表</span>
            <div class="basicsClas_left_content">   
              <el-input placeholder="请输入内容" @keyup.enter.native='basicsClasSou(1,PageSize,input21,sorT)' v-model="input21" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click='basicsClasSou(1,PageSize,input21,sorT)'></el-button>
              </el-input>
              <div class="basicsClas_left_list">
                  <template>
                  <el-table
                  
                v-loading="loading1"
                element-loading-text="拼命加载产品分类列表..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                    :data="tableData"
                    highlight-current-row
                    @current-change="selectClass"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="">
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
            <div id="basicsClas_left_right"></div>
            <div id="basicsClas_left_div1" style="display: none"></div>
            <div id="basicsClas_left_bottom" style="display: none"></div>
        </div>
        <div id="basicsClas_right">
        <el-button  style="margin: 0 20px 20px 0" size="mini" icon='el-icon-refresh' :loading='refreshBtn.now' type="success" @click="refresh" v-checkup="':sys:menu:add'">
          {{refreshBtn.con}}
        </el-button>
        <el-table
                v-loading="loading2"
                element-loading-text="拼命加载产品列表..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                    border
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="tableData1"
                    style="width: 100%">
                       <!--  <el-table-column
                          type='selection'
                          fixed = 'left'
                          width="40">
                        </el-table-column> -->
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
                          prop="id"
                          label="产品ID"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="code"
                          label="产品编码"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="parentCode"
                          label="父级编码"
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="产品名称"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="产品状态"
                          :formatter="formatter"
                          show-overflow-tooltip
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="updateUser"
                          label="创建人"
                          show-overflow-tooltip
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="updateTime"
                          label="创建时间"
                          show-overflow-tooltip
                          width="160">
                        </el-table-column>
                        <el-table-column
                          prop="remake"
                          label="备注"
                          show-overflow-tooltip>
                        </el-table-column>
                  </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
              loading1:0,
              loading2:0,
              // 数据更新
                refreshBtn:{
                    con:'更新全部数据',
                    now:false
                },
                data: [{
                  label: '一级 1',
                  children: [{
                    label: '二级 1-1',
                    children: [{
                      label: '三级 1-1-1'
                    }]
                  }]
                }, {
                  label: '一级 2',
                  children: [{
                    label: '二级 2-1',
                    children: [{
                      label: '三级 2-1-1'
                    }]
                  }, {
                    label: '二级 2-2',
                    children: [{
                      label: '三级 2-2-1'
                    }]
                  }]
                }, {
                  label: '一级 3',
                  children: [{
                    label: '二级 3-1',
                    children: [{
                      label: '三级 3-1-1'
                    }]
                  }, {
                    label: '二级 3-2',
                    children: [{
                      label: '三级 3-2-1'
                    }]
                  }]
                }],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                  tableData:[],
                  tableData1:[],
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
                  // 搜索分类
                  input21:'',
                  //
                  currentPage4:1,
                  //
                  PageSize:10,
                  // 排序
                  sorT:{
                    sidx:null,
                    order:null,
                  }
            }
        },
        methods: {
          // 数据更新
              refresh() {
                this.refreshBtn.now = true;
                this.refreshBtn.con = '玩命更新中...';
                this.axios.post('/dc-admin/admin/product_type/update',
                  {type: 'payload'}
                  ).then(res =>{
                    if (res.data.code==0) {
                        this.$message({
                            type: 'success',
                            message: '服务器数据更新成功!'
                        });
                        // 更新视图
                        this.requireData()
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
          // 选择分类
              selectClass(a){
                  this.loading2 = 1;
                  this.axios.post('/dc-admin/admin/product_type/subInfo/'+a.id,
                    {type: 'payload'}
                    ).then(res =>{
                      console.log(444,res.data.adminProductType.subList)
                      try{
                        this.tableData1 = res.data.adminProductType.subList;
                      }
                      catch(err){
                        this.tableData1 = res.data.adminProductType.subList;
                      }
                      this.loading2 = 0;
                  });
              },
              handleNodeClick(data) {
                console.log(data);
              },            
              onSubmit() {
                console.log('submit!');
              },
              basicsClasSou(data){
                this.axios.get('/dc-admin/admin/product_type/list?limit=5000&page=1&key='+this.input21+'&sidx=id&order=-', {type: 'payload'}
                  ).then(res =>{
                    console.log(444,res)
                    try{
                      this.tableData = res.data.page.list;
                    }
                    catch(err){
                      this.tableData = res.data.list;
                    }
                    // 总页数
                    // this.totalPage=res.data.page.totalCount;
                    //当前页数
                    // this.currentPage4 = res.data.page.currPage;
                });
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
              // 请求
              requireData(page,limit,key,sort){
                this.loading1 = 1;
                this.axios.get('/dc-admin/admin/product_type/root', {type: 'payload'}
                  ).then(res =>{
                    console.log(444,res)
                    try{
                      this.tableData = res.data.page.root;
                    }
                    catch(err){
                      this.tableData = res.data.root;
                    }
                    this.loading1 = 0;
                    // 总页数
                    // this.totalPage=res.data.page.totalCount;
                    //当前页数
                    // this.currentPage4 = res.data.page.currPage;
                });
              },
        },
        mounted() { 
        // $(document).ready(function(){
        // 　　$.get("/dc-admin/modules/gen/generator.html",function(data){ //初始將a.html include div#iframe
        // 　　　　$("#a").html(data);
        // 　　});
        // })
            this.$store.commit("changeSize",{
                wai:'basicsClas_left',
                rightBottom:'basicsClas_left_div1',
                right:'basicsClas_left_right',
                bottom:'basicsClas_left_bottom',
                content:'basicsClas_left_content'
            });
            this.requireData(this.currentPage4,this.PageSize,this.input21,this.sorT)
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
.basicsClas_title{
    background: #1ab394;
    display: inline-block;
    width: 100%;
    height: 36px;
    color: #fff;
    font-weight: 900;
    text-align: center;
    line-height: 36px;
    overflow: hidden;
}
.basicsClas_left_list {
  display: inline-block;
  height: 710px;
  width: 100%;
  overflow: auto;
}
.basicsClas_left_list table{
  width: 100% !important;
}

.basicsClas{
    height: 100%;
    width: 100%;
}
/*.el-tree{
    background: none !important;
}*/
#basicsClas_left{
    float: left;
    display: inline-block;
    height: 100% !important;
    background: none;
    max-width: 300px;
    background: #fff;
    overflow: hidden;
    /*padding: 15px;*/
}
#basicsClas_left .el-table__body-wrapper{
  overflow:auto;
}
.basicsClas_left_content{
  padding: 15px;
}
#basicsClas_right{
    width: auto !important;
    background: #fff;
    /*display: inline-block;*/
    height: 100%;
    overflow: auto;
    padding: 15px;
}
.basicsClas .el-table--fit{
    width: auto !important;
    background: #fff;
    /*display: inline-block;*/
    height: 100%;
    overflow: auto;
}
#basicsClas_right .el-form-item__content{
  max-width: 500px;
}
</style>
