<template>
    <div class="compListCenter"> 
        <span style="display:block">
            <a href="http://admin.blueiec.com/bfecadmin/download/template/cainiaomuban.xlsx" download="菜鸟订单出入库模板.xls">下载菜鸟订单出入库模板</a>
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
            <!-- <el-button type="warning" @click="jiaoyan">校验</el-button> -->
            <el-button type="primary" @click="addDialog_selectBtn" v-checkup="'CNupload'">确认导入</el-button>
            <!-- <el-button type="primary" @click="goHistory">导入历史</el-button><br> -->
            <a href="/compHistory" class="J_menuItem bottom_title" v-on:click='lishi'>导入历史</a><br>
            <span style="display:inline-block;margin:10px 0" v-if="SCjieguo.totalCount">本次共{{SCjieguo.totalCount}}条数据，正确{{SCjieguo.successCount}}条，异常{{SCjieguo.troubleCount}}条</span>
        </div>
            
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
                flag:false,
                textarea:'',
                //上传结果
                SCjieguo:[],
                // 店铺信息
                value1:'',
                shopName:[],
                fileList:'',
                fileCon:'',
                url:'http://'+this.$store.state.xianshang+':8020/api/upload',
                tableData: [],
                //批次号
                picino:'',
                //文件名
                filename:'',
                // 上传
                dataWa:{
                  apiName:'CNupload',
                  param:{
                      shopid:'',
                      batch_no:'',
                      filename:'', 
                  }
                },
            }
        },
        methods: {
            //控制导入历史界面显示
            lishi(){
                this.$store.state.daoruHistory = 5;
            },
            // 改变店铺
            XzShop(){
                try{
                var url = "";
                url = this.url;
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
                this.axios.get('http://'+this.$store.state.xianshang+':8072/bfec-erp/edbCn/list?page='+this.page+'&limit='+this.pagesize+'&userid='+window.userMes.userId,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    this.pageCon = res.data.page.totalCount;
                    this.tableData = res.data.page.list;
                    // this.shopName = JSON.parse(res.data.list);
                });
            },
            //查看历史
            goHistory(){
                this.$router.push({path:'/compHistory',query:{'come':'compListCenter'}})
            },
            //上传按钮
            ceshi(e) {
                this.fileCon = e;
                
            },
            jiaoyanStart(b){
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
                url = this.url;
                var a = this.fileCon.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
//              if(postf!='.xlsx' && postf!='.xls' ){
//                  this.$message.error('上传文件只能是 xlsx或xls 格式!');
//                  return;
//              }

                this.fileList = '';
                this.fileList = this.fileCon.target.files[0].name;
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
                    this.picino = res.data.data.batch_no;
                    this.filename = res.data.data.filename;
                    console.log(res.data)
                    if(res.data.code==0){
                    	this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }else if(res.data.code==1){
                    	this.$message({
                           	type: 'success',
                            message: res.data.message
                        });
                    }

                })
            },
			addDialog_selectBtn(){
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
                url = this.url;
                var a = this.fileCon.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
//              if(postf!='.xlsx' && postf!='.xls' ){
//                  this.$message.error('上传文件只能是 xlsx或xls 格式!');
//                  return;
//              }

                this.fileList = '';
                this.fileList = this.fileCon.target.files[0].name;
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
                    this.picino = res.data.data.batch_no;
                    this.filename = res.data.data.filename;
                    if(res.data.code==0){
                    	this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }else if(res.data.code==1){
                    	this.$message({
                           	type: 'success',
                            message: res.data.message
                        });
                        this.addDialog_select_ware = true;
                        
                    }
                })
			},
//          确认导入
            subEnter(e){
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

                if(this.filename==''){
                    this.$message({
                        type: 'error',
                        message:'请选择文件!'
                    });
                    this.addDialog_select_ware=false;
                    return;
                }

                //店铺、编号、备注信息赋值
                this.dataWa.param.shopid = this.value1;
                this.dataWa.param.filename = this.filename;
                this.dataWa.param.batch_no = this.picino;
                this.dataWa.param.remake = this.textarea;
				console.log(this.dataWa)
                // 获取页面数据
                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                  ).then(res =>{
                        var msg = JSON.parse(res.data.data);
                        if(msg.code==1){
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
                        this.textarea='';
                });
                this.textarea = '';

            }
        },
        mounted() {
            // 店铺名称
            this.shopName = window.shopName;
            //标签
            
            contabs(this.$router);
            this.$router.push('/compListCenter')
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
