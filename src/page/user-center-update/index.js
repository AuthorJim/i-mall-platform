/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 12:15:25 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 13:19:36
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
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.edit-btn', function () {
            _this.submit()
        })
    },
    // 加载个人中心页面
    onload: function () {
        navSide.init({
            name: 'user-center'
        })
        this.loadUserInfo()
    },
    // 加载个人信息
    loadUserInfo: function () {
        var userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = _util.renderHtml(template, res)
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _util.errorTips(errMsg)
        })
    },
    // 提交修改
    submit: function () {
        var userInfo = {
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        var validateResult = this.formValidate(userInfo)
        // 验证通过，修改用户信息
        if (validateResult.status) {
            _user.updateUserInfo(userInfo, function (res, msg) {
                _util.successTips(msg)
                window.location.href = './user-center.html'
            }, function (errMsg) {
                _util.errorTips(errMsg)
            })
        } else {
            _util.errorTips(validateResult.msg)
        }
    },
    // 表达字段验证
    formValidate: function (userInfo) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(userInfo.phone, 'phone')) {
            result.msg = '请输入11位手机号'
            return result
        }
        if (!_util.validate(userInfo.email, 'email')) {
            result.msg = '请输入有效的邮箱地址'
            return result
        }
        if (!_util.validate(userInfo.question, 'require')) {
            result.msg = '密码提示问题不能为空'
            return result
        }
        if (!_util.validate(userInfo.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function () {
    userCenterPage.init()
})