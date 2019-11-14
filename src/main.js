// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入axios解决网络请求
import axios from 'axios'
//添加到原型上，保证任何地方
//可以使用
Vue.prototype.axios = axios;
import common from './assets/js/common'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

// 因为Cannot set property $http of #<Vue> which has only a getter,所以把下面注了
// import VueResource from 'vue-resource'
// Vue.use(VueResource);

Vue.config.productionTip = false

//axios,请求全局拦截器。post全局方法改变为formdata
function transformRequest (data) {
  let ret = ''
  for (let it in data) {
      if((typeof data[it])=='string'){
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }else {
          try{
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(JSON.parse(data[it])) + '&'
          }catch(err){
              console.log(err)
          }
      }
  }
  return ret
}

// axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  //axios,请求全局拦截器。post全局方法改变为formdata
  if(config.type!='payload'){
      config.headers['Content-Type']='application/x-www-form-urlencoded;charset=utf-8';
      // config.headers['Content-Type']='application/json;charset=UTF-8';
      config.data=transformRequest(config.data);
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

//axios,相应全局拦截器，处理数据接口没有权限
axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  return response
}, function (error) {
  if(error.response?error.response.state==504:''){
       ElementUI.Message({
           type: 'error',
           message: '服务器异常，请联系管理员!'
       });
   }else {
       ElementUI.Message({
           type: 'error',
           message: '登录失效请重新登录'
       });
   }

  router.push({path:'/login'})

  return Promise.reject(error)
})

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(common);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
