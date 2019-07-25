<template>
    <div class="goodsinfo">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="flag" ref="ball"></div>
      </transition>
      <div class="mui-card">
        <div class="mui-card-content" id="mui-card-content1">
          <div class="mui-card-content-inner">
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="(item,i) in lunbo" :key="i">
                <img :src="item.img" alt="">
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
           <p class="price">
             市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now-price">￥{{goodsinfo.sell_price}}</span>
           </p>
            <p>购买数量 <numbox @getcount="getSelectedcount" :max="goodsinfo.stock_quantity"></numbox></p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addShopcar">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{goodsinfo.goods_no}}</p>
            <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
            <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>

    </div>
</template>

<script>
  import numbox from '../numbox/goodsinfo-numbox'
  export default {
    name: 'goodsinfo',
    data(){
      return{
        id:this.$route.params.id,
        lunbo:[],
        goodsinfo:[],
        flag: false,
        selectedcount:1
      }
    },
    created(){
      this.getlunbo();
      this.getgoodsinfo();
    },
    methods:{
      getlunbo(){
        this.$http.get("api/getthumimages/"+this.id).then(result=> {
          if (result.body.status === 0) {
            result.body.message.forEach(item =>{
              item.img=item.src;
            })
            this.lunbo = result.body.message;
          }
        })
      },
      getgoodsinfo(){
        this.$http.get("api/goods/getinfo/"+this.id).then(result=> {
          if (result.body.status === 0) {
            this.goodsinfo = result.body.message[0];
          }
        })
      },
      goDesc(id){
        this.$router.push({name:"goodsDesc",params:{id}})
      },
      goComment(id){
        this.$router.push({name:"goodsComment",params:{id}})
      },
      addShopcar(){
        this.flag=!this.flag;
        var goodsinfo={
          id:this.id,
          count:this.selectedcount,
          price:this.goodsinfo.sell_price,
          selected:true
        };
        this.$store.commit("addToCar",goodsinfo)
      },
      beforeEnter(el) {
        // 表示动画入场之前，此时动画还未开始，可以在其中
        // 设置元素开始动画之前的起始样式
        // 设置小球开始动画之前的起始位置
        el.style.transform = 'translate(0,0)';
      },
      enter(el, done) {
        // 没有实际效果，但不可缺少，可以理解为强制动画刷新
        el.offsetWidth;//offsetHeight、offsetLeft等都可以

        // 获取小球移动距离

        // 子组件的起始徽标 a 获取
        const aPosition = this.$refs.ball.getBoundingClientRect();
        // 父组件的结束徽标 b 获取
        // 认真点就是父组件获取到再传递子组件，不过推荐偷懒法：
        const bPosition = document.getElementById('badge').getBoundingClientRect();

        const xDist = bPosition.left - aPosition.left;
        const yDist = bPosition.top - aPosition.top;

        // ES6 的模板字符串
        el.style.transform = `translate( ${xDist}px,${yDist}px )`;

        el.style.transition = 'all .8s ease';

        // 这里的 done，其实就是 afterEnter 这个函数，
        // 也就是说：done 是 afterEnter 函数的引用
        done()
      },
      afterEnter(el) {
        //表示动画完成之后小球的状态

        // 使用 flag 标识符，来表示动画的切换；
        // Vue 把一个完整的动画，使用钩子函数，拆分为了两部分；
        // 对flag：第一部分 false -> true ;  第二部分 true -> false

        // 这句话，第一个功能，是控制小球的显示与隐藏
        // 第二个功能：直接跳过后半场动画，让 flag 标识符直接变为 false
        // 当第二次再点击按钮的时候，flag = false -> true
        this.flag = !this.flag;

    },
      getSelectedcount(count){
        this.selectedcount=count;
      }
  },
    components:{
      numbox
    }
  }
</script>

<style scoped>
  .goodsinfo{
    background-color: #eee;
    overflow: hidden;
    position: relative;
  }
  .mint-swipe{
    height: 200px;
  }
  img{
    height: 100%;
  }
  #mui-card-content1{
    text-align: center;
  }
  .now-price{
    color: red;
    font-size: 16px;
    font-weight: 700;
  }
  .mui-card-footer{
    display: block;
  }
button{
  margin: 15px 0;
}
  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color:red;
    position: absolute;
    z-index: 99;
    top: 369px;
    left: 138px;
  }
</style>

