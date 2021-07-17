import request from '@/utils/request'
//查询  搜索
export function fetchList(params) {
    return request({
        url: '/api-zt/slProduct/page',
        method: 'get',
        params: params
    })
}
//删除
export function updateDeleteStatus(params) {
    return request({
        url: '/api-zt/slProduct/delStatus',
        method: 'get',
        params: params
    })
}
//下架
export function fetchVList(params) {
    return request({
        url: '/api-zt/slProduct/updateUpDown',
        method: 'get',
        params: params
    })
}
//一号专区
export function fetchSimpleList(params) {
    return request({
        url: '/api-zt/slProduct/updateTypeOne',
        method: 'get',
        params: params
    })
}
// 获取商品类别
export function getTypes(params) {
    return request({
        url: "/api-zt/slProductType/list",
        method: 'get',
        params
    })
}
// 修改类别
export function elOptionBlurBaseApi(params) {
    return request({
        url: '/api-zt/slProduct/updateRecommendType',
        method: "get",
        params
    })
}
//一号店专区分类
export function newStatusslProductTypeOne(params) {
    return request({
        url: '/api-zt/slProductTypeOne/list',
        method: 'get',
        params: params
    })
}



export function updateNewStatus(params) {
    return request({
        url: '/api-goods/pms/PmsProduct/update/newStatus',
        method: 'post',
        params: params
    })
}

export function updateRecommendStatus(params) {
    return request({
        url: '/api-goods/pms/PmsProduct/update/recommendStatus',
        method: 'post',
        params: params
    })
}

export function updateVerifyStatus(params) {
    return request({
        url: '/api-goods/pms/PmsProduct/update/verifyStatus',
        method: 'post',
        params: params
    })
}

export function updatePublishStatus(params) {
    return request({
        url: '/api-goods/pms/PmsProduct/update/publishStatus',
        method: 'post',
        params: params
    })
}
export function createProduct(data) {
    return request({
        url: '/api-goods/pms/PmsProduct/create',
        method: 'post',
        data: data
    })
}

export function updateProduct(id, data) {
    return request({
        url: '/api-goods/pms/PmsProduct/update/' + id,
        method: 'post',
        data: data
    })
}
export function getProduct(id) {
    return request({
        url: '/api-zt/slProduct/info?id=' + id,
        method: 'get',
    })
}