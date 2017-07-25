/*
 * @Author: AuthorJim 
 * @Date: 2017-07-02 14:51:16 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-05 15:08:44
 */
require('../common/header/index')
require('./index.css')
require('../common/nav/index')
var _util = require('util/index.js')
var _product = require('service/product-service.js')
var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var addressModal = require('./address-modal.js')
var templeteAddress = require('./address-list.string')
var templeteProduct = require('./product-list.string')

// 订单页逻辑
var orderPage = {
    data: {
        selectAddressId: null
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        // 地址选中事件
        $(document).on('click', '.address-item', function () {
            var $this = $(this)
            // $this.addClass('active').siblings('.address-item').removeClass('active')
            if (!$this.hasClass('active')) {
                $this.addClass('active').siblings('.address-item').removeClass('active')
            }else {
                 $this.removeClass('active')
            }
            _this.data.selectAddressId = $this.data('id')
        })
        // 提交订单
        $(document).on('click', '.order-submit', function () {
            var $this = $(this)
            var shippingId = _this.data.selectAddressId
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNum=' + res.orderNo
                }, function (errMsg) {
                    _util.errorTips(errMsg)
                })
            } else {
                _util.errorTips('请选择地址后再提交')
            }
        })
        // 修改地址
        $(document).on('click', '.address-edit', function (e) {
            e.stopPropagation()
            var shippingId = $(this).parents('.address-item').data('id')
            // 获取当前地址的信息
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList()
                    }
                })
            }, function (errMsg) {
                _util.errorTips(errMsg)
            })
        })
        // 编辑新地址
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList()
                }
            })
        })
        // 删除地址
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation()
            var shippingId = $(this).parents('.address-item').data('id')
            if (window.confirm("确认要删除该地址吗")) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList()
                }, function (errMsg) {
                    _util.errorTips(errMsg)
                })
            }
            // 获取当前地址的信息
        })
    },
    addressFilter: function (data) {
        if (this.data.selectAddressId) {
            var flag = false
            for (var i = 0, iLength = data.list.length; i < iLength; i ++) {
                if (data.list[i].id === this.data.selectAddressId) {
                    data.list[i].isActive = true
                    flag = true
                }
            }
            if (flag) {
                this.data.selectAddressId = null
            }
        }
    },
    onLoad: function () {
        this.loadAddressList()
        this.loadProductList()
    },
    // 加载地址列表
    loadAddressList: function () {
        var _this = this
        $('.address-con').html('<div class="loading"></div>')
        // 获取地址列表
        _address.getAddressList(function (res) {
            _this.addressFilter(res)
            var addressListHtml = _util.renderHtml(templeteAddress, res)
            $('.address-con').html(addressListHtml)
        }, function (errMsg) {
            $('.address-con').html('<p class="error-tip">地址加载失败，请刷新后重试</p>')
        })
    },
    // 加载商品列表
    loadProductList: function () {
        var _this = this
        $('.product-con').html('<div class="loading"></div>')
        // 获取地址列表
        _order.getProductList(function (res) {
            var productListHtml = _util.renderHtml(templeteProduct, res)

            $('.product-con').html(productListHtml)
        }, function (errMsg) {
            $('.product-con').html('<p class="error-tips">商品信息加载失败，请刷新后重试</p>')
        })
    }
}

$(function () {
    orderPage.init()
})