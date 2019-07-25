<template>
<div class="photoinfo">
  <h3>{{imagelist.title}}</h3>
  <p>
    <span>发表时间：{{imagelist.add_time|dateFormat}}</span>
    <span>点击：{{imagelist.click}}次</span>
  </p>
  <hr>
  <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
  <div class="content" v-html="imagelist.content"></div>
  <comment-box :id="this.id"></comment-box>
</div>
</template>

<script>
  import comment from'../subcomponents/comment'
  export default {
    name: 'photoinfo',
    data(){
      return{
        id:this.$route.params.id,
        imagelist:{},
        list:[]
      }
    },
    created(){
      this.getimageinfo();
      this.getThumbs()
    },
    methods:{
      getimageinfo(){
        this.$http.get("api/getimageInfo/"+this.id).then(result=>{
          if(result.body.status===0){
            this.imagelist=result.body.message[0]
          }
        })
      },
      getThumbs(){
        this.$http.get("api/getthumimages/"+this.id).then(result=>{
          if(result.body.status===0){
            result.body.message.forEach(item=>{
              item.w=600;
              item.h=400
            })
            this.list=result.body.message
          }
        })
      }
    },
    components:{
      "comment-box":comment
    },
  }
</script>

<style scoped>
  .photoinfo{
    padding: 0 4px;
  }
  p{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  h3{
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    color:#226aff;
    margin-bottom: 15px;
  }
  img{
    margin: 8px;
    box-shadow: 0 0 8px #999;
  }
  .content{
    font-size: 12px;
  }
</style>
