var backendAddress = "localhost:8765"
$(function() {
    $.ajax({
        url: 'http://' + backendAddress + '/api/checkvd',
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            switch (data.errno) {
                case 0:
                    $("#version").text(data.v);
                    $("#downloads").text(data.d)
                    break;
            }
        }
    });
});