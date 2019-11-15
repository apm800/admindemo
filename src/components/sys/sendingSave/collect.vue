<template>
    <div class="compColl animated fadeInDown" v-checkup="'erp_stock_sum_detail'">
        <el-button style="margin:10px 0px 20px 0px;" type="primary" @click="derive" v-checkup="'SFC_baoge_export'">导出</el-button>
        <p>商品总条数:{{count}}条</p>
        <template>
                    <!-- :header-cell-style="rowClass(0,0)" -->
                    <!-- :row-style="rowClass(6,6)" -->
        <el-table
            :cell-style="rowClass"
            :header-cell-style="headClass"

            show-summary
            :summary-method="getSummaries"

            height="700"

			:row-class-name="tableRowClassName"
            :data="tableData3"
            
            style="width: 100%">
            <el-table-column
            :show-overflow-tooltip="true"
            fixed='left'
            prop="sku_sn"
            label="条形码"
            width="130">
            </el-table-column>




            <el-table-column
            :show-overflow-tooltip="true"
            fixed='left'
            prop="sku_name"
            label="商品名称"
            width="145">
            </el-table-column>




            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="初期库存"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    sortable
                    prop="edb_account_start"
                    label="自仓"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    sortable
                    prop="cn_account_start"
                    label="菜鸟"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    prop="refund_account_start"
                    label="线下售后"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>





            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="【自仓】入库"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="purchase_num"
                    label="采购入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_chayi"
                    label="差错入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_guihuan"
                    label="归还入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_panying"
                    label="盘盈入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_qita"
                    label="其他入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_diaobo"
                    label="调拨入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_tuihuo"
                    label="退货入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_zhengchang"
                    label="正常入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_chaifen"
                    label="拆分入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_zuhe"
                    label="组合入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_xiangmuguanliancaigou"
                    label="项目关联采购入库"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_shouhoudiaobo"
                    label="售后调拨"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_weixiu"
                    label="维修入库"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_in_fanchang"
                    label="返厂入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>





            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="【菜鸟】入库"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_caigou"
                    label="采购入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_huoquanzhuanyi"
                    label="货权转移入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_jihuodiaobo"
                    label="集货调拨入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_kucunzhuangttiaozheng"
                    label="库存状态调整入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_pandian"
                    label="盘点入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_qita"
                    label="其他入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_tuihuo"
                    label="退货入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_in_tiaozheng"
                    label="调整入库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>
			
			<el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="线下售后"
            width="200">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="refund_num"
                    label="线下退货入库"
                    width="45">
                    </el-table-column>
            </el-table-column>
			


            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="【自仓】出库"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_chacuo"
                    label="差错出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_lingyong"
                    label="领用出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_pankui"
                    label="盘亏出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_puhuo"
                    label="铺货出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_qita"
                    label="其他出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_diaobo"
                    label="调拨出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_chaifen"
                    label="拆分出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_xiangmuguanlianxiaoshou"
                    label="项目关联销售出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_xiaoshou"
                    label="销售出库"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_out_fanchang"
                    label="返厂出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>





            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="【菜鸟】出库"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_jihuodiaobo"
                    label="集货调拨出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_kucunzhuangtaitiaozheng"
                    label="库存状态调整出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_pandian"
                    label="盘点出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_putong"
                    label="普通出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_huoquanzhuanyi"
                    label="货权转移出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_out_jiaoyi"
                    label="交易出库"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>
			
			<el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="线下售后"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="refund_out_num"
                    label=" 线下售后调拨出库"
                    width="45">
                    </el-table-column>
            </el-table-column>




            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="订单"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="欧乐B官方旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_order_num"
                    label="自仓"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="欧乐B微店"
                width="145">
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="date"
                    label="微店——自仓"
                    width="145">
                    </el-table-column>
                </el-table-column> -->
                <!-- <el-table-column
                prop="date"
                label="欧乐B官方旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_order_num"
                    label="菜鸟"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>





            <el-table-column
            :show-overflow-tooltip="true"
            prop="date"
            label="期末库存"
            width="145">
                <!-- <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="edb_account_end"
                    label="自仓"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column>
                <el-table-column
                prop="date"
                label="旗舰店"
                width="145"> -->
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="cn_account_end"
                    label="菜鸟"
                    width="45">
                    </el-table-column>
                    
                    <el-table-column
                    prop="refund_account_end"
                    label=" 线下售后"
                    width="45">
                    </el-table-column>
                <!-- </el-table-column> -->
            </el-table-column>





            <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="tt"
            label="差异"
            width="120">
            </el-table-column>
            
	      <el-table-column label="备注"
            width="200">
	       		<template scope="scope" v-if="inputbtn(scope.row.edb_account_end,scope.row.cn_account_end,scope.row.refund_account_end,scope.$index)">
                    <el-input style="width: 100px;" size="small" :value='scope.row.remark' v-model="scope.row.remark" placeholder="输入备注"></el-input> 
               		<el-button size="mini" type="primary" @click='baocunBtn(scope.$index, scope.row)'>保存</el-button>
	       		</template>
	      </el-table-column>




        </el-table>
        </template>
    </div>
