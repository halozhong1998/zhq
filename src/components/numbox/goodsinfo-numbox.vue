<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1"  @change="count" ref="numbox"/>
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
        this.$emit("getcount",parseInt(this.$refs.numbox.value))
      }
    },
    watch:{
      'max': function (newval,oldval) {
        mui(".mui-numbox").numbox().setOption('max',newval)
      }
    },
    props: ["max"]
  }
</script>

<style scoped>

</style>
