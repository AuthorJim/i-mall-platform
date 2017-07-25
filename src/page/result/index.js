/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 13:18:54 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-07 15:28:54
 */
require('./index.css')
require('../common/nav-simple/index.css')
var _util = require('util/index.js')

$(function () {
    var type = _util.getUrlParam('type') || 'default'
    var $element = $('.' + type + '-success')
    if (type === 'payment') {
        var $orderNumber = $element.find('.order-number')
        var orderNunmber = _util.getUrlParam('orderNumber')
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNunmber)
    }
    // 显示对应的提示
    $element.show()
})