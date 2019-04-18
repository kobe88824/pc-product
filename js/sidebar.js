; (function ($) {
    if (getCookie('user')) {
        var user = getCookie('user')
        $('.sidebar .myld').addClass('lt').find('span').html(user+' ')
        // console.log(user)
    }
})(jQuery)
 
 //============侧边栏点击返回顶部
    ; (function($){
        $('.sidebar-bottom').click(function () {
            $('body,html').animate({ scrollTop: 0 }, 500)
        })
})(jQuery)
//===============侧边栏全部商品分类样式
; (function($){
    var winH = window.innerHeight;
        $('.sidebar .all-class-list-box').css({height:winH-90})
        $(window).resize(function () {
            winH = window.innerHeight;
        $('.sidebar .all-class-list-box').css({height:winH-90})
        })
    $('.sidebar .all-class-list-box h4').click(function (e) {
        e.stopPropagation();
        $(this).next().show().parent().siblings().children('p').hide()
    })
})(jQuery)
    //===========点击侧边栏 改变颜色/隐藏弹出框
    ; (function ($) {
        $('.sidebar').find('.btn').click(function () {
            $(this).toggleClass('all-class').children().toggleClass('active')//改变点击元素背景颜色+改变下边框
            $(this).siblings().removeClass('all-class').children().removeClass('active')//改变点击元素置兄弟元素背景颜色+改变下边框
            $(this).parent().siblings().find('.btn').removeClass('all-class').children().removeClass('active')//改变点击位置兄弟元素背景颜色+改变下边框
            $(this).find('.lt').toggleClass('lt-active')//显示点击元素对应的弹框
            $(this).siblings().find('.lt').removeClass('lt-active')//隐藏点击元素兄弟对应的弹框
            $(this).parent().siblings().find('.lt').removeClass('lt-active')//隐藏点击元素兄弟对应的弹框
        })
        $('.sidebar .sidebar-middle').find('.btn').eq(1).on('click mouseenter mouseleave', function (e) {
            if (e.type == 'click') {
                $('.sidebar').toggleClass('sidebar-cl');
                $(this).toggleClass('btn-cl')
            }else if (e.type=='mouseenter') {
                $('.sidebar').addClass('sidebar-m');
                $(this).addClass('btn-m')
            }if (e.type=='mouseleave') {
                $('.sidebar').removeClass('sidebar-m');
                $(this).removeClass('btn-m')
            }
        })
        //==============点击其他位置隐藏
        $('body').click(function () {
            $('.sidebar').find('.btn').removeClass('all-class').children().removeClass('active')
            $('.sidebar').find('.lt').removeClass('lt-active')
        })
        //===============阻止冒泡
        $('.sidebar').click(function (e) {
            e.stopPropagation()
        })
    })(jQuery)
    //================点击出现登录框
    ; (function ($) {
        $('.sidebar .btn2').click(function () {
            if (!getCookie('user')) {
                $('.header .ceng').show()
            }
        })
    })(jQuery)
    // ; (function ($) {
    //     $('.sidebar .new-car').click(function (e) {
    //         e.stopPropagation()
    //     })
    // })(jQuery)
    ; (function($){
        var winH = window.innerHeight;
            $('.sidebar .car-main').css({height:winH-150})
            $(window).resize(function () {
                winH = window.innerHeight;
            $('.sidebar .car-main').css({height:winH-150})
            })
        $('.sidebar .new-car').click(function (e) {
            e.stopPropagation()
        })
    })(jQuery)


