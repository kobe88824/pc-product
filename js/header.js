//=====================头部效果
; (function ($) {
    //鼠标经过我的莱顿效果
    $('.js_myaccount').hover(function () {
        $(this).children().eq(0).addClass('active')
        $('.js_myaccount i').removeClass('fa-angle-down').addClass('fa-angle-up')
        $('.js_myaccount .myaccount-list').show()
    }, function () {
        $(this).children().eq(0).removeClass('active')
        $('.js_myaccount i').removeClass('fa-angle-up').addClass('fa-angle-down')
        $('.js_myaccount .myaccount-list').hide()
    })
    //鼠标经过手机莱顿效果
    $('.js_down-app').hover(function () {
        $(this).children().eq(0).addClass('active').next().show()
        $('.js_down-app i').removeClass('fa-angle-down').addClass('fa-angle-up')
    }, function () {
        $(this).children().eq(0).removeClass('active').next().hide()
        $('.js_down-app i').removeClass('fa-angle-up').addClass('fa-angle-down')
    })
    //鼠标经过帮助中心效果
    $('.js_help-center').hover(function () {
        $(this).children().eq(0).addClass('active')
        $('.js_help-center i').removeClass('fa-angle-down').addClass('fa-angle-up')
        $('.js_help-center .help-center-list').show()
    }, function () {
        $(this).children().eq(0).removeClass('active')
        $('.js_help-center i').removeClass('fa-angle-up').addClass('fa-angle-down')
        $('.js_help-center .help-center-list').hide()
    })
    //鼠标经过全部商品分类
    $('.js_all-class').hover(function () {
        $(this).children().eq(0).addClass('active').next().stop(true, true).slideDown("fast")
        $('.js_all-class .fa').removeClass('fa-angle-down').addClass('fa-angle-up')
    }, function () {
        $(this).children().eq(0).removeClass('active').next().stop(true, true).slideUp("fast")
        $('.js_all-class .fa').removeClass('fa-angle-up').addClass('fa-angle-down')
    })
})(jQuery)
    

