var backendAddress = "server.mjczy.xyz:"+(('https:' === document.location.protocol)?"8764":"8765")
$(function() {
    $.ajax({
        url: '//' + backendAddress + '/api/exit'+"&domain="+document.domain,
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            window.location="bestvpn.html";
        }
    });
});