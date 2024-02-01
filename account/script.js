var userId;
if(getCookie("username")==null || getCookie("password")==null) {
    window.location = 'login.html';
}
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
            url: urlPrefix+'user/login?device=web&username=' + encodeURIComponent(getCookie('username')) + '&password='
                + encodeURIComponent(getCookie('password')) + '&ipAddress=' + encodeURIComponent(ip),
            dataType : "json",
            success: function (data) {
                console.log(data);
                if (!(data.errno === 0)) {
                    window.location = 'login.html';
                }
                userId = JSON.parse(data.user).userId;
                document.getElementById("user").innerHTML += JSON.parse(data.user).username;
                document.getElementById("vip").innerHTML += new Date(Number(JSON.parse(data.user).vip)).toLocaleString();
            }
        });
        $.ajax({
            url: urlPrefix+'pay/getPayTypes',
            dataType: "json",
            success: function (data) {
                console.log(data.payTypes);
                for (let i = 0; i < data.payTypes.length; i++) {
                    const item = data.payTypes[i];
                    console.log(item);
                    var input = document.createElement('input');
                    input.setAttribute('type', 'radio');
                    input.setAttribute('name', 'vip');
                    input.setAttribute('payType', item.payType);
                    if(i==0) {
                        input.setAttribute('checked', 'true');
                    }
                    document.getElementById('choosePay').appendChild(input);
                    var label = document.createElement('label');
                    label.innerHTML = item.description+item.time;
                    document.getElementById('choosePay').appendChild(label);
                    var br = document.createElement('br');
                    document.getElementById('choosePay').appendChild(br);
                }
            }
        });
    }
});
        //复制文本
        function copyText(text) {
            var element = createElement(text);
            element.select();
            element.setSelectionRange(0, element.value.length);
            document.execCommand('copy');
            element.remove();
            alert("已复制到剪切板");
        }
 
        //创建临时的输入框元素
        function createElement(text) {
            var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            var element = document.createElement('textarea');
            // 防止在ios中产生缩放效果
            element.style.fontSize = '12pt';
            // 重置盒模型
            element.style.border = '0';
            element.style.padding = '0';
            element.style.margin = '0';
            // 将元素移到屏幕外
            element.style.position = 'absolute';
            element.style[isRTL ? 'right' : 'left'] = '-9999px';
            // 移动元素到页面底部
            let yPosition = window.pageYOffset || document.documentElement.scrollTop;
            element.style.top = `${yPosition}px`;
            //设置元素只读
            element.setAttribute('readonly', '');
            element.value = text;
            document.body.appendChild(element);
            return element;
        }
$(function() {
    $("#logout").click(function() {
        removeCookie("username");
        removeCookie("password");
        window.location = 'login.html';
    });
    $("#pay").click(function() {
        var payType = -1;
        for (var i = 0; i < document.getElementsByName("vip").length; i++) {
            if(document.getElementsByName("vip")[i].checked) {
                payType=document.getElementsByName("vip")[i].getAttribute("payType")
            }
        }
        if(payType===-1) {
            return;
        }
        console.log(payType);
        $.ajax({
            url: urlPrefix+'pay/pay?payType=' + payType + '&username=' + encodeURIComponent(getCookie('username')) + '&password='
            + encodeURIComponent(getCookie('password')),
            dataType: "text",
            success: function (data) {
                console.log(data);
                var payNo = data.substring(data.length-40);
                var url = data.substring(0, data.length-40);
                window.location = "qrcode.html?url="+url+"&payNo="+payNo; 
            }
        });
    });
    $("#copy").click(function(){
        copyText("https://mjczy.top/backend/api/getNodes?userId="+userId+"&type=ssr");
    });
});