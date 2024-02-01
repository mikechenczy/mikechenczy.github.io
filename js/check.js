let debug = false;
let urlPrefix = debug?'http://localhost:8880/':'/backend/'
$(function(){
    $("#avatar").hide();
});
$.ajax({
    url: urlPrefix + 'api/checkvd',
    dataType: "json",
    success: function (data) {
        switch (data.errno) {
            case 0:
                $("#version").text(data.v);
                $("#downloads").text(data.d)
                break;
        }
    }
});
var username = getCookie('username')
var password = getCookie("password")
if(username != null && username !== "" && password != null && password !== "" && check(username, password)) {
    $.ajax({
        url: debug?"https://mjczy.top/getIp":"getIp",
        success: function (data) {
            var pattern = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
            console.log(pattern.exec(data)[0]);
            $.ajax({
                url: urlPrefix+'user/login?device=web&username=' + encodeURIComponent(username) + '&password='
                    + encodeURIComponent(password) + '&ipAddress=' + encodeURIComponent(pattern.exec(data)[0]),
                dataType : "json",
                success: function (data) {
                    switch (data.errno) {
                        case 0:
                            $(function(){
                                $("#avatar").show();
                                $("#login").hide();
                            });
                            break;
                    }
                }
            });
        }
    });
}