<template>
  <div id="app">
      <!-- 活动组件 -->
            <van-row class="col-2">
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
                <img  v-lazy="img" name="adapter" @click.stop="redirect('/goods/id_0')" />
                <van-col span="16" offset="2" class="lazy-left">
                  <h4 @click.stop="redirect('/goods/id_0')">{{activeTitle[index]}}</h4>
                </van-col>
                <van-col span="6" class="lazy-right">
                  <span>{{'剩余'+days[index]+'天'}}</span>
                </van-col>
               
              </van-row>
           </lazy-component>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Waterfall } from 'vant';

export default {
  name: 'active',
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
  props:{
    tabs:{
      type:String,
      required:true,
      default(){
        return {
            tabs:'errTitle'
        }
      }
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
         for (let i = 0; i < 10; i++) {
            this.imageList.push(this.imageList[i]);
            this.activeTitle.push(this.activeTitle[i]);
            this.days.push(this.days[i]); 
        }
        this.disabled = false;
       }, 200);
    },
    redirect(url){
          console.log(url);
           this.$router.push(url);
      },
  },
  watch: {

  },
  directives: {
    //瀑布流
    WaterfallLower: Waterfall('lower'),
  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
                const data = res.data.home;
                this.days = data.active.days
                switch(this.tabs){
                    case '今日推荐' :
                        this.activeTitle = data.active.tuijian_title;
                        this.imageList = data.imageList;
                      break;
                    case '时尚' :
                        this.activeTitle = data.active.shishang_title;
                        this.imageList = data.shishangImglist;
                      break;
                    case '美妆' :
                        this.activeTitle = data.active.meizhuang_title;
                        this.imageList = data.meizhuangImglist;
                      break;
                    case '家电' :
                        this.activeTitle = data.active.jiadian_title;
                        this.imageList = data.jiadianImglist;
                      break;
                    case '家居' :
                        this.activeTitle = data.active.jiaju_title;
                        this.imageList = data.jiajuImglist;
                      break;
                    case '国际' :
                        this.activeTitle = data.active.guoji_title;
                        this.imageList = data.guojiImglist;
                      break;
                    case '生活' :
                        this.activeTitle = data.active.shenghuo_title;
                        this.imageList = data.shenghuoImglist;
                      break;
                    default:
                        break; 
                }
            
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
     
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
</style>

