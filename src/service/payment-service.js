/*
 * @Author: AuthorJim 
 * @Date: 2017-07-07 15:00:38 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-07 15:09:11
 */
var _util = require('util/index.js')

var _paymentService = {
    // 获取支付信息
    getPaymentInfo: function (orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    },
     // 获取支付信息
    getPaymentStatus: function (orderNo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    }
}

module.exports = _paymentService