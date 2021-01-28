$(function () {
    var form = layui.form
    $('.links a').click(function () {

        $('.layui-form').toggle()
    })
    // 校验表单项
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码只能在6到12位之间'
        ],
        samePass: function (value) {//value表示表单值
            if (value != $('#pass').val()) {
                return '两次密码不一致'
            }
        }


    })

    // 实现注册功能
    $('.reg-form').submit(function (e) {
        e.preventDefault()
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);
                // 注册失败
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                } else {
                    layer.msg('注册成功')
                }
                // 跳转到登录
                $('.login-form a').click()
            })

    })
    $('.login-form').submit(function (e) {
        e.preventDefault()
        axios.post('/api/login', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            // 登录成功后,首先把token保存到本地存储
            localStorage.setItem('token', res.token)
            layer.msg('登录成功')
            location.href = './index.html'
        })
    })

})



