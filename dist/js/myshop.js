$(function ($) {

    var uid = window.localStorage.getItem("uid");
    if (uid == 43450) {

        //添加商品
        $(".addbtn").click(function () {
            var url = "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php";
            $.post(url,
                { pimg: "../img/clock-4.jpg", pname: "德国默勒", pprice: "8113", pdesc: "1678", uid: "43450" },
                function (data) {
                    alert(data.msg);
                    console.log(data.msg);
                });
        })

        // 显示我的商品
        var url2 = "http://jx.xuzhixiang.top/ap/api/productlist.php?uid=43450";
        $.get(url2, res => {
            console.log(res.data);
            let html1 = "";
            res.data.forEach((v, i) => {
                console.log(v);
                html1 += `
                <a class="boxshadow" href="" data-id=${v.pid}>
                    <p class="g-img"> 
                        <img src="${v.pimg}" alt="">
                    </p>
                    <p class="p1">${v.pname}</p>
                    <p class="p2">${v.pname}1</p>
                    <div class="fenqi">
                        <em>月付</em>
                        <span class="sp1">￥${(v.pprice/12).toFixed(2)}</span>
                        <span class="sp2">￥${v.pprice}</span>
                    </div>
                </a>
        `
            });
            $con = $(".main-clock_7 .content");
            $con.html(html1);
        })

}
else{
    $(".main-clock_7 .content").html("");
}
})
