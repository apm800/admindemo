<template>
    <div class="exeMana">
<!-- 任务列表开始 -->
<div v-if='!details'>
        <div style="border-bottom:1px solid #ccc;">
            <div class="exeManaCon">
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
            </div><br>

            <div class="exeManaCon">
                <span>任务日期：</span>
                <el-date-picker
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
                </el-date-picker>
            </div>
            <div class="exeManaCon">
                <span>状态：</span>
                <el-select v-model="renwutype" placeholder="请选择状态">
                    <el-option
                        v-for="item in renwutype_list"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
                <el-button style="margin-left:20px;" type="primary" @click="chaxun" v-checkup="'LJS_get_task'">查询</el-button>
            </div>
        </div>
        <!-- 不可提交按钮 -->
        <span v-if='!subBottom'>
            <el-button style="margin: 10px 20px 10px 0" type="primary" @click="begin" v-checkup="'LJS_do_operation_task'">开始执行</el-button>
        </span>
        <span v-if='subBottom'>
            <el-button style="margin: 10px 20px 10px 0" type="primary" disabled v-checkup="'LJS_do_operation_task'">开始执行</el-button>
        </span>
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
            :formatter="formatter2"
            prop="task_date"
            label="任务日期">
            </el-table-column>
            <el-table-column
            prop="project_name"
            label="项目">
            </el-table-column>
            <el-table-column
            prop="state"
            :formatter="formatter"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="operation_user_name"
            label="操作人">
            </el-table-column>
            <el-table-column
            prop="grant_datetime"
            :formatter="formatter1"
            label="授权时间">
            </el-table-column>
            <el-table-column
            prop="create_datetime"
            :formatter="formatter3"
            label="任务创建时间">
            </el-table-column>
            <el-table-column 
            label="操作"
            width="100">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    v-if="(scope.row.state==3||scope.row.state==4)?true:false"
                    @click="chakan(scope.$index, scope.row)" v-checkup="'LJS_get_task_detail'">查看</el-button>
                </template>
            </el-table-column>  
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
<!-- 页面二维码开始 -->
        <el-dialog :visible.sync="addDialog_select_ware" center width='300px'>
            <!-- <div class="exeQRcode"
            v-loading="loading2"
            :element-loading-text="loading2_text"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 1)"> -->
            <div class="exeQRcode">
                <div class="loading_Tan" v-if='loading2'>
                    <span>努力加载中，请等待......</span>
                </div>
                <img v-if='!loading2' :src='QRimg' width="200px" height="200px" alt=""><br>
                <span v-if='!loading2' class="exeQRcode_one">（请使用千牛账号扫描二维码）</span><br>
                <!-- <span v-if='!loading2'>当前项目：{{1}}</span><br> -->
                <!-- <span v-if='!loading2' class="exeQRcode_two">执行日期：{{2}}</span><br> -->
            </div>
            <!-- <div class="exeQRcode"> -->
                <!-- <el-button type="primary" @click="addDialog_select_ware = false">关 闭</el-button> -->
            <!-- </div> -->
        </el-dialog>
