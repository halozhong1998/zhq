<template>
<comment :id="this.$route.params.id"></comment>
</template>

<script>
  import comment from '../subcomponents/comment'
  export default {
    name: 'goodsComment',
    components:{
      comment
    }
  }
</script>

<style scoped>

</style>
