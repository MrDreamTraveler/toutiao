<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keyWords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search='onSearch'
        @focus='onFocus'
        @cancel="$router.push('/')"
      />
    </form>
    <component
      :is="componentName"
      :keywords='keyWords'
      @change-keywrods='onSearch'
     ></component>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data () {
    return {
      keyWords: '',
      isSearchResult: false
    }
  },
  computed: {
    ...mapState(['history']),
    componentName () {
      if (this.keyWords === '') {
        return 'SearchHistory'
      }
      if (this.isSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORY']),
    onSearch (keyWords) {
      this.keyWords = keyWords
      this.isSearchResult = true
      this.SET_HISTORY([...new Set([keyWords, ...this.history])])
    },
    onFocus () {
      this.isSearchResult = false
    }
  }
}
</script>

<style scoped lang='less'>
.search {
  [role='button']{
  color: #fff;
  }
}

</style>
