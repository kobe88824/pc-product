var user = getCookie('user')
; (function ($) {
    
    if (user) {
        $.ajax({
            type: 'get',
            url: 'api/doCar.php',
            data: {
                style: 1,
                user: user
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    addCar(data.data)
                    $('.sidebar .mycar').removeClass('lt').hide().next().addClass('lt')
                    $('.sidebar .new-car input[type="checkbox"]').prop("checked",true);
                    myCar.myCar()

                }
            }
        })
    }
    function addCar(data) {

        var storeIdArr = [], storeNameArr=[],num=0,sum=0
        $.each(data, function (index, val) {
            if (storeIdArr.indexOf(val.storeId) == -1) {
                storeIdArr.push(val.storeId);
                storeNameArr.push(val.storeName);
            }
        })
        var storeHtml = '';
        for (var i = 0; i < storeIdArr.length; i++){

            storeHtml += "<div class='car-store'>";//店铺

            storeHtml += "<div class='store-info clearfix'>";//标题栏
            storeHtml += "<input type='checkbox' class='chk-store' value="+storeIdArr[i]+">";
            storeHtml += "<a class='storename' href='#' target='_blank'>"+storeNameArr[i]+"</a>";
            storeHtml += "</div>";


            storeHtml += "<div class='store-items'>";//店铺所有商品内容
            $.each(data, function (index, val) {//遍历店铺商品
                
                if (storeIdArr[i] == val.storeId) {
                    num += parseInt(val.listNum);
                    sum += parseFloat(val.price*val.listNum);
                    storeHtml += "<div class='store-item clearfix' data-option='"+val.listId+"'>";
                    storeHtml += "<div class='item-check clearfix'><input type='checkbox' class='chk-item'></div>";//复选框
                    
                    storeHtml += "<div class='item-pic'><a href='#' class='prod-img' target='_blank'>";//图片
                    if (val.img.indexOf('http') != -1) {
                        storeHtml +="<img src='"+val.img+"' alt='"+val.listName+"'>"//联网图片
                    } else {
                        storeHtml +="<img src='images/index/"+val.img+"' alt='"+val.listName+"'>"//本地图片
                    }
                    
                    
                    storeHtml += "</a></div>";
                    
                    storeHtml += "<div class='fl'>";
                    
                    storeHtml += "<div class='item-attr clearfix'>";//颜色/规格
                    storeHtml += "<p class='size'>" + +"</p>";
                    storeHtml += "<p class='delete'>删除</p>";//操作                    
                    storeHtml += "</div>";
                    storeHtml += "<p class='attr-color'>"+ +"</p>";

                    storeHtml += "<div class='item-price clearfix'>";                    
                    if (val.listNum == 1) {
                        storeHtml += "<span class='btn-down disabled'>-</span>";
                    } else {
                        storeHtml += "<span class='btn-down'>-</span>";
                    }
                    storeHtml += "<input type='text' value='"+val.listNum+"' class='list-num'>";
                    storeHtml += "<span class='btn-up'>+</span>";
                    storeHtml += "<span class='price'>￥"+val.price+"</span>";//单价
                    storeHtml += "<span class='item-total' style='display:none'>"+val.price*val.listNum+"</span>";//单价
                    storeHtml += "</div>";
                    storeHtml += "</div>";
                
                    storeHtml += "</div>";
                }
            })
            storeHtml += "</div>";
            storeHtml += "</div>";
        }
        $('.sidebar .car-main').html(storeHtml)
        $('.sidebar .car-foot .fl strong').html(num)
        $('.sidebar .sidebar-middle .mycar-btn .num').html(num)
        $('.search .shopcard-num').html(num)
        $('.sidebar .car-foot .fr strong').html('￥'+sum.toFixed(2))
    }
})(jQuery)

