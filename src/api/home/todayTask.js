/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-30 15:46:43 
 * @Email: 991034150@qq.com 
 * @Description: 今日任务
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 14:20:15
 */


export default {
  url: '/integratedPlatform/findTodayTaskCount',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result": {
      "count": 339,  //今日任务
      "notStartCount": 2, //未开始任务
      "startCount": 318,   //进行中任务
      "completeCount": 19   //完成任务
    }
  }
}
