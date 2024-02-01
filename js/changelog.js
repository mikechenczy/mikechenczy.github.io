let debug = false;
let urlPrefix = debug?'http://localhost:8880/':'/backend/'
$.ajax({
    url: urlPrefix + 'api/changelog',
    dataType: "json",
    success: function (data) {
        switch (data.errno) {
            case 0:
                $(function() {
                    $("#changelog-bestvpn").text(data.b);
                    $("#changelog-letschat").text(data.l);
                })
                break;
        }
    }
});