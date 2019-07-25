<template>
    <div class="newsinfo">
      <h3>{{newsinfo.title}}</h3>
      <p>
        <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
        <span>点击：{{newsinfo.click}}次</span>
      </p>
      <hr>
      <div class="content" v-html="newsinfo.content"></div>
      <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
  import comment from'../subcomponents/comment'
  export default {
    name: 'newsinfo',
    data(){
      return{
        id:this.$route.params.id,
        newsinfo:{}
      }
    },
    created(){
      this.getnewsinfo();
    },
    methods:{
      getnewsinfo(){
        this.$http.get("api/getnew/id").then(result=>{
          if(result.body.status===0){
            this.newsinfo=result.body.message[0]
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
.newsinfo{
  padding: 0 4px;
}
  p{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color:#226aff;
  }
  h3{
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    color: red;
    margin-bottom: 15px;
  }
</style>
