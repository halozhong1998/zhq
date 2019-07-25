<template>
<div class="shopcar">
  <div class="mui-card" v-for="(item,i) in shoplist" :key="i">
    <div class="mui-card-content">
      <div class="mui-card-content-inner">
        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
        <img :src="item.thumb_path" alt="">
        <div class="info">
          <h1>{{item.title}}</h1>
          <p>
            <span class="price">￥{{item.sell_price}}</span>
            <numbox :inCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
            <a href="" @click.prevent="removelist(item.id,i)">删除</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="mui-card">
    <div class="mui-card-content" >
      <div class="mui-card-content-inner">
        <div class="left">
          <p>总计（不含运费）</p>
          <p>已勾选商品  <span class="red">{{$store.getters.getGoodsCountandAmount.count}}</span> 件， 总价 <span class="red">￥{{$store.getters.getGoodsCountandAmount.amount}}</span></p>
        </div>
        <mt-button type="danger">去结算</mt-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import numbox from '../numbox/shopcar-numbox'
  export default {
    name: 'shopcar',
    data(){
      return{
        shoplist:[]
      }
    },
    created(){
      this.getshoplist()
    },
    methods:{
      getshoplist(){
        var carid=[]
        this.$store.state.car.forEach(item=>{
          carid.push(item.id)
        })
        if(carid.length<=0){
          return;
        }
        this.$http.get("api/goods/getshopcarlist/"+carid.join(",")).then(result=>{
          this.shoplist=result.body.message
        })
      },
      removelist(id,i){
        this.shoplist.splice(i,1);
        this.$store.commit("removeCar",id)
      },
      selectedChanged(id,val){
        this.$store.commit("updateGoodsSelected",{
          id:id,
          selected:val
        })
      }
    },
    components:{
      numbox
    }
  }
</script>

<style scoped>
  .shopcar{
    background-color: #eee;
    overflow: hidden;
  }
  .mui-card-content-inner{
    display: flex;
    aglin-items:center;
    justify-content: space-between;
  }
  img{
    width: 60px;
    height: 60px;
  }
  h1{
    font-size: 13px;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .price{
    color: red;
    font-weight: 700;
  }
  .red{
    color: red;
    font-weight: 700;
    font-size: 16px;
  }
</style>
