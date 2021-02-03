$(function () {
        const { form}=layui
    function getCateList() {
        axios.get('/my/article/cates').then(res => {
              console.log(res);
            if (res.status !== 0) {
                  return layer.msg('获取失败')

            }
            res.data.forEach(item => {
                $('#cate-sel').append(`
                <option value="${item.Id}">${item.name}</option>
                
                `)
            });
            form.render('select');
          })
    }  
    
    getCateList()
    initEditor()
    const $image=('#image')
    $image.cropper({
        aspectRatio: 400 /280,
        preview:'.img-preview'
    })
    $('#choose-btn').click(function () {
        $('#file').click()
    })
    $('#file').change(function () {
        const imgUrl = URL.createObjectURL(this.files[0])
        $image.cropper('replace', imgUrl)
})
    $('.publish-form').submit(function (e) {
    e.preventDefault()
    const fd =new FormData(this)
        fd.forEach(item => {
        console.log(item);
        })
        fd.append('state', state)
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        })
}).toBlob(blob => {
    console.log(blob);
    // 7.5把获取的图片数据添加到formdata中
    fd.append('cover_img', blob)
    publishArticle(fd)
})

$('.last-row button').click(function () {
    console.log($(this).data('state'));
    state = $(this).data('state')
   
})
function publishArticle(fd) {
    axios.post('/my/article/add', fd).then(res => {
        console.log(res);
        if (res.status !== 0) {
            return layer.msg('发布失败!')
        }
        layer.msg(state == '草稿' ? '发布草稿成功' : '发布文章成功')
        location.href = './list.html'
        // 左边导航条更新
        window.parent.$('.layui-this').prev().find('a').click()
    })
}

})