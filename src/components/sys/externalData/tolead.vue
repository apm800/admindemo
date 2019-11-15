<template>
    <div class="exeTole">
<!-- 任务列表开始 -->
<div>
    
<!-- 导入弹出框 -->
        <el-dialog :visible.sync="addDialog_select_ware" center width='300px'>
            <div class="exeQRcode">
	            <input style="margin-left:10px;" type="file" name="" id="" @change="ceshi">
            </div>
            <div class="exeToleCon">
                <el-button style="" type="primary" @click="daoru">确认导入</el-button>
            </div>
        </el-dialog>

        <div style="border-bottom:1px solid #ccc;">
            <div class="exeToleCon">
                <span>当前项目：</span>
                <el-select v-model="value1" placeholder="请选择项目" @change="shop_xin">
                    <el-option
                        v-for="item in shopName"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
                <!-- <a href="javascript:;">生成任务</a> -->
            </div>

            <div class="exeToleCon">
                <span>任务日期：</span>
                <!-- <el-date-picker
                v-model="value6"
                @change='dateChang'
                value-format="yyyy-MM-dd"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker> -->
                <el-date-picker
                value-format="yyyy-MM"
                v-model="value7"
                @change='dateChang'
                type="month"
                placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="exeToleCon">
                <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'LJS_get_target_daily_data'">查询</el-button>
            </div>
            <div class="exeToleCon">
                <el-button style="margin-left:20px;" type="primary" @click="addDialog_select_ware=true">导入</el-button>
            </div>
            <div class="exeToleCon">
                <!-- <a href="http://47.104.20.122:8077/bfecadmin/download/template/LJS_daorujihua.xlsx" download="导入目标数据模板.xls">下载模板</a> -->
                <a :href="'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_target_daily'" download="导入目标数据模板.xls">下载模板</a>
                
            </div>
        </div>
        <!-- 不可提交按钮 -->
        <!-- <span v-if='!subBottom'>
            <el-button style="margin: 10px 20px 10px 0" type="primary" @click="begin" v-checkup="'LJS_do_operation_task'">开始执行</el-button>
        </span>
        <span v-if='subBottom'>
            <el-button style="margin: 10px 20px 10px 0" type="primary" disabled v-checkup="'LJS_do_operation_task'">开始执行</el-button>
        </span> -->
        <!-- 不可撤销按钮 -->
        <!-- <span>
            <el-button style="margin: 10px 20px 10px 0" type="warning" @click="zuofei" v-checkup="'LJS_do_operation_task'">作废</el-button>
        </span> -->
        <el-table
                v-loading="loading1"
                element-loading-text="正在查询..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="project_name"
            label="项目名称">
            </el-table-column>
            <el-table-column
            prop="project_id"
            label="项目id">
            </el-table-column>
            <el-table-column
            prop="this_date"
            label="统计日期">
            </el-table-column>
            <el-table-column
            prop="pay_fund"
            label="销售额">
            </el-table-column>
            <el-table-column
            prop="uv"
            label="UV">
            </el-table-column>
            <el-table-column
            prop="conversion"
            label="转化率(不含%)">
            </el-table-column>
            <el-table-column
            prop="basket_size"
            label="客单价">
            </el-table-column>
            <el-table-column
            prop="newer_percent"
            label="新用户百分比(不含%)">
            </el-table-column>
            <el-table-column
            prop="lineless_percent"
            label="手机成交百分比(不含%)">
            </el-table-column>
            
            <!-- <el-table-column 
            label="操作"
            width="100">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    v-if="(scope.row.state==3||scope.row.state==4)?true:false"
                    @click="chakan(scope.$index, scope.row)" v-checkup="'LJS_get_target_daily_data_detail'">查看</el-button>
                </template>
            </el-table-column>   -->
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
</div>
<!-- 任务列表结束 -->
    
