<template>
  <div>
    <AricleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></AricleItem>
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
      articles: []
    }
  },
  methods: {
    async getFirstPageArticles () {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
