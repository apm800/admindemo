<template>
	<div>
		<div class="TallySousuo">
            <span class="mustFill">*</span>
          <span>统计时间：</span>
          <el-select v-model="choosetimes"  @change="countTime(choosetimes)" style="width: 150px" placeholder="请选择">
              <el-option
                v-for="item in choosetime"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
          </el-select>
        </div>
        
		<div class="TallySousuo">
            <span class="mustFill">*</span>
			<span>时间：</span>
			<el-date-picker
		      v-model="value7"
		      @change='dateChang(value7)'
	    	  type="daterange"
		      align="right"
		      value-format="yyyy-MM-dd"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
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

        
		<span style="margin: 20px 10px 0 20px">
            <el-button type="primary" @click="OrderSearch">查询</el-button>
   	    </span>
   	    
   	    <div style="width: 100%; height: 36px; line-height: 36px; background: #fff; margin-top: 20px; padding-left: 20px;" >关键指标对比</div>
   	    
		<div class="exponentmain">
			<div class="exponent">
				<el-radio-group @change='exponentbtn' v-model="competitorhourdata.param.type" size="medium">
			      <el-radio-button label="1">流量指数</el-radio-button>
			      <el-radio-button label="2">交易指数</el-radio-button>
			      <el-radio-button label="3">交易金额</el-radio-button>
			   </el-radio-group>
				
			</div>
		</div>
		
		<div id="mapsectioncity" style="display: inline-block;  width:1000px; height:400px; margin-top: 20px;"></div>
		<div class="biaomain">标签说明：<div class="imgmain"><img src='../../../assets/img/green.png'/>价格变化</div>
		<div class="imgmain"><img src="../../../assets/img/yee.png"/>宝贝标签变化</div>
		<div class="imgmain"><img src="../../../assets/img/greeny.png"/>价格标签均变化</div>
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
					    <el-checkbox :label="item" :checked='item.is_select'>{{item.competitor_product_nick_name}}</el-checkbox>
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
				choosetimes:'7天',
				value7:[],
				competitorshowdata:[],
           		timedata:[],
           		mapamountsdata:[],
           		jingname:[],
				timesdata:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
				key_word_data:{
                    apiName:'key_word_show',
                },
                competitordata:{
                	apiName:'competitorlist',
                },
                terminaltype:'移动',
                competitorhourdata:{
                	apiName:'queryResult',
                	param:{
                		goods:'本店商品',
                        startTime:'',
                        endTime:'',
                        terminal:'',
                        codes:'569816923321',
                        type:1,
                    }
                },
                choosetime: [{
		          value: '7天',
		          label: '0'
		        },{
		          value: '30天',
		          label: '1'
		        }],
				terminal: [{
		          value: '全部',
		          label: '3'
		        },{
		          value: '移动',
		          label: '2'
		        }, {
		          value: 'PC',
		          label: '1'
		        }],
		        todo:[] 
			}
		},
		methods: {
			drawChinaMaps() {
				var that = this;
				var myChart = this.$echarts.init(document.getElementById('mapsectioncity'));
//				myChart.setOption(option,true);
				myChart.setOption({
						    title: {
						        text: '折线图'
						    },
						    tooltip: {
						        trigger: 'axis'
						    },
						    legend: {
						        data:this.jingname
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    toolbox: {
						        feature: {
						            saveAsImage: {}
						        }
						    },
						    xAxis: {
						        type: 'category',
						        boundaryGap: false,
						        data: this.timedata,
//						        data: ["2018-12-04", "2018-12-05", "2018-12-06", "2018-12-07"]
						    },
						    yAxis: {
						        type: 'value'
						    },
						    series:this.mapamountsdata 

						},true
				);
			},
			//统计时间
			countTime(a){
			  if(a==0){
				  const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              this.value7 = [this.timeChange(start),this.timeChange(end)]
	              this.competitorhourdata.param.startTime = this.timeChange(start)
	              this.competitorhourdata.param.endTime = this.timeChange(end)

			  }
			  if(a==1){
				  const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              this.value7 = [this.timeChange(start),this.timeChange(end)]
	              this.competitorhourdata.param.startTime = this.timeChange(start)
	              this.competitorhourdata.param.endTime = this.timeChange(end)
	              
			  }
			},
			exponentbtn(value){
				console.log(value)
				this.competitorhourdata.param.type = value;
				this.OrderSearch()
				
			},
			timeChange(time){
				var d = new Date(time); 
				var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
				return datetime
			},
			
			terminalchoose(data){
				this.competitorhourdata.param.terminal=data
				if(data=='移动'){
					this.competitorhourdata.param.terminal='2'
				}
			},
			// 修改时间
            dateChang(data){
	              this.competitorhourdata.param.startTime = data[0];
	              this.competitorhourdata.param.endTime = data[1]
            },
			//查询
//			function findall(a,x){
//			  var results=[],
//			      len=a.length,
//			      pos=0;
//			  while(pos<len){
//			    pos=a.indexOf(x,pos);
//			    if(pos===-1){//未找到就退出循环完成搜索
//			      break;
//			    }
//			    results.push(pos);//找到就存储索引
//			    pos+=1;//并从下个位置开始搜索
//			  }
//			  return results;
//			}
//			
//			var arr=[1,2,3,1,4,1,4,1];
//			findall(arr,1);//返回[0,3,5,7]
			
			OrderSearch(){
					if(this.terminaltype=='移动'){
						this.competitorhourdata.param.terminal='2'
					}
					this.axios.post('/dc-admin/gate/api', this.competitorhourdata, {
						type: 'payload'
					}).then(res => {
						

						console.log(res)
						var datas = JSON.parse(res.data.data)
	        	        console.log(datas)
	              		var i,j,res = [],spa = [];
	              		res.splice(0,res.length)
	              		this.jingname.splice(0,this.jingname.length)
	              		this.mapamountsdata.splice(0,this.mapamountsdata.length)
	              		console.log(this.mapamountsdata)
//	        	        datas.result.detailList.status = datas.result.changeList.status
	        	        var detailList = datas.result.detailList
	        	        var changeList = datas.result.changeList
	        	        for( i in detailList){
	        	        	detailList[i].indexs=[]
	        	        	detailList[i].spadata=[]
	        	        	detailList[i].status = changeList[i].status
	        	        	if(changeList[i].times!=''){
	        	        		console.log(changeList[i].times)
	        	        		detailList[i].labeltime = changeList[i].times
	        	        	for(var l in detailList[i].labeltime){
	        	        		detailList[i].indexs.push(detailList[i].times.indexOf(detailList[i].labeltime[l]))
	        	        	}
	        	        	}
	        	        	for(var t in detailList[i].indexs){
	        	        		detailList[i].spadata.push({
									value: detailList[i].status[t]==1?'价格变化':detailList[i].status[t]==2?'标题变化':'均变',
									coord: [detailList[i].indexs[t], detailList[i].num[detailList[i].indexs[t]]],
	        	        			label:{
	        	        				fontSize:10
	        	        			}
	        	        		})
	        	        	}
	        	        }
	        	       	var datas = datas.result.detailList
	        	        
	        	        console.log(datas)
	              		for( i in datas){
	              			this.jingname.push(datas[i].goods[0])
							res.push({
								name: datas[i].goods[0],
								type:'line',
						        data:datas[i].num,
						        good:datas[i].goods,
						        markPoint:{
					        		symbol: 'pin',						        		
              						data: detailList[i].spadata
						        }
							});
	              		}
	              		this.timedata=  datas[0].times;

	               		this.mapamountsdata = res;	
	              		console.log(this.mapamountsdata)
						this.drawChinaMaps();
	        	        
					})
				
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
			is_selectFun(item){
				var arr1=['569816923321'],arr2 = ['本店商品'];
				for (var i in item){
					var code = item[i].code;
					var names = item[i].competitor_product_nick_name;
					arr1.push(code)
					arr2.push(names)
				}
				console.log(arr1.join('-'))
				console.log(arr2.join('-'))
				this.competitorhourdata.param.codes = arr1.join('-')
				this.competitorhourdata.param.goods = arr2.join('-')
				

			},

			
			//竞争商品
			competitiveFun(){
				this.axios.post('/dc-admin/gate/api', this.competitordata, {
					type: 'payload'
				}).then(res => {
					var dataslist = JSON.parse(res.data.data)
//      	        console.log(dataslist)
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
			this.drawChinaMaps();
			this.countTime(0);
			this.competitiveFun();
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
	.exponentmain{width: 1000px; margin-top: 20px;}
	.exponent{width: 500px;margin: auto; height: 30px; display: flex; align-items: center; justify-content: space-between;}
	.exponent .el-radio-button{margin: 0 35px;}
	.exponent .el-radio-button__inner{border: none !important; border-radius: 0 0 0 0 !important;}
	.expbtn{width: 100px; height: 30px; border: 1px solid #fff; background: #fff; text-align: center; line-height: 30px;}
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
  .imgmain{margin-left: 20px; display: flex; align-items: center;}
  .imgmain img{margin-right: 5px;width: 30px; height: 30px;}
  #mapsectioncity{background: #fff;}
  .biaomain{width: 1000px; height: 50px; background: lightblue; display: flex; margin-top: -6px; background: #fff; align-items: center; text-indent: 10px;}
  
  
  
</style>
