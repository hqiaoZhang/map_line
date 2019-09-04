/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:22:20
 * @Email: 991034150@qq.com
 * @Description: 所有mock 出口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-29 15:53:24
 */
// 公用数据
import * as commonMock from './common'
// 首页
import * as homeMock from './home'

export default {
  ...commonMock,
  ...homeMock,
}
