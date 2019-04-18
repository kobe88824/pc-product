    (function ($) {
    //鼠标经过我的莱顿效果
    $('.js_myaccount').hover(function () {
        console.log(1)
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
    //=====================搜索
    ; (function ($) {
        var time = new Date();
        $('.search .text').keyup(function () {
            $('.search .search-list').html('');
            if ($('.search .text').val()) {
                $.ajax({
                    type: "get",
                    url: "http://search.ule.com/api/suggest.action",
                    jsonpCallback: 'searchList',
                    data: {
                        query: $('.search .text').val(),
                        _: time.getTime(),
                    },
                    dataType: 'jsonp',
                })
            }
           
        })
        
        window.searchList = function (data) {
            $.each(data, function (name, num) {
                var node=$("<li class='clearfix'><p class='fl'>"+name+"</p><p class='fr'>约<span> "+num+" </span>个商品</p></li>")
                $('.search .search-list').append(node)
            })
        }
    })(jQuery)
    // ====================固定定位分类框
    ; (function ($) {
        $(window).scroll(function () {
            var secTop = $(document).scrollTop();//卷起高度
            console.log()
            if (secTop >= 201) {
                $('.content-nav').addClass('fix-connav')
            } else {
                $('.content-nav').removeClass('fix-connav')
            }
        })
    })(jQuery)
    // console.log($('.content-nav').offset().top)
$('.nav-left').on('mouseover',function() {
    $('.item').css('display','block');
})
$('.nav-left').on('mouseout',function() {
    $('.item').css('display','none');
})

$('.content-nav li').click(function() {
    if(!$('.content-nav').hasClass('fix-connav')) {
        $(this).addClass(' nav-hover').siblings().removeClass('nav-hover');
        var setTop = $('.detil').eq($(this).index()).offset().top - 304;
    }else {
        $(this).addClass(' nav-hover').siblings().removeClass('nav-hover');
        var setTop = $('.detil').eq($(this).index()).offset().top - 152;
    }
    $('body,html').stop(true,true).animate({scrollTop:setTop},300);

})
     	
                 	
                 