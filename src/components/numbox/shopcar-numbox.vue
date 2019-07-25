<template>
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="inCount"  @change="count" ref="numbox" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.min.js'
  export default {
    name: 'goodsinfo-numbox',
    mounted () {
      mui(".mui-numbox").numbox()
    },
    methods:{
      count(){
        this.$store.commit("updateToCar",{
          id:this.goodsid,
          count:this.$refs.numbox.value
        })
      }
    },
    props:['inCount','goodsid']
  }
</script>

<style scoped>

</style>
