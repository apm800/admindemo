<template>
    <div class="waidataColl animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">
            <div class="waidataColl_s">
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

            <div class="waidataColl_s">
                <span>任务日期：</span>
                <el-date-picker
                    v-model="value6"
                    @change='dateChang'
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>
        </div>
                    <!-- :header-cell-style="rowClass(0,0)" -->
                    <!-- :row-style="rowClass(6,6)" -->
                    <el-tree
                    :data="data6"
                    node-key="id"
                    default-expand-all
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                    draggable
                    :allow-drop="allowDrop"

                    show-checkbox
                    ref='tree'

                    @check-change="handleCheckChange"
                    :allow-drag="allowDrag"
                    :props="defaultProps"
                    :render-content="renderContent"
                    >
                    </el-tree>
        <div><img src="../../../assets/img/ts.png" alt="" style="width:270px"></div>
        <div style="margin-top:30px;">
            <el-button style="margin-left:20px;" type="primary" @click="DownLoad" v-checkup="'ZK_downloadall_download'">确定</el-button>
            <el-button style=" " plain @click="allCheck">全选</el-button>
            <el-button style=" " plain @click="clearCheck">清空</el-button>
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
            head2(data){
                console.log('123',data.head)
                switch (data.head){
                    case 'targetTotal':
                        return '目标累计';
                        break;  
                    case 'monthlyTarget':
                        return '全月目标';
                        break;
                    case 'practicalTotal':
                        return '实际累计';
                        break;
                    case 'practicalRate':
                        return '实际达成率';
                        break;
                    default:
                    console.log("others");
                        return data.head;
                }
            },
            //格式化加单位
            formatterOrderStatus(row,column){
                return row.pay_fund + '元'
            },
            //总和
            getSummaries(param) {
                console.log('1221',this.dataSum)
                var sum=[];
                sum[0] = '合计：';
                sum[1] = this.dataSum.number_of_visitors_sum+'人';
                sum[2] = this.dataSum.number_of_buyers_sum+'人';
                sum[3] = this.dataSum.amount_of_payment_sum+'元';
                return sum;
            },
            //获取项目id和项目名称
            shop_xin(val){
                this.chaxun();
                // for(var i in this.shopName){
                //     if(this.shopName[i].code==val){
                //         this.value11 = this.shopName[i].name;
                //         return;
                //     }
                // }
            },
            // 修改时间
            dateChang(data){
                this.value6 = data;
                this.chaxun();
                console.log(this.value6)
            },
            //查询
            chaxun(){
                this.tableData3 = [];
                this.loading1 = 1;

                this.dataWa.param.date = this.value6;
                this.dataWa.param.projectId = this.value1 ;

                this.axios.post('/dc-admin/gate/api', 
                this.dataWa,
                {type: 'payload'}
                ).then(res =>{
                    this.loading1 = 0;
                    var datas = JSON.parse(res.data.data).indexList
                    console.log(datas)
                    this.data6 = datas
                    //进来全选
                    this.allCheck();
                });
            },
            postDownLoadFile(options){
                console.log(options)
                var config = $.extend(true, { method: 'post' }, options);
                var $iframe = $('<iframe id="down-file-iframe" />');
                var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
                $form.attr('action', config.url);
                for (var key in config.data) {
                    console.log('<textarea maxlength="3000" type="hidden" name="' + key + '"  >' + config.data[key] + '</textarea>')
                    $form.append('<textarea maxlength="3000" type="hidden" name="' + key + '"  >' + config.data[key] + '</textarea>');
                console.log($iframe)
                }
                $iframe.append($form);
                $(document.body).append($iframe);
                $form[0].submit();
                $iframe.remove();
            },
            //下载
            DownLoad(){
                this.dataWaDown.param.date = this.value6;
                this.dataWaDown.param.projectId = this.value1 ;
                // var a = JSON.stringify(this.data6)
                // console.log(a)
                this.dataWaDown.param.indexList = this.data6;
                
                this.axios.post('/dc-admin/gate/api', 
                this.dataWaDown,
                {type: 'payload'}
                ).then(res =>{
                    console.log(res.data.data)
                    var a = JSON.parse(res.data.data)
                    if(a.code==0){
                        console.log(res.data.data)
                        // this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/downloadall/download?date='+this.value6+'&projectId='+this.value1;
                        this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/downloadall/download?date='+this.value6+'&projectId='+this.value1;
                        setTimeout(function(){document.getElementById("daochuA").click()},800)                        
                    }else{ 
                        this.$message({
                            type: 'error',
                            message: a.msg
                        });
                    }

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

            
            // 默认查询
            this.chaxun();
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

</style>
