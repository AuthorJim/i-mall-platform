/*
 * @Author: AuthorJim 
 * @Date: 2017-07-02 15:46:03 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-05 14:36:48
 */
var _util = require('util/index')

var _address = {
    // 获取地址列表
    getAddressList: function (reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: reslove,
            error: reject
        })
    },
    // 保存收货地址
    save: function (addressInfo, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: reslove,
            error: reject
        })
    },
    // 获取收货地址
    update: function (addressInfo, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: reslove,
            error: reject
        })
    },
    // 删除收货地址
    deleteAddress: function (shippingId, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: reslove,
            error: reject
        })
    },
    // 获取收货地址
    getAddress: function (shippingId, reslove, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: reslove,
            error: reject
        })
    },
}

module.exports = _address