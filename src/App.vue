<template>
  <div id="app">
    <mt-header fixed title="固定在顶部">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"> <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span> </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      flag:false
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
  },
  created(){
    this.flag="$route.path"=="/home"?false:true;
  },
  watch:{
    "$route.path":function (newval) {
      if(newval=="/home"){
        this.flag=false
      }else{
        this.flag=true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
  .mint-header {
    height: 50px;
    font-size: 20px;
    z-index: 100 !important;
  }
  .v-enter{
    transform: translateX(100%);
    opacity: 0;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all .5s ease;
  }
.mui-bar-tab .mui-tab-item1{
  color: #007aff;
}
.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 17px;
  line-height: 21px;
}
.mui-bar-tab .mui-tab-item1 .mui-icon{
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon~ .mui-tab-label{
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
