$(function () {
    function getuserInfo() {
        // 获取本地存储的token令牌
        axios.get('/my/userinfo').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 渲染用户信息
            const { data } =res
            const name=data.nickname ||data.username
            $('.nickname').text(`欢迎${name}`)
            // 渲染头像
            // $('.text-avatar').text(name[0].toUpperCase())
            // $('.avatar').hide()
            if (data.user_pic) {
                $('.avatar').prop('src', data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                $('.text-avatar').text(name[0].toUpperCase()).show()
                $('.avatar').hide()
            }
           
        })
    }  

    getuserInfo()
    $('#logout').click(function () {
        //清除本地token令牌
        localStorage.removeItem('token')
        跳转到登录页
    location.href='./login.html'
})




})