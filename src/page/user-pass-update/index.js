/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 13:32:10 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 14:12:31
 */

require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index')
var _user = require('service/user-service.js')
var navSide = require('../common/nav-side/index')

// user-pass-update逻辑
var userPassUpdate = {
    init: function () {
        this.onLaod()
        this.bindEvent()
    },
    onLaod: function () {
        navSide.init({
            name: 'user-pass-update'
        })
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.pass-btn', function () {
            _this.submit()
        })
    },
    // 提交新密码
    submit: function () {
        var userInfo = {
            password: $.trim($('#password').val()),
            passwordNew: $.trim($('#password-new').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
        }
        var validateResult = this.formValidate(userInfo)
        // 验证通过，更新密码
        if (validateResult.status) {
            _user.updatePassword({
                password: userInfo.password,
                passwordNew: userInfo.passwordNew
            }, function (res, msg) {
                _util.successTips(msg)
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
        if (!_util.validate(userInfo.password, 'require')) {
            result.msg = '请输入原密码'
            return result
        }
        if (!userInfo.passwordNew || userInfo.passwordNew.length < 6) {
            result.msg = '密码长度不能少于6位'
            return result
        }
        if (userInfo.passwordNew !== userInfo.passwordConfirm) {
            result.msg = '两次密码不一致'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function () {
    userPassUpdate.init()
})