var address = "server.mjczy.xyz:"+(('https:' === document.location.protocol)?"8764":"8765");
$(function() {
    $(".forgotBtn").click(function() {
        $("#forgot, #formContainer").toggleClass("toggle")
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
                url: '//'+address+'/api/login?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
                dataType : "jsonp",//数据类型为jsonp
                jsonp: "callback",//服务端返回回调方法名
                success: function (data) {
                    console.log(data);
                    if (data.errno === 0) {
                        window.location = 'bestvpn.html';
                    } else {
                        alert("用户名或密码错误");
                    }
                }
            });
        }
    });
    let sending = false;
    $("#registerSendEmailBtn").click(function () {
        if(!sending) {
            sending = true;
            var email = document.getElementById("registerEmail").value;
            if(email==='' || email===undefined || email===null) {
                alert("请输入邮箱");
            } else if(!isEmail(email)) {
                alert("请输入正确的邮箱");
            } else {
                $.ajax({
                    url: '//'+address+'/api/register?email=' + encodeURIComponent(email) + '&getCode=1',
                    dataType : "jsonp",//数据类型为jsonp
                    jsonp: "callback",//服务端返回回调方法名
                    success: function (data) {
                        console.log(data);
                        switch (data.errno) {
                            case 0:
                                break;
                            case 1:
                                alert("数据格式有误");
                                break;
                            case 2:
                                alert("此用户名已注册");
                                break;
                            case 3:
                                alert("此邮箱已注册");
                                break;
                            case 4:
                                break;
                            case 5:
                                alert("验证码错误");
                                break;
                            default:
                                alert("无法解析返回数据");
                        }
                    }
                });
                var timeClock;
                var timer_num = 60;
                $('#registerSendEmailBtn').html('请等待60秒后重新发送');
                timeClock = setInterval(function () {
                    timer_num--;
                    $('#registerSendEmailBtn').html('请等待' + timer_num + '秒后重新发送');
                    if (timer_num == 0) {
                        clearInterval(timeClock);
                        $('#registerSendEmailBtn').html('发送验证码');
                        sending = false;
                    }
                }, 1000);
            }
        }
    });
    $("#registerBtn").click(function() {
        var username = document.getElementById("registerUsername").value;
        var password = document.getElementById("registerPassword").value;
        var email = document.getElementById("registerEmail").value;
        var passwordAgain = document.getElementById("registerPasswordAgain").value;
        var code = document.getElementById("registerCode").value;
        if(username==='' || username===undefined || username===null) {
            alert("请输入用户名");
        } else if(password==='' || password===undefined || password===null) {
            alert("请输入密码");
        } else if(email==='' || email===undefined || email===null) {
            alert("请输入邮箱");
        } else if(passwordAgain==='' || passwordAgain===undefined || passwordAgain===null) {
            alert("请再次输入密码");
        } else if(password!==passwordAgain) {
            alert("两次密码不相同");
        } else if(!isEmail(email)) {
            alert("请输入正确的邮箱");
        } else if(!check(username, password)){
            alert("用户名或密码格式错误");
        } else if(code==='' || code===undefined || code===null){
            alert("请输入验证码");
        } else {
            $.ajax({
                url: '//'+address+'/api/register?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&email=' + encodeURIComponent(email) + '&code=' +
                    encodeURIComponent(code),
                dataType : "jsonp",//数据类型为jsonp
                jsonp: "callback",//服务端返回回调方法名
                success: function (data) {
                    console.log(data);
                    switch (data.errno) {
                        case 0:
                            window.location='bestvpn.html';
                            break;
                        case 1:
                            alert("数据格式有误");
                            break;
                        case 2:
                            alert("此用户名已注册");
                            break;
                        case 3:
                            alert("此邮箱已注册");
                            break;
                        case 4:
                            alert("需要验证码");
                            break;
                        case 5:
                            alert("验证码错误");
                            break;
                        default:
                            alert("无法解析返回数据");
                    }
                }
            });
        }
    })
});