/*
 * @Author: AuthorJim 
 * @Date: 2017-07-02 17:49:19 
 * @Last Modified by: AuthorJim
 * @Last Modified time: 2017-07-05 14:23:58
 */
var _util = require('util/index.js')
var _address = require('service/address-service.js')
var _cities = require('util/cities/index')
var templeteAddressModal = require('./address-modal.string')

// 地址填写框
var addressModal = {
    init: function () {
        this.bindEvent()
    },
    show: function (option) {
        this.$modalWrap = $('.modal-wrap')
        // option的绑定
        this.option = option
        this.option.data = option.data || {}
        // 渲染页面
        this.loadModal()
        // 绑定事件
        this.bindEvent()
    },
    hide: function () {
        $('.modal-wrap').empty()
    },
    bindEvent: function () {
        var _this = this
        // 省份和事件的二级联动
        _this.$modalWrap.find('#receiver-province').change(function () {
            var provinceSelected = $(this).val()
            _this.loadCitise(provinceSelected)
        })
        // 保存收货地址
        _this.$modalWrap.find('.address-btn').click(function () {
            // 收件人信息
            var receiverInfo = _this.getReceiverInfo()
            // 提交新地址，且验证通过
            if (!_this.option.isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function (res) {
                    _util.successTips(receiverInfo.msg)
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' ? _this.option.onSuccess (res) : null
                }, function (errMsg) {
                    _util.errorTips(receiverInfo.msg)
                })
            } else if (_this.option.isUpdate && receiverInfo.status){        // 更新地址，且验证通过
                _address.update(receiverInfo.data, function (res) {
                    _util.successTips('更新地址成功')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function' ? _this.option.onSuccess (res) : null
                }, function (errMsg) {
                    _util.errorTips(receiverInfo.msg)
                })
            }else{
                _util.errorTips(receiverInfo.msg || '哪里出问题了')
            }
        })
        // 阻止modal-container区域的事件冒泡
         _this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation()
         })
         // 关闭地址框
         _this.$modalWrap.find('.m-close').click(function () {
             _this.hide()
         })
    },
    // 加载弹出框
    loadModal: function () {
        // 将弹出框渲染到页面
        var addressHtmlModal = _util.renderHtml(templeteAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        })
        this.$modalWrap.html(addressHtmlModal)
        // 加载省份
        this.loadProvince()
    },
    // 加载省份
    loadProvince: function () {
        var province = _cities.getProvince() || []
        var $provinceSelect = this.$modalWrap.find('#receiver-province')
        $provinceSelect.html(this.getSelectOption(province))
        // 修改地址时，载入原地址省份
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince)
            this.loadCitise(this.option.data.receiverProvince)
        }
    },
    // 加载城市
    loadCitise: function (provinceName) {
        var cities = _cities.getCities(provinceName) || []
        var $citiesSelect = this.$modalWrap.find('#receiver-city')
        $citiesSelect.html(this.getSelectOption(cities))
        // 修改地址时，载入原地址城市
        if (this.option.isUpdate && this.option.data.receiverCity) {
             $citiesSelect.val(this.option.data.receiverCity)
        }
    },
    // 获取select框的选项,传入数组，返回html
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>'
        for (var i = 0, iLength = optionArray.length; i < iLength; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html
    },
    // 获取收件人信息
    getReceiverInfo: function () {
        // 收件人信息
        var receiverInfo = {
            receiverName: $.trim(this.$modalWrap.find('#receiver-name').val()),
            receiverProvince: this.$modalWrap.find('#receiver-province').val(),
            receiverCity: this.$modalWrap.find('#receiver-city').val(),
            receiverAddress: $.trim(this.$modalWrap.find('#receiver-address').val()),
            receiverPhone: $.trim(this.$modalWrap.find('#receiver-phone').val()),
            receiverZip: $.trim(this.$modalWrap.find('#receiver-zip').val()),
            id: this.option.isUpdate ? this.$modalWrap.find('#receiver-id').val() : ''
        }
        var result = {
            status: false
        }
        // 当更新地址时，需传入一个id
        // if (this.option.isUpdate) {
        //     receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val())
        // }
        // 验证表单字段
        if (!receiverInfo.receiverName) {
            result.msg = '请输入收件人姓名'
        } else if (!receiverInfo.receiverProvince) {
            result.msg = '请输入收件人所在省份'
        } else if (!receiverInfo.receiverCity) {
            result.msg = '请输入收件人所在城市'
        } else if (!receiverInfo.receiverAddress) {
            result.msg = '请输入收件人所在详细地址'
        } else if (!receiverInfo.receiverPhone) {
            result.msg = '请输入收件人的手机号'
        } else {
            result = {
                status: true,
                data: receiverInfo,
                msg: '添加地址成功'
            }
        }
        return result
    }
}

module.exports = addressModal