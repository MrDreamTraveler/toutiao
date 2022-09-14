import request from '@/utils/request'

/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有的频道
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delChannelAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}

export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