</template>

<script>
	
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                rowClass: function (row) {//单元格样式
                    if(row.column.label=="差异"){
                        return { "background-color": "#E6A23C","color":"#fff"}
                    }
                },
                headClass: function (row) {//头部样式
                    if((row.columnIndex=="2"&&row.rowIndex=='0')||(row.columnIndex<="2"&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return { "background-color": "#67C23A","color":"#fff","text-align":"center"}
                    }else if(((row.columnIndex=="3"||row.columnIndex=="4")&&row.rowIndex=='0')||((row.columnIndex>"1"&&row.columnIndex<"25")&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return { "background-color": "#409EFF","color":"#fff","text-align":"center"}
                    }else if(((row.columnIndex=="5"||row.columnIndex=="6")&&row.rowIndex=='0')||((row.columnIndex>"24"&&row.columnIndex<"36")&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return {"background-color":"#909399","color":"#fff","text-align":"center"}
                    }else if((row.columnIndex=="8"||row.columnIndex=="7"&&row.rowIndex=='0')||((row.columnIndex>"35"&&row.columnIndex<"43")&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return {"background-color":"#F56C6C","color":"#fff","text-align":"center"}
                    }else if((row.columnIndex=="9"&&row.rowIndex=='0')||((row.columnIndex>"41"&&row.columnIndex<"45")&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return {"background-color":"#67C23A","color":"#fff","text-align":"center"}
                    }else if((row.columnIndex=="11"||row.columnIndex=="10"&&row.rowIndex=='0')||((row.columnIndex>"44"&&row.columnIndex<"48")&&(row.rowIndex=='1'||row.rowIndex=='2'))){
                        return {"background-color":"#E6A23C","color":"#fff","text-align":"center"}
                    }else{
                        return {"text-align":"center"}
                    }
                },
                tableData3: [],
                count:'',//商品总条数
                // 查询
                dataWa:{
                  apiName:'erp_stock_sum_detail',
                  param:{
                      stock_sum_no:'1',
                  }
                },
                errorarr:[],
                dataWa2:{
                	apiName:'beizhu',
	                param:{
						stock_sum_no:'',
						sku_sn:'',
						remark :''
						
	                }
                }
            }
        },
        methods: {
//      	((scope.row.edb_account_end<0)||(scope.row.cn_account_end<0))?false:true
//			控制输入框显示与否
			inputbtn(a,b,c){
				if(a<0||b<0||c<0){
					return true;
				}
			},
//			改变颜色
			tableRowClassName({row, rowIndex}) {
				if(row.edb_account_end<0||row.cn_account_end<0){
					if (rowIndex === rowIndex) {
					  return 'success-row';
					}
				}
		        return '';
			},
//			提交备注
        	baocunBtn(a,b){
        		console.log(a)
        		console.log(b)
        		if(!b.remark){
        			this.$message.error('请输入备注');
        		}else{
        			
        			this.dataWa2.param.stock_sum_no=b.stock_sum_no;
        			this.dataWa2.param.sku_sn=b.sku_sn;
        			this.dataWa2.param.remark=b.remark;
		            this.axios.post('/dc-admin/gate/api', 
		            this.dataWa2,
		            {type: 'payload'}
		                ).then(res =>{
		                	console.log(res)
		                })
        		}
//      		console.log(a)
//      		console.log(b)
        	},
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                if (index === 1) {
                    sums[index] = '';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                } else {
                    sums[index] = '-';
                }
                });

                return sums;
            },

            derive(){
                var downloadURL = "http://"+this.$store.state.xianshang+":8021/home/Baoge/gonggao_excel";  
                var form = $("<form>");   //定义一个form表单  
                form.attr('style','display:none');   //在form表单中添加查询参数  
                form.attr('target','');  
                form.attr('method','post');  
                form.attr('action',downloadURL);  
                                    
                var input1 = $('<input>');   
                input1.attr('type','hidden');   
                input1.attr('name','stock_sum_no');   
                input1.attr('value',this.dataWa.param.stock_sum_no);   //时间类型
                
                $('body').append(form);  //将表单放置在web中  
                form.append(input1);   //将查询参数控件提交到表单上  
                form.submit();   //表单提交  

              
            },
        },
        mounted() {
        	// bus.$on('sendMsg',function(msg){
            this.dataWa.param.stock_sum_no=this.$store.state.SFCmingxi;
            this.axios.post('/dc-admin/gate/api', 
            this.dataWa,
            {type: 'payload'}
                ).then(res =>{
                    var a  = JSON.parse(res.data.data)
                    console.log(a)
                    this.tableData3 = a.result.data
                    this.count=a.result.count
                    if(a.success===true){
                    	this.inputbtn()
                    }
            });
            // })
            
                      console.log('adsssa',this.tableData3)
                // 获取页面数据
                console.log(this.tableData3)
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.compColl .el-table__fixed{
    pointer-events: none;
}
.compColl .is-scrolling-left{
    background-attachment: none !important;
}
.el-table .success-row {
    background: #5691e1;
  }
</style>
