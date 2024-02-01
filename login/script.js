let debug = false;
let urlPrefix = debug?'http://localhost:8880/':'/backend/'
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
                url: debug?"https://mjczy.top/getIp":"getIp",
                success: function (data) {
                    var pattern = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
                    console.log(pattern.exec(data)[0]);
                    $.ajax({
                        url: urlPrefix+'user/login?device=web&username=' + encodeURIComponent(username) + '&password='
                            + encodeURIComponent(password) + '&ipAddress=' + encodeURIComponent(pattern.exec(data)[0]),
                        dataType : "json",
                        success: function (data) {
                            console.log(data);
                            if (data.errno === 0) {
                                setCookie("username", username)
                                setCookie("password", password)
                                window.location = 'account.html';
                            } else {
                                alert("用户名或密码错误");
                            }
                        }
                    });
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
                    url: urlPrefix+'user/register?email=' + encodeURIComponent(email) + '&getCode=1',
                    dataType : "json",
                    success: function (data) {
                        console.log(data);
                        switch (data.errno) {
                            case 0:
                                setCookie("username", username)
                                setCookie("password", password)
                                window.location='account.html';
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
                url: urlPrefix+'user/register?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&email=' + encodeURIComponent(email) + '&code=' +
                    encodeURIComponent(code),
                dataType : "json",
                success: function (data) {
                    console.log(data);
                    switch (data.errno) {
                        case 0:
                            setCookie("username", username)
                            setCookie("password", password)
                            window.location='account.html';
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
    });
    $("#sendEmailBtn").click(function() {
        if(!sending) {
            sending = true;
            var email = document.getElementById("forgotEmail").value;
            if(email==='' || email===undefined || email===null) {
                alert("请输入用户名或邮箱");
            } else {
                $.ajax({
                    url: urlPrefix+'user/forgetPasswordEmail?username=' + encodeURIComponent(email),
                    dataType : "json",
                    success: function (data) {
                        console.log(data);
                        switch (data.errno) {
                            case 0:
                                var timeClock;
                                var timer_num = 60;
                                $('#sendEmailBtn').html('请等待60秒后重新发送');
                                timeClock = setInterval(function () {
                                    timer_num--;
                                    $('#sendEmailBtn').html('请等待' + timer_num + '秒后重新发送');
                                    if (timer_num == 0) {
                                        clearInterval(timeClock);
                                        $('#sendEmailBtn').html('发送验证码');
                                        sending = false;
                                    }
                                }, 1000);
                                break;
                            case 1:
                                alert("数据格式有误");
                                break;
                            case 2:
                                alert("用户不存在");
                                break;
                            default:
                                alert("无法解析返回数据");
                        }
                    }
                });
            }
        }
    });
    $("#submitBtn").click(function() {
        var username = document.getElementById("forgotEmail").value;
        var password = document.getElementById("forgotPassword").value;
        var passwordAgain = document.getElementById("forgotPasswordAgain").value;
        var code = document.getElementById("forgotCode").value;
        if(username==='' || username===undefined || username===null) {
            alert("请输入用户名或邮箱");
        } else if(password==='' || password===undefined || password===null) {
            alert("请输入密码");
        } else if(passwordAgain==='' || passwordAgain===undefined || passwordAgain===null) {
            alert("请再次输入密码");
        } else if(password!==passwordAgain) {
            alert("两次密码不相同");
        } else if(code==='' || code===undefined || code===null){
            alert("请输入验证码");
        } else {
            $.ajax({
                url: urlPrefix+'user/forgetPassword?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&code=' +
                    encodeURIComponent(code),
                dataType : "json",
                success: function (data) {
                    console.log(data);
                    switch (data.errno) {
                        case 0:
                            setCookie("username", username)
                            setCookie("password", password)
                            window.location='account.html';
                            break;
                        case 1:
                            alert("数据格式有误");
                            break;
                        case 2:
                            alert("用户不存在");
                            break;
                        case 3:
                            alert("验证码错误");
                            break;
                        default:
                            alert("无法解析返回数据");
                    }
                }
            });
        }
    });
});