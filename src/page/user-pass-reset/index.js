/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 23:13:15 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-11 13:13:46
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

// 找回密码页面逻辑
var resetPassword = {
    data: {
        username: '',
        question: '',
        password: '',
        token: ''
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadStepUsername()
    },
    bindEvent: function () {
        var _this = this
        // 点击username下一步进入question选项
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val())
            // 当用户名存在时
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username
                    _this.data.question = res
                    _this.loadStepQuestion()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名')
            }
        })
        // 点击question下一步进入question选项
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val())
            // 当用户名存在时
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer
                    _this.data.token = res
                    _this.loadStepPassword()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入答案')
            }
        })
        // 点击question下一步进入question选项
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val())
            // 当输入新密码后
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset'
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入不少于6位的新密码')
            }
        })
    },
    // 加载输入username步骤
    loadStepUsername: function () {
        $('.step-username').show()
    },
    // 加载输入question步骤
    loadStepQuestion: function () {
        formError.hide()
        // 容器切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
    },
    // 加载输入password步骤
    loadStepPassword: function () {
        formError.hide()
        // 容器切换
        $('.step-question').hide().siblings('.step-password').show()
    }
}


$(function () {
    resetPassword.init()
})