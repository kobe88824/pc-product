function getList(){var user = getCookie('user')
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
                    $('.mycar .car-empty').hide();
                    $('.mycar .car-header').show();
                    $('.mycar .car-foot').show();
                    $('.mycar .car-bar').show();
                    $('.mycar').addClass('car-bkg');
                    // $('.mycar .hot').addClass('hot-top');
                    barFix.fix()
                    myCar.myCar()

                }
            }
        })
        $('.mycar .car-empty span').hide()
    }
    function addCar(data) {

        var storeIdArr = [], storeNameArr=[];
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
            $.each(data, function (index,val) {//遍历店铺商品
                if (storeIdArr[i] == val.storeId) {
                    storeHtml += "<div class='store-item clearfix' data-option='"+val.listId+"'>";
                    storeHtml += "<div class='item-check'><input type='checkbox' class='chk-item'></div>";//复选框
                    
                    storeHtml += "<div class='item-pic'><a href='#' class='prod-img' target='_blank'>";//图片
                    if (val.img.indexOf('http') != -1) {
                        storeHtml +="<img src='"+val.img+"' alt='"+val.listName+"'>"//联网图片
                    } else {
                        storeHtml +="<img src='images/index/"+val.img+"' alt='"+val.listName+"'>"//本地图片
                    }
                    
                    
                    storeHtml += "</a></div>";
                    
                    storeHtml += "<div class='item-name'><a href='#'>" + val.listName + "</a></div>";//商品名
                    
                    storeHtml += "<div class='item-attr'>";//颜色/规格
                    storeHtml += "<p>颜色:"+ +"</p>";
                    storeHtml += "<p>规格:"+ +"</p>";
                    storeHtml += "</div>";

                    storeHtml += "<div class='item-price'>￥ <span>"+val.price+"</span></div>";//单价
                    
                    storeHtml += "<div class='item-count'>";//数量
                    if (val.listNum == 1) {
                        storeHtml += "<span class='btn-down disabled'>-</span>";
                    } else {
                        storeHtml += "<span class='btn-down'>-</span>";
                    }
                    storeHtml += "<input type='text' value='"+val.listNum+"' class='list-num'>";
                    storeHtml += "<span class='btn-up'>+</span>";
                    storeHtml += "</div>";

                    storeHtml += "<div class='item-total'>￥ <span>"+(val.price*val.listNum).toFixed(2)+"</span></div>";//合计

                    storeHtml += "<div class='item-action'><p class='favor'>收藏</p><p class='delete'>删除</p></div>";//操作
                
                    storeHtml += "</div>";
                }
            })
            storeHtml += "</div>";
            storeHtml += "</div>";
        }
        $('.car .car-main').html(storeHtml)
    }
})(jQuery)
    //点击购物车中立即登录按钮
    ; (function ($) {
        $('.mycar .car-empty span').click(function () {
            console.log(1)
            $('.header .ceng').show()
        })
})(jQuery)
var barFix = function () {
    function fun() {
        var conTop = $('.mycar .car-bar').offset().top;//距离页面顶部高度
        var winH = window.innerHeight;//窗口高度            
        var scrTop = $(document).scrollTop();//卷起高度
        var conH = $('.mycar .car-bar').height();//内容高度
        if (conTop - scrTop - winH + conH >= 0) {
            $('.mycar .car-bar').addClass('car-bar-fix')
        } else {
            $('.mycar .car-bar').removeClass('car-bar-fix')
        }
        $(window).scroll(function () {
            winH = window.innerHeight;//窗口高度            
            scrTop = $(document).scrollTop();//卷起高度
            conH = $('.mycar .car-bar').height();//内容高度
            if (conTop - scrTop - winH + conH >= 0) {
                $('.mycar .car-bar').addClass('car-bar-fix')
            } else {
                $('.mycar .car-bar').removeClass('car-bar-fix')
            }
        })
    }
    return { fix: fun }
}()
    //===================获取热销商品
    ; (function () {
        var time = new Date();
        $.ajax({
            type: "get",
            url: "http://search.ule.com/api/getJsonlisting",
            // http://search.ule.com/api/getJsonlisting?jsonCallBack=jsonp1547376571909&_=1547376572137&limit=10&pageIndex=1&listingTags=1210&listingState=0&sort=8&haveStorage=1
            jsonpCallback:'hotList',
            data: {
                _: time.getTime(),
                limit:10,
                pageIndex: 1,
                listingTags: 1210,
                listingState: 0,
                sort: 8,
                haveStorage: 1
            },
            jsonp:'jsonCallBack',
            dataType:'jsonp',
        })
        window.hotList=function(data) {
            // console.log(data.resultList)
            var hotList = '';
            $.each(data.resultList, function (index,val) {
                hotList += '<li>';
                hotList += '<a href="#" target="_blank">';
                hotList += '<img src="' + val.imgUrl + '">';
                hotList += '<span>'+val.listingName+'</span>';
                hotList += '</a>';
                hotList += '<span class="minprice">￥ '+val.minPrice+'</span>';
                hotList += '<del class="maxprice">￥ '+val.maxPrice+'</del>';
                hotList += '</li>';

            })
            $('.mycar .hot-con ul').html(hotList)
        }
})(jQuery)
var myCar = function () {
    function fun() {
        var selectAll = $('.mycar .select-all').get();
        var store = $('.car-main .chk-store').get();
        var item = $('.car-main .chk-item').get();
        var down = $('.car-main .btn-down').get();
        var up = $('.car-main .btn-up').get();
        var num = $('.car-main .list-num').get();
        var allNum = $('.car-bar .prod-count span').get(0);
        var total = $('.car-main .item-total span').get();
        var sum = $('.car-bar .prod-price span').get(0);
        var allSum = $('.car-bar .prod-total span').get(0);
        var discount = $('.car-bar .prod-discount span').get(0);
        var del = $('.car-main .item-action .delete').get();
        var carMain = $('.car-main').get(0);
        //*======================全选
        for (var i = 0; i < selectAll.length; i++){
            selectAll[i].onclick = function () {
                for (var i = 0; i < selectAll.length; i++){
                    selectAll[i].checked = this.checked;
                }

                //店铺
                for (var i = 0; i < store.length; i++) {
                    store[i].checked = this.checked;
                }
                //商品
                for (var i = 0; i < item.length; i++) {
                    item[i].checked = this.checked;
                }
                //总数量和价钱
                allTotal();
            }
        }
        //=====================店铺
        for (var i = 0; i < store.length; i++) {
            store[i].onclick = function () {
                //商品
                console.log(this.parentNode.parentNode.children[1].children.length)
                for (var j = 0; j < this.parentNode.parentNode.children[1].children.length; j++) {
                    this.parentNode.parentNode.children[1].children[j].children[0].children[0].checked = this.checked;
                }
                //全选
                var flag = true;
                for (var k = 0; k < store.length; k++) {
                    if (!store[k].checked) {
                        flag = false;
                        break;
                    }
                }
                // console.log(flag)
                if (flag) {
                    selectAll[0].checked = true;
                    selectAll[1].checked = true;
                } else {
                    selectAll[0].checked = false;
                    selectAll[1].checked = false;
                }
                //总数量和价钱
                allTotal();
            }
        }
        //====================商品
        for (var i = 0; i < item.length; i++) {
            item[i].onclick = function () {
                //店铺
                var flag = true;
                for (var j = 0; j < this.parentNode.parentNode.parentNode.children.length; j++) {
                    if (!this.parentNode.parentNode.parentNode.children[j].children[0].children[0].checked) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    this.parentNode.parentNode.parentNode.parentNode.children[0].children[0].checked = true;
                } else {
                    this.parentNode.parentNode.parentNode.parentNode.children[0].children[0].checked = false;
                }
                //全选
                var flag = true;
                for (var k = 0; k < store.length; k++) {
                    if (!store[k].checked) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    selectAll[0].checked = true;
                    selectAll[1].checked = true;
                } else {
                    selectAll[0].checked = false;
                    selectAll[1].checked = false;
                }
                //总数量和价钱
                allTotal();
            }
        }
        //========================数量
        for (var i = 0; i < down.length; i++) {

            //===========================================增加
            
            down[i].onclick = function () {
                var id=this.parentNode.parentNode.getAttribute('data-option')
                var n = this.parentNode.children[1].value;
                n--;
                if (n <= 1) {
                    this.className += " disabled";
                    n = 1;
                }
                this.parentNode.children[1].value = n;//数量
                //小计
                this.parentNode.parentNode.children[6].children[0].innerHTML = (parseFloat(this.parentNode.parentNode.children[4].children[0].innerHTML) * n).toFixed(2);
                //总数量和价钱
                allTotal();
                changeNum(n, id);
            }
           


            //===========================================减少

            up[i].onclick = function () {
                this.parentNode.children[0].className = "btn-down";
                var id=this.parentNode.parentNode.getAttribute('data-option')
                var n = this.parentNode.children[1].value;
                n++;
                this.parentNode.children[1].value = n;//数量
                    // console.log(n)
                //小计
                this.parentNode.parentNode.children[6].children[0].innerHTML = (parseFloat(this.parentNode.parentNode.children[4].children[0].innerHTML) * n).toFixed(2);
                //总数量和价钱
                allTotal();
                changeNum(n, id);
            }
        }

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
                       console.log(11)
    
                    }
                }
            })
        }

        function allTotal(){
            var AN = 0, AS = 0;
            for (var i = 0; i < item.length; i++){
                if (item[i].checked) {
                    AN += parseInt(num[i].value);
                    // console.log(total[i])
                    AS+=parseFloat(total[i].innerHTML)
                }
            }
            allNum.innerHTML = AN;
            sum.innerHTML = AS.toFixed(2);
            allSum.innerHTML=(AS-parseFloat(discount.innerHTML)).toFixed(2)
        }


        //=================================删除
        for (var i = 0; i < del.length; i++){
            del[i].onclick = function () {
                var _this = this;
                var listId=this.parentNode.parentNode.getAttribute('data-option')
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
                            _this.parentNode.parentNode.children[0].children[0].checked=false;
                            allTotal();
                            _this.parentNode.parentNode.outerHTML = '';
                            console.log(carMain.children.length)    
                            for (var i = 0; i < carMain.children.length; i++){
                                
                                if(carMain.children[i].children[1].children.length==0){
                                    carMain.children[i].outerHTML='';
                                }
                            }
                            if (carMain.children.length == 0) {
                            history.go(0)
                            }
                        }
                    }
                })
            }
                
        }
        $('.mycar .btn-bath').click(function () {
            var data = $('.car-main .chk-item')
            var delArr = [];
            $.each(data, function (index, val) {
                // console.log($('.car-main .chk-item').eq(index).prop("checked"))

                if (data.eq(index).prop("checked")) {

                    this.parentNode.parentNode.children[0].children[0].checked=false;
                    allTotal();
                    this.parentNode.parentNode.outerHTML = '';
                    console.log(carMain.children.length)    
                    for (var i = 0; i < carMain.children.length; i++){
                        
                        if(carMain.children[i].children[1].children.length==0){
                            carMain.children[i].outerHTML='';
                        }
                    }
                    if (carMain.children.length == 0) {
                    history.go(0)
                    }





                    var listId = $(this).parent().parent().data('option')
                    delArr.push(listId)
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
                               history.go(0)
                            }
                        }
                    })
                }
            })
            // console.log(flag)
        })
        $('.mycar .btn-clear').click(function () {
            $.ajax({
                type: 'get',
                url: 'api/doCar.php',
                data: {
                    style:4,
                    user:user
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        // _this.parentNode.parentNode.children[0].children[0].checked=false;
                        // allTotal();
                        // _this.parentNode.parentNode.outerHTML = '';
                        // console.log(carMain.children.length)    
                        // for (var i = 0; i < carMain.children.length; i++){
                            
                        //     if(carMain.children[i].children[1].children.length==0){
                        //         carMain.children[i].outerHTML='';
                        //     }
                        // }
                        // if (carMain.children.length == 0) {
                        history.go(0)
                        // }
                    }
                }
            })
        })



    }
    return { myCar: fun }
    }()
}
getList()