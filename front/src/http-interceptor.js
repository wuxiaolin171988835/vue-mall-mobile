import axios from 'axios';
import store from './store';
import router from './router';
//拦截axios所有http请求，预先放入token请求头
axios.interceptors.request.use(config => {
  if (store.state.token) {
    //若存在令牌，则放入请求头
    config.headers.token = store.state.token;
  }
  return config;
});
//响应拦截器，提前预处理响应
axios.interceptors.response.use(
  res => {
    //如果code是 -1，说明用户已注销或者token已过期
    //此时需要重新登录，并且还要清除本地缓存信息
    if (res.status == 200) {
      if (res.data.code === -1) {
        clearHandler();
      }
    }
    return res;
  },
  err => {
    if (err.response.status === 401) {
      //未授权
      clearHandler();
    }
  }
);
function clearHandler() {
  //清除缓存
  store.commit('setToken', '');
  localStorage.removeItem('token');
  //跳转至登陆页
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  });
}
