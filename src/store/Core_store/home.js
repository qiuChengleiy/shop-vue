
export default {
    state:{
        tab:{
            title:['','今日推荐','时尚','美装','家电','家居','国际','生活'],
        },
        badge:{
            icon:['icon_1','icon_2','icon_8','icon_4','icon_5','icon_6','icon_7','icon_10'],
            title:['鞋包馆','运动馆','母婴馆','超市','女装馆','美妆馆','男装馆','更多'],
        },
        lunbo:{
            src:['../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg','../../static/images/lunbo/err.jpg'],
        },
        imageList:[],
        broadcast:[],
        bc:true,
        shop_info:"5",
        my_info:"2",
    },
    mutations: {
        
    },
    actions: {
       
    },
    getters: {
        bc_notshow(state){
            setTimeout(() => {
              state.bc = false;
            }, 20000);
            return state.bc;
        }
       
    }
}