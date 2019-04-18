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


    
})()