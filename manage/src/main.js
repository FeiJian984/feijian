import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import Login from "./views/Login"
import filters from "@/filters"
import components from "@/components"
//引入ui主库文件
import ElementUI from "element-ui"
//引入样式
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI);
Vue.use(filters);
Vue.use(components);

Vue.config.productionTip = false

//请求拦截
axios.interceptors.request.use(function(config){
  store.commit("CHANGE_ISLOADING",true);
  config.url="/ele"+config.url+(config.url.includes("?")?"&":"?")+"t="+Date.now();
  config.headers={
    authorization:store.state.admin.token  //将token加入到头部信息中，为了验证token是否有效
  }
  return config;
})

//响应拦截
axios.interceptors.response.use(function({data}){  //统一解构赋值，接收时直接用变量接收，不需再解构赋值，data为请求响应返回的数据
  store.commit("CHANGE_ISLOADING",false);
  if(data.ok===2){
    //异常或过期，退出登录
    store.commit("OUT_LOGIN");
  }else{  //正常
    if(data.pageIndex)
      //修改当前页与总页数，所有的模块分页都可使用
      store.commit("CHANGE_PAGE_INFO",data)
    return data;
  }
})

new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.admin.token?App:Login) }
}).$mount('#app')
