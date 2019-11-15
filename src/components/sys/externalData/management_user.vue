<template>
<div class="ManaUser">
    <!-- 选中项目 -->
    <span class="LJS_projectName_title">项目名称</span>
    <div class="LJS_projectName">
        <div>
            <div>
                <span class="LJS_projectName_title_show">{{shopName[checkBottom].name}}</span>
                <span class="" @click="show3 = !show3" style="cursor : pointer ;">更多>></span>
            </div>
            <el-collapse-transition>
                <div v-show="show3">
                <div v-for="(i,index) in shopName" v-on:click='shopID(i,index)' :class="(checkBottom==index)?'LJS_projectName_title_show':'LJS_projectName_title_no'">
                    {{i.name}}
                </div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
    <!-- 选中日期 -->
    <div>
        <span class="LJS_projectName_title">数据采集</span>
    </div>
    <div class="LJS_date_h">
        <div id="container" style="float:none;margin: 0px ;width:40% !important;"></div>
        <!--内有单选 <Calendar ref="Calendar" :markDateMore="arr" :markDate="arr2" v-on:isToday="clickToday" :agoDayHide='today' v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar> -->
        <Calendar ref="Calendar" :markDateMore="arr" v-on:isToday="clickToday" :agoDayHide='today' v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
        <!-- <span v-on:click='demo()'>跳转到指定日期</span> -->
        <div class="LJS_date_h_state">
            <div>
                <p style='background:#999;'></p>
                <span>采集未开始</span>
            </div>
            <div>
                <p style='background:#feba2b;'></p>
                <span>采集中</span>

            </div>
            <div>
                <p style='background:#fc0d1b;'></p>
                <span>采集失败</span>
            </div>
            <div>
                <p style='background:#0bd40b;'></p>
                <span>采集完成</span>
            </div>
        </div>
    </div>
    <div class="LJS_date_list">
        <h4>采集详情</h4>
        <span style="color:#ccc;">{{shopName[checkBottom].name}}&nbsp;&nbsp;&nbsp;&nbsp;{{checkday}}</span>
        <div style="height:490px;overflow:auto;padding-top:40px;">
            <div>
                <span v-if='dataXQ.operation_user_name'>授权用户：{{dataXQ.operation_user_name}}</span>
                <span v-if='dataXQ.grant_datetime'>授权时间：{{dataXQ.grant_datetime}}</span>
            </div>
        <br>
        
        <!-- <div class='exebot_cont_div'>
            <h3 style="color:#E6A23C;" v-for="(i,index) in dataXQ.data" v-if='index==0 && i.state==1'>未开始</h3>
            <p v-for="(i,index) in dataXQ.data" v-if='i.state==1'>
                {{i.table_name}}；
            </p>
        </div> -->
        <div class='exebot_cont_div'>
            <h3 style="color:#E6A23C;" v-for="(i,index) in dataXQ.data" v-if='index==0 && i.state==1'>未开始</h3>
            <p v-for="(i,index) in dataXQ.data" v-if='i.state==1'>
                {{i.table_name}}；
            </p>
        </div>
        <div class='exebot_cont_div'>
            <h3 style="color:#E6A23C;" v-for="(i,index) in dataXQ.data" v-if='index==0 && i.state==2'>采集中</h3>
            <p v-for="(i,index) in dataXQ.data" v-if='i.state==2'>
                {{i.table_name}}；
            </p>
        </div>
        <div class='exebot_cont_div'>
            <h3 style="color:rgb(11, 212, 11);" v-for="(i,index) in dataXQ.data" v-if='index==0 && i.state==3'>成功</h3>
            <p v-for="(i,index) in dataXQ.data" v-if='i.state==3'>
                {{i.table_name}}；
            </p>
        </div>
        <div class='exebot_cont_div'>
            <h3 style="color:#F56C6C;" v-for="(i,index) in dataXQ.data" v-if='index==0 && i.state==4'>失败</h3>
            <p v-for="(i,index) in dataXQ.data" v-if='i.state==4'>
                {{i.table_name}}；
            </p>
        </div>

        </div>
    </div>
    <div style='position: relative; clear:both; content:""; display:block;'></div>
    <div class="LJS_date_footer">
        <div v-if="LJS_date_footer_zhezhao" class="LJS_date_footer_zhezhao" :style="ZTrans">
            <div class="LJS_date_footer_GG"></div>
            <span>{{ZTrans_test}}%</span>
            <div id="ajaxwave1">
                <div id="pointcircle1" class="pointcircle"></div>
                <div id="pointcircle2" class="pointcircle"></div>
                <div id="pointcircle3" class="pointcircle"></div>
                <div id="pointcircle4" class="pointcircle"></div>
                <div id="pointcircle5" class="pointcircle"></div>
            </div>
        </div>
        <el-button v-if='checkData.length' style="float:right;margin:15px;" type="primary" @click="begin" v-checkup="'LJS_do_operation_task'">采集{{checkData.length}}天任务</el-button>
        <el-button v-if='!checkData.length' style="float:right;margin:15px;" type="primary" disabled v-checkup="'LJS_do_operation_task'">开始采集</el-button>
        <div>
        <p v-for="(i,index) in checkData">
            {{i.task_date}}
            <span v-on:click='DeleCheck(index)'>X</span>
        </p>
            
        </div>
    </div>
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
        <!-- <span v-on:click="getProcess">测试按钮</span> -->
