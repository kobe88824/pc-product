
(function(){


    //鼠标进去、离开我的莱德
    $('.header .my').hover(
        function(){
            $(this).children().eq(1).css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px -16px"
            })
            $('.my-list').removeClass('hide').addClass('show')
        },function(){
            $(this).children().eq(1).css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px 4px"
            })
            $('.my-list').removeClass('show').addClass('hide')
    })
    //鼠标经过手机莱顿效果
    $('.header .phone').hover(
            function(){
                $(this).children().eq(2).css({
                    background:"url(images/specialSale-img/header_1407.png)no-repeat -430px -16px"
                })
                $('.app-down').removeClass('hide').addClass('show')
            },function(){
                $(this).children().eq(2).css({
                    background:"url(images/specialSale-img/header_1407.png)no-repeat -430px 4px"
                })
                $('.app-down').removeClass('show').addClass('hide')
            }
        )

    //鼠标经过全部商品分类
    $('.header .ify').hover(
        function () {
            $('.ify .arr').css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px -16px"
            })
            $(this).children().eq(1).stop(true).slideDown()
        },function(){
            $('.ify .arr').css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px 4px"
            })
            $(this).children().eq(1).stop(true).slideUp()
        }
    )
    //鼠标经过帮助中心效果
    $('.help-center').hover(
        function (){
            $('.help-center .arr').css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px -16px"
            })
            $('.help-down').removeClass('hide').addClass('show')
        },function(){
            $('.help-center .arr').css({
                background:"url(images/specialSale-img/header_1407.png)no-repeat -430px 4px"
            })
            $('.help-down').removeClass('show').addClass('hide')
        }
    )

    //商品分类tab切换
    

    $('.head-nav .all-category').hover(function(){
        $('.kind').removeClass('hide').addClass('show')
    },function(){
        $('.kind').removeClass('show').addClass('hide')
    })

    $('.kind li').each(function(){
        $(this).hover(
            function(){
                $(this).children('.kind-details').removeClass('hide').addClass('show')
        },function(){
                $(this).children('.kind-details').removeClass('show').addClass('hide')
        })
    })


    $('.cata-head .cata-tab1').mouseenter(function(){
        $('.cata-tab1').addClass('cata-curr')
        $('.cata-tab2').removeClass('cata-curr')
        $('.cata-box').removeClass('hide').addClass('show')
        $('.cata-brand').removeClass('show').addClass('hide')
    })
    $('.cata-head .cata-tab2').mouseenter(function(){
        $('.cata-tab2').addClass('cata-curr')
        $('.cata-tab1').removeClass('cata-curr')
        $('.cata-brand').removeClass('hide').addClass('show')
        $('.cata-box').removeClass('show').addClass('hide')
    })


// 轮播图
    function auto(){
        var n=0,time,len=$('.banner-item li').size()-1;
        // console.log($('.banner-item li').size())
        time = setInterval(function(){
            $('.banner-item li').eq(n).fadeIn(2000).siblings().fadeOut(2000)
            $('.cir-item li').eq(n).addClass('active').siblings().removeClass('active')
            n++;
            // console.log(n)
            if(n>len){
                n=0
            }
        },3000)

        $('.cir-item li').mouseenter(function(){
            n = $(this).index();
            $('.cir-item li').eq($(this).index()).addClass('active').siblings().removeClass('active')
            $('.banner-item li').eq(n).stop(true,true).fadeIn(2000).siblings().stop(true,true).fadeOut(2000)
        })
    }
    auto()
    
    // 倒计时
    var countdown = function (){
        var time = $('.sale-countdown').attr('end-date');//获取结束时间
        var nowDate = new Date(),//获取现在事件
            endDate = new Date(time),//结束事件赋值给endDate
            countDown = endDate - nowDate;//得到时间差
            // console.log(countDown)
        var d = parseInt(countDown/1000/60/60/24),
            h = parseInt(countDown/1000/60/60%24),
            m = parseInt(countDown/1000/60%60),
            s = parseInt(countDown/1000%60);
            // console.log(d+"天"+h+"时"+m+"分"+s+"秒" )
            
            // 时间写入页面
            $('.sct-d').html(d)
            $('.sct-h').html(h)
            $('.sct-m').html(m)
            $('.sct-s').html(s)

    }
    setInterval(countdown,1000)
    

    var page = 1,flag=true;
    var htmlStr = "";

   $(window).scroll(function() {
        // 获取页面被卷起的高度
        var scrollH = $(window).scrollTop();
        // 获取窗口高度
        var winH = $(window).innerHeight();
        // 获取元素自身高度+距离顶部高度
        var  saleH = $('.sale-new').outerHeight() + $('.sale-new').offset().top;

        if(scrollH + winH >=saleH){
            if(flag){
                flag = false;
                $.ajax({
                    type:"GET",
                    url:"api/specialSale.php",
                    data:{
                        page:page  
                    },
                    dataType:'json',
                    success:function (data){
                        console.log(data)
                        if(data.success){
                            for(var key in data.list) {
                                // console.log(data.list[key])
                                htmlStr +='<li class="sale-newpro clearfix">';
                                htmlStr +='<div class="sale-info fl">';
                                htmlStr +='<p class="sale-logo">';
                                htmlStr +='<i>';
                                htmlStr +='<a href=""><img src="images/specialSale-img/'+data.list[key].brand+'" alt=""></a>';
                                htmlStr +='</i>';
                                htmlStr +='</p>';
                                htmlStr +='<p class="sale-title">'+data.list[key].title+'</p>';
                                htmlStr +='<p class="sale-dis"><strong>'+data.list[key].discount+'</strong>折起</p>';
                                htmlStr +='<p class="sale-slogan">'+data.list[key].fullReduction+'</p>';
                                htmlStr +='<p class="sale-countdown" end-date="'+data.list[key].endDate+' 10:00:00">';
                                htmlStr +='<span>';
                                htmlStr +='<em class="sct-d"></em>天<em class="sct-h"></em>时<em class="sct-m"></em>分<em class="sct-s"></em>秒'
                                htmlStr +='</span>';
                                htmlStr +='</p>';
                                htmlStr +='</div>';
                                htmlStr +='<div class="sale-img fr">';
                                htmlStr +='<a href=""><img src="images/specialSale-img/'+data.list[key].img+'" alt=""></a>';
                                htmlStr +='</div>';
                                htmlStr +='<div class="sale-share hide">';
                                htmlStr +='<div class="share-way fr"><span>我要分享:</span></div>';
                                htmlStr +='</div>';
                                htmlStr +='</li>';
                            }
                            $('.sale-new').html(htmlStr);
                            page++;
                            flag = true;
                        }else{
                            htmlStr +='end'
                            $('.sale-new').html(htmlStr)
                        }    
                    }
                })
            }
        }
   })


})()

