import request from '@/utils/request'
//区域分布
export function addAreaOders(params) {
    return request({
      url:'/api-zt/rtm/areaOders',
      method:'POST',
      params:params
    })
  }
//城市 月
export function addAreaByCity(params) {
  return request({
    url:'/api-zt/rtm/areaOdersByCity',
    method:'POST',
    params:params
  })
}