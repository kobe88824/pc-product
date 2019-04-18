
//===================================获取焦点的框颜色固定,其他有鼠标滑动效果;
    ; (function ($) {
    var index;
    $('.register .content input').on('focus mouseover mouseout', function (e) {
        if (e.type == 'focus') {
            $(this).nextAll().hide()
            index = $(this).parent().index();
            $(this).addClass('active').next().show().parent().siblings().children('input').removeClass('active').next().hide()
            
        } else if (e.type == 'mouseover') {
            if (index != $(this).parent().index()) {
                $(this).addClass('active')
            }
        } else if (e.type == 'mouseout') {
            if (index != $(this).parent().index()) {
                $(this).removeClass('active')
            }
        }
    })
        //===================点击空白位置,边框变为原来颜色

        $('.register ').click(function () {
            $('.register .register-box').children().eq(index).children('input').removeClass('active').next().hide()
        })
        //==================阻止冒泡
        $('.register input').click(function (e) {
            e.stopPropagation();
        })
})(jQuery)

//================================================验证
    ; (function ($) {
        var flag1, flag2, flag3, flag4;
        //=====================================手机号验证
        $('.register .phoneNum').on('blur', function () {
            if (!(/^1[3-9]\d{9}$/).test($(this).val())&&$(this).val().length>0) {
                $('.err4').show()
                flag1=1
            } else {
                
                $.ajax({
                    type: 'post',
                    url: '../api/doRegister.php',
                    data: "user=" + $('.register .phoneNum').val() + "&pwd=" + $('.register .pwd').val()+"&PM="+$('.register .phoneNum').val()+"&n=1",
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 2) {
                            flag1 = 1;
                            $('.register .err1').show()
                        } else {
                            flag1 = 0
                        }
                    }
                })
            }
        })
        
        //==================密码输入框验证
        $('.register .pwd').on('keyup blur', function (e) {
            if (e.type == 'keyup') {
                var patt1 = /^.{6,20}$/;
                var patt2 = /^\S+$/;
                var patt3 = /^([a-zA-Z]+(\d+|[_\W]+))|(\d+([a-zA-Z]+|[_\W]+))|([_\W]+(\d+|[a-zA-Z]+))$/;
                var f2_1, f2_2, f2_3;
                if (patt1.test($(this).val()) && $(this).val() != $('.user').val()) {
                    f2_1=0
                    $('.fa-times-circle-o').eq(0).addClass('fa-check-circle-o')
                    
                } else {
                    f2_1=1
                    $('.fa-times-circle-o').eq(0).removeClass('fa-check-circle-o')
                    
                };
                if (patt2.test($(this).val())) {
                    $('.fa-times-circle-o').eq(1).addClass('fa-check-circle-o')
                    f2_2=0
                } else {
                    $('.fa-times-circle-o').eq(1).removeClass('fa-check-circle-o')
                    f2_2=1
                };
                if (patt3.test($(this).val())) {
                    $('.fa-times-circle-o').eq(2).addClass('fa-check-circle-o')
                    f2_3=0
                } else {
                    $('.fa-times-circle-o').eq(2).removeClass('fa-check-circle-o')
                    f2_3=1
                }
                flag2 = f2_1 + f2_2 + f2_3;
            } else if (e.type == 'blur'&&$(this).val().length>0) {
                if (flag2==0) {
                    $('.err2').hide().parent().children('input').addClass('active')
                } else {
                    $('.err2').show().parent().children('input').addClass('active')        
                }
                
            } 
        })
        //===========================================第二次输入密码验证
        $('.register .pwd2').on('blur', function () {
                if ($(this).val() != $('.register .pwd').val()) {
                    $(this).next().hide();
                    $('.err3').show();
                    $('.err31').hide();
                    flag3 = 1;
                } else {
                    flag3 = 0;
                }
        })

    
        //=================================条款状态验证
        $('.register .term input').click(function () {
            if ($(this).prop('checked')) {
                $('.err6').hide()
            } else {
                $('.err6').show()
            }
        })
        //================================滑块状态验证
        var clickX;
        var moveL;
        $('.register .slide').on('mousedown',function (e) {
            clickX = e.pageX;
            $(this).next().hide()
            // console.log($(this).next())
            $('.register .content').on('mousemove',function (e) {
                e.preventDefault()
                moveL = e.pageX - clickX;
                if (moveL <= -1) {
                    moveL = -1;
                }
                if (moveL >= 280) {
                    moveL = 280;
                }
                $('.register .slide').css({ left: moveL })
                $('.register .ceng').css({width: moveL})
            })
        })
        $('body').on('mouseup', function () {
            $('.register .slide-box').off();
            $('.register .content').off();
            if (moveL < 280) {
                $('.register .slide').animate({ left: -1 })
                $('.register .ceng').animate({ width: 0 })
                flag4=1
            } else if (moveL == 280) {
                $('.register .slide').off();
                $('.register .ceng').html('<span>加载中</span><i class="fa fa-spinner fa-pulse fa-2x"></i>')
                $('body').off('mouseup')
                flag4=0
                setTimeout(function () {
                    $('.register .ceng ').html('<span>验证通过</span>')
                    $('.register .slide p').html('<i class="fa fa-check-circle-o "></i>')
                },1000)
            }
        })

        //=======================点击注册
        $('.register button').click(function () {
            for (var i = 1; i < 4; i++){
                if (flag4 != 0) {
                    $('.register .register-box').children().eq(4).children('.err5').show()
                }
                
                if ($('.register .register-box').children().eq(i).children('input').val()) {
                    $('.register .register-box').children().eq(i).children('tips').hide()
                } else {
                    $('.register .register-box').children().eq(i).children().eq(3).show().prev().hide().prev().hide()
                }
                
            }
            if ($('.register .term input').prop('checked')) {
                // console.log(flag1 , flag2 , flag3 , flag4)
                if (flag1 + flag2 + flag3 + flag4 == 0) {
                    // console.log(1)
                    var phoneN = $('.register .phoneNum').val();
                    // var userName = phoneN.substr(0, 3) + "****" + phoneN.substr(7);
                    $.ajax({
                        type: 'post',
                        url: '../api/doRegister.php',
                        data: "user=" + phoneN + "&pwd=" + $('.register .pwd').val()+"&PM="+phoneN+"&n=2",
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 0) {
                                setCookie('user',phoneN)
                                window.location.href = "index.php";
                            }
                        }
                    })
                } 
            } else {
                $('.err6').show()
            }
        })
})(jQuery)


