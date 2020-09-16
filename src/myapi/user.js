import myaxios from '@/kite/myaxios'

export const baseURL = myaxios.defaults.baseURL

export const login = function (data) {
  return myaxios({
    method: 'post',
    url: '/login',
    data
  })
}
