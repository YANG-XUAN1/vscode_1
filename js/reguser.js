
layui.use(['form', 'jquery'], function () {
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer;

    $('.bind-password').on('click', function () {
        if ($(this).hasClass('icon-5')) {
            $(this).removeClass('icon-5');
            $("input[name='password']").attr('type', 'password');
        } else {
            $(this).addClass('icon-5');
            $("input[name='password']").attr('type', 'text');
        }
    });

    $('.bind-password2').on('click', function () {
        if ($(this).hasClass('icon-5')) {
            $(this).removeClass('icon-5');
            $("#cpwb").attr('type', 'cpassword');
        } else {
            $(this).addClass('icon-5');
            $("#cpwb").attr('type', 'text');
        }
    });

    $('.icon-nocheck').on('click', function () {
        if ($(this).hasClass('icon-check')) {
            $(this).removeClass('icon-check');
        } else {
            $(this).addClass('icon-check');
        }
    });


    form.on('submit(login)', function (data) {
        data = data.field;

        let regUser = /^\w{4,12}$/
        let regPass = /^[\w!-@#$%^&*]{6,20}$/
        let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

        if (!regUser.test(data.username)) {
            layer.msg('用户名是4-12位数字、字母和下划线！')
            return false
        }

        if (!regPass.test(data.password)) {
            layer.msg('密码是6到20位字母、数字，还可包含@!#$%^&*-字符')
            return false
        }

        if (!regEmail.test(data.email)) {
            layer.msg('邮箱不符合标准')
            return false
        }



        $.post('http://127.0.0.1:8080/api/reguser', data, (res) => {
            if (res.status == 0) {
                localStorage.setItem('token', res.token)
                layer.msg('注册成功', function () {
                    window.location = '../../index.html';
                });
            } else {
                layer.msg('注册失败')
            }
        })

        return false;
    });
})
