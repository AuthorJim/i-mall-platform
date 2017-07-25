/*
 * @Author: AuthorJim 
 * @Date: 2017-06-28 20:19:26 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-06-30 17:40:35
 */
require('./index.css')
var _util = require('util/index.js')
var $searchInput = $('#search-input')

// 通用头部逻辑
var header = {
    init: function () {
        this.onload()
        this.bindEvent()
    },
    onload: function () {
        var keyword = _util.getUrlParam('keyword')
        // 当存在keyword时，就回填入搜索框
        if (keyword) {
            $searchInput.val(keyword)
        }
    },
    // 事件处理方法
    bindEvent: function () {
        var _this = this
        // 点击搜索按钮提交搜索请求
        $('#search-btn').click(function () {
            _this.submitSearch()
        })
        // 按下enter键提交搜索
        $searchInput.keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submitSearch()
            }
        })
    },
    // 搜索提交
    submitSearch: function () {
        var keyword = $.trim($searchInput.val())
        // 如果搜索框中存在keyword，那就正常跳转到list页面
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword
        } else {
            _util.goHome()
        }
    }

}

header.init()