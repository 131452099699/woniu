import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入httpApis
import httpApis from "./http/index";
// 在vue原型链上绑定一个属性为$http  在任何一个页面用this.$http引用就可以拿到httpApis
Vue.prototype.$http=httpApis

//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
Vue.use(ElementUI);

// 设置JScode安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "77a7270587ac5da6f61f5c0ddd39504b",
};



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
