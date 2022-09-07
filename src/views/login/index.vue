<template>
  <div>
    <van-nav-bar title="标题" class="nav-bar"/>
    <van-form @submit="onSubmit" class="form" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
         <template #button>
          <van-button
            class="btn"
            blockk
            size="small"
            type="default"
            native-type="button"
            round
            v-if="isShowCodebtn"
            @click="sendCode"
          >发送验证码</van-button>
          <van-count-down :time="time" v-else format="ss秒" @finish="isShowCodebtn=true"/>
        </template>
      </van-field>
      <div style="margin:16px;">
        <van-button  block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/login/rule'
import { login, sendCodeAPi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      time: 6 * 1000,
      isShowCodebtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit () {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail(err.response.data.message)
        }
        this.$toast.clear()
        throw err
      }
    },
    async  sendCode () {
      await this.$refs.from.validate('mobile')
      this.loading()
      try {
        await sendCodeAPi(this.mobile)
        this.isShowCodebtn = false
        this.$toast.success('发送验证码成功')
      } catch (err) {
        if (err.response && (err.response.status === 429 || err.response.status === 404)) {
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.clear()
          throw err
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title){
    color: #fff;
  }
}
:deep(.form){
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background: #eee;
  color: #a58594;
}
</style>
