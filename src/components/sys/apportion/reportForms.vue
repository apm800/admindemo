<template>
  <div class="pDetail"> 

        <el-table
                v-loading="loading1"
                element-loading-text="正在拼命校验..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
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
            width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    :disabled="scope.row.status == '2'?false:true"
                    @click="queryDetail(scope.$index, scope.row)">查看明细</el-button>
                    <el-button
                    size="mini"
                    :disabled="scope.row.status == '2'?false:true"
                    type="primary"
                    @click="edit(scope.$index, scope.row)">下载</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 20, 50]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCon">
        </el-pagination>

        <el-table
        :data="tableData2"
        border
        style="width: 100%"  v-loading="loading1"
                  element-loading-text="正在查询..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)" >
            <el-table-column
            prop="legalEntityName"
            fixed
            label="人员签订法律主体">
            </el-table-column>
            <el-table-column
            prop="legalEntityCode"
            fixed
            label="法律主体编码">
            </el-table-column>
            <el-table-column
            prop="departmentName"
            fixed
            label="人员所在部门">
            </el-table-column>
            <el-table-column
            prop="departmentCode"
            fixed
            label="人员所在部门编码">
            </el-table-column>
            <el-table-column
            prop="workNumber"
            fixed
            label="工号">
            </el-table-column>
            <el-table-column
            prop="staffName"
            fixed
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="projectGroup"
            label="分摊到项目组">
            </el-table-column>
            <el-table-column
            prop="project"
            label="项目">
            </el-table-column>
            <el-table-column
            prop="projectDepartmentCode"
            label="分摊到部门">
            </el-table-column>
            <el-table-column
            prop="projectDepartment"
            label="分摊到部门名称">
            </el-table-column>
            <el-table-column
            prop="projectLegalName"
            label="分摊到法律主体">
            </el-table-column>
            <el-table-column
            prop="scale"
            label="分摊比例">
            </el-table-column> 
						<el-table-column
            prop="salary"
            label="工资" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="subsidyEat"
            label="补助-误餐补助" v-if='hrfalg'>
            </el-table-column>	
            <el-table-column
            prop="subsidyTraffic"
            label="补助-交通补助" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="subsidyCarport"
            label="补助-停车位补助" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="subsidyComputer"
            label="补助-电脑补助" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="communicationFee"
            label="通讯费" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="socialSecurityPensionCompany"
            label="社保养老公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="socialSecurityUnemploymentCompany"
            label="社保失业公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="socialSecurityMedicineCompany"
            label="社保医疗公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="socialSecurityInjuryCompany"
            label="社保工伤公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="socialSecurityBirthCompany"
            label="社保生育公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="housingProvidentFundCompany"
            label="住房公积金公司" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="severancePackage"
            label="离职补偿金" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="commercialInsurance"
            label="商业保险" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="yearEndBonus"
            label="全年一次所得" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="humanAgencyFee"
            label="人事代理费" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="disabilityGuaranteeFee"
            label="残保金" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="shareOptionStock"
            label="期权股票" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="attendanceCharge"
            label="考勤扣款" v-if='hrfalg'>
            </el-table-column>
            <el-table-column
            prop="costOfCare"
            label="关爱费用" v-if='hrfalg'>
            </el-table-column>

						
						
      </el-table>
      <el-pagination
            background
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage5"
            :page-sizes="[10, 20, 50]"
            :page-size="pagesize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCon1">
        </el-pagination>
      
  </div>    
</template>

<script>
    export default {
        data() {
          return {
          			hrfalg:false,
                disabled:true,
                biaotou:[],
                url:'http://'+this.$store.state.xianshang+':8021/home/Resource/upload',
                // url:'http://172.18.62.176:8072/bfec-erp/anon/importExcel',
                // 总条数
                pageCon:0,
                pageCon1:0,
                loading1:false,
                //当前页数
                page:1,
                //每页个数
                pagesize:5,
                page1:1,
                //每页个数
                pagesize1:10,
                tableData:[],
                tableData2:[],
                currentPage4:1,
                currentPage5:1,
                // 查询接口
                dataWa:{
                  apiName:'showincome',
                  param:{
                      shop_id:"",
                      years:"",
                  }
                },
                detaildata:{
                	param: {
                    cycleCode:'',
                    page:"" ,
                    limit: ""
                          }
                }
		    }
      },
		    methods: {
			handleSizeChange(val) {
                this.pagesize = val;
            	this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
            	this.getList();
            },
			handleSizeChange1(val) {
                this.pagesize1 = val;
            	this.queryDetaildata();
            },
            handleCurrentChange1(val) {
                this.page1 = val;
            	this.queryDetaildata();
            },
          // 格式化表格数据的状态
            formatter(a){
                if (a.status==1) {
                  return '当前周期'
                } else {
                  return '历史周期'
                }
            },
          //查询周期信息
            getList(){
                var data = {
                    'page':this.page,
                    'limit':this.pagesize
                };
                this.$http.post('/dc-admin/erprlclearingcycle/list',data,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    console.log(res)
                    this.pageCon=res.page.totalCount;
                    this.tableData=res.page.list;
                })
            },
               queryDetail(a,b){
               	console.log(a,b)
               	this.bcycleCode = b.cycleCode
               	this.queryDetaildata()
            //     调用 localhost:8072/bfec-erp/erprlsynthetical/queryReportForms
               },
                queryDetaildata(){
	            	  this.detaildata.userInfo = window.userMes
                  this.detaildata.param.cycleCode = this.bcycleCode
                  this.detaildata.param.page = this.page1
	               	this.detaildata.param.limit = this.pagesize1
	        		     var url='/dc-admin/erprlsynthetical/queryReportForms';
  		            this.axios.post(url,this.detaildata,{type: 'payload'}).then(res =>{
                    // console.log(res)
  	            	if(res.data.code==0){
                        this.pageCon1=res.data.page.totalCount;
                        this.tableData2 = res.data.page.list
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
	            })
	            },
            edit(a,b){


              var downloadURL = '/dc-admin/erprlsynthetical/download';
              var form = $("<form>"); //定义一个form表单 
              form.attr('style','display:none'); //在form表单中添加查询参数 
              form.attr('target',''); 
              form.attr('method','get'); 
              form.attr('action',downloadURL); 
               
              var a = $('<input>');   
                  a.attr('type','hidden');   
                  a.attr('name','deptName');  
                  a.attr('value',window.userMes.deptName); 
                  form.append(a); 
              var b1 = $('<input>');   
                  b1.attr('type','hidden');   
                  b1.attr('name','userId');  
                  b1.attr('value',window.userMes.userId); 
                  form.append(b1);  
              var c = $('<input>');   
                  c.attr('type','hidden');   
                  c.attr('name','cycleCode');  
                  c.attr('value',b.cycleCode); 
                  form.append(c);   
                  $('body').append(form); //将表单放置在web中
              form.submit();   //表单提交 

            },
            roleNamehrfun(){
	            var roleNamelist = window.userMes.roleList
		        	for( var i in roleNamelist){
		        		if(roleNamelist[i].roleName=='HR'){
		        			console.log('hahahahahahha ')
		        			this.hrfalg = true
		        		}
		        	}
            }
            
        },
        mounted() {
        	this.roleNamehrfun()
       		this.getList();
    }
  }
</script>