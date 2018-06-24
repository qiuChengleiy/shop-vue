<template>
   <!--项目介绍 组件 -->
  <div id="apps">
                <div class="login">
                    <div class="login-form">
                        <div class="login-inp">
                             <img  v-lazy="img" name="adapter" @click.stop="redirects('http://qiuchenglei.top')" />
                        </div>

                        <div class="login-inp">
                            <h4>Vue移动商城项目</h4>
                            <span>当前版本 v.1.0</span>
                            <div>项目地址:<a href=" https://github.com/qiuChengleiy/shop-vue-express-mongodb">请戳</a></div>
                            <span>github项目文档说明 ヾ(◍°∇°◍)ﾉﾞ  ↑ </span>
                        </div>

                        <div class="login-inp">
                            <h4>项目心得</h4>
                            <span>多写 多思考</span>
                            <span>多总结 多笔记</span>
                            <div>总结： 继续踩坑</div>

                            <div>前端路漫漫 且行且珍惜</div>
                            <span>学海无涯 回头是岸 </span>

                            <h4>始终坚信</h4>
                            <span>敢于尝试的你 其实已经进步了 ^_^</span>
                        </div>

                    </div>
                    <div class="login-txt"><a href="#" @click="redirects('/')">回到首页</a>|<a href="http://qiuchenglei.top" @click="tip()">光临我的主页</a></div>
                </div>
                <div style="text-align:center;">
                </div>

  </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Toast } from 'vant';
import { Dialog } from'vant';


export default {
  name: 'aboutMe',
  components:{
  
  },
  data() {
    return {
        img:'http://p6jvhvvit.bkt.clouddn.com/Jietu20180406-151247.jpg',
    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions([
      'searchA','infoAction'
    ]),
    redirects(url) {
      this.$router.push(url);
        if(this.$route.name == 'login') {
                    this.btnName = '立即登录';
                }else if (this.$route.name == 'register') {
                    this.btnName = '立即注册';
        }
    },
    tip() {
        Toast('坐稳啦 ^_^');
    },
    
  },
  watch: {

  },
  directives: {

  },
  beforeCreate() {

  },
  created() { 
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/about.less');
</style>

