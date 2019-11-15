<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_element">
          <el-date-picker
            v-model="myDate"
            :clearable='false'
            type="month"
            @change="zhidingDay(myDate)"
            placeholder="选择月">
          </el-date-picker>
          <el-button style="float:right;" type="info" v-on:click='nowDay(myDates,false)'>返回今天</el-button>
      </div>
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
            {{item.id}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar';
export default {
  data() {
    return {
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      myDates: 'Mon Aug 05 2019 00:00:00 GMT+0800 (中国标准时间)',
      list: [],
      historyChose: [],
      dateTop: '',
      value4:'',//年月
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created() {
    this.myDate = new Date();
  },
  methods: {
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    // 跳转到今天
    nowDay: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.nowOtherMonth(this.myDate, 'nowDay');
      // console.log('我的',timeUtil.dateFormat(this.myDate))
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    // 跳转到指定月份
    zhidingDay: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.zhidingOtherMonth(this.myDate, 'nowDay');
      // console.log('我的',timeUtil.dateFormat(this.myDate))
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      for (let i = 0; i < markDate.length; i++) {
        markDate[i] = timeUtil.dateFormat(markDate[i]);
      }
      let markDateMore = this.markDateMore;
      for (let i = 0; i < markDateMore.length; i++) {
        markDateMore[i].date = timeUtil.dateFormat(markDateMore[i].date);
      }
      return [markDate, markDateMore];
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        // k.dayHide = t < this.agoDayHide || t > this.futureDayHide;//去掉无法选中
        k.dayHide = t >= this.agoDayHide;//去掉无法选中
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate(val, oldVal) {
      this.getList(this.myDate);
    },
    markDateMore(val, oldVal) {
      this.getList(this.myDate);
    },
    agoDayHide(val, oldVal) {
      this.agoDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    futureDayHide(val, oldVal) {
      this.futureDayHide = parseInt(val);
      this.getList(this.myDate);
    }
  }
};
</script>

<style>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #fff;
    cursor: pointer;
    border-radius: 50%;
    border:2px dashed #46a0fc;
  }
}
.wh_want_dayhide:hover {
  background: #fff;
  cursor: pointer;
  border-radius: 50%;
  border:2px dashed rgba(0,0,0,0);
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 100%;
  min-width: 370px;
  /* margin: auto; */
  border-radius: 10px;
  background: #fff;
  /* box-shadow: #ccc 0px 0px 10px; */
  border:1px solid #e5e5e5;
  padding: 20px;
}
.wh_container:hover{
  max-width: 100%;
  min-width: 370px;
  /* margin: auto; */
  border-radius: 10px;
  background: #fff;
  box-shadow: #ccc 0px 0px 8px;
  padding: 20px;
}
.wh_element{
  padding-bottom: 10px;
  border-bottom: 1px dashed #e5e5e5;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  border-bottom: #46a0fc solid 1px;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  color: #46a0fc;
  font-weight: 900;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  /* background-color: #0fc37c; */
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #fff;
  position: relative;
}
.wh_content_item {
  height: 40px;
  margin-bottom: 10px;
  margin-left: 2px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#46a0fc;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #46a0fc;
  border-left: 2px solid #46a0fc;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #46a0fc;
  border-right: 2px solid #46a0fc;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #ddd;
}
.wh_content_item .wh_want_dayhide {
  color: #ddd;
}
.wh_content_item .wh_isToday {
    /* background: #46a0fc;
    color:#fff !important;
    border-radius: 100px; */
    box-shadow: 0px 0px 10px  #9f9f9f;
    border-radius: 50%;
}
.wh_content_item .wh_chose_day {
    background: #fff;
    cursor: pointer;
    border-radius: 50%;
    /* border-top:2px dashed #46a0fc; */
    border-left:2px dashed #46a0fc;
    border-bottom:2px dashed #46a0fc;
}
</style>