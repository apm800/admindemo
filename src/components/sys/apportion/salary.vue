<template>
    <div class="compListZenter"> 
        <span style="display:block">
            <a href="http://admin.blueiec.com/bfecadmin/download/template/salary.xls" download="薪资模板.xls">下载薪资导入模板</a>
        </span>       
        <div class="" style="margin:20px 0px 10px 0px;">
            
            <div style="margin:20px 0;display:inline-block;color:red;">
                <!-- <a href="javascript:;" class="file"> -->
                    <input type="file" name="" id="" @change="ceshi">
                    <!-- <span style="" v-if="!fileList">选择文件</span> -->
                    <!-- <span style="">{{fileList}}</span> -->
                <!-- </a>  -->
            </div>
            <el-button type="warning" @click="jiaoyanStart">开始校验</el-button>
        </div>
        <div style="margin:20px 0">
            <!-- <el-button type="warning" @click="jiaoyan" v-checkup="'purchase_list'">查询</el-button> -->
            <!-- <el-button type="primary" @click="addDialog_select_ware=true"  v-checkup="'*'">确认导入</el-button> -->
            <el-button type="primary" @click="subEnter"  v-checkup="'*'">确认导入</el-button>
            <!-- <el-button type="primary" @click="logicDelete"  v-checkup="'*'">删除上次数据</el-button> -->
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button> -->
            <a href="/rlHistory" class="J_menuItem bottom_title" v-on:click='history'>导入历史</a>
            <el-tag style="margin:0 20px 0 20px" type="success" v-if='statusfalg'>已导入</el-tag>
            <el-tag style="margin:0 20px 0 20px" type="danger" v-else>未导入</el-tag>
            <br>
            <span style="display:inline-block;margin:10px 0" v-if="uploadResult.totalCount">本次共{{uploadResult.totalCount}}条数据，正确{{uploadResult.successCount}}条，异常{{uploadResult.troubleCount}}条</span>
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
            label="法律主体">
            </el-table-column>
            <el-table-column
            prop="legalEntityCode"
            label="法律主体编码">
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
            prop="salary"
            label="工资">
            </el-table-column>
            <el-table-column
            prop="subsidyEat"
            label="补助-误餐补助">
            </el-table-column>
            <el-table-column
            prop="subsidyTraffic"
            label="补助-交通补助">
            </el-table-column>
            <el-table-column
            prop="subsidyCarport"
            label="补助-停车位补助">
            </el-table-column>
            <el-table-column
            prop="subsidyComputer"
            label="补助-电脑补助">
            </el-table-column>
            <el-table-column
            prop="communicationFee"
            label="通讯费">
            </el-table-column>
            <el-table-column
            prop="socialSecurityPensionCompany"
            label="社保养老公司">
            </el-table-column>
            <el-table-column
            prop="socialSecurityUnemploymentCompany"
            label="社保失业公司">
            </el-table-column>
            <el-table-column
            prop="socialSecurityMedicineCompany"
            label="社保医疗公司">
            </el-table-column>
            <el-table-column
            prop="socialSecurityInjuryCompany"
            label="社保工伤公司">
            </el-table-column>
            <el-table-column
            prop="socialSecurityBirthCompany"
            label="社保生育公司">
            </el-table-column>
            <el-table-column
            prop="housingProvidentFundCompany"
            label="住房公积金公司">
            </el-table-column>
            <el-table-column
            prop="severancePackage"
            label="离职补偿金">
            </el-table-column>
            <el-table-column
            prop="commercialInsurance"
            label="商业保险">
            </el-table-column>
            <el-table-column
            prop="yearEndBonus"
            label="全年一次所得">
            </el-table-column>
            <el-table-column
            prop="humanAgencyFee"
            label="人事代理费">
            </el-table-column>
            <el-table-column
            prop="disabilityGuaranteeFee"
            label="残保金">
            </el-table-column>
            <el-table-column
            prop="shareOptionStock"
            label="期权股票">
            </el-table-column>
            <el-table-column
            prop="attendanceCharge"
            label="考勤扣款">
            </el-table-column>
             <el-table-column
            prop="costOfCare"
            label="关爱费用">
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
            	statusfalg:false,
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
                // 店铺信息
                value1:'',
                shopName:[],
                fileList:'',
                fileCon:'',
                url:'/dc-admin/erpsalarycheck/upload/check',
                tableData: [],
                //查询校验结果
                dataWa:{
                  // apiName:'rl_salary_list',
                  param:{
                  }
                },
                //确认导入
                dataWa1:{
                  // apiName:'rl_salary_submit',
                  param:{
                  }
                },
                
            }
        },
        methods: {
            //控制导入历史界面显示
            history(){
                this.$store.state.daoruHistory = 3;
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
                  this.jiaoyan()
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                if(this.tableData!=''){
                  this.jiaoyan()
                }
            },
            // 校验
            jiaoyan(){
                this.loading1 = 1;
                this.dataWa.param.page = this.page;
                this.dataWa.param.limit = this.pagesize;
                this.axios.post('/dc-admin/erpsalarycheck/list', 
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
                this.$router.push({path:'/rlHistory',query:{'come':'first'}})
            },
            //上传按钮
            ceshi(e) {
                this.fileCon = e;
            },
      //开始校验
            jiaoyanStart(){
              if(this.fileCon==''){
                  this.$message({
                        type: 'error',
                        message: "请选择文件"
                    });
                    return;
                }
                var url = "";
                url = this.url+"?userId="+window.userMes.userId+"&userName="+window.userMes.deptName;
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
                        this.jiaoyan();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
              
            },
            //弹出框并且确认导入
            subEnter(e){
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


                this.dataWa1.param.remake = this.textarea;
                this.axios.post('/dc-admin/erpsalarycheck/upload/submit', 
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
                        console.log('',res.data.msg)
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        });
                    }
                    this.addDialog_select_ware = false;
                    this.jiaoyan();
                    this.textarea='';
                });

            },
            logicDelete(){//逻辑删除上次数据
                alert("确认要删除吗?");
            },
            importStatusfun(){
            	this.axios.get('/dc-admin/erprlimporthistory/importStatus/'+3,{type: 'payload'}
               ).then(res =>{
                	if(res.data.code==0){
                		this.statusfalg = true
                	}
               });
            }
        },
        mounted() {    
        	this.importStatusfun()
            //标签
            contabs(this.$router);
            this.$router.push('/salary')
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
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
