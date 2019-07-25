import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/tabbar/home'
import member from '@/components/tabbar/member'
import shopcar from '@/components/tabbar/shopcar'
import search from '@/components/tabbar/search'
import news from '@/components/home/news'
import newsinfo from '@/components/home/newsinfo'
import photolist from '@/components/photo/photolist'
import photoinfo from '@/components/photo/photoinfo'
import goodslist from '@/components/goods/goodslist'
import goodsinfo from '@/components/goods/goodsinfo'
import goodsDesc from '@/components/goods/goodsDesc'
import goodsComment from '@/components/goods/goodsComment'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/member',
      component: member
    },
    {
      path: '/shopcar',
      component: shopcar
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/home/news',
      component: news
    },
    {
      path: '/home/newsinfo/:id',
      component: newsinfo
    },
    {
      path: '/photo/photolist',
      component: photolist
    },
    {
      path: '/photo/photoinfo/:id',
      component: photoinfo
    },
    {
      path: '/home/goodslist',
      component: goodslist
    },
    {
      path: '/home/goodsinfo/:id',
      name:'goodsinfo',
      component: goodsinfo
    },
    {
      path: '/home/goodsDesc/:id',
      name:'goodsDesc',
      component: goodsDesc
    },
    {
      path: '/home/goodsComment/:id',
      name:'goodsComment',
      component: goodsComment
    }
  ],
  linkActiveClass: 'mui-active'
})
