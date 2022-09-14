<template>
  <div class="channl-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
      class="btn"
      size="mini"
      round
      style="color:red;border-color:red"
      @click="isEdit=!isEdit"
      >
        {{isEdit?'完成':'编辑'}}
      </van-button>
    </van-cell>

    <div class="my-pannel">
      <van-grid :gutter="10" :border="false">
        <van-grid-item
          :class="{active:item.name==='推荐'}"
          v-for="item,index in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit&&item.name!=='推荐'?'cross':''"
          @click="hanleMyChannel(item,index)"
        >
          <!-- <template #icon>
            <van-icon name="cross" />
          </template> -->
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="推荐频道" ></van-cell>
    <div class="recommend-pannel" >
      <van-grid :gutter="10" :border="false">
        <van-grid-item
          v-for="value in commendChannes"
          :key="value.id"
          :text="value.name"
          icon="plus"
          @click="$emit('add-channel',value)"
        >
          <!-- <template #icon>
            <van-icon name="plus" />
          </template> -->
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'
export default {
  created () {
    this.getAllChannel()
  },
  props: {
    myChannels: Array
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    async getAllChannel () {
      const { data } = await getAllChannelAPI()
      // console.log(data)
      this.allChannels = data.data.channels
    },
    hanleMyChannel ({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-channel', id)
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    commendChannes () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((myChannelsItem) => myChannelsItem.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">

:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channl-edit {
  padding-top: 98px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 24px;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
