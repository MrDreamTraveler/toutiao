import request from '@/utils/request'

/**
 * 获取文章
 * @param {String} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据传当前的时间戳,请求历史推荐传指定的时间戳
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
