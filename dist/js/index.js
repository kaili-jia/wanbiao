$(function ($) {
    var swiper = new Swiper('.swiper-container', {
        effect: 'fade',
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    //鼠标滑进 停止轮播
    var comtainer = document.querySelector('.swiper-container');
    comtainer.onmouseenter = function () {
        swiper.autoplay.stop();
    };
    // 鼠标离开 继续轮播
    comtainer.onmouseleave = function () {
        swiper.autoplay.start();
    }

    var swiper2 = new Swiper('.swiper-container2', {
        effect: 'slide',
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    //鼠标滑进 停止轮播
    var comtainer = document.querySelector('.swiper-container2');
    comtainer.onmouseenter = function () {
        swiper2.autoplay.stop();
    };
    // 鼠标离开 继续轮播
    comtainer.onmouseleave = function () {
        swiper2.autoplay.start();
    }

    //main-clock_4  选项卡滑过
    var arr = $(".xxk li").get();
    var arr1 = $(".clock_4 .c4list").get();
    var arr2 = $(".xxk li i").get();
    arr.forEach((v, i) => {
        console.log(v, i);
        v.onmouseenter = function () {
            for (var j = 0; j < arr1.length; j++) {
                arr[j].style.color = "#666";
                arr[j].style.backgroundColor = "#e6e6e6";
                arr2[j].style.display = "none";
                arr1[j].style.display = "none";
            }
            arr1[i].style.display = "block";
            arr2[i].style.display = "block";
            arr[i].style.color = "#f2d291";
            arr[i].style.backgroundColor = "#333";
        }
    });
    // 左按钮事件
    $leftbtn = $(".main-clock_4 .left-btn");
    $leftbtn.click(function () {
        let flag = true;
        arr1.forEach((v, i) => {
            if (v.style.display == "block" && flag == true) {
                console.log(i);
                var index = i;
                if (i == 0) {
                    index = 3;
                }
                index--;
                console.log(index)
                let xxk = $(".xxk li").get();
                xxk[index].onmouseenter();
                flag = false;
            }
        })
    })
    // 右按钮事件
    $rightbtn = $(".main-clock_4 .right-btn");
    $rightbtn.click(function () {
        let flag = true;
        arr1.forEach((v, i) => {
            if (v.style.display == "block" && flag == true) {
                console.log(i);
                var index = i;
                if (i == 2) {
                    index = -1;
                }
                index++;
                console.log(index);
                let xxk = $(".xxk li").get();
                xxk[index].onmouseenter();
                flag = false;
            }
        })
    })



    // 固定在上方的div
    $fixednav = $(".fixednav");
    console.log($fixednav)
    $(window).scroll(function () {
        // console.log($(document).scrollTop());
        if ($(document).scrollTop() >= 200) {
            $fixednav.css({
                display: "block"
            })
        } else {
            $fixednav.css({
                display: "none"
            })
        }
    }
    )

    // 退出登陆
    $exit=$(".exit");
    $exit.click(function(){
        // 清空当地记录
        window.localStorage.clear();
    }
    )

    // 猜你喜欢
    // window.localStorage.clear();
    var uid = localStorage.getItem("uid");
    var url;
    console.log(uid);
    console.log(uid==43450)
    if (uid == 43450) {
        url = "http://jx.xuzhixiang.top/ap/api/productlist.php?uid=43450";
    } else if (uid == null) {
        url = "http://jx.xuzhixiang.top/ap/api/productlist.php?pagesize=20&pagenum=1";
    }
    $.get(url, res => {
        console.log(res.data);
        let html1 = "";
        res.data.forEach((v, i) => {
            console.log(v);
            html1 += `
                    <a class="boxshadow" href="../html/details.html" data-id=${v.pid}>
                        <p class="g-img"> 
                            <!--<img src="./img/goods.jpg" alt="">-->
                            <img src="${v.pimg}" alt="">
                        </p>
                        <p class="p1">${v.pname}</p>
                        <p class="p2">${v.pname}</p>
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

        
        $(".clock_7 a").click(function(){
            var id=$(this).attr("data-id");
            window.localStorage.setItem("pid",id);
        })

    })


    
})