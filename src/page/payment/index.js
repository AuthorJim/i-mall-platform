/*
 * @Author: AuthorJim 
 * @Date: 2017-07-07 14:39:03 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-07 15:19:27
 */
require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index.js')
var _payment = require('service/payment-service.js')
var templete = require('./index.string')

var paymentPage = {
    data: {
        orderNumber: _util.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        this.loadPaymentInfo()
    },
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap')
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHtml = _util.renderHtml(templete, res)
            $pageWrap.html(paymentHtml)
            _this.listenOrderStatus()
        }, function (errMsg) {
            $pageWrap.html('<p class="error-tip">' + errMsg + '</p>')
        })
    },
    // 监听订单状态
    listenOrderStatus: function () {
        var _this = this
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res === true) {
                    window.location.href = './result.html?type=payment&&orderNumber=' + _this.data.orderNumber
                }
            }, function (errMsg) {

            })
        }, 5000)
    }
}

$(function () {
    paymentPage.init()
})