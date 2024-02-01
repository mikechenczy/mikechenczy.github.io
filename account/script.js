let debug = true;
let urlPrefix = debug?'http://localhost:8880/':'/backend/'
if(getCookie("username")==null || getCookie("password")==null) {
    //window.location = 'login.html';
}
$.ajax({
    url: urlPrefix+'user/login?device=web&username=' + encodeURIComponent(getCookie('username')) + '&password='
        + encodeURIComponent(getCookie('password')),
    dataType : "json",
    success: function (data) {
        console.log(data);
        if (!(data.errno === 0)) {
            window.location = 'login.html';
        }
    }
});
$.ajax({
    url: urlPrefix+'pay/getPayTypes',
    dataType: "json",
    success: function (data) {
        console.log(data);
    }
});
$(function() {
    $("#logout").click(function() {
        removeCookie("username");
        removeCookie("password");
        window.location = 'login.html';
    });
    $(".registerBtn").click(function() {
        $("#registerForm, #formContainer").toggleClass("toggle")
    })
    $("#loginBtn").click(function() {
        var username = document.getElementById("username").value
        var password = document.getElementById("password").value;
        if(username==='' || username===undefined || username===null) {
            alert("请输入用户名");
        } else if(password==='' || password===undefined || password===null) {
            alert("请输入密码");
        } else {
            $.ajax({
                url: urlPrefix+'api/login?username=' + encodeURIComponent(username) + '&password='
                    + encodeURIComponent(password),
                dataType : "jsonp",//数据类型为jsonp
                jsonp: "callback",//服务端返回回调方法名
                success: function (data) {
                    console.log(data);
                    if (data.errno === 0) {
                        setCookie("username", username)
                        setCookie("password", password)
                        window.location = 'account.html';
                    } else {
                        alert("用户名或密码错误");
                    }
                }
            });
        }
    });
});