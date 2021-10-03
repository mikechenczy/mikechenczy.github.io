var backendAddress = "localhost:8765"
$(function() {
    $.ajax({
        url: 'http://' + backendAddress + '/api/exit',
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            window.location="bestvpn.html";
        }
    });
});