var backendAddress = "159.75.69.133:8765"
$(function() {
    $("#avatar").hide();
    $.ajax({
        url: '//' + backendAddress + '/api/checkLogin',
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            switch (data.errno) {
                case 0:
                    $("#avatar").hide();
                    break;
                case 1:
                    $("#avatar").show();
                    $("#login").hide();
                    window.location = "bestvpn.html"
                    break;
            }
        }
    });
});