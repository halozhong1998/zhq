<template>
<div class="photolist">
  <div id="slider" class="mui-slider">
    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <a :class="['mui-control-item',item.id==0?'mui-active':'']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in imglists" :key="item.id" @click="getlist(item.id)">
          {{item.title}}
        </a>
      </div>
    </div>
  </div>
  <ul>
    <router-link v-for="item in list" :key="item.id" tag="li" :to="'/photo/photoinfo/'+item.id">
      <img v-lazy="item.img_url">
      <div class="info">
        <h1 class="info-title">{{item.title}}</h1>
        <div class="info-body">{{item.zhaiyao}}</div>
      </div>
    </router-link>
  </ul>
</div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.min'
  import {Toast} from 'mint-ui'
    export default {
    name: 'photolist',
      data(){
      return{
        imglists:[],
        list:[]
      }
      },
      created(){
      this.getimgcategory();
      this.getlist(0);
      },
     mounted () {
       mui('.mui-scroll-wrapper').scroll({
         deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       });
     },
     methods:{
      getimgcategory(){
        this.$http.get("api/getimgcategory").then(result=>{
          if(result.body.status===0){
            this.imglists=result.body.message;
            var iml={
              title:'全部',
              id:0
            }
            this.imglists.unshift(iml)
          }else{
            Toast("加载失败！")
          }
        })
      },
      getlist(cateid){
        this.$http.get("api/getimages/"+cateid).then(result=>{
          if(result.body.status===0){
            this.list=result.body.message
          }
        })
      }
     }
    }
</script>

<style scoped>
*{
  touch-action: pan-y;
}
ul{
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
li{
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 6px #999;
  position: relative;
}
img{
  width: 100%;
  vertical-align: middle;
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
  .info{
    color: #fff;
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    max-height: 84px;
    text-align: left;
  }
  .info-title{
    font-size:14px;
  }
  .info-body{
    font-size: 13px;
  }
</style>
