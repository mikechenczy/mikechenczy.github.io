
function check(username, password) {
    return !(username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || username === '' || password === '' || username === undefined || password === undefined ||
        username === null || password === null || username.length >= 15 || password.length >= 20);
}

function matchesSelector(element,selector){
    if(element.matches){
        return element.matches(selector);
    } else if(element.matchesSelector){
        return element.matchesSelector(selector);
    } else if(element.webkitMatchesSelector){
        return element.webkitMatchesSelector(selector);
    } else if(element.msMatchesSelector){
        return element.msMatchesSelector(selector);
    } else if(element.mozMatchesSelector){
        return element.mozMatchesSelector(selector);
    } else if(element.oMatchesSelector){
        return element.oMatchesSelector(selector);
    } else if(element.querySelectorAll){
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
            i = 0;

        while(matches[i] && matches[i] !== element) i++;
        return matches[i] ? true: false;
    }
    throw new Error('Your browser version is too old,please upgrade your browser');
}

function isEmail(email) {
    console.log(email);
    return email.match('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$')!=null;
}

function getCurrentDate() {
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

function getDate(time) {
    var now = new Date(time),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return null;
}

function formatFileSize(fileSize) {
    var fileSizeString = "";
    var wrongSize="0B";
    if(fileSize==0){
        return wrongSize;
    }
    if (fileSize < 1024){
        fileSizeString = fileSize + "B";
    }
    else if (fileSize < 1048576){
        fileSizeString = (fileSize / 1024).toFixed(2) + "KB";
    }
    else if (fileSize < 1073741824){
        fileSizeString = (fileSize / 1048576).toFixed(2) + "MB";
    }
    else{
        fileSizeString = (fileSize / 1073741824).toFixed(2) + "GB";
    }
    return fileSizeString;
}

function getFileIdByDataAndFileName(data, fileName) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].fileName == fileName) {
            return data[i].fileId;
        }
    }
    return null;
}

function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)

    if (start == -1) {
        return null;
    }

    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }

    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}