<!-- 页面二维码结束 -->
<!-- 查看任务详情开始 -->
<div v-if="details">
    <div class="exebot_title">
        <span @click="details=false">出库单数据源展示</span>
        <span>{{'  >  生成业绩报表'}}</span>
    </div>
    <!-- <div class="exebot_cont">
        <span>当前项目：{{1}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>采集日期：{{1}}</span>
    </div> -->
    <div class='exebot_cont_div'>
        <h3 v-for="(i,index) in dataXQ" v-if='index==0 && i.state==1'>未开始</h3>
        <p v-for="(i,index) in dataXQ" v-if='i.state==1'>
            {{i.table_name}}
            <span style="color:#E6A23C;">未开始</span>
        </p>
    </div>
    <div class='exebot_cont_div'>
        <h3 v-for="(i,index) in dataXQ" v-if='index==0 && i.state==2'>采集中</h3>
        <p v-for="(i,index) in dataXQ" v-if='i.state==2'>
            {{i.table_name}}
            <span style="color:#E6A23C;">采集中</span>
        </p>
    </div>
    <div class='exebot_cont_div'>
        <h3 v-for="(i,index) in dataXQ" v-if='index==0 && i.state==3'>成功</h3>
        <p v-for="(i,index) in dataXQ" v-if='i.state==3'>
            {{i.table_name}}
            <span style="color:#E6A23C;">（采集成功）</span>
        </p>
    </div>
    <div class='exebot_cont_div'>
        <h3 v-for="(i,index) in dataXQ" v-if='index==0 && i.state==4'>失败</h3>
        <p v-for="(i,index) in dataXQ" v-if='i.state==4'>
            {{i.table_name}}
            <span style="color:#F56C6C;">（采集失败）</span>
        </p>
    </div>
    <!-- <div class="exebot_cont">
        <el-button type="primary" @click="chongxin">重新采集</el-button>
    </div> -->
    <div class="exebot_cont">
        <el-button type="primary" @click="chongxin">返回</el-button>
    </div>
    
</div>
<!-- 查看任务详情结束 -->

    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
                //执行按钮可选
                subBottom:1,
                //二维码操作
                loading2:false,
                loading2_text:'正在获取二维码中，这需要花费您一些时间，请勿关闭弹出框，请您耐心等待~',
                //二维码图片
                QRimg:'',
                //创建任务任务
                CreateAtask:{
                  apiName:'LJS_create_task',
                  param:{
                      project:[],
                      task_date_start:'',
                      task_date_end:'',
                  }
                },
                //查看详情
                xiangqing:{
                  apiName:'LJS_get_task_detail',
                  param:{
                  }
                },
                //详情数据
                dataXQ:{},
                //获取二维码联合
                CreateAtask_wo:{
                  apiName:'LJS_select_task_qr',
                  param:{
                  }
                },
                //查询任务
                dataWaList:{
                  apiName:'LJS_get_task',
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
                //任务状态
                renwutype:-1,
                renwutype_list:[
                    {
                        name:'全部',
                        code:-1,
                    },
                    {
                        name:'未开始',
                        code:1,
                    },
                    {
                        name:'数据采集中',
                        code:2,
                    },
                    {
                        name:'数据采集成功',
                        code:3,
                    },
                    {
                        name:'数据采集异常',
                        code:4,
                    },
                ],
                //是否是详情页
                details:false,
                //二维码
                addDialog_select_ware:false,
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
                url:'http://'+this.$store.state.xianshang+':8072/bfec-erp/erpdata/batch/list?',
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
                value6:[],
                //表格
                tableData: [],
                //选中的任务
                renwuList:[],
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
                console.log(this.renwuList);
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
                this.loading2 = true;
                this.QRimg='';//初始化二维码图片
                
                if(this.renwuList.length=='0'){
                    this.$message({
                        type: 'error',
                        message: "请选择任务"
                    });
                    return;   
                }
                this.addDialog_select_ware = true;


                this.caozuo1.param.task_id=this.renwuList,
                this.caozuo1.param.operation='start',
                
                this.axios.post('/dc-admin/gate/api', 
                this.caozuo1,
                {type: 'payload'}
                ).then(res =>{
                    if(res.data.code!='0'){
                        this.$message({
                            type: 'error',
                            message: "获取二维码失败，请稍后尝试"
                        });
                        this.addDialog_select_ware = false;
                    }else{
                        var a = '';
                        a = JSON.parse(res.data.data)
                        this.CreateAtask_wo.param.pa_server_task_id = a.pa_server_task_id;
                        // this.lianhe();
                        
                        var _this = this;
                        window.dingshi = setInterval(() => {
                            _this.lianhe();
                        }, 1500)
                        
                        
                    }
                });
            },
            //联合二维码
            lianhe(){
                        // this.CreateAtask_wo.param.pa_server_task_id = 42;
                this.CreateAtask_wo.state = 1;
                this.axios.post('/dc-admin/gate/api', 
                this.CreateAtask_wo,
                {type: 'payload'}
                ).then(res =>{
                    if(res.data.code!='0'){
                        this.$message({
                            type: 'error',
                            message: "获取二维码失败，请稍后尝试"
                        });
                        this.addDialog_select_ware = false;
                        this.zuofeiQR();
                    }else{
                        // if(a.code==10000&&a.state==2){
                        //     this.QRimg = 'data:image/jpg;base64,'+a.iamge_base64;
                        // };
                        var a = JSON.parse(res.data.data)
                        console.log(a)
                        if(a.state==1){
                            this.loading2 = true;
                        }else if(a.state==2){
                            this.loading2 = false;
                            this.QRimg = 'data:image/jpg;base64,'+a.iamge_base64;
                        }else if(a.state==3){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'success',
                                message: "扫描二维码登录成功！"
                            });
                            this.require();
                            return;
                        }else if(a.state==4){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'error',
                                message: "该批数据已抓取！"
                            });
                            return;
                        }else if(a.state==-1){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'error',
                                message: "二维码已失效，请您重新获取！"
                            });
                            this.zuofeiQR();
                            return;
                        }else if(a.state==-2){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'error',
                                message: "数据采集数据异常！"
                            });
                            return;
                        }else if(a.state==-3){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'error',
                                message: "登陆系统异常！"
                            });
                            return;
                        }else if(a.state==-4){
                            this.loading2 = false;
                            window.clearInterval(dingshi);
                            this.addDialog_select_ware = false;
                            this.$message({
                                type: 'error',
                                message: "用户作废任务！"
                            });
                            return;
                        }
                    }
                });

                this.addDialog_select_ware=true;
            },
            //作废二维码
            zuofeiQR(){
                //如果二维码失效或者有其他操作，需要告诉后台这批数据重新开始
                this.CreateAtask_wo.state = -1;
                this.axios.post('/dc-admin/gate/api', 
                this.CreateAtask_wo,
                {type: 'payload'}
                ).then(res =>{console.log(res)})
            },
            //作废
            zuofei(){
                if(this.renwuList.length=='0'){
                    this.$message({
                        type: 'error',
                        message: "请选择任务"
                    });
                    return;   
                }
                this.caozuo1.param.task_id=this.renwuList,
                this.caozuo1.param.operation='cancel',

                this.axios.post('/dc-admin/gate/api', 
                this.caozuo1,
                {type: 'payload'}
                ).then(res =>{
                    console.log(res)
                    this.require();
                });

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
                this.value6 = data;
            },
            // 查看数据源<a href="/compEnter" class="J_menuItem bottom_title">导入历史</a><br>
            //js模仿点击事件，动态生成a标签并点击
            chakan(data,befor){
                this.xiangqing.param.task_id = befor.task_id;
                this.axios.post('/dc-admin/gate/api', 
                this.xiangqing,
                {type: 'payload'}
                ).then(res =>{
                    var datas = JSON.parse(res.data.data)
                    this.dataXQ = datas.data;
                });

                console.log(befor)
                
                this.details = true;
            },
            //重新采集
            chongxin(){
                // this.addDialog_select_ware = true;
                this.details = false;
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
                if(this.value6==''){
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
                this.dataWaList.param.task_date_start = this.value6[0];
                this.dataWaList.param.task_date_end = this.value6[1];
                this.dataWaList.param.page_size = this.pagesize;
                this.dataWaList.param.page_index = this.page;

                // this.dataWaList.param.task_date_start = '2018-05-27';
                // this.dataWaList.param.task_date_end = '2018-06-28';

                this.axios.post('/dc-admin/gate/api', 
                this.dataWaList,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data)
                    this.tableData = datas.data;
                    this.pageCon = datas.count;
                    console.log(this.tableData)
                });
            },
            // 时间戳转为YY-MM-DD
            fmtDate(obj){
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            }
        },
        mounted() {
            // 店铺信息
            this.shopName = window.shopName;
            this.value1 = this.shopName[0].code;//默认选中第一个
            
            //标签
            contabs(this.$router);
            this.$router.push('/exeMana')

            //为用户创建任务，非用户操作
            var myDate = new Date();//获取系统当前时间
            var yer = myDate.getFullYear();
            var month = myDate.getMonth()+1;
            var date = myDate.getDate();
            
            var month2 = month;
            var date2 = date;
            if(month2<=9){
                month2 = '0'+month2
            }
            if(date2<=9){
                date2 = '0'+date2
            }

            // 任务默认开始日期
            this.CreateAtask.param.task_date_end = yer+'-'+month2+'-'+date2;
            var month1 = month;
            var date1 = date;
            if(month1+1=='1'){
                month1=12;
                yer = yer-1;
            }else{
                month1 = month1-1;
            }
            if(date+1=='1'){
                date1=30;
            }else{
                date1 = date1-1;
            }
            if(month1<=9){
                month1 = '0'+month1
            }
            if(date1<=9){
                date1 = '0'+date1
            }
            // 任务默认结束日期
            this.CreateAtask.param.task_date_start = yer+'-'+month1+'-'+date1; 

            this.CreateAtask.param.project = [];
            for(var i in window.shopName){
                var a = {};
                a.project_name = window.shopName[i].name;
                a.project_id = window.shopName[i].code;
                this.CreateAtask.param.project.push(a);
            }

            //测试
            // this.CreateAtask.param.project = [{project_name: "大创零售通店", project_id: "69"}]
            // this.CreateAtask.param.task_date_start = '2017-02-01'; 
            // this.CreateAtask.param.task_date_end = '2017-03-01'; 

            this.axios.post('/dc-admin/gate/api', 
            this.CreateAtask,
            {type: 'payload'}
            ).then(res =>{
                console.log(res)
            });

            
            //根据月份设置默认时间，example 6月 ->5月21-6月21
            // ['2018-05-04 00:00:00','2018-05-05 00:00:00']
            // 设置默认时间从上月21-当月20
            var date=new Date;
            var end = date.getTime();
            var start = end - 3600 * 1000 * 24 * 7;
            end = this.fmtDate(end)
            start = this.fmtDate(start)
            this.value6 = [start,end]
            this.dateChang(this.value6);
        },
        props: {},
        watch: {
            addDialog_select_ware(xin,old){
                console.log(xin)
                if(old==true){
                    window.clearInterval(dingshi);
                    this.zuofeiQR();
                }
            }
        }
    }
</script>
<style lang="less">
.exeManaCon{
    display: inline-block;
    margin: 10px;
}
.exeMana .el-dialog__header{
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
