
(function () {
    // 头部特效
    function homePageEffects() {
        // 头部的我的莱德下拉菜单
        $('.header .userinfo').mouseover(function () {
            $('.userinfo ul').show();
        })
        $('.userinfo').mouseout(function () {
            $('.userinfo ul').hide();
        })
        // 海外馆首页下面的图标变色
        $('.catalog .lvse').mouseover(function () {
            $(this).css({ backgroundPositionX: '-175px' })
            $('.lvse span').css({ color: '#b46fb4' })
        })
        $('.catalog .lvse').mouseout(function () {
            $(this).css({ backgroundPositionX: '0px' })
            $('.lvse span').css({ color: '#fff' })
        })
        $('.catalog .meizhuang').mouseover(function () {
            $(this).css({
                backgroundPositionX: '-270px'
            })
            $('.meizhuang span').css({ color: '#b46fb4' })
        })
        $('.catalog .meizhuang').mouseout(function () {
            $(this).css({ backgroundPositionX: '-95px' })
            $('.meizhuang span').css({ color: '#fff' })
        })
        $('.catalog .muying').mouseover(function () {
            $(this).css({ backgroundPositionX: '-175px' })
            $('.muying span').css({ color: '#b46fb4' })
        })
        $('.catalog .muying').mouseout(function () {
            $(this).css({ backgroundPositionX: '0px' })
            $('.muying span').css({ color: '#fff' })
        })
        $('.catalog .jkms').mouseover(function () {
            $(this).css({
                backgroundPositionX: '-270px'
            })
            $('.jkms span').css({ color: '#b46fb4' })
        })
        $('.catalog .jkms').mouseout(function () {
            $(this).css({ backgroundPositionX: '-95px' })
            $('.jkms span').css({ color: '#fff' })
        })

        $('.catalog .cwxl').mouseover(function () {
            $(this).css({ backgroundPositionX: '-175px' })
            $('.cwxl span').css({ color: '#b46fb4' })
        })
        $('.catalog .cwxl').mouseout(function () {
            $(this).css({ backgroundPositionX: '0px' })
            $('.cwxl span').css({ color: '#fff' })
        })
        $('.catalog .swlp').mouseover(function () {
            $(this).css({
                backgroundPositionX: '-270px'
            })
            $('.swlp span').css({ color: '#b46fb4' })
        })
        $('.catalog .swlp').mouseout(function () {
            $(this).css({ backgroundPositionX: '-95px' })
            $('.swlp span').css({ color: '#fff' })
        })
    }
    homePageEffects();
    // 主页轮播图轮播图
    function main_lunbo() {
        var index = 0;
        var Numn = "";
        //获取图片的个数
        $(".banner .box").width($(".banner .box div").width() * $(".banner .box div").length);
        //获取图片的个数
        var imgNum = $(".banner .box").find('img').length;
        //获取每张图片的宽度
        var imgWidth = $(".banner .box").find('img').width();
        //计算所有图片的宽度
        var AllImgWidth = imgNum * imgWidth;
        //        alert(AllImgWidth);
        function selectimg(index) {
            $(".banner .box div").eq(index).addClass("active").siblings('div').removeClass('active');
            $(".banner .Dots a").eq(index).addClass("active").siblings('a').removeClass('active');
        }
        //点击prev的按钮
        $(".banner .but .next").click(function () {
            index -= 1;
            if (index < 0) {
                index = imgNum - 1;
            }
            selectimg(index);
        });
        //点击next按钮
        $(".banner .but .prev").click(function () {
            index += 1;
            if (index > 3) {
                index = 0;
            }
            selectimg(index);
        });
        //鼠标放上去暂停轮播
        $('.banner .banner').hover(function () {
            clearInterval(p);
        }, function () {
            pic();
        });
        //自动轮播
        // 1、轮播切换图片函数，不断的改变index的值
        // 2、然后乘以宽度（总宽度）
        function pic() {
            p = setInterval(function () {
                index++;
                if (index >= imgNum) {
                    index = 0;
                }
                selectimg(index);
            }, 4000);
        }
        //获取按钮的个数；向页面添加按钮
        for (var icon = 0; icon < imgNum; icon++) {
            Numn += "<a href='javascript:;'></a>";
        }
        $('.banner .Dots').html(Numn);
        $('.banner .Dots a').eq(0).addClass('active');
        //点击.Dots a切换到对应的图
        $(".banner .Dots a").each(function (index) {
            $(this).click(function () {
                $(".banner .box div").eq(index).addClass("active").siblings('div').removeClass('active');
                $(".banner .Dots a").eq(index).addClass("active").siblings("a").removeClass("active");
            })
        });
        pic();
    }
    main_lunbo();
    // 轮播右面的推荐、入门、公告轮播
    function right_banner() {
        var dai = $(".catalog .life .life-list").children();
        var kong_box = $(".catalog .life .kong-box").children();

        for (var i = 0; i < dai.length; i++) {
            dai[i].index = i;
            $(".catalog .life .life-list").children()[i].onmouseover = function () {
                $(this).css({ borderColor: 'blue' }).siblings().css({ borderColor: 'transparent' })
                $(".catalog .life .kong-box").stop(true, true).animate({ marginLeft: -228 * this.index + 1 })
            }
        }
    }
    right_banner()

    // 热门商品轮播
    function hot_banner() {
        $('.hezi').children().eq(0).clone().appendTo(".hezi");
        var n = 0;
        var p;
        $('.hot-banner').hover(function () {
            clearInterval(p);
        }, function () {
            bic();

        });
        function bic() {
            p = setInterval(a, 5000);

        }
        bic();
        console.log($('.hot-banner .hezi').children().length)
        $('.hot-right').click(a)
        function a() {
            n++;
            if (n > $('.hot-banner .hezi').children().length - 1) {
                n = 1;
                $('.hot-banner .hezi').stop(true, true).animate({ marginLeft: 0 }, 0)
            }

            $('.hot-banner .hezi').stop(true, true).animate({ marginLeft: -1202 * n }, 1000)
        }
        $('.hot-left').click(function () {
            n--;
            if (n < 0) {
                n = 1;
                $('.hot-banner .hezi').stop(true, true).animate({ marginLeft: -2404 }, 0)
            }
            // console.log(n)
            $('.hot-banner .hezi').stop(true, true).animate({ marginLeft: -1202 * n }, 1000)
        })
    }
    hot_banner();
    // 进口商品标题特效
    function section() {
        $('.section .more-import').hover(function () {
            $('.section .more-import').css({ backgroundPositionY: '-104px' })
        }, function () {
            $('.section .more-import').css({ backgroundPositionY: '0px' })
        })
    }
    section();
    // 海外直邮标题特效
    function direct_mail() {
        $('.direct-mail .more-import').hover(function () {
            $('.direct-mail .more-import').css({ backgroundPositionY: '-156px' })
        }, function () {
            $('.direct-mail .more-import').css({ backgroundPositionY: '-52px' })
        })
    }
    direct_mail();
    //=====================搜索
    ; (function ($) {
        var time = new Date();
        $('.header-main .search-font').keyup(function () {
            $('.header-main .search-list').html('');
            if ($('.header-main .search-font').val()) {
                $.ajax({
                    type: "get",
                    url: "http://search.ule.com/api/suggest.action",
                    jsonpCallback: 'searchList',
                    data: {
                        query: $('.header-main .search-font').val(),
                        _: time.getTime(),
                    },
                    dataType: 'jsonp',
                    success: function searchList(data) {
                        $.each(data, function (name, num) {
                            var node = $("<li class='clearfix'><p class='fl'>" + name + "</p><p class='fr'>约<span> " + num + " </span>个商品</p></li>")
                            $('.header-main .search-list').append(node)
                        })
                    }
                })
            }
        })
    })(jQuery)
})()



