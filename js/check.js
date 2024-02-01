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
        dataType: "text",
        success: function (data) {
            console.log(data);
            var pattern = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
            var ip = "";
            if(pattern.exec(data)==null) {
                pattern = /(([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4})/;
                if(pattern.exec(data)!=null) {
                    ip = pattern.exec(data)[0];
                }
            }
            console.log(ip);
            $.ajax({
                url: urlPrefix+'user/login?device=web&username=' + encodeURIComponent(username) + '&password='
                            + encodeURIComponent(password) + '&ipAddress=' + encodeURIComponent(ip),
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