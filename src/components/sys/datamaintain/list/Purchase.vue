<template>
    <div class="compListZenter"> 
        <span style="display:block">
            <a href="http://admin.blueiec.com/bfecadmin/download/template/caigoudingdan.xls" download="采购订单.xls">下载采购单模板</a>
        </span>       
        <div class="" style="margin:20px 0px 10px 0px;">
            <span class="mustFill">*</span>
            <span>店铺名称：</span>
            <el-select filterable v-model="value1" placeholder="请选择店铺名" @change='XzShop'>
                <el-option
                  v-for="item in shopName"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
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
            <el-button type="primary" @click="addDialog_select_ware=true"  v-checkup="'purchase_submit'">确认导入</el-button>
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button> -->
            <a href="/compHistory" class="J_menuItem bottom_title" v-on:click='lishi'>导入历史</a><br>
            <span style="display:inline-block;margin:10px 0" v-if="SCjieguo.totalCount">本次共{{SCjieguo.totalCount}}条数据，正确{{SCjieguo.successCount}}条，异常{{SCjieguo.troubleCount}}条</span>
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
            prop="is_ok"
            :formatter="formatter"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="troubleMassage"
            label="异常描述">
            </el-table-column>
            <el-table-column
            prop="externalId"
            label="External ID">
            </el-table-column>
            <el-table-column
            prop="ordersForReference"
            label="订单参照">
            </el-table-column>
            <el-table-column
            prop="appliedAmount"
            label="申请金额">
            </el-table-column>
            <el-table-column
            prop="supplier"
            label="供应商/名字">
            </el-table-column>
            <el-table-column
            prop="applicantName"
            label="申请人/名字">
            </el-table-column>
            <el-table-column
            prop="bankOfDeposit"
            label="开户行">
            </el-table-column>
            <el-table-column
            prop="bankAccount"
            label="银行账号">
            </el-table-column>
            <el-table-column
            prop="payee"
            label="账号收款人">
            </el-table-column>
            <el-table-column
            prop="totalMoney"
            label="总计">
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注">
            </el-table-column>
            <el-table-column
            prop="scheduledDeliveryDate"
            label="预定交货日期">
            </el-table-column>
            <el-table-column
            prop="projectName"
            label="项目名称/项目名称">
            </el-table-column>
            <el-table-column
            prop="deliveryTo"
            label="交货到/显示名称">
            </el-table-column>
            <el-table-column
            prop="warehouse"
            label="仓库/显示名称">
            </el-table-column>
            <el-table-column
            prop="orderQuantity"
            label="订单行/数量">
            </el-table-column>
            <el-table-column
            prop="alreadyReceivedQuantity"
            label="订单行/已接收数量">
            </el-table-column>
            <el-table-column
            prop="taxName"
            label="订单行/税/税金名称">
            </el-table-column>
            <el-table-column
            prop="tax"
            label="订单行/税">
            </el-table-column>
            <el-table-column
            prop="subtotal"
            label="订单行/小计">
            </el-table-column>
            <el-table-column
            prop="orderFormTotal"
            label="订单行/总计">
            </el-table-column>
            <el-table-column
            prop="legalSubject"
            label="项目名称/法律主体/法律主体">
            </el-table-column>
            <el-table-column
            prop="forShort"
            label="项目名称/法律主体/简称">
            </el-table-column>
            <el-table-column
            prop="productName"
            label="订单行/产品/名字">
            </el-table-column>
            <el-table-column
            prop="productBarcode"
            label="订单行/产品/条码">
            </el-table-column>
            <el-table-column
            prop="imprest"
            label="是否为预付款">
            </el-table-column>
            <el-table-column
            prop="orderFormId"
            label="订单行/ID">
            </el-table-column>
            <el-table-column
            prop="financePassTime"
            label="财申通过时间">
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
            <el-dialog title="备注" :visible.sync="addDialog_select_ware">
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
        </el-dialog>


    </div>
</template>

<script>
    import contabs from '../../../../assets/js/contabs';
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
                //上传结果
                SCjieguo:[],
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
                url:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdatapurchasecheck/upload/check',
                tableData: [],
                //校验jiaoyan
                dataWa:{
                  apiName:'purchase_list',
                  param:{
                  }
                },
                //确认导入
                dataWa1:{
                  apiName:'purchase_submit',
                  param:{
                  }
                },
                
            }
        },
        methods: {
            //控制导入历史界面显示
            lishi(){
                this.$store.state.daoruHistory = 6;
            },
            // 改变店铺
            XzShop(){
                try{


                var url = "";
                url = this.url+"?userId="+window.userMes.userId+"&userName="+window.userMes.deptName+"&shopId="+this.value1;
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
//              this.axios.post(url,formData,config).then(res=>{
//                  this.SCjieguo = res.data;
//                  if(res.data.code==0){
//                      this.$message({
//                          type: 'success',
//                          message: '文件解析完毕'
//                      });
//                  }else{
//                      this.$message({
//                          type: 'error',
//                          message: res.data.msg
//                      });
//                  }
//              })

                }catch(err){}
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
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{

                    this.loading1 = 0;
                    var a = JSON.parse(res.data.data);
                    this.pageCon = a.page.totalCount;
                    this.tableData = a.page.list;
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
                this.$router.push({path:'/compHistory',query:{'come':'compListPurchase'}})
            },
            //上传按钮
            ceshi(e) {
                this.fileCon = e;
            },
			//开始校验
            jiaoyanStart(){
            	if(this.value1==''){
                    this.$message({
                        type: 'error',
                        message: "请填选择店铺ID"
                    });
                    return;
                }else if(this.fileCon==''){
                	this.$message({
                        type: 'error',
                        message: "请选择文件"
                    });
                    return;
                }else{
                	
                }
                var url = "";
                url = this.url+"?userId="+window.userMes.userId+"&userName="+window.userMes.deptName+"&shopId="+this.value1;
                var a = this.fileCon.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
                if(postf!='.xlsx' && postf!='.xls' ){
                    this.$message.error('上传文件只能是 xlsx或xls 格式!');
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
                    this.SCjieguo = res.data;
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
                if(this.textarea==''){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }
                

                //判断备注是不是只有回车或者空格
                var reg = /([^\s])/g;
                var arr = this.textarea.match(reg);
                if(arr===null){
                    this.$message({
                        type: 'error',
                        message:'请填写备注信息!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }


                this.dataWa1.param.remake = this.textarea;
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa1,
                {type: 'payload'}
                ).then(res =>{
                    var msg = JSON.parse(res.data.data);
                    if(msg.code==0){
                        this.$message({
                            type: 'success',
                            message: '导入成功！'
                        });
                    }else{
                        msg = msg.msg
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    }
                    this.addDialog_select_ware = false;
                    this.jiaoyan();
                    this.textarea='';
                });

            }
        },
        mounted() {
            // 店铺名称
            this.shopName = window.shopName;
            //标签
            
            contabs(this.$router);
            this.$router.push('/compListPurchase')
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
