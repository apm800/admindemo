<template>
    <div class="block sea">
    <!--  -->
        <div class="SeaSousuo">
          <el-select v-model="value" placeholder="请选择" @change='aaa(value)'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <!-- 日期 -->
        <div class="SeaSousuo">
          <el-date-picker @change='aaa(value6)'
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!--  -->
        <div class="SeaSousuo">
            <span>店铺名称：</span>
            <el-select v-model="value33" placeholder="请选择" @change='aaa()'>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--  -->
        <div class="SeaSousuo">
            <span>仓库名称：</span>
            <el-select v-model="value33" placeholder="请选择" @change='aaa()'>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--  -->
        <div class="SeaSousuo">
            <span>差异：</span>
            <el-select v-model="value33" placeholder="请选择" @change='aaa()'>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--  -->
        <div class="SeaSousuo">
            <span>对账情况：</span>
            <el-select v-model="value33" placeholder="请选择" @change='aaa()'>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--  -->
        <div class="SeaSousuo">
            <span>订单类型：</span>
            <el-select v-model="value33" placeholder="请选择" @change='aaa()'>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
                // 选项1
                options: [{
                    value: '选项1',
                    label: '订货时间'
                }, {
                    value: '选项2',
                    label: '发货时间'
                }, {
                    value: '选项3',
                    label: '签收时间'
                }, {
                    value: '选项4',
                    label: '对账时间'
                }],
                value: '订货时间',
                value22: '订货时间',
                value33: '订货时间',
                value44: '订货时间',
                value55: '订货时间',
                value66: '订货时间',

                // 日期范围
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
                value6: '',
                value7: '',
            }
        },
        methods: {
              onSubmit() {
                console.log('submit!');
              },
              aaa(a){
                console.log(a)
                this.$emit('aab',a)
              }
        },
        mounted() {
            console.log(this.item)
        },
        props: {
            item:{}
        },
        watch: {},
    }
</script>
<style lang="less">
  .sea{
    display: inline-block;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .SeaSousuo{
    display: inline-block;
    margin:10px 15px 0 0;
  }
</style>
