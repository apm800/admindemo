<template>
    <div class="compListZenter"> 
        <span style="display:block">
            <a href="http://admin.blueiec.com/bfecadmin/download/template/rl_base.xls" download="人员基础信息模板.xls">下载人员信息模板</a>
        </span>    
        <div class="hahahah" style="display: inline-block;">
        	<div class="" style="margin:20px 0px 10px 0px;">
            
            <div style="margin:20px 0;display:inline-block;color:red;">
                <!-- <a href="javascript:;" class="file"> -->
                    <input type="file" name="" id="" @change="test">
                    <!-- <span style="" v-if="!fileList">选择文件</span> -->
                    <!-- <span style="">{{fileList}}</span> -->
                <!-- </a>  -->
            </div>
            <el-button type="warning" @click="checkStart(5)">开始校验(无办公室)</el-button>
        </div>
        <div style="margin:20px 0">
            <!-- <el-button type="warning" @click="jiaoyan" v-checkup="'purchase_list'">查询</el-button> -->
            <!-- <el-button type="primary" @click="addDialog_select_ware=true"  v-checkup="'*'">确认导入</el-button> -->
            <el-button type="primary" @click="subEnter(5)"  v-checkup="'*'">确认导入(无办公室)</el-button>
            
            <el-tag style="margin:0 20px 0 20px" type="success" v-if='statusfalg'>已导入</el-tag>
            <el-tag style="margin:0 20px 0 20px" type="danger" v-else>未导入</el-tag>
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button> -->
            <!-- <a href="/rlHistory" class="J_menuItem bottom_title" v-on:click='history'>导入历史</a><br> -->
            <span style="display:inline-block;margin:10px 0" v-if="uploadResult.totalCount">本次共{{uploadResult.totalCount}}条数据，正确{{uploadResult.successCount}}条，异常{{uploadResult.troubleCount}}条</span>
        </div>
        </div>
        
		<div class="hahaha"  style="display: inline-block; margin-left: 50px;">
			<div class="" style="margin:20px 0px 10px 0px;" >
            
            <div style="margin:20px 0;display:inline-block;color:red;">
                <!-- <a href="javascript:;" class="file"> -->
                    <input type="file" name="" id="" @change="test">
                    <!-- <span style="" v-if="!fileList">选择文件</span> -->
                    <!-- <span style="">{{fileList}}</span> -->
                <!-- </a>  -->
            </div>
            <el-button type="warning" @click="checkStart(6)">开始校验(有办公室)</el-button>
            
        </div>

        <div style="margin:20px 0">
            <!-- <el-button type="warning" @click="jiaoyan" v-checkup="'purchase_list'">查询</el-button> -->
            <!-- <el-button type="primary" @click="addDialog_select_ware=true"  v-checkup="'*'">确认导入</el-button> -->
            <el-button type="primary" @click="subEnter(6)"  v-checkup="'*'">确认导入(有办公室)</el-button>
            
            <el-tag style="margin:0 20px 0 20px" type="success" v-if='statusfalg2'>已导入</el-tag>
            <el-tag style="margin:0 20px 0 20px" type="danger" v-else>未导入</el-tag>
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button> -->
            <!-- <a href="/rlHistory" class="J_menuItem bottom_title" v-on:click='history'>导入历史</a><br> -->
            <span style="display:inline-block;margin:10px 0" v-if="uploadResult.totalCount">本次共{{uploadResult.totalCount}}条数据，正确{{uploadResult.successCount}}条，异常{{uploadResult.troubleCount}}条</span>
        </div>
		</div>
        

        <div style="margin:20px 0">
            <el-button type="primary" @click="compound"  v-checkup="'*'" :loading="compoundLoading">{{compoundLoading?'数据合成中':'合成数据'}}</el-button>
            <!-- <el-button type="primary" @click="createFun"  v-checkup="'*'" :loading="createFunLoading">
            {{createFunLoading?'数据合成中请耐心等待':'生成分摊比例综合表'}}
            </el-button> -->
            <a href="/rlHistory" class="J_menuItem bottom_title" v-on:click='history'>导入历史</a><br>

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
            prop="troubleMassage"
            label="错误信息">
            </el-table-column>
            <el-table-column
            prop="legalEntityName"
            label="签约组织名称">
            </el-table-column>
            <el-table-column
            prop="legalEntityCode"
            label="签约组织编码">
            </el-table-column>
            <el-table-column
            prop="departmentName"
            label="部门名称">
            </el-table-column>
            <el-table-column
            prop="departmentCode"
            label="部门编码">
            </el-table-column>
            <el-table-column
            prop="workNumber"
            label="工号">
            </el-table-column>
            <el-table-column
            prop="staffName"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="office"
            label="所在办公室">
            </el-table-column> 
        </el-table>
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
              
        <!--弹出框-->
            <!-- <el-dialog title="备注" :visible.sync="addDialog_select_ware">
                <el-input
                autosize
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :rows="4"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDialog_select_ware = false">取 消</el-button>
                    <el-button type="primary" @click="subEnter">确 定</el-button>
                </div>
            </el-dialog> -->
    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
                compoundLoading:false,
                createFunLoading:false,
            	statusfalg:false,
            	statusfalg2:false,
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
                types:'',
                //上传结果
                uploadResult:[],
                //分页
                currentPage4: 1,
                // 总条数
                pageCon:0,
                //当前页数
                page:1,
                //每页个数
                pagesize:10,
                fileList:'',
                fileCon:'',
                url:'/dc-admin/erprlbasecheck/upload/check',
                tableData: [],
                //校验jiaoyan
                dataWa:{
                  // apiName:'rl_base_list',
                  param:{
                  }
                },
                //确认导入
                dataWa1:{
                  // apiName:'rl_base_submit',
                  param:{
                    type:''
                  }
                },
                //合成
                compoundParam:{
                    userInfo:{},
                    param:{}
                },
                
            }
        },
        methods: {
            //控制导入历史界面显示
            history(){
                this.$store.state.daoruHistory = 56;
            },
            // 格式化表格数据是否有异常
            formatter(a){
                if (a.isOk==1) {
                  return '有异常'
                }else{
                  return '无异常'
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
                    var type = this.types
                  this.jiaoyan(type)
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                if(this.tableData!=''){
                    var type = this.types
                  this.jiaoyan(type)
                }
            },
            // 校验
            jiaoyan(type){
                this.loading1 = 1;
                this.dataWa.param.page = this.page;
                this.dataWa.param.limit = this.pagesize;
                this.dataWa.param.type = type;
                this.axios.post('/dc-admin/erprlbasecheck/list', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{

                    this.loading1 = 0;
                    // var a = JSON.parse(res.data.data);
                    this.pageCon = res.data.page.totalCount;
                    this.tableData = res.data.page.list;
                    for(var i in this.tableData){
                      if(this.tableData[i].errorColumnName!=null){
                        this.tableData[i].errorColumnArr=this.filter_array(this.tableData[i].errorColumnName.split(','))//转换成数组并放到errorColumnArr
                      }
                    }
                    // this.shopName = JSON.parse(res.data.list);
                });
            },
//          删除空数组
            filter_array(array){
              return array.filter(item=>item)
            },
            //查看历史
            goHistory(){
                this.$router.push({path:'/rlHistory',query:{'come':'staffInfo'}})
            },
            //上传按钮
            test(e) {
                this.fileCon = e;
            },
            //开始校验
            checkStart(type){
              if(this.fileCon==''){
                  this.$message({
                        type: 'error',
                        message: "请选择文件"
                    });
                    return;
                }
                var url = "";
                url = this.url+
                    "?userId="+window.userMes.userId+
                    "&userName="+window.userMes.deptName+
                    "&type="+type;
                var a = this.fileCon.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
                if(postf!='.xlsx' && postf!='.xls' ){
                    this.$message.error('请先下载数据模板,填写后上传!');
                    return;
                }

                this.fileList = '';
                this.fileList = this.fileCon.target.files[0].name;
//              this.fileCon = e;
                var formData = new FormData();
                for (var i = 0; i < this.fileCon.target.files.length; i++) {
                    var file = this.fileCon.target.files[i];
                    formData.append("file",file);
                }
                formData.append('stype',0);
                let config = {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    },
                    type:'payload',
                }
                this.axios.post(url,formData,config).then(res=>{
                    this.uploadResult = res.data;
                    if(res.data.code==0){
                        this.$message({
                            type: 'success',
                            message: '文件解析完毕'
                        });
                        this.types = type
                        this.jiaoyan(type);
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
              
            },
            //弹出框并且确认导入
            subEnter(type){
                // if(this.textarea==''){
                //     this.$message({
                //         type: 'error',
                //         message:'请填写备注信息!'
                //     });
                //     this.addDialog_select_ware=false;
                //     return;
                // }
                

                //判断备注是不是只有回车或者空格
                // var reg = /([^\s])/g;
                // var arr = this.textarea.match(reg);
                // if(arr===null){
                //     this.$message({
                //         type: 'error',
                //         message:'请填写备注信息!'
                //     });
                //     this.addDialog_select_ware=false;
                //     return;
                // }


                this.dataWa1.param.type = type;
                this.axios.post('/dc-admin/erprlbasecheck/upload/submit', 
                this.dataWa1,
                {type: 'payload'}
                ).then(res =>{
                    // var msg = JSON.parse(res.data.data);
                    if(res.data.code==0){
                        this.importStatusfun();
                        this.$message({
                            type: 'success',
                            message: '导入成功！'
                        });
                    }else{
                        
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        });
                    }
                    this.addDialog_select_ware = false;
                    this.jiaoyan(type);
                    this.textarea='';
                });

            },
            compound(){
                this.compoundParam.userInfo=window.userMes
                this.compoundLoading  = true;
                this.axios.post('/dc-admin/erprlbasecheck/compound',this.compoundParam,{type: 'payload'}).then(res =>{
                	console.log(res)
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
                    this.compoundLoading = false;
                });
            },
            // createFun(){//生成分摊比例综合表
            //     this.createFunLoading = true;
            //     this.axios.get('/dc-admin/erprlsynthetical/create',{type: 'payload'}).then(res =>{
            //     this.createFunLoading = false;
            //     if(res.data.code==0){
            //         this.$message({
            //                 type: 'success',
            //                 message: res.data.msg
            //             });
            //         }else{
            //             this.$message({
            //                 type: 'error',
            //                 message: res.data.msg
            //             });
            //         }
            //     })
                
            // },
            importStatusfun(){
            	this.axios.get('/dc-admin/erprlimporthistory/importStatus/'+56,{type: 'payload'}
               ).then(res =>{
               		console.log(res.data.list)
               		var list = res.data.list
               		if(list.length==2){
               			this.statusfalg = true
               			this.statusfalg2 = true
               		}
					if(list[0].type==5){
               			this.statusfalg = true
					}else{
               			this.statusfalg2 = true
					}
               });
            },
        },
        mounted() {        
			this.importStatusfun();
            
            //标签
            contabs(this.$router);
            this.$router.push('/staffInfo')
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
    .el-icon-loading{
        line-height: 0 !important;
    }
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

</style>
