(function(){
    
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

    //菜单栏
    $(".nav .all-class").hover(
        function(){
            $(this).children(".item").show();
        },
        function(){
            $(this).children(".item").hide();

        }
    )

    //左导航
    function leftsidebar(){
        // 左导航的移入移出
        $(".banner ul li").hover(   
            function(){
                // $(this).index()
                $(this).addClass("item-"+($(this).index()+1))
            },
            function(){
                $(this).removeClass("item-"+($(this).index()+1))
            }
        )
        // 左楼层导航
        $(".banner ul li").click(function(){
            // console.log($(".main .modules1").eq($(this).index()).offset().top)
            var offsetTop = $(".main .modules1").eq($(this).index()).offset().top
            $("html,body").animate({scrollTop:offsetTop},1000);
        })
    }
    leftsidebar()

    // 轮播图渐隐渐现
    function banner(){
        
            $('.banner .banner2 img:first').show();
            $('.list p').eq(0).css({background:'#c7181c'});
            var x=0;
            $('.list p').click(function(){
                x=$(this).index();
                fadeInOut(x);
            })
    
            function fadeInOut(x){
                $('.banner .banner2 img').eq(x).fadeIn().siblings().fadeOut();
                $('.list p').eq(x).css({background:'#c7181c'}).siblings().css({background:'#fff'})
            }
            setInterval(function(){
                x++;
                if(x<5){
                    fadeInOut(x)
                }else{
                    x=0;
                    fadeInOut(x)
                }
            },2000)   
    }
    banner()
    // 右导航滚动显示
    function scroll(){
        $(window).scroll(function(){
            // var windowH = $(window).height();
            // var offsetTop = $
            var scrollTop = $(window).scrollTop()
            var offsetTop = $(".activity").offset().top
            // console.log(offsetTop)
            if(scrollTop>=600 && scrollTop<=offsetTop-600){
                $(".rightsidebar").show();
            }else{
                $(".rightsidebar").hide()
            }
        })
        
    }
    scroll()
    
    //右侧楼梯导航
    function rightsidebar(){
        var windowH = $(window).height();
        $(window).scroll(function(){
            $('.modules1').each(function(i){
                var offsetTop = $(this).offset().top;
                var scrollTop = $(window).scrollTop()
                // console.log(scrollTop)
                // console.log(offsetTop)
                if(offsetTop-(scrollTop+windowH)<-500){
                    // console.log(1111)
                    // console.log($(".rightsidebar ul li"))
                    // console.log($(this).index())
                    $(".rightsidebar ul li").eq($(this).index()-1).addClass(" list").siblings().removeClass(" list")
                }
            }) 
        })

        $(".rightsidebar ul li").click(function(){
            // console.log($(".main .modules1").eq($(this).index()).offset().top)
            var offsetTop = $(".main .modules1").eq($(this).index()).offset().top
            $("html,body").animate({scrollTop:offsetTop},1000);
        })

    }
    rightsidebar()
    // 右侧推荐点击和回到顶部
    function recommended(){
        $(".rightsidebar .rightsidebar-top").hover(
            function(){
                $(".rightsidebar .rightsidebar-top div").addClass("rightsidebar-top3")
            },
            function(){
                $(".rightsidebar .rightsidebar-top div").removeClass("rightsidebar-top3")
            }
        )
        //推荐点击
        $(".rightsidebar .rightsidebar-top").click(function(){
            var offsetTop = $(".recommend").offset().top;
            $("html,body").animate({scrollTop:offsetTop},1000);
        })
        //回到顶部  
        $(".rightsidebar .body3").click(function(){
            $("html,body").animate({scrollTop:0},1000);
        })
    }
    recommended()

    // ajax请求
    function more(){
        $(".main .modules1 .more .more-position").click(function(){
            var aaa = $(this).parent().parent()
            $.ajax({
                type: "post",
                url: '../api/groupBooking.php',
                // data:{},
                dataType:'json',
                success:function(data){
                    // console.log(data.length);
                    // console.log(aaa)
                    // console.log($(aaa).index()-1);
                //    console.log($(aaa).children(".commodity").children().append(""))
                    $.each(data,function(index,val){
                        // console.log(index)
                        // console.log(val.price)
                        var str = "";
                        str += "<li>";
                        str += "<div class='commodity-img'>";
                        str += "<img src='"+val.img+"'>";
                        str += "</div>";
                        str += "<div class='products-introduction'>";
                        str += "<h3>"+val.listName+"</h3>";
                        str += " <p class='spell-group-price'>拼团价</p>";
                        str += "<div class='price'>";
                        str += "<span class='new-price'>￥"+val.price+"</span>";
                        str += "<span class='original-price'>￥"+val.maxPrice+"</span>";
                        str += "</div>";
                        str += "<div class='immediately'>立即开团</div>";
                        str += "</div>";
                        str += "</li>";
                        // console.log(str)
                        // return str;
                        $(aaa).children(".commodity").children().append(str)
                    })
                    // $(aaa).children(".commodity").children().append(str)
                }
            });
        })
    }
    more()

    // 懒加载
    function lazyload(){
        $(".main .modules1 .commodity ul li .commodity-img img").lazyload({

        })
    }
    lazyload()
    
    
})()

