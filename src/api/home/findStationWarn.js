/*
 * @Author: zhanghongqiao 
 * @Date: 2018-12-03 12:05:40 
 * @Email: 991034150@qq.com 
 * @Description: 微站警报信息
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 17:53:02
 */

const lng = [106.503536, 106.503581, 106.500515, 106.5065, 106.507978, 106.504586]
const lat = [29.532552, 29.530042, 29.536918, 29.541863, 29.539263, 29.538715]
const stationIds = ['001', '002', '003', '004', '005', '006']

export default {
  url: '/integratedPlatform/findStationWarnData',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode": 2000,
    "erroMsg": null,
    "result": [
      {
        "lat": "30.62078716146761",
        "lng": "104.15830117553475",
        "stationId": "80022",
        "stationName": "80022银河B",
        "surveyAbnormalDTOs": []
      },
      {
        "lat": "30.798792529159517",
        "lng": "103.93008337229492",
        "stationId": "80162",
        "stationName": "80162火炬城2",
        "surveyAbnormalDTOs": []
      },

      {
        "lat": "30.729749389216305",
        "lng": " 103.99392522945999",
        "stationId": "80128",
        "stationName": "80128嘉电D",
        "surveyAbnormalDTOs": []
      },
      {
        "lat": "30.611490714476744",
        "lng": "104.00058873385188",
        "stationId": "80128",
        "stationName": "80128嘉电D",
        "surveyAbnormalDTOs": []
      },
      {
        "lat": "30.743004106379367",
        "lng": "104.18008524700997",
        "stationId": "80128",
        "stationName": "80128嘉电D",
        "surveyAbnormalDTOs": []
      },
      {
        "lat": "30.653052033867343",
        "lng": "104.08852432206271",
        "stationId": "80128",
        "stationName": "80128嘉电D",
        "surveyAbnormalDTOs": []
      }
    ]
  }
}