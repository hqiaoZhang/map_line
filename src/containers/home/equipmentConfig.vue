/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-30 10:03:54 
 * @Email: 991034150@qq.com 
 * @Description: 网格员及溯源设备配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-12-20 14:28:48
 */
<style lang="scss" scoped>
  .equipment_count {
    width: 100%;
    .row {
      width: 100%;
      display: flex; 
    }
    .total {
      .col {
        flex: 1;
        position: relative;
      }
      margin-bottom: 12px;
      text-align: center;
      .col:first-child::after {
        content: "";
        height: 12px;
        width: 1px;
        background: #a4a4c6;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 15px;
      }
       i {
         width: 38px;
         height: 38px;
         vertical-align: top;
       }
       i.gu_icon {
         background: url("./images/icons8-police_big.png") no-repeat;
       }
       i.eq_icon {
         background: url("./images/icons8-3d_printer.png") no-repeat;
       }
       span {
         height: 38px;
         line-height: 38px;
         margin-left: 8px;
       }
       b {
         font-size: 24px;
       }
    }
    .count {
      padding: 0 8px;
      .row {
        margin-bottom: 10px;
        .col {
          &:first-child,
          &:last-child {
            width: calc(50% - 18px);
          }
          &:nth-child(2) {
            width: 36px;
            text-align: center;
          }
        }
      }
      span {
        float: left;
      }
      .count {
        min-width: 21px;
      }
      .bar {
        width: calc(100% - 50px);
        height: 8px;
        display: inline-block;
        margin: 2px 12px 0 12px;
        position: relative;
        &.rbar {
          margin-left: 0;
        }
        b,
        &::after {
          position: absolute;
          display: inline-block; 
          // width: 80%;
          height: 8px;
        }
        b {
          z-index: 2;
          right: 0;
          width: 0;
          -webkit-backface-visibility: hidden;
          -webkit-transform-style: preserve-3d; 
          transition: width 0.4s ease;
          
          &.r0 {
            right: 0;
            border-radius: 0 4px 4px 0;
            transform-origin: 100% 100%; 
          }
          &.l0 {
            left: 0;
            border-radius: 4px 0 0 4px;
            transform-origin: 0% 0%; 
          }
          &.r4 {
            border-radius: 4px;
          }
        }
        &::after {
          content: "";
          display: inline-block;
          background: #152244;
          width: 100%;
          border-radius: 4px;
          z-index: 1;
        }
      }
      .c1 b {
        background-image: linear-gradient(-270deg,#AFF588 0%, #77E750 100%);
      }
      .c2 b {
        background-image: linear-gradient(-270deg, #FFA456 0%, #FF7600 100%);

      }
      .c3 b {
        background-image: linear-gradient(90deg, #D1D5D9 0%, #A5AAB2 100%);
      }
      .radius4 {
        border-radius: 4px;
      }
    }
  }
  @media screen and (max-width: 1200px)  {
    .equipment_count .total b {
      font-size: 13px;
    }
  }
</style>

<template>
  <div class="item">
    <h3>网格员及溯源设备配置</h3>
    <div class="equipment_count">
      <div class="row total">
        <div class="col">
          <i class="gu_icon"></i><span>网格员：<b>{{total1}}</b>人</span>
        </div>
        <div class="col">
          <i class="eq_icon"></i><span>溯源设备：<b>{{total2}}</b>个</span>
        </div>
      </div>
      <div class="count">
        <div class="row c1" v-for="(item, index) in state" 
          :class="[`c${index + 1}`]"
          :key="index">
          <div class="col">
            <span class="count" :style="{width: `${maxLen * 15}px`}">{{guData[item.code] || 0}}</span>
            <span class="bar rbar" :style="{width: `calc(100% - ${maxLen * 15 + 12}px)`}">
              <b class="r0" 
                :class="{r4: calcWidth(guData[item.code], total1) >= 100}"
                :style="{width: calcWidth(guData[item.code], total1) + '%'}">
              </b>
            </span>
          </div>
          <div class="col">{{item.name}}</div>
          <div class="col">
            <span class="bar lbar" :style="{width: `calc(100% - ${maxLen * 15 + 12}px)`}">
              <b class="l0" 
                :class="{r4: calcWidth(ecData[item.code], total2) >= 100}"
                :style="{width: calcWidth(ecData[item.code], total2) + '%'}">
              </b>
            </span>
            <span>{{ecData[item.code] || 0}}</span>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>


<script>
// import { DigitRoll } from '@/components/common';
export default {
  data() {
    return {
      isInit: true,
      total1: 0,
      total2: 0,
      guData: {}, // 网格员,
      ecData: {}, //  溯源设备配置
      state: [{
        name: '可调派',
        code: 'canAssign',
      },{
        name: '任务中',
        code: 'tasking',
      },{
        name: '未在线',
        code: 'offline',
      }],
      setTimeout1: null,
      maxLen: 2,
    }
  },
  props: {
    sourceData: Object
  },

  mounted() {
    this.setData()
    this.isInit = false
  },
  methods: {
    setData() {
      if(_.isEmpty(this.sourceData)) {
        return
      }
      this.guData = this.sourceData.person
      this.ecData = this.sourceData.device
      this.total1 = this.guData.all
      this.total2 = this.ecData.all
      let totals = [this.total1, this.total2]
      // 计算最大值的长度
      let max = Math.max(...totals)
      if(max < 10) {
        return
      }
      this.maxLen = String(max).length
    },
 

    calcWidth(value, total) {
      let val = value / total > 1 ? 1 * 100 : value / total * 100
      if(isNaN(val)) {
        val = 0
      }
      return val
    },
  },
  watch: {
    'sourceData':  'setData'
  }
  
}
</script>
