<template>
    <div class="waidataContend animated fadeInDown">
        <template>
        <div style="border-bottom:1px solid #ccc;">
            <div class="waidataContend_s">
                <span>当前项目：</span>
                <el-select v-model="dataWasku.param.project_id"  placeholder="请选择项目">
                    <el-option
                        v-for="item in shopName"
                        :key="item.project_id"
                        :label="item.project_name"
                        :value="item.project_id">
                    </el-option>
                </el-select>
            </div>
            <div class="waidataContend_s">
                <span>任务日期：</span>
                <el-date-picker
                v-model="value6"
                @change='dateChang(value6)'
                type="daterange" 
				value-format="yyyy-MM-dd"
				range-separator="至" 
				start-placeholder="开始日期" 
				end-placeholder="结束日期" >
                </el-date-picker>
            <el-button style="margin-left:20px;" type="primary" @click="querybtn" v-checkup="'get_contentdata'">查询</el-button>
            <el-button style=" " type="primary" @click="daochu">导出</el-button>
            <a :href="daochuUrl" style="display:none" id="daochuA"></a>
            </div>

        <el-table
            v-loading="loading1"
            element-loading-text="正在查询..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"

            :data="tableData3"
            border
            style="width: 100%">
                <el-table-column
                prop="this_date"
                label="时间">
                </el-table-column>
                <el-table-column
                prop="sources_name"
                label="渠道名称">
                </el-table-column>
                <el-table-column
                prop="browse_times"
                label="浏览次数">
                </el-table-column>
                <el-table-column
                prop="browser_num"
                label="浏览人数">
                </el-table-column>
                <el-table-column
                prop="interaction_num"
                label="互动次数">
                </el-table-column>
                <el-table-column
                prop="interacter_num"
                label="互动人数">
                </el-table-column>
                <el-table-column
                prop="guided_in_times"
                label="引导进店次数">
                </el-table-column>
                <el-table-column
                prop="guided_in_user_num"
                label="引导进店人数">
                </el-table-column>
                <el-table-column
                prop="guided_add_times"
                label="引导加购人数">
                </el-table-column>
                <el-table-column
                prop="guided_add_user_num"
                label="引导加购商品数">
                </el-table-column>
                <el-table-column
                prop="guided_save_times"
                label="引导收藏次数">
                </el-table-column>
                <el-table-column
                prop="guided_save_user_num"
                label="引导收藏人数">
                </el-table-column>
                <el-table-column
                prop="guided_pay_num"
                label="引导支付人数">
                </el-table-column>
                <el-table-column
                prop="guided_pay_sub_order_num"
                label="引导支付子订单">
                </el-table-column>
                <el-table-column
                prop="guided_pay_money"
                label="引导支付金额">
                </el-table-column>
                <el-table-column fixed="right" label="详情">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="videofun(scope.$index, scope.row)" v-if="scope.row.more_infor==1">详情</el-button>
			      </template>
			    </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100,500]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCon">
        </el-pagination>
    </div>
        </template>
    </div>
</template>

<script>
	var nocheckData =[];
    import bus from '../../../assets/eventbus';
    export default {
        data() {
            return {
                shopName:[
                    {project_id:'111',
                     project_name:'帮宝适官方旗舰店'}
                    ],
                value6:'',
                tableData3:[],
                loading1:0,
                daochuUrl:'',
                //分页每页数量
                pagesize:50,
                // 总数
                pageCon:0,
                //当前页
                page:1,
                dataWasku:{
                    apiName:'get_contentdata',
                    param:{
                        project_id:'111',
                        date_start:"",
                        date_end:"",
                        page_size:50,
                        page_index:1,
                        source_type:2
                    }
                },
                
            }
        },
        methods: {
            // 分页方法        
            handleSizeChange(val) {
                this.pagesize = val;
                this.querybtn();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.querybtn();
            },
            // 修改时间
            dateChang(data){
            	console.log(data)
            	this.dataWasku.param.date_start = data[0]; //开始时间
	            this.dataWasku.param.date_end = data[1]; // 结束时间

            },
//          短视频
            videofun(index,row){
            	console.log(row)
            	if(row.more_infor==1){
			     	this.$router.push({name: 'videocontent', params: {dataWasku: this.dataWasku,times:row.this_date}})
            	}
            },
            //导出
            daochu(){
                if(this.dataWasku.param.project_id==''){
            		this.$message({
					    message: '请选择项目',
					    type: 'error'
					});
            	}else if(this.value6==""){
            		this.$message({
					    message: '请选择时间',
					    type: 'error'
					});
            	}else{
            		
                this.daochuUrl='http://'+this.$store.state.xianshang+':8024/bangbaoshi_api/get_content/?source_type=2&project_id='+this.dataWasku.param.project_id+'&date_start='+this.dataWasku.param.date_start+'&date_end='+this.dataWasku.param.date_end;
   
                setTimeout(function(){document.getElementById("daochuA").click()},800)
                console.log(this.daochuUrl)
            	}
            },
            //查询
            querybtn(){
            	if(this.dataWasku.param.project_id==''){
            		this.$message({
					    message: '请选择项目',
					    type: 'error'
					});
            	}else if(this.value6==""){
            		this.$message({
					    message: '请选择时间',
					    type: 'error'
					});
            	}else{
                	this.loading1 = 1;
                	this.dataWasku.param.page_index = this.page;
                	this.dataWasku.param.page_size = this.pagesize;
                	this.axios.post('/dc-admin/gate/api',this.dataWasku,{type: 'payload'}
               	).then(res =>{
                	    this.loading1 = 0;
            	        var datas = JSON.parse(res.data.data)
        	            console.log(datas)
        	            if(datas.code==1){
        	            	this.tableData3=datas.datas
                    		this.pageCon = datas.paginator_count;
        	            }else{
        	        		this.$message({
					    		message: datas.mag,
					    		type: 'error'
							});    	
        	            }
	                });
            	}
            		
            },




        },
        mounted() {
               
        },
        props: {},
        watch: {},
        
    }
</script>
<style lang="less">
.waidataContend .el-table__fixed{
    pointer-events: none;
}
.waidataContend_s{
    display: inline-block;
    margin: 10px;
}
.waidataContend .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}

</style>
