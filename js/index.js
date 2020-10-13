$(function ($) {
    var swiper = new Swiper('.swiper-container', {
        effect : 'fade',
        loop: true,
        autoplay:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        }
      });

      var swiper2 = new Swiper('.swiper-container2', {
        effect : 'slide',
        loop: true,
        autoplay:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });

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
    $fixednav=$(".fixednav");
    console.log($fixednav)
    $(window).scroll(function () {
        console.log($(document).scrollTop());
        if($(document).scrollTop()>=200){
            $fixednav.css({
                display:"block"
            })
        }else{
            $fixednav.css({
                display:"none"
            })
        }
    }
    )



})