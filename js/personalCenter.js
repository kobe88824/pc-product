(function(){
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






    // getCookie("user")
   
    if(getCookie){
        getCookie("user")
         console.log(getCookie("user"))
    }
    // $(".main .main-right .basic-info .info .binding .tel").html(getCookie("user"))
    function eye(){
        var flag=true;
        $(".main .main-right .balance p.eye").click(function(){
            
            if(flag){
                $(this).css({backgroundPosition:"-33px 4px"})
                $(this).children().html("0")
                flag=false;
            }else{
                $(this).css({backgroundPosition:"5px -198px"})
                $(this).children().html("******")
                flag=true;
            }
        })
    }
    eye();

})()