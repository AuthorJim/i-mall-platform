/*
 * @Author: AuthorJim 
 * @Date: 2017-07-05 15:10:41 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-07 14:33:33
 */
require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index.js')
var _product = require('service/product-service.js')
var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var navSide = require('../common/nav-side/index')
var Pagination = require('util/pagination/index')
var templete = require('./index.string')

// 订单管理页
var orderList = {
    data: {
        orderNo: _util.getUrlParam('order-Number')
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.cancel-btn', function () {
            if (window.confirm('确定要删除该订单吗？')) {
                _order.cancelOrder(_this.data.orderNo, function (res) {
                    _util.successTips('该订单已取消')
                    _this.loadOrderDetail()
                    $('.order.status').text('已取消')
                }, function (errMsg) {
                    _util.errorTips(errMsg)
                })
            }
        })
    },
    onLoad: function () {
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderDetail()
    },
    // 获取订单详情
    loadOrderDetail: function () {
        var _this = this,
            $content = $('.content'),
            orderDetailHtml = ''
        $content.html('<div class="loading"></div>')
        _order.getOrderDetail(_this.data.orderNo, function (res) {
            _this.dataFilter(res)
            orderDetailHtml = _util.renderHtml(templete, res)
            $content.html(orderDetailHtml)
        }, function (errMsg) {
            _util.errorTips(errMsg)
        })
    },
    // 数据适配
    dataFilter: function (data) {
        data.needPay = data.status === 10
        data.isCancelable = data.status === 10
    }
}

$(function () {
    orderList.init()
})