$(function ($) {
    //获取现在存储的pid
    var pid = window.localStorage.getItem("pid");
    var uid = window.localStorage.getItem('uid');
    console.log(pid, uid);
    // 根据商品的pid找到该商品的详情
    var url = `http://jx.xuzhixiang.top/ap/api/detail.php?id=${pid}`;
    $.get(url, res => {
        console.log(res.data);
        var obj = res.data;
        var html1 = `
            <div class="detail-left fl">
                <div class="left-img">
                    <img id="pimg" src="${obj.pimg}" alt="">
                    <div class="bott-img">
                        <img src="../img/bot-img.png" alt="">
                    </div>
                </div>
            </div>
            <div class="detail-right fr">
                <div id="pname" class="title">
                    ${obj.pname}
                </div>
                <div class="clockstyle">
                    手表的风格
                    <span>咨询优惠>></span>
                </div>
                <div class="model clear_float">
                    <div class="model-a fl ">
                        <span>型号:</span>
                        <span>xinghao1</span>
                    </div>
                    <div class="model-b fl">
                        <span>编号:</span>
                        <span id="pid">${obj.pid}</span>
                    </div>
                    <div class="model-c fl">
                        <span>品牌:</span>
                        <span>品牌1</span>
                    </div>
                    <div class="model-d fr">
                        <span>销量:</span>
                        <span id="pdesc">${obj.pdesc}</span>
                    </div>
                </div>

                <!-- 价格 -->
                <div class="price">
                    <div class="fenqi">
                        <div class="fenqi-left">分期</div>
                        <div class="fenqi-right">
                            <span class="fenqi-price">
                                <em>￥</em>
                                <i id="fenqi-pprice">${(obj.pprice / 12).toFixed(2)}</i>
                                ×12期
                            </span>
                            <span class="mianxi">
                                <i></i>
                                免息免手续费
                            </span>
                        </div>
                    </div>
                    <div class="allprice">
                        <div class="allprice-left">万表价</div>
                        <div class="allprice-right">
                            <em>￥</em>
                            <span id="pprice">${obj.pprice}</span>
                            <span>市场价 ￥6300</span>
                        </div>
                    </div>
                    <div class="cuxiao clear_float">
                        <p class="cuxiao-left fl">促销</p>
                        <div class="cuxiao-right fl">
                            <a href="">
                                <span class="sp1">[满减]</span>
                                <span class="sp2">每满500减300</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="peisong clear_float">
                    <div class="pei-left fl">
                        配送
                    </div>
                    <div class="pei-right fl">
                        <i>(顺丰包邮)</i>
                        预计4-8个工作日内发货
                    </div>
                </div>
                <div class="promise clear_float">
                    <div class="promise-left fl">
                        承诺
                    </div>
                    <div class="promise-right fl">
                        <li>
                            <i></i>
                            <span>正品保障</span>
                        </li>
                        <li>
                            <i></i>
                            <span>正规发票</span>
                        </li>
                        <li>
                            <i></i>
                            <span>假一赔三</span>
                        </li>
                        <li>
                            <i></i>
                            <span>7天退换</span>
                        </li>
                        <li>
                            <i></i>
                            <span>全球联保</span>
                        </li>
                    </div>
                </div>


                <!-- 数量 -->
                <div class="number clear_float">
                    <div class="number-left fl">
                        数量
                    </div>
                    <div class="number-right fl clear_float">
                        <span class="reduce fl">-</span>
                        <input class="fl" type="text" value="1" id="count">
                        <span class="add fl">+</span>
                    </div>
                </div>

                <!-- 购买 -->
                <div class="buy-btn clear_float">
                    <div class="purchase page fl">
                        立即购买
                    </div>
                    <div class="shopCart page fl">
                        加入购物车
                    </div>
                    <div class="code fl">
                        <p class="iconfont"></p>
                        <p class="text">
                            手机购买
                        </p>
                    </div>
                </div>
    </div>
        `
        $con = $("#detail");
        $con.html(html1);


        // 数量减少按钮
        $(".reduce").click(function () {
            // 数字
            var num = Number($("#count").val());
            if (1 == num) {
                alert("商品的数量不能小于1！")
            } else {
                num--;
            }
            $("#count").val(num);
            console.log(num)
        })
        //数量增加按钮
        $(".add").click(function () {
            // 数字
            var num = Number($("#count").val());
            num++;
            $("#count").val(num);
            console.log($("#count").val());
        })


        // 加入购物车按钮
        $(".shopCart").click(function () {
            // 数字
            var num = Number($("#count").val());
            var url1 = `http://jx.xuzhixiang.top/ap/api/add-product.php?uid=${uid}&pid=${pid}&pnum=${num}`;
            console.log(url1)
        })

    })



})