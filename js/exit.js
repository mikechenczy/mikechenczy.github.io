var backendAddress = "180.76.187.250:"+(('https:' === document.location.protocol)?"8764":"8765")
$(function() {
    $.ajax({
        url: '//' + backendAddress + '/api/exit',
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            removeCookie("username")
            removeCookie("password")
            window.location="leapvpn.html";
        }
    });
});