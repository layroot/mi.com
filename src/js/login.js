import $ from './lib/jquery.js'
import "./lib/jquery-md5.js"
(function() {
    $('.login_btn').on('click', function() {
        $.ajax({
            type: "get",
            url: "../php/lib/login.php",
            data: {
                password: $.md5($('#password').val() + 520),
                username: $('#username').val()
            },
            dataType: "json",
            success: function(response) {
                if (response.cg) {

                    alert("成功");
                    location.href = "http://localhost/mi.com/src/html/index.html"
                } else {
                    alert("用户名或者密码错误");
                    $('#username').val("")
                    $('#password').val("")
                }
            }
        });
    })

})()