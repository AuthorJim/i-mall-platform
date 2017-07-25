/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 17:49:53 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-01 16:59:01
 */
var _util = require('util/index')

var _product = {
    // 获取商品列表
    getProductList: function (listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },
    // 获取商品详细信息
    getProductDetail: function (productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    }
}

module.exports = _product