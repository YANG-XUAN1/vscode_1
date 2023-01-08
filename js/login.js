
layui.use(['form', 'jquery'], function () {
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer;

    // 登录过期的时候，跳出ifram框架
    if (top.location != self.location) top.location = self.location;

    $('.bind-password').on('click', function () {
        if ($(this).hasClass('icon-5')) {
            $(this).removeClass('icon-5');
            $("input[name='password']").attr('type', 'password');
        } else {
            $(this).addClass('icon-5');
            $("input[name='password']").attr('type', 'text');
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
        // if (data.username == '' || data.password == '') {
        //     layer.msg('用户名或密码不能为空');
        //     return false;
        // }

        let regUser = /^\w{4,12}$/
        let regPass = /^[\w!-@#$%^&*]{6,20}$/

        if (!regUser.test(data.username)) {
            layer.msg('用户名是4-12位数字、字母和下划线！')
            return false
        }

        if (!regPass.test(data.password)) {
            layer.msg('密码是6到20位字母、数字，还可包含@!#$%^&*-字符')
            return false
        }

        $.post('http://127.0.0.1:8080/api/login', data, (res) => {
            if (res.status == 0) {
                localStorage.setItem('token', res.token)
                layer.msg('登录成功', function () {
                    window.location = '../../index.html';
                });
            } else {
                layer.msg('登录失败')
            }
        })

        return false;
    });
})
