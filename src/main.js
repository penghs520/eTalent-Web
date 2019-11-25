import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui';
import Print from 'vue-print-nb';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import '@/assets/css/theme/element.scss'
import '@/assets/icon/iconfont.css'


// 处理element-ui路由，点击已经打开的路由报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
Vue.config.devtools = true;//允许使用调试工具

Vue.use(ElementUI);
Vue.use(Print);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
