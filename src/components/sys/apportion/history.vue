<template>
    <div class="rlHistory animated fadeInDown">
        <a :href="path" style="display:none;" id="aaa" class="J_menuItem bottom_title">{{pathname}}</a>

        <div class="compHistoryCon">
            <span>周期编码：</span>
            <el-input style='max-width: 180px;' placeholder="输入周期编码"  v-model="inputSearch" class="input-with-select">
                <!--<el-button slot="append" icon="el-icon-search" @click=''></el-button>-->
            </el-input>
        </div>
        <el-button style="margin-left:20px;" type="primary" @click="query" >查询</el-button>
        <el-table
        		v-show=flag
                v-loading="loading1"
                element-loading-text="正在查询..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="createUser"
            label="创建者">
            </el-table-column>
            
            <el-table-column
            prop="createTime"
            label="创建时间">
            </el-table-column>

            <el-table-column
            prop="cycleName"
            label="周期名称">
            </el-table-column>

            <el-table-column
            prop="cycleCode"
            label="周期编码">
            </el-table-column>

            <!-- <el-table-column
            label="批次号">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.batchNo }}</el-tag>
                    </div>
                </template>
            </el-table-column> -->
            
            <el-table-column
            prop="status"
            :formatter="formatter"
            label="状态">
            </el-table-column>

            <el-table-column
            prop="type"
            :formatter="formatter1"
            label="类型">
            </el-table-column>
            
            <!-- <el-table-column
            prop="remake"
            label="备注">
            </el-table-column> -->
            
            <el-table-column
            prop="fileName"
            label="文件名称">
            </el-table-column>

            <el-table-column 
            label="操作"
            width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="download(scope.$index, scope.row)">下载数据</el-button>
                    <!-- <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">下载</el-button> -->
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
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
                url:'/dc-admin/erpdata/batch/list?',
                //历史查询
                dataWa:{
                  // apiName:'rl_history_list',
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
                urldel:'/dc-admin/erprlimporthistory/delete/',
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
                  return '校验状态'
                }else if(a.status==2){
                  return '已导入'
                }
            },
            // 格式化表格数据是否有异常
            formatter1(a){
                if (a.type==1) {
                  return '项目信息'
                }else if(a.type==2){
                  return '人员信息'
                }else if(a.type==3){
                  return '薪资信息'
                }else if(a.type==5){
                  return '无办公室信息'
                }else if(a.type==6){
                  return '有办公室信息'
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
            // 下载数据
            download(index, row) {

                var $form = $('<form method="GET"></form>');
                if(row.backendPath.indexOf("http://") != -1 ){
                    $form.attr('action', row.backendPath);
                    $form.appendTo($('body'));
                    $form.submit();
                }else{
                    $form.attr('action', 'http://'+this.$store.state.xianshang+':8077/'+row.backendPath);
                    $form.appendTo($('body'));
                    $form.submit();
                }

            },
            handleDelete(index, row) {
                console.log(this.urldel)
                this.axios.get(this.urldel+row.id,
                {type: 'payload'}
                ).then(res =>{

                    if(res.data.code==0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.require();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                    
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
            query(){
                this.require();
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
                this.dataWa.param.cycleCode = this.inputSearch;

                this.axios.post('/dc-admin/erprlimporthistory/list', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    // var a = JSON.parse(res.data.data);
                    // console.log(a)
                    this.pageCon = res.data.page.totalCount;
                    this.tableData = res.data.page.list;
                    // this.shopName = JSON.parse(res.data.list);
                });
				}
            },
        },
        mounted() {
            this.require();
            //标签
            contabs(this.$router);
            this.$router.push('/rlHistory')
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
