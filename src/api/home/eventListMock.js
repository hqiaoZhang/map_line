/*
 * @Author: 谢小英
 * @email: 634021337@qq.com
 * @Date: 2018-04-10 13:42:01
 * @Description: 地区列表数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 17:05:06
 */

export default {
  url: '/domain/getEventList',
  enableMock: true,
  mock: {
    "erroCode" : 2000,
    "erroMsg" : "获取事件列表成功",
    "result" : [ {
      id: '001',
      "time" : "2019/1/28 12:08",
      "name" : "曾洪",
      "title": "***烧烤",
      "content" :"作业正常，净化设备开启",
      "image": "/static/images/u1.png",
      "type": 1,
      "desc" : "现场有刚焚烧痕迹，垃圾焚烧后的细粉尘的垃圾焚烧灰烬灰也存在未覆盖现象。",
      "show" : false,
      "lat":"35.43929608376843",
      "lng":"116.56806054711342",
    }, {
      id: '002',
      "time" : "2019/1/28 11:53",
      "name" : "曾洪",
      "title": "***汽修厂",
      "content" : "微站西北80米存在汽修厂，作业正常，没居民院内存在焊接现场",
      "image": "/static/images/u2.png",
      "type": 1,
      "desc" : "现场有刚焚烧痕迹，垃圾焚烧后的细粉尘的垃圾焚烧灰烬灰也存在未覆盖现象。",
      "show" : false,
      "lat":"35.44651334872946",
      "lng":"116.57313047066327",
    }, {
      id: '003',
      "time" : "2019/1/28 11:27",
      "name" : "曾洪",
      "title": "居民院内存在焊接现场",
      "content" : "在微站西100米有一处居民院内存在焊机一台，存在修焊门窗现场，环保办工作人员现场下达了整改通知书，要求其停止生产。",
      "image": "/static/images/u3.png",
      "type": 2,
      "desc" : "在微站西100米有一处居民院内存在焊机一台，存在修焊门窗现场，环保办工作人员现场下达了整改通知书，要求其停止生产。",
      "show" : false,
      "lat":"30.62198628532725",
      "lng":"104.15881257032752",
    },{
      id: '004',
      "time" : "2019/1/28 11:05",
      "name" : "曾洪",
      "title": "建筑工地施工",
      "content" : "西南350米存在建筑工地施工，苫盖不彻",
      "image": "/static/images/u4.png",
      "type": 2,
      "desc" : "现场有刚焚烧痕迹，垃圾焚烧后的细粉尘的垃圾焚烧灰烬灰也存在未覆盖现象。",
      "show" : false,
      "lat":"30.62015537968894",
      "lng":"104.15949972157479",
    }]
  }
}
