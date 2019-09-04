/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-30 09:35:50 
 * @Email: 991034150@qq.com 
 * @Description: 今日报警情况
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 14:22:02
 */

<style lang="scss" scoped>
.warning_count {
  width: 100%;
  // padding: 0 8px;
  display: flex;
  text-align: center;
  .col {
    flex: 1;
    border-right: 1px solid rgba(255,255,255,0.40);
    &:last-child {
      border: none;
    }
    span {
      background: rgba(15,108,252,0.20);
      border: 1px solid #0F6CFC;
      border-radius: 12px;
      width: 86px;
      height: 24px;
      line-height: 24px;
      display: inline-block;
      margin-top: 8px;
    }
  } 
}
</style>


<template>
    <div class="item">
      <h3>今日报警情况</h3>
      <div class="total_item warning">
        <i></i>
          <p>报警总数</p>
        <div class="values">
          <DigitRoll :rollDigits="digits" />
        </div>
      </div>
      <div class="warning_count">
        <div class="col">已处理报警数
          <span>{{completeCount}}</span>
        </div>
        <div class="col">处理中报警数
          <span>{{startCount}}</span>
        </div>
        <div class="col">未处理报警数
          <span>{{notStartCount}}</span>
        </div>
      </div>
      <!-- <TodayTask /> -->
    </div>
</template>

<script>
import { DigitRoll } from '@/components/common';
import { numberPlaceholder } from '@/util/util'
export default {
  data() {
    return {
      digits: "0087",
      completeCount: 72,
      startCount: 12,
      notStartCount: 3,
    }
  },
  props: {
    sourceData: Object,
    total: Number,
  },
  components: {
    DigitRoll
  },
  mounted() {
    // this.computeTotal()
  },
  methods: {
    computeTotal() {
       
      this.digits = numberPlaceholder(this.total)
      if(this.total == 0) {
        this.notStartCount = 0
        this.completeCount = 0
        this.startCount = 0
        return
      }
      // 随机分配
      this.notStartCount = this.total - Math.ceil(this.total / 1.2)
      this.completeCount = this.total - this.notStartCount - Math.ceil(Math.random() * 10)
      if(this.completeCount < 0) {
        this.completeCount = 0
      }
      this.startCount = this.total - this.notStartCount - this.completeCount 
      
    }
  },
  watch: {
    // 'total': 'computeTotal'
  }
}
</script>

