import request from '@/utils/request'
//代理查询
export function fetchList(params) {
    return request({
        url:'/api-zt/agentInfo/agentDts',
        method:'get',
        params:params
    })
}


export function createMemberLevel(data) {
    return request({
        url:'/api-member/ums/UmsMemberLevel/create',
        method:'post',
        data:data
    })
}

export function deleteMemberLevel(id) {
    return request({
        url:'/api-member/ums/UmsMemberLevel/delete/'+id,
        method:'get',
    })
}

export function getMemberLevel(id) {
    return request({
        url:'/api-member/ums/UmsMemberLevel/'+id,
        method:'get',
    })
}

export function updateMemberLevel(id,data) {
    return request({
        url:'/api-member/ums/UmsMemberLevel/update/'+id,
        method:'post',
        data:data
    })
}

