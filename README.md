## shop-vue移动端商城APP

### 项目概要

* 本项目用到的技术栈： vue-cli + vue-router + vuex + axios + vue-axios + vant( UI )

* 如何在本地运行本项目

```js

    git clone git@github.com:qiuChengleiy/shop-vue.git
    cd shop-vue
    npm i 或 cnpm i      //安装项目依赖 建议使用淘宝镜像源 cnpm 安装 具体参考官网cnpm.taobao.org
    npm run dev   //运行项目服务  在浏览器：localhost:8080/   查看

```

* 如果运行不成功请查看是否缺少配置文件 比如.babelrc或者尝试用vue-cli初始化一个vue项目再将本项目移植进去

* [项目地址](https://github.com/qiuChengleiy/shop-vue)

* [效果查看 项目截图部分](./desc.md)

* [真机体验 APK（限安卓)](https://bdpkg.aliyun.dcloud.net.cn/20180623/4f272620-76e4-11e8-ac02-2ddfe5afa4dc/Pandora.apk?OSSAccessKeyId=Zo5iOEuapwrloQIL&Expires=1529758626&Signature=1TZwtDFnd8e%2B9O1xMvsjlggf5ew%3D)

* 真机体验可能会带来不流畅卡顿等现象 建议使用Chrome浏览器体验

* 本项目用到的素材图片均来自唯品会网，仅学习使用，如果有问题请联系我删除 ^_^

### 项目文档说明

#### 项目结构

``` sh
├── build/ # 项目打包配置文件 vue-cli 初始化的文件
├── node_modules/ #模块文件
├── config/ #配置文件 vue-cli 初始化的配置
├── dist/  #打包后的文件存放目录
├── src/ #项目入口目录
    ├── assets/   #前端资源目录
        ├── css/ # 样式表目录/less文件存放目录
    ├── components/   # vue组件目录/.vue文件存放目录
        ├── about.vue  # 项目介绍组件
        ├── active.vue # 活动版块组件
        ├── buyInfo.vue  # 购买信息组件
        ├── community.vue  # 社区组件
        ├── goodsInfo.vue # 商品信息组件
        ├── home.vue  # 首页组件
        ├── login.vue # 登录注册组件
        ├── me.vue  # 用户组件
        ├── news.vue  # 社区文章信息组件
        ├── orderList.vue  # 订单列表组件
        ├── orderPay.vue  # 订单支付组件
        ├── search.vue  # 搜索版块组件
        ├── shoppingCart.vue  # 购物车组件
        ├── swiper.vue  # 轮播公用组件
    ├── router/  # vue路由管理目录 
        ├── index.js # 路由主文件
    ├── store/ # vuex状态管理目录
        ├── Core_store/  # store对象目录
           ├── active.js  # 活动页的状态管理
           ├── community.js # 社区的状态管理
           ├── home.js  # 主页状态管理
        ├── index.js # 状态管理入口主文件
    ├── App.vue # 项目根组件
    ├── main.js # 项目入口文件

├── static/ #静态文件存放目录
    ├── images/   # 图片资源
    ├── data.json   # mock数据 
├── test/ #测试目录
├── package.json #包文件信息
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .postcsssrc.js
├── index.html
├── README.md
├── vue-shop.apk
  

```

#### 功能简单介绍

##### main.js 项目入口文件

* 在主文件中，把所需要的模块加进来，vant的框架因为第一次用，所以也不知道具体加啥组件，所以索性都编译进去了~  这也导致了编译的速度有点稍慢

* 状态方面也对它做了简单的封装  /store/

```js
//导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//axios
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

```

#### 路由管理

* 在这里把需要跳转的组件都加进来，配合vue-router使用，因为业务逻辑不是很复杂，所以这里没有用子路由跳转,都是简单的路由处理

* 在js中控制路由跳转：
```js
this.$router.push(url);
```


```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Search from '@/components/search'
import  GoodsInfo from '@/components/goodsInfo'
import Buy from '@/components/buyInfo'
import Pay from '@/components/orderPay'
import Community from '@/components/community'
import ShopingCart from '@/components/shoppingCart'
import Me from '@/components/me'
import Login from '@/components/login'
import About from '@/components/about'

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
      path:'/community',
      name:'community',
      component:Community,
    },
    {
      path:'/shoppingCart',
      name:'shoppingCart',
      component:ShopingCart,
    },
    {
      path:'/me',
      name:'Me',
      component:Me,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/register',
      name:'register',
      component:Login,
    },
    {
      path:'/about',
      name:'aboutMe',
      component:About,
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})

```

#### 状态管理

* 对口处进行了简单的封装 方便后续管理
* 其他部分文件导出均是各模块所需的对象 
* 在组件中引入即可

```js

import { mapState,mapActions,mapGetters } from 'vuex';

computed: {
    ...mapState({
      title: state => state.home.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
    }),
    ...mapGetters(['bc_notshow','search_show']),
  },
  methods: {
    ...mapActions([
      'searchA'
    ]),

```



```js

//index.js

import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

//引入store对象
import home from './Core_store/home';
import active from './Core_store/active';
import community from './Core_store/community';

export default new vuex.Store({
    modules: {
        home: home,
        active:active,
        community:community,
    }
})



// home.js


export default {
    state:{    
        tab:{
            title:['','今日推荐','时尚','美妆','家电','家居','国际','生活'],
        },
        badge:{
            icon:['icon_1','icon_2','icon_8','icon_4','icon_5','icon_6','icon_7','icon_10'],
            title:['鞋包馆','运动馆','母婴馆','超市','女装馆','美妆馆','男装馆','更多'],
        },
        imageList:[],
        broadcast:[],
        bc:true,
        show:true,
        sshow:false,
        shop_info:4,
        my_info:2,
        buyInfo:{
            img:[],
        },
        orderShow:false,
        numO:null,
    },
    mutations: {
        search_(state) {
            state.show = false;
        },
        buySearch(state,img) {
            state.buyInfo.img[0] = img;
            console.log(state.buyInfo.img);
        },
        orderShow_(state) {
            state.orderShow ? state.orderShow = false : state.orderShow = true;
            setTimeout(() => {
                state.orderShow = false;
              }, 22000);
        },
        addNum(state,e) {
            state.numO = e;
            console.log(e);
        },
        shopCartInfo(state) {
            console.log(state.shop_info);
            state.shop_info+=4;
        }
    },
    actions: {
       searchA(context,e) {
           context.commit('search_');
          
       },
       buyParam(context,img) {
           context.commit('buySearch',img);
       },
       orderShows(context) {
           context.commit('orderShow_');
       },
       orderNum(context,e) {
         context.commit('addNum',e);
       },
       infoAction(context) {
            context.commit('shopCartInfo');
       }
    },
    getters: {
        bc_notshow(state){
            setTimeout(() => {
              state.bc = false;
            }, 20000);
            return state.bc;
        },
       
    }
}

```

#### 组件

* 在写组件的过程中遇到的一些问题：

```js
// 1. 当使用ui组件时 部分样式无法直接在css中更改，解决办法： 通过自定义指令，调用原生方法用JS重写样式，将指令绑定到相应的组件上
// 2. 在开发过程中，很多部分都是一样的，所以编写可复用的组件很重要， 比如轮播 懒加载图片
// 3. 随着功能的增多，组件的体积也变得庞大，冗余的代码有点多
// 4. 组件之间的状态要更多的互通性，使得各组件互相关联起来
// 5. 在向后台发起请求时 对组件进行数据渲染时，判断难免会多，当相同的判断时用switch 比 if 会更加舒服一点 
```
* 组件相关的开发，具体到/components/里查看


#### mock数据

* 简单模拟了一下数据,因为懒得去切图了，所以直接用的图片地址，而且也更加方便测试

```json
{
    "home":{
        "lunbo":{
            "home":[ 
                    "https://a2.vimage1.com/upload/flow/2018/06/12/50/15287856410421.jpg",
                    "https://a3.vimage1.com/upload/flow/2018/06/06/29/15282588215380.jpg",
                    "https://a2.vimage1.com/upload/flow/2018/06/11/129/15287110698394.jpg",
                    "https://a3.vimage1.com/upload/flow/2018/06/11/79/15286841592012.jpg"
                ],
            "meizhuang":[
                "https://a3.vimage1.com/upload/flow/2018/06/11/123/15287145413911.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/12/104/15287681714987.jpg",
                "https://a3.vimage1.com/upload/flow/2018/06/12/77/15287678981404.jpg"
            ],
            "jiadian":[
                "https://a3.vimage1.com/upload/flow/2018/06/12/65/15287673095242.jpg",
                "https://a3.vimage1.com/upload/flow/2018/06/11/169/15287297288138.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/11/78/15287120642222.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/08/161/15284659187259.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/08/119/15284419569224.jpg"
            ],
            "jiaju":[
                "https://a2.vimage1.com/upload/flow/2018/06/11/151/15287113456414.jpg",
                "https://a3.vimage1.com/upload/flow/2018/06/11/137/15287118337181.jpg",
                "https://a4.vimage1.com/upload/flow/2018/06/12/83/15287340857050.jpg",
                "https://a3.vimage1.com/upload/flow/2018/06/11/190/15287119563873.jpg"
            ],
            "guoji":[
                "https://a4.vimage1.com/upload/flow/2018/03/09/186/15205868083347.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/08/123/15284718303958.jpg"
            ],
            "shenghuo":[
                "https://a2.vimage1.com/upload/flow/2018/06/11/100/15287234758123.jpg",
                "https://a2.vimage1.com/upload/flow/2018/06/12/105/15287757783356.jpg",
                "https://a4.vimage1.com/upload/flow/2018/06/11/85/15287233692932.jpg"
            ]

        },
        "imageList":[
            "https://a3.vimage1.com/upload/flow/2018/06/11/194/15286863014296.jpg",
            "https://a.vimage1.com/upcb/2018/06/11/120/ias_152869995885967_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/11/115/ias_152870605995543_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/06/144/ias_152825513726419_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/08/51/ias_152842946434501_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/12/137/ias_152878266391137_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/06/67/ias_152827678595317_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/08/109/ias_152845118539325_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/06/92/ias_152827324042112_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/12/123/ias_152877345994463_604x290_80.jpg"
        ],
        "shishangImglist":[
            "https://b.vimage1.com/upload/mst/2018/06/11/48/71e35131673e743e0ec9079dca1ced73_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/05/30/102/d23b59694ad34bb00dbe8178bad13f77_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/12/121/18fd0f7347a63950fbe3aca8183da448_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/11/41/ias_152869536334678_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/08/88/ias_152844371626949_604x290_80.jpg",
            "https://a3.vimage1.com/upload/flow/2018/06/12/131/15287706240279.jpg",
            "https://a.vimage1.com/upcb/2018/05/31/146/ias_152773404529400_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/10/88/980541d3f3f1296b5452171873cd975b_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/07/99/cc7152ad509339bc5f0dfc84b25cdb65_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/10/12/cea85a7b12a8df861088425200b43b1e_604x290_80.jpg"
        ],
        "meizhuangImglist":[
            "https://b.vimage1.com/upload/mst/2018/06/11/53/0bb659b137130f45de936fce60f99431_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/12/30/bfc7291561078ad05047d275cfddfca7_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/39/ias_152837250337311_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/02/174/ias_152791504299532_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/04/172/ias_152808517547013_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/06/9/ias_152825409267894_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/02/09/77/ias_151814376124213_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/09/106/ias_152585776124735_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/12/137/ias_152878266391137_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/04/12/22/ias_152351476783062_604x290_80.jpg"
        ],
        "jiadianImglist":[
            "https://b.vimage1.com/upload/mst/2018/06/11/128/991614fa794aa1809627c300e05a8767_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/11/161/b9bc72faac0e8cc0f8a557221b31bc9d_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/17/ias_152836114644876_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/02/02/165/ias_151754855585473_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/53/ias_152836466385103_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/10/153/ias_152591865270589_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/155/ias_152836765612517_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/16/130/ias_152646048078501_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/18/169/ias_152663431694211_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/05/176/ias_152816254162219_604x290_80.jpg"
        ],
        "jiajuImglist":[
            "https://b.vimage1.com/upload/mst/2018/06/08/0/cbd1732180e834a27b8874a4e69f66b4_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/07/23/0869529ca3761386b0e9130b3c1f5a2e_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/05/15/3e870b33cec90e43d63d0fb9cc579098_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/05/119/ias_152820199998884_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/07/123/74ce5a3e4e88972470d78414d10345fe_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/09/178/ias_152851554068030_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2017/08/15/76/ias_150278253968565_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/11/21/ias_152602611864772_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/02/09/142/ias_151814287717429_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/28/ias_152835216343248_604x290_80.jpg"
        ],
        "guojiImglist":[
            "https://b.vimage1.com/upload/mst/2018/06/11/143/002d5f9a2948e6aed66c1afd97ddc47c_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/08/90/f50425f591d46d32732d83397edf6012_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/01/31/55/ias_151737470529280_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/01/31/69/ias_151737515244688_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/24/46/ias_152714751025939_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/11/171/ias_152602721897866_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/04/10/87/ias_152334067320117_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/02/27/19/ias_151971744197878_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/11/115/ias_152868514634331_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/05/14/94/3ee39731e9b34c63872bbf2bf4b8dc28_604x290_80.gif"
        ],
        "shenghuoImglist":[
            "https://a.vimage1.com/upcb/2018/05/10/178/ias_152593779756191_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/24/42/ias_152715382693755_604x290_80.jpg",
            "https://b.vimage1.com/upload/mst/2018/06/05/49/dc369f96734691b316bb6126f2f3c3b3_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/07/174/ias_152835318617869_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/06/12/184/ias_152877000079292_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/10/72/ias_152592429461132_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/04/27/32/ias_152482888135847_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/11/67/ias_152602436411366_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/02/26/152/ias_151961860066199_604x290_80.jpg",
            "https://a.vimage1.com/upcb/2018/05/14/185/ias_152626794854550_604x290_80.jpg"
        ],
        "broadcast":["forge商城移动端app1.0版本正式发布 欢迎来体验 ^_^ pc端响应式站点即将将上线~~~ 欢迎来戳 作者QQ:1421546334 Email:qcl9701s666@163.com Github:https://github.com/qiuChengleiy"],
        "active":{
            "tuijian_title":["新人专享","8折起 春夏新品官方店","0.5折起 朗姿集团女装专场","3折起 耐克Nike男女运动专场","1.4折起 170元组合红包-真美诗","3.1折起 欧莱雅Loreal化妆品专场","1.2折起 原创艺术专场-富安娜集团","0.9折起简狐女装年轻妈妈装","2.2折起 潮牌-芬克鲨鱼FinkShark女装","2.1折起 妖精的口袋ELFSACK女装专场"],
            "shishang_title":["时尚风暴","1件8.5折-仙潮女装","时尚风暴 仙潮女装","0.7折起 雅莹家族旗下品牌女装专场","6.1折起 法国贝德玛洁颜护肤专场","1折起 阿莱蒂尔女装专场","2.1折起 百丽男女鞋专场","时尚风暴-潮尚鞋包","时尚风暴-时髦男装","时尚风暴-童装童鞋"],
            "meizhuang_title":["世界杯High购节-美妆个护","美妆热卖推荐","5.1折起 雅诗兰黛化妆品","1.6折起 丸美MARUBI护肤专场","4.1折起 The History of Whoo专场","4.1折起 玛丽黛佳彩妆专场","2.3折起 自然堂CHANDO化妆品专场","4.1折起 玉兰油Olay护肤专场","3.1折起 欧莱雅Loreal化妆品专场","6.5折起 SK-ll化妆品专场"],
            "jiadian_title":["612粽香端午节-小家电","612粽香父亲节-一级数码开售","2.3折起 艾美特电风扇","3.3折起 欧乐口腔护理专场","2.2折起 苏泊尔电器专场","8.7折起 小米智能酷玩专场","1.7折起 美的厨电专场","1.7折起 科斯沃扫地机器人专场","8.2折起 BEATS时尚耳机专场","3折起 松下panasonic个人护理专场"],
            "jiaju_title":["父亲节 一起爱爸!","世界杯High购节-家居家纺","超级预付-家居家纺","1.5折起 限时特惠","616 年中尖货购","2.5折起 H&3收纳日用专场","3.7折起 日本TIGER虎牌保温杯专场","3.3折起 洁柔纸品直降专场","2.7折起 宝家洁 清洁用品专场","2.2折起 父爱如荫-博洋特惠家纺专场"],
            "guoji_title":["安瓶助'仙'","国际616盛夏狂欢","4.3折起 日本Moony尤尼佳婴","3.5折起 日本花妆婴儿","3.7折起 日本澳洲Swisess天然营养膳食专场","5.7折起 阿迪达斯经典休闲鞋","9折起 韩国宫廷化妆品专场","6.3折起 韩国时尚女装专场","国际616盛夏狂欢-澳洲专场","韩国风尚"],
            "shenghuo_title":["0.7折起 良品铺子休闲零食专场","1.6折起 三只松鼠零食专场","616预付-生活超市","1.7折起 八马茗茶专场","2.2折起 百草味休闲零食专场","1.8折起 拉菲美酒专场","3.1折起 汤臣倍保健食品专场","2.2折起 新牧歌牛肉干食品专场","9.4折起 伊利牛奶专场","2.8折起 泸州老窖美酒专场"],
            "days":["2","2","3","1","2","1","3","1","2","1"]
        }
    },
    "goods":{
        "id_0":{
            "title":[
                ["耐克Nike AIR ZOOM PEGASUS 34 男款跑鞋","耐克Nike TESSEN 女款运动鞋","耐克Nike WMNS NIKE COURT ROYALE 女款运动板鞋","耐克Nike 弹力透气 中性款袜子 三对装"],
                ["耐克Nike CLASSIC CORTEZ LEATHER 女款运动鞋","耐克Nike 舒爽快干 男款运动短裤","耐克Nike 排汗纯棉 男款短袖T恤","耐克Nike TANJUN 男款运动鞋"]
            ],
            "description":["耐克运动跑鞋","耐克女款运动鞋","耐克运动女款板鞋","耐克弹力透气 中性款"],
            "shops":["森马官方旗舰店","耐克官方旗舰店","亚马逊官方旗舰店","韩国潮流官方旗舰店"],
            "limit_price":[
                ["509","483","399","49"],
                ["615","159","175","419"]
            ],
            "original_price": [
                ["899","549","499","99"],
                ["699","349","149","499"]
            ],
            "discount":[
                ["5.7","8.8","8","4.9"],
                ["8.8","4.6","8.8","8.4"]
            ],
            "imgList": [
                [
                    "https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg",
                    "https://a2.vimage1.com/upload/merchandise/pdc/078/211/358093934211078/0/AA2172-601-5_218x274_70.jpg",
                    "https://a4.vimage1.com/upload/merchandise/pdc/708/957/442273793580957708/0/749867-112-5_218x274_70.jpg",
                    "https://a4.vimage1.com/upload/merchandise/pdc/104/287/298158490090287104/0/SX4703-001-5_218x274_70.jpg"
                ],
                [
                    "https://a2.vimage1.com/upload/merchandise/pdc/676/982/100563133647982676/0/807471-103-5_218x274_70.jpg",
                    "https://a4.vimage1.com/upload/merchandise/pdc/028/969/246648548803969028/2/833371-457-5_218x274_70.jpg",
                    "https://a4.vimage1.com/upload/merchandise/pdc/161/684/19498258958684161/0/343880-090-5_218x274_70.jpg",
                    "https://a4.vimage1.com/upload/merchandise/pdc/979/954/7584701095096954979/3/812654-011-5_218x274_70.jpg"
                ]
            ],
            "moreImg":[
                "https://a.vimage1.com/upload/merchandise/pdcvop/00605599/10000630/1534671224-217938183647330340-1_720x909_70.jpg",
                "https://a.vimage1.com/upload/merchandise/pdcvop/00605599/10000630/1534671224-217938183647330340-2_720x909_70.jpg",
                "https://a.vimage1.com/upload/merchandise/pdcvop/00605599/10000630/1534671224-217938183647330340-3_720x909_70.jpg"
            ]
        }
    },
    "community":{
        "author":["A.B.C","明天的早晨","周游世界","世界杯112","我最帅哇<(*￣▽￣*)/","HY.O","时尚达人ol","天王之王","大道至简","天地之灵"],
        "watch":["602","1008","54","104","2万+","669","200","440","2060","2099"],
        "grefContent":[
            "随着服装款式设计、创作、流行的多样化，服装行业款式丰富度和以前不可同日而语。这给行业二级品类划分，和商家类目选择都带来一定的影响，根据目前春夏季类目划分里，几个比较有争议的...",
            "很多朋友对于淘宝购物的看法都意见不一，有买家说淘宝假货横行，稍不小心就可能购买到假货，也有买家说淘宝购物便宜实惠，未曾遇到过被骗或买到假货的情况。到底淘宝怎么样，应该怎...",
            "其次，如果遇到价格相对高一点的商品，自己又不敢确定的，最好问问周围的朋友或相对有经验的买家，很多时候，是要一点经验才能淘到货真价实的产品的。要记住，商人都非常精明，亏本生意...",
            "再次，看信誉。除了信誉，更重要的是要看看其他买家的购买评价，有不少买家还是很热心的对自己的购买到的商品进行中肯评价的。不过各位淘友要注意，现在很多淘宝卖家利用刷手刷店铺信...",
            "个人的经验是皇冠以上的卖家不论是商品质量还是服务、售后上都会比较有保障的，因为这部分卖家有一定的业务量，服务上做得比较好。还有就是一钻以下买家，由于新店需要销量升排名，因此...",
            "再看看店家是否已经加入消费者保障协会，但凡加入的店铺，如果你购买的东西发生状况的时候，才好索赔。（当然，最好不要发生状况，因为退货索赔毕竟是件很麻烦的事情。）现在许多淘宝导...",
            "我自己也是做淘宝的，在我看来，买家的购物感受对我们很重要。所以我们在宝贝质量和物流方面跟得很紧。特别是现在的物流，无论我是买家还是卖家我都不满意，所以各位淘友在这方面不要给...",
            "真实的事情。在繁荣和商人聊天,问是否正品,这是非常重要的。 返现网淘宝返还网有很多是灰色,香港、台湾版本不是真实的东西。如果你想买真正的东西,你应该说:“要求退款”不是真实的事情,返现...",
            "别人不能太低的目标,因为每一个老买家谈判,协商学习很多,我将细节:1想买你假装无所谓。2说话太快,让卖方猜你可能买没关系。返现网哪个最好三个应该讲礼貌,善良,给卖家一个好印象,这样他可...",
            "不读商店信用是非常重要的。现在刷信誉方面,服务是最重要的。淘宝返现网官网店主服务好,你几美元是一件好事,不管以后货物如果你有任何问题,售后服务或选择好商店。是没有用的可信度。有很..."
        ],
        "content":[
            "随着服装款式设计、创作、流行的多样化，服装行业款式丰富度和以前不可同日而语。这给行业二级品类划分，和商家类目选择都带来一定的影响，根据目前春夏季类目划分里，几个比较有争议性的案列，已经整理，需要大家达成定义的共识，避免类目混乱",
            "很多朋友对于淘宝购物的看法都意见不一，有买家说淘宝假货横行，稍不小心就可能购买到假货，也有买家说淘宝购物便宜实惠，未曾遇到过被骗或买到假货的情况。到底淘宝怎么样，应该怎样才能避免被骗呢？下面让我们一起来分享一下一位一皇冠淘宝买家的淘宝购物心得吧",
            "其次，如果遇到价格相对高一点的商品，自己又不敢确定的，最好问问周围的朋友或相对有经验的买家，很多时候，是要一点经验才能淘到货真价实的产品的。要记住，商人都非常精明，亏本生意他们是绝对不会做的",
            "再次，看信誉。除了信誉，更重要的是要看看其他买家的购买评价，有不少买家还是很热心的对自己的购买到的商品进行中肯评价的。不过各位淘友要注意，现在很多淘宝卖家利用刷手刷店铺信誉，所以一定要看清楚评论内容，内容简单随便的反而是真实的，相反一定是假的",
            "个人的经验是皇冠以上的卖家不论是商品质量还是服务、售后上都会比较有保障的，因为这部分卖家有一定的业务量，服务上做得比较好。还有就是一钻以下买家，由于新店需要销量升排名，因此对货品的质量也会有更高的要求，价格也比较真实和实惠",
            "再看看店家是否已经加入消费者保障协会，但凡加入的店铺，如果你购买的东西发生状况的时候，才好索赔。（当然，最好不要发生状况，因为退货索赔毕竟是件很麻烦的事情。）现在许多淘宝导购网的店铺推荐可以参考下",
            "我自己也是做淘宝的，在我看来，买家的购物感受对我们很重要。所以我们在宝贝质量和物流方面跟得很紧。特别是现在的物流，无论我是买家还是卖家我都不满意，所以各位淘友在这方面不要给卖家太高要求，毕竟这块儿我们卖家也没办法",
            "真实的事情。在繁荣和商人聊天,问是否正品,这是非常重要的。 返现网淘宝返还网有很多是灰色,香港、台湾版本不是真实的东西。如果你想买真正的东西,你应该说:“要求退款”不是真实的事情。返现网哪个最好",
            "别人不能太低的目标,因为每一个老买家谈判,协商学习很多,我将细节:1想买你假装无所谓。2说话太快,让卖方猜你可能买没关系。返现网哪个最好三个应该讲礼貌,善良,给卖家一个好印象,这样他可以给你最低的价格。4必须说会介绍很多朋友惠顾。 52返现网 5个中的口才,你在这里购物市场的会知道如何玩一样",
            "不读商店信用是非常重要的。现在刷信誉方面,服务是最重要的。淘宝返现网官网店主服务好,你几美元是一件好事,不管以后货物如果你有任何问题,售后服务或选择好商店。是没有用的可信度。有很多新店服务5钻。返现网哪个最好 因为刚开店,都想做得更好,在优质售后非常严重。加上新生意不好做,当然更多的感激你的支持。返现网哪个最好"
        ]

    }
    
}


```

### 总结

* 这是我学vue做的第一个综合性的项目，整个过程耗时差不多20天左右吧,由于平时还有课程作业(大三)要做,都是挤着周末做的o(╥﹏╥)o以后继续完善这个项目

* 在做的过程中遇到了很多问题，所以收获了不少经验，再接再厉 ^_^

* 一句话总结自己： 继续踩坑

#### 始终坚信

敢于尝试的你 其实已经进步了 ^_^






















