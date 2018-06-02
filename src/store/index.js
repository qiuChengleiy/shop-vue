import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

//引入store对象
import home from './Core_store/home.js';
import active from './Core_store/active.js';

export default new vuex.Store({
    modules: {
        home: home,
        active:active,
    }
})
