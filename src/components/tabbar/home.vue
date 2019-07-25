<template>
<div>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item,i) in lunlist" :key="i">
      <img :src="item.img" alt="">
    </mt-swipe-item>
  </mt-swipe>
  <ul class="mui-table-view mui-grid-view mui-grid-9">
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/news">
      <span class="mui-icon mui-icon-home"></span>
      <div class="mui-media-body">新闻资讯</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/photo/photolist">
      <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
      <div class="mui-media-body">图片分享</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/goodslist">
      <span class="mui-icon mui-icon-chatbubble"></span>
      <div class="mui-media-body">商品购买</div></router-link></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
      <span class="mui-icon mui-icon-location"></span>
      <div class="mui-media-body">location</div></a></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
      <span class="mui-icon mui-icon-search"></span>
      <div class="mui-media-body">Search</div></a></li>
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
      <span class="mui-icon mui-icon-phone"></span>
      <div class="mui-media-body">Phone</div></a></li>
  </ul>
</div>
</template>

<script>
  import {Toast} from "mint-ui"
  export default {
    name: 'home',
    data(){
      return{
       lunlist:[]
      }
    },
    created(){
      this.getlun()
    },
    methods:{
      getlun(){
        this.$http.get("api/getlunbo").then(result=>{
          if(result.body.status===0){
            this.lunlist=result.body.message;
          }else{
            Toast("加载失败");
          }
        })
      }
    }
  }
</script>

<style scoped>
.mint-swipe{
  height: 200px;
}
  img{
    width: 100%;
    height: 100%;
  }
.mui-grid-view.mui-grid-9 {
  border: none;
   background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
  padding: 20px 15px;
}
</style>
