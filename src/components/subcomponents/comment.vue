<template>
    <div class="cmt-container">
      <h3>发表评论</h3>
      <hr>
      <textarea placeholder="请输入要BB的内容（最多吐槽120字）" v-model="msg"></textarea>
      <mt-button type="primary" size="large" v-model="msg" @click="postComments">发表评论</mt-button>
      <div class="cmt-list" v-for="(item,i) in comments" :key="i">
        <div class="cmt-item">
          <div class="cmt-title">
            第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
          </div>
          <div class="cmt-body">
            {{item.content==="undefined"?"啥也没有":item.content}}
          </div>
        </div>
      </div>
      <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: 'comment',
    data(){
      return{
        comments:[],
        pageindex:1,
        msg:''
      }
    },
    created(){
      this.getComments()
    },
    methods:{
      getComments(){
        this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
          if(result.body.status===0){
            this.comments=this.comments.concat(result.body.message)
          }else{
            Toast("加载失败！")
          }
        })
      },
      getmore(){
        this.pageindex++;
        this.getComments()
      },
      postComments(){
        if(this.msg.trim().length===0){
          return Toast("内容不能为空！")
        }else {
          this.$http.post("api/postcomment/"+this.$route.params.id,{
            content:this.msg.trim()
          }).then(result=>{
            if(result.body.status===0){
              var cmt={
                user_name:"匿名用户",
                add_time:Date.now(),
                content:this.msg.trim()
              };
              this.comments.unshift(cmt);
              this.msg=""
            }
          })
        }
      }
    },
    props:["id"]
  }
</script>

<style scoped>
.cmt-container h3{
  font-size:18px;
}
.cmt-container textarea{
  font-size: 14px;
  height: 85px;
  margin: 0;
}
  .cmt-list{
    margin: 10px 0;
  }
  .cmt-item{
    font-size: 13px;
  }
  .cmt-title{
    line-height: 30px;
    background-color: #ccc;
  }
  .cmt-body{
    line-height: 35px;
    text-indent: 2em;
  }
</style>
