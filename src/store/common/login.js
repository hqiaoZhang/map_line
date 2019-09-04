/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 15:54:54 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-12 15:44:02
 */
 
import { getCookie } from '@/util/util'
let userId = getCookie('userId')
let userName = getCookie('userName')
// const state = {
//   logged: false,
//   userId: userId,
//   cityId: Number(getCookie('cityId')),
//   cityName: decodeURI(getCookie('cityName')),
//   cityType: getCookie('cityType'),
//   userName: userName,
// }
const state = {
  logged: false,
  userId: '4028f481585db7d701585dc9f8a00018',
  cityId:  !Number(getCookie('cityId')) || 510000,
  cityName: !decodeURI(getCookie('cityName')) ||  '成都市',
  cityType: 2
}


// getters
const getters = {
  logged: state => state.logged,
  cityId: state => state.cityId,
  cityName: state => state.cityName,
  userId: state => state.userId,
  cityType: state => state.cityType,
  userName: state => state.userName
}
 
// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState (state, logged) {
    state.logged = logged
    mutations.setUserId(state, getCookie('userId'))
    mutations.setUserName(state, getCookie('userName'))
    mutations.setCityType(state, getCookie('cityType'))
  },
  
  /**
   * @description 设置地区信息(id,名称)
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setAreaInfo (state, city) {
    state.cityId = Number(city.id)
    state.cityName = city.domainName
  },
  /**
   * 设置用户id
   * @param state
   * @param userId
   */
  setUserId (state, userId) {
    state.userId = userId
  },

  /**
   * 设置用户名
   * @param state
   * @param userId
   */
  setUserName (state, userName) {
    state.userName = userName
  },
  /**
   * 设置城市类型
   * @param state
   * @param userId
   */
  setCityType (state, cityType) {
    state.cityType = cityType
  }
}

export default {
  state,
  getters,
  mutations
}
