<template>
  <div>
    <van-cell :title="article.title" :label="label" v-if="article.cover.type===0"/>
    <van-cell :title="article.title" :label="label"  v-else-if="article.cover.type===1">
      <template>
        <van-image
          width="100"
          :src="article.cover.images[0]"
        />
      </template>
    </van-cell>
    <van-cell :title="article.title"   v-else>
      <template #label>
         <van-image
            v-for="(item,index) in article.cover.images"
            :key="index"
            width="100"
            :src="item"
          />
          <p>{{label}}</p>
       </template>
     </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label () {
      /* eslint-disable */
      return `${this.article.aut_name} ${this.article.comm_count}评论 ${dayjs(this.article.pubdate).fromNow()}`
    }
  }
}
</script>

<style scoped lang='less'>

</style>