</div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
                //导入弹窗
                addDialog_select_ware:false,
                //执行按钮可选
                subBottom:1,
                //二维码操作
                loading2:false,
                loading2_text:'正在获取二维码中，这需要花费您一些时间，请勿关闭弹出框，请您耐心等待~',
                //二维码图片
                QRimg:'',
                //查询任务
                dataWaList:{
                  apiName:'LJS_get_target_daily_data',
                  param:{
                  }
                },
                //操作接口
                // 执行 start
                // 作废 cancel
                // 详情 details
                caozuo1:{
                  apiName:'LJS_do_operation_task',
                  param:{
                  }
                },
                //是否是详情页
                details:false,
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
                // url:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdata/batch/list?',
                url:'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/put_plan_target/?',
                //历史查询
                dataWa:{
                  apiName:'LJS_get_qr_image',
                  param:{
                  }
                },
                //删除接口
                urldel:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdata/batch/delete/',
                // 输入批次
                inputSearch:'',
                // 店铺信息
                shopName:[],
                value1:'22',
                value11:'',
                // 时间
                pickerOptions2:{
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7:'',
                value6:{},
                //表格
                tableData: [],
                //选中的任务
                renwuList:[],
                //文件列表
                fileCon:'',
            }
        },
        methods: {
            //选中
            handleSelectionChange(val){
                this.renwuList=[];
                for(var i in val){
                    this.renwuList.push(val[i].task_id)
                }
                for(var a in val){
                    //控制可不可以提交
                    if(val[a].state!=1&&val[a].state!=4){
                        this.subBottom = 1;
                        this.$message({
                            type: 'error',
                            message: "所选任务中只能有状态为“未执行”或“执行失败”的任务！"
                        });
                        return;
                    }else{
                        this.subBottom = 0;
                    }
                };
            },
            //获取项目id和项目名称
            shop_xin(val){
                for(var i in this.shopName){
                    if(this.shopName[i].code==val){
                        this.value11 = this.shopName[i].name;
                        return;
                    }
                }
            },
            //开始执行
            begin(){
            },
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
                if (a.state==-1) {
                  return '全部'
                }else if(a.state==1){
                  return '未开始'
                }else if(a.state==2){
                  return '数据采集中'
                }else if(a.state==3){
                  return '数据采集成功'
                }else if(a.state==4){
                  return '数据采集异常'
                }

            },
            // 格式化授权时间
            formatter1(a){
                if (a.grant_datetime=="None") {
                  return '无'
                }else{
                    return a.grant_datetime;
                }
            },
            formatter2(a){
                if (a.task_date=="None") {
                  return '无'
                }else{
                    return a.task_date;
                }
            },
            formatter3(a){
                if (a.create_datetime=="None") {
                  return '无'
                }else{
                    
                    return a.create_datetime.substr(0,19);
                }
            },
            //返回
            goBack(){
                this.$router.back(-1)
            },
            // 修改时间
            dateChang(data){
                var arr = data.split('-')
                console.log(arr)
                this.getLastDay(arr[0],arr[1])
            },
            //任务状态渲染从这里开始
            getLastDay(year,month) {   
                 var new_year = year;  //取当前的年份   
                 var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）   
                 if(month>13)      //如果当前大于12月，则年份转到下一年   
                 {   
                     new_month -=13;    //月份减   
                     new_year++;      //年份增   
                 }   
                var newnew_date = new Date(new_year,new_month,1);        //取当年当月中的第一天  
                var end_date = (new Date(newnew_date.getTime()-1000*60*60*24)).getDate(); //取当年当月中的最后一天 
                if (new_month < 10) {
                    new_month = '0' + new_month
                }
                this.value6.start = ''+year+'-'+new_month+'-01';//搜索的开始时间
                this.value6.end = ''+year+'-'+new_month+'-'+end_date;//搜索本月结束时间
                // this.require();//开始查询
            },
            //重新采集
            chongxin(){
                // this.addDialog_select_ware = true;
            },
            // 表格操作
            handleEdit(index, row) {
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
                this.axios.get(this.urldel+row.id,
                {type: 'payload'}
                ).then(res =>{
                    this.require();
                });
            },
            //查询按钮
            chaxun(){
                this.require();
            },
            //导入历史查询
            require(){
                if(this.value1==''){
                    this.$message({
                        type: 'error',
                        message: "请选择店铺"
                    });
                    return;
                }
                if(this.value7==''){
                    this.$message({
                        type: 'error',
                        message: "请选择日期"
                    });
                    return;
                }


                this.loading1 = 1;

                this.dataWaList.param.project_name = this.value11;
                this.dataWaList.param.project_id = this.value1 ;
                this.dataWaList.param.state = this.renwutype;
                this.dataWaList.param.date_start = this.value6.start;
                this.dataWaList.param.date_end = this.value6.end;
                this.dataWaList.param.page_size = this.pagesize;
                this.dataWaList.param.page_index = this.page;

                // this.dataWaList.param.date_start = '2018-05-27';
                // this.dataWaList.param.date_end = '2018-06-28';

                this.axios.post('/dc-admin/gate/api', 
                this.dataWaList,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    this.tableData = datas.data;
                    this.pageCon = datas.data_count;
                    console.log(datas)
                });
            },
            // 时间戳转为YY-MM-DD
            fmtDate(obj){
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            },
            //导入
            //上传按钮
            ceshi(e) {
                this.fileCon = e;
            },
            daoru(){
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
                // url = this.url+"userId="+window.userMes.userId+"&userName="+window.userMes.deptName+"&shopId="+this.value1;
                url = this.url;
                var a = this.fileCon.target.files[0].name;
                var index1=a.lastIndexOf(".");
                var index2=a.length; 
                var postf=a.substring(index1,index2);//后缀名 
                // if(postf!='.xlsx' && postf!='.xls' ){
                //     this.$message.error('上传文件只能是 xlsx或xls 格式!');
                //     return;
                // }

                this.fileList = '';
                this.fileList = this.fileCon.target.files[0].name;
//              this.fileCon = e;
                var formData = new FormData();
                for (var i = 0; i < this.fileCon.target.files.length; i++) {
                    var file = this.fileCon.target.files[i];
                    formData.append("field1",file);
                }
                formData.append('project_id',this.value1);
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
                            type: 'success',
                            message: res.data.mes
                        });
                    }
                })
            	
                this.addDialog_select_ware=false;
            }
            
        },
        mounted() {
            // 店铺信息
            this.shopName = window.shopName;
            this.value1 = this.shopName[0].code
            //标签
            contabs(this.$router);
            this.$router.push('/exeTole')


            
            //根据月份设置默认时间，example 6月 ->5月21-6月21
            // ['2018-05-04 00:00:00','2018-05-05 00:00:00']
            // 设置默认时间从上月21-当月20
            // var date=new Date;
            // var end = date.getTime();
            // var start = end - 3600 * 1000 * 24 * 7;
            // end = this.fmtDate(end)
            // start = this.fmtDate(start)
            // this.value6 = [start,end]
            // this.dateChang(this.value6);
        },
        props: {},
        watch: {},
    }
