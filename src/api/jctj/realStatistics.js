import request from '@/utils/request'
// // 实时统计数据:1新增用户2启动APP次数3提交订单用户数4.购物券营收5.现金营收6支付成功用户数7.分时启动APP次数8.分时新增用户
// //新增用户
export function newlyDataAdded() {
  return request({
    url:'/api-zt/rtm/rtmTodayList',
    method:'POST',
  })
}
// export function newlyAdded() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:1
//     }
//   })
// }
// //启动APP次数
// export function startUp() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:2
//     }
//   })
// }
// //提交订单用户数
// export function orderNumber() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:3
//     }
//   })
// }
// //购物券营收
// export function couponRevenue() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:4
//     }
//   })
// }
// //现金营收
// export function cashRevenue() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:5
//     }
//   })
// }
// //支付成功用户数
// export function successfulUsers() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:6
//     }
//   })
// }
// //分时启动APP次数
// export function timeSharingStart() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:7
//     }
//   })
// }
// //分时新增用户
// export function addUsersTime() {
//   return request({
//     url:'/api-zt/rtm/rtmList',
//     method:'POST',
//     params:{
//       rtmType:8
//     }
//   })
// }