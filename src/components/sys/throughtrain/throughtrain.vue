<template>
	<div>
		<div class="TallySousuo">
            <span class="mustFill">*</span>
			<span>时间：</span>
			<el-date-picker v-model="value6"  @change='dateChang(value6)' value-format="yyyy-MM-dd" style="width: 160px" type="date" placeholder="选择日期">
			</el-date-picker>
		</div>
		<div class="TallySousuo">
            <span class="mustFill">*</span>
          <span>终端选择：</span>
          <el-select v-model="terminaltype"  @change="terminalchoose(terminaltype)" style="width: 150px" placeholder="请选择">
              <el-option
                v-for="item in terminal"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
          </el-select>
        </div>
        <div class="TallySousuo">
          <span>关键词：</span>
          <el-select v-model="competitorhourdata.param.key_word"  style="width: 150px" placeholder="请选择">
          	<el-option
                key="-1"
                label="全部"
                value="-1">
              </el-option>
              <el-option
                v-for="item in keywordlist"
                :key="item.id"
                :label="item.key_word"
                :value="item.id">
              </el-option>
          </el-select>
        </div>
        
		<span style="margin: 20px 10px 0 20px">
            <el-button type="primary" @click="OrderSearch">查询</el-button>
   	    </span>
   	    
   	    <div class="throughtmain">
   	    	<div class="throughtname">
   	    		<div style="width: 100%; height: 30px;text-align: center;line-height: 30px;position: relative; top: 0;">　(名称)</div>
   	    			<div>
   	    			</div>
   	    	</div>
   	    	<div class="throughtright">
	    		<div class="throughtdiv">
	   	    		<div class="throughtmorelist">
   	    				<div class="rankLong" v-for="(item,index) in competitorshowdata">
   	    					<div v-for="(item,index) in item"  :class="item.value==1?'rank ranks':'rank'" >{{index==0?item.value:''}}</div>
   	    				</div>

   	    			</div>
	   	    	</div>
	   	    	<div style="display: flex; margin-top: 8px;">
		   	    	<div class="throughtTime">
		   	    		<div class="times"></div>
		   	    		<div class="times" v-for="item in timesdata">{{item}}</div>
		   	    		<div class="times" style="display: flex; justify-content: space-between;"><div>23</div><div>24</div></div>
		   	    	</div>
		   	    	<div>(时间)</div>
	   	    	</div>
   	    	</div>
   	    	
   	    </div>
   	    <div style="width: 100%; height: 36px; line-height: 36px; background: #fff; margin-top: 20px; padding-left: 20px;" >竞争商品 </div>
		<div class="competemain">
			<div class="competelist" v-for="(item,index) in todo" v-if="index < power">
				<img :src="item.competitor_product_main_image"/>
				<div class="imgright">
					<div class="centers">
						{{item.competitor_product_name}}
					</div>
					<el-checkbox-group v-model="checkList" @change="is_selectFun(checkList)">
					    <el-checkbox :label="item.code" :checked='item.is_select'>{{item.competitor_product_nick_name}}</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
			<div class="competelist">
				<el-button style='margin-top: 24px;'  type="primary" @click='OrderSearch'>确定</el-button>
				<el-button style='margin-top: 24px;'  type="info" @click="morebtn(power)">{{power>7?"收起":"更多"}}</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				power:7,
        		checked: true,
        		value6:'',
				checkList:[],
				keywordlist:[],
				competitorshowdata:[],
				timesdata:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
				key_word_data:{
                    apiName:'key_word_show',
                },
                competitordata:{
                	apiName:'competitorlist',
                },
                terminaltype:'移动',
                competitorhourdata:{
                	apiName:'competitor_hour_is_show',
                	param:{
                        competitors:'',
                        this_date:'',
                        type:'',
                        key_word:'',
                    }
                },
				terminal: [{
		          value: '全部',
		          label: '-1'
		        },{
		          value: '移动',
		          label: '1'
		        }, {
		          value: 'PC',
		          label: '2'
		        }],
		        todo:[] 
			}
		},
		methods: {
			terminalchoose(data){
				this.competitorhourdata.param.type=data
				if(data=='移动'){
					this.competitorhourdata.param.type='1'
				}
			},
			// 修改时间
            dateChang(data){
                this.competitorhourdata.param.this_date = data;
            },
			//查询
			OrderSearch(){
				if(this.competitorhourdata.param.this_date==""||this.competitorhourdata.param.this_date==null){
					this.$message({
					    message: '请选择日期',
					   	type: 'error'
					});
				}else if(this.terminaltype==''){
					this.$message({
					    message: '请选择终端类型',
					   	type: 'error'
					});
				}else{
					if(this.terminaltype=='移动'){
						this.competitorhourdata.param.type='1'
					}
					for (var i in this.keywordlist){
						if(this.keywordlist[i].is_select==true&&this.competitorhourdata.param.key_word == this.keywordlist[i].key_word){
							this.competitorhourdata.param.key_word = this.keywordlist[i].id
						}
					}
					//this.is_selectFun()
					this.axios.post('/dc-admin/gate/api', this.competitorhourdata, {
						type: 'payload'
					}).then(res => {
						var datas = JSON.parse(res.data.data)
	        	        console.log(datas)
						try {
							this.competitorshowdata = datas.return_data_list
							console.log(this.competitorshowdata)
						} catch(err) {
							
						}
					})
				}
				
			},
			morebtn(a) {
				if(this.todo.length<7){
					this.$message({
					    message: '没有更多',
					   	type: 'error'
					});
					return;
				}
				if(a == 7) {
					this.power = 100;
				} else {
					this.power = 7;
				}
			},

			//竞品选择
			is_selectFun(checkId){
				console.log(checkId)
//				var arr = Object.keys(checkId);
//				console.log(arr.length); 
//				if(arr.length>7){
//					console.log('有误有误有误')
//				}
//				var jsonStr = JSON.stringify(checkId);
				this.competitorhourdata.param.competitors = checkId;
				
			},
			//关键词
			keywordFun() {
				this.axios.post('/dc-admin/gate/api', this.key_word_data, {
					type: 'payload'
				}).then(res => {
					var datas = JSON.parse(res.data.data)
//      	        console.log(datas)
					try {
						this.keywordlist = datas.data
						for (var i in this.keywordlist){
							if(this.keywordlist[i].is_select==true){
								this.competitorhourdata.param.key_word = this.keywordlist[i].key_word
							}
						}
					} catch(err) {
						
					}
				})
		
			},
			
			//竞争商品
			competitiveFun(){
				this.axios.post('/dc-admin/gate/api', this.competitordata, {
					type: 'payload'
				}).then(res => {
					var dataslist = JSON.parse(res.data.data)
        	        console.log(dataslist)
					try {
						this.todo = dataslist.data
						console.log(this.todo.length)
					} catch(err) {
						this.$message({
					    	message: datas.mag,
					    	type: 'error'
						}); 
					}
				})
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
			this.keywordFun();
			this.competitiveFun();
            var date=new Date;
            var end = date.getTime();
            var start = end - 3600 * 1000 * 24 * 1;
            start = this.fmtDate(start)
            this.value6 = start
            this.dateChang(this.value6);
		},
	}


