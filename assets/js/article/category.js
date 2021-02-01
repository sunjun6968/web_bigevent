$(function () {
    const { form } = layui
    // const id = $(this).data('id')
    let index = ''
    // 从服务器获取文章列表数据,并渲染到页面
    getCateList()
    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取分类列表失败!')
            }
            // 请求成功
            const htmlstr = template('tpl', res)
            // console.log(htmlstr);
            $('tbody').html(htmlstr)
        })
    }
    // 点击添加按钮绑定事件
    $('.add-btn').click(function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('.add-form-container').html(),
            area: ['500px', '250px']
        });

    })
    // 监听添加表单的提交事件??
    $(document).on('submit', '.add-form', function (e) {
        e.preventDefault()
        // 发送请求
        axios.post('/my/article/addcates', $(this).serialize()).then(
            res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('提交失败!')
                }
                layer.msg('提交成功!')
                layer.close(index)

                getCateList()
            }
        )
    })
    $(document).on('click', '.edit-btn', function () {
        console.log(123);
        index = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('.edit-form-container').html(),
            area: ['500px', '250px']
        })
        const id = $(this).data('id')
        // 发送请求
        axios.get(`/my/article/cates/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            form.val('edit-form', res.data)

        })

    })
    $(document).on('submit', '.edit-form', function (e) {
        e.preventDefault()
        axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('修改失败!')
            }
            layer.msg('修改成功')
            layer.close(index)

            getCateList()
        })
    })
    $(document).on('click', '.del-btn', function () {
        const id = $(this).data('id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            axios.get(`/my/article/deletecate/${id}`).then(res => {

                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除失败!')
                }
                layer.msg('删除成功')
                getCateList()
            })

            layer.close(index);
            
        });

    })


})