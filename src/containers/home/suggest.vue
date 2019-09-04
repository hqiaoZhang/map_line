/*
 * @Author: zhanghongqiao 
 * @Date: 2019-04-12 09:29:38 
 * @Email: 991034150@qq.com 
 * @Description: 建议
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 13:05:19
 */

<style lang="scss" scoped>
.suggest {
  width: 100%;
  height: 364px;
  color: #fff;
  font-size: 12px;
  section {
    height: 308px;
    .weather {
      width: 432px;
       margin: 19px auto 16px auto;
       display: flex;
       div {
         width: 50%;
       }
       .left {
         height: 72px;
         background: url("./images/cloud.gif") no-repeat left center;
         background-size: 72px 72px;
         padding-left: 80px;
         p {
           &:nth-child(1) {
             font-size: 28px;
             margin-top: 4px;
           }
           &:nth-child(2) {
             font-size: 14px;
             
             margin: 6px 0 8px 0;
           }
           &:nth-child(3) {
             font-size: 12px;
             color: rgba(255,255,255,0.60);
           }
         }
       }
       .right {
         padding-left: 63px;
         p {
           line-height: 24px;
           padding-left: 30px;
           &:nth-child(1) {
             background: url("./images/home_temperature1.4x.png") no-repeat left center;
             background-size: 24px 24px;
           }
            &:nth-child(2) {
             background: url("./images/home_wind1.4x.png") no-repeat left center;
             background-size: 24px 24px;
           }
            &:nth-child(3) {
             background: url("./images/home_water1.4x.png") no-repeat left center;
             background-size: 24px 24px;
           }
         }
       }
    }
    .content {
      width: 432px;
        background: #1A2955;
        border-radius: 4px;
        padding: 12px;
        margin: 0 auto;
        font-size: 12px;
        color: #ADB2C0;
        letter-spacing: 0;
        text-align: justify;
        line-height: 20px;
        
    }
    p.ask {
      text-align: center;
      font-size: 14px;
      margin-top: 27px;
      height: 18px;
      line-height: 18px;
      &::before {
        content: "";
        width: 12px;
        height: 12px;
        background: url("./images/icons8-hint_red2x.png") no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
      }
    }
  }
  footer {
    height: 56px;
    text-align: center;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    line-height: 56px;
    button {
      width: 96px;
      height: 24px;
      line-height: 22px;
      background: #34A3FF;
      border: 1px solid #34A3FF;
      color: #fff;
      border-radius: 2px;
      &:last-child {
        background: none;
        border: 1px solid #ADB2C0;
        margin-left: 38px;
      }
    }
  }
}
</style>

<template>
 <!-- <el-dialog top="20vh" title="开发区6分析建议" width="480px" :visible.sync="dialogVisible"> -->
  <div class="suggest">
    <section>
      <div class="weather">
        <div class="left">
          <p>20℃</p>
          <p>晴转多云</p>
          <p>{{date}}&nbsp;&nbsp;{{week}}</p>
        </div>
        <div class="right">
          <p>12℃~20℃</p>
          <p>71%</p>
          <p>西北风二级</p>
        </div>
      </div>
      <div class="content">
        开发区6位于**区**镇**花园社区5号楼旁，经度：*****  纬度：****。
        站点近期于10:00-13:00时段，PM2.5频发报警。报警问题：PM2.5短时间飙升，浓度高于周边3km区域均值约30%。  <br/> <br/>
       
        结合气体监测数据，借鉴历史反馈内容，建议现场排查周边建筑工地施工、过往车辆等情况。重点排查站点西北方向。
      </div>
      <p class="ask">是否派遣网格员前往排查？</p>
    </section>
    <footer>
      <button @click="handleBtn(true)">派遣</button>
      <button @click="handleBtn(0)">取消</button>
    </footer>
  </div>
</template>

<script>
import { formatDate } from '@/util/dateUtil'
export default {
  
  data() {
    return {
       date: formatDate(new Date(), 'yyyy-MM-dd'),
       week: this.formmatWeek()
    }
  },
  model: {
    event: 'change'
  },
 
  methods: {
    formmatWeek() {
      let day = new Date().getDay()
          if (day == 1) {
            return '周一'
          }
          if (day == 2) {
            return '周二'
          }
          if (day == 3) {
            return '周三'
          }
          if (day == 4) {
            return '周四'
          }
          if (day == 5) {
            return '周五'
          }
          if (day == 6) {
            return '周六'
          }
          if (day == 0) {
            return '周日'
          }
    },
    handleBtn(status) {
      this.$emit('change', status)
    },
  },
}
</script>

