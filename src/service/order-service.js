/*
 * @Author: AuthorJim 
 * @Date: 2017-07-02 14:52:36 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-05 17:41:56
 */

var _util = require('util/index')

var _order = {
    // 获取商品列表
    getProductList: function (reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/order/get_order_cart_product.do'),
            success: reslove,
            error: reject
        })
    },
    // 提交订单
    createOrder: function (orderInfo, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: reslove,
            error: reject
        })
    },
    // 获取订单列表
    getOrderList: function (listParam, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/order/list.do'),
            data: listParam,
            success: reslove,
            error: reject
        })
    },
    // 获取订单详情
    getOrderDetail: function (orderNo, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: reslove,
            error: reject
        })
    },
    // 获取订单详情
    cancelOrder: function (orderNo, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: reslove,
            error: reject
        })
    }
}

module.exports = _order