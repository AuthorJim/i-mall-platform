/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 15:49:45 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-11 13:16:42
 */
var _util = require('util/index')

var _user = {
    // 检查登陆状态
    checkLogin: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 注册账户
    register: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取密码提示问题
    getQuestion: function (username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 校验答案
    checkAnswer: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 重置密码
    resetPassword: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取用户信息
    getUserInfo: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 更新个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 更新密码
    updatePassword: function (userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 用户登出
    logout: function (resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user