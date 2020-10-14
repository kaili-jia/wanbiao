$(function($){
    $(".loginbtn").click(function(){
        var val1=$("#username").val();
        var val2=$("#pwd").val();
        var url="http://jx.xuzhixiang.top/ap/api/login.php?username="+val1+"&password="+val2;
        $.get(url,res=>{
            alert(res.msg);
            console.log(res)
            window.localStorage.setItem("user",res.data.username);
            window.localStorage.setItem("uid",res.data.id);

            window.location.href=("../index.html");
        })
    })
})