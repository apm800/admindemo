export default {
    data() {
        return {
        }
    },
    methods: {
        //店铺流量导出Σ>―(〃°ω°〃)♡→
        daochu1(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/itflowsourcetable/download?date='
            +this.value6+
            '&projectId='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //日报数据-PVT导出Σ>―(〃°ω°〃)♡→
        daochu2(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/itcommodityeffect/download?date='
            +this.value6+
            '&projectId='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //商品流量导出Σ>―(〃°ω°〃)♡→
        daochu3(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/singleproductsourceinfor/download?date='
            +this.value6+
            '&projectId='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //irobot日报导出Σ>―(〃°ω°〃)♡→
        daochu4(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
                // irobot日报http://47.104.23.238:8024/oralb_excel_api/select_irobot_daily_excel/?date_start=2018-08-01&date_end=2018-08-31&project_id=23/ 
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024/oralb_excel_api/select_irobot_daily_excel/?date_start='
            +this.value6[0]+
            '&date_end='+this.value6[1]+
            '&project_id='+this.value1
            
            console.log(this.daochuUrl)
            // setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //流量周报导出Σ>―(〃°ω°〃)♡→
        daochu5(){
            
            var date=this.value6;
            var datas = date.getTime();
            var start = datas - 3600 * 1000 * 24 * 1;
            var end = datas + 3600 * 1000 * 24 * 5;
            start = this.fmtDate(start);
            end = this.fmtDate(end);
            console.log()
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //流量周报
            // http://47.104.23.238:8024/oralb_excel_api/select_irobot_source_week_excel/?date_start=2018-08-01&date_end=2018-08-31&project_id=23/ 
            // 开始日期结束日期为周一
            // 结束日期为周日，同一个周的'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8024'+'/oralb_excel_api/select_irobot_source_week_excel/?date_start='
            +start+'&date_end='+end+
            '&project_id='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //日报By店铺导出Σ>―(〃°ω°〃)♡→
        daochu6(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            ///bfec-obtain/transactionprofile/download?projectId=22&date=2018-08-10 日报By店铺 导出
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/transactionprofile/download?date='
            +this.value6+
            '&projectId='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //来源展示导出Σ>―(〃°ω°〃)♡→
        daochu7(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/competitiveproduct/download1?date='
            +this.value6+
            '&projectId='+this.value1+
            '&productId='+this.value9+
            '&type='+2
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
        //日报数据-竞品导出Σ>―(〃°ω°〃)♡→
        daochu8(){
            var a = '';
            for(let i in this.options4){
                console.log(this.value9)
                if(this.options4[i].label == this.value9){
                    a = this.options4[i].value
                }
            }
                console.log(a)
            // if(this.value9==''){
            //     this.$message({
            //     type: 'error',
            //     message: '请选择SKU'
            //     });
            //     return;
            // }
            //this.daochuUrl = 'http://172.18.35.220:8078/oralb_excel_api/select_single_product_source_infor_excel/?this_date='+this.value6[0]+'&project_id='+this.value1+'&product_id=520939037901'
            this.daochuUrl = 'http://'+this.$store.state.xianshang+':8078/bfec-obtain/competitiveproductsellinfor/downloadbybrand?date='
            +this.value6+
            '&projectId='+this.value1
            
            setTimeout(function(){document.getElementById("daochuA").click()},800)
            console.log(this.daochuUrl)
        },
    },
    mounted() {
    },
    props: {},
    watch: {},
    
}