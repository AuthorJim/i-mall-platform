/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 20:55:11 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-01 15:23:58
 */
require('./index.css')
var _util = require('util/index.js')
var templete = require('./index.string')

var Pagination = function () {
    var _this = this
    this.defaultOption = { // 默认选项
        constainer: null, // 挂载容器
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }
    // 按钮点击事件处理
    $(document).on('click', '.pg-item', function () {
        var $this = $(this)
        // 当点击元素为disab或active状态时，不做处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null
    })
}
// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption)
    // 判断容器是否为合法jQuery对象
    if ((!this.option.constainer instanceof jQuery)) {
        return
    }
    // 判断是否只有一页，当只有一页时，分页对象不需要显示
    if (this.option.pages <= 1) {
        return
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml())
}
// 获取分页的html
Pagination.prototype.getPaginationHtml = function () {
    // |上一页| 1 2 3 4 =5= 6 |下一页| 5/6
    var html = '',
        option = this.option,
        pageArray = [],         // 存放上一页、下一页按钮的数组
        start = (option.pageNum - option.pageRange) > 0 ? (option.pageNum - option.pageRange) : 1,
        end = (option.pageNum + option.pageRange) < option.pages ? (option.pageNum + option.pageRange) : option.pages
    // 上一页按钮数据
    pageArray.push({
        name: '上一页',                        // 呈现的样式
        value: option.prePage,           // 返回的页码值
        disabled: !option.hasPreviousPage        // 是否可用
    })
    // 数字按钮处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,                        
            value: i,   
            active: (i === option.pageNum),                           // 是否为当前选中页               
        })
    }
    // 下一页按钮数据
    pageArray.push({
        name: '下一页',                        // 呈现的样式
        value: option.nextPage,           // 返回的页码值
        disabled: !option.hasNextPage        // 是否可用
    })
    html = _util.renderHtml(templete, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    })
    return html
}

module.exports = Pagination