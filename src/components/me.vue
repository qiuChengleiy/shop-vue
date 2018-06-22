<template>
   <!-- 我的 组件 -->
  <div id="app">
  <van-row class="col-me">
                
                    <van-col span='24' class="title">
                         <h4>{{'我的'}}</h4>  
                     </van-col>
                     <!-- 登录 -->
                     <van-col span="24" class="headerImg">
                         <div class="me-img">
                          <img  v-lazy="img" name="adapter" @click.stop="redirect('#')" />
                         </div>

                         <div class="me-img-t">
                             <h5>{{login[0]}}</h5>  
                         </div>

                         <div class="me-img-p">
                             <h4>{{'>'}}</h4>  
                         </div>

                     </van-col>
                      
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList" v-for="v in menu" :key="v.id">

                         <div class="me-img-ts">
                             <span>{{v}}</span>  
                         </div>

                         <div class="me-img-ps">
                             <h4>{{'>'}}</h4>  
                         </div>

                     </van-col>

                      <van-col span="24" class="headerList">

                         <div class="me-img-ts">
                             <span>{{'安全模式'}}</span>  
                         </div>

                         <div class="me-img-ps">
                            <van-switch :value="checked" size="22px" @input="onInput" class="btns"/>
                         </div>

                     </van-col>

                     <van-col span="24" class="boxer">
                        <!-- 进度条 -->
                         <van-circle
                            v-model="currentRate"
                            :rate="94"
                            :speed="100"
                            :text="text"
                             size="150px"
                              color="#d34ba8"
                            layer-color="#eee"
                            class="range"
                            />

                            <span>今日运势</span>

                     </van-col>
                    
       </van-row>

   
    <!-- tabBar -->
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
        <van-tabbar-item icon="pending-evaluate" dot @click="redirects('/community')">社区</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" info="5" v-infos="shop_info" @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" info="2" v-infos="my_info" @click="redirects('/me')">我的</van-tabbar-item>
      </van-tabbar>

    </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Toast } from 'vant';
import { Dialog } from'vant';


export default {
  name: 'Me',
  components:{
  
  },
  data() {
    return {
        tabarActive:3,
        img:'http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg',
        menu:['我的信用评分','物流信息','联系人管理','密码设置'],
        currentRate: 0,
        login:['立即登录'],
         checked: true,
    }
  },
  computed: {
    ...mapState({
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
    }),
    ...mapGetters(['bc_notshow','search_show']),
     text() {
      return this.currentRate.toFixed(0) + '分'
    },
  },
  methods: {
    ...mapActions([
      'searchA','infoAction'
    ]),
     redirects(url) {
      this.$router.push(url);
    },
     onInput(checked) {
        if(this.checked){
      Dialog.confirm({
        title: '提醒',
        message: '关闭安全模式可能给您带来风险，是否确认关闭'
      }).then(() => {
        this.checked = checked;
      });
     }else{
         Toast('正在为您护驾~~')
         this.checked = true;
     }
    },
  },
  watch: {

  },
  directives: {
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
              const data = res.data.goods;
              
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
      Toast('预估完成  ^_^')
      setTimeout(function() {
          Toast('今日表现不错 ^_^ ');
      },1500);       
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
</style>

