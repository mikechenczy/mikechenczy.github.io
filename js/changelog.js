var backendAddress = "139.224.206.212:"+(('https:' === document.location.protocol)?"8764":"8765")
$(function() {
    $.ajax({
        url: '//' + backendAddress + '/api/changelog',
        dataType: "jsonp",//数据类型为jsonp
        jsonp: "callback",//服务端返回回调方法名
        success: function (data) {
            switch (data.errno) {
                case 0:
                    $("#changelog-bestvpn").text(data.b);
                    $("#changelog-letschat").text(data.l);
                    break;
            }
        }
    });
});