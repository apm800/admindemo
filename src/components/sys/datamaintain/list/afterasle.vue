<template>
    <div class="compListCcome"> 
        <span style="display:block">
            <a href="http://admin.blueiec.com/bfecadmin/download/template/aftersalereturn.xlsx" download="线下售后退货模板.xls">下载线下售后单模板</a>
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
            <!-- <el-button type="warning" @click="jiaoyan" v-checkup="'edbCn_list'">查询</el-button> -->
            <el-button type="primary" @click="addDialog_select_ware=true" v-checkup="'edbCn_submit'">确认导入</el-button>
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button><br> -->
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
            prop=""
            :formatter="formatter"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="datetime"
            label="日期">
            </el-table-column>
            <el-table-column
            prop="shopname"
            label="店铺名称"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="buyerid"
            label="买家ID"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="tid"
            label="订单编号"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="refundtype"
            label="退换类型"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="buyeraddress"
            label="消费者信息"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="goodsname"
            label="退回商品名称"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="goodsnum"
            label="产品数量"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="barcode"
            label="条形码"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="express"
            label="快递公司"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="expresscode"
            label="退货快递单号"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="warehouse"
            label="仓库是否收到"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="refunddate"
            label="仓库收到退货日期"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="siginname"
            label="签收人"
            show-overflow-tooltip>
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
                url:'http://'+this.$store.state.xianshang+':8021/home/Newdemand/refundupload',
                tableData: [],
                //校验jiaoyan
                dataWa:{
                  apiName:'afterasle_list',
                  param:{
               	 	batch_no:'',
                  	
                  }
                },
                //确认导入
                dataWa1:{
                  apiName:'addrefund_submit',
                  param:{
                  	
                  }
                },
            }
        },
        methods: {
        	
            //控制导入历史界面显示
            lishi(){
            	var that = this
                this.$store.state.daoruHistory = 7;
                this.$router.push({name: 'compHistory', params: {batch_no: that.dataWa.param.batch_no,shopid:that.value1}})

            },
            // 改变店铺
            XzShop(){
                try{
                var url = "";
                url = this.url+"?create_id="+window.userMes.userId+"&create_user="+window.userMes.deptName+"&shopid="+this.value1;
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
                }catch(err){};
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
                this.dataWa.param.pagesize = this.pagesize;
                this.dataWa.param.type=2;
                console.log(this.dataWa.param)
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var a = JSON.parse(res.data.data);
                    this.pageCon = parseInt(a.count);
                    console.log(this.pageCon)
                    this.tableData = a.result;
//                  for(var i in this.tableData){
//                  	if(this.tableData[i].errorColumnName!=null){
//  	                	this.tableData[i].errorColumnArr=this.filter_array(this.tableData[i].errorColumnName.split(','))//转换成数组并放到errorColumnArr
//                  	}
//                  }
                    // this.shopName = JSON.parse(res.data.list);
                });
            },
//          删除空数组
            filter_array(array){
            	return array.filter(item=>item)
            },
            //查看历史
            goHistory(){
                this.$router.push({path:'/compHistory',query:{'come':'compListCcome'}})
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
                url = this.url+"?create_id="+window.userMes.userId+"&create_user="+window.userMes.deptName+"&shopid="+this.value1+"&type="+1;
				console.log(url)
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
					console.log(res)
					this.SCjieguo = res.data;
					this.dataWa.param.batch_no = res.data.batch_no
					this.dataWa1.param.batch_no = res.data.batch_no
                    if(res.data.code==0){
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }else{
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.jiaoyan();
                    }
                })
            	
            },
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
                	console.log(res.data)
                    var msg = res.data;
                    if(msg.code==0){
                        this.$message({
                            type: 'success',
                            message: msg.data
                        });
                    }else{
                        this.$message({
                            type: 'success',
                            message: msg.data
                        });
                    }
                    this.addDialog_select_ware = false;
//                  this.jiaoyan();
                    this.textarea='';
                });
            }
        },
        mounted() {
            // 店铺名称
            this.shopName = window.shopName;
            //标签
            
            contabs(this.$router);
            this.$router.push('/compListafterasle')
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
