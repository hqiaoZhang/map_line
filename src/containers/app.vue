/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 18:27:03
* @Description: 应用程序模板入口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-10 10:18:16
*/

<template>
  <div id="app">
    <!-- 未登录状态 -->
    <template v-if="logged">
      <router-view name="login" />
    </template>
    <!-- 登录成功 -->
    <template v-else>
      <TopMenu
        :userName="userName"
        :logout="logout"
        :requestChangePwd="requestChangePwd"
        :menuList="menuList"
        :topActiveId="topActiveId"
        :cityName="cityName"
        :areaList="areaList"/>
      <!-- 路由跳转部分 -->
      <router-view class="router_container"></router-view>
    </template>
     <!-- <Footer /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetch } from "@/util/request";
import config from "@/config/base.config";
import { setCookie, messagePopup } from "@/util/util";
import TopMenu from '@/components/common/menus/topMenu/index'
// import { Footer } from '@/components/common'
export default {
  data() {
    return {
      loading: "" // 退出中
    };
  },
  computed: mapGetters({
    logged: 'logged',  // 登录状态
    menuList: 'menuList', // 顶部菜单导航
    areaList: 'areaList', // 地区列表
    userId: 'userId', // 用户id
    userName: 'userName',
    cityName: 'cityName',
    topActiveId: 'topActiveId', // 当导航菜单导航状态
  }),
  components: {
    TopMenu,
    // Footer
  },
  mounted() {
    // 未登录跳转到登录页
    if (this.logged) {
      this.$router.push(`${config.routerPath}/login`);
    }
    // 判断是否输入了login页面
    let href = window.location.href;
    let isLogin = href.indexOf(`${config.routerPath}/login`);
    if (isLogin !== -1) {
      this.setLoginState();
    }
    if (_.isEmpty(this.userId)) {
      return;
    }
    // 数据请求
    this.requestData()
  },
  methods: {
    requestData() {
      // 为true是未登录
      if (this.logged) {
        return
      }
      // 获取顶部菜单数据数据
      this.$store.dispatch('topMenuRequest', {userId: this.userId})
      // 获取头部右边地区列表数据
      this.$store.dispatch('areaListRequest')
    },
    /*
       * 退出
       */
    logout() {
      //  退出中提示信息
      this.loading = this.$loading({
        text: "正在退出",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.3)"
      });
      this.setLoginState(1);
    },
    /**
     * 修改密码请求
     * @Object pramas 请求参数
     */
    requestChangePwd(pramas) {
      let self = this
      fetch('fetchChangePwd', pramas, (data) => {
        if(data.erroCode == 2000) {
          messagePopup(this, '密码修改成功', 'success')
          self.setLoginState()
          return true
        }else {
          messagePopup(this, data.erroMsg, 'error')
          return false
        }
      })
    },
    /**
     * 设置登录状态
     * @Nubmer type 调用类型1,是直接退出登录，2是修改密码后退出
     */
    setLoginState(type) {
      type === 1 ? this.loading.close() : ""; // 关闭弹窗
      // 修改登录状态
      this.$store.commit("setLoginState", true);
      // 链接跳转
      this.$router.push(`${config.routerPath}/login`);
      // 清空城市名
      setCookie("cityName", "");
      // 清空用户id
      setCookie("userId", "");
    },
  },
   watch: {
      // 监听登录状态
      'logged': function () {
        // 登录成功获取顶部导航菜单
        if(!this.logged) {
          this.requestData()
        }
      }
    }
};
</script>

 
