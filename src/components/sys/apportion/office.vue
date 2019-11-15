<template>
    <div class="compListZenter"> 
              
        <div style="margin:20px 0">
            <el-button type="primary" @click="biginCycle"  v-checkup="'*'">新增办公室</el-button>
            <!-- <el-button type="danger" @click="endCycle"  v-checkup="'*'">结束周期</el-button><br> -->
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
            prop="office"
            label="办公地点">
            </el-table-column>
            <el-table-column
            prop="fee"
            label="工位费">
            </el-table-column>
            <el-table-column
            prop="createUser"
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
            label="操作"
            width="280">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="queryHistory(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--增加-->
        <el-dialog title="新增" :visible.sync="addDialog">
            <el-form :model="addForm">
                <el-form-item label="办公室" :label-width="'120px'">
                    <el-input v-model="addForm.office" style="width: 300px" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="工位费" :label-width="'120px'">
                    <el-input v-model="addForm.fee" style="width: 300px" auto-complete="off"></el-input>
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
                <el-form-item label="办公室" :label-width="'120px'">
                    <el-input v-model="editForm.office" style="width: 300px" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="工位费" :label-width="'120px'">
                    <el-input v-model="editForm.fee" style="width: 300px" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="editFinish">确定</el-button>
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
                // 周期名称
                addForm:{
                    office: '',
                    fee: '',
                },
                // 周期名称
                editForm:{
                    "cycleName": ""
                },
                //时间
                dateValue:[],
                url:'/dc-admin/erprldatacheck/upload/check',
                tableData: [],
                //新建周期
                saveApi:{
                  apiName:'rl_cycle_save',
                  param:{
                  }
                },
                //修改周期
                updateApi:{
                  apiName:'rl_cycle_update',
                  param:{
                  }
                },
                savedata:{
                	userInfo:{},
                	param:{}
                },
                editFormdata:{
                	userInfo:{},
                	param:{}
                }
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
            	this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
            	this.getList();
                
            },
            // 修改时间
            dateChange(data){
                this.dateValue = data;
            },
            //查询周期信息
            getList(){
            	console.log(window.userMes)
                var data = {
                    'page':this.page,
                    'limit':this.pagesize
                };
                this.$http.post('/dc-admin/erprloffice/list',data,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    this.pageCon=res.page.totalCount;
                    this.tableData=res.page.list;
                })
            },
            //新建周期
            biginCycle(){
                this.addDialog=true;
            },
            //结束周期
            endCycle(){
                console.log('结束')
            },
            //确定添加
            addFinish(){
            	if(this.addForm.office==''){
            		this.$message.error('办公室不能为空');
            	}else if(this.addForm.fee==''){
            		this.$message.error('工位费不能为空');
            	}else{
                this.savedata.userInfo.userId=window.userMes.userId
                this.savedata.userInfo.username=window.userMes.username
                this.savedata.param=this.addForm
                
                this.axios.post('/dc-admin/erprloffice/save',this.savedata,{type: 'payload'}).then(res =>{
                    this.addDialog=false;
                    console.log(res)
		            this.getList();
                });
            	}
                
            },
            edit(a,b){//回显
            	this.editDialog=true;
            	this.editForm = b;
            },
                        //修改
            editFinish(){
            	this.editFormdata.param = this.editForm
                this.editFormdata.userInfo.userId=window.userMes.userId
                this.editFormdata.userInfo.username=window.userMes.username
				this.axios.post('/dc-admin/erprloffice/update',this.editFormdata,{type: 'payload'}).then(res =>{
                    this.$message({message: '修改成功',type: 'success'});
                    this.editDialog=false;
                    console.log(res)
		            this.getList();
                });
            },
            
            updateCycle(){
                this.editDialog = true;
            },
            queryHistory(a,b){
            	console.log(a,b)
                this.axios.get('/dc-admin/erprloffice/delete/'+b.id,{type:'payload'}).then((res)=>{
                	console.log(res)
                	this.getList()
                	
                })
            	
            	
            },

            
        },
        mounted() {           
            //标签
            contabs(this.$router);
            this.$router.push('/office');
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
