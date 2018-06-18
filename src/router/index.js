import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import  GoodsInfo from '@/components/goodsInfo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path:'/goods/:id',
        name:'goodsInfo',
        component:GoodsInfo,
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
