<template>
  <div class="root">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished='finished'
      finished-text="没有更多了"
      :error.sync='error'
      error-text="请求失败,点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
        $router.push({
          path:'/detail',
          query:{
            articleId:item.art_id
          }
        })
        "
      />
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults () {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getResultsAPI(this.page++, this.perPage, this.keywords)
        console.log(data)
        if (data.data.results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...data.data.results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
      // this.results.push(data.data.results)
    }
  }
}
</script>

<style>
.root {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
