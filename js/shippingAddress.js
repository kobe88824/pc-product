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
    // 获取cookie
    function cookie(){
        if(getCookie){
            getCookie("user")
             console.log(getCookie("user"))
        }
    }
    cookie()
    //点击出现   新增
    
    function maskLayer(){
        $(".main .main-right .add").click(function(){
            $(".mask-layer").show()
        })
        $(".mask-layer").click(function(){
            $(this).hide()
        })
        $(".mask-layer .add").click(function(e){
            e.stopPropagation()
        })
    }
    maskLayer()
    // input点击事件
    function click(){
        $(".mask-layer .add .message .consignee-1 input").click(function(){
            $(this).val("")
        })
        $(".mask-layer .add .message .consignee-2 input").click(function(){
            $(this).val("")
        })
        $(".mask-layer .add .message .consignee-3 input").click(function(){
            $(this).val("")
        })
        $(".mask-layer .add .message .consignee-4 input").click(function(){
            $(this).val("")
        })
        $(".mask-layer .add .message .consignee-5 input").click(function(){
            $(this).val("")
        })
    }
    click()
    // 点击取消   关闭添加
    function cancel(){
        $(".mask-layer .add .message .affirm .cancel").click(function(){
            console.log(1111)
            $(".mask-layer").hide();
        })
    }
    cancel()
    // 手机号判断
    function isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
    
    //邮政编码判断
    function postalCode(str) {
        var myreg=/^[1-9][0-9]{5}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
    //失去焦点判断input是否为空,格式是否正确

    var flag = false,
        flag2 = false,
        flag3 = false,
        flag4 = false;
        
    function noNull(){
        $(".mask-layer .add .message .consignee-1 input").blur(function(){
            if(!$(this).val()){
                $(this).next().text("用户名不能为空")
                console.log(flag)
            }else{
                $(this).next().text("用户名格式正确")
                flag = true
                console.log(flag)

            }
        })
        $(".mask-layer .add .message .consignee-2 input").blur(function(){
            console.log($(".mask-layer .add .message .consignee-2 input").val())
            var tel=isPoneAvailable($(".mask-layer .add .message .consignee-2 input").val())
            
            if(tel){
               $(this).next().text("手机号正确")
               flag2 = true
               console.log(flag2)
            }else{
                $(this).next().text("请输入正确的手机号")
                
            }
        })
        $(".mask-layer .add .message .consignee-3 .addr").blur(function(){
            if($(this).val()){
                flag3 = true
                console.log(flag3)
            }else{
                
            }
        })
        $(".mask-layer .add .message .consignee-4 input").blur(function(){
            if(!$(this).val()){
                $(this).next().text("收货地址不能为空")
            }else{
                $(this).next().text("")
                flag4 = true
                console.log(flag4)
            }
        })
        $(".mask-layer .add .message .consignee-5 input").blur(function(){
            var postal=postalCode($(this).val())
            if(!postal){
                $(this).next().text("邮政编码格式不正确")
            }else{
                $(this).next().text("")
            }
        })
    } 
    noNull()
    // 地址的选择
    function address(){
        $(function () {
            $(".mask-layer .add .message .consignee-3 .addr").jcity({
                urlOrData: '/js/citydata.json',
                animate: { showClass: 'animated flipInX', hideClass: 'animated flipOutX' },  // 需要第一步引用的animate.min.css文件，也可以自己定义动画 
                onChoice: function (data) {
                    console.log(data)
                }
            });
        });
    }
    address()
    // 点击确认  发起ajax
    function add(){
        $(".mask-layer .add .message .affirm .save").click(function(){
            var name = $(".mask-layer .add .message .consignee-1 input")
            var tel = $(".mask-layer .add .message .consignee-2 input")
            var addr1 = $(".mask-layer .add .message .consignee-3 .addr")
            var addr2 = $(".mask-layer .add .message .consignee-4 input")
            var postal = $(".mask-layer .add .message .consignee-5 input")
            // console.log(user)
            // console.log($(user))
            if(!($(name).val()&&$(tel).val()&&$(addr1).val()&&$(addr2).val())){
                $(this).next().text("必填信息不能为空")
                $(this).next().css({color:"red",fontSize:"20px"})
            }else if(!(flag&&flag2&&flag4)){
                $(this).next().text("必填信息格式不正确")
                $(this).next().css({color:"red",fontSize:"20px"})
            }else{
                console.log(name.val())
                console.log(tel.val())
                console.log(addr1.val())
                console.log(addr2.val())
                console.log(postal.val())
                var user = getCookie("user")
                $(".mask-layer").hide();
                $.ajax({
                    type:"get",
                    url:"api/shippingAddress.php",
                    data:{
                        user:user,
                        name:name.val(),
                        // name:"马文彬",
                        tel:tel.val(),
                        addr1:addr1.val(),
                        addr2:addr2.val(),
                        postal:postal.val()
                    },
                    dataType:"json",
                    success:function(data){
                        window.location.reload();
                        console.log(data)
                    }
                })
                

            }
            
            
        })
    }
    add()
    // 调用信息
    function call(){
        var user = getCookie("user")
        $.ajax({
            type:"get",
            url:"api/shippingAddress2.php",
            data:{
                user:user 
            },
            dataType:"json",
            success:function(data){
               
                var str="";
                // console.log(data)
                $.each(data,function(index,val){
                    if(data[0].name){
                        console.log(data[index].name)
                    
                        str += "<li class='clearfix'>";
                        str += "<div class='consignee'>"+data[0].name+"</div>";
                        str += "<div class='tel'>"+data[0].tel+"</div>";
                        str += "<div class='location'>"+data[0].addr1+data[0].addr2+"</div>"
                        str += "<div class='operation'><span class='change'></span><span class='del'>删除</span></div>"
                        str += "</li>";
                    }
                    
                        
                })
                $(".main .ip ul").html(str);
            }
        })
    }
    call()
    // 删除地址
    function delAddr(){
        $(".main .ip").on("click",".del",function(){
            $(this).parent().parent().remove();
            var user = getCookie("user")
            $.ajax({
                type:"get",
                url:"api/shippingAddress3.php",
                data:{
                    user:user 
                },
                dataType:"json",
                success:function(data){
                    
                }
            })

        })
    }
    delAddr()
})()