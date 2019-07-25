<template>
<div class="goodsdesc">
  <h3>{{info.title}}</h3>
  <hr>
  <div class="content" v-html="info.content"></div>
</div>
</template>

<script>
  export default {
    name: 'goodsDesc',
    data(){
      return{
        info:{}
      }
    },
    created(){
      this.getgoodsDesc()
    },
    methods:{
      getgoodsDesc(){
        this.$http.get("api/goods/getdesc/"+this.$route.params.id).then(result=> {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          }
        })
      }
    }
  }
</script>

<style>
  .goodsdesc{
    padding: 4px;
  }
  .goodsdesc h3{
  font-size: 16px;
  color: #226aff;
  margin: 15px 0;
  text-align: center;
}
.goodsdesc .content  img{
    width: 100%;
  }
</style>
