import request from '@/utils/request'
// import store from '@/store'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {*} code 验证码
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {*} moblie 手机号
 * @returns Promise
 */
export const sendCodeAPi = (moblie) => {
  return request({
    url: `/v1_0/sms/codes/${moblie}`
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
