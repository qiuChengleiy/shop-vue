import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import  GoodsInfo from '@/components/goodsInfo'
import Buy from '@/components/buyInfo'
import Pay from '@/components/orderPay'

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
      path:'/goods/:id/buy',
      name:'buyInfo',
      component:Buy,
    },
    {
      path:'/goods/:id/buy/pay',
      name:'pay',
      component:Pay,
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
