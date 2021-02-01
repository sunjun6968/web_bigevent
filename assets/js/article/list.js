$(function () {
    const { form, laypage } = layui
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
    const query = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''


    }

    function renderTable() {
        axios.get('/my/article/list', { params: query }).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            // 使用模板引擎渲染
            const htmlStr = template('tpl', res)
            // console.log(htmlStr);
            $('tbody').html(htmlStr)
            readerPage(res.total)
        })

    }

    renderTable()
    function readerPage(total) {
        laypage.render({
            elem: 'pagination', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: query.pagesize,
            limits: [2, 3, 4, 5],

            curr: query.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                query.pagenum = obj.curr
                query.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //    非首次进入页面,需要重新渲染表格页面
                    renderTable()
                }
            }

        });
    }
    // 表单筛选功能
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        //5.1获取下拉选择框的分类和选择状态
        const cate_id = $('#cate-sel').val()
        const state = $('#state').val()
        console.log(cate_id, state);
        query.cate_id = cate_id
        query.state = state
        // 重新调用一下
        renderTable()
    })
    // 6.点击删除按钮删除当前文章
    $(document).on('click', '.del-btn', function (index) {
        const id = $(this).data('id')
        console.log(id);
        // 弹出一个询问框
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            axios.get(`/my/article/delete/${id}`).then(res => {

                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除失败!')
                }
                layer.msg('删除成功')
                // 填坑处理:当前页只有一条数据且不处于第一页时,点击
                if ($('.del-btn').length == 1 && query.pagenum !== 1) {
                    query.pagenum = query.pagenum - 1
                }
                // 重新渲染表格
                renderTable()
            })
            // 关闭弹出层
            layer.close(index);

        });



    })
})