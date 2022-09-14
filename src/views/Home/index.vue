<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button type="default" round block size="small">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active"  swipeable >
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="btn"></span>
    </van-tabs>

    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
     >
     <ChannelEdit
     v-if="isShow"
     :myChannels='channels'
     @change-active="[isShow=false,active=$event]"
     @del-channel='delChannel'
     @add-channel="addChannel"
     ></ChannelEdit>
     </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from '@/views/Home/components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, ChannelEdit },
  created () {
    this.initChinnel()
    // this.getMyChannel()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChinnel () {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        if (this.$store.state.myChannels.length === 0) {
          this.getMyChannel()
        } else {
          this.channels = this.$store.state.myChannels
        }
      }
    },
    async getMyChannel () {
      try {
        const { data: { data } } = await getChannelAPI()
        // console.log(data)
        this.channels = data.channels
      } catch (err) {
        if (!err.response) {
          throw err
        } else {
          const status = err.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    async delChannel (id) {
      const newChannels = this.channels.filter((item) => item.id !== id)
      try {
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        this.channels = newChannels
        this.$toast.success('删除频道成功~')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除~')
        } else {
          throw error
        }
      }
    },
    async addChannel (item) {
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, item])
        }
        this.channels.push(item)
        this.$toast.success('添加频道成功~')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加~')
        } else {
          throw error
        }
      }
    },
    btn () {
      this.isShow = true
    }
  }
}
</script>

<style scoped lang='less'>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
