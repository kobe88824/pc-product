
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

    
//==================banner
$(function () {
    var n = 0;
    var arr = ['#5322e6', '#f7410f', '#960505', '#ed4305', '#960505', '#960505']
    $('.banner .dot li').mouseover(function () {
        n = $(this).index()
        $('.banner').css({ background: arr[n] })
        $(this).css({ background: '#c7181b' }).siblings().css({ background: '#fff' })
        $('.banner-page').eq($(this).index()).show().siblings().hide()
    })
    function auto() {
        n++;
        if (n > 6) {
            n = 0;
        }
        $('.banner').css({ background: arr[n] })
        $('.banner .dot li').eq(n).css({ background: '#c7181b' }).siblings().css({ background: '#fff' })
        $('.banner-page').eq(n).show().siblings().hide()
    }

    ; (function ($) {
        
        time = setInterval(function () {
            auto();
        }, 5000)
        
    })(jQuery)

})
//====================页面主体第一个轮播图
    ; (function ($) {
        $('.main-banner h4').mouseenter(function () {
            $(this).addClass('active').siblings().removeClass('active')
            $(this).find('.t').show().parent().css({ color: '#d63334' }).parent().siblings().find('.t').hide().parent().css({ color: '#333' })

            var n = $(this).index(), s = 0;
            s = n * -279 + 'px';
            $('.main-banner .page').animate({ top: s }, 300)
        })
    

    })(jQuery)
