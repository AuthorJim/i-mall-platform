/*
 * @Author: AuthorJim 
 * @Date: 2017-06-28 14:12:04 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 12:59:11
 */

//  通用工具封装
var Hogan = require('hogan')
var conf = {
    serverHost: ''
}
var utils = {
    // 网络请求
    request: function (param) {
        var _this = this
        $.ajax({
            method: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                if (0 === res.status) {
                    // 请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                } else if (10 === res.status) {
                    // 没有登录状态，需要强制登录
                    _this.doLogin()
                } else if (1 === res.status) {
                    // 请求数据错误
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },

    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path
    },

    // 获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },

    // 渲染html模板
    renderHtml: function (htmlTemplate, data) {
        var tempalte = Hogan.compile(htmlTemplate)
        var result = tempalte.render(data)
        return result
    },

    // 成功提示
    successTips: function (msg) {
        alert(msg || '操作成功')
    },

    // 成功提示
    errorTips: function (msg) {
        alert(msg || '哪里出问题了。。。')
    },

    // 表单字段验证,支持是非空、手机号、邮箱的判断
    validate: function (value, type) {
        // 非空验证
        if ('require' === type) {
            return !!value
        }
        // 手机验证
        if ('phone' === type) {
            return (/^1\d{10}$/.test(value))
        }
        // 邮箱验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },

    // 统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect' + encodeURIComponent(window.location.href)
    },

    // 回到主页
    goHome: function () {
        window.location.href = './index.html'
    }
}

module.exports = utils