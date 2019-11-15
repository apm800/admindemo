<template>
    <div class="waidataColl animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">
            <!--<div class="waidataColl_s">
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

			<div class="waidataColl_s">
				<span>店铺:</span>
				<el-select v-model="project_id" style="width: 260px" value='OralB欧乐B官方旗舰店' placeholder="" >
			        <el-option
			        v-for="item in select_terrace_type_options"
			        :key="item.value"
			        :label="item.label"
			       	:value="item.value">
			        </el-option>
			    </el-select> 
		    </div>
            <div class="waidataColl_s">
                <span>日期：</span>
                <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>
            <el-button style="margin-left:20px;" type="primary" @click="detection">检测</el-button>
            
        </div>
        
        <table border="" cellspacing="" cellpadding="" style="width: 100%;margin-top: 20px;">
        	<tr v-for="item in return_data_top1" style="height: 40px;"><td v-for="items in item" :class='items==0?"space":""'>{{items}}</td></tr>
        </table>
        <p style="text-align: right; margin-top: 5px;" v-show="flag">(注：1为有，0为没有)</p>

        <div style="margin-top:30px;">
            <el-button style="margin-left:20px;" type="primary" @click="DownLoad" v-checkup="'ZK_downloadall_download'">确定</el-button>
            <!--<el-button style=" " plain @click="allCheck">全选</el-button>-->
            <!--<el-button style=" " plain @click="clearCheck">清空</el-button>-->
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>

        </div>
        
        </template>
    </div>
</template>

