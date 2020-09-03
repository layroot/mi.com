import $ from './lib/jquery.js'
import "./lib/jquery-md5.js"
(function() {

    $('#username').on('input', function() {
        let reg = /^[A-z][\w]{5,17}$/
        let res = reg.test($('#username').val())
        if (res) {
            $('#usernames').text('格式正确')
            $.ajax({
                type: "get",
                url: "../php/lib/yz.php",
                data: {
                    username: $('#username').val()
                },
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    if (response.yz) {
                        $('#username').attr('data-pass', true);
                        console.log(response.msg)
                    } else {
                        $('#username').attr('data-pass', false);
                        console.log(response.msg)
                    }
                }
            });

        } else {
            $('#username').attr('data-pass', false);
            $('#usernames').text('格式错误')

        }
        cheak()


    })
    $('#phone-num').on('input', function() {
        let reg = /^1[3-9]\d{9}$/
        let res = reg.test($('#phone-num').val())
        if (res) {
            $('#phones').text('格式正确')
            $(this).attr('data-pass', true);
        } else {
            $('#phones').text('格式错误')
            $(this).attr('data-pass', false);
        }
        cheak()

    })
    $('#password').on('input', function() {
        let arr = [
            /^.{6,16}$/,
            /\d+/,
            /[a-z]+/,
            /[A-Z]+/,
            /\W+/
        ]
        let res = arr.map(function(val) {
            return val.test($('#password').val())
        })
        let jishu = res.reduce(function(obj, cur) {
            cur && obj.count++
                return obj
        }, { count: 0 })
        if (res[0]) {
            $(this).attr('data-pass', true);
            switch (jishu.count) {
                case 1:
                case 2:
                    $('#passwords').text('密码太简单');
                    break;
                case 3:
                    $('#passwords').text('弱');
                    break;
                case 4:
                    $('#passwords').text('中');
                    break;
                case 5:
                    $('#passwords').text('强');
            }
        } else {
            $(this).attr('data-pass', false);
        }
        cheak()
    })
    $('#affirm-password').on('input', function() {
        if ($(this).val() == $('#password').val()) {
            $('#affs').text('密码一致')
            $(this).attr('data-pass', true);
        } else {
            $('#affs').text('密码不一致')
            $(this).attr('data-pass', false);
        }
        cheak()
    })

    function cheak() {
        if ($('[data-pass=true]').length == 4) {
            $('#btn').removeAttr('disabled');
            $('#btn').css('background-color', '#ff6700');
        } else {
            $('#btn').css('background-color', 'gray');
            $('#btn').attr('disabled', 'disabled');
        }
    }

    $('#btn').on('click', function() {

        $.ajax({
            type: "get",
            url: "../php/lib/register.php",
            data: {
                username: $('#username').val(),
                phone: $('#phone-num').val(),
                password: $.md5($('#password').val() + 520)
            },
            dataType: "dataType",
            success: function(response) {
                location.href = "http://localhost/mi.com/src/html/login.html"
            }
        });
    })
})()