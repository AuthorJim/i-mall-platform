/*
 * @Author: AuthorJim 
 * @Date: 2017-07-05 15:10:41 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-05 17:26:47
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
        listParam: {
            pageNum: 1,
            pageSize: 3
        }
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderList()
    },
    // 加载订单列表
    loadOrderList: function () {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con')
        $('.address-con').html('<div class="loading"></div>')
        _order.getOrderList(this.data.listParam, function (res) {
            orderListHtml = _util.renderHtml(templete, res)
            $listCon.html(orderListHtml)
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage, // 是否有前一页
                hasNextPage: res.hasNextPage, // 是否有下一页
                nextPage: res.nextPage,
                prePage: res.prePage,
                pageNum: res.pageNum, // 当前选择页页码
                pages: res.pages // 总页数
            })
        }, function (errMsg) {
            $listCon.html('<div class="error-tip">加载订单失败</div>')
        })
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this
        // _this.pagination ? '' : (_this.pagination = new Pagination())
        _this.pagination = new Pagination()
        _this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum
                _this.loadOrderList()
            }
        }))
    }
}

$(function () {
    orderList.init()
})