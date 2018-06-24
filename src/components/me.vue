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
                           <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                            <van-icon name="photograph" style="marginTop:25px;"/>
                          </van-uploader>

                          <img  v-lazy="img" name="adapter" @click.stop="redirect('#')" />
                         </div>

                         <div class="me-img-t">
                             <h5 @click="redirects('/login')">{{login[0]}}</h5>  
                         </div>

                         <div class="me-img-p">
                             <h4>{{'>'}}</h4>  
                         </div>

                     </van-col>
                      
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList" v-for="v in menu" :key="v.id">

                         <div class="me-img-ts" @click.stop="listCover(v)">
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

                    <!-- 弹出层 -->
                     <van-popup v-model="shows" position="top" :overlay="true">
                      <van-col span='24' class="title" style="width:400px;height:100%;paddingBottom:20px;">
                        <!-- 信用 -->
                        <div v-if="xinyong">
                          <h4>{{menu[0]}}</h4> 
                          <van-rate v-model="value"  color='#d34ba8' void-color="#eee"/> 
                           <h4 style="color:#d34ba8;">{{'100分'}}</h4> 
                          <span style="fontSize:12px;color:#A9A9A9;">本月表现绝佳 &nbsp;小主人再接再厉 ~~</span>
                        </div>
                      <!-- 物流信息 -->
                         <div v-if="wuliu">
                          <h4>{{menu[1]}}</h4>  

                          <van-steps 
                            :active="active"
                            icon="logistics"
                            title=""
                            description=""
                          >
                           <van-step>买家下单</van-step>
                            <van-step>商家接单</van-step>
                            <van-step>买家提货</van-step>
                             <van-step></van-step>
                            <van-step>交易完成</van-step>
                          </van-steps>

                          <van-steps direction="vertical" :active="0" active-color="#06bf04">
                            <van-step>
                              <h3>【常州市】快件已到菜鸟驿站请带好证件来取件</h3>
                              <p>2018-06-12 12:40</p>
                            </van-step>
                            <van-step>
                              <h3>【无锡市】已到无锡集散中心正准备发往下一站</h3>
                              <p>2016-06-11 10:00</p>
                            </van-step>
                            <van-step>
                              <h3>快件已发货</h3>
                              <p>2018-06-10 09:30</p>
                            </van-step>
                          </van-steps>

                        </div>
                      <!-- 联系人 -->
                         <div v-if="contact" style="height:300px;">
                          <h4>{{menu[2]}}</h4>  

                          <!-- 联系人卡片 -->
                              <van-contact-card
                                :type="cardType"
                                :name="currentContact.name"
                                :tel="currentContact.tel"
                                @click="showList = true"
                              />

                              <!-- 联系人列表 -->
                              <van-popup v-model="showList" position="bottom">
                                <van-contact-list
                                  v-model="chosenContactId"
                                  :list="list"
                                  @add="onAdd"
                                  @edit="onEdit"
                                  @select="onSelect"
                                />
                              </van-popup>

                              <!-- 联系人编辑 -->
                              <van-popup v-model="showEdit" position="bottom">
                                <van-contact-edit
                                  :contact-info="editingContact"
                                  :is-edit="isEdit"
                                  @save="onSave"
                                  @delete="onDelete"
                                />
                              </van-popup>

                            <div style="fontSize:12px;color:#A9A9A9;marginTop:20px;">{{'保存联系人联系方式 能够有效的与他人取得联系哦~~'}}</div>  
                        </div>
                      <!-- 密码设置 -->
                         <div v-if="pass" style="height:700px;">
                          <h4>{{menu[3]}}</h4>  

                          <!-- 密码输入框 -->
                            <van-password-input
                              :value="value"
                              info="密码为 6 位数字"
                              @focus="showKeyboard = true"
                            />

                            <!-- 数字键盘 -->
                            <van-number-keyboard
                              :show="showKeyboard"
                              @input="onInputs"
                              @delete="onDelete"
                              @blur="showKeyboard = false"
                            />
                    <div style="fontSize:12px;color:#A9A9A9;marginTop:20px;">{{'请小主人妥善保管好密码哦~~'}}</div>  
                        </div>
                        
                      </van-col>
                    </van-popup>
                    
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
        shows: false,
        xinyong:false,
        wuliu:false,
        contact:false,
        pass:false,
        value: 5,
        active: 3,
        chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }],
       value: '',
      showKeyboard: true
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
     cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
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
    listCover(v) {
       this.shows = true;
    
      switch(v) {
        case '我的信用评分' :
           this.wuliu = false;
           this.contact = false;
           this.pass = false;
           this.xinyong = true;
           break;
        case '物流信息' :
           this.contact = false;
           this.pass = false;
           this.xinyong = false;
           this.wuliu = true;
          break;
        case '联系人管理' :
           this.pass = false;
           this.xinyong = false;
           this.wuliu = false;
          this.contact = true;
          break;
        case '密码设置' :
           this.xinyong = false;
           this.wuliu = false;
           this.contact = false;
          this.pass = true;
          break;
        default:
          this.shows = false;
          break;
      }
    },
       // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
     onInputs(key) {
      this.value = (this.value + key).slice(0, 6);
      if((this.value).split('').length >= 6 ) {
        Toast('密码设置成功 ^_^');
        this.shows = false;
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
     onRead(file) {
      console.log(file);
      this.img = file.content;
      Toast('头像上传成功 ^_^');
    }
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

