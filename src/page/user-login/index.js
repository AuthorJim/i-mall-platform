/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 14:28:33 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 13:10:41
 */
require('./index.css')
require('../common/nav-simple/index.css')
var _util = require('util/index')
var _user = require('service/user-service.js')

// 表单中的错误提示
var formError = {
    show: function (errMsg) {
        $('#error-item').show().find('.err-msg').text(errMsg)
    },
    hide: function () {
         $('#error-item').hide()
    }
}

// page逻辑
var userPage = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        // 登录按钮点击提交
        $('#submit').click(function () {
            _this.submit()
        })
        // 按下enter键提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit()
            }
        })
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }
        // 表单验证结果
        var validateResult = this.formValidate(formData)
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _util.getUrlParam('redirect') || './index.html'
            }, function (errMsg) {
                formError.show(errMsg)
            })
        } else {
           formError.show(validateResult.msg)
        }
    },
    // 表单字段验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空'
            return result
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function () {
    userPage.init()
})