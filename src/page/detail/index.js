/*
 * @Author: AuthorJim 
 * @Date: 2017-07-01 15:39:11 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-01 17:46:29
 */
require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index.js')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')
var templete = require('./index.string')

// 商品详情页逻辑
var detailPage = {
    data: {
        productId: _util.getUrlParam('productId') || ''
    },
    init: function () {
        // alert('fuck')
        this.onload()
        this.bindEvent()
    },
    onload: function () {
        // 如果没有传productID，自动跳回首页
        if (!this.data.productId) {
            _util.goHome()
        }
        this.loadDetail()
    },
    bindEvent: function () {
        var _this = this
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function () {
            var imgUrl = $(this).find('.p-img').attr('src')
            $('.main-img').attr('src', imgUrl)
        })
        // count
        $(document).on('click', '.p-count-btn', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currentCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1
            if (type === 'plus') {
                $pCount.val(currentCount < maxCount ? currentCount + 1 : maxCount)
            } else if (type === 'minus') {
                $pCount.val(currentCount > minCount ? currentCount - 1 : minCount)
            }
        })
        // 加入购物车
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            },function (res) {
                window.location.href = './result.html?type=cart-add'
            },function (errMsg) {
                _util.errorTips(errMsg)
            })
        })
    },
    // 加载商品详情信息
    loadDetail: function () {
        var _this = this
        var html = ''
        var $pageWrap = $('.page-wrap')
        // 加载loading
        $pageWrap.html('<div class="loading"></div>')
        // 请求detail数据
        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res)
            // 保存detail中的数据
            _this.data.detailInfo = res
            // 渲染html
            html = _util.renderHtml(templete, res)
            $pageWrap.html(html)
        }, function (errMsg) {
            $pageWrap.html('<p class="error-tip">此商品生产厂家已经带着小姨子跑路了</p>')
        })
    },
    // 数据匹配
    filter: function (data) {
        data.subImages = data.subImages.split(',')
    }
}

$(function () {
    detailPage.init()
})