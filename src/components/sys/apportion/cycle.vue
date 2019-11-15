<template>
    <div class="compListZenter"> 
              
        <div style="margin:20px 0">
            <el-button type="primary" @click="biginCycle"  v-checkup="'*'">新建周期</el-button>
            <el-button type="danger" @click="endCycle"  v-checkup="'*'">结束周期</el-button>
        </div>

        <el-table
                v-loading="loading1"
                element-loading-text="正在拼命校验..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            :row-style="rowClass"
            :cell-style="cellClass"
            :data="tableData"
            border
            style="width: 100%"
            max-height="600">

            <el-table-column
            prop="cycleName"
            label="周期名称">
            </el-table-column>
            <el-table-column
            prop="cycleCode"
            label="周期编码">
            </el-table-column>
            <el-table-column
            prop="createName"
            label="创建者">
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="updateTime"
            label="修改时间">
            </el-table-column>
            <el-table-column
            prop="status"
            :formatter="formatter"
            label="状态">
            </el-table-column>
            <el-table-column 
            label="操作"
            :width="300">
                <template slot-scope="scope">
                    <!-- <el-button
                    size="mini"
                    @click="queryHistory(scope.$index, scope.row)">查看明细</el-button> -->
                    <el-button
                    size="mini"
                    type="primary"
                    @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="success" @click="createFun"  v-checkup="'*'" :loading="createFunLoading">
                    {{createFunLoading?'数据合成中请耐心等待':'生成分摊比例综合表'}}
                    </el-button>
                    <!-- <el-button type="success" @click="updateSum(scope.$index, scope.row)"  v-checkup="'*'">
                        更新分摊金额
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogswitch"
		  width="30%">
		  <span style="color: red;">请谨慎操作!</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogswitchss">取 消</el-button>
		    <el-button type="primary" @click="dialogswitchbtn">确 定</el-button>
		  </span>
		</el-dialog>
        
        	
        <!--增加-->
        <el-dialog title="新增" :visible.sync="addDialog">
            <el-form :model="addForm">
                <el-form-item label="周期名称" :label-width="'120px'">
                    <el-input v-model="addForm.cycleName" style="width: 300px" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="任务日期" :label-width="'120px'">
                    <el-date-picker
                    v-model="dateValue"
                    @change='dateChange'
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 300px">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="addFinish">确定</el-button>
            </div>
        </el-dialog>

         <!--修改-->
        <el-dialog title="编辑" :visible.sync="editDialog">
            <el-form :model="editForm">
                <el-form-item label="周期名称" :label-width="'120px'">
                    <el-input v-model="editForm.cycleName" style="width: 300px" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="状态" :label-width="'120px'">
                  <el-radio-group v-model="editForm.status">
                    <el-radio :label="1">开启周期</el-radio>
                    <el-radio :label="2">结束周期</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="editFinish">确定</el-button>
            </div>
        </el-dialog>

        <!--结束周期-->
        <el-dialog title="周期管理" :visible.sync="cycleDialog">
            <div slot="footer" class="dialog-footer">
                <el-button @click="cycleDialog = false">取消</el-button>
                <el-button type="primary" @click="endFinish">确定</el-button>
            </div>
        </el-dialog>
        
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCon">
            </el-pagination>
    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
                // 遮罩
                addDialog_select_ware:false,
                createFunLoading:false,
                textarea:'',
                // loading
                loading1:0,
                rowClass: function (row) {//单元格样式
//                  if(row.row.isOk=="1"){
//                      return { "background-color": "#F56C6C","color":"#ccc"}
//                  }
                },
                //分页
                currentPage4: 1,
                // 总条数
                pageCon:0,
                //当前页数
                page:1,
                //每页个数
                pagesize:10,
                addDialog:false,
                editDialog:false,
                cycleDialog:false,
                // 周期名称
                addForm:{
                    "cycleName": ""
                },
                // 周期名称
                editForm:{
                    "cycleName": "",
                    "status":''
                },
                //时间
                dateValue:[],
                url:'/dc-admin/erprldatacheck/upload/check',
                tableData: [],
                //新建周期
                saveApi:{
                  // apiName:'rl_cycle_save',
                  param:{
                    startDate:'',
                    endDate:''
                  }
                },
                //修改周期
                updateApi:{
                  apiName:'rl_cycle_update',
                  param:{
                  }
                },
                editFormdata:{
                	userInfo:{},
                	param:{}
                },
                dialogswitch:false,
                radio: '',
                cycleCode:''
            }
        },
        methods: {
            // 格式化表格数据的状态
            formatter(a){
                if (a.status==1) {
                  return '当前周期'
                } else {
                  return '历史周期'
                }
            },
            cellClass(row) {//单元格样式
                    for(var i in this.tableData){
						if(row.rowIndex==i&&row.row.isOk=="1"&&this.tableData[i].errorColumnName!=null){//筛选条件
	                	    if(row.column.property=='troubleMassage'){
        	    	            return { "background-color": "#F56C6C","color":"#ccc"}
	                	    }
	                	    if(row.column.property==this.tableData[i].errorColumnArr[0]){//少进行遍历
        	    	            return { "background-color": "#F56C6C","color":"#ccc"}
    	    	            }
	    	                if(row.column.property==this.tableData[i].errorColumnArr[1]){
    	    	                return { "background-color": "#F56C6C","color":"#ccc"}
	    	                }
	    	                if(row.column.property==this.tableData[i].errorColumnArr[2]){
    	    	                return { "background-color": "#F56C6C","color":"#ccc"}
	    	                }
	    	                if(row.column.property==this.tableData[i].errorColumnArr[3]){
    	    	                return { "background-color": "#F56C6C","color":"#ccc"}
	    	                }
	    	                if(row.column.property==this.tableData[i].errorColumnArr[4]){
    	    	                return { "background-color": "#F56C6C","color":"#ccc"}
	    	                }
	    	                if(row.column.property==this.tableData[i].errorColumnArr[5]){
    	    	                return { "background-color": "#F56C6C","color":"#ccc"}
	    	                }
						}
                    }
                },
            // 分页方法        
            handleSizeChange(val) {
                this.pagesize = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList()
            },
            // 修改时间
            dateChange(data){
                this.dateValue = data;
            },
            //查询周期信息
            getList(){
                var data = {
                    'page':this.page,
                    'limit':this.pagesize
                };
                this.$http.post('/dc-admin/erprlclearingcycle/list',data,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    this.pageCon=res.page.totalCount;
                    this.tableData=res.page.list;
                })
            },
            //新建周期
            biginCycle(){
                this.addDialog=true;
            },
            dialogswitchbtn(){
                for( var i in this.tableData){
                        if(this.tableData[i].status == 1){
                            console.log('hahahahahahha ')
                            this.editForm = this.tableData[i]
                        }
                    }
            	console.log(this.editForm)
            	this.editForm.status = 2
                this.editFormdata.param = this.editForm
                this.editFormdata.userInfo.userId=window.userMes.userId
                this.editFormdata.userInfo.username=window.userMes.username
				this.axios.post('/dc-admin/erprlclearingcycle/update',this.editFormdata,{type: 'payload'}).then(res =>{
                    this.$message({message: '成功结束',type: 'success'});
                    console.log(res)
                	this.dialogswitch=false
		            this.getList();
                });
            },
            dialogswitchss(){
                this.dialogswitch=false
            },
            //结束周期
            endCycle(){
                this.dialogswitch=true
            	
            },
            endFinish(){
                console.log('结束')
            },
            //确定添加
            addFinish(){
                this.saveApi.param.page = this.page;
                this.saveApi.param.limit = this.pagesize;
                this.saveApi.param.startDate = this.dateValue[0];
                this.saveApi.param.endDate = this.dateValue[1];
                this.saveApi.param.cycleName = this.addForm.cycleName;
                this.axios.post('/dc-admin/erprlclearingcycle/save', 
                this.saveApi,
                {type: 'payload'}
                ).then(res =>{
                    this.addDialog=false;
                    if(res.data.code == 0){
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                });
            },
            edit(a,b){//回显
            	this.editDialog=true;
            	console.log(a,b)
            	this.editForm = b
            },
            createFun(){//生成分摊比例综合表
                this.createFunLoading = true;
                this.axios.get('/dc-admin/erprlsynthetical/create',{type: 'payload'}).then(res =>{
                this.createFunLoading = false;
                if(res.data.code==0){
                    this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
                
            },
            updateCycle(){
                this.editDialog = true;
            },
            updateSum(a,b){
                console.log(b.cycleCode)
                this.cycleCode = b.cycleCode;
                console.log('cycleCode',this.cycleCode)

                var formData = new FormData();
                formData.append("cycleCode",this.cycleCode);
                this.axios.post('/dc-admin/erprlsynthetical/updateSum',formData,{type: 'payload'}).then(res =>{

                    if(res.data.code == 0){
                        // this.editDialog=false;
                         // this.getList();
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                        // this.getList();
                    }
                });
            },
            //修改
            editFinish(){
                this.editFormdata.param = this.editForm
                this.editFormdata.userInfo.userId=window.userMes.userId
                this.editFormdata.userInfo.username=window.userMes.username
				this.axios.post('/dc-admin/erprlclearingcycle/update',this.editFormdata,{type: 'payload'}).then(res =>{

                    if(res.data.code == 0){
                        this.editDialog=false;
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                        this.getList();
                    }
                });
            },
            
        },
        mounted() {           
            //标签
            contabs(this.$router);
            this.$router.push('/cycle');
            this.getList();
            this.dateChange(this.dateValue);
        },
        props: {},
        watch: {}
    }
</script>
<!-- <style lang="less">
  // 上传文件按钮
  /*a  upload */
  .file {
      position: relative;
    //   display: inline-block;
      background: #1ab394;
      border: 1px solid #1ab394;
      border-radius: 4px;
      padding: 6px 12px;
      overflow: hidden;
      color: #fff;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      margin: 10px 20px 20px 0;
      pointer-events: none;
  }
  .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      display: inline-block;
      height: 36px;
      width: 90px;
  }
  .file:hover {
      background: #1ab394;
      border-color: #1ab394;
      color: #fff;
      text-decoration: none;
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

</style> -->