<!-- 页面二维码结束 -->
</div>
</template>

<script>
import Calendar from './vue-calendar-component/index';
    export default {
  data() {
    return {
        ZTrans:{//过度效果
            transform: 'translateX(-99.6%)' 
        },
        ZTrans_test:0,
        addDialog_select_ware:false,//二维码显示隐藏
        QRimg:'',
        loading2:false,//二维码
        show3: false,//隐藏折叠
        today:0,//今天之后不可选择
        // arr2: ['2018-6-23'],
        arr: [
        ],
        shopName:[],      //店铺信息
        shopid:'',//店铺id
        checkBottom:0,//选中的按钮
        //查询任务
        dataWaList:{
            apiName:'LJS_get_task',
            param:{
            }
        },
        //当前月份第一天和最后一天
        value6:{},
        //查询出来的数据
        tableData:[],
        //选中的数据
        checkData:[],
        //查看执行任务详情
        dataXQ:'',
        //查看详情
        xiangqing:{
            apiName:'LJS_get_task_detail',
            param:{
            }
        },
        //选中了那一天
        checkday:'',
        // 详情 details
        caozuo1:{
            apiName:'LJS_do_operation_task',
            param:{
            }
        },
        //获取二维码联合
        CreateAtask_wo:{
            apiName:'LJS_select_task_qr',
            param:{
            }
        },
        //采集进度
        LJS_get_task_process:{
            apiName:'LJS_get_task_process',
            param:{
                last_process:'0',
            }
        },
        //任务列表
        renwuList:[],
        //假的进度
        jiaJD:0,
        //进度条
        LJS_date_footer_zhezhao:false,
    };
  },
  mounted(){
  },
  components: {
    Calendar
  },
  methods: {
    //删除任务栏中的数据
    DeleCheck(index){
        this.checkData.splice(index, 1);
    },
    //选择店铺
    shopID(data,index){
        this.checkData=[];
        this.show3 = !this.show3;
        this.checkBottom = index;//选中按钮修改类名
        this.require();//开始查询
    },
    //查看任务详情
    chakan(data,befor){
        this.xiangqing.param.task_id = befor.task_id;
        this.axios.post('/dc-admin/gate/api', 
        this.xiangqing,
        {type: 'payload'}
        ).then(res =>{
            var datas = JSON.parse(res.data.data)
            this.dataXQ = datas;
            console.log(datas)
        });

    },
    clickDay(data) {
        this.dataXQ = '';//清空右侧的任务详情
        var dataGe = [];
        dataGe=data.split('/');
		console.log(dataGe)
        if (dataGe[1] < 10) {
            dataGe[1] = '0' + dataGe[1]
        }
        if (dataGe[2] < 10) {
            dataGe[2] = '0' + dataGe[2]
        }
        dataGe = dataGe.join('-');
        console.log('选中了', dataGe); //选中某天并且格式化处理
        this.checkday = dataGe;

        for(let i in this.tableData){
            if(this.tableData[i].task_date==dataGe){
                this.chakan('',this.tableData[i])
            }
            if(this.tableData[i].task_date==dataGe && (this.tableData[i].state==4 || this.tableData[i].state==1)){
                //去重
                for(let j in this.checkData){
                    if(this.checkData[j].task_id == this.tableData[i].task_id){
                        this.checkData.splice(j, 1);
                    }else{

                    }
                }
                // 选中数据塞入数组
                var a ={};
                a.task_id = this.tableData[i].task_id;
                a.task_date = this.tableData[i].task_date;
                this.checkData.push(a);
                console.log(this.checkData)
            }
        }


    },
    
    clickToday(data) {
        console.log('跳到了本月今天', data); //跳到了本月
    },
    changeDate(data) {
        var strs=[];
        strs=data.split("/");
        console.log(strs)
        this.getLastDay(strs[0],strs[1])
        //   this.$toast('切换到的月份为' + data);
        console.log('左右点击切换月份', data); //左右点击切换月份
    },
    demo() {
        this.$refs.Calendar.ChoseMonth('2018-12-12'); //跳到12月12日选中12月12日
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
        this.require();//开始查询

    },
    //查询任务
    require(){

        this.dataWaList.param.project_name = this.shopName[this.checkBottom].name;
        this.dataWaList.param.project_id = this.shopName[this.checkBottom].code ;
        this.dataWaList.param.state = -1;
        this.dataWaList.param.task_date_start = this.value6.start;
        this.dataWaList.param.task_date_end = this.value6.end;
        // this.dataWaList.param.page_size = this.pagesize;
        // this.dataWaList.param.page_index = this.page;
        this.dataWaList.param.page_size = 32;
        this.dataWaList.param.page_index = 1;

        // this.dataWaList.param.task_date_start = '2018-05-27';
        // this.dataWaList.param.task_date_end = '2018-06-28';

        this.axios.post('/dc-admin/gate/api', 
        this.dataWaList,
        {type: 'payload'}
        ).then(res =>{
            // this.loading1 = 0;
            console.log(res.data)
            var datas = JSON.parse(res.data.data)
            this.tableData = datas.data;
            this.pageCon = datas.count;
            console.log(this.tableData)
            // if(this.tableData==datas.data){
            //     console.log(555555)
            //     return;
            // }else{
                this.xuanran(this.tableData);
            // }
        });

    },
    xuanran(data){
        //清空上次
        var nowarr = [];
        //渲染界面
        for(let i in data){
            var obj1 = {};
            obj1.date = data[i].task_date;
            obj1.className = 'mark'+data[i].state;
        
            nowarr[i]=obj1;
        }
        this.arr=nowarr;
        console.log('asdds',nowarr)
        // return;
    },
    //开始执行
    begin(){
        this.loading2 = true;
        this.QRimg='';//初始化二维码图片
        this.addDialog_select_ware = true;

        for(let i in this.checkData){
            this.renwuList.push(this.checkData[i].task_id)
            console.log(this.renwuList)
        }
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
                    var _this = this;
                    window.proJD = setInterval(() => {
                        _this.getProcess();
                    }, 1500)//抓取进度
                    this.checkData = [];
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
                    this.require();
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
                    this.require();
                    return;
                }else if(a.state==-2){
                    this.loading2 = false;
                    window.clearInterval(dingshi);
                    this.addDialog_select_ware = false;
                    this.$message({
                        type: 'error',
                        message: "数据采集数据异常！"
                    });
                    this.require();
                    return;
                }else if(a.state==-3){
                    this.loading2 = false;
                    window.clearInterval(dingshi);
                    this.addDialog_select_ware = false;
                    this.$message({
                        type: 'error',
                        message: "登陆系统异常！"
                    });
                    this.require();
                    return;
                }else if(a.state==-4){
                    this.loading2 = false;
                    window.clearInterval(dingshi);
                    this.addDialog_select_ware = false;
                    this.$message({
                        type: 'error',
                        message: "用户作废任务！"
                    });
                    this.require();
                    return;
                }
            }
        });

        this.addDialog_select_ware=true;
    },
    getProcess(){//进度条

        this.LJS_date_footer_zhezhao=true;
        this.checkData=[];
        this.LJS_get_task_process.param.pa_server_task_id = this.CreateAtask_wo.param.pa_server_task_id;
        // this.LJS_get_task_process.param.pa_server_task_id = 1;
        this.axios.post('/dc-admin/gate/api', 
        this.LJS_get_task_process,
        {type: 'payload'}
        ).then(res =>{
                console.log(JSON.parse(res.data.data))
                var a = JSON.parse(res.data.data);
                this.ZTrans.transform = 'translateX(-'+(100-a.process)+'%)';
                this.ZTrans_test = a.process;
                this.LJS_get_task_process.param.last_process = a.process;
                if(a.process>='100'){
                    this.LJS_date_footer_zhezhao=false;
                    window.clearInterval(proJD);
                    this.require();
                }
                if(a.process_state=='over'){
                    // 进来就查询渲染
                    var date = new Date();
                    this.getLastDay(date.getFullYear(),date.getMonth()+1);
                }
            }
        )
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
  },
  created() {
  	console.log(window.shopNamedata)
    this.shopName = window.shopName;// 店铺信息
    console.log(this.shopName)
    for(var i in this.shopName){
        // console.log(this.shopName[i])
        // if(this.shopName[i].code==22){
            this.checkBottom = 0;
        // }
    }

    //默认渲染
    // function format(date, index) {
    //   date = new Date(date);
    //   return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    // }
    // this.arr = [//默认渲染
    //   {
    //     date: format(new Date(), 1),
    //     className: 'mark1'
    //   },
    //   {
    //     date: format(new Date(), 13),
    //     className: 'mark2'
    //   },
    //   {
    //     date: format(new Date(), 14),
    //     className: 'mark3'
    //   },
    //   {
    //     date: format(new Date(), 15),
    //     className: 'mark3'
    //   }
    // ];
    // this.arr2 = [format(new Date(), 23)]
    
    this.today = Date.parse( new Date() ).toString();//获取今日时间戳.十位数
    this.today = this.today.substr(0,10);
    
    // 进来就查询渲染
    var date = new Date();
    this.getLastDay(date.getFullYear(),date.getMonth()+1);
  },
    watch: {
        addDialog_select_ware(xin,old){
            if(old==true){
                try{
                    window.clearInterval(dingshi);
                }catch(err){}
                this.zuofeiQR();
                this.require();
            }
        }
    }
};
</script>
<style lang="less">
.ManaUser{
    background: #fff;
    box-shadow: 0px 0px 20px #ccc;
    border-radius: 10px;
    padding:20px 60px;
    width: 90%;
    margin:20px auto;
    min-width: 960px;
}
// 异常报错效果
.mark1 {
  color:#999 !important;
}
.mark2 {
  color:orange !important;
}
.mark4 {
  color: red !important;
}
.mark3 {
  color: #0bd40b !important;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
// 项目名称
.LJS_projectName{
    margin-bottom: 20px;
}
.LJS_projectName_title{
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: 900;
    font-size: 14px;
    border-bottom:#fee187 solid 4px;
    margin-bottom: 20px;
}
.LJS_projectName_border div,.LJS_projectName_border{
    border:#fff !important;
}
.LJS_projectName_title_show{
    
    cursor : pointer ;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #fee187;
    padding: 0px 20px;
    color:#666;
    margin: 9px 22px 9px 0;
    border-radius: 10px;
}
.LJS_projectName_title_no{
    cursor : pointer ;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border: 1px solid #fee187;
    padding: 0px 20px;
    color:#666;
    margin: 10px 20px 10px 0;
    border-radius: 10px;
}
.LJS_projectName_title_no:hover{
    cursor : pointer ;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border: 1px solid #fee187;
    background: #fee0874b;
    padding: 0px 20px;
    color:#666;
    margin: 10px 20px 10px 0;
    border-radius: 10px;
}
// 日期组件
.LJS_date_h{
    display: inline-block;
    width: 55%;
    min-width: 520px;
    float: left;
}
.LJS_date_h_state{//状态提示
    padding: 20px 20px 10px 6px;
}
.LJS_date_h_state div{//状态提示
    display: inline-block;
    height: 40px;
    width: 100px;
    position: relative;
    margin-right: 20px;
}
.LJS_date_h_state div p{//状态提示
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border:1px solid #999;
    position: absolute;
    left: 0;
    top: 10px;
}
.LJS_date_h_state div span{//状态提示
    display: inline-block;
    position: absolute;
    left: 30px;
    top: 10px;
}
//查询任务的列表
.LJS_date_list{
    display: inline-block;
    width: 37%;
    // position: absolute;
    // top: 0;
    // right: 0;
    padding-left: 30px;
    float: right;

}
//任务详情列表
.exebot_cont_div h3{
    display: inline-block;
    font-size: 14px;
    margin-right: 15px;
}
.exebot_cont_div p{
    display: inline-block;
    background: #fff;
    font-size: 12px;
}
//开始采集和进度条
.LJS_date_footer{
    background: #f3f3f3;
    height: 60px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}
.LJS_date_footer_zhezhao{
    position: absolute;
    height: 60px !important;
    // width: 100% !important;
    border-radius: 10px;
    background: #fee187;
    background: -webkit-linear-gradient(left, #fee187,  #f8ce51); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left, #fee187,  #f8ce51); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left, #fee187,  #f8ce51); /* Firefox 3.6 - 15 */
    background: linear-gradient(to left, #fee187,  #f8ce51); /* 标准的语法 */
    left: -0%;
    top:0;
    z-index: 2;
    width: 100% !important;
    padding: 0px !important;
    transition:transform 1.5s;
    animation-timing-function: ease-in;
}
.LJS_date_footer_GG{
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 20px;
    width: 100%;
    background: rgba(255, 255, 255, 0.15);
}
.LJS_date_footer_zhezhao span{
    font-size: 20px;
    color:#fff;
    font-weight: 900;
    position: absolute;
    right: 100px;
    top: 16px;
}
.LJS_date_footer > div{
    padding: 15px;
    // white-space:nowrap;
    word-wrap: break-word;
    height: 45px;
    overflow: hidden;
    display: inline-block;
    width: 80%;
}
.LJS_date_footer > div > p{
    display: inline-block;
    height: 30px;
    background: #fee187;
    color: #666;
    line-height: 30px;
    padding: 0 10px;
    border-radius: 4px;
    position: relative;
    margin-right: 20px;
}
.LJS_date_footer > div >p>span{
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #fee187;
    background: #666;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    font-size: 14px;
    position: absolute;
    right: -10px;
    top: -10px;
}
.LJS_date_footer > div >p>span:hover{
    cursor : pointer ;
    background: rgba(102, 102, 102, 0.596);
    transform:scale(0.9);
    -ms-transform:scale(0.9); 	/* IE 9 */
    -moz-transform:scale(0.9); 	/* Firefox */
    -webkit-transform:scale(0.9); /* Safari 和 Chrome */
    -o-transform:scale(0.9); 	/* Opera */

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
.el-dialog .el-dialog__header{
    border-bottom:1px solid #fff !important;
}
// 进度条
#ajaxwave1 {
  margin: 0px auto 0;
  overflow: hidden;
  height: 60px;
  padding-top: 25px;
  width: 100%;
  position: relative;
}
#ajaxwave1 .pointcircle {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 5px #fff;
  -moz-box-shadow: 0 0 5px #fff;
  box-shadow: 0 0 5px #fff;
  display: inline-block;
  position: absolute;
}
#ajaxwave1 #pointcircle1 {
  right: 10px;
  -webkit-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -moz-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -ms-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
#ajaxwave1 #pointcircle2 {
  opacity: 0.7;
  right: 26px;
  -webkit-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -moz-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -ms-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
#ajaxwave1 #pointcircle3 {
  opacity: 0.5;
  right: 40px;
  -webkit-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -moz-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -ms-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
#ajaxwave1 #pointcircle4 {
  opacity: 0.3;
  right: 52px;
  -webkit-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -moz-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -ms-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
#ajaxwave1 #pointcircle5 {
  opacity: 0.1;
  right: 62px;
  -webkit-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -moz-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -ms-animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  animation: ball-circlex 1.4s infinite cubic-bezier(0, 0, 0.35, 1) normal;
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
@keyframes ball-circlex {
  from {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(20px);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-20px);
    animation-timing-function: ease-in;
  }
  to {
    transform: translateY(0px);
  }
}
@-moz-keyframes ball-circlex {
  from {
    -moz-transform: translateY(0px);
  }
  25% {
    -moz-transform: translateY(20px);
    -moz-animation-timing-function: ease-in;
  }
  50% {
    -moz-transform: translateY(0px);
  }
  75% {
    -moz-transform: translateY(-20px);
    -moz-animation-timing-function: ease-in;
  }
  to {
    -moz-transform: translateY(0px);
  }
}
@-webkit-keyframes ball-circlex {
  from {
    -webkit-transform: translateY(0px);
  }
  25% {
    -webkit-transform: translateY(20px);
    -webkit-animation-timing-function: ease-in;
  }
  50% {
    -webkit-transform: translateY(0px);
  }
  75% {
    -webkit-transform: translateY(-20px);
    -webkit-animation-timing-function: ease-in;
  }
  to {
    -webkit-transform: translateY(0px);
  }
}
</style>
