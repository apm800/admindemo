// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
//引入axios解决网络请求
import axios from 'axios'
//添加到原型上，保证任何地方
//可以使用
Vue.prototype.axios = axios;
import common from './assets/js/common'


import echarts from 'echarts'

Vue.prototype.$echarts = echarts


//vuex
import Vuex from 'vuex'
Vue.use(Vuex);


// excel文件导入导出
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'



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
    console.log('1213223',error)
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

//自定义一个金钱输入后两位的过滤器
Vue.filter('money',function(val){
    var str = val;
    var reg = /^(?:(?!.*([%|-])).*)/;
    if(reg.test (str)==false){
        return val;
    }else{
        val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(2) + ""; 
        var l = val.split(".")[0].split("").reverse(), r = val.split(".")[1]; 
        var t = ""; 
        for (var i = 0; i < l.length; i++) { 
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
        } 
        return t.split("").reverse().join("") + "." + r; 
    }

})
//自定义一个转换百分比的过滤器
Vue.filter('percent',function(percent){
    var str=Number(percent*100).toFixed(2);
    str+="%";
    return str;
})

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(common);

window.permission=['*',':sys',':sys:menu',':sys:page1',':sys:menu:add',':sys:dept',':sys:role',':sys:user'];


/* eslint-disable no-new */
new Vue({
  el: '#wrapper',
  router,
  store,
  template: '<App/>',
  components: { App }
})
