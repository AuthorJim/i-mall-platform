/* 
 * @Author: AuthorJim 
 * @Date: 2017-06-28 17:39:40 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 17:32:52
 */

require('../common/header/index')
require('../common/nav/index')
require('./index.css')
require('util/slider/index.js')
var _util = require('util/index.js')
var templete = require('./index.string')
$(function () {
    var bannerHtml = _util.renderHtml(templete)
    $('.banner-con').html(bannerHtml)
    // $('.banner').unslider({
    //     dots: true
    // })
    var unslider = $('.banner').unslider({
        dots: true
    })
    $('.banner-con .banner-arrow').click(function () {
        var forword = $(this).hasClass('prev') ? 'prev' : 'next'
        unslider.data('unslider')[forword]()
    })
})