
$(function () {
    // 定义开关变量
    var flagUser = false
    var flagPwd = false


    // 找到所在标签元素
    var $userName = $('#username')
    var $pwd = $('#pwd')
    var $form = $('#loginForm')
    var $reguser = $('#reguserBtn')

    // 1.如果失去焦点，则进行检查判断用户名是否合法
    $userName.on('blur', function () {
        // 封装函数 调用函数
        fnCheckUser()
    })
    function fnCheckUser() {
        // 获取用户输入的数据
        let userWord = $userName.val()
        // 正则，正则验证用户输入的数据是否合法
        var regUser = /^\w{3,20}$/

        if (userWord == '') {
            $userName.next().show().html('用户名不能为空')
            flagUser = false
            return
        }
        if (regUser.test(userWord)) {
            // 合法 -- 隐藏报错信息
            $userName.next().hide()
            flagUser = true
        } else {
            // 不合法 -- 报错 -- 下面的span标签显示
            $userName.next().show().html('用户名是6-20位数字、字母和下划线！')
            flagUser = false
        }
    }

    $userName.on('focus', () => {
        fnCheckUser2()
    })
    function fnCheckUser2() {
        if ($userName.next().html() != '') {
            $userName.val('')
        }
        $userName.next().html('')
    }


    // 2.如果密码框失去焦点，则进行检查判断密码是否合法
    $pwd.on('blur', function () {
        // 封装函数，调用函数
        fnCheckPwd()
    })
    function fnCheckPwd() {
        // 获取密码框输入的数据
        let passWord = $pwd.val()
        // 密码正则匹配表达式
        let regPass = /^[\w!-@#$%^&*]{6,20}$/
        // 如果输入框为空，则提示不能为空并return
        if (passWord == '') {
            $pwd.next().show().html('密码不能为空')
            flagPwd = false
            return
        }
        // 正则验证密码输入是否合法
        if (regPass.test(passWord)) {
            // 如果匹配成功，则隐藏span标签
            $pwd.next().hide()
            flagPwd = true
        }
        else {
            // 如果匹配失败，则显示span标签，替换提示信息
            $pwd.next().show().html('密码是6到20位字母、数字，还可包含@!#$%^&*-字符')
            flagPwd = false
        }
    }

    $reguser.on('click', () => {
        // alert('注册')
        turnToReguser()
    })
    function turnToReguser() {
        location.href = './reguser.html'
    }

    // 6.所有输入框验证通过再提交注册
    $form.on('submit', function (e) {
        // console.log($form.serialize())
        if (flagUser && flagPwd) {
            //阻止默认提交行为
            e.preventDefault()
            //发起POST请求
            $.post('http://127.0.0.1:8080/api/login', $(this).serialize(), (res) => {
                if (res.status == 0) {
                    localStorage.setItem('token', res.token)
                    location.href = './map_index.html'
                    // module.exports = res.token
                } else {
                    alert('登录失败')
                }
            })
        }
        else {
            alert("Not OK!")
            return false
        }
    })
})
