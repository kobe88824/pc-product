; (function ($) {
    if (getCookie('user')) {
        var user = getCookie('user')
        $('.sidebar .myld').addClass('lt').find('span').html(user+' ')
        // console.log(user)
    }
})(jQuery);
(function () {
    // 页面加载完获取商品Id
    var listId;
    function shop_id (){
        $(window).load(function(){
            // console.log(111)
            $.ajax({
                tpye: 'get',
                url: '../api/shopID.php',
                data: "",
                dataType: 'json',
                success: function (data) {
                  listId = data[0].listId;
                }
            })
        })
    }
    shop_id ()
    //鼠标经过我的莱顿效果
    function myLaidun() {
        $('.js_myaccount').hover(function () {
            $(this).children().eq(0).css({ background: '#fff', border: '1px solid #ededed' })
            $('.js_myaccount i').removeClass('fa-angle-down').addClass('fa-angle-up')
            $('.js_myaccount .myaccount-list').show()
        }, function () {
            $(this).children().eq(0).css({ background: '#f7f7f7', border: '1px solid transparent' })
            $('.js_myaccount i').removeClass('fa-angle-up').addClass('fa-angle-down')
            $('.js_myaccount .myaccount-list').hide()
        })
    }
    myLaidun();
    //鼠标经过手机莱顿效果
    function phoneLaidun() {
        $('.js_down-app').hover(function () {
            $(this).children().eq(0).css({ background: '#fff', border: '1px solid #ededed', borderBottom: '1px solid #fff' }).next().show()
            $('.js_down-app i').removeClass('fa-angle-down').addClass('fa-angle-up')
        }, function () {
            $(this).children().eq(0).css({ background: '#f7f7f7', border: '1px solid transparent' }).next().hide()
            $('.js_down-app i').removeClass('fa-angle-up').addClass('fa-angle-down')
        })
    }
    phoneLaidun();
    //鼠标经过帮助中心效果
    function help() {
        $('.js_help-center').hover(function () {
            $(this).children().eq(0).css({ background: '#fff', border: '1px solid #ededed' })
            $('.js_help-center i').removeClass('fa-angle-down').addClass('fa-angle-up')
            $('.js_help-center .help-center-list').show()
        }, function () {
            $(this).children().eq(0).css({ background: '#f7f7f7', border: '1px solid transparent' })
            $('.js_help-center i').removeClass('fa-angle-up').addClass('fa-angle-down')
            $('.js_help-center .help-center-list').hide()
        })
    }
    help();
    //鼠标经过全部商品分类
    function all_commodity_categories() {
        $('.js_all-class').hover(function () {
            $(this).children().eq(0).css({ background: '#fff', border: '1px solid #ededed', borderBottom: '1px solid #fff', paddingBottom: 12 }).next().stop(true, true).slideDown("fast")
            $('.js_all-class .fa').removeClass('fa-angle-down').addClass('fa-angle-up')
        }, function () {
            $(this).children().eq(0).css({ background: '#f7f7f7', border: '1px solid transparent', paddingBottom: 10 }).next().stop(true, true).slideUp("fast")
            $('.js_all-class .fa').removeClass('fa-angle-up').addClass('fa-angle-down')
        })
    }
    all_commodity_categories();
    // 鼠标经过商铺评分
    function shop_score() {
        $('.storeheader .store-name').hover(
            function () {
                $('.storeheader .store-name .particulars').show();
                // $('.storeheader .store-name .vertical').css({display:'none'})
                $(this).addClass('change');
            }, function () {
                $('.storeheader .store-name .particulars').hide();
                $(this).removeClass('change');
                // $('.storeheader .store-name .vertical').css({display:'bolck'})
            }
        )
    }
    shop_score()
    // 鼠标经过收藏店铺
    function two_dimensional_code() {
        $('.shop-right .heart,.shop-right .collect').hover(function () {
            $('.shop-right .two-dimensional-code').show();
        }, function () {
            $('.shop-right .two-dimensional-code').hide();
        })
    }
    two_dimensional_code()
    // 商品图片预览
    function preview() {
        $('.commodity .samll-pic').each(function (i, ele) {
            $(ele).hover(function () {
                if (i == 0) {
                    $('.pic').css({ background: 'url(../images/particulars/12.jpg)' });
                    $('.big-pic').css({ background: 'url(../images/particulars/big1.jpg)' })
                } else if (i == 1) {
                    $('.pic').css({ background: 'url(../images/particulars/13.jpg)' })
                    $('.big-pic').css({ background: 'url(../images/particulars/big3.jpg)' })
                } else if (i == 2) {
                    $('.pic').css({ background: 'url(../images/particulars/14.jpg)' })
                    $('.big-pic').css({ background: 'url(../images/particulars/big2.jpg)' })
                }
                $(ele).addClass(' active');
            }, function () {
                $(ele).removeClass('active');
            })
        })
    }
    preview()
    // 放大镜
    function magnifying_glass() {
        $('.commodity .pic').mousemove(function (e) {
            var x = e.pageX - $(this).offset().left - $('.commodity .glass').outerWidth(true) / 2;
            var y = e.pageY - $(this).offset().top - $('.commodity .glass').outerHeight(true) / 2;
            // console.log(x,y)
            // console.log($('.glass').width()/2);
            if (x > $(this).width() - $('.commodity .glass').width()) {
                x = $(this).width() - $('.commodity .glass').width()
            }
            if (x < 0) {
                x = 0
            }
            if (y > $(this).height() - $('.commodity .glass').height()) {
                y = $(this).height() - $('.commodity .glass').height()
            }
            if (y < 0) {
                y = 0
            }
            $('.glass').css({ top: y, left: x });
            $('.big-pic').css({ backgroundPositionX: -2 * x, backgroundPositionY: -2 * y })
        })
        $('.commodity .pic').hover(function () {
            $('.big-pic').show();
        }, function () {
            $('.big-pic').hide();
        }
        )
    }
    magnifying_glass()
    // 倒计时
    function countdown() {
        var box = document.querySelector('.count-down');
        function dao() {
            var a = new Date();
            var b = new Date('2019-02-05 00:00:00');
            var cha = b - a;
            var day = parseInt(cha / 1000 / 60 / 60 / 24);
            var hour = parseInt(cha / 1000 / 60 / 60 % 24);
            var min = parseInt(cha / 1000 / 60 % 60)
            var sec = parseInt(cha / 1000 % 60)
            box.innerHTML = '距离团购结束还有<span>' + day + '</span>天<span>' + hour + '</span>小时<span>' + min + '</span>分钟<span>' + sec + '</span>秒';
            // console.log(cha/1000);
        }
        setInterval(dao, 1000);
    }
    countdown()
    // 扫码团购、下拉二维码
    function ewm() {
        function c() {
            $('.commodity .canning .bg').addClass(' bg2');
            clearInterval(time);
        }
        var time;
        function star() {
            time = setInterval(c, 3000);
        }
        star();
        var time3 = setInterval(star, 6000);
        function d() {
            $('.commodity .canning .bg').removeClass(' bg2')
            // console.log(111)
        }
        var time2 = setInterval(d, 6000);

        $('.canning').hover(function () {
            $('.canning-box').show();
            $(this).css({ borderColor: '#ed4545' });
            $('.bg').css({ borderLeftColor: '#ed4545' })
        }, function () {
            $('.canning-box').hide();
            $(this).css({ borderColor: '#aaaaaa' });
            $('.bg').css({ borderLeftColor: '#aaaaaa' })
        })
    }
    ewm()
    // 商品数量加减
    function shop_modified() {
        // console.log(n)
        // $('.attrCubetext').html($('.kuey').html()+'枚，')
        var n = 1;
        $('.standard .scale').keyup(function () {
            console.log($('.standard .scale').val());
            n = $('.standard .scale').val();
            $('.pCounttext').html(n + '件');
        })
        $('.standard .add').click(function () {
            // n=$('.standard .scale').val();
            n++;
            $('.standard .scale').val(n);
            $('.pCounttext').html(n + '件');
        })
        $('.standard .subtract').click(function () {
            n--;
            if (n == 0) {
                n = 1;
            }
            $('.standard .scale').val(n);
            $('.pCounttext').html(n + '件');
        })
    }
    shop_modified()
    // 商品购买右侧轮播 
    function shop_banner() {
        var time = setInterval(s, 5000);
        $('.shop-hots').children('ul').eq(0).show();
        var n = 1;
        $('.store-hots .page-box .right').click(s)
        function s() {
            n++;
            if (n > $('.shop-hots').children().length) {
                n = 1;
            }
            $('.shop-hots').children('ul').eq(n - 1).show().siblings().hide();
            $('.store-hots .page-box span').html(n + '/' + $('.shop-hots').children().length)
        }
        $('.store-hots .page-box .left').click(function () {
            n--;
            if (n <= 0) {
                n = 5;
            }
            $('.shop-hots').children('ul').eq(n - 1).show().siblings().hide();
            $('.store-hots .page-box span').html(n + '/' + $('.shop-hots').children().length)
        })
    }
    shop_banner()
    // 商品详情相关 tab切换
    function shop_about_tab() {
        $('.tab-holder ul').children().eq(0).addClass(' bgred');
        $('.shop-main .content-shop .big-box').children().eq(0).show().siblings().hide();
        $('.tab-holder ul').children().each(function (i) {
            $('.tab-holder ul').children().eq(i).click(function () {
                $(this).addClass('bgred').siblings().removeClass('bgred');
                $('.shop-main .content-shop .big-box').children().eq(i).show().siblings().hide();

            })
        })
    }
    shop_about_tab();
    // 股客还买了哪些轮播
    function also_bought() {
        $('.also .other-buy-content .big-box').children().eq(0).clone().appendTo('.also .other-buy-content .big-box');
        var n = 0,
            p;
        $('.also .other-buy-content .big-box').hover(function () {
            clearInterval(p);
        }, function () {
            bic();

        });
        function bic() {
            p = setInterval(a, 3500);
        }
        bic()
        $('.also .btn-right').click(a)
        function a() {
            n++;
            $('.also .other-buy-content .big-box .ul-box').children().css({ webkitAnimation: "rl 1s both" });
            if (n > $('.also .other-buy-content .big-box').children().length - 1) {
                n = 1;
                $('.also .other-buy-content .big-box').stop(true, true).animate({ left: 0 }, 0);
            }
            $('.also .other-buy-content .big-box').stop(true, true).animate({ left: -880 * n }, 1000);
        }
        $('.also .btn-left').click(function () {
            n--;
            if (n < 0) {
                n = 3;
                $('.also .other-buy-content .big-box').stop(true, true).animate({ left: -3520 }, 0)
            }
            // console.log(n)
            $('.also .other-buy-content .big-box').stop(true, true).animate({ left: -880 * n }, 1000)
        })
    }
    also_bought()
    // 股客还查看了哪些轮播
    function also_look() {
        $('.also-look .other-buy-content .big-box').children().eq(0).clone().appendTo('.also-look .other-buy-content .big-box');
        var n = 0,
            p;
        $('.also-look .other-buy-content .big-box').hover(function () {
            clearInterval(p);
        }, function () {
            bic();

        });
        function bic() {
            p = setInterval(a, 4500);
        }
        bic()
        $('.also-look .btn-right').click(a)
        function a() {
            n++;
            $('.also-look .other-buy-content .big-box .ul-box').children().css({ webkitAnimation: "rl 1s both" });
            if (n > $('.also-look .other-buy-content .big-box').children().length - 1) {
                n = 1;
                $('.also-look .other-buy-content .big-box').stop(true, true).animate({ left: 0 }, 0);
            }
            $('.also-look .other-buy-content .big-box').stop(true, true).animate({ left: -880 * n }, 1000);
        }
        $('.also-look  .btn-left').click(function () {
            n--;
            if (n < 0) {
                n = 3;
                $('.also-look .other-buy-content .big-box').stop(true, true).animate({ left: -3520 }, 0)
            }
            // console.log(n)
            $('.also-look .other-buy-content .big-box').stop(true, true).animate({ left: -880 * n }, 1000)
        })
    }
    also_look()
    // 商品详情图片ajax触底加载
    function tuload() {
        var page = 1,
            flage = true;

        //  滚动高度
        $(window).scroll(function () {
            // 显示屏的高度
            var screenHeight = window.innerHeight;
            //页面的高度
            var doct = $('.also').offset().top;
            //  console.log($( ".attribute").scrollTop())
            if ($(window).scrollTop() + screenHeight >= doct - 50) {
                if (flage) {
                    flage = false;
                    $.ajax({
                        tpye: 'get',
                        url: '../api/particulars.php',
                        data: { p: page },
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data[0].img)
                            for (var i = 0; i < data.length; i++) {
                                $('.shop-img').append("<img src='../images/particulars/" + data[i].img + "'>")
                            }

                        }
                    })
                    flage = true;
                }

                page++;
            }
        })
    }

    tuload();
    // 商品评论ajax点击加载
    function comment_load() {
        // var ul=document.querySelector('.comment-list');
        $('.comment .spage a').eq(0).addClass('a-select');
        var page = 1;
        $('.shop-main .tab-holder .shop-comment').click(function () {
            $.ajax({
                tpye: 'get',
                url: '../api/particulars-comment.php',
                data: { page: page },
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    var ha = '';
                    for (var i = 0; i < data.list.length; i++) {
                        ha += '<li class="comment-itm clearfix"><div class="itm-heard"><div class="img"><div class="yuan"><img src="../images/particulars/default_head.jpg" alt=""></div></div><p class="name">' + data.list[i].user + '</p></div><div class="part"><div class="part-tap clearfix"><p>描述相符：<span class="star"></span></p><p>服务态度：<span class="star"></span></p><p>发货速度：<span class="star"></span></p></div><div class="part-cont"><p class="part-main">' + data.list[i].reviewContent + '</p></div><p class="formar"><span class="date">2019-01-12</span><span>规格:</span><span class="spec">六枚</span></p></div></li>';
                    }
                    $('.comment-list').html(ha);
                    $('.comment .spage a').eq(3).html(Math.ceil(data.num / 20));
                    $('.spage .gross').html(Math.ceil(data.num / 20));
                }
            })
        })
    }
    comment_load()
    // 评论选页
    function select_page() {
        var page, n = 1, x, val;
        // n=x=val;
        $('.comment .spage a').eq(0).addClass('a-select');
        // 点击相应的页码跳转
        $('.comment .spage a').click(function () {
            $('.comment-list').html('');
            x = $(this).html();
            page = x;
            n = x;
            // console.log(page);
            $(this).addClass('a-select').siblings().removeClass('a-select');
            $.ajax({
                tpye: 'get',
                url: '../api/particulars-comment.php',
                data: { page: page },
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    var ha = '';
                    for (var i = 0; i < data.list.length; i++) {
                        ha += '<li class="comment-itm clearfix"><div class="itm-heard"><div class="img"><div class="yuan"><img src="../images/particulars/default_head.jpg" alt=""></div></div><p class="name">' + data.list[i].user + '</p></div><div class="part"><div class="part-tap clearfix"><p>描述相符：<span class="star"></span></p><p>服务态度：<span class="star"></span></p><p>发货速度：<span class="star"></span></p></div><div class="part-cont"><p class="part-main">' + data.list[i].reviewContent + '</p></div><p class="formar"><span class="date">2019-01-12</span><span>规格:</span><span class="spec">六枚</span></p></div></li>';
                    }
                    $('.comment-list').html(ha);
                }
            })
        })
        // 点击下一页请求跳转
        $('.spage .right-arrow').click(function () {
            // console.log(x);
            $('.comment-list').html('');
            n++;
            page = n;
            if (n == 4) {
                $('.comment .spage a').eq(3).addClass('').siblings().removeClass('a-select');
            }
            else {
                $('.comment .spage a').eq(n - 1).addClass('a-select').siblings().removeClass('a-select');
            }
            $.ajax({
                tpye: 'get',
                url: '../api/particulars-comment.php',
                data: { page: page },
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    var ha = '';
                    for (var i = 0; i < data.list.length; i++) {
                        ha += '<li class="comment-itm clearfix"><div class="itm-heard"><div class="img"><div class="yuan"><img src="../images/particulars/default_head.jpg" alt=""></div></div><p class="name">' + data.list[i].user + '</p></div><div class="part"><div class="part-tap clearfix"><p>描述相符：<span class="star"></span></p><p>服务态度：<span class="star"></span></p><p>发货速度：<span class="star"></span></p></div><div class="part-cont"><p class="part-main">' + data.list[i].reviewContent + '</p></div><p class="formar"><span class="date">2019-01-12</span><span>规格:</span><span class="spec">六枚</span></p></div></li>';
                    }
                    $('.comment-list').html(ha);

                }
            })
        })
        // 点击上一页请求跳转
        $('.spage .left-arrow').click(function () {
            // console.log(x);

            n--;
            // 判断当位于第一页时再点击上一页
            if (n < 1) {
                n = 1;
            } else {
                $('.comment-list').html('');
                page = n;
                if (n == 4) {
                    $('.comment .spage a').eq(3).addClass('').siblings().removeClass('a-select');
                }
                else {
                    $('.comment .spage a').eq(n - 1).addClass('a-select').siblings().removeClass('a-select');
                }
                $.ajax({
                    tpye: 'get',
                    url: '../api/particulars-comment.php',
                    data: { page: page },
                    dataType: 'json',
                    success: function (data) {
                        // console.log(data);
                        var ha = '';
                        for (var i = 0; i < data.list.length; i++) {
                            ha += '<li class="comment-itm clearfix"><div class="itm-heard"><div class="img"><div class="yuan"><img src="../images/particulars/default_head.jpg" alt=""></div></div><p class="name">' + data.list[i].user + '</p></div><div class="part"><div class="part-tap clearfix"><p>描述相符：<span class="star"></span></p><p>服务态度：<span class="star"></span></p><p>发货速度：<span class="star"></span></p></div><div class="part-cont"><p class="part-main">' + data.list[i].reviewContent + '</p></div><p class="formar"><span class="date">2019-01-12</span><span>规格:</span><span class="spec">六枚</span></p></div></li>';
                        }
                        $('.comment-list').html(ha);

                    }
                })
            }
        })
        // 输入跳转
        $('.spage .pageswitch input').keyup(function () {
            val = $(this).val();
            n = val;
            $('.spage .pageswitch .btn').click(function () {
                if (n < 1) {
                    n = 1;
                } else {
                    $('.comment-list').html('');
                    page = n;
                    if (n > 4) {
                        $('.comment .spage a').removeClass('a-select');
                    }
                    if (n == 4) {
                        $('.comment .spage a').eq(3).addClass('').siblings().removeClass('a-select');
                    } else {
                        $('.comment .spage a').eq(n - 1).addClass('a-select').siblings().removeClass('a-select');
                    }
                    $.ajax({
                        tpye: 'get',
                        url: '../api/particulars-comment.php',
                        data: { page: page },
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data);
                            var ha = '';
                            for (var i = 0; i < data.list.length; i++) {
                                ha += '<li class="comment-itm clearfix"><div class="itm-heard"><div class="img"><div class="yuan"><img src="../images/particulars/default_head.jpg" alt=""></div></div><p class="name">' + data.list[i].user + '</p></div><div class="part"><div class="part-tap clearfix"><p>描述相符：<span class="star"></span></p><p>服务态度：<span class="star"></span></p><p>发货速度：<span class="star"></span></p></div><div class="part-cont"><p class="part-main">' + data.list[i].reviewContent + '</p></div><p class="formar"><span class="date">2019-01-12</span><span>规格:</span><span class="spec">六枚</span></p></div></li>';
                            }
                            $('.comment-list').html(ha);

                        }
                    })
                }
            })
        })
    }
    select_page()
        ; (function ($) {
            $('.sidebar-bottom').click(function () {
                $('body,html').animate({ scrollTop: 0 }, 500)
            })
        })(jQuery)
    // ===============固定屏幕上的商品tab
    function fixed_tab() {
        // 鼠标经过显示商品商铺评价
        $('.stor-name').hover(function () {
            $('.stor-name .store-con').show();
            $('.stor-name').css({ backgroundColor: '#fff' });

            $('.scroll-tab-fixed .tab-fixed-box .stor-name .fa').removeClass('fa-angle-down').addClass('fa-angle-up');
        }, function () {
            $('.stor-name .store-con').hide();
            $('.stor-name').css({ backgroundColor: '#f2f2f2' });
            $('.scroll-tab-fixed .tab-fixed-box .stor-name .fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        })
        var scr,
            // 导航到页面顶端的高度
            ding = $('.shop-main .tab-holder').offset().top,
            // 块本身的高度
            boxH = $('.shop-main .tab-holder').height();
        // 滚动的高度
        // console.log(boxH);
        $(window).scroll(function () {
            scr = $(window).scrollTop();
            // console.log(scr);
            if (scr > ding + boxH) {
                $('.scroll-tab-fixed').show();
                $('.tab-holder').css({ position: 'fixed', top: -1, left: 572, zIndex: 5 })
            } else {
                $('.scroll-tab-fixed').hide();
                $('.tab-holder').css({ position: '' })
            }
        })
    }
    fixed_tab()
    // 向商家咨询
    function consult() {
        var options, choose, moreContent, email;
        $('.table-pos .choose').change(function () {
            options = $("#test option:selected"),  //获取选中的项
                choose = options.text();//拿到选中项的文本
        })
        $('.table-pos .text').blur(function () {
            moreContent = $('.table-pos .text').val();
        })
        $('.table-pos .email').keyup(function () {
            email = $(this).val();
        })
        $('.table-pos .tishi').html('');
        $('.table-pos .submit').click(function () {
            $('.table-pos .tishi').html('');
            if (choose == undefined) {
                $('.table-pos .tishi').html('请选择您要咨询的类型');
            } else if (moreContent == undefined) {
                $('.table-pos .tishi').html('请填入您要咨询的内容');
            } else if (moreContent == '') {
                $('.table-pos .tishi').html('请填入您要咨询的内容');
            } else if (email == undefined) {
                $('.table-pos .tishi').html('请填入您的邮箱')
            } else if (email == '') {
                $('.table-pos .tishi').html('请填入您的邮箱')
            } else {
                $('.table-pos .text').val('');
                $('.table-pos .email').val('');
                $('.table-pos .tishi').html('您已经提交请稍等')
            }
        })
    }
    consult()
        //=====================搜索
        ; (function ($) {
            var time = new Date();
            $('.search .frame').keyup(function () {
                $('.search .search-list').html('');
                if ($('.search .frame').val()) {
                    $.ajax({
                        type: "get",
                        url: "http://search.ule.com/api/suggest.action",
                        jsonpCallback: 'searchList',
                        data: {
                            query: $('.search .frame').val(),
                            _: time.getTime(),
                        },
                        dataType: 'jsonp',
                        success: function searchList(data) {
                            $.each(data, function (name, num) {
                                var node = $("<li class='clearfix'><p class='fl'>" + name + "</p><p class='fr'>约<span> " + num + " </span>个商品</p></li>")
                                $('.search .search-list').append(node)
                            })
                        }
                    })
                }
            })
        })(jQuery)
    // 加入购物车
    // function ceng() {
    //     if (!getCookie('user')) {
    //         $('.header .ceng').show()
    //     }
    // }
    function buy_car() {
        var n=0;
        // console.log($('.kuey').html())
        $('.add-car,.addcart').click(function () {
            n++;
            if (!getCookie('user')) {
                $('.header .ceng').show()
            }else{
                var user = getCookie('user');
                $.ajax({
                    tpye: 'get',
                    url: '../api/addCar.php',
                    data: { 
                        listId:listId,
                        listNum:$('.scale').val(),
                        user:user,
                        listSize:$('.kuey').html(),
                        listColor:undefined
                    },
                    dataType: 'json',
                    success: function (data) {
                      
                        console.log(2222)
                    }
                })
                $('.mycar-btn .num').html(n);
            }
        })
    }
    buy_car();
})()
