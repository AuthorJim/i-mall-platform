/*
 * @Author: AuthorJim 
 * @Date: 2017-07-01 15:41:27 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-02 13:08:12
 */

var _util = require('util/index')

var _product = {
    // 获取购物车商品数量
    getCartCount: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    },
    // 加入到购物车
    addToCart: function (productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 获取购物车数据
    getCartList: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        })
    },
    // 选择购物车商品
    selectProduct: function (productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    // 取消选择购物车商品
    unselectProduct: function (productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    // 全部选择商品
    selectAllProduct: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        })
    },
    // 取消全部选择商品
    unselectAllProduct: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        })
    },
    // 更细购物车商品数量
    updateProduct: function (productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 删除商品
    deleteProduct: function (productIds, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        })
    }
}

module.exports = _product