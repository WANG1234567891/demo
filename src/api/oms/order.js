import request from '@/utils/request'
//退款列表
export function refundOrderList(params) {
    return request({
        url: '/api-zt/slOrderRefund/page',
        method: 'post',
        params: params
    });
}
export function fetchList(params) {
    return request({
        url: '/api-zt/slOrder/page',
        method: 'get',
        params: params
    })
}

export function exportExcel(data) {
    return request({
        url: '/api-zt/slOrder/pageToExcelList',
        method: 'post',
        data,
    })
}


export function getOrderDetail(id) {
    return request({
        url: '/api-zt/slOrder/getOrderByOrderId?id=' + id,
        method: 'get'
    });
}

export function getRefundOrderDetail(id) {
    return request({
        url: '/api-zt/slOrderRefund/info?id=' + id,
        method: 'get'
    });
}

// 查看商品所属商店的详情
export function getShopDetail(id) {
    return request({
        url: '/api-zt/slShopMg/selShopByShopId?shopId=' + id,
        method: 'get',
    })
}