/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 17:31:35 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 12:52:54
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

var registerPage = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        // 用户名验证
        $('#username').blur(function () {
            var username = $.trim($(this).val())
            // 异步验证用户名是否存在
             _user.checkUsername(username, function (res) {
                formError.hide()
            }, function (errMsg) {
                formError.show(errMsg)
            })
           if (!username) {
               return
           }
        })
        // 点击注册提交注册
        $('#register').click(function () {
            _this.submit()
        })
        // 按下enter提交注册
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit()
            }
        })
    },
    // 提交选项
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        // 表单验证
        var validateResult = this.formValidate(formData)
        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register'
            }, function (errMsg) {
                formError.show(errMsg)
            })
        } else {
            formError.show(validateResult.msg)
        }
    },
    // 表单字段的验证
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
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位'
            return result
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次密码不一致'
            return result
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '请输入11位手机号'
            return result
        }
        if (!_util.validate(formData.email, 'email')) {
            result.msg = '请输入有效邮箱地址'
            return result
        }
        if (!_util.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空'
            return result
        }
        if (!_util.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function () {
    registerPage.init()
})