/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-28 17:07:53
 */

import Vue from 'vue'
import Router from 'vue-router'
// 注册Router
Vue.use(Router)
// 配置项
import config from '@/config/base.config'
// 登录
const Login = () => import('@/containers/login/index.vue')
// 首页
import Home from '@/containers/home/index.vue'
// 详情
import Detail from '@/containers/home/detail.vue'

const routes = [
  {
    path: '*',
    redirect: `${config.routerPath}/home`,
    component: Home // 首页
  },{
    path:`${config.routerPath}/login`, // 登录
    name: '登录',
    components: {
      login: Login
    }
  },{
    path: `${config.routerPath}/home`,
    name: '首页',
    component: Home
  },{
    path: `${config.routerPath}/detail`,
    name: ' 详情',
    component: Detail
  }
]

export default new Router({
  mode: 'history',
  routes
})
