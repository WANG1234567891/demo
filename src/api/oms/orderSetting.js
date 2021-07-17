import request from '@/utils/request'
export function getOrderSetting(id) {
  return request({
    url:'/api-zt/slOrderRefund/info?id='+id,
    method:'get',
  })
}

export function createOrderSetting(params) {
  return request({
    url:'/api-zt/slOrderRefund/updateRecommend',
    method:'get',
    params:params
  })
}
