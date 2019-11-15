
<template>
    <div class="waidataContend animated fadeInDown">
        <template>
        <div style="font-size: 18px; margin-bottom: 10px;">视频详情</div>
        <div style="border-bottom:1px solid #ccc;">
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
                prop="video_name"
                label="视频名称">
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
                //分页每页数量
                pagesize:50,
                // 总数
                pageCon:0,
                //当前页
                page:1,
                dataWasku:{
                    apiName:'get_contentdata',
                    param:{
                        project_id:"",
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
                this.videofuns();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.videofuns();
            },
//          短视频
            videofuns(){
                this.dataWasku.param.page_index = this.page;
                this.dataWasku.param.page_size = this.pagesize;
            	this.dataWasku = this.$route.params.dataWasku
            	this.dataWasku.param.source_type = 1;
            	this.dataWasku.param.date_start = this.$route.params.times
            	this.dataWasku.param.date_end = this.$route.params.times
            	console.log(this.dataWasku.param)
            	this.axios.post('/dc-admin/gate/api',this.dataWasku,{type: 'payload'}
               	).then(res =>{
            		this.dataWasku.param.source_type = 2;
               		var datas = JSON.parse(res.data.data)
        	        console.log(datas)
        	        if(datas.code==1){
        	            this.tableData3=datas.datas;
                    	this.pageCon = datas.paginator_count;
        	        }else{
        	        	this.$message({
					    	message: datas.mag,
					    	type: 'error'
						});    	
        	          }
               	})
            	
            },

        },
        mounted() {
        	this.videofuns()
               
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
