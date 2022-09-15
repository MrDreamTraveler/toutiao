<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
// rem适配
// 1.让rem动起来
// yarn add amfe-flexible
// 2.盒子使用rem
// 自动的识别css中px,并将其转成rem.
// post-css css的预处理器
// -postcss自己能干的事很少，下载插件
// l.下载yarn add postcss-pxtorem
// 2.告诉postcss,我要使用这个插件)，.postcssrc.js
export default {

}
</script>

<style scoped lang="less">

</style>
