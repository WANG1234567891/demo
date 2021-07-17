import request from '@/utils/request'
//各类商品销售趋势
export function addProData(params) {
  return request({
    url:'/api-zt/rtm/proData',
    method:'POST',
    params:params
  })
}
//商品销售情况
export function commoditySales(params) {
    return request({
      url:'/api-zt/rtm/proSaleList',
      method:'POST',
      params:params
    })
  }
//关键词搜索
export function keywordSearch(params) {
  return request({
    url:'/api-zt/rtm/searchList',
    method:'POST',
    params:params
  })
}
//购物券营收
export function couponRevenue(params) {
  return request({
    url:'/api-zt/rtm/rtmList',
    method:'POST',
    params:params
  })
}