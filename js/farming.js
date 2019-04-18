var yts = (function() {
    
    //导航标签特效
    headerMidCss = function() {
        $('.header-bo-middle').children().eq(0).css('margin-left', '15px');
        $(".header-bo-middle li").eq(0).css('color', '#ee7700');
        $(".header-bo-middle").on("mouseover", "li", function () {
            $(this).addClass(' show2');
        })
        $(".header-bo-middle").on("mouseout", "li", function () {
            $(this).removeClass('show2');
        })
    }

    //广告页面的动画效果
    moveExp = function() {
        var conExp = $('.cont-right-Exp li');
        $('.cont-right-Exp li:first').addClass('exp-Olist');
        $('.cont-right-Exp').on("mouseover","li",function() {
            if($(this).hasClass('exp-Olist')) {   
                return;     
            }else {
                $(this).addClass('exp-Olist').removeClass('exp-Hlist').siblings().removeClass('exp-Olist').addClass('exp-Hlist');
            };
        })
        var index=0;
        var time = setInterval(function() {
            index++;
            if(index>conExp.length-1){
            index=0;
            }
            if(conExp.eq(index).hasClass('exp-Olist')){
                return ;
            }else{
                conExp.eq(index).addClass('exp-Olist').removeClass('exp-Hlist').siblings().removeClass('exp-Olist').addClass('exp-Hlist');
            }
        },3000)
    }
    // 轮播图
    carousel = function() {
        var contPic = $('.cont-picture img');
        var len = contPic.size();
        var x = 0;
        var time = setInterval(function() {
            if(x >= len) {
                x = 0;
            }
            console.log(x);
            $('.cont-picture img').eq(x).fadeIn(500).siblings().fadeOut(500);
            $('.content-first .circle').children().eq(x).addClass('circle-show').siblings().removeClass('circle-show');
            
            //空白块的颜色
            var arrColor = ['(206,31,56)','(231,234,67)','(253,220,177)','(205,234,248)','(211,35,37)','(204,230,167)'];
            // console.log(arrColor[x])
            $('.content-first').css('background-color','rgb' + arrColor[x]);
            $('.cont-first-left').css('background-color','rgb' + arrColor[x]);

            x++;
        },5000)

    // 圆点
        function circleCss() {
            $('.content-first .circle').children().eq(0).addClass('circle-show');
            $('.content-first .circle').on("mouseenter","span",function() {
                $(this).addClass('circle-show').siblings().removeClass('circle-show');
                
                x = $(this).index();
                
                $('.cont-picture img').eq(x).fadeIn(500).siblings().fadeOut(500);

                var arrColor = ['(206,31,56)','(231,234,67)','(253,220,177)','(205,234,248)','(211,35,37)','(204,230,167)'];
                $('.content-first').css('background-color','rgb' + arrColor[$(this).index()]);
                $('.cont-first-left').css('background-color','rgb' + arrColor[$(this).index()]);

            })
        }
        circleCss();
    }
    //subcata切换特效
    subcate = function() {
        $('.cont-item').hover(
            function(){
                $(this).addClass('item-hover');
                $('.conLeft-subcate').eq($(this).index()-1).css("display","block");
            },
            function() {
                $(this).removeClass('item-hover');
                $('.conLeft-subcate').eq($(this).index()-1).css("display","none");
            })    
        $('.subcate-detail li a').hover(
            function() {
                $(this).css("color","#e70");
            }
            ,function() {
                $(this).css("color","#444");
            }) 
    }
    //倒计时
    timeout = function() {
        var hou = document.getElementsByClassName('hour');
        var min = document.getElementsByClassName('min');
        var sec = document.getElementsByClassName('sec');
        var timer = function() {
            var a = new Date();
            var b = new Date('2060-01-01 00:00:00');
            var cha = b - a;
            var h = parseInt(cha/1000/60/60%24);
            var m = parseInt(cha/1000/60%60);
            var s = parseInt(cha/1000%60);
            hou[0].innerHTML = h + " 时";
            min[0].innerHTML = m + " 分";
            sec[0].innerHTML = s + " 秒";
            hou[1].innerHTML = h + " 时";
            min[1].innerHTML = m + " 分";
            sec[1].innerHTML = s + " 秒";
        }
        setInterval(timer,1000);
    }
    
     return {
        // slideMenu: slideMenu,
        // slideCss: slideCss,
        headerMidCss: headerMidCss,
        carousel: carousel,
        moveExp: moveExp,
        subcate: subcate,
        timeout: timeout,
     }

})()


yts.headerMidCss();     //导航标签特效
yts.moveExp();          //广告页面的动画
yts.carousel();         //轮播图
yts.subcate();          //subcate切换
yts.timeout();          //倒计时

    



    
    









