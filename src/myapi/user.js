import myaxios from '@/kite/myaxios'

export const baseURL = myaxios.defaults.baseURL

// 登陆
export const login = function (data) {
  return myaxios({
    method: 'post',
    url: '/login',
    data
  })
}

// 获取个人信息
export const user = function (id) {
  return myaxios({
    url: `/user/${id}`
  })
}
