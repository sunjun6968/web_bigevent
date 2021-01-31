$(function () {
    const $image = $('#image')

    $image.cropper({
        aspectRatio: 1,
        crop: function (event) {
            //   console.log(event.detail.x);
            //   console.log(event.detail.y);
        },
        // 指定预览区域,提供元素选择器
        preview: '.img-preview'


    })
    $('#upload-btn').click(function () {
        // 手动触发点击事件
        $('#file').click()
    })
    // 监听文件框改变事件
    $('#file').change(function () {
        console.log(this.files);
        if (this.files.length == 0) {
            return
        }

        // 把文件转出url地址
        const imgUrl = URL.createObjectURL(this.files[0])
        $image.cropper('replace', imgUrl)
    })
    // 点击确定上传图片
    $('#save-btn').click(function () {
        // 获取裁剪后的图片的base64格式
        const dataUrl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log(dataUrl);
        // 手动 构造查询参数
        const search = new URLSearchParams()
        search.append('avatar', dataUrl)
        // 发送请求到服务器

        axios.post('/my/update/avatar', search).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('上传失败')
            }
            layer.msg('上传成功')
            window.parent.getuserInfo()
        })
    })






})