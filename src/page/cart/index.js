/*
 * @Author: AuthorJim 
 * @Date: 2017-07-01 18:14:18 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-02 14:51:57
 */

require('../common/header/index')
require('./index.css')
var navPage = require('../common/nav/index')
var _util = require('util/index.js')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')
var templete = require('./index.string')

// 购物车逻辑
var cartPage = {
    data: {

    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadCart()
    },
    bindEvent: function () {
        var _this = this
        // 商品选中、取消
        $(document).on('click', '.cart-select', function () {
            var $this = $(this)
            var productId = $this.parents('.cart-table').data('product-id')
            // 切换选中状态
            if ($this.is(':checked')) {
                // 选中
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showErrorMsg(errMsg)
                })
            } else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showErrorMsg(errMsg)
                })
            }
        })
        // 全选/全不选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this)
            // 切换选中状态
            if ($this.is(':checked')) {
                // 选中
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showErrorMsg(errMsg)
                })
            } else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showErrorMsg(errMsg)
                })
            }
        })
        // 商品数量的变化绑定
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                currentCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _util.errorTips('该商品数量达到上限')
                    return
                }
                newCount = currentCount + 1
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return
                }
                newCount = currentCount - 1
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res)
            }, function (errMsg) {
                _this.showErrorMsg(errMsg)
            })
        })
        // 删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确认要删除该商品？')) {
                var productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })
        // 删除选中商品
        $(document).on('click', '.delete-selected', function () {
            if (window.confirm('确认要删除选中商品？')) {
                var arrProductIds = []
                $selectedItem = $('.cart-select:checked')
                // 循环选中的product
                for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'))
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','))
                } else {
                    _util.errorTips('您还没有选中要删除的商品')
                }
            }
        })
        // 提交购物车
        $(document).on('click', '.btn-submit', function () {
            // 当总价大于0时，进行提交
            if (_this.data.cartInfo&&_this.data.cartInfo.cartTotalPrice>0) {
                window.location.href = './order-confirm.html'
            }else{
                _util.errorTips('请选择商品后再提交')
            }
        })
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this
        _cart.getCartList(function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _this.showErrorMsg()
        })
    },
    // 渲染购物车
    renderCart: function (data) {
        this.filter(data)
        // 缓存购物车信息
        this.data.cartInfo = data
        // 生成html
        var cartHtml = _util.renderHtml(templete, data)
        $('.page-wrap').html(cartHtml)
        // 当商品数量改变时，通知修改nav中的购物车数
        navPage.loadCartCount()
    },
    // 删除指定商品，支持批量，productId用都会分割
    deleteCartProduct: function (productIds) {
        var _this = this
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _this.showErrorMsg()
        })
    },

    // 数据匹配
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length
    },
    // 展示错误信息
    showErrorMsg: function () {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
    }
}

$(function () {
    cartPage.init()
})