var myCar = function () {
    function fun() {
        var selectAll = $('.sidebar .select-all');
        var store = $('.car-main .chk-store');
        var item = $('.car-main .chk-item');
        var down = $('.car-main .btn-down');
        var up = $('.car-main .btn-up');
        var num = $('.car-main .list-num');
        var allNum = $('.sidebar .car-foot .fl strong');
        var total = $('.car-main .item-total');
        var allSum = $('.sidebar .car-foot .fr strong');
        var del = $('.car-main .item-attr .delete');
        var carMain = $('.car-main');
        //*======================全选
            selectAll.click(function () {
                var flag=$(this).prop('checked')
                //店铺
                store.prop('checked',flag)
                //商品
                item.prop('checked',flag)
                //总数量和价钱
                allTotal();
            })
        
        //=====================店铺
        store.click(function () {
            var flag=$(this).prop('checked')
                $(this).parent().next().find('.chk-item').prop("checked",flag)
                //全选
                var flag = true;
                for (var i = 0; i < store.length; i++) {
                    if (!store.eq(i).prop("checked")) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    selectAll.prop("checked",true);
                } else {
                    selectAll.prop("checked",false);
                }
                //总数量和价钱
                allTotal();
            })
        // }
        //====================商品
            item.click(function () {
                //店铺
                console.log($(this).parents('.store-items').children().length)
                var flag = true;
                for (var i = 0; i < $(this).parents('.store-items').children().length; i++) {
                    if (!$(this).parents('.store-items').children().eq(i).find('.chk-item').prop("checked")) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    $(this).parents('.car-store').find('.chk-store').prop("checked", true);
                } else {
                    $(this).parents('.car-store').find('.chk-store').prop("checked",false);
                }
                //全选
                var flag = true;
                for (var j = 0; j < store.length; j++) {
                    if (!store.eq(j).prop("checked")) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    selectAll.prop("checked",true);
                } else {
                    selectAll.prop("checked",false);
                }
                //总数量和价钱
                allTotal();
            })
        //========================数量

            //===========================================增加
            
            down.click(function () {
                var id = $(this).parents('.store-item').data('option')
                var n = $(this).next().val();
                n--;
                if (n <= 1) {
                    $(this).addClass("disabled");
                    n = 1;
                }
                $(this).next().val(n);//数量
                //小计
                $(this).parent().children('.item-total').html((parseFloat($(this).parent().children('.price').html().substr(1)) * n).toFixed(2));
                //总数量和价钱
                allTotal();
                changeNum(n, id);
            })



            //===========================================减少

            up.click(function () {
                $(this).prev().prev().removeClass('disabled');
                var id = $(this).parents('.store-item').data('option')
                var n = $(this).prev().val();
                n++;
                $(this).prev().val(n);//数量
                //小计
                $(this).parent().children('.item-total').html((parseFloat($(this).parent().children('.price').html().substr(1)) * n).toFixed(2));
                //总数量和价钱
                allTotal();
                changeNum(n, id);
            })
        // }

        function changeNum(n,id) {
            $.ajax({
                type: 'get',
                url: 'api/doCar.php',
                data: {
                    style: 3,
                    user: user,
                    id: id,
                    n:n
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                    }
                }
            })
        }

        function allTotal(){
            var AN = 0, AS = 0;
            for (var i = 0; i < item.length; i++){
                if (item.eq(i).prop("checked")) {
                    AN += parseInt(num.eq(i).val());
                    AS+=parseFloat(total.eq(i).html())
                }
            }
            allNum.html(AN);
            allSum.html(AS.toFixed(2))
            $('.sidebar .sidebar-middle .mycar-btn .num').html(AN)
            $('.search .shopcard-num').html(AN)
        }

        //=================================删除
            del.click(function () {
                var _this = $(this);
                var listId = $(this).parents('.store-item').data('option')
                $.ajax({
                    type: 'get',
                    url: 'api/doCar.php',
                    data: {
                        style:2,
                        id: listId,
                        user:user
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            _this.parents('.store-item').find('.chk-item').prop('checked',false);
                            allTotal();
                            _this.parents('.store-item').remove();
                            // console.log(carMain.children.length)    
                            for (var i = 0; i < carMain.children().length; i++){
                                
                                if(carMain.children().eq(i).find('.store-item').length==0){
                                    carMain.children().eq(i).remove();
                                }
                            }
                            if (carMain.children().length == 0) {
                            history.go(0)
                            }
                        }
                    }
                })
            })
    }
    return { myCar: fun }
}()