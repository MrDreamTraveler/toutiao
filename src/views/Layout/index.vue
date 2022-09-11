<template>
  <div>
    <router-view></router-view>
    <van-tabbar  route>
      <van-tabbar-item to='/ '>
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/profile'>
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        <span>{{isLogin?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 36px;
}
</style>