</script>
<style lang="less">
.exeToleCon{
    display: inline-block;
    margin: 10px;
}
.exeToleCon>a{
    display: inline-block;
    height: 30px;
    line-height: 32px;
    color:#fff;
    border-radius: 4px;
    padding: 0 20px;
    margin-left: 20px;
    background: #409EFF;
    border-color:#409EFF;
    white-space:nowrap;
    cursor:pointer;
    -webkit-appearance:none;
    text-align: center;
    outline:0;
}
.exeTole .el-dialog__header{
    border-bottom: 1px solid #fff !important;
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
// 二维码样式
.exeQRcode{
    text-align: center;
}
.exeQRcode .exeQRcode_one{
    display: inline-block;
    font-size: 12px;
    color:#ccc;
    margin-bottom: 15px;
}
.exeQRcode .exeQRcode_two{
    display: inline-block;
    margin-bottom: 20px;
}
//详情页
.exebot_title{
    display: inline-block;
    height: 30px;
    width: 100%;
    border-bottom: 2px solid #1ab394;
}
.exebot_title>span{
    cursor:pointer;
    color:#606266;
    font-size: 14px;
    font-weight: 900;
}
.exebot_cont{
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #606266;
    font-weight: 900;
    margin-bottom: 30px;
}
.exebot_cont_div{
    display: inline-block;
    position: relative;
    background: #fff;
    width: 100%;
    margin-bottom: 20px;
    padding-left: 80px;
}
.exebot_cont_div h3{
    font-size: 14px;
    position: absolute;
    top:8px;
    left: 6px;
}
.exebot_cont_div p{
    display: inline-block;
    padding-right: 20px;
    line-height: 40px;
    margin: 0 !important;
}
</style>
