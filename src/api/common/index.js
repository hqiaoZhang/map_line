/*
 * @Author: zhanghongqia
 * @email: 991034150@qq.com
 * @Date: 2018-06-07 21:41:42
 * @Description: 公用API出口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-10 21:23:46
 */

// 登录
import fetchLogin from './loginMock'
 // 菜单导航
import fetchTopMenu from './topMenuMock'
// 右边地区
import fetchAreaList from './areaListMock'
// 退出登录
import fetchLogout from './logoutMock'
// 密码修改
import fetchChangePwd from './changePwdMock'

export {
  fetchLogin,
  fetchTopMenu,
  fetchAreaList,
  fetchLogout,
  fetchChangePwd,
}
