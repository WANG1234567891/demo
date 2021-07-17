import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/api-zt/slShopMg/mchOdr',
    method:'post',
    params:params
  })
}
export function slShopMgStatus(data) {
  return request({
    url:'/api-zt/slShopMg/mchOdrDetail',
    method:'post',
    data:data
  })
}


export function updateRecommendStatus(data) {
  return request({
    url:'/api-marking/marking/SmsHomeNewProduct/update/recommendStatus',
    method:'post',
    data:data
  })
}

export function deleteNewProduct(data) {
  return request({
    url:'/api-marking/marking/SmsHomeNewProduct/delete',
    method:'post',
    data:data
  })
}

export function createNewProduct(data) {
  return request({
    url:'/api-marking/marking/SmsHomeNewProduct/create',
    method:'post',
    data:data
  })
}

export function updateNewProductSort(params) {
  return request({
    url:'/api-marking/marking/SmsHomeNewProduct/update/sort/'+params.id,
    method:'post',
    params:params
  })
}
