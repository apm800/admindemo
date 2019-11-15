// 分页mixins

export default {
    data(){
        return{
            page: 1,//当前也
            limit:20,//每页条数
            pagesizes:[20, 50, 100],//条数数组
            total:0,//总数
            tableData: [],//列表数据
        }
    },
    mounted() {
        this.pageDataReq();
    },
    methods:{
        handleSizeChange(val) {
            this.limit=val;
            this.page=1;
            this.pageDataReq();
        },
        handleCurrentChange(val) {
            this.page=val;
            this.pageDataReq();
        },
        pageDataReq() {
            let req={
                page:this.page,
                limit:this.limit
            }
            this.$http.get(this.reqUrl,{params:req}).then((response) => {
            	console.log(this.reqUrl)
                var res = response.data;
                if (res.code == 0) {
                    this.tableData = res.page.list;
                    this.total=res.page.totalCount;
                }else {
                    this.tableData=[];
                    this.page=1;
                }
            })
        }
    }
}
