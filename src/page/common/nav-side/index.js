/*
 * @Author: AuthorJim 
 * @Date: 2017-06-29 12:11:42 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-29 12:59:41
 */
require('./index.css')
var _utils = require('util/index.js')
var template = require('./index.string')

// nav-side逻辑
var navSide = {
    option: {
        name: '',
        navList: [{
                name: 'user-center',
                desc: '个人中心',
                href: './user-center.html'
            },
            {
                name: 'order-list',
                desc: '我的订单',
                href: './order-list.html'
            },
            {
                name: 'user-pass-update',
                desc: '修改密码',
                href: './user-pass-update.html'
            },
            {
                name: 'about',
                desc: '关于MMall',
                href: './about.html'
            }
        ]
    },
    init: function (option) {
        // 合并选项
        $.extend(this.option, option)
        this.renderNav()
    },
    // 渲染nav-side
    renderNav: function () {
        // 计算active属性
        for (i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
            }
        }
        // 渲染nav结构
        var navHtml = _utils.renderHtml(template, {
            navList: this.option.navList
        })
        $('#nav-side').html(navHtml)
    }
}

module.exports = navSide