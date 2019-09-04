/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-29 17:20:38 
 * @Email: 991034150@qq.com 
 * @Description: 今日任务
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-12-07 11:18:17
 */

<style lang="scss" scoped>
.today_task {
  width: 100%;
  padding: 0 8px;
  .text {
    width: 100%;
    display: flex;
    text-align: center;
    margin-bottom: 14px;
    span {
      flex: 1;
    }
  }
  .bar {
    width: 100%;
    border-radius: 20px;
    background: #152244;
    height: 16px;
    overflow: hidden;
    &>div {
      width: 100%;
      height: 100%;
    }
    span {
      width: 33.3%;
      display: inline-table;
      float: left;
      height: 100%;
      &:nth-child(1) {
        border-radius: 20px 0 0 20px;
        background-image: linear-gradient(-180deg, #fd5f7e 0%, #f93148 100%);
      }
      &:nth-child(2) {
        background-image: linear-gradient(-180deg, #fbb04c 0%, #f67825 100%);
      }
      &:nth-child(3) {
        background-image: linear-gradient(-180deg, #aff588 0%, #77e750 100%);
        border-radius: 0 20px 20px 0;
      }
    }
  }
}
</style>
<template>
  <div class=" item">
    <h3>今日任务情况</h3>
    <div class="total_item">
       <i></i>
        <p>任务总数</p>
      <div class="values">
         <DigitRoll :rollDigits="digits" />
      </div>
    </div>
    <div class="today_task">
      <div class="text">
        <span>未开始任务：{{sourceData.notStartCount}}</span>
        <span>进行中任务：{{sourceData.startCount}}</span>
        <span>完成任务：{{sourceData.completeCount}}</span>
      </div>
      <div class="bar">
        <div v-if="count != 0">
          <span :style="{'width':  sourceData.notStartCount / count * 100 + '%' }"></span>
          <span :style="{'width':  sourceData.startCount / count * 100 + '%' }"></span>
          <span :style="{'width':  sourceData.completeCount / count * 100 + '%' }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DigitRoll } from '@/components/common';
import { numberPlaceholder } from '@/util/util'
export default {
  data() {
    return {
      count: 0,
      digits: "0000",
    };
  },
  props: {
    sourceData: Object
  },
  components: {
    DigitRoll 
  },
  mounted() {
    this.computeTotal()
  },
  methods: {
    computeTotal() {
      if(_.isEmpty(this.sourceData)) {
        return
      }
      const { count} = this.sourceData
      this.count = count
      this.digits = numberPlaceholder(this.count)
    }
  },
  watch: {
    sourceData: 'computeTotal'
  }
};

</script>

