import $router from '../router'
export function routesGo(val) {
    if (val == "商品列表") {
        $router.push({ path: "/pms/product" });
    } else if (val == "匀贸订单") {
        $router.push({ path: "/oms/order" });
    } else if (val == "退款订单列表") {
        $router.push({ path: "/oms/deliverOrderList" });
    } else if (val == "代理分润") {
        $router.push({ path: "/ums/memberLevel" });
    } else if (val == "会员资产") {
        $router.push({ path: "/ums/school" });
    } else if (val == "会员列表") {
        $router.push({ path: "/ums/member" });
    } else if (val == "下级及消费管理") {
        $router.push({ path: "/cms/help" });
    } else if (val == "商户打款/结算记录") {
        $router.push({ path: "/sms/homeHot" });
    } else if (val == "店铺订单明细") {
        $router.push({ path: "/sms/homeNew" });
    } else if (val == "店铺管理") {
        $router.push({ path: "/sms/homeAdvertise" });
    } else if (val == "用户管理") {
        $router.push({ path: "/sys/admin" });
    } else if (val == "角色管理") {
        $router.push({ path: "/sys/role" });
    } else if (val == "菜单管理") {
        $router.push({ path: "/sys/permission" });
    } else if (val == "一号专区管理") {
        $router.push({ path: "/pms/productCate" })
    }
}