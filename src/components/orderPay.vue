<template>
 <!-- 订单提交-->
  <div id="app" style="background:white;margin-top:-20px;height:800px;">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        class="address"
        />

    <h1>仅做展示效果哦~~~</h1>
    <h4>这里的业务逻辑还可以继续完善下去的</h4>

    <h4>ヾ(◍°∇°◍)ﾉﾞ</h4>

    <span>忍不住想继续做下去~</span>

      <van-submit-bar
        :price="50900*numO"
        button-text="提交订单"
        @submit="onSubmit"
        />
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { ImagePreview } from 'vant';
import { Toast } from 'vant';


export default {
  name: 'pay',
  data() {
    return {
      areaList:{
            province_list: {
                110000: '北京市',
                120000: '天津市'
            },
            city_list: {
                110100: '北京市',
                110200: '县',
                120100: '天津市',
                120200: '县'
            },
            county_list: {
                110101: '东城区',
                110102: '西城区',
                110105: '朝阳区',
                110106: '丰台区',
                120101: '和平区',
                120102: '河东区',
                120103: '河西区',
                120104: '南开区',
                120105: '河北区',
                // ....
            }
},
      searchResult: []
    }
  },
  props:{
   
  },
  components:{
   
  },
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow,
      numO: state => state.home.numO,
    }),
    ...mapGetters(['bc_notshow']),
  },
  methods: {
      ...mapActions(['orderShows']),
      onSubmit(e) {
           if(this.searchResult.length == 0) {
               Toast('请填写收货信息');
           }else{
                Toast('提交成功');
                this.$router.push('/');
           }
          
      },
     search_shows(){
         this.$router.back(-1);
     },
     //商品预览
    ImagePreviews() {
        ImagePreview(this.preImgs);
    },
    //结算
     onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  },
  watch: {

  },
  directives: {
   
  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
         const buy_id = this.$route.params.id;
         console.log(buy_id); 
         //或许商品信息
          if( res.status == 200 ) {
              const data = res.data.goods;
              const preImg = data.id_0.moreImg;
              this.preImgs = preImg;


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
@import url('../assets/css/buyInfo.less');
</style>