<script>
	
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                daochuUrl:'',//导出数据的链接地址
                // 选中的数组
                showchecked:[],
                data6: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                //导出
                daochuUrl:'',
                loading1:0,
                project_id:22,
                return_data_top:[],
                return_data_top1:[],
                select_terrace_type_options:[{
                	value: 22,
                    label: 'OralB欧乐B官方旗舰店'
                },{
                	value: 48,
                    label: '雅培官方旗舰店'
                },{
                	value: 50,
                    label: '雅培保健品旗舰店'
                },{
                	value: 21,
                    label: 'eleva菁智旗舰店'
                },],
                flag:false,
                //分页每页数量
                pagesize:10,
                // 总数
                pageCon:0,
                //当前页
                page:1,
                // 店铺信息
                shopName:[],
                value1:'22',
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
                headClass: function (row) {//头部样式
                        if(row.rowIndex==1){
                            console.log(row)
                            return {"text-align":"left",'background':'#409EFF','color':'#fff','display':'none',}
                        }else{
                            return {"text-align":"center",'background':'#409EFF','color':'#fff',}
                        }
                },
                tableData3: [],
                // 查询
                dataWa:{
                  apiName:'ZK_tableindex_list',
                  param:{
                  }
                },
                // 下载
                dataWaDown:{
                  apiName:'ZK_downloadall_download',
                  param:{
                  }
                },
                //页面数据
                dataSum:{},
            }
        },
        methods: {
            //q取消全选
            clearCheck(){
                this.$refs.tree.setCheckedKeys([]);
                
            },
            //全选
            allCheck(){
                this.showchecked = [];
                for(let i in this.data6){
                    this.data6[i].isSelect = 1;
                    this.showchecked.push(this.data6[i].id)
                }
                console.log(this.showchecked)
                this.$refs.tree.setCheckedKeys(this.showchecked)
                
            },
            renderContent(h, { node, data, store }) {
                return (
                <span class="custom-tree-node">
                    <span>
                    <span style='display:inline-block;width:200px;'>{node.label}</span>
                    <span style='color:#444'>下载顺序：{data.index}</span>
                    
                    </span>
                </span>);
            },

      handleCheckChange(data, checked, indeterminate) {
          console.log('21122112',this.$refs.tree.getCheckedKeys());
          console.log(this.data6)
        //   给选中的数组赋值
          this.showchecked = this.$refs.tree.getCheckedKeys();
          if(checked == true){
              data.isSelect = 1;
          }else{
              data.isSelect = 0;
          }
        console.log(data, checked, indeterminate);
      },handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
          if(draggingNode.checked==true){
            this.showchecked.push(draggingNode.data.id)
            this.$refs.tree.setCheckedKeys(this.showchecked);
          }
          for(let i=0;i<this.data6.length;i++){
              this.data6[i].index = (i+1).toString();
          }
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
          console.log(dropNode)
          
          if(type !== 'inner'){
              return true;
          }else{
              return false;
          }
        // if (dropNode.data.label === draggingNode.data.label) {
        //   return type !== 'inner';
        // } else {
        //   return true;
        // }
      },
      allowDrag(draggingNode) {
        return true;
      },
            //导出
            // daochu(){
            //     // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/get_it_flow_source_excel/?this_date='+this.value6[0]+'&project_id='+this.value1;
            //     console.log(this.value6.slice(0,8))
            //     var a = this.value6.slice(0,10)
            //     this.daochuUrl='http://'+this.$store.state.xianshang+':8024/oralb_excel_api/select_month_sale_infor_excel_new/?&projectId='+this.value1+'&endDate='+a
   
            //     setTimeout(function(){document.getElementById("daochuA").click()},800)
            //     console.log(this.daochuUrl)
            // },
            //合并列
            objectSpanMethod(data){
                if (data.columnIndex === 0) {
                    if (data.rowIndex % 50 === 0) {
                        return {
                            rowspan: 50,
                            colspan: 1
                        };
                    } else {
                        return {
                        rowspan: 0,
                        colspan: 0
                        };
                    }
                }
            },
            //纵向表头
            head1(data){
                console.log(data)
                return 'TOTAL';
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
            },
       
            //下载
            detection(){
            	this.axios.get('http://'+this.$store.state.xianshang+':8024/oralb/pre_get_all_excel/?this_date='+this.value6+'&project_id='+this.project_id,
                {type: 'payload'}
                ).then(res =>{
                    console.log(res.data.return_data_list[0][0])
                    res.data.return_data_list[0][0]='日期'
                    this.return_data_top1 = res.data.return_data_list
                    console.log(res.data.return_data_list)
                    this.flag = true
                });
            },
            
            DownLoad(){
                this.dataWaDown.param.date = this.value6;
                this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb/get_all_excel/?this_date='+this.value6+'&project_id='+this.project_id,
                setTimeout(function(){document.getElementById("daochuA").click()},800)
//              this.axios.post('/dc-admin/gate/api', 
//              this.dataWaDown,
//              {type: 'payload'}
//              ).then(res =>{
//                  console.log(res.data.data)
//                  var a = JSON.parse(res.data.data)
//                  if(a.code==0){
//                      console.log(res.data.data)
//                      // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/downloadall/download?date='+this.value6+'&projectId='+this.value1;
//                      this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb/get_all_excel/?this_date='+this.value6;
//                      setTimeout(function(){document.getElementById("daochuA").click()},800)                        
//                  }else{ 
//                      this.$message({
//                          type: 'error',
//                          message: a.msg
//                      });
//                  }
//
//              });
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
            console.log(this.shopName)
            this.value1 = this.shopName[0].code;//默认选中第一个
            var date=new Date;
            var end = date.getTime();
            var start = end - 3600 * 1000 * 24 * 1;
            end = this.fmtDate(end)
            start = this.fmtDate(start)
            // this.value6 = [start,end]
            this.value6 = start
            this.dateChang(this.value6);

        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.waidataColl{
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
.waidataColl .el-tree{
    background: none !important;
    padding: 40px 0;
}
.waidataColl .el-tree .el-tree-node__content{
    padding-left: 40% !important;
    height: 40px;
}
.waidataColl .el-table__fixed{
    pointer-events: none;
}
.waidataColl_s{
    display: inline-block;
    margin: 10px;
}
.waidataColl .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}
.space{background: lightcoral;}
</style>
