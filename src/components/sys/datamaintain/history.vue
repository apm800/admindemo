<template>
    <div class="compHistory animated fadeInDown">
        <a :href="path" style="display:none;" id="aaa" class="J_menuItem bottom_title">{{pathname}}</a>
        <!-- <div class="compHistoryCon">
            <el-date-picker 
            @change='dateChang'
            v-model="value6"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div> -->
        <div class="compHistoryCon">
            <span>店铺名称：</span>
            <el-select v-model="value1" placeholder="请选择店铺名">
                <el-option
                    v-for="item in shopName"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="compHistoryCon">
            <span>批次：</span>
            <el-input style='max-width: 180px;' placeholder="输入关批次号"  v-model="inputSearch" class="input-with-select">
                <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
            </el-input>
            <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'rl_history_list'">查询</el-button>
        </div>
        <el-table
        		v-show=flag
                v-loading="loading1"
                element-loading-text="正在查询..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"


            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
            prop="name"
            label="店铺名称">
            </el-table-column>

            <el-table-column
            label="批次号">
                <template slot-scope="scope">
                    <!-- <el-popover trigger="hover" placement="top"> -->
                    <!-- <p>姓名: {{ scope.row.batchNo }}</p> -->
                    <!-- <p>上传时间: -->
                        <!-- <i class="el-icon-time"></i> -->
                     <!-- {{ scope.row.createTime }}</p> -->
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.batchNo }}</el-tag>
                    </div>
                    <!-- </el-popover> -->
                </template>
            </el-table-column>
            <el-table-column 
            label="操作"
            width="280">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="chakan(scope.$index, scope.row)">查看数据源</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column
            label="状态">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column> -->
            
            <el-table-column
            prop="status"
            :formatter="formatter"
            label="状态">
            </el-table-column>
            
            <el-table-column
            prop="remake"
            label="备注">
            </el-table-column>
            
            <el-table-column
            prop="createTime"
            label="操作时间">
            </el-table-column>
        </el-table>
        <el-table
        		v-show=!flag
                v-loading="loading1"
                element-loading-text="正在查询..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"


            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.file_name }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
            :formatter="formattershopname"
            label="店铺名称">
            </el-table-column>

            <el-table-column
            label="批次号">
            <template slot-scope="scope">
                    <!-- <el-popover trigger="hover" placement="top"> -->
                    <!-- <p>姓名: {{ scope.row.batchNo }}</p> -->
                    <!-- <p>上传时间: -->
                        <!-- <i class="el-icon-time"></i> -->
                     <!-- {{ scope.row.createTime }}</p> -->
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.batch_no }}</el-tag>
                    </div>
                    <!-- </el-popover> -->
                </template>
            </el-table-column>
            <el-table-column 
            label="操作"
            width="280">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="chakan7(scope.$index, scope.row)">查看数据源</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete2(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column
            label="状态">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column> -->
            
            <el-table-column
            prop="status"
            :formatter="formatter"
            label="状态">
            </el-table-column>
            
            <el-table-column
            prop="remake"
            label="备注">
            </el-table-column>
            
            <el-table-column
            prop="create_time"
            label="操作时间">
            </el-table-column>
        </el-table>
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCon">
            </el-pagination>

        <!-- <div style="text-align:center;margin:40px 0;">
            <el-button type="primary" @click="goBack">返回</el-button>
        </div> -->

    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
            	flag:true,
                //查看数据源
                path:'',
                pathname:'',
                //loading1
                loading1:0,
                //分页
                currentPage4: 1,
                // 总条数
                pageCon:0,
                //当前页数
                page:1,
                //每页个数
                pagesize:10,
                // 不同页面接口不同
                url:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdata/batch/list?',
                //历史查询
                dataWa:{
                  apiName:'rl_history_list',
                  param:{
                  }
                },
                dataWa1:{
                  apiName:'batchnorefund',
                  param:{
                  }
                },
                dataWa2:{
                  apiName:'deleterefund',
                  param:{
                  }
                },
                //删除接口
                urldel:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdata/batch/delete/',
                // 输入批次
                inputSearch:'',
                // 店铺信息
                shopName:[],
                value1:'',
                // 时间
                value6:[],
                //店铺
                shopName: [],
                //表格
                tableData: [],
                shop_options:[]
            }
        },
        methods: {
            // 分页方法        
            handleSizeChange(val) {
                this.pagesize = val;
                this.require();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.require();
            },
            // 格式化表格数据是否有异常
            formatter(a){
                if (a.status==0) {
                  return '删除'
                }else if(a.status==1){
                  return '未提交'
                }else if(a.status==2){
                  return '已提交'
                }else if(a.status==3){
                  return '已撤销'
                }else if(a.status==4){
                  return '已生成汇总表'
                }else if(a.status==5){
                  return '财务已确认'
                }else if(a.status==6){
                  return '数据校验'
                }else if(a.status==7){
                  return '导入成功'
                }else if(a.status==8){
                  return '导入失败'
                }else if(a.status==9){
                  return '导入中'
                }
            },
            //返回
            goBack(){
                this.$router.back(-1)
            },
            // 修改时间
            dateChang(data){
            },
            // 查看数据源<a href="/compEnter" class="J_menuItem bottom_title">导入历史</a><br>
            //js模仿点击事件，动态生成a标签并点击
            chakan7(data,befor){
            	this.$store.state.picihao=befor.batch_no
            	this.path = '/aftersaleshow';
                this.pathname = '线下售后数据展示';
                console.log(this.path)
                setTimeout(function(){document.getElementById("aaa").click()},500)
                
            },
            chakan(data,befor){
            	console.log(befor)
//          	if(befor.type==6){
//	            	this.$store.state.picihao = {
//	            		type:6,
//	                	batchNo:befor.batchNo,
//	                	createId:befor.createId,
//	                	createTime:befor.createTime,
//	                	shopid_value:befor.shopid,
//	                }	
//          	}else{
            		this.$store.state.picihao=befor.batchNo
//          	}
                switch(befor.type){
                    case 1:
                        this.path = '/compEnter';
                        this.pathname = '入库单数据源展示（查看数据源）';
                        break;
                    case 2:
                        this.path = '/compCome';
                        this.pathname = '出库单数据源展示（查看数据源）';
                        break;
                    case 3:
                        this.path = '/CaiNiaoOrder';
                        this.pathname = '菜鸟出入库单数据源展示（查看数据源）';
                        break;
                    case 4:
                        this.path = '/supplyTally';
                        this.pathname = '订单记账';
                        break;
                    case 5:
                        this.path = '/supplyTally';
                        this.pathname = '订单记账';
                        break;
                    case 6:
                        this.path = '/purchaseOrder';
                        this.pathname = '采购数据查询';
                        break; 
                    case 7:
                        this.path = '/compListafterasle';
                        this.pathname = '线下售后数据展示';
                        break; 
                    default :
                        break;
                }
                setTimeout(function(){document.getElementById("aaa").click()},500)
                
            },
            // 表格操作
            handleEdit(index, row) {
                var $form = $('<form method="GET"></form>');
                if(this.$store.state.daoruHistory==7){
	                    $form.attr('action', 'http://'+this.$store.state.xianshang+':8021/'+row.file_name);
	                    $form.appendTo($('body'));
	                    $form.submit();
                }else{
	                if(row.backendPath.indexOf("http://") != -1 ){
	                    $form.attr('action', row.backendPath);
	                    $form.appendTo($('body'));
	                    $form.submit();
	                }else{
	                    $form.attr('action', 'http://'+this.$store.state.xianshang+':8077/'+row.backendPath);
	                    $form.appendTo($('body'));
	                    $form.submit();
	                }
                }
            },
            handleDelete(index, row) {
                console.log(this.urldel)
                this.axios.get(this.urldel+row.id,
                {type: 'payload'}
                ).then(res =>{
                    this.require();
                });
            },
            handleDelete2(index, row) {
                this.dataWa2.param.batch_no = row.batch_no;
            	this.axios.post('/dc-admin/gate/api',
                this.dataWa2,{type: 'payload'}).then(res =>{
                	this.require();
                })
            },
            //查询按钮
            chaxun(){
                this.require();
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
            
            //导入历史查询
            require(){
//				batchnorefund
				console.log(this.value1+this.inputSearch)
				this.loading1 = 1;
				this.dataWa.param.type = this.$store.state.daoruHistory;
				if(this.$store.state.daoruHistory==7){
					this.flag = false;
					console.log(12313132)
					console.log(this.$route.params)
					if(this.value1==""&&this.inputSearch==""){
						console.log(9999999)
                		this.dataWa1.param.shopid = this.$route.params.shopid;
                		this.dataWa1.param.batch_no = this.$route.params.batch_no;	
					}else{
						console.log(8888888)
						this.dataWa1.param.shopid = this.value1;
                		this.dataWa1.param.batch_no = this.inputSearch;
					}
                	this.dataWa1.param.page = this.page;
                	this.dataWa1.param.pagesize = this.pagesize;
                	console.log(this.dataWa1)
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa1,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var a = JSON.parse(res.data.data);
                    console.log(a)
                    this.pageCon = parseInt(a.count);
                    this.tableData = a.result;
                    console.log(this.tableData)
                    // this.shopName = JSON.parse(res.data.list);
                });
				}else{
					this.flag = true;
                try{
                    var start = this.value6[0]?this.value6[0]:'';
                    var end = this.value6[1]?this.value6[1]:'';
                }catch(err){}

                this.dataWa.param.page = this.page;
                this.dataWa.param.limit = this.pagesize;
                this.dataWa.param.userid = this.userId;
                this.dataWa.param.startTime = this.start;
                this.dataWa.param.endTime = this.end;
                this.dataWa.param.shopCode = this.value1;
                this.dataWa.param.batchCode = this.inputSearch;

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var a = JSON.parse(res.data.data);
                    console.log(a)
                    this.pageCon = a.page.totalCount;
                    this.tableData = a.page.list;
                    // this.shopName = JSON.parse(res.data.list);
                });
				}
            },
        },
        mounted() {
            this.require();
            // 店铺信息
            this.shopName = window.shopName;
            this.get_shop_list();
            
            //标签
            contabs(this.$router);
            this.$router.push('/compHistory')
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
.compHistoryCon{
    display: inline-block;
    margin: 10px;
}
.bottom_title{
    display: inline-block;
    padding: 0%;
    background-color:#409EFF;
    margin-left:10px;
    text-align: center;
    padding: 5px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
}
.bottom_title:hover{
    color: #fff;
    background-color:#66b1ff;
}
</style>
