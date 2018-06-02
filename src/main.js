//导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//ajax
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//状态管理
import vuex from 'vuex'
Vue.use(vuex);

//ui 框架
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

//懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

//瀑布流
import { Waterfall } from 'vant';
Vue.use(Waterfall);

import store from './store/index'

/* VUE实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
