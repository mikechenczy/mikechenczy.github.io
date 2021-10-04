var backendAddress = "server.mjczy.xyz:"+(('https:' === document.location.protocol)?"8764":"8765")
$(function() {
    $("#avatar").hide();
    var username = getCookie('username')
    var password = getCookie("password")
    if(username != null && username !== "" && password != null && password !== "" && check(username, password)) {
        $.ajax({
            url: '//' + backendAddress + '/api/login?username=' + encodeURIComponent(username) + "&password=" + password
                + "&domain=" + document.domain,
            dataType: "jsonp",//数据类型为jsonp
            jsonp: "callback",//服务端返回回调方法名
            success: function (data) {
                switch (data.errno) {
                    case 0:
                        $("#avatar").show();
                        $("#login").hide();
                        break;
                }
            }
        });
    }
});