//===================三个轮播图的遮罩层
    ; (function ($) {
        $('.main-banner2 img').each(function (index, ele) {
            var h = $('.main-banner2 img').eq(index).height()
            var w=$('.main-banner2 img').eq(index).width()
            var node = $('<div></div>')
            node.css({ height: h, width: w })
            $(this).after(node)
        })
})(jQuery)
    //===============三个轮播图
    ; (function ($) {
        var index = 0, l = 0, time;
        var obj = $('.main-banner2-middle .main-banner2-container');
        obj.children().eq(0).clone().appendTo(obj)

        $('.main-banner2 .dot li').mouseenter(function () {
            clearTimeout(time)
            $(this).addClass('active').siblings().removeClass('active')
            var n = $(this).index(), s = 0;
            s = n * -370 + 'px';
            $(this).parent().prev().animate({ left: s }, 300)
            if ($(this).parent().attr('class') == 'dot mm') {
                index = n;
                l = n
            }
        })
        $('.main-banner2 .dot li').mouseleave(function () {
            timer()
        })
        function auto() {
            index++;
            l++;
            if (l == 2) {
                l = 0;
            }
            if (index > 2) {
                index = 1;
                obj.css({ left: 0 })
            }
            obj.animate({ left: -index * 370 })
            $('.main-banner2-middle .dot li').eq(l).addClass('active').siblings().removeClass('active')
        }
        function timer() {
            time = setInterval(function () {
                auto();
            }, 3000)
        }
        timer()
    })(jQuery)
    //===============逛一逛
        ; (function ($) {
            var winH = window.innerHeight;//窗口高度
            var conTop = $('.container').offset().top;//距离页面顶部高度
            var n = 0, flag = true;
            var time = new Date();
        
            $(window).scroll(function () {
                var conH = $('.container').height();//内容高度
                var scrTop =$(document).scrollTop() ;//卷起高度
                if (conH + conTop - scrTop - winH <= 0) {
                    if (flag) {
                        flag = false;
                        n++;
                        $.ajax({
                            type: "get",
                            url: "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing",
                        
                            jsonpCallback:'callback',
                            data: {
                                _: time.getTime(),
                                // restype: 2001,
                                // moduleKeys:'index_hp_gyg2018'
                                pageSize: 10,
                                pageIndex:n
                            },
                            jsonp:'jsonCallBack',
                            dataType:'jsonp',
                            success: function (data) {
                                if (n < 10) {
                                    flag = true;
                                }
                            }
                        })
                    }
                }
            })
            window.callback = function (data) {
                
                
                $.each(data.result, function (index, val) {
                        
                    // $.ajax({
                    //     type: "post",
                    //     url: "../api/getlist.php",
                    //     data: {
                    //         img: val.imgUrl,
                    //         listname: val.listName,
                    //         listId: val.listId,
                    //         province: val.provinceName,
                    //         price: val.salPrice,
                    //         store: val.storeName,
                    //         storeId: val.storeId,
                    //         maxPrice:val.purchasePrice
                    //     },
                    //     dataType:'json',
                    //     success: function (data) {
                    //         console.log(data)
                    //     }
                    // })


                    var listNode, liNode;
                    //广告div添加类名
                        liNode = $('<li class=""></li>')
                        if (!val.listId) {
                            liNode.addClass('ad')
                        }
                    
                        
                    //添加div里面内容

                    if (val.listId) {
                        listNode = $('<a href="#"><img src="images/index/loading2.gif" alt="" data-original="'+val.imgUrl+'"  width="220" height="200"></a><p class="prod-name"><a href="#">'+val.listName+'</a></p><p class="prod-price"><span>￥'+val.salPrice+'</span></p><p class="shop-area"><a href="#">'+val.storeName+'</a><span>'+val.provinceName.slice(0,val.provinceName.length-1)+'</span></p>')
                    } else {
                        listNode=$('<a href="#"><img src="images/index/loading2.gif" alt="" data-original="'+val.imgUrl+'"  width="230" height="310"></a>')
                    }
                    liNode.append(listNode)
                    $('.main-other ul').append(liNode);
                    $(".main-other img").lazyload({threshold : 200})
                })
                
            }
    })(jQuery)
    //============楼层导航
    ; (function ($) {
        var winH = window.innerHeight;//窗口高度
        $(window).scroll(function () {
            var scrTop = $(document).scrollTop();//卷起高度
            var firstTop = $('.main-floor li').eq(0).offset().top;//第一个距顶部距离
            $('.main-floor li').each(function (index) {
                var conH = $(this).height();//内容高度
                var conTop = $(this).offset().top;//距顶部距离
                if (conTop + conH - winH - scrTop <= 200) {
                    $('.main-floor-nav li').eq($(this).index()).removeClass('init').siblings().addClass('init')
                }
            })
            if (firstTop - scrTop - winH <= -200) {
                $('.main-floor-nav').show()
            } else {
                $('.main-floor-nav').hide()
            }
        })
        $('.main-floor-nav li').click(function () {
            var eleH = $('.main-floor li').eq($(this).index()).height();//内容高度
            $(this).removeClass('init')
            if ($(this).index() != 5) {
                var s = $('.main-floor li').eq($(this).index()).offset().top - winH + eleH;
                $('body,html').animate({ scrollTop: s }, 500)
            } else {
                $('body,html').animate({ scrollTop: 0 }, 500)
            }
        })
    })(jQuery)

  //============楼层ajax加载
  ; (function ($) {
      var winH = window.innerHeight;//窗口高度
      var showArr=[]
    $(window).scroll(function () {
        var scrTop = $(document).scrollTop();//卷起高度
        $('.main-floor li').each(function (index) {
            var conH = $(this).height();//内容高度
            var conTop = $(this).offset().top;//距顶部距离
            if (conTop - winH - scrTop <= 200) {
                
                
                if (showArr.indexOf($(this).index()) == -1) {
                    var n = $(this).index() + 1;
                    $.ajax({
                        type: 'get',
                        url: 'api/doFloor.php',
                        data: {
                            floor:n
                        },
                        dataType: 'json',
                        success: function (data) {
                            addFlow(data,n)
                        }
                    })
                    showArr.push($(this).index())
                }
            }
        })
        window.addFlow = function (data,n) {
            var floorHtml = '';
            floorHtml += '<div class="f-left">';
            floorHtml += '<a href="#">';
            floorHtml += '<img src="images/index/loading2.gif" alt="" data-original="images/index/'+data.ad.img+'"  width="270" height="550">';
            floorHtml += '<div class="ceng"></div>';
            floorHtml += '</a>';
            floorHtml += '</div>';
            floorHtml += '<div class="f-right clearfix">';
            $.each(data.fr, function (index,val) {
                floorHtml += '<div>';
                floorHtml += '<a href="#">';
                floorHtml += '<img src="images/index/loading2.gif" alt="" data-original="images/index/'+val.img+'"  width="220" height="200">';
                floorHtml += '</a>';
                floorHtml += '<p class="r-w1"><a href="#">'+val.listName+'</a></p>';
                floorHtml += '<p class="r-price">￥'+val.price+'</p>';
                floorHtml += '</div>';
            })
            floorHtml += '</div>';
            
            $('.main-floor>ul>li').eq(n-1).children('.f-container').html(floorHtml)
            $(".main-floor img").lazyload({threshold : 200})
        }
    })
})(jQuery)
