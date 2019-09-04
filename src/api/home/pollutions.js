/*
 * @Author: zhanghongqiao 
 * @Date: 2018-12-04 14:07:01 
 * @Email: 991034150@qq.com 
 * @Description: 污染源
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-11 09:44:33
 */


export default {
  url: '/integratedPlatform/pollutions',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result": [
      {
        "addr": "北京市朝阳区麦子店街道京信大厦停车场京信大厦停车场京",
        "equipmentDTO": "设备数据",
        "equipmentId": "设备编号",
        "fullName": "用户名称",
        "lat":"35.44606771332656",
			  "lng":"116.5687465877831",
        "status": "0",
        "taskCode": "任务编号",
        "taskName": "任务名称",
        "timeSubsection": "操作时间记录",
        "userId": "用户id"
      }
    ]
  }
}