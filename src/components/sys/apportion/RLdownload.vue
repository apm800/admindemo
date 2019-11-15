<template>
    <div class="compListZenter"> 

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
            width="280">
                <template slot-scope="scope">
                    <!-- <el-button
                    size="mini"
                    @click="queryHistory(scope.$index, scope.row)">查看明细</el-button> -->
                    <el-button
                    size="mini"
                    type="primary"
                    :disabled="scope.row.status == '2'?false:true"
                    @click="download(scope.$index, scope.row)">下载数据</el-button>
                    <el-button
                    size="mini"
                    type="primary"
                    :disabled="scope.row.status == '2'?false:true"
                    @click="HRdownload(scope.$index, scope.row)">HR下载</el-button>
                </template>
            </el-table-column>
        </el-table>

      
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
                cycleDialog:false,
                // 周期名称
                addForm:{
                    "cycleName": ""
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
                if(this.tableData!=''){
                    this.getList()
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                if(this.tableData!=''){
                    this.getList()
                }
            },
            download(a,b){
              var deptName = window.userMes.deptName;

              if (deptName == '运营中心') {
              var downloadURL = '/dc-admin/erprlsynthetical/downloadModel';
              var form = $("<form>"); //定义一个form表单 
              form.attr('style','display:none'); //在form表单中添加查询参数 
              form.attr('target',''); 
              form.attr('method','get'); 
              form.attr('action',downloadURL); 
               
              var a = $('<input>');   
                  a.attr('type','hidden');   
                  a.attr('name','cycleCode');  
                  a.attr('value',b.cycleCode); 
                  form.append(a); 
                  $('body').append(form); //将表单放置在web中
              form.submit();   //表单提交 
              }else{
                this.$alert('运营中心人员才能下载', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
              }
            },
            HRdownload(a,b){
              var roleNamelist = window.userMes.roleList
              var flag = 0;
                for( var i in roleNamelist){
                    if(roleNamelist[i].roleName=='HR'){
                        flag = 1;
                    }
                }

              if (flag == 1) {var downloadURL = '/dc-admin/erprlsynthetical/downloadModel';
              var form = $("<form>"); //定义一个form表单 
              form.attr('style','display:none'); //在form表单中添加查询参数 
              form.attr('target',''); 
              form.attr('method','get'); 
              form.attr('action',downloadURL); 
               
              var a = $('<input>');   
                  a.attr('type','hidden');   
                  a.attr('name','cycleCode');  
                  a.attr('value',b.cycleCode); 
                  form.append(a); 
                  $('body').append(form); //将表单放置在web中
              form.submit();   //表单提交 
             }else{
                this.$alert('HR才能下载', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
             }

              // var downloadURL = '/dc-admin/erprlsynthetical/downloadModel';
              // var form = $("<form>"); //定义一个form表单 
              // form.attr('style','display:none'); //在form表单中添加查询参数 
              // form.attr('target',''); 
              // form.attr('method','get'); 
              // form.attr('action',downloadURL); 
               
              // var a = $('<input>');   
              //     a.attr('type','hidden');   
              //     a.attr('name','cycleCode');  
              //     a.attr('value',b.cycleCode); 
              //     form.append(a); 
              //     $('body').append(form); //将表单放置在web中
              // form.submit();   //表单提交 
                
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
            //结束周期
            endCycle(){
                this.cycleDialog = true;
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
                this.axios.post('/dc-admin/gate/api', 
                this.saveApi,
                {type: 'payload'}
                ).then(res =>{
                    this.addDialog=false;
                    var msg = JSON.parse(res.data.data);
                    if(msg.code == 0){
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: msg.msg
                        });
                    }
                });
            },
            edit(id){//回显
                var data = {
                    'page':this.page,
                    'limit':this.pagesize
                };
                this.$http.post('/dc-admin/erprlclearingcycle/list',data,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    if(res.code==0){
                        this.editDialog=true;
                        this.editForm=res.page.list.get[id];
                    }
                })
                // this.$http.get('/dc-admin/sys/user/info/'+id).then((response)=>{
                //     var res = response.data;
                //     if(res.code==0){
                //         this.editDialog=true;
                //         this.editForm=res.user;
                //         this.chooseDeptData={
                //             deptName: this.editForm.deptName,
                //             deptId: this.editForm.deptId,
                //         }
                //     }
                // })
            },
            updateCycle(){
                this.editDialog = true;
            },
            //修改
            editFinish(){
                this.updateApi.param.page = this.page;
                this.updateApi.param.limit = this.pagesize;
                this.updateApi.param.startDate = this.dateValue[0];
                this.updateApi.param.endDate = this.dateValue[1];
                this.updateApi.param.cycleName = this.addForm.cycleName;
                this.axios.post('/dc-admin/gate/api', 
                this.updateApi,
                {type: 'payload'}
                ).then(res =>{
                    this.addDialog=false;
                    var code = res.data.code;
                    if(code==0){
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });
            },
            
        },
        mounted() {    
            this.getList();       
            //标签
            contabs(this.$router);
            this.$router.push('/RLdownload');
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
