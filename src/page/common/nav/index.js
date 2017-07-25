/*
 * @Author: AuthorJim 
 * @Date: 2017-06-28 20:48:57 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-02 14:13:44
 */

require('./index.css');
var _util     = require('util/index.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');

// nav 逻辑
var navPage = {
    init: function () {
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartCount()
        return this
    },
    bindEvent: function () {
        // 登录账户
        $('.js-login').click(function () {
            _util.doLogin()
        })
        // 注册账户
        $('.js-register').click(function () {
           window.location.href = './user-register.html'
        })
        // 退出账号
        $(document).on('click', '.logout', function () {
            _user.logout(function () {
               window.location.reload()
           },function (errMsg) {
               _util.errorTips(errMsg)
           })
        })
    },
    // 加载用户登录信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.not-login').hide().siblings('.login').show()
            $('#p-username').text(res.username)
        },function (params) {
            // Fuck
        })
    },
    // 加载购物车商品数量
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.cart-count').text(res || 0)
        },function (errMsg) {
            $('.cart-count').text(0)
        })
    }
}

module.exports = navPage.init()
