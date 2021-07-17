import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/api-zt/slProduct/page',
        method: 'get',
        params: params
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
export function fetchSimpleList(params) {
    return request({
        url: '/api-zt/slProduct/updateTypeOne',
        method: 'get',
        params: params
    })
}
//添加分类
export function slProductTypeOneAdd(params) {
    return request({
        url: '/api-zt/slProductTypeOne/add',
        method: 'get',
        params: params
    })
}
//编辑分类
export function slPhandleEditupDate(params) {
    return request({
        url: '/api-zt/slProductTypeOne/update',
        method: 'get',
        params: params
    })
}

// 拒绝理由&通过
export function postReason(params) {
    return request({
        url: '/api-zt/slProduct/updateUpDown',
        method: "get",
        params
    })
}




export function deleteProductCate(id) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/delete/' + id,
        method: 'get'
    })
}

export function createProductCate(data) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/create',
        method: 'post',
        data: data
    })
}

export function updateProductCate(id, data) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/update/' + id,
        method: 'post',
        data: data
    })
}

export function getProductCate(id) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/' + id,
        method: 'get',
    })
}

export function updateShowStatus(data) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/update/showStatus',
        method: 'post',
        data: data
    })
}

export function updateNavStatus(data) {
    return request({
        url: '/api-goods/pms/PmsProductCategory/update/navStatus',
        method: 'post',
        data: data
    })
}

export function fetchListWithChildren() {
    return request({
        url: '/api-goods/pms/PmsProductCategory/list/withChildren',
        method: 'get'
    })
}