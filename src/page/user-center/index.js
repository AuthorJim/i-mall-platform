/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 10:36:58 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 12:23:24
 */
require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index')
var _user = require('service/user-service.js')
var navSide = require('../common/nav-side/index')
var template = require('./index.string')

// user-center逻辑
var userCenterPage = {
    init: function () {
        this.onload()
        this.loadUserInfo()
    },
    // 加载个人中心页面
    onload: function () {
        navSide.init({
            name: 'user-center'
        })
    },
    // 加载个人信息
    loadUserInfo: function () {
        var userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = _util.renderHtml(template, res)
            $('.panel-body').html(userHtml)
        },function (errMsg) {
            _util.errorTips(errMsg)
        })
    }
}

$(function () {
    userCenterPage.init()
})