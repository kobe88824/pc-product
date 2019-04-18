var user = getCookie('user')
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
    //====================固定定位搜索框和右侧返回顶部显示/隐藏效果
    ; (function ($) {
        $(window).scroll(function () {
            var scrTop = $(document).scrollTop();//卷起高度
            if (scrTop >= 650) {
                $('.search .fix-box').addClass('fix-search')
            } else {
                $('.search .fix-box').removeClass('fix-search')
            }

            if (scrTop >= 180) {
                $('.sidebar .sidebar-bottom>div').fadeIn()
            } else {
                $('.sidebar .sidebar-bottom>div').fadeOut()
            }
        })
    })(jQuery)
        //=================优惠券
    ; (function () {
        var num = 10001,type=0,n=0;//默认值



        //=============请求优惠券数据
        function discount(num,type,n) {
            $.ajax({
                type: 'get',
                url: 'api/doDiscount.php',
                data: {
                    style:2,
                    user: user,
                    categoryType2: num,
                    type: type,
                    page:n
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data)
                    if (data.code == 0) {
                        $('body,html').animate({ scrollTop: 0 })
                        mainItem(data.data)
                        listPage(data.len)
                    }
                }
            })
    }
        discount(num,type,n)
        //生成优惠券页面
        window.mainItem = function (data) {
            var listHtml = '';
            $.each(data, function (index, val) {
                listHtml += '<div class="item-list">';
                listHtml += '<a href="#">';
                listHtml += '<img src="images/index/loading2.gif" alt="" data-original="' + val.img + '"  width="220" height="200">';
                listHtml += '</a>';
                listHtml += '<div class="fl">';
                listHtml += '<div class="text1 clearfix">';
                listHtml += '<span class="val">￥</span><strong>'+val.amount+'</strong>';
                if (val.type == 1) {
                    listHtml += '<span class="nam1 fr">店铺券</span>';
                } else {
                    listHtml += '<span class="nam2 fr">商品券</span>';
                }
                // listHtml += '<span class="nam"></span>';
                listHtml += '</div>';
                listHtml += '<p class="text2">'+(val.remark).split(',')[1]+'</p>';
                listHtml += '<a class="text3">'+(val.remark).split(',')[0]+'</a>';

                listHtml += '</div>';
                if (val.type == 1) {
                listHtml += '<a class="btn1">';
                } else {
                listHtml += '<a class="btn2">';
                }
                listHtml += '<span>立即领取</span>';
                listHtml += '</a>';
                listHtml += '</div>';
            })
            $('.main-item').html(listHtml)
            $(".main-item img").lazyload({threshold : 200})
        }
        //生成页码
        window.listPage=function(data){
            var len = Math.ceil(data / 30)
            var pageHtml = '';
            pageHtml += '<span class="prev"><i class="fa fa-caret-left"></i>上一页</span>';
            for (var i = 1; i <len+1; i++){
                pageHtml += '<span class="page-btn">'+i+'</span>'
            }
            pageHtml += '<span class="next">下一页<i class="fa fa-caret-right"></i></span>';
            $('.main .list-page').html(pageHtml)


            $('.main .list-page span').eq(n + 1).addClass('on')
            if (n == 0) {
                $('.main .list-page .prev').addClass('disabled')                
            }
            if (n == $('.main .list-page span').length - 3) {
                $('.main .list-page .next').addClass('disabled')
            }
            cFun();
        }
        //点击事件
        function cFun() {
            //点击头部分类
            $('.main .main-header span').click(function () {
                num = $(this).data('option')
                $(this).addClass('active').siblings().removeClass('active')
                discount(num,type,n)
            })
            //点击 全部/商品券/店铺券
            $('.main .main-tab span').click(function () {
                type = $(this).index()
                $(this).addClass('active').siblings().removeClass('active')
                discount(num,type,n)
            })
            //点击上一页
            $('.main .list-page .prev').click(function () {
                n--;
                if (n <= 0) {
                    n = 0;
                    $(this).addClass('disabled')
                }
                if ($(this).parent().children().length - 2 != n) {
                    $('.main .list-page .next').removeClass('disabled')
                }
                $(this).parent().children().eq(n+1).addClass('on').siblings().removeClass('on')
                discount(num,type,n)
            })
            //点击下一页
            $('.main .list-page .next').click(function () {

                n++;
                if (n >= $('.main .list-page span').length-3) {
                    n = $('.main .list-page span').length - 3;
                    $(this).addClass('disabled')
                }
                if (n>0) {
                    $('.main .list-page .prev').removeClass('disabled')
                }
                discount(num, type, n)
                $(this).parent().children().eq(n+1).addClass('on').siblings().removeClass('on')
                
            })
            //点击具体页码
            $('.main .list-page .page-btn').click(function () {
                if ($(this).index()-1 != n) {
                    n=$(this).index()-1
                    discount(num, type, n)
                    $(this).addClass('on').siblings().removeClass('on')
                }
                console.log($(this).index())
               
            })
        }

    })(jQuery)


    