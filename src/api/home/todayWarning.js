/*
 * @Author: zhanghongqiao 
 * @Date: 2018-12-04 13:56:26 
 * @Email: 991034150@qq.com 
 * @Description: 今日报警情况
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-10 10:28:30
 */


export default {
  url: '/integratedPlatform/todayWarning',
  enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result": {
      "count": 30,  //今日报警
      "notStartCount": 6, //未处理 
      "startCount": 12,   //处理中 
      "completeCount": 12   //完成 
    }
  }
}