/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-30 16:22:42 
 * @Email: 991034150@qq.com 
 * @Description: 网格员及溯源设备配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 16:47:01
 */


 
export default {
  url: '/integratedPlatform/getGridUserAndDeviceData',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result":{
      "person": {
        "all": 396,
        "canAssign": 27,
        "tasking": 318,
        "offline": 51,
      },
      "device": {
        "all": 80,
        "canAssign": 0,
        "tasking": 80,
        "offline": 0,
      }
    }
  }
}