axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'

// 添加全局的请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('......发送ajax请求前');
    // 在发送请求之前做些什么
  // 在发送请求前判断是否有/my开头的请求路径
  //如果有,手动添加headers请求头
  const token = localStorage.getItem('token') || ''
  if (config.url.indexOf('/my')==0) {
  config.headers.Authorization=token
}
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('......接收ajax响应前');
  // 先判断身份验证是否成功
  const {message,status } = response.data 
  if (message == '身份认证失败！' && status == 1) {
    localStorage.removeItem('token')
    location.href = './login.html'
  }
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });