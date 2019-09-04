/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 14:32:03 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-11 10:28:46
 */

export default {
  url: '/login',
  // enableMock: true, // 是否使用本地假数据
  config: {
    method: 'POST',
    contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  },
  mock:{
    "erroCode":2000,
    "erroMsg":"登录成功！",
    "result":{
      "accessToken":"6ebf0832-7968-4ada-bbb5-abc525b353c1",
      "cityType":"2",
      "domainId":"370800",
      "domainName":"济宁市",
      "firstPage":"/airMonitoring/landingPage",
      "fullName":"admin",
      "parentDomainId":"370000",
      "userId":"4028f481585db7d701585dc9f8a00018",
      "userName":"admin"
    }
  }
}
