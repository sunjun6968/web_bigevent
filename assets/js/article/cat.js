$(function () {
    const { form } = layui
    let index = ''
    // 获取内容
    function fex() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            const htmlstr = template('tpl', res)
            // console.log(htmlstr);
            $('tbody').html(htmlstr)
        })
    }

    fex()
    // 点击添加按钮
    $('.add-btn').click(function () {
        index = layer.open({
            title: '添加文章分类',
            type: 1,
            content: $('.add-form-container').html(),
            area: ['500px', '250px']
        });



    })
    // 绑定submit提交事件
    $(document).on('submit', '.add-form', function (e) {
        e.preventDefault()
        axios.post('/my/article/addcates', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('提交失败!')

            }
            layer.msg('提交成功!')
            layer.close(index)
            fex()
        })
    })
    // 给编辑绑定点击事件
    $(document).on('click', '.edit-btn', function () {
        index = layer.open({
            title: '添加文章分类',
            type: 1,
            content: $('.edit-form-container').html(),
            area: ['500px', '250px']
        });
        const id = $(this).data('id')
        //   根据ID获取表单分类
        axios.get(`/my/article/cates/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }

            form.val('edit-form', res.data)
        })
    })
    // 绑定submit提交事件
    $(document).on('submit', '.edit-form', function (e) {
        e.preventDefault()
        axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('修改失败!')
            }
            layer.msg('修改成功!')
            layer.close(index)
            fex()
        })
    })
    


















})