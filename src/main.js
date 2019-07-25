// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem("car"))||[]
var store=new Vuex.Store({
  state:{
    car
  },
  mutations:{
    addToCar(state,goodsinfo){
      var flag=false
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=parseInt(goodsinfo.count);
          flag=true;
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateToCar(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count);
          return true;
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    removeCar(state,id){
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,goodsinfo){
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.selected=goodsinfo.selected;
          return true
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    }
  },
  getters:{
    getAllCount(state){
      var c=0
      state.car.forEach(item=>{
        c+=item.count;
      })
      return c
    },
    getGoodsCount(state){
      var o={};
      state.car.forEach(item=>{
        o[item.id]=item.count
      })
      return o
    },
    getGoodsSelected(state){
      var c={};
      state.car.forEach(item=>{
        c[item.id]=item.selected;
      })
      return c
    },
    getGoodsCountandAmount(state){
      var o={
        count:0,
        amount:0
      };
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count;
          o.amount+=item.price*item.count
        }
      })
      return o
    }
  }
})

// import { Header,Swipe,SwipeItem,Button ,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root="http://www.liulongbin.top:3005"
Vue.http.options.emulateJSON = true;

import moment from 'moment'
Vue.filter('dateFormat',function (datastr,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(datastr).format(pattern)
})
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
