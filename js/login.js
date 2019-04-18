; (function ($) {
    if (getCookie('user')) {
        cookieAdd(getCookie('user'))
    }
    $('.header .login-button').click(function () {
        $('.header .ceng').show()
    })
    $('.ceng').click(function () {
        $(this).hide();
        $('.err1').css({
            visibility: 'hidden'
        })
        $('.err2').css({
            visibility: 'hidden'
        })
        $('button').html('登陆')
    })
    $('.login-register').click(function (e) {
        e.stopPropagation()
    })
    $('.header .ceng .login input').focus(function () {
        $('.err1').css({
            visibility: 'hidden'
        })
        $('.err2').css({
            visibility: 'hidden'
        })
    })
    
    
    var flag;
    $('.header .ceng button').click(function () {
        $(this).html('登陆中...')
        var user = $('.header .ceng .user').val()
        var pwd = $('.header .ceng .pwd').val()
    
        $.ajax({
            type: 'get',
            url: '../api/doLogin.php',
            data: {
                user:user,
                pw:pwd
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data)
                if (data.code == 1) {
                    $('.header .ceng .err1').css({
                        visibility: 'unset'
                    })
                    $('.header .ceng button').html('登陆')
                } else if (data.code == 2) {
                    $('.header .ceng .err2').css({
                        visibility: 'unset'
                    })
                    $('.header .ceng button').html('登陆')
                } else {
                    $('.header .ceng').hide()
                    $('.header .ceng .err1').css({
                        visibility: 'hidden'
                    })
                    $('.header .ceng .err2').css({
                        visibility: 'hidden'
                    })
                    $('.header .ceng button').html('登陆')
                    flag = $(".header .ceng input[type='checkbox']").prop("checked");
                    if (flag) {
                        setCookie('user', data.user.user, 30)
                    } else {
                        setCookie('user', data.user.user)
                    }
                    cookieAdd(data.user.user)
                    // history.go(0)
                }
            }
        })
    })
    
    function cookieAdd(user) {
            
        $('.header .user-name').html(user.substr(0, 3) + "****" + user.substr(7)) //顶部添加用户名
        $('.header .header-right .exit-button').show().siblings().hide() //顶部显示退出

        $('.sidebar .myld').addClass('lt').find('span').html(user.substr(0, 3) + "****" + user.substr(7) + ' ') //侧边栏个人中心添加用户名
        $('.sidebar').find('.btn').removeClass('all-class').children().removeClass('active')//恢复侧边栏点击位置颜色
        $('.header .ceng').hide() //登录遮罩层隐藏
        $('.mycar .car-empty span').hide()//隐藏购物车登录
            // console.log(getList)
        // if (getList) {

        //     getList()
        // }
        


        //退出按钮绑定点击事件
        $('.header .header-right .login').click(function () {
            delCookie('user') //删除cookie
            history.go(0)
            // $('.sidebar .myld').removeClass('lt').removeClass('lt-active') //侧边栏个人中心隐藏;
            // $(this).children('.exit-button').hide().siblings().show() //顶部显示登录注册
            // $('.header .user-name').html('') //清除顶部用户名
        })
    }
    
    
})(jQuery)
