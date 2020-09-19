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

// 获取文章列表
export const articleList = function (params) {
  return myaxios({
    url: '/post',
    params
  })
}

// 获取栏目列表
export const categoryList = function () {
  return myaxios({
    url: '/category'
  })
}

// 发布文章
export const postarticle = function (data) {
  return myaxios({
    method: 'post',
    url: '/post',
    data
  })
}

// 根据文章id 获取文章详情
export const getarticle = function (id) {
  return myaxios({
    url: `/post/${id}`
  })
}
// 根据文章id 编辑文章详情
export const editarticle = function (id, data) {
  return myaxios({
    method: 'post',
    url: `/post_update/${id}`,
    data
  })
}
