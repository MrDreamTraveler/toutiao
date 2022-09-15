<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORY', [])">全部删除</span>&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in $store.state.history"
      :key="index"
      :title="item"
      @click="!isEdit && $emit('change-keywrods', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-if="isEdit"
          @click="
            $store.commit(
              'SET_HISTORY',
              $store.state.history.filter((i) => i !== item)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEdit: false
    }
  }
}
</script>

<style></style>
