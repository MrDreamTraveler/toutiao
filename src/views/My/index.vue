<template>
  <div class="profile">
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row >
            <van-col span="12">
              <van-row type="flex" justify="space-around" align="center" style="height:100%">
                <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{userInfo.name}}</span>
              </van-row>
            </van-col>
            <van-col span="7"></van-col>
            <van-col span="5">
              <van-row type="flex" justify="center" align="center" style="height:100%">
                <van-button size="mini" round class="edit-btn">编辑资料</van-button>
              </van-row>
            </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item  text="头条" >
              <template #icon>
                    {{userInfo.art_count}}
              </template>
            </van-grid-item>
            <van-grid-item  text="粉丝" >
              <template #icon>
                    {{userInfo.fans_count}}
              </template>
            </van-grid-item>
            <van-grid-item  text="关注" >
              <template #icon>
                    {{userInfo.like_count}}
              </template>
            </van-grid-item>
            <van-grid-item  text="获赞" >
              <template #icon>
                    {{userInfo.follow_count}}
              </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="loginout banner" v-else @click="$router.push('/login')">
        <img src="../../assets/images/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </header>
     <main>
       <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
       </van-grid>

       <div class="link">
        <van-cell title="消息通知" is-link />
       <van-cell title="小智同学" is-link />
       </div>
     </main>
     <footer>
       <van-button
       v-if="isLogin"
        @click="logout"
        block
        style="color:red"
        >退出</van-button>
     </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'My',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
        })
    },
    async getUserInfo () {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast('用户认证失败,请重新登录')
        } else {
          throw err
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.loginout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  color: #fff;
  img {
    margin-bottom: 10px;
    width: 1.76rem;
    height: 1.76rem;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      margin-top: 5px;
      color: #fff;
    }
  }
}
</style>
