$(function ($) {
    // 获取当地存储的uid
    var uid = window.localStorage.getItem('uid');
    if (uid != null) {
        $goods = $(".goods");
        //查询用户购物车中的商品

        var url = `http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${uid}`;
        console.log(url);
        $.get(url, res => {
            console.log(res.data);
            var html1 = "";
            res.data.forEach((v, i) => {
                html1 += `
                <div class="goods-right clear_float">
                    <span class="select_tik">
                        <input type="checkbox" class="icon-check1"/>
                        
                    </span>
                    <a href="" class="clear_float fl ">
                        <div class="goods-img fl">
                            <img id="pimg" src="${v.pimg}" alt="">
                        </div>
                        <div class="goods-txt fl">
                            <div class="goods-a">
                                <p class="p1" id="pname">${v.pname}</p>
                            </div>
                        </div>
                    </a>

                    <ul class="fr">
                        <li class="price" id="pprice">
                            ￥
                            <em>${v.pprice}</em>
                        </li>
                        <li class="goods-num" >
                            <span data-id="${v.pid}" data-price="${v.pprice}" class="reduce fl">-</span>
                            <input data-id="${v.pid}" class="num fl" type="text" value="${v.pnum}" id="count">
                            <span data-id="${v.pid}" data-price="${v.pprice}" class="add fl">+</span>
                        </li>
                        <li class="total-price">
                            ￥
                            <em class="total">${v.pprice * v.pnum}</em>
                        </li>
                        <li class="others">
                            <a data-id="${v.pid}" class="delete-goods">删除</a>
                            <a href="">移入收藏</a>
                        </li>

                    </ul>
                </div>
        `
            });
            // 向购物车页面添加购物车数据
            $goods.prepend(html1);


            // 数量减少按钮
            $(".reduce").click(function () {
                // 获取点击减少的商品id
                var pid = $(this).attr("data-id");
                var pprice = $(this).attr("data-price");

                // 商品数量
                var num = Number($(this).next("input").val());
                if (1 == num) {
                    alert("商品的数量不能小于1！")
                } else {
                    num--;
                }
                $(this).next("input").val(num);
                console.log(num)

                //更改购物车中商品数量
                var urlchange = `http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=${uid}&pid=${pid}&pnum=${num}`;
                $.get(urlchange, res => {
                    // console.log(res.msg);
                })

                var totalmoney = pprice * num;
                $(this).parent().next().find(".total").text(totalmoney);

                allPrice();
            })

            //数量增加按钮
            $(".add").click(function () {
                var pid = $(this).attr("data-id");
                var pprice = $(this).attr("data-price");
                // 数字
                var num = Number($(this).prev("input").val());
                num++;
                $(this).prev("input").val(num);

                //更改购物车中商品数量
                var urlchange = `http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=${uid}&pid=${pid}&pnum=${num}`;
                $.get(urlchange, res => {
                    // console.log(res.msg);
                })

                var totalmoney = pprice * num;
                $(this).parent().next().find(".total").text(totalmoney);

                allPrice();
            })

            // 商品单选按钮
            $(".goods-right").find(".icon-check1").click(function () {
                var flag = true;
                var arr = $(".goods-right").find(".icon-check1").get();
                arr.forEach(v => {
                    if (!v.checked) {
                        flag = false;
                    }
                })
                $("#allchecked-bot").get(0).checked = flag;
                $("#allchecked-top").get(0).checked = flag;

                allPrice();
            })

            // 全选按钮的点击
            $("#allchecked-bot").click(function () {
                allSelected($(this));

            })

            $("#allchecked-top").click(function () {
                allSelected($(this));
            })

            // 删除按钮的点击
            $(".delete-goods").click(function () {
                deleteGoods($(this));
                // 删除之后再计算一下全选
            })


            //全部删除
            $(".deleteall a").click(function () {
                console.log($("#allchecked-bot").get(0).checked)
                if ($("#allchecked-bot").get(0).checked) {
                    $(".delete-goods").get().forEach(v => {
                        v.click();
                    })
                }

            })


        })
        


        //合计
        function allPrice() {
            $all = $("#allprice");
            $all.text("￥0");
            var arr = $(".goods-right").find(".icon-check1").get();
            var sum = 0;
            arr.forEach((v, i) => {
                if (v.checked) {
                    var num = $(v).parent().parent().find(".total").text();
                    console.log(num);
                    sum += Number(num);
                }
            })

            $all.text("￥" + sum);

        }


        // 全选按钮点击
        function allSelected(sel) {
            var flag = $(sel).get(0).checked;
            var arr = $(".goods-right").find(".icon-check1").get();
            arr.forEach(v => {
                v.checked = flag;
            })

            $("#allchecked-bot").get(0).checked = flag;
            $("#allchecked-top").get(0).checked = flag;

            allPrice();
        }

        //删除deleteone商品 的dom和购物车中的数据
        function deleteGoods(delOne) {
            var pid = $(delOne).attr("data-id");
            var url = `http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid=${uid}&pid=${pid}`
            $.get(url, res => {
                console.log(res.msg);
                if (res.msg == "删除成功") {
                    $(delOne).parent().parent().parent().remove();
                }

                var flag = true;
                var arr = $(".goods-right").find(".icon-check1").get();
                arr.forEach(v => {
                    if (!v.checked) {
                        flag = false;
                    }
                })
                $("#allchecked-bot").get(0).checked = flag;
                $("#allchecked-top").get(0).checked = flag;

                // 删除之后再计算一下价格
                allPrice();
            })
            
        }


      
    }
})