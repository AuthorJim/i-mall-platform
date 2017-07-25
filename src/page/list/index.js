/*
 * @Author: AuthorJim 
 * @Date: 2017-06-30 17:39:15 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-01 16:54:09
 */
require('../common/header/index')
require('../common/nav/index')
require('./index.css')
var _util = require('util/index.js')
var _product = require('service/product-service.js')
var Pagination = require('util/pagination/index.js')
var templete = require('./index.string')

// 列表页逻辑
var listPage = {
    data: {
        listParam: {
            keyword: _util.getUrlParam('keyword') || '',
            categoryId: _util.getUrlParam('categoryId') || '',
            orderBy: _util.getUrlParam('orderBy') || 'default', // 排序方式
            pageNum: _util.getUrlParam('pageNum') || 1, // 当前页码
            pageSize: _util.getUrlParam('pageSize') || 3 // 每页显示的商品数
        }
    },
    init: function () {
        this.bindEvent()
        this.onLoad()
    },
    onLoad: function () {
        this.loadList()
    },
    bindEvent: function () {
        var _this = this
        // 排序的点击事件
        $('.sort-item').click(function () {
            var $this = $(this)
            // alert('fuck')
            _this.data.listParam.pageNum = 1
            if ($this.data('type') === 'default') {
                // 判断是否是active样式
                if ($this.hasClass('active')) {
                    return
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            } else if ($this.data('type') === 'price') {
                // 添加active样式
                $this.addClass('active').siblings('.sort-item').removeClass('active desc asc')
                // 升、降序处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                } else {
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc'
                }

            }
            _this.loadList()
        })
    },
    // 加载list数据
    loadList: function () {
        var listParam = this.data.listParam
        var listHtml = ''
        var _this = this
        var $listCon = $('.p-list-con')
        // 每次加载列表出现loading动画
        $listCon.html('<div class="loading"></div>')
        // 删除多余参数
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
        // 获取列表数据
        _product.getProductList(listParam, function (res) {
            listHtml = _util.renderHtml(templete, {
                list: res.list
            })
            $listCon.html(listHtml)
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,   // 是否有前一页
                hasNextPage: res.hasNextPage,           // 是否有下一页
                nextPage: res.nextPage,                 
                prePage: res.prePage,
                pageNum: res.pageNum,                   // 当前选择页页码
                pages: res.pages                        // 总页数
            })
        }, function (errMsg) {
            $listCon.html('<p class="error-tip">并未找到您要的商品</p>')
        })
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this
        // this.pagination ? '' : new Pagination()
        this.pagination =  new Pagination()
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum
                _this.loadList()
            }
        }))
    }
}

$(function () {
    listPage.init()
})