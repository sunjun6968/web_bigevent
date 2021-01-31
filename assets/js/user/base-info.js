// 基本资料功能
const { layer, form } = layui
function initUserInfo() {
    axios.get('/my/userinfo').then(res => {
        if (res.status !== 0) {
            return layer.msg('修改失败')
        }
        const { data } = res
        form.val('edit-userinfo', data)
    })
}

$(function () {
    
    initUserInfo()
    form.verify({
        nick: [
            /^\S{1,6}$/,
            '昵称长度必须在1~6之间'
        ]
    })
    $('.base-info-form').submit(function (e) {
        e.preventDefault()
        axios.post('/my/userinfo', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('修改失败')
            }
            window.parent.getuserInfo()
        })
    })
    $('#reset-btn').click(function (e) {
        e.preventDefault()
       initUserInfo()
    })
})
