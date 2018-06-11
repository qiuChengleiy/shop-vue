<template>
  <div id="app">
     <!-- 搜索区 -->
     <van-row gutter="20" class="row-1">
      <van-col span="3" class="cols">
        <a href="#">登录</a>
      </van-col>
      <van-col span="19" class="cols">
        <form action="/">
          <van-search
            class="search" 
            v-model="value"
            style="background:white;height:35px;border-radius:22px;"
            placeholder="大家在搜索：衣服"
            @keydown.enter.prevent="search"
          />
        </form>
      </van-col>
      <van-col span="2" class="cols">
        <van-icon name="qr" class="classfic"/>
      </van-col>
    </van-row>

    <!-- 标签区域 -->
    <van-row>
      <van-col span="24">
        <van-tabs v-model="active" swipeable v-tab>
          <van-tab v-for="index in 7" 
          :title="title[index]" 
          :key="index.id" 
          class="tab"
          >
            <!-- 今日推荐版块 -->
            <div v-if="title[index]== '今日推荐'" class="contain">
               <!-- 轮播 -->
                <swiper class="swiper" :tabs="title[index]" />
                  <van-row class="col-2">
                    <van-col class="row-2" span="6" v-for="(v,index) in icon" :key='v.id'>
                      <a href="#">
                        <img :src="path+'icon/'+icon[index]+'.png'" />
                        <span>{{bageTitle[index]}}</span>
                      </a>
                    </van-col>
                    <!-- 通知 -->
                 <van-col span="24" style="margin-top:20px;" v-show="bc_notshow">
                    <van-notice-bar
                        mode="link"
                        left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
                     >
                      {{broadcast[0]}}
                    </van-notice-bar>
                 </van-col>
                    <!--活动 标题 -->
                    <van-col span='24'>
                        <h4>{{actives[0]}}</h4>  
                     </van-col>
                  </van-row>
                <!-- 懒加载  瀑布流-->
            <lazy-component class="lazys"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="300"
            >
              <van-row v-for="(img,index) in imageList" :key='img.id' >
                <img  v-lazy="img" name="adapter" />
                <van-col span="16" offset="2" class="lazy-left">
                  <h4>{{activeTitle[index]}}</h4>
                </van-col>
                <van-col span="6" class="lazy-right">
                  <span>{{'剩余'+days[index]+'天'}}</span>
                </van-col>
               
              </van-row>
           </lazy-component>
     
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '时尚'" class="contain">
              <h1>时尚</h1>
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '美装'" class="contain">
              <h1>美装</h1>
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '家电'" class="contain">
              <h1>家电</h1>
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '家居'" class="contain">
              <h1>家居</h1>
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '国际'" class="contain">
              <h1>国际</h1>
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '生活'" class="contain">
              <h1>生活</h1>
            </div>
            




          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>

    <!-- tabBar -->
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item icon="pending-evaluate" dot>社区</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" info="5" v-infos="shop_info">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" info="2" v-infos="my_info">我的forge</van-tabbar-item>
      </van-tabbar>

  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Waterfall } from 'vant';
import Swiper from './swiper';

export default {
  name: 'home',
  components:{
    Swiper
  },
  data() {
    return {
        tabarActive:0,
        value:null,
        active:0,
        path:'../../static/images/',
        imageList:[],
        activeTitle:null,
        days:null,
        disabled:false,
        broadcast:null,
    }
  },
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
    }),
    ...mapGetters(['bc_notshow']),
  },
  methods: {
     search() {
       console.log(this.value)
     },
     // 瀑布流方法
     loadMore() {
      this.disabled = true;
       setTimeout(() => {
         for (let i = 0; i < 5; i++) {
            this.imageList.push(this.imageList[i]);
            this.activeTitle.push(this.activeTitle[i]);
            this.days.push(this.days[i]); 
        }
        this.disabled = false;
       }, 200);
    }
  },
  watch: {

  },
  directives: {
    //瀑布流
    WaterfallLower: Waterfall('lower'),
    tab:{
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = '#d34ba8';
      }
    },
    //tabBar 消息通知指令
    infos:{
      inserted(el,obj) {
         console.log(obj.value);
         const info = el.childNodes[0].childNodes[1];
         info.innerText = obj.value;
      }
    }

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
                const data = res.data.home;
                this.activeTitle = data.active.title.slice(0,3);
                this.days = data.active.days.slice(0,3);
                this.imageList = data.imageList.slice(0,3);
                this.broadcast = data.broadcast;
              //  console.log(res.data.home.active,this.days,this.activeTitle)
           } else {
             this.imageList = this.src;
             this.broadcast = "暂无消息~~QAQ~"
           }
            },(err)=>{
            this.imageList = this.src;
            this.broadcast = "暂无消息~~QAQ~"
    })

  },
  created() {
      console.log(this.bc_notshow)
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
</style>