</script>

<style lang="less">
  .TallyTop{
    display: inline-block;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
  .TallySousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }	
  .throughtmain{
  	min-width: 1250px;
  	display: flex;
  	padding: 16px;
  	width: 100%;
  	background: #fff;
  	margin-top: 20px;
  	border-radius: 6px;
  }
  .throughtname{
  	display: flex;
	flex-direction: column;
  	width: 70px;
  	}
  .throughtname .names{
  	width: 100%;
  	height: 40px;
  	text-align: center;
  	line-height: 40px;
  }
  .throughtright{
  	width: 100%;
  }	
  .throughtdiv{
  	width: 100%;
  	padding-top:30px;
  	border-bottom: 1px solid #000;
  	border-left: 1px solid #000;
  }
  .throughtTime{
  	width: 97%;
  	display: flex;
  	flex-direction:row;
  	justify-content:space-around;
  	align-content: center;
  }
  .throughtTime .times:nth-child(1){
  	margin-left: -4%;
  }
  .throughtTime .times{
  	width: 4%;
  	height: 18px;
  	/*text-align: center;*/
  }
  .throughtmorelist{
  	width: 97%;
  }
  .rankLong{
  	width: 100%;
  	height: 40px;
  	display: flex;
  	justify-content:space-around;
  	align-content: center;
  }
  .rankLong .rank:nth-child(1){
  	background: transparent;
  	text-align: center; 
  	line-height: 35px;
  	margin-left: -3.9%;
  }
  .rank{
  	width: 3.7%;
  	height: 35px;
  	background: #e5e5e5;
  }
  .ranks{
  	background: #409eff;
  }
  .competemain{
  	padding: 20px 0;
  	width: 100%;
  	min-width: 1250px;
  	height: 240px;
  	display: flex;
  	flex-direction: row;
  	justify-content: space-around;
  	flex-wrap: wrap;
  }
  .competelist{
  	width: 22%;
  	height: 80px;
  	margin-bottom: 20px;
  	display: flex;
  }
  .competelist img{
  	width: 75px;
  	height: 75px;
  }
  .imgright{
  	width: 200px;
  	margin-left: 10px;
  }
  .imgright .centers{
  	height: 40px;
  	overflow: hidden;
  	margin-top: 6px;
  	line-height: 20px;
  	margin-bottom: 4px;
  }
</style>
