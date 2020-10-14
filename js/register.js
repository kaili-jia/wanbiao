$(function ($) {
    var userflag = false;
    $("#username").blur(function () {
        var val = $("#username").val();
        $i = $(".box").has("#username").find("i");
        var reg = /^.{2,8}$/;
        var flag = reg.test(val);
        if (!flag) {
            $i.text("请输入2-8个任意字符");
            userflag = false
        } else {
            $i.text("");
            userflag = true;
        }


    })

    var pwdflag = false;
    $("#pwd").blur(function () {
        var val = $("#pwd").val();
        $i = $(".box").has("#pwd").find("i");
        var reg = /^.{6,20}$/;
        var flag = reg.test(val);
        if (!flag) {
            pwdflag = false;
            $i.text("请输入6-20个任意字符！");
        } else {
            $i.text("");
            pwdflag = true;
        }
    })

    var repwdflag = false;
    $("#repwd").blur(function () {
        var val = $("#repwd").val();
        var val1 = $("#pwd").val();
        $i = $(".box").has("#repwd").find("i");
        if (val1 != val) {
            repwdflag = false;
            $i.text("密码不一致！");
        } else {
            $i.text("");
            repwdflag = true;
        }
    })

    $reg = $("#register");
    $reg.click(function () {
        var val1 = $("#username").val();
        var val2 = $("#pwd").val();
        if (repwdflag && pwdflag && userflag) {
            var url="http://jx.xuzhixiang.top/ap/api/reg.php?username="+val1+"&password="+val2;
            $.get(url,res=>{    
                alert(res.msg);
                if(res.code==1){
                    window.location.href="../html/login.html";
                }
            })
        }
    })

})