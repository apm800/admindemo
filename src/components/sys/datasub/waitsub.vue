<template>
    <div class="waitsub animated fadeInDown">
      <!-- 分割线以上 -->
      <div style="border-bottom:1px solid #ccc;padding-bottom:20px;">
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select filterable v-model="collect_data.param.shopid" placeholder="请选择店铺名" @change='XzShop'>
                <el-option
                  v-for="item in shopName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
       
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <span class="mustFill">*</span>
            <span>单据类型：</span>
            <el-select v-model="collect_data.param.type" placeholder="请选择单据类型" @change='DjShop'>
                <el-option
                  v-for="item in DjName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
        </div>
       
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <!-- <span class="mustFill">*</span>
            <span>时间类型：</span>
            <el-select v-model="value3" placeholder="请选择时间类型" @change='DateChange' style="margin-right:20px;">
                <el-option
                  v-for="item in DateType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select> -->
            <el-date-picker @change='dateChang'
              style="margin-top:20px;"
              v-model="value4"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </div>
       
        <div class="" style="margin:10px 20px 10px 0px;display:inline-block;">
            <el-input style='max-width: 300px;' placeholder="输入批次号" v-model="collect_data.param.batch_no" class="input-with-select">
              <!-- <el-button slot="append" icon="el-icon-search" @click='onLine'></el-button> -->
            </el-input>
        </div>
        <!--查询按钮-->
        <span style="margin: 20px 10px 0px 0px" v-checkup="'batch:list'">
            <el-button type="primary" @click="onLine">查询</el-button>
        </span>
      </div>
      <!-- 分割线以下 -->
       
      <div class="" style="float:right;margin:10px 20px 10px 0px;display:inline-block;">
          <span>状态：</span>
          <el-select v-model="collect_data.param.status" placeholder="请选择单据状态" @change='dataZT'>
              <el-option
                v-for="item in ZTName"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
          </el-select>
      </div>
      <span v-if='subBottom'>
          <el-button style="margin: 10px 20px 10px 0" type="primary" @click="sunData" v-checkup="'batch:submit'">提交</el-button>
      </span>
      <!-- 不可提交按钮 -->
      <span v-if='!subBottom'>
          <el-button style="margin: 10px 20px 10px 0" type="primary" disabled v-checkup="'batch:submit'">提交</el-button>
      </span>
      
      <span v-if='backBottom'>
          <el-button style="margin: 10px 20px 10px 0" type="warning" @click="breakData" v-checkup="'batch:chancel'">撤销</el-button>
      </span>
      <!-- 不可撤销按钮 -->
      <span v-if='!backBottom'>
          <el-button style="margin: 10px 20px 10px 0" type="warning" disabled v-checkup="'batch:chancel'">撤销</el-button>
      </span>
      <span>
          <el-button style="margin: 10px 20px 10px 0" type="danger" @click="deleData" :disabled='disabled' v-checkup="'batch:del'">删除数据源</el-button>
      </span>

      <el-table
                v-loading="loading1"
                element-loading-text="正在拼命获取数据..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"


        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="multipleTable">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="批次号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.batch_no}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop= "remake"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop= "type"
          label="单据类型"
          :formatter="formatter_ishandle1"
          width="180">
        </el-table-column>
        <el-table-column
          label="附件名称"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span style="margin-left: 10px">{{ scope.row.file_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="提交时间"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账期"
          width="180">
          <template slot-scope="scope">
            <el-select v-if="scope.row.status=='未提交' || scope.row.status=='已撤销'" v-model="scope.row.account_period" placeholder="请选择账期" @change='ZQShop' v-checkup="'batch:code:list'">
                <el-option
                  v-for="item in codeperiod"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
            <span v-if="scope.row.status!=''" style="margin-left: 10px">{{ scope.row.account_period }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop= "status"
          label="状态"
          :formatter="formatter_ishandle">
        </el-table-column>
        <el-table-column
          label="汇总表编号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.stock_sum_no }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="collect_data.param.page"
          :page-sizes="[10, 20, 50, 100,500]"
          :page-size="collect_data.param.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCon">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading1:0,
                // 店铺信息
                shopName:[],
                disabled:true,
                DjName:[
                  {
                    name:'自仓入库单',
                    code:1,
                  },{
                    name:'自仓出库单',
                    code:2,
                  },{
                    name:'自仓发货订单',
                    code:4,
                  },{
                    name:'菜鸟交易出库订单',
                    code:3,
                  },{
                    name:'收发存汇总表',
                    code:5,
                  },
                ],
                // 时间类型
                value3:'',
                DateType:[
                  {
                    name:'批次时间',
                    code:1,
                  },{
                    name:'提交时间',
                    code:2,
                  },
                ],
                //时间
                value4:'',
                //数据状态
                ZTName:[
                  {
                    name:'全部',
                    code:-1,
                  },{
                    name:'删除',
                    code:0,
                  },{
                    name:'未提交',
                    code:1,
                  },{
                    name:'已提交',
                    code:2,
                  },{
                    name:'已撤销',
                    code:3,
                  },{
                    name:'已生成汇总表',
                    code:4,
                  },{
                    name:'财务已确认',
                    code:5,
                  },{
                    name:'数据校验',
                    code:6,
                  },
                ],
                // 表格操作
                tableData: [],
                // 总条数
                pageCon:0,
                //查询
                collect_data:{
                  apiName:'waitSubQuery',
                  param:{
                    // 状态
                    status:1,
                    //单据类型
                    type:'',
                    //当前页
                    page: 1,
                    //每页条数
                    pagesize:10,
                    // 店铺id
                    shopid:'',
                    // 开始时间
                    begin_time:'',
                    // 结束时间
                    end_time:'',
                    // 输入批次号
                    batch_no:'',
                  }
                },
                //账期的码表数据
                collect_data1:{
                  apiName:'codeperiod',
                  param:{
                    // status:0,
                  }
                },
                //删除
                collect_data2:{
                  apiName:'SubBatchnodel',
                  param:{
                    batch_no_list:'',
                  }
                },
                //提交参数
                collect_data3:{
                  apiName:'subBatchnosend',
                  param:{
                    batch_no_list:'',
                  }
                },
                //撤销参数
                collect_data4:{
                  apiName:'subBatchnorevoke',
                  param:{
                    batch_no_list:'',
                  }
                },
                codeperiod:[],
                //选中数据
                multipleSelection:[],
                //提交
                subSelection:[],
                //提交按钮可选
                subBottom:0,
                //撤回按钮
                backBottom:0,
                arr:[],
            }
        },
        methods: {
            //格式化对账情况
            formatter_ishandle(row){
                try{
                  switch(row.status)
                  {
                      case 0:
                          row.status = '删除'
                          break;
                      case 1:
                          row.status = '未提交'
                          break;
                      case 2:
                          row.status = '已提交'
                          break;
                      case 3:
                          row.status = '已撤销'
                          break;
                      case 4:
                          row.status = '已生成汇总表'
                          break;
                      case 5:
                          row.status = '财务已确认'
                          break;
                      case 6:
                          row.status = '数据校验'
                          break;
                      case 7:
                          row.status = '导入成功'
                          break;
                      case 8:
                          row.status = '导入失败'
                          break;
                      case 9:
                          row.status = '导入中'
                          break;
                      default:
                          break;
                  }
                    return row.status

                  }catch(err){
                  }
            },
            //格式化单据类型
            formatter_ishandle1(row){
                try{
                  switch(row.type)
                  {
                      case 1:
                          row.type = '自仓入库单'
                          break;
                      case 2:
                          row.type = '自仓出库单'
                          break;
                      case 3:
                          row.type = '菜鸟出入库单'
                          break;
                      case 4:
                          row.type = '自仓订单'
                          break;
                      case 5:
                          row.type = '菜鸟订单'
                          break;
                      default:
                          break;
                  }
                    return row.type

                  }catch(err){
                  }
            },
            //格式化单据类型
            formatter_ishandle1(row){
                try{
                  switch(row.type)
                  {
                      case 1:
                          row.type = '自仓入库单'
                          break;
                      case 2:
                          row.type = '自仓出库单'
                          break;
                      case 3:
                          row.type = '菜鸟出入库单'
                          break;
                      case 4:
                          row.type = '自仓订单'
                          break;
                      case 5:
                          row.type = '菜鸟订单'
                          break;
                      default:
                          break;
                  }
                    return row.type

                  }catch(err){
                  }
            },
            // 改变店铺
            XzShop(){
              console.log(this.value1)
              //获取数据
              // this.require();
            },
            // 改变单据
            DjShop(){
              console.log(this.value2)
              //获取数据
              // this.require();
            },
            // 改变账期
            ZQShop(val){
              console.log(this.tableData)
              console.log(val)
              this.$refs.multipleTable.clearSelection();
            },
            // 改变时间类型
            DateChange(){
              console.log(this.value3)
            },
            // 修改时间
            dateChang(data){
              this.value4 = data;
              this.collect_data.param.begin_time = data[0];
              this.collect_data.param.end_time = data[1];
              //获取数据
              this.require();
            },
            //查询
            onLine(){
              console.log(this.value5)
              //获取数据
              this.require();
            },
            //改变状态
            dataZT(){
              console.log(this.value6);
              this.disabled=true;
              //获取数据
              this.require();
            },
            // 分页方法        
            handleSizeChange(val) {
              this.pagesize = val;
              this.collect_data.param.pagesize = val;
              this.collect_data.param.page = 1;
              //获取数据
              this.require();
            },
            handleCurrentChange(val) {
              this.page = val;
              this.collect_data.param.page = val;
              console.log(val)
              //获取数据
              this.require();
            },
            //查询
            require(){
                this.loading1 = 1;
                this.axios.post('/dc-admin/gate/api',this.collect_data,{type:'payload'}
                ).then(res =>{
                  this.loading1 = 0;
//                console.log('发送的参数',res)
                  var json_data =  JSON.parse(res.data.data)  //解析数据       
//                console.log('json_data',json_data)     
                  this.tableData = json_data.data.result;
                  setTimeout(function(){this.tableData = json_data.data.result;},1000);
                  this.pageCon = json_data.data.recordsNumber;
                });
            },
            //删除数据源
            deleData(){
              this.axios.post('/dc-admin/gate/api',this.collect_data2,{type:'payload'}
              ).then(res =>{
                console.log('发送的参数',res)
                // var json_data =  JSON.parse(res.data.data)  //解析数据       
                // console.log('json_data',json_data)    
                //刷新数据
                this.require();   
              });
            },
            //撤回
            breakData(){
              this.axios.post('/dc-admin/gate/api',this.collect_data4,{type:'payload'}
              ).then(res =>{
                console.log('发送的参数',res)
                // var json_data =  JSON.parse(res.data.data)  //解析数据       
                // console.log('json_data',json_data)       
                //刷新数据
                this.require();
              });
            },
            //提交
            sunData(){
              this.axios.post('/dc-admin/gate/api',this.collect_data3,{type:'payload'}
              ).then(res =>{
                console.log('发送的参数',res)
                // var json_data =  JSON.parse(res.data.data)  //解析数据       
                // console.log('json_data',json_data)       
                //刷新数据
                this.require();
              });
            },
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
            // 选择
            handleSelectionChange(val) {
              this.collect_data2.param.batch_no_list = '';
              this.collect_data3.param.batch_no_list = '';
              this.collect_data4.param.batch_no_list = '';
              for(var i in val){
                this.collect_data2.param.batch_no_list  += val[i].batch_no+',';
                this.collect_data4.param.batch_no_list  += val[i].batch_no+',';
                this.collect_data3.param.batch_no_list += val[i].batch_no+'-'+val[i].account_period+',';
              };
              if(this.collect_data2.param.batch_no_list.length==0){
                    this.subBottom = 0;
                    this.backBottom = 0;
              }
              if(this.collect_data3.param.batch_no_list==''){
                  this.disabled=true;
              }
              // console.log(this.subSelection)
              for(var i in val){
               
                	 //控制可不可以提交
                if((val[i].status!='未提交')&&(val[i].status!='已撤销')){
                  this.subBottom = 0;
                  this.disabled=true;
//                break;
                }else{
                  // 如果没有账期，不可提交
                  if(val[i].account_period==''){
                    this.subBottom = 0;
//                  break;
                  }
                  this.disabled=false;
                  this.subBottom = 1;
                }
              };
				
				this.arr=[];
                for(var i in val){
					this.arr.push(val[i].status)
                };
                var arr2 = this.uniq(this.arr)
                if(arr2[0]=='未提交'&&arr2.length==1){
                	this.disabled=false;
                }else if(arr2[0]=='已撤销'&&arr2.length==1){
                	this.disabled=false;
                }else{
	  			  this.disabled=true;
				}
                

              for(var i in val){
                  //控制可不可以撤回
                  if(val[i].status!='已提交'){
                    this.backBottom = 0;
                    break;
                  }else{
                    this.backBottom = 1;
                  }
              };
            }
        },
        mounted() {
            //店铺信息
            this.shopName = window.shopName;
            //获取数据
            this.require();
            // 获取账期的码表数据
            this.axios.post('/dc-admin/gate/api',this.collect_data1,{type:'payload'}
            ).then(res =>{
              console.log('发送的参数',res)
              var json_data =  JSON.parse(res.data.data)  //解析数据       
              console.log('json_data',json_data)       
              this.codeperiod = json_data.data;
            });
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">

</style>
