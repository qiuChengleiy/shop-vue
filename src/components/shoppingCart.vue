<template>
   <!-- 购物车组件 -->
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
            @click.stop="search"
          />
        </form>
      </van-col>
      <van-col span="2" class="cols">
        <van-icon name="qr" class="classfic"/>
      </van-col>
    </van-row>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="cartBox">
    <div v-for="(v,index) in shops" :key="index.id" class="shop-cart">
        <!-- 标签区域 -->
        <van-row class="shop-col">
            <van-col span="10" class="check" offset="1">
                <van-checkbox v-model="checked[index]">{{shops[index]}} &nbsp;></van-checkbox>
            </van-col>
            <van-col span="4" offset="7">
                <span class="edit"   @click="showList = true">领券  &nbsp;|&nbsp; 编辑  </span>
            </van-col>
        </van-row>
        <div  @click="redirects('/goods/id_0/buy')">
        <van-card
            :title="goodsTitle[index].slice(0,16)"
            :desc="goodsDescription[0]"
            num="2"
            :price="prices[index]"
            :thumb="imageUrl[index]"    
        />
        </div>
    </div>
 </van-pull-refresh>   
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
    <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
    />
    </van-popup>

    
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

const coupon = {
  available: 1,
  discount: 0,
  denominations: 10000,
  origin_condition: 0,
  reason: '',
  value: 150,
  name: '满498减100',
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: 'shoppingCart',
  components:{
  
  },
  data() {
    return {
        tabarActive:2,
        value:null,
        active:0,
        path:'../../static/images/',
        imageList:[],
        activeTitle:null,
        days:null,
        disabled:false,
        broadcast:null,
        show:true,
        count: 0,
        isLoading: false,
        checked: [false,false,false,false],
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        showList:null,
        imageUrl:[],
        goodsTitle:[],
        goodsDescription:[],
        prices:[],
        shops:[],
    }
  },
  computed: {
    ...mapState({
      title: state => state.community.tab.title,
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
      'searchA','infoAction'
    ]),
    search() {
      this.$router.push('/search');
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        for (let i = 0; i < 3; i++) {
            this.imageUrl.push(this.imageUrl[i]);
            this.goodsTitle.push(this.goodsTitle[i]);
            this.goodsDescription.push(this.goodsDescription[i]);
            this.shops.push(this.shops[i]);
            this.prices.push(this.prices[i]);
        }

        this.infoAction();
        const infos = document.querySelector('.van-icon__info');
        infos.innerText = this.shop_info;

      }, 500);
    },
     //优惠券
     onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
     redirects(url) {
      this.$router.push(url);
    },
  },
  watch: {

  },
  directives: {
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
              const data = res.data.goods;
              const preImg = data.id_0.imgList[0];
              const title = data.id_0.title[0];
              const price = data.id_0.limit_price[0];
              const description = data.id_0.description; 
              const shops = data.id_0.shops;

              this.imageUrl = preImg;
              this.goodsTitle = title;
              this.prices = price;
              this.goodsDescription = description;
              this.shops = shops;              
              
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
      Toast('仅展示作用  ^_^')       
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
</style>

