<template>
    <div class="date_h">
        <div id="container" style="float:none;margin: 0px ;width:40% !important;"></div>
        <!--内有单选 <Calendar ref="Calendar" :markDateMore="arr" :markDate="arr2" v-on:isToday="clickToday" :agoDayHide='today' v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar> -->
        <Calendar ref="Calendar" :markDateMore="arr" v-on:isToday="clickToday" :agoDayHide='today' v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
    
    <span v-on:click='demo(10)'>dsasda</span>
    
    </div>
</template>

<script>
import Calendar from './vue-calendar-component/index';
    export default {
  data() {
    return {
      today:0,//今天之后不可选择
      // arr2: ['2018-6-23'],
      arr: [
        {
          date: '2018/6/1',
          className: 'mark1'
        },
        {
          date: '2018/6/2',
          className: 'mark1'
        },
        {
          date: '2018/6/13',
          className: 'mark2'
        },
        {
          date: '2018/6/14',
          className: 'mark2'
        }
      ]
    };
  },
  components: {
    Calendar
  },
  methods: {
    clickDay(data) {
      console.log('选中了', data); //选中某天
    //   this.$toast('选中了' + data);
    },
    clickToday(data) {
      console.log('跳到了本月今天', data); //跳到了本月
    },
    changeDate(data) {
    //   this.$toast('切换到的月份为' + data);
      console.log('左右点击切换月份', data); //左右点击切换月份
    },
    demo() {
        console.log(123123)
      this.$refs.Calendar.ChoseMonth('2018-12-12'); //跳到12月12日选中12月12日
    }
  },
  created() {
    function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
    this.arr = [
      {
        date: format(new Date(), 1),
        className: 'mark1'
      },
      {
        date: format(new Date(), 2),
        className: 'mark1'
      },
      {
        date: format(new Date(), 13),
        className: 'mark2'
      },
      {
        date: format(new Date(), 14),
        className: 'mark3'
      }
    ];
    // this.arr2 = [format(new Date(), 23)]
    
    this.today = Date.parse( new Date() ).toString();//获取今日时间戳.十位数
    this.today = this.today.substr(0,10);

    console.log('dasad',this.today)
  }
};
</script>
<style lang="less">
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

.mark1 {
  color:orange !important;
}
.mark2 {
  color: red !important;
}
.mark3 {
  color: green !important;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
</style>
