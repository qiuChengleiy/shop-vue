<template>
  <div id="app">
      <!-- 社区消息组件 -->
                <!-- 懒加载  瀑布流-->
            <lazy-component class="lazys"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="300"
            >

              <van-row v-for="(img,index) in imageList" :key='img.id' >  
             <!-- 头部信息 -->
                <van-row class="col-comm-1">
                        <van-col span='2'>
                            <div class="head">
                                 <img  v-lazy="img" name="adapter" /> 
                            </div>
                        </van-col>
                        <van-col span="14" class="author">
                             <span>热门内容,来自: {{author[index]}}</span>
                        </van-col>
                            <!-- 分享 -->
                            <van-col span="8" class="share">
                                <span @click.stop="pop()">...</span>
                            </van-col>
                            <!-- 弹出层 -->
                         <van-popup v-model="show" position="bottom" :overlay="true">
                                sss
                         </van-popup>
                </van-row>

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
        author:[],
        show: false,
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
            this.author.push(this.author[i]);
            this.activeTitle.push(this.activeTitle[i]);
            this.days.push(this.days[i]); 
        }
        this.disabled = false;
       }, 200);
    },
    pop() {
        console.log('123')
        this.show = true;
    }
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
                const dataComm = res.data.community;
                this.days = data.active.days;
                switch(this.tabs){
                    case '动态' :
                        this.activeTitle = data.active.tuijian_title;
                        this.imageList = data.imageList;
                        this.author = dataComm.author;
                      break;
                    case '热门' :
                        this.activeTitle = data.active.shishang_title;
                        this.imageList = data.shishangImglist;
                      break;
                    case '发现' :
                        this.activeTitle = data.active.meizhuang_title;
                        this.imageList = data.meizhuangImglist;
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

