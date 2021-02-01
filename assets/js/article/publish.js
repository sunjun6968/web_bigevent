$(function () {
    // 从服务器获取文章的分类列表
    const {form}=layui
    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            res.data.forEach(item => {
                $('#cate-sel').append(`
                 <option value="${item.Id}">${item.name}</option>
            `)
            });
            //动态创建需要手动添加
            form.render('select'); //更新全部
        })
    }

    getCateList()
    initEditor()
// 先获取要裁剪的图片/
    const $image =$('#image')
    $image.cropper({
        aspectRatio: 400 /280,
        preview:'.img-preview'
    })
    $('#choose-btn').click(function () {
       $('#file') .click()
    })
    // 给文件选择框绑定change事件/
    $('#file').change(function () {
        // 文件转成blob格式的url
        const imgUrl = URL.createObjectURL(this.files[0])
        $image.cropper('replace', imgUrl)


    })
    // 7.监听表单提交事件
    $('.publish-form').submit(function (e) {
        // FormData相关方法
        e.preventDefault()
        const fd = new FormData(this)
        fd.forEach(item => {
            console.log(item);
        })
        // 向fd中新增state文章数据
        fd.append('state', state)
        // 获取裁剪封面图片的二进制数据
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(blob => {
            console.log(blob);
            // 7.5把获取的图片数据添加到formdata中
            fd.append('cover_img', blob)
            publishArticle(fd)
        })

    })
    // 8点击发布和存为草稿按钮,改变state值
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