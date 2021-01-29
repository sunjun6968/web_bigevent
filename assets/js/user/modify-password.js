$(function () {
   const { form ,layer } =layui 
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码必须6到十二位, 且不能出现空格'


        ],
        confirmPass: function (val) {
            console.log(111);
            if (val !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }



   })
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        // 发起请求
        axios.post('/my/updatepwd', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('修改密码失败')
                
            }
            layer.msg('修改密码成功 ')
        })
})



})