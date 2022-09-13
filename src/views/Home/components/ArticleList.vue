<template>
  <div class="article">
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageArticle">
       <van-list
          @load="getNextPageArticle"
          :immediate-check='false'
          offset="100"
          v-model='loading'
          :finished='finished'
          finished-text="没有更多文章了~"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <AricleItem
            v-for="item in articles"
            :key="item.art_id"
            :article="item"
          ></AricleItem>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api'
import AricleItem from '@/views/Home/components/AricleItem.vue'

export default {
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  components: { AricleItem },
  created () {
    this.getFirstPageArticles()
  },
  data () {
    return {
      articles: [],
      loading: false,
      preTimestamp: '',
      finished: false,
      error: false,
      refreshing: false
    }
  },
  methods: {
    async getFirstPageArticles () {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle () {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar{
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: skyblue;
  }
}
</